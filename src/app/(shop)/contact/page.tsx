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
                <p>
                    <a
                        href="tel:+237698178327"
                        className="transition-colors hover:text-teal-600 dark:hover:text-teal-400"
                    >
                        +237 698 178 327
                    </a>
                </p>
                <p>
                    <a
                        href="mailto:ivantchoumi2@gmail.com"
                        className="transition-colors hover:text-teal-600 dark:hover:text-teal-400"
                    >
                        ivantchoumi2@gmail.com
                    </a>
                </p>
            </Container>
        </>
    );
}
