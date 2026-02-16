import axios from "axios";

const isServer = typeof window === "undefined";

const baseURL = isServer
  ? process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000"
  : process.env.NEXT_PUBLIC_API_BASE_URL || "";

const api = axios.create({
  baseURL,
  withCredentials: true,
});

let cachedToken: string | null = null;
let lastTokenReadAt = 0;
const TOKEN_CACHE_TTL_MS = 60_000;

function shouldAttachAuthHeader(url?: string) {
  if (!url) return false;
  return url.startsWith("/api/");
}

api.interceptors.request.use(async (config) => {
  const hasAuthorizationHeader =
    typeof config.headers?.Authorization === "string" ||
    typeof config.headers?.authorization === "string";

  if (
    !hasAuthorizationHeader &&
    !isServer &&
    shouldAttachAuthHeader(config.url)
  ) {
    try {
      const now = Date.now();
      let token = cachedToken;

      if (!token || now - lastTokenReadAt > TOKEN_CACHE_TTL_MS) {
        const { authClient } = await import("@/lib/auth-client");
        const sessionResult = await authClient.getSession();
        const payload = (sessionResult as any)?.data ?? sessionResult;
        token =
          payload?.session?.token ||
          payload?.token ||
          payload?.accessToken ||
          payload?.user?.accessToken ||
          null;
        cachedToken = token;
        lastTokenReadAt = now;
      }

      if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      // No-op: continue without Authorization header.
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      !isServer &&
      axios.isAxiosError(error) &&
      error.response?.status === 401 &&
      process.env.NEXT_PUBLIC_AUTO_SIGNOUT_ON_401 === "true"
    ) {
      try {
        const { authClient } = await import("@/lib/auth-client");
        await authClient.signOut();
      } catch {
        // Ignore sign-out failures in interceptor.
      }
    }

    return Promise.reject(error);
  }
);

export default api;
