export function formatPrice(price: number) {
    return new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "XAF",
    }).format(price);
}