import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function isEmpty(value: unknown) {
    if (value === null || value === undefined) return true;

    if (typeof value === "string")
        return value.trim().length === 0;

    if (Array.isArray(value))
        return value.length === 0;

    if (typeof value === "object")
        return Object.keys(value).length === 0;

    return false;
}

export function generateSKU(prefix: string = "PRD") {
    const random = Math.floor(100000 + Math.random() * 900000);

    return `${prefix}-${random}`;
}