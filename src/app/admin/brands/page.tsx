import { Container, PageTitle } from "@/components/layout/admin";
import { BrandsManager } from "@/components/admin/brands/BrandsManager";
import { getBrands } from "@/services/brand.service";

export default async function AdminBrandsPage() {
    const brands = await getBrands();

    return (
        <Container>
            <PageTitle
                title="Marques"
                description="Gérez les marques disponibles."
            />

            <BrandsManager brands={brands} />
        </Container>
    );
}
