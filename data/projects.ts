import Button from "../components/button/button";
import { IProject } from "../models/project.model";

function githubLink(user: string, repository: string) {
    return `https://github.com/${user}/${repository}`;
}


export const PROJECTS: IProject[] = [
    {
        title: "First LoveBox - ploveu",
        slug: "lovebox-1",
        description: "An (failed) attempt to create a Lovebox device, which allows to send messages to your loved ones. The device was based on ESP32 with E-Ink display and used 3D printed case",
        buttons: [],
        tags: ["ESP32", "C++"]

    },
    {
        title: "LoRa Trackers",
        slug: "lora-trackers",
        description: 'OpenRemote has asked us to connect a "wacky" IoT device to their IoT platform. After some brainstorming we came up with our concept: a GPS tracker which works via long-range radio (a.k.a. LoRa) technology. The GPS trackers communicate over LoRa in a mesh network and send their locations via an edge device to the cloud-hosted OpenRemote platform. While a "wacky" use-case for LoRa technology, we were able to make the system function as designed. Using LoRa technology for the GPS tracker mesh network helps devices stay connected even at long ranges, while being battery efficient.',
        buttons: [{
            title: "View Source",
            path: githubLink("openremote", "or-loratrackers")
        },
        {
            title: "View Demo",
            path: "https://www.youtube.com/watch?v=72r54r_dwo8"
        }],
        tags: ["LoRa", "IoT", "OpenRemote", "GPS", "Mesh Network"],
    },
    {
        title: "FaceNotify / TrustNotify",
        slug: "facenotify",
        description: "An app that makes it possible to show the notifications on the lock screen only if the device owner is looking at it. The first version was written in Java, the second one, more optimized, in Kotlin.",
        buttons: [
            {
                title: "View Source #1",
                path: githubLink("K4CZP3R", "FaceNotify")
            },
            {
                title: "View Source #2",
                path: githubLink("K4CZP3R", "TrustNotify")
            },
            {
                title: "View Demo",
                path: "https://youtu.be/Gz_cFyi5riw?t=67"
            }
        ],
        tags: ["Android", "Java", "Kotlin", "Face Recognition", "Notification"],
    },
    {
        title: "P2PLauncher",
        slug: "p2plauncher",
        description: "GUI for a program (freelan) that makes it possible to connect peer-to-peer between multiple computers, allowing them to for ex. play old LAN-only games.",
        buttons: [{
            title: "View Source",
            path: githubLink("K4CZP3R", "P2PLauncher")
        }],
        tags: ["C#", "P2P", "LAN", "Freelan"],
    },
    {
        title: "Reverse engineering of smart plug (TP-Link Tapo)",
        slug: "tapo",
        description: "I've reverse engineered the protocol used for communication between the Tapo app and the smart plug itself. There are some implementations of my research available on GitHub, ex: Fishbigger's TapoP100 repository.",
        buttons: [{
            title: "View Source #1",
            path: githubLink("K4CZP3R", "tapo-p100-python")
        },
        {
            title: "View Source #2",
            path: githubLink("K4CZP3R", "tapo-p100-java-poc")
        },
        {
            title: "Writeup",
            path: "/blog/reverse-engineering-tp-link-tapo"
        }
    ],
        tags: ["Python", "Reverse Engineering", "Smart Plug", "TP-Link", "Tapo"],
    },
    {
        title: "HyperX keyboard USB protocol implementation",
        slug: "hyperx",
        description: "I've created simple proof-of-concept which allows to control every LED on the keyboard. This proof-of-concept was used to add support for this keyboard in OpenRGB app.",
        buttons: [{
            title: "View Source",
            path: githubLink("K4CZP3R", "hpyerx-keyboard-rgb")
        }],
        tags: ["C++", "USB", "HyperX", "OpenRGB"],
    },
    {
        title: "LoveBox - ploveu",
        slug: "lovebox",
        description: "My own do-it-yourself Lovebox device, which allows to send messages to your loved ones. The device is based on Raspberry Pi and uses 3D printed case",
        buttons: [
        //     {
        //     title: "Blog post",
        //     path: "/blog/lovebox-pt1"
        // }
        ],
        tags: ["TypeScript", "Linux", "Docker"]
    }

]