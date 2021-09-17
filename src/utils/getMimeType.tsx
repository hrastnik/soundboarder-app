export function getMimeType(uri: string) {
  const extension = uri.split(".").pop() || "";

  switch (extension.toLowerCase()) {
    case "jpeg":
      return "image/jpeg";
    case "jpg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "gif":
      return "image/gif";
    case "flv":
      return "video/x-flv";
    case "mp4":
      return "video/mp4";
    case "3gp":
      return "video/3gpp";
    case "mov":
      return "video/quicktime";
    case "avi":
      return "video/x-msvideo";
    case "wmv":
      return "video/x-ms-wmv";
    default:
      return "application/octet-stream";
  }
}
