import { ProductCatalogSection } from "@/components/shop";

type ShopHomePageProps = {
    searchParams: Promise<{ category?: string; brand?: string }>;
};

export default async function ShopHomePage({
    searchParams,
}: ShopHomePageProps) {
    const { category, brand } = await searchParams;

    return (
        <ProductCatalogSection
            category={category}
            brand={brand}
            showViewAll
        />
    );
}
