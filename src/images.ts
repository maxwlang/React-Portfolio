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
  cardPortfolio,
  cardOpenSWC,

  // TODO: add real images
  hobby3DPrinting: photoCrab,
  hobbyPhotography: photoCrab,
  hobbyMusic: photoCrab,
  hobbyVideoGames: photoCrab,
  hobbyTraveling: photoCrab,
  hobbyCooking: photoCrab,
  hobbyHomelabbing: photoCrab,
  hobbyCoffee: photoCrab,
  hobbyHockey: photoCrab,

  certificateAPlus,
  certificateNetworkPlus,
  // certificateSecurityPlus,
  certificateLinuxPlus,

  logoML,

  profile
} as const;

export default images;
