import type { Currencies as CurrencyType } from "./enums/Currencies.ts";
import Currencies from "./enums/Currencies.ts";

export default class CurrencyTranslator {

    private currency: CurrencyType;
    private static readonly rate = 16000;

    constructor(currentCurrency: CurrencyType) {
        this.currency = currentCurrency;
    }
    
    /**
     * @param amount nilai dalam IDR
     * @returns string dengan hasil konversi dan simbol mata uang
     */
    translate(amount: number): string {
        if (this.currency === Currencies.IDR) {
            return `${amount.toLocaleString("id-ID")}`;
        }

        if (this.currency === Currencies.USD) {
            const usdValue = amount / CurrencyTranslator.rate;
            return `${usdValue.toFixed(2)}`;
        }

        return `${amount}`;
    }
}
