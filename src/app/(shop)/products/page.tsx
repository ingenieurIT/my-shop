import { ProductCatalogSection } from "@/components/shop";

type ProductsPageProps = {
    searchParams: Promise<{
        category?: string;
        brand?: string;
        search?: string;
        page?: string;
    }>;
};

export default async function ProductsPage({
    searchParams,
}: ProductsPageProps) {
    const { category, brand, search, page } = await searchParams;

    return (
        <ProductCatalogSection
            category={category}
            brand={brand}
            search={search}
            page={page}
        />
    );
}
