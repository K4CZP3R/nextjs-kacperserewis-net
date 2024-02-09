import { IProject } from "../models/project.model";

function githubLink(user: string, repository: string) {
  return `https://github.com/${user}/${repository}`;
}

const EN_PROJECTS: IProject[] = [
  {
    title: "LoRa Trackers",
    slug: "lora-trackers",
    description:
      "OpenRemote requested we connect a quirky IoT device to their platform. We developed a GPS tracker using LoRa technology for communication. The tracker's mesh network sends location data through an edge device to the cloud-based OpenRemote platform. The LoRa-based mesh network enables long-range connectivity and low battery usage for the devices.",
    buttons: [
      {
        title: "View Source",
        path: githubLink("openremote", "or-loratrackers"),
      },
      {
        title: "View Demo",
        path: "https://www.youtube.com/watch?v=72r54r_dwo8",
      },
    ],
    tags: ["#LoRa", "#IoT", "#OpenRemote", "#GPS", "#MeshNetwork"],
    locale: "en",
  },
  {
    title: "FaceNotify / TrustNotify",
    slug: "facenotify",
    description:
      "I've developed an app that allows notifications to be displayed on the lock screen only when the device owner is looking at it. The first version was written in Java, while the second, more optimized version was written in Kotlin.",
    buttons: [
      {
        title: "View Source #1",
        path: githubLink("K4CZP3R", "FaceNotify"),
      },
      {
        title: "View Source #2",
        path: githubLink("K4CZP3R", "TrustNotify"),
      },
      {
        title: "View Demo",
        path: "https://youtu.be/Gz_cFyi5riw?t=67",
      },
    ],
    tags: ["#Android", "#Java", "#Kotlin", "#FaceRecognition", "#Notification"],
    locale: "en",
  },
  {
    title: "P2PLauncher",
    slug: "p2plauncher",
    description:
      "P2PLauncher is a program that helps connect multiple peers in a simulated LAN environment using FreeLAN, an open-source, peer-to-peer VPN. It has a user-friendly interface and is mainly intended for gamers. P2PLauncher enables users to play old games with LAN connectivity, even if the game's servers are no longer supported or have networking issues with their current systems.",
    buttons: [
      {
        title: "View Source",
        path: githubLink("K4CZP3R", "P2PLauncher"),
      },
    ],
    tags: ["#csharp", "#P2P", "#LAN", "#Freelan"],
    locale: "en",
  },
  {
    title: "Reverse engineering of smart plug (TP-Link Tapo)",
    slug: "tapo",
    description:
      "I have successfully reverse-engineered the protocol used for communication between the Tapo app and the smart plug. My research and its implementations can be found on GitHub, such as in the Fishbigger's TapoP100 repository.",
    buttons: [
      {
        title: "View Source #1",
        path: githubLink("K4CZP3R", "tapo-p100-python"),
      },
      {
        title: "View Source #2",
        path: githubLink("K4CZP3R", "tapo-p100-java-poc"),
      },
      {
        title: "Writeup",
        path: "/blog/post/reverse-engineering-tp-link-tapo",
      },
    ],
    tags: ["#Python", "#ReverseEngineering", "#SmartPlug", "#TP-Link", "#Tapo"],
    locale: "en",
  },
  {
    title: "HyperX keyboard USB protocol implementation",
    slug: "hyperx",
    description:
      "I have developed a proof-of-concept that allows for full control of the LEDs on a HyperX keyboard. This proof-of-concept was utilized to add support for this keyboard in the OpenRGB app.",
    buttons: [
      {
        title: "View Source",
        path: githubLink("K4CZP3R", "hpyerx-keyboard-rgb"),
      },
    ],
    tags: ["#C++", "#USB", "#HyperX", "#OpenRGB"],
    locale: "en",
  },
  {
    title: "LoveBox - ploveu",
    slug: "lovebox",
    description:
      'I recently created a special project called "PLU-box" as a gift for my girlfriend on our 5th anniversary. It\'s a device that allows us to send and receive heartfelt messages from each other, no matter how far apart we are.',
    buttons: [
      //     {
      //     title: "Blog post",
      //     path: "/blog/lovebox-pt1"
      // }
    ],
    tags: [
      "#TypeScript",
      "#Linux",
      "#Docker",
      "#MongoDB",
      "#Lit",
      "#WebComponents",
    ],
    locale: "en",
  },
];

