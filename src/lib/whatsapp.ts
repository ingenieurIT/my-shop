import { APP } from "@/constants/app";
import { formatPrice } from "@/lib/format";

export function buildWhatsAppLink(productName: string, price: number) {
    const message = [
        "Bonjour, je suis intéressé(e) par ce produit :",
        productName,
        formatPrice(price),
    ].join("\n");

    return `https://wa.me/${APP.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
