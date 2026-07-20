"use client";

import { usePathname } from "next/navigation";

import { ADMIN_NAVIGATION } from "@/constants/navigations";
import { ROUTES } from "@/constants/routes";

type BreadcrumbProps = {
    items?: string[];
};

export function Breadcrumb({ items }: BreadcrumbProps) {
    const pathname = usePathname();

    const current = ADMIN_NAVIGATION.find(
        (item) =>
            pathname === item.href ||
            (item.href !== ROUTES.ADMIN && pathname.startsWith(`${item.href}/`))
    );

    const resolvedItems = items ?? ["Admin", current?.title ?? "Dashboard"];

    return (
        <nav
            aria-label="Breadcrumb"
            className="
                flex items-center
                gap-2
                text-sm
            "
        >
            {resolvedItems.map((item, index) => (
                <div
                    key={item}
                    className="flex items-center gap-2"
                >

                    <span
                        className={
                            index === resolvedItems.length - 1
                                ? "font-medium text-zinc-900 dark:text-zinc-50"
                                : "text-zinc-500 dark:text-zinc-400"
                        }
                    >
                        {item}
                    </span>


                    {index !== resolvedItems.length - 1 && (
                        <span className="text-zinc-300 dark:text-zinc-700">
                            /
                        </span>
                    )}

                </div>
            ))}

        </nav>
    );
}

export default Breadcrumb;
