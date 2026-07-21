import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container, PageHeader, Sidebar } from "@/components/layout";
import { ROUTES } from "@/constants/routes";
import { getProducts } from "@/services/product.service";
import { getCategories } from "@/services/category.service";
import { getBrands } from "@/services/brand.service";

import { ProductGrid } from "./ProductGrid";

type ProductCatalogSectionProps = {
    category?: string;
    brand?: string;
    showViewAll?: boolean;
};

export async function ProductCatalogSection({
    category,
    brand,
    showViewAll = false,
}: ProductCatalogSectionProps) {
    const [allProducts, categories, brands] = await Promise.all([
        getProducts(),
        getCategories(),
        getBrands(),
    ]);

    const products = allProducts.filter((product) => {
        if (category && product.category.slug !== category) return false;
        if (brand && product.brandId !== brand) return false;
        return true;
    });

    const activeCategoryLabel = categories.find(
        (item) => item.slug === category
    )?.name;

    const prices = allProducts.map((product) => product.price);
    const minPrice = prices.length ? Math.min(...prices) : 0;
    const maxPrice = prices.length ? Math.max(...prices) : 0;

    return (
        <>
            <PageHeader
                title={activeCategoryLabel ?? "Catalogue produits"}
                breadcrumbItems={[
                    { label: "Produits", href: "/products" },
                    ...(activeCategoryLabel
                        ? [{ label: activeCategoryLabel }]
                        : []),
                ]}
            />

            <Container className="flex flex-col gap-8 py-8 lg:flex-row lg:gap-10">
                <Sidebar
                    categories={categories}
                    brands={brands}
                    activeCategory={category}
                    activeBrandId={brand}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                />

                <div className="flex-1">
                    <div className="mb-4 flex items-center justify-between">
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            {products.length} produit{products.length > 1 ? "s" : ""}
                        </p>

                        {showViewAll && (
                            <Link
                                href={ROUTES.PRODUCTS}
                                className="flex items-center gap-1 text-sm font-medium text-teal-600 transition-colors hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
                            >
                                Voir tout
                                <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                        )}
                    </div>

                    <ProductGrid products={products} />
                </div>
            </Container>
        </>
    );
}

export default ProductCatalogSection;
