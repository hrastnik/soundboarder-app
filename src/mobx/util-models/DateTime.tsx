import { types } from "mobx-state-tree";
import dayjs from "dayjs";

import { getRoot } from "../utils/getRoot";

const DATE_FORMAT = "YYYY-MM-DD HH:mm:ss";

const DateTimeCore = types
  .model("DateTime", {
    _date: types.string,
  })
  .views((self) => {
    return {
      get dayjsLocale(): string {
        const env = getRoot(self);
        const currentLocale = env.i18n.currentLocale;

        const localeMap = {
          english: "en",
        };

        return localeMap[currentLocale];
      },
    };
  })
  .views((self) => {
    return {
      get dayjs() {
        return dayjs.utc(self._date, DATE_FORMAT).locale(self.dayjsLocale);
      },
    };
  });

export const DateTime = types.snapshotProcessor(DateTimeCore, {
  preProcessor(dateString: string) {
    return { _date: dateString };
  },
  postProcessor(model) {
    return model._date;
  },
});
