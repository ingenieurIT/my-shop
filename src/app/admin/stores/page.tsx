import { Container, PageTitle } from "@/components/layout/admin";
import { StoresManager } from "@/components/admin/stores/StoresManager";
import { getStores } from "@/services/store.service";

export default async function AdminStoresPage() {
    const stores = await getStores();

    return (
        <Container>
            <PageTitle
                title="Boutiques"
                description="Gérez vos boutiques"
            />

            <StoresManager stores={stores} />
        </Container>
    );
}
