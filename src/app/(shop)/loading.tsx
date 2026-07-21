import { Container } from "@/components/layout";
import { Skeleton } from "@/components/ui/skeleton";

export default function ShopLoading() {
    return (
        <>
            <div className="border-b border-zinc-100 bg-slate-50 dark:border-zinc-800 dark:bg-zinc-900">
                <Container className="py-8 sm:py-10">
                    <Skeleton className="h-9 w-64" />
                    <Skeleton className="mt-3 h-4 w-40" />
                </Container>
            </div>

            <Container className="flex flex-col gap-8 py-8 lg:flex-row lg:gap-10">
                <aside className="w-full shrink-0 lg:w-64">
                    <Skeleton className="h-4 w-24" />

                    <div className="mt-4 space-y-2">
                        {Array.from({ length: 7 }).map((_, i) => (
                            <Skeleton key={i} className="h-9 w-full" />
                        ))}
                    </div>
                </aside>

                <div className="flex-1">
                    <div className="mb-4 flex items-center justify-between">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-16" />
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div
                                key={i}
                                className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800"
                            >
                                <Skeleton className="aspect-4/3 w-full rounded-none" />

                                <div className="space-y-3 p-4">
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-3 w-1/2" />
                                    <Skeleton className="h-3 w-1/3" />
                                    <Skeleton className="h-9 w-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </>
    );
}
