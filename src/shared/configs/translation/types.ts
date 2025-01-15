import { languages } from "./languages";

export type Language = keyof typeof languages;

export type TranslationPaths<T> = T extends object
  ? {
    [K in keyof T]: K extends string
      ? (`${K}.${TranslationPaths<T[K]>}` extends `${K}.` ? `${K}` : `${K}.${TranslationPaths<T[K]>}`)
      : never;
  }[keyof T]
  : '';

export type PathToValue<T, P extends string> =
  P extends `${infer Key}.${infer Rest}`
    ? Key extends keyof T
      ? PathToValue<T[Key], Rest>
      : never
    : P extends keyof T
      ? T[P]
      : never;

export type TranslationParams<T> = T extends `${infer _Start}{${infer Var}}${infer Rest}`
  ? { [K in Var | keyof TranslationParams<Rest>]: any }
  : '';
