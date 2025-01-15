import React, {useEffect} from "react";
import { Select } from "@gravity-ui/uikit";
import {useTranslation} from "../../../shared/hooks/useTranslation.ts";
import {languages} from "../../../shared/configs/translation";

interface SelectorLanguagesProps {
    className?: string;
}

export const SelectorLanguages: React.FC<SelectorLanguagesProps> = ({className}) => {
    const {currentLanguage, setLanguage, } = useTranslation()

    useEffect(() => {
        const storedLanguage = localStorage.getItem("language");
        if (storedLanguage === "uz" || storedLanguage === "ru" || storedLanguage === "en") {
            setLanguage(storedLanguage);
        }
        else {
            handleChange("ru")
        }
    }, [setLanguage]);

    const handleChange = (value: string) => {
        setLanguage(value as keyof typeof languages);
        localStorage.setItem("language", value);
    };

    return (
        <Select
            className={className}
            defaultValue={[currentLanguage]}
            value={[currentLanguage]}
            onUpdate={([value]) => handleChange(value)}
            size={"xl"}
        >
            <Select.Option value="en">English</Select.Option>
            <Select.Option value="ru">Русский</Select.Option>
            <Select.Option value="uz">Uzbek</Select.Option>
        </Select>
    );
};
