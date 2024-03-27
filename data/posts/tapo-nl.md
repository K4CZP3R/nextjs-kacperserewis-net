## Plain HTTP en eigen encryptiemethode.

De TAPO-app communiceert met behulp van twee methoden: Bluetooth en HTTP.
Bluetooth wordt gebruikt om verbinding te maken met niet-gekoppelde apparaten (uitwisselen van wifi-ssid & psk, etc.).
HTTP wordt gebruikt voor alle andere verzoeken na het initiële koppelingsproces (het in- en uitschakelen van de stekker en instellingen, firmware-updates, etc.).

## Mijn doel

In staat zijn om mijn stekker aan/uit te zetten met behulp van een HTTP-verzoek.

## HTTP-verzoeken

De TAPO-app stuurt alle verzoeken naar `http://<ip-van-het-tapo-apparaat>/app`.

### Handshake

De app stuurt twee (sessie-initiatie) verzoeken bij het starten van de app, de eerste is het `handshake` verzoek.

`POST http://192.168.137.203/app HTTP/1.1`

```json
{
  "method": "handshake",
  "params": {
    "key": "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCiHkY5laTugGN1Hf/sBHiiw6mnnkohmvVHHHGJqwRx59RjQaL/SPBoLpeNRgN3B/uykzYTLUVMpTcWSZHsS6FfhdoOkJ1B6nit6nheIfltbP99uJduP1JQ44S9dqUr73w++Lpl6TKrzK3KOc5z/vc9xmqiKK6PYbFZu2evCsL19wIDAQAB-----END PUBLIC KEY-----\n"
  },
  "requestTimeMils": 0
}
```

De velden spreken voor zich, dit verzoek stuurt een door de app gegenereerde publieke sleutel naar het TAPO-apparaat.

#### TAPO App implementatie - generatie van de handshake

Na het hercompileren van de Android TAPO-app kunnen we zien hoe deze publieke sleutel wordt gegenereerd:

```java
public String getPublicKey() {
    /* Not relevant code, omitted */
    return "-----BEGIN PUBLIC KEY-----\n" + this.f20965b.get(0) + "-----END PUBLIC KEY-----\n";
}
```

`f20965b` is een HashMap die de publieke en de privésleutel bevat (`i=0` is de publieke sleutel en `i=1` is de privésleutel).
Verder onderzoek bracht me bij de functie waar de sleutels werden gegenereerd:

```java
public void mo35029c() {
    KeyPairGenerator instance = KeyPairGenerator.getInstance("RSA");
    instance.initialize(1024, new SecureRandom());
    KeyPair generateKeyPair = instance.generateKeyPair();
    String str = new String(Base64.encode(((RSAPublicKey) generateKeyPair.getPublic()).getEncoded(), 0));
    String str2 = new String(Base64.encode(((RSAPrivateKey) generateKeyPair.getPrivate()).getEncoded(), 0));
    this.f20965b.put(0, str);
    this.f20965b.put(1, str2);
}
```

Het is een `RSA 1024 bit` sleutelpaar dat Base64-gecodeerd is.
Na het (her)implementeren van deze functie in Java, ben ik in staat om mijn eigen (geldige) sleutelpaar te genereren.

#### Antwoord

Oké, terug naar het `handshake` verzoek. Nadat we het naar het TAPO-apparaat hebben gestuurd, krijgen we (als alles goed gaat) de volgende respons body:

```java
{
   "error_code":0,
   "result":{
      "key":"ZvHUZ2EZ1LLkrh9YG0ShBINL59Rna1++j8iW2r44klFseH17A6C8HH2TqN8UkNpi+MHxFgQ4Jvs/nvz8QoNPgVxWCsgVBI01GTtDdwHtaRXRNh2VuIp6NDUJ0/1NSydiMfeUs1AZT2vwxSg7/cI1DVHFzL7jNr1WNHEsDiYtm48="
   }
}
```

en een `Set-Cookie` header met de `TP_SESSIONID`: `TP_SESSIONID=D31BB81A0B0A3...EF0A790A150AD60A;TIMEOUT=1440` (Die nodig is voor de volgende verzoeken)

Zoals je kunt zien, is het handshake verzoek 24 uur geldig.

#### TAPO App implementatie - ontcijfering van de sleutel

TAPO app ontcijfert de sleutel van het apparaat in deze functie, ik heb het opnieuw geïmplementeerd als volgt:

```java
public void mo35024a(String tapokey) {
    byte[] decode = KspB64.decode(key.getBytes("UTF-8"));
    byte[] decode2 = KspB64.decode(keyPair.getPrivateKey());
    Cipher instance = Cipher.getInstance("RSA/ECB/PKCS1Padding");
    instance.init(2, (RSAPrivateKey) KeyFactory.getInstance("RSA").generatePrivate(new PKCS8EncodedKeySpec(decode2)));
    byte[] doFinal = instance.doFinal(decode);
    byte[] bArr = new byte[16];
    byte[] bArr2 = new byte[16];
    System.arraycopy(doFinal, 0, bArr, 0, 16);
    System.arraycopy(doFinal, 16, bArr2, 0, 16);
    return new C658a(bArr, bArr2);
}
```

Dit blok code genereert een Cipher met `RSA/NONE/PKCS1Padding` en manipuleert en voert vervolgens meer methoden uit.

Op de laatste regel van deze functie wordt een `C6586a` object gedefinieerd:

