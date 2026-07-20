import { Container, PageTitle } from "@/components/layout/admin";
import { CategoriesManager } from "@/components/admin/categories/CategoriesManager";
import { getCategories } from "@/services/category.service";

export default async function AdminCategoriesPage() {
    const categories = await getCategories();

    return (
        <Container>
            <PageTitle
                title="Catégories"
                description="Organisez vos produits par catégorie."
            />

            <CategoriesManager categories={categories} />
        </Container>
    );
}
