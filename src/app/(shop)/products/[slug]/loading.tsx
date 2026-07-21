import { Container } from "@/components/layout";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailLoading() {
    return (
        <>
            <div className="border-b border-zinc-100 bg-slate-50 dark:border-zinc-800 dark:bg-zinc-900">
                <Container className="py-8 sm:py-10">
                    <Skeleton className="h-9 w-80" />
                    <Skeleton className="mt-3 h-4 w-40" />
                </Container>
            </div>

            <Container className="grid grid-cols-1 gap-10 py-8 lg:grid-cols-2">
                <div>
                    <Skeleton className="aspect-4/3 w-full" />

                    <div className="mt-3 flex gap-2">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <Skeleton key={i} className="h-16 w-16" />
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <Skeleton className="h-7 w-3/4" />
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-8 w-1/4" />

                    <div className="space-y-2 pt-4">
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-3 w-2/3" />
                    </div>

                    <Skeleton className="mt-8 h-11 w-full sm:w-48" />
                </div>
            </Container>
        </>
    );
}
