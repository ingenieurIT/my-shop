import Link from "next/link";
import type { Brand, Category } from "@prisma/client";

import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";

type SidebarProps = {
    categories: Category[];
    brands: Brand[];
    activeCategory?: string;
    activeBrandId?: string;
    minPrice: number;
    maxPrice: number;
};

function buildHref(params: Record<string, string | undefined>) {
    const search = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value) search.set(key, value);
    });

    const query = search.toString();

    return query ? `${ROUTES.PRODUCTS}?${query}` : ROUTES.PRODUCTS;
}

export function Sidebar({
    categories,
    brands,
    activeCategory,
    activeBrandId,
    minPrice,
    maxPrice,
}: SidebarProps) {
    return (
        <aside className="w-full shrink-0 lg:w-64">
            <div>
                <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                    Catégories
                </h2>

                <ul className="mt-4 space-y-1">
                    <li>
                        <Link
                            href={ROUTES.PRODUCTS}
                            className={cn(
                                "block rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                !activeCategory
                                    ? "bg-teal-500/10 text-teal-600 dark:bg-teal-500/15 dark:text-teal-400"
                                    : "text-zinc-600 hover:bg-slate-50 dark:text-zinc-400 dark:hover:bg-zinc-800"
                            )}
                        >
                            Toutes les catégories
                        </Link>
                    </li>

                    {categories.map((category) => {
                        const isActive = activeCategory === category.slug;

                        return (
                            <li key={category.id}>
                                <Link
                                    href={buildHref({
                                        category: category.slug,
                                        brand: activeBrandId,
                                    })}
                                    className={cn(
                                        "block rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-teal-500/10 text-teal-600 dark:bg-teal-500/15 dark:text-teal-400"
                                            : "text-zinc-600 hover:bg-slate-50 dark:text-zinc-400 dark:hover:bg-zinc-800"
                                    )}
                                >
                                    {category.name}
                                </Link>

                                {isActive && (
                                    <ul className="mt-1 space-y-0.5 border-l border-zinc-100 pl-4 dark:border-zinc-800">
                                        {brands.map((brand) => (
                                            <li key={brand.id}>
                                                <Link
                                                    href={buildHref({
                                                        category: category.slug,
                                                        brand: brand.id,
                                                    })}
                                                    className={cn(
                                                        "block rounded-md px-3 py-1.5 text-sm transition-colors",
                                                        activeBrandId === brand.id
                                                            ? "font-medium text-teal-600 dark:text-teal-400"
                                                            : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                                                    )}
                                                >
                                                    {brand.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className="mt-8 border-t border-zinc-100 pt-6 dark:border-zinc-800">
                <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                    Prix
                </h2>

                <div className="mt-4">
                    <div className="h-1.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800">
                        <div className="h-1.5 w-2/3 rounded-full bg-teal-500" />
                    </div>

                    <div className="mt-2 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                        <span>{formatPrice(minPrice)}</span>
                        <span>{formatPrice(maxPrice)}</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
