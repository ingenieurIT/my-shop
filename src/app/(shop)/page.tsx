import { ProductCatalogSection } from "@/components/shop";

type ShopHomePageProps = {
    searchParams: Promise<{
        category?: string;
        brand?: string;
        search?: string;
        page?: string;
    }>;
};

export default async function ShopHomePage({
    searchParams,
}: ShopHomePageProps) {
    const { category, brand, search, page } = await searchParams;

    return (
        <ProductCatalogSection
            category={category}
            brand={brand}
            search={search}
            page={page}
            showViewAll
        />
    );
}
