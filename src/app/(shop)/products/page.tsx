import { ProductCatalogSection } from "@/components/shop";

type ProductsPageProps = {
    searchParams: Promise<{ category?: string; brand?: string; search?: string }>;
};

export default async function ProductsPage({
    searchParams,
}: ProductsPageProps) {
    const { category, brand, search } = await searchParams;

    return (
        <ProductCatalogSection category={category} brand={brand} search={search} />
    );
}