```java
public class C658a {

    Cipher f21776a_enc;
    Cipher f21777b_dec;

    public C658a(byte[] bArr, byte[] bArr2) throws Exception {
        SecretKeySpec secretKeySpec = new SecretKeySpec(bArr, "AES");
        IvParameterSpec ivParameterSpec = new IvParameterSpec(bArr2);
        f21776a_enc = Cipher.getInstance("AES/CBC/PKCS7Padding");
        f21776a_enc.init(1, secretKeySpec, ivParameterSpec);
        f21777b_dec = Cipher.getInstance("AES/CBC/PKCS7Padding");
        f21777b_dec.init(2, secretKeySpec, ivParameterSpec);


    }

    /* more code */
}
```

Hier kunnen we zien dat de `bArr` een geheime sleutelspecificatie is voor de `AES`. En de `bArr2` is de `iv`.

Na deze constructor zijn er twee functies die de encryptie en de decryptie van de paraminhoud afhandelen:

```java
public String mo38009b_enc(String str) throws Exception {
    byte[] doFinal;
    doFinal = this.f21776a_enc.doFinal(str.getBytes());
    String encrypted = KspB64.encodeToString(doFinal);
    return encrypted.replace("\r\n","");
}

public String mo38006a_dec(String str) throws Exception{
    byte[] doFinal;
    doFinal = this.f21777b_dec.doFinal(KspB64.decode(str.getBytes("utf-8")));
    return new String(doFinal);
}
```

Met deze twee functies kunnen we de verzoeken die we naar het TAPO-apparaat sturen versleutelen en de antwoorden ontsleutelen!

### Eerste securePassthrough

Het tweede verzoek dat naar het apparaat wordt gestuurd, is een universeel verzoek met een methode: `securePassthrough`. Dit zal later gebruikt worden voor elk ander verzoek zoals het veranderen van de stekkerstatus, informatie ophalen, enz.

Het verzoeklichaam van de TAPO App ziet er als volgt uit:

```json
{
  "method": "securePassthrough",
  "params": {
    "request": "vQewGPIlmr3G2l8uL0O3Yjnxc6dKUAMBzOA4xGwJe81N4iYrFzEEoLxY2Jxr5qxQ5uE84gMgQVHJ\nT174Z6z1/lDglp0FOtcFdXw6lUsvj5hcgjpHjaD+6CxcA5z1XF4xyfDJIIBcb5eJ+ZCyiw9wO+WN\nNnBg5SH6Lmq06+AzbP8I6R6X8SgrEt2OUjclJWnuYjJlxffwFD243VU30fKhjMthzGo0+UU+bXgA\nEE/LITY=\n"
  }
}
```

Zoals u kunt zien, is alles leesbaar behalve de `params.request`. Zoals we weten, is het versleuteld met `mo38009b_enc` van het `C658a` object, dat in de vorige stap is aangemaakt.
De onversleutelde `params.request` ziet er als volgt uit:

```json
{
  "method": "login_device",
  "params": {
    "password": "ITcyNjU....",
    "username": "MzhhNTk2NT..."
  },
  "requestTimeMils": 0
}
```

Dus we kunnen zien dat het tweede verzoek een autorisatiepoging is met de TP-Link inloggegevens.

#### TAPO App implementatie - coderen van de inloggegevens

Zoals u kunt zien zijn het wachtwoord en de gebruikersnaam niet in platte tekst. Ze zijn gecodeerd. Beide op verschillende manieren.

Het wachtwoord wordt gecodeerd met B64-codering en de gebruikersnaam gebruikt `MessageDigest` van `SHA1`:

```java
public static String shaDigestUsername(String str) throws NoSuchAlgorithmException {
    byte[] bArr = str.getBytes();
    byte[] digest = MessageDigest.getInstance("SHA1").digest(bArr);

    StringBuilder sb = new StringBuilder();
    for(byte b : digest){
        String hexString = Integer.toHexString(b & 255);
        if(hexString.length() == 1){
            sb.append("0");
            sb.append(hexString);
        } else {
            sb.append(hexString);
        }
    }
    return sb.toString();
}
```

En daarna wordt deze gebruikersnaam ook B64-gecodeerd.

#### Antwoord

```json
{
  "error_code": 0,
  "result": {
    "response": "zQMfnu0DQcB9xaJ9srqWVqbxC/2vuKnDT4jyFVqKyCb4GBas06djUCchwdwbp8iFr9Z5gFtrMmy/SHVjKl3eruAqe+vzVtgQtWUjeVrhSyE="
  }
}
```

Deze reactie kan worden ontcijferd en na ontcijfering zullen we zien:

```json
{
  "error_code": 0,
  "result": {
    "token": "E0AA81A79277AA712...BF127322B523"
  }
}
```

En daar is het, de volgende token die nodig zal zijn voor de volgende verzoeken. Op dit punt zijn we geauthenticeerd om andere verzoeken te doen.

## Mijn doel implementatie

Na het sniffen van de eerste twee verzoeken kunnen we de laatste onderscheppen, het verzoek om de staat van de lamp.
Het ziet er zo uit, ontcijferd:

```json
{
  "method": "set_device_info",
  "params": {
    "device_on": false
  },
  "requestTimeMils": 1602840338865,
  "terminalUUID": "88-54-DE-AD-52-E1"
}
```

De meeste velden spreken voor zich, `terminalUUID` is het MAC-adres van de stekker.

Deze `params.request` kan worden ingevoegd in een verzoek met de methode `securePassthrough`.

## Samenvatting

Met deze informatie is het mogelijk om een bibliotheek te maken om TP-Link TAPO-apparaten te besturen.

Voor nu heb ik alleen `set_device_info` geïmplementeerd, maar vanaf dit punt kan ik elk ander verzoek dat de app maakt onderscheppen, ontcijferen en uiteindelijk implementeren.

Ik zal later een PoC geschreven in Java posten.

## PS

Om onbekende verzoeken te ontcijferen (zonder RE) moet je `mo35029c` patchen, zodat het je eigen privé- en publieke sleutel gebruikt.
