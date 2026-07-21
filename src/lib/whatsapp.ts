import { APP } from "@/constants/app";
import { formatPrice } from "@/lib/format";

function sanitizePhone(phone: string) {
    return phone.replace(/[^\d]/g, "");
}

export function buildWhatsAppLink(
    productName: string,
    price: number,
    storePhone?: string | null
) {
    const number =
        storePhone && sanitizePhone(storePhone)
            ? sanitizePhone(storePhone)
            : APP.WHATSAPP_NUMBER;

    const message = [
        "Bonjour, je suis intéressé(e) par ce produit :",
        productName,
        formatPrice(price),
    ].join("\n");

    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
