import {
    LayoutDashboard,
    Store,
    Boxes,
    Tags,
    Package,
    Settings, LucideIcon,
} from "lucide-react";

import { ROUTES } from "./routes";

type AdminNavigationItem = {
    title: string;
    href: string;
    icon: LucideIcon;
    permission?: string;
};

export const ADMIN_NAVIGATION: AdminNavigationItem[] = [
    {
        title: "Dashboard",

        href: ROUTES.ADMIN,

        icon: LayoutDashboard,
    },

    {
        title: "Produits",

        href: ROUTES.ADMIN_PRODUCTS,

        icon: Package,
    },

    {
        title: "Catégories",

        href: ROUTES.ADMIN_CATEGORIES,

        icon: Tags,
    },

    {
        title: "Marques",

        href: ROUTES.ADMIN_BRANDS,

        icon: Boxes,
    },

    {
        title: "Boutiques",

        href: ROUTES.ADMIN_STORES,

        icon: Store,
    },

    {
        title: "Paramètres",

        href: ROUTES.ADMIN_SETTINGS,

        icon: Settings,
    },
];

export const SHOP_NAVIGATION = [
    {
        title: "Boutique",

        href: ROUTES.SHOP,
    },

    {
        title: "Promotions",

        href: `${ROUTES.PRODUCTS}?promo=1`,
    },

    {
        title: "À propos",

        href: ROUTES.ABOUT,
    },

    {
        title: "Contact",

        href: ROUTES.CONTACT,
    },
];