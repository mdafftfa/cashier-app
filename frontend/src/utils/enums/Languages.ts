const Languages = {
    ENGLISH: "English",
    INDONESIA: "Indonesia",
} as const;

export type Languages = (typeof Languages)[keyof typeof Languages];
export default Languages;
