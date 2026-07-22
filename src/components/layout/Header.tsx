"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Menu, Search, ShoppingCart, User } from "lucide-react";

import { ROUTES } from "@/constants/routes";
import { SHOP_NAVIGATION } from "@/constants/navigations";
import { cn } from "@/lib/utils";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Sheet,
    SheetContent,
    SheetTitle,
} from "@/components/ui/sheet";

import { Container } from "./Container";

export function Header() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [open, setOpen] = useState(false);

    const searchAction = pathname.startsWith(`${ROUTES.STORES}/`)
        ? pathname
        : ROUTES.PRODUCTS;

    return (
        <header className="sticky top-0 z-30 border-b border-zinc-100 bg-white dark:border-zinc-800 dark:bg-zinc-950">
            <Container className="flex h-18 items-center gap-4 py-3 sm:h-20">
                <Link
                    href={ROUTES.SHOP}
                    className="flex items-center gap-2 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-teal-500/30"
                >
                    <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        Link<span className="text-teal-600 dark:text-teal-400">IT Deal</span>
                    </span>
                </Link>

                <nav
                    aria-label="Navigation principale"
                    className="hidden items-center gap-6 lg:flex"
                >
                    {SHOP_NAVIGATION.map((item) => {
                        const isActive = pathname === item.href.split("?")[0];

                        return (
                            <Link
                                key={item.title}
                                href={item.href}
                                className={cn(
                                    "text-sm font-medium transition-colors",
                                    isActive
                                        ? "text-teal-600 dark:text-teal-400"
                                        : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                                )}
                            >
                                {item.title}
                            </Link>
                        );
                    })}
                </nav>

                <form
                    action={searchAction}
                    className="ml-auto hidden max-w-xs flex-1 items-center sm:flex"
                >
                    <div className="relative w-full">
                        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                        <Input
                            id="header-search-desktop"
                            suppressHydrationWarning
                            type="search"
                            name="search"
                            key={searchParams.get("search") ?? ""}
                            defaultValue={searchParams.get("search") ?? ""}
                            placeholder="Rechercher un produit..."
                            className="h-9 pl-8"
                        />
                    </div>
                </form>

                <div className="ml-auto flex items-center gap-1 sm:ml-0">
                    <ThemeToggle />

                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label="Panier"
                        className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                    >
                        <ShoppingCart className="h-5 w-5" />
                    </Button>

                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label="Mon compte"
                        className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                    >
                        <User className="h-5 w-5" />
                    </Button>

                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label="Ouvrir le menu"
                        className="text-zinc-500 hover:text-zinc-900 lg:hidden dark:text-zinc-400 dark:hover:text-zinc-50"
                        onClick={() => setOpen(true)}
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>
            </Container>

            <Sheet open={open} onOpenChange={setOpen} key={pathname}>
                <SheetContent
                    side="right"
                    className="w-72 bg-white p-0 dark:bg-zinc-950"
                >
                    <SheetTitle className="sr-only">
                        Navigation principale
                    </SheetTitle>

                    <nav
                        aria-label="Navigation principale"
                        className="flex flex-col gap-1 p-4"
                    >
                        {SHOP_NAVIGATION.map((item) => (
                            <Link
                                key={item.title}
                                href={item.href}
                                className="rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-700 hover:bg-slate-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
                            >
                                {item.title}
                            </Link>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
        </header>
    );
}

export default Header;
