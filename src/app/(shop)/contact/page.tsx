import { Container, PageHeader } from "@/components/layout";

export default function ContactPage() {
    return (
        <>
            <PageHeader
                title="Contact"
                breadcrumbItems={[{ label: "Contact" }]}
            />

            <Container className="max-w-3xl space-y-2 py-10 text-sm text-zinc-600 dark:text-zinc-400">
                <p>Douala, Cameroun</p>
                <p>+237 6XX XXX XXX</p>
                <p>contact@linkitdeal.com</p>
            </Container>
        </>
    );
}
