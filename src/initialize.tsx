import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import { createStore } from "~/mobx/createStore";
import { createPersistence } from "~/services/createPersistence";
import { createHttp } from "~/services/http/createHttp";
import { createQueryClient } from "./services/createQueryClient";

export async function initialize() {
  dayjs.extend(utc);
  dayjs.extend(relativeTime);
  dayjs.extend(localizedFormat);

  const queryClient = createQueryClient();
  const http = createHttp();
  const persistence = createPersistence();

  const store = await createStore({ http, persistence });

  return { store, queryClient };
}
