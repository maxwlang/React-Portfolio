import { StaticImageData } from "next/image";
import images from "@/images";

export interface HobbyAndInterest {
  title: string;
  image: StaticImageData;
  description: string;
}

const hobbiesAndInterests: HobbyAndInterest[] = [
  {
    // Complete
    title: "3D Printing",
    image: images.hobby3DPrinting,
    description:
      "Using Autodesk Fusion 360, I design functional 3D models for printing with my Bambu Lab P1S 3D Printer. Recently, a modular keystone jack desk grommet.",
  },
  {
    // Complete
    title: "Photography",
    image: images.hobbyPhotography,
    description:
      "Over the last year I've been learning photography with my Sony Alpha A6600. I've been enjoying capturing night cityscapes and urban nature photography.",
  },
  {
    // Complete
    title: "Music",
    image: images.hobbyMusic,
    description:
      "I enjoy a wide range of music—from classical to rock and EDM. I love traveling to music festivals, creating in Ableton Live, curating playlists, and mixing tracks.",
  },
  {
    // Complete
    title: "Video Games",
    image: images.hobbyVideoGames,
    description:
      "I'm a big fan of PC and console games. Typically you'll find me playing JRPGs, strategy, and sandbox games. I have a personal affinity for Nintendo games.",
  },
  {
    // Complete
    title: "Traveling",
    image: images.hobbyTraveling2,
    description:
      "I call Minnesota home, but I love to travel. I frequent Las Vegas, San Francisco, and Denver often. I also love to travel internationally.",
  },
  {
    // Complete
    title: "Cooking",
    image: images.hobbyCooking,
    description:
      "It's a lot of fun to cook and expirament with new recipes. I enjoy cooking Italian and Asian cuisine, and have fun coming up with my own recipes.",
  },
  {
    // Complete
    title: "Homelabbing",
    image: images.hobbyHomelabbing,
    description:
      "At home I maintain a rack of servers and networking equipment. I have 3 rack servers, several switches, and a firewall, along with 144TB of storage. This is all networked together with 10Gbps fiber.",
  },
  {
    // Complete
    title: "Coffee",
    image: images.hobbyCoffee,
    description:
      "I enjoy brewing coffee with a french press and espresso machine, though some days I just use a Nespresso machine.",
  },
  {
    // Complete
    title: "Hockey",
    image: images.hobbyHockey,
    description:
      "An avid hockey fan, I follow the Minnesota Wild and local minor league hockey teams. I try to go to a few games a year.",
  },
];

export default hobbiesAndInterests;
