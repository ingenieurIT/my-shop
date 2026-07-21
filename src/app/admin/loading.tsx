import { Container } from "@/components/layout/admin";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminLoading() {
    return (
        <Container>
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <Skeleton className="h-7 w-40" />
                    <Skeleton className="mt-2 h-4 w-56" />
                </div>

                <Skeleton className="h-9 w-40" />
            </div>

            <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
                <div className="border-b border-zinc-200 p-3 dark:border-zinc-800">
                    <Skeleton className="h-4 w-full" />
                </div>

                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-4 border-b border-zinc-100 p-3 last:border-0 dark:border-zinc-900"
                    >
                        <Skeleton className="h-10 w-10 shrink-0 rounded-lg" />
                        <Skeleton className="h-4 flex-1" />
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-16" />
                    </div>
                ))}
            </div>
        </Container>
    );
}
