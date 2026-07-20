import { Container, PageTitle } from "@/components/layout/admin";
import { ProductForm } from "@/components/admin/products/ProductForm";
import { getStores } from "@/services/store.service";
import { getCategories } from "@/services/category.service";
import { getBrands } from "@/services/brand.service";

export default async function AdminProductCreatePage() {
    const [stores, categories, brands] = await Promise.all([
        getStores(),
        getCategories(),
        getBrands(),
    ]);

    return (
        <Container>
            <PageTitle
                title="Nouveau produit"
                description="Ajoute un produit au catalogue."
            />

            <ProductForm stores={stores} categories={categories} brands={brands} />
        </Container>
    );
}
