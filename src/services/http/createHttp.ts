import Axios from "axios";
import { environment } from "~/environment";
import { errorLogger } from "./errorLogger.interceptor";
import { requestLogger } from "./requestLogger.interceptor";
import { responseLogger } from "./responseLogger.interceptor";

export function createHttp(axios = Axios) {
  const http = axios.create({
    baseURL: environment.BASE_URL,
  });

  http.interceptors.request.use(requestLogger);
  http.interceptors.response.use(responseLogger, errorLogger);

  return http;
}

export interface HttpStatic extends ReturnType<typeof createHttp> {}
