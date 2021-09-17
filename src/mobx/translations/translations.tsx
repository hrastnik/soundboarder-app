import { english } from "./english";

export const translations = { english };

export type TranslationShape = typeof english;
export type TranslationKeys = keyof TranslationShape;
