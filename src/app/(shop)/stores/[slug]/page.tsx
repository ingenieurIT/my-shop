import { notFound } from "next/navigation";

import { ProductCatalogSection } from "@/components/shop";
import { getStoreBySlug } from "@/services/store.service";

type StorePageProps = {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{
        category?: string;
        brand?: string;
        search?: string;
        page?: string;
    }>;
};

export default async function StorePage({
    params,
    searchParams,
}: StorePageProps) {
    const { slug } = await params;
    const { category, brand, search, page } = await searchParams;

    const store = await getStoreBySlug(slug);

    if (!store) notFound();

    return (
        <ProductCatalogSection
            storeSlug={slug}
            category={category}
            brand={brand}
            search={search}
            page={page}
        />
    );
}
