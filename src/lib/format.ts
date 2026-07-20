export function formatPrice(price: number) {
    return new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "XAF",
        maximumFractionDigits: 0,
    }).format(price);
}

export function formatDate(date: Date | string) {
    return new Intl.DateTimeFormat("fr-FR", {
        dateStyle: "medium",
    }).format(new Date(date));
}

export function formatDateTime(date: Date | string) {
    return new Intl.DateTimeFormat("fr-FR", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(new Date(date));
}

export function truncate(text: string, length = 80) {
    if (text.length <= length)
        return text;

    return text.substring(0, length) + "...";
}