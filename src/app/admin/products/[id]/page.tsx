import { notFound } from "next/navigation";

import { Container, PageTitle } from "@/components/layout/admin";
import { ProductForm } from "@/components/admin/products/ProductForm";
import { getProductById } from "@/services/product.service";
import { getStores } from "@/services/store.service";
import { getCategories } from "@/services/category.service";
import { getBrands } from "@/services/brand.service";

type AdminProductEditPageProps = {
    params: Promise<{ id: string }>;
};

export default async function AdminProductEditPage({
    params,
}: AdminProductEditPageProps) {
    const { id } = await params;

    const [product, stores, categories, brands] = await Promise.all([
        getProductById(id),
        getStores(),
        getCategories(),
        getBrands(),
    ]);

    if (!product) notFound();

    return (
        <Container>
            <PageTitle
                title="Modifier le produit"
                description={product.name}
            />

            <ProductForm
                stores={stores}
                categories={categories}
                brands={brands}
                product={product}
            />
        </Container>
    );
}
