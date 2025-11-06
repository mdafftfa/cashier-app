import type { Languages as LanguageType } from "./enums/Languages.ts";
import lang from "@/data/lang.yml";

export default class LangTranslator {
    private language: LanguageType;

    constructor(toLanguage: LanguageType) {
        this.language = toLanguage;
    }

    translate(key: string): string {
        const langData = lang[this.language];
        if (!langData) return key;

        const keys = key.split(".");

        let value: any = langData;
        for (const k of keys) {
            if (value && k in value) {
                value = value[k];
            } else {
                return key;
            }
        }

        return typeof value === "string" ? value : key;
    }
}