const NL_PROJECTS: IProject[] = [
  {
    title: "LoRa Trackers",
    slug: "lora-trackers",
    description:
      "OpenRemote heeft ons gevraagd een eigenzinnig IoT-apparaat aan hun platform te koppelen. We hebben een GPS-tracker ontwikkeld die gebruikmaakt van LoRa-technologie voor communicatie. Het mesh-netwerk van de tracker stuurt locatiegegevens via een edge-apparaat naar het cloudgebaseerde OpenRemote-platform. Het op LoRa gebaseerde mesh-netwerk maakt langeafstandsconnectiviteit en laag batterijgebruik voor de apparaten mogelijk.",
    buttons: [
      {
        title: "Bekijk Broncode",
        path: githubLink("openremote", "or-loratrackers"),
      },
      {
        title: "Bekijk Demo",
        path: "https://www.youtube.com/watch?v=72r54r_dwo8",
      },
    ],
    tags: ["#LoRa", "#IoT", "#OpenRemote", "#GPS", "#MeshNetwork"],
    locale: "nl",
  },
  {
    title: "FaceNotify / TrustNotify",
    slug: "facenotify",
    description:
      "Ik heb een app ontwikkeld die notificaties op het vergrendelscherm toont alleen wanneer de eigenaar van het apparaat ernaar kijkt. De eerste versie was geschreven in Java, terwijl de tweede, meer geoptimaliseerde versie in Kotlin was geschreven.",
    buttons: [
      {
        title: "Bekijk Broncode #1",
        path: githubLink("K4CZP3R", "FaceNotify"),
      },
      {
        title: "Bekijk Broncode #2",
        path: githubLink("K4CZP3R", "TrustNotify"),
      },
      {
        title: "Bekijk Demo",
        path: "https://youtu.be/Gz_cFyi5riw?t=67",
      },
    ],
    tags: [
      "#Android",
      "#Java",
      "#Kotlin",
      "#Gezichtsherkenning",
      "#Notificatie",
    ],
    locale: "nl",
  },
  {
    title: "P2PLauncher",
    slug: "p2plauncher",
    description:
      "P2PLauncher is een programma dat helpt bij het verbinden van meerdere peers in een gesimuleerde LAN-omgeving met behulp van FreeLAN, een open-source, peer-to-peer VPN. Het heeft een gebruiksvriendelijke interface en is voornamelijk bedoeld voor gamers. P2PLauncher stelt gebruikers in staat om oude spellen met LAN-connectiviteit te spelen, zelfs als de servers van het spel niet meer worden ondersteund of als er netwerkproblemen zijn met hun huidige systemen.",
    buttons: [
      {
        title: "Bekijk Broncode",
        path: githubLink("K4CZP3R", "P2PLauncher"),
      },
    ],
    tags: ["#csharp", "#P2P", "#LAN", "#Freelan"],
    locale: "nl",
  },
  {
    title: "Reverse engineering van slimme stekker (TP-Link Tapo)",
    slug: "tapo",
    description:
      "Ik heb met succes het protocol dat gebruikt wordt voor communicatie tussen de Tapo-app en de slimme stekker reverse-engineered. Mijn onderzoek en de implementaties ervan zijn te vinden op GitHub, zoals in de TapoP100-repository van Fishbigger.",
    buttons: [
      {
        title: "Bekijk Broncode #1",
        path: githubLink("K4CZP3R", "tapo-p100-python"),
      },
      {
        title: "Bekijk Broncode #2",
        path: githubLink("K4CZP3R", "tapo-p100-java-poc"),
      },
      {
        title: "Lees het Verslag",
        path: "/blog/post/reverse-engineering-tp-link-tapo",
      },
    ],
    tags: [
      "#Python",
      "#ReverseEngineering",
      "#SlimmeStekker",
      "#TP-Link",
      "#Tapo",
    ],
    locale: "nl",
  },
  {
    title: "HyperX toetsenbord USB-protocol implementatie",
    slug: "hyperx",
    description:
      "Ik heb een proof-of-concept ontwikkeld dat volledige controle over de LED's op een HyperX toetsenbord mogelijk maakt. Dit proof-of-concept is gebruikt om ondersteuning voor dit toetsenbord toe te voegen aan de OpenRGB-app.",
    buttons: [
      {
        title: "Bekijk Broncode",
        path: githubLink("K4CZP3R", "hpyerx-keyboard-rgb"),
      },
    ],
    tags: ["#C++", "#USB", "#HyperX", "#OpenRGB"],
    locale: "nl",
  },
  {
    title: "LoveBox - ploveu",
    slug: "lovebox",
    description:
      'Ik heb onlangs een speciaal project genaamd "PLU-box" gemaakt als cadeau voor mijn vriendin op onze 5e verjaardag. Het is een apparaat waarmee we hartverwarmende berichten naar elkaar kunnen sturen en ontvangen, hoe ver we ook uit elkaar zijn.',
    buttons: [
      //     {
      //     title: "Blogpost",
      //     path: "/blog/lovebox-pt1"
      // }
    ],
    tags: [
      "#TypeScript",
      "#Linux",
      "#Docker",
      "#MongoDB",
      "#Lit",
      "#WebComponents",
    ],
    locale: "nl",
  },
];

