import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    basePath: string;
    searchParams?: Record<string, string | undefined>;
};

function buildPageHref(
    basePath: string,
    params: Record<string, string | undefined>,
    page: number
) {
    const search = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value) search.set(key, value);
    });

    if (page > 1) search.set("page", String(page));

    const query = search.toString();

    return query ? `${basePath}?${query}` : basePath;
}

function getPageNumbers(
    current: number,
    total: number
): (number | "ellipsis")[] {
    if (total <= 7) {
        return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pageSet = new Set<number>([1, total, current, current - 1, current + 1]);

    const sorted = [...pageSet]
        .filter((page) => page >= 1 && page <= total)
        .sort((a, b) => a - b);

    const result: (number | "ellipsis")[] = [];
    let previous = 0;

    for (const page of sorted) {
        if (page - previous > 1) result.push("ellipsis");
        result.push(page);
        previous = page;
    }

    return result;
}

export function Pagination({
    currentPage,
    totalPages,
    basePath,
    searchParams = {},
}: PaginationProps) {
    if (totalPages <= 1) return null;

    const pages = getPageNumbers(currentPage, totalPages);
    const isFirst = currentPage <= 1;
    const isLast = currentPage >= totalPages;

    return (
        <nav
            aria-label="Pagination"
            className="mt-8 flex items-center justify-center gap-1"
        >
            <Link
                href={buildPageHref(basePath, searchParams, Math.max(1, currentPage - 1))}
                aria-label="Page précédente"
                aria-disabled={isFirst}
                tabIndex={isFirst ? -1 : undefined}
                className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 transition-colors dark:border-zinc-800 dark:text-zinc-400",
                    isFirst
                        ? "pointer-events-none opacity-40"
                        : "hover:bg-slate-50 dark:hover:bg-zinc-800"
                )}
            >
                <ChevronLeft className="h-4 w-4" />
            </Link>

            {pages.map((page, index) =>
                page === "ellipsis" ? (
                    <span
                        key={`ellipsis-${index}`}
                        className="px-2 text-sm text-zinc-400 dark:text-zinc-600"
                    >
                        …
                    </span>
                ) : (
                    <Link
                        key={page}
                        href={buildPageHref(basePath, searchParams, page)}
                        aria-current={page === currentPage ? "page" : undefined}
                        className={cn(
                            "flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors",
                            page === currentPage
                                ? "bg-teal-600 text-white"
                                : "text-zinc-600 hover:bg-slate-50 dark:text-zinc-400 dark:hover:bg-zinc-800"
                        )}
                    >
                        {page}
                    </Link>
                )
            )}

            <Link
                href={buildPageHref(
                    basePath,
                    searchParams,
                    Math.min(totalPages, currentPage + 1)
                )}
                aria-label="Page suivante"
                aria-disabled={isLast}
                tabIndex={isLast ? -1 : undefined}
                className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 transition-colors dark:border-zinc-800 dark:text-zinc-400",
                    isLast
                        ? "pointer-events-none opacity-40"
                        : "hover:bg-slate-50 dark:hover:bg-zinc-800"
                )}
            >
                <ChevronRight className="h-4 w-4" />
            </Link>
        </nav>
    );
}

export default Pagination;
