import photoBridgeUnderbelly from "../public/photos/bridge-underbelly.jpg";
import photoBridge from "../public/photos/bridge.jpg";
import photoCloseGrass from "../public/photos/close-grass.jpg";
import photoCrab from "../public/photos/crab.jpg";
import photoDarkCarnival from "../public/photos/dark-carnival.jpg";
import photoSanFrancisco from "../public/photos/san-francisco.jpg";
import photoSpamMuseum from "../public/photos/spam-museum.jpg";
import photoWharfWheel from "../public/photos/wharf-wheel.jpg";

import card3dsThemes from "../public/projects/card-3dsthemes.png";
import cardMaagic from "../public/projects/card-maagic.png";
import cardMonthlicon from "../public/projects/card-monthlicon.png";
import cardWebtss from "../public/projects/card-webtss.png";
import cardAiMail from "../public/projects/card-ai-mail.png";
import cardPortfolio from "../public/projects/card-portfolio.png";
import cardOpenSWC from "../public/projects/card-openswc-fusion.png";

import hobby3DPrinting from "../public/hobbies/3d-printing.png";
import hobbyPhotography from "../public/hobbies/photography.jpg";
import hobbyMusic from "../public/hobbies/music.png";
// import hobbyVideoGames from "../public/hobbies/video-games.png";
import hobbyTraveling from "../public/hobbies/traveling.png";
import hobbyCooking from '../public/hobbies/cooking.jpg';
import hobbyHomelabbing from "../public/hobbies/homelabbing.jpg";
import hobbyCoffee from "../public/hobbies/coffee.png";
import hobbyHockey from "../public/hobbies/hockey.png";

import certificateAPlus from "../public/certificates/comptia-a-plus.png";
import certificateNetworkPlus from "../public/certificates/comptia-network-plus.png";
// import certificateSecurityPlus from "../public/certificates/comptia-security-plus.png";
import certificateLinuxPlus from "../public/certificates/comptia-linux-plus.png";

import logoML from "../public/logo-ml.png";

import profile from "../public/profile.png";

const images = {
  photoBridgeUnderbelly,
  photoBridge,
  photoCloseGrass,
  photoCrab,
  photoDarkCarnival,
  photoSanFrancisco,
  photoSpamMuseum,
  photoWharfWheel,

  card3dsThemes,
  cardMaagic,
  cardMonthlicon,
  cardWebtss,
  cardAiMail,
  // TODO: add real images
  cardQuickShare: cardPortfolio,
  cardHomeLab: cardPortfolio,
  cardPortfolio,
  cardOpenSWC,

  // TODO: add real images
  hobby3DPrinting,
  hobbyPhotography,
  hobbyMusic,
  hobbyVideoGames: photoCrab,
  hobbyTraveling,
  hobbyCooking,
  hobbyHomelabbing,
  hobbyCoffee,
  hobbyHockey,

  certificateAPlus,
  certificateNetworkPlus,
  // certificateSecurityPlus,
  certificateLinuxPlus,

  logoML,

  profile
} as const;

export default images;