const PL_PROJECTS: IProject[] = [
  {
    title: "Śledzenie LoRa",
    slug: "lora-trackers",
    description:
      "OpenRemote poprosiło nas o podłączenie nietypowego urządzenia IoT do ich platformy. Rozwinęliśmy lokalizator GPS wykorzystujący technologię LoRa do komunikacji. Sieć mesh lokalizatora przesyła dane o lokalizacji przez urządzenie brzegowe do opartej na chmurze platformy OpenRemote. Sieć mesh oparta na LoRa umożliwia dalekosiężną łączność i niskie zużycie baterii urządzeń.",
    buttons: [
      {
        title: "Zobacz kod źródłowy",
        path: githubLink("openremote", "or-loratrackers"),
      },
      {
        title: "Zobacz demo",
        path: "https://www.youtube.com/watch?v=72r54r_dwo8",
      },
    ],
    tags: ["#LoRa", "#IoT", "#OpenRemote", "#GPS", "#MeshNetwork"],
    locale: "pl",
  },
  {
    title: "FaceNotify / TrustNotify",
    slug: "facenotify",
    description:
      "Rozwinąłem aplikację, która pozwala wyświetlać powiadomienia na ekranie blokady tylko wtedy, gdy właściciel urządzenia na niego patrzy. Pierwsza wersja została napisana w Javie, podczas gdy druga, bardziej zoptymalizowana wersja została napisana w Kotlinie.",
    buttons: [
      {
        title: "Zobacz kod źródłowy #1",
        path: githubLink("K4CZP3R", "FaceNotify"),
      },
      {
        title: "Zobacz kod źródłowy #2",
        path: githubLink("K4CZP3R", "TrustNotify"),
      },
      {
        title: "Zobacz demo",
        path: "https://youtu.be/Gz_cFyi5riw?t=67",
      },
    ],
    tags: [
      "#Android",
      "#Java",
      "#Kotlin",
      "#RozpoznawanieTwarzy",
      "#Powiadomienia",
    ],
    locale: "pl",
  },
  {
    title: "P2PLauncher",
    slug: "p2plauncher",
    description:
      "P2PLauncher to program, który pomaga połączyć wielu użytkowników w symulowanym środowisku LAN za pomocą FreeLAN, otwartoźródłowego VPN typu peer-to-peer. Ma przyjazny interfejs i jest głównie przeznaczony dla graczy. P2PLauncher umożliwia użytkownikom grę w stare gry z łącznością LAN, nawet jeśli serwery gry nie są już obsługiwane lub mają problemy z siecią w ich obecnych systemach.",
    buttons: [
      {
        title: "Zobacz kod źródłowy",
        path: githubLink("K4CZP3R", "P2PLauncher"),
      },
    ],
    tags: ["#csharp", "#P2P", "#LAN", "#Freelan"],
    locale: "pl",
  },
  {
    title: "Inżynieria wsteczna inteligentnego gniazdka (TP-Link Tapo)",
    slug: "tapo",
    description:
      "Odniosłem sukces w inżynierii wstecznej protokołu używanego do komunikacji między aplikacją Tapo a inteligentnym gniazdkiem. Moje badania i ich implementacje można znaleźć na GitHubie, na przykład w repozytorium Fishbigger's TapoP100.",
    buttons: [
      {
        title: "Zobacz kod źródłowy #1",
        path: githubLink("K4CZP3R", "tapo-p100-python"),
      },
      {
        title: "Zobacz kod źródłowy #2",
        path: githubLink("K4CZP3R", "tapo-p100-java-poc"),
      },
      {
        title: "Opis",
        path: "/blog/post/reverse-engineering-tp-link-tapo",
      },
    ],
    tags: [
      "#Python",
      "#InżynieriaWsteczna",
      "#InteligentneGniazdko",
      "#TP-Link",
      "#Tapo",
    ],
    locale: "pl",
  },
  {
    title: "Implementacja protokołu USB klawiatury HyperX",
    slug: "hyperx",
    description:
      "Rozwinąłem koncepcję, która pozwala na pełną kontrolę nad diodami LED na klawiaturze HyperX. Ta koncepcja została wykorzystana do dodania wsparcia dla tej klawiatury w aplikacji OpenRGB.",
    buttons: [
      {
        title: "Zobacz kod źródłowy",
        path: githubLink("K4CZP3R", "hpyerx-keyboard-rgb"),
      },
    ],
    tags: ["#C++", "#USB", "#HyperX", "#OpenRGB"],
    locale: "pl",
  },
  {
    title: "LoveBox - ploveu",
    slug: "lovebox",
    description:
      'Ostatnio stworzyłem specjalny projekt o nazwie "PLU-box" jako prezent dla mojej dziewczyny na naszą 5. rocznicę. To urządzenie, które pozwala nam wysyłać i odbierać serdeczne wiadomości do siebie, bez względu na to, jak daleko jesteśmy od siebie.',
    buttons: [
      //     {
      //     title: "Wpis na blogu",
      //     path: "/blog/lovebox-pt1"
      // }
    ],
    tags: [
      "#TypeScript",
      "#Linux",
      "#Docker",
      "#MongoDB",
      "#Lit",
      "#WebComponents",
    ],
    locale: "pl",
  },
];

export const PROJECTS = [...EN_PROJECTS, ...NL_PROJECTS, ...PL_PROJECTS];
