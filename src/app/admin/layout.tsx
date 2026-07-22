import { Sidebar, Header } from "@/components/layout/admin";

// Admin data must always be fresh (never served from the static build cache).
export const dynamic = "force-dynamic";

export default function AdminLayout({
                                        children,
                                    }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-zinc-950">

            <Sidebar />

            <div className="flex min-h-screen flex-col lg:ml-72">

                <Header />

                <main className="flex-1 p-4 sm:p-6">
                    {children}
                </main>

            </div>

        </div>
    );
}