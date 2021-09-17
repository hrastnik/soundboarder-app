import { autorun } from "mobx";
import { types, flow } from "mobx-state-tree";

import { constants } from "~/constants";

import { translations, TranslationKeys } from "./translations/translations";
import { getEnv } from "./utils/getEnv";

export type AvailableLanguage = keyof typeof translations;

export const I18n = types
  .model("I18n", {
    currentLocale: types.optional(
      types.enumeration("AvailableLanguages", ["english"]),
      "english"
    ),
  })
  .views((self) => ({
    t(path: TranslationKeys, ...props: any[]): string | undefined {
      if (typeof path !== "string") return undefined;

      const currentLocale = self.currentLocale;

      let translation = translations[currentLocale][path];
      if (translation === undefined || translation === "")
        translation = translations.english[path];

      if (typeof translation === "string") return translation;
      if (typeof translation === "function")
        return (translation as any)(...props);
      if (translation === undefined) {
        console.log("Undefined translation for - " + path);
        return path;
      }
    },
  }))
  .actions((self) => ({
    initialize: flow(function* initialize(): any {
      const env = getEnv(self);

      const persistedLocale: any = yield env.persistence.get(
        constants.ASYNC_STORAGE_KEYS.PREFERRED_LANGUAGE
      );

      if (["english"].includes(persistedLocale)) {
        self.currentLocale = persistedLocale;
      } else {
        self.currentLocale = constants.DEFAULT_LANGUAGE;
      }

      autorun(() => {
        env.persistence.set(
          constants.ASYNC_STORAGE_KEYS.PREFERRED_LANGUAGE,
          self.currentLocale
        );
        // TODO: enable this when there are multiple translations available
        // self.setDayJSLocale(self.currentLocale);
      });
    }),

    setCurrentLocale(locale: AvailableLanguage) {
      self.currentLocale = locale;
    },
  }));
