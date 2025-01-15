import { createContext } from "react";
import { Language, languages, PathToValue, TranslationParams, TranslationPaths } from "../../configs/translation";

export const I18nContext = createContext<{
    setLanguage(lang: Language): void;
    currentLanguage: Language;
    t<K extends string>(key: K, vars?: TranslationParams<PathToValue<typeof languages[Language], K>>): string;
    t(key: string): string;
    t<K extends TranslationPaths<typeof languages[Language]>>(key: K | string, vars?: TranslationParams<PathToValue<typeof languages[Language], K>>): string;
} | undefined>(undefined);
