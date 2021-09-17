import { AxiosRequestConfig } from "axios";

export function addToken(getToken: () => string | undefined) {
  return (config: AxiosRequestConfig) => {
    const token = getToken();
    if (typeof token === undefined) return config;

    config.headers.Authorization = `Bearer ${token}`;

    return config;
  };
}
