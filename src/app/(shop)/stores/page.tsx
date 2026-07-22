import Link from "next/link";
import { ArrowRight, MapPin, Store as StoreIcon } from "lucide-react";

import { Container, PageHeader } from "@/components/layout";
import { ROUTES } from "@/constants/routes";
import { getStores } from "@/services/store.service";
import { getProducts } from "@/services/product.service";

// Reads live data — must never be prerendered at build time (build has no DB access guaranteed).
export const dynamic = "force-dynamic";

export default async function StoresDirectoryPage() {
    const [stores, products] = await Promise.all([
        getStores(),
        getProducts(),
    ]);

    const countByStore = products.reduce<Record<string, number>>(
        (acc, product) => {
            acc[product.storeId] = (acc[product.storeId] ?? 0) + 1;
            return acc;
        },
        {}
    );

    return (
        <>
            <PageHeader
                title="Nos boutiques"
                breadcrumbItems={[{ label: "Boutiques" }]}
            />

            <Container className="py-8">
                {stores.length === 0 ? (
                    <div className="rounded-xl border border-zinc-200 bg-white p-10 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
                        Aucune boutique pour le moment.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {stores.map((store) => {
                            const count = countByStore[store.id] ?? 0;

                            return (
                                <Link
                                    key={store.id}
                                    href={`${ROUTES.STORES}/${store.slug}`}
                                    className="group flex flex-col rounded-xl border border-zinc-200 bg-white p-5 transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 dark:bg-teal-500/15 dark:text-teal-400">
                                        <StoreIcon className="h-6 w-6" />
                                    </div>

                                    <h3 className="mt-4 text-base font-semibold text-zinc-900 dark:text-zinc-50">
                                        {store.name}
                                    </h3>

                                    {store.city && (
                                        <p className="mt-1 flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-400">
                                            <MapPin className="h-3.5 w-3.5" />
                                            {store.city}
                                        </p>
                                    )}

                                    <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
                                        {count} produit{count > 1 ? "s" : ""}
                                    </p>

                                    <span className="mt-4 flex items-center gap-1 text-sm font-medium text-teal-600 dark:text-teal-400">
                                        Voir la boutique
                                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </Container>
        </>
    );
}
