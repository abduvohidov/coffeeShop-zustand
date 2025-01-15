import React, { useState, ReactNode, useEffect } from 'react';
import { Language, languages, PathToValue, TranslationParams, TranslationPaths } from "../configs/translation";
import { I18nContext } from "../context/translationContext/translationContext.ts";

const translations = languages;

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

    const t = <K extends TranslationPaths<typeof translations[Language]>>(
        key: K,
        vars?: TranslationParams<PathToValue<typeof translations[Language], K>>
    ): string => {
        const translation = key.split(".").reduce((acc, part) => (acc as any)[part], translations[currentLanguage]) as unknown as string;

        if (vars) {
            return Object.keys(vars).reduce(
                (str, varKey) => str.replace(`{${varKey}}`, (vars as any)[varKey]),
                translation
            );
        }

        return translation || key;
    };

    useEffect(() => {
        const storedLanguage = localStorage.getItem("language");
        if (storedLanguage === "uz" || storedLanguage === "ru" || storedLanguage === "en") {
            setCurrentLanguage(storedLanguage);
        }
        else {
            localStorage.setItem("language", "en");
            setCurrentLanguage("en")
        }
    }, [])

    return (
        <I18nContext.Provider value={{ t, setLanguage: setCurrentLanguage, currentLanguage }}>
            {children}
        </I18nContext.Provider>
    );
};
