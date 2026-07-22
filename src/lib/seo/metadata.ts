import type { Metadata } from "next";

export const siteConfig = {
    name: "LinkIT Deal",
    shortName: "LinkIT",
    url: process.env.NEXT_PUBLIC_APP_URL ?? "https://linkit-deal.vercel.app",

    description:
        "LinkIT Deal est une plateforme spécialisée dans la vente d'ordinateurs, PC Gamer, ordinateurs portables, composants informatiques, imprimantes, accessoires et équipements high-tech et dans l'ingenierie logicielle.",

    logo: "/og-icon.png",

    ogImage: "/og-icon.jpg",

    locale: "fr_FR",

    keywords: [
        "ordinateur",
        "ordinateurs",
        "ordinateur portable",
        "pc portable",
        "laptop",
        "pc gamer",
        "gaming",
        "ordinateur bureau",
        "macbook",
        "ssd",
        "ram",
        "carte graphique",
        "rtx",
        "amd",
        "intel",
        "écran",
        "imprimante",
        "clavier",
        "souris",
        "accessoires informatiques",
        "informatique",
        "high tech",
        "technologie",
        "Yaoundé",
        "Douala",
        "Cameroun",
        "LinkIT Deal",
        "Global Link Computers",
        "Electronic Local Store",
    ],
};

export const defaultMetadata: Metadata = {
    metadataBase: new URL(siteConfig.url),

    title: {
        default: `${siteConfig.name} | Vente d'équipements informatique`,
        template: `%s | ${siteConfig.name}`,
    },

    description: siteConfig.description,

    keywords: siteConfig.keywords,

    applicationName: siteConfig.name,

    creator: "Ivan TCHOUMI",

    publisher: siteConfig.name,

    authors: [
        {
            name: "Ivan TCHOUMI",
        },
    ],

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-video-preview": -1,
            "max-snippet": -1,
        },
    },

    alternates: {
        canonical: siteConfig.url,
    },

    openGraph: {
        type: "website",
        locale: siteConfig.locale,

        url: siteConfig.url,

        title: siteConfig.name,

        description: siteConfig.description,

        siteName: siteConfig.name,

        images: [
            {
                url: siteConfig.ogImage,
                width: 1200,
                height: 630,
                alt: "LinkIT Deal",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: siteConfig.name,
        description: siteConfig.description,
        images: [siteConfig.ogImage],
    },

    icons: {
        icon: "/og-icon.png",
        shortcut: "/og-icon.png",
    },
};