import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container, PageHeader, Sidebar } from "@/components/layout";
import { ROUTES } from "@/constants/routes";
import { getProducts } from "@/services/product.service";
import { getCategories } from "@/services/category.service";
import { getBrands } from "@/services/brand.service";
import { getStoreBySlug } from "@/services/store.service";

import { ProductGrid } from "./ProductGrid";
import Image from "next/image";

type ProductCatalogSectionProps = {
    category?: string;
    brand?: string;
    storeSlug?: string;
    search?: string;
    showViewAll?: boolean;
};

export async function ProductCatalogSection({
    category,
    brand,
    storeSlug,
    search,
    showViewAll = false,
}: ProductCatalogSectionProps) {
    const [allProducts, categories, brands, store] = await Promise.all([
        getProducts(),
        getCategories(),
        getBrands(),
        storeSlug ? getStoreBySlug(storeSlug) : Promise.resolve(null),
    ]);

    const searchTerm = search?.trim().toLowerCase();

    const products = allProducts.filter((product) => {
        if (storeSlug && product.store.slug !== storeSlug) return false;
        if (category && product.category.slug !== category) return false;
        if (brand && product.brandId !== brand) return false;

        if (searchTerm) {
            const haystack = [
                product.name,
                product.description ?? "",
                product.brand.name,
                product.category.name,
                ...product.specifications.flatMap((spec) => [
                    spec.key,
                    spec.value,
                ]),
            ]
                .join(" ")
                .toLowerCase();

            if (!haystack.includes(searchTerm)) return false;
        }

        return true;
    });

    const activeCategoryLabel = categories.find(
        (item) => item.slug === category
    )?.name;

    const prices = allProducts.map((product) => product.price);
    const minPrice = prices.length ? Math.min(...prices) : 0;
    const maxPrice = prices.length ? Math.max(...prices) : 0;

    const title = search
        ? `Résultats pour « ${search} »`
        : (activeCategoryLabel ?? store?.name ?? "Catalogue produits");

    const basePath = storeSlug ? `${ROUTES.STORES}/${storeSlug}` : ROUTES.PRODUCTS;

    return (
        <>
            <PageHeader
                title={title}
                breadcrumbItems={[
                    { label: "Produits", href: ROUTES.PRODUCTS },
                    ...(store
                        ? [{ label: store.name, href: `${ROUTES.STORES}/${store.slug}` }]
                        : []),
                    ...(activeCategoryLabel
                        ? [{ label: activeCategoryLabel }]
                        : []),
                    ...(search ? [{ label: `« ${search} »` }] : []),
                ]}
            />

            {store && (
                <div className="border-b border-zinc-100 bg-white py-4 dark:border-zinc-800 dark:bg-zinc-950">
                    <Container className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-zinc-500 dark:text-zinc-400">
                        {store.logo && (
                            <Image
                                src={store.logo}
                                alt={store.name}
                                width={32}
                                height={32}
                                className="rounded-full object-cover"
                            />
                        )}
                        {store.city && <span>{store.city}</span>}
                        {store.phone && <span>{store.phone}</span>}
                        {store.email && <span>{store.email}</span>}
                    </Container>
                </div>
            )}

            <Container className="flex flex-col gap-8 py-8 lg:flex-row lg:gap-10">
                <Sidebar
                    categories={categories}
                    brands={brands}
                    activeCategory={category}
                    activeBrandId={brand}
                    activeSearch={search}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    basePath={basePath}
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
