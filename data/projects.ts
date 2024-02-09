import { IProject } from "../models/project.model";

function githubLink(user: string, repository: string) {
  return `https://github.com/${user}/${repository}`;
}

export const PROJECTS: IProject[] = [
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
  },
];
