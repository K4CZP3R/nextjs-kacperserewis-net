## Zwykłe HTTP i własna metoda szyfrowania.

Aplikacja TAPO komunikuje się dwoma metodami: Bluetooth i HTTP.
Bluetooth jest używany do łączenia się z nieparowanymi urządzeniami (wymiana ssid wifi&psk itp.).
HTTP jest używany do każdego innego żądania po początkowym procesie parowania (ustawienie/stan wtyczki i ustawienia, aktualizacja firmware itp.).

## Mój cel

Być w stanie włączyć/wyłączyć moją wtyczkę za pomocą żądania HTTP.

## Żądania HTTP

Aplikacja TAPO wysyła wszystkie żądania do `http://<ip-urządzenia-tapo>/app`.

### Handshake

Aplikacja wysyła dwa żądania (inicjacji sesji) przy starcie aplikacji, pierwsze z nich to żądanie `handshake`.

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

Pola są oczywiste, to żądanie wysyła publiczny klucz wygenerowany przez aplikację do urządzenia TAPO.

#### Implementacja aplikacji TAPO - generacja handshake

Po rekompilacji aplikacji Android TAPO możemy zobaczyć, jak generowany jest ten publiczny klucz:

```java
public String getPublicKey() {
    /* Not relevant code, omitted */
    return "-----BEGIN PUBLIC KEY-----\n" + this.f20965b.get(0) + "-----END PUBLIC KEY-----\n";
}
```

`f20965b` to HashMap zawierający klucz publiczny oraz klucz prywatny (`i=0` to klucz publiczny, a `i=1` to klucz prywatny).
Dalsze badania doprowadziły mnie do funkcji, w której klucze były generowane:

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

To jest para kluczy `RSA 1024 bit`, która jest zakodowana w Base64.
Po ponownym zaimplementowaniu tej funkcji w javie, jestem w stanie wygenerować własną (poprawną) parę kluczy.

#### Odpowiedź

Więc wracając do żądania `handshake`. Po wysłaniu go do urządzenia TAPO otrzymamy (jeśli wszystko pójdzie dobrze) następującą treść odpowiedzi:

```java
{
   "error_code":0,
   "result":{
      "key":"ZvHUZ2EZ1LLkrh9YG0ShBINL59Rna1++j8iW2r44klFseH17A6C8HH2TqN8UkNpi+MHxFgQ4Jvs/nvz8QoNPgVxWCsgVBI01GTtDdwHtaRXRNh2VuIp6NDUJ0/1NSydiMfeUs1AZT2vwxSg7/cI1DVHFzL7jNr1WNHEsDiYtm48="
   }
}
```

oraz nagłówek `Set-Cookie` z `TP_SESSIONID`: `TP_SESSIONID=D31BB81A0B0A3...EF0A790A150AD60A;TIMEOUT=1440` (Który jest potrzebny do następnych żądań)

Jak widać, żądanie handshake jest ważne przez 24 godziny.

#### Implementacja aplikacji TAPO - deszyfrowanie klucza

Aplikacja TAPO deszyfruje klucz urządzenia w tej funkcji, zaimplementowałem ją ponownie w ten sposób:

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

Ten blok kodu generuje Cipher z `RSA/NONE/PKCS1Padding`, a następnie manipuluje i wykonuje więcej metod.

W ostatniej linii tej funkcji zdefiniowany jest obiekt `C6586a`:

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

Tutaj widzimy, że `bArr` jest specyfikacją tajnego klucza dla `AES`. Natomiast `bArr2` to `iv`.

Po tym konstruktorze znajdują się dwie funkcje, które obsługują szyfrowanie i deszyfrowanie zawartości parametru:

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

Dzięki tym dwóm funkcjom możemy szyfrować żądania, które wyślemy do urządzenia TAPO, oraz deszyfrować odpowiedzi!

### Pierwszy securePassthrough

Drugie żądanie wysłane do urządzenia to uniwersalne żądanie z metodą: `securePassthrough`. Będzie ono później używane dla każdego innego żądania, takiego jak zmiana stanu wtyczki, pobieranie informacji itp.

Ciało żądania z aplikacji TAPO wygląda tak:

```json
{
  "method": "securePassthrough",
  "params": {
    "request": "vQewGPIlmr3G2l8uL0O3Yjnxc6dKUAMBzOA4xGwJe81N4iYrFzEEoLxY2Jxr5qxQ5uE84gMgQVHJ\nT174Z6z1/lDglp0FOtcFdXw6lUsvj5hcgjpHjaD+6CxcA5z1XF4xyfDJIIBcb5eJ+ZCyiw9wO+WN\nNnBg5SH6Lmq06+AzbP8I6R6X8SgrEt2OUjclJWnuYjJlxffwFD243VU30fKhjMthzGo0+UU+bXgA\nEE/LITY=\n"
  }
}
```

Jak można zauważyć, wszystko jest czytelne oprócz `params.request`. Jak wiemy, jest ono zaszyfrowane przy użyciu `mo38009b_enc` z obiektu `C658a`, który został utworzony w poprzednim kroku.
Niezaszyfrowane `params.request` wygląda tak:

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

Więc widzimy, że drugie żądanie to próba autoryzacji z użyciem poświadczeń TP-Link.

#### Implementacja aplikacji TAPO - kodowanie danych logowania

Jak można zauważyć, hasło i nazwa użytkownika nie są w formie zwykłego tekstu. Są zakodowane. Oba w różny sposób.

Hasło jest zakodowane przy użyciu kodowania B64, a nazwa użytkownika używa `MessageDigest` z `SHA1`:

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

A po tym nazwa użytkownika jest również kodowana za pomocą B64.

#### Odpowiedź

```json
{
  "error_code": 0,
  "result": {
    "response": "zQMfnu0DQcB9xaJ9srqWVqbxC/2vuKnDT4jyFVqKyCb4GBas06djUCchwdwbp8iFr9Z5gFtrMmy/SHVjKl3eruAqe+vzVtgQtWUjeVrhSyE="
  }
}
```

Ta odpowiedź może być odszyfrowana, a po deszyfracji zobaczymy:

```json
{
  "error_code": 0,
  "result": {
    "token": "E0AA81A79277AA712...BF127322B523"
  }
}
```

I oto jest, kolejny token, który będzie potrzebny do następnych żądań. W tym momencie jesteśmy uwierzytelnieni do wykonywania innych żądań.

## Implementacja mojego celu

Po przechwyceniu pierwszych dwóch żądań możemy przechwycić ostatnie, dotyczące stanu żarówki.
Odszyfrowane wygląda to tak:

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

Większość pól jest oczywista, `terminalUUID` to adres MAC wtyczki.

Ten `params.request` można wstawić do żądania z metodą `securePassthrough`.

## Podsumowanie

Dzięki tym informacjom możliwe jest stworzenie biblioteki do kontrolowania urządzeń TP-Link TAPO.

Na razie zaimplementowałem tylko `set_device_info`, ale w tym momencie mogę podsłuchiwać każde inne żądanie wysyłane przez aplikację, odszyfrować je i w końcu zaimplementować.

Później opublikuję PoC napisany w Javie.

## PS

Aby odszyfrować nieznane żądania (bez RE), będziesz musiał załatać `mo35029c`, aby umieszczał tam własny prywatny i publiczny klucz.
