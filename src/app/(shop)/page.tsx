import { ProductCatalogSection } from "@/components/shop";

type ShopHomePageProps = {
    searchParams: Promise<{ category?: string; brand?: string; search?: string }>;
};

export default async function ShopHomePage({
    searchParams,
}: ShopHomePageProps) {
    const { category, brand, search } = await searchParams;

    return (
        <ProductCatalogSection
            category={category}
            brand={brand}
            search={search}
            showViewAll
        />
    );
}
