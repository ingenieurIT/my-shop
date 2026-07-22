import { Suspense } from "react";

import { Topbar, Header, Footer } from "@/components/layout";

export default function ShopLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex min-h-screen flex-col bg-white dark:bg-zinc-950">
            {/*<Topbar />*/}

            <Suspense>
                <Header />
            </Suspense>

            <main className="flex-1">
                {children}
            </main>

            <Footer />
        </div>
    );
}
