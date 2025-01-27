import { StaticImageData } from "next/image";
import images from "@/images";

interface HobbyAndInterest {
  title: string;
  image: StaticImageData;
}

const hobbiesAndInterests: HobbyAndInterest[] = [
  {
    title: "3D Printing",
    image: images.hobby3DPrinting,
  },
  {
    title: "Photography",
    image: images.hobbyPhotography,
  },
  {
    title: "Music",
    image: images.hobbyMusic,
  },
  {
    title: "Video Games",
    image: images.hobbyVideoGames,
  },
  {
    title: "Traveling",
    image: images.hobbyTraveling,
  },
  {
    title: "Cooking",
    image: images.hobbyCooking,
  },
  {
    title: "Homelabbing",
    image: images.hobbyHomelabbing,
  },
  {
    title: "Coffee",
    image: images.hobbyCoffee,
  },
  {
    title: "Hockey",
    image: images.hobbyHockey,
  },
];

export default hobbiesAndInterests;
