import { Container, PageTitle } from "@/components/layout/admin";

export default function AdminCategoriesPage() {
    return (
        <Container>
            <PageTitle
                title="Catégories"
                description="Organisez vos produits par catégorie."
            />

            <div className="rounded-xl border border-zinc-200 bg-white p-10 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
                Aucune catégorie pour le moment.
            </div>
        </Container>
    );
}
