const imageKitEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT?.trim() || "";

function trimTrailingSlash(value: string) {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

export function getImageKitUrlEndpoint() {
  return trimTrailingSlash(imageKitEndpoint);
}

export function buildImageKitUrl(pathOrUrl: string, transformation = "f-auto,q-auto") {
  if (!pathOrUrl) return "";

  const endpoint = getImageKitUrlEndpoint();
  const normalizedValue = pathOrUrl.trim();

  if (!endpoint) return normalizedValue;

  const fullUrl = normalizedValue.startsWith("http")
    ? normalizedValue
    : `${endpoint}${normalizedValue.startsWith("/") ? normalizedValue : `/${normalizedValue}`}`;

  const separator = fullUrl.includes("?") ? "&" : "?";
  return fullUrl.includes("tr=") ? fullUrl : `${fullUrl}${separator}tr=${transformation}`;
}

export function isImageKitConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT &&
      process.env.IMAGEKIT_PUBLIC_KEY &&
      process.env.IMAGEKIT_PRIVATE_KEY
  );
}
