import { Metadata } from "next";

import { siteConfig } from "./metadata";

type SeoProps = {
    title: string;
    description: string;
    image?: string;
    keywords?: string[];
};

export function createMetadata({
   title,
   description,
   image,
   keywords = [],
}: SeoProps): Metadata {

    return {

        title,

        description,

        keywords,

        alternates: {

            canonical: `${siteConfig.url}`,

        },

        openGraph: {

            title,

            description,

            url: siteConfig.url,

            siteName: siteConfig.name,

            images: [

                {

                    url: image ?? siteConfig.ogImage,

                    width: 1200,

                    height: 630,

                },

            ],

        },

        twitter: {

            card: "summary_large_image",

            title,

            description,

            images: [

                image ?? siteConfig.ogImage,

            ],

        },

    };

}