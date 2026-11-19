import OpengraphImage, {
  alt as ogAlt,
  size as ogSize,
  contentType as ogContentType,
} from "./opengraph-image";

// Twitter card image — reuses the Open Graph design.
// Next.js requires these be static literal exports per file, so we re-declare
// them here rather than re-exporting from `opengraph-image`.
export const runtime = "edge";
export const alt = ogAlt;
export const size = ogSize;
export const contentType = ogContentType;

export default OpengraphImage;
