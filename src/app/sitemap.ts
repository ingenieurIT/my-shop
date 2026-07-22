import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://linkit-deal.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: `${BASE_URL}`,
            lastModified: new Date(),
        },
        {
            url: `${BASE_URL}/products`,
            lastModified: new Date(),
        },
        {
            url: `${BASE_URL}/stores/els`,
            lastModified: new Date(),
        },
        {
            url: `${BASE_URL}/stores/glc`,
            lastModified: new Date(),
        },
    ];
}