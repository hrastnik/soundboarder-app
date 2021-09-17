export function getExtensionFromMimeType(mimeType: string) {
  switch (mimeType.toLowerCase()) {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/gif":
      return "gif";
    case "video/x-flv":
      return "flv";
    case "video/mp4":
      return "mp4";
    case "video/3gpp":
      return "3gp";
    case "video/quicktime":
      return "mov";
    case "video/x-msvideo":
      return "avi";
    case "video/x-ms-wmv":
      return "wmv";
    default:
      return "jpg";
  }
}
