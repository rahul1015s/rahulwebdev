import axios from "axios";

export function getApiErrorMessage(
  error: unknown,
  fallback = "Something went wrong"
) {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as any;
    return (
      data?.error?.message ||
      data?.error ||
      data?.message ||
      error.message ||
      fallback
    );
  }

  if (error instanceof Error) return error.message;
  return fallback;
}
