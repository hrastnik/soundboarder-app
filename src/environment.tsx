import * as yup from "yup";

import {
  BASE_URL,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
} from "@env";

export const envValidationSchema = yup.object({
  BASE_URL: yup.string().required(),
});

export const environment = {
  BASE_URL: BASE_URL as string,
};

try {
  envValidationSchema.validateSync(environment);
} catch (error) {
  throw new Error(
    ".env file missing or invalid. Do you have a `.env` file in the root of" +
      "your project? You can copy a config from .env.example and save into .env" +
      ", then restart the packager with `yarn start --resetCache\n\nError: " +
      error.message
  );
}
