import { Container, PageHeader } from "@/components/layout";
import { APP } from "@/constants/app";

export default function AboutPage() {
    return (
        <>
            <PageHeader
                title="À propos"
                breadcrumbItems={[{ label: "À propos" }]}
            />

            <Container className="max-w-3xl py-10">
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {APP.DESCRIPTION}. {APP.COMPANY} regroupe les boutiques GLC et
                    ELS pour proposer un catalogue unifié d&apos;équipements
                    informatiques et électroniques.
                </p>
            </Container>
        </>
    );
}
