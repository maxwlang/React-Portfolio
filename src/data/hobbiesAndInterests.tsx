import { StaticImageData } from "next/image";
import images from "@/images";

export interface HobbyAndInterest {
  title: string;
  image: StaticImageData;
  description: string;
}

const hobbiesAndInterests: HobbyAndInterest[] = [
  {
    title: "3D Printing",
    image: images.hobby3DPrinting,
    description:
      "I design functional parts in Autodesk Fusion 360 and print them on a Bambu Lab P1S — most recently a modular keystone-jack desk grommet that solved a real cable-management itch.",
  },
  {
    title: "Photography",
    image: images.hobbyPhotography,
    description:
      "Shooting on a Sony Alpha A6600, mostly night cityscapes and urban nature work. Photography is the slow, deliberate counterweight to a fast software job.",
  },
  {
    title: "Music",
    image: images.hobbyMusic,
    description:
      "Wide-spectrum listener — classical to rock to EDM. I produce in Ableton Live, curate playlists, mix tracks, and travel to a few festivals each year.",
  },
  {
    title: "Video Games",
    image: images.hobbyVideoGames,
    description:
      "PC and console gamer with a soft spot for JRPGs, strategy titles, and sandbox games. Long-running Nintendo loyalist.",
  },
  {
    title: "Traveling",
    image: images.hobbyTraveling2,
    description:
      "Minneapolis is home base, but I'm regularly out to Las Vegas, San Francisco, and Denver, and I take international trips when I can.",
  },
  {
    title: "Cooking",
    image: images.hobbyCooking,
    description:
      "Cooking is its own kind of engineering. I lean Italian and Asian, riff freely on recipes, and enjoy the experiments more than the wins.",
  },
  {
    title: "Homelabbing",
    image: images.hobbyHomelabbing,
    description:
      "I run a rack at home: three servers, multiple switches, a dedicated firewall, 144TB of storage, and 10 Gbps fiber tying it all together. K3S, Proxmox, 11 VLANs.",
  },
  {
    title: "Coffee",
    image: images.hobbyCoffee,
    description:
      "French press and espresso most days, Nespresso when the schedule wins. The ritual matters more than the gear.",
  },
  {
    title: "Hockey",
    image: images.hobbyHockey,
    description:
      "Minnesota Wild fan and local minor-league regular. I try to make it out to a handful of games each season.",
  },
];

export default hobbiesAndInterests;
