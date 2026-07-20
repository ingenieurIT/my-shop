import { ProductStatus } from "@prisma/client";

export const PRODUCT_STATUS = [
    {
        value: ProductStatus.AVAILABLE,
        label: "Disponible",
    },

    {
        value: ProductStatus.OUT_OF_STOCK,
        label: "Rupture",
    },

    {
        value: ProductStatus.DISCONTINUED,
        label: "Arrêté",
    },
];