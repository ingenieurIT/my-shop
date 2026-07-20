import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { ROUTES } from "@/constants/routes";

export type BreadcrumbItem = {
    label: string;
    href?: string;
};

type BreadcrumbProps = {
    items: BreadcrumbItem[];
};

export function Breadcrumb({ items }: BreadcrumbProps) {
    const allItems: BreadcrumbItem[] = [
        { label: "Boutique", href: ROUTES.SHOP },
        ...items,
    ];

    return (
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
            {allItems.map((item, index) => {
                const isLast = index === allItems.length - 1;

                return (
                    <div key={item.label} className="flex items-center gap-2">
                        {item.href && !isLast ? (
                            <Link
                                href={item.href}
                                className="text-teal-600 transition-colors hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span
                                className={
                                    isLast
                                        ? "font-medium text-zinc-900 dark:text-zinc-50"
                                        : "text-zinc-500 dark:text-zinc-400"
                                }
                            >
                                {item.label}
                            </span>
                        )}

                        {!isLast && (
                            <ChevronRight className="h-3.5 w-3.5 text-zinc-300 dark:text-zinc-700" />
                        )}
                    </div>
                );
            })}
        </nav>
    );
}

export default Breadcrumb;
