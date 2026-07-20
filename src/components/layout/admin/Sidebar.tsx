"use client";

import { cn } from "@/lib/utils";

import { Logo } from "./Logo";
import { Navigation } from "./Navigation";

type SidebarProps = {
    collapsed?: boolean;
    className?: string;
};

export function Sidebar({
    collapsed = false,
    className,
}: SidebarProps) {
    return (
        <aside
            className={cn(
                "fixed left-0 top-0 z-40",
                "hidden lg:flex h-screen flex-col",
                "border-r border-zinc-200 dark:border-zinc-800",
                "bg-white dark:bg-zinc-900",
                "transition-all duration-300",
                collapsed ? "w-20" : "w-72",
                className
            )}
        >
            <div className="flex h-20 items-center border-b border-zinc-100 px-6 dark:border-zinc-800">
                <Logo collapsed={collapsed} />
            </div>

            <Navigation collapsed={collapsed} />

            <footer className="border-t border-zinc-100 p-4 dark:border-zinc-800">
                {collapsed ? (
                    <div className="flex justify-center">
                        <div className="h-2 w-2 rounded-full bg-teal-500 dark:bg-teal-400" />
                    </div>
                ) : (
                    <div className="rounded-xl bg-slate-50 px-3 py-3 dark:bg-zinc-800">
                        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                            LinkIT Deal
                        </p>

                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            Gestion multi-boutiques
                        </p>
                    </div>
                )}
            </footer>
        </aside>
    );
}

export default Sidebar;
