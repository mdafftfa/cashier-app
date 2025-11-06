const Currencies = {
    USD: "USD",
    IDR: "IDR",
} as const;

export type Currencies = (typeof Currencies)[keyof typeof Currencies];
export default Currencies;