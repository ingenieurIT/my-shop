"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ChevronRight, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type SidebarItemProps = {
    title: string;
    href: string;
    icon: LucideIcon;
    collapsed?: boolean;
};

export function SidebarItem({
    title,
    href,
    icon: Icon,
    collapsed = false,
}: SidebarItemProps) {
    const pathname = usePathname();

    const isActive =
        pathname === href ||
        (href !== "/admin" && pathname.startsWith(`${href}/`));

    return (
        <Link
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
                "group relative flex h-12 items-center rounded-xl transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/30",

                collapsed ? "justify-center px-3" : "px-4",

                isActive
                    ? "bg-teal-500/10 text-teal-600 dark:bg-teal-500/15 dark:text-teal-400"
                    : "text-zinc-600 hover:bg-slate-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
            )}
        >
            <span
                aria-hidden="true"
                className={cn(
                    "absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-teal-500 transition-opacity dark:bg-teal-400",
                    isActive ? "opacity-100" : "opacity-0"
                )}
            />

            <Icon
                className={cn(
                    "h-5 w-5 flex-shrink-0 transition-colors",
                    isActive
                        ? "text-teal-600 dark:text-teal-400"
                        : "text-zinc-500 group-hover:text-zinc-900 dark:text-zinc-500 dark:group-hover:text-zinc-50"
                )}
            />

            {!collapsed && (
                <>
                    <span className="ml-3 flex-1 truncate text-sm font-medium">
                        {title}
                    </span>

                    <ChevronRight
                        className={cn(
                            "h-4 w-4 transition-all duration-200",
                            isActive
                                ? "translate-x-0 text-teal-600 opacity-100 dark:text-teal-400"
                                : "translate-x-[-4px] text-zinc-300 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 dark:text-zinc-600"
                        )}
                    />
                </>
            )}
        </Link>
    );
}

export default SidebarItem;
