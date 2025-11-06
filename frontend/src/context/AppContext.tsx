import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import Languages, { type Languages as LanguagesType } from "@/utils/enums/Languages";
import Currencies, { type Currencies as CurrenciesType } from "@/utils/enums/Currencies";

export interface AppContextType {
    language: LanguagesType;
    setLanguage: (lang: LanguagesType) => void;
    currency: CurrenciesType;
    setCurrency: (currency: CurrenciesType) => void;
}

export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<LanguagesType>(() => {
        const saved = localStorage.getItem("currentLanguage") as LanguagesType;
        return saved || Languages.INDONESIA;
    });

    const [currency, setCurrency] = useState<CurrenciesType>(() => {
        const saved = localStorage.getItem("currentCurrency") as CurrenciesType;
        return saved || Currencies.IDR;
    });

    useEffect(() => {
        localStorage.setItem("currentLanguage", language);
    }, [language]);

    useEffect(() => {
        localStorage.setItem("currentCurrency", currency);
    }, [currency]);

    return (
        <AppContext.Provider value={{ language, setLanguage, currency, setCurrency }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error("useAppContext must be used inside AppProvider");
    return ctx;
};
