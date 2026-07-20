"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTitle,
} from "@/components/ui/sheet";

import { Logo } from "./Logo";
import { Navigation } from "./Navigation";

export function MobileSidebar() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    return (
        <Sheet
            open={open}
            onOpenChange={setOpen}
            key={pathname}
        >
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

            <SheetContent
                side="left"
                className="w-72 border-r border-zinc-200 bg-white p-0 dark:border-zinc-800 dark:bg-zinc-900"
            >
                <SheetTitle className="sr-only">
                    Navigation principale
                </SheetTitle>

                <div className="flex h-20 items-center border-b border-zinc-100 px-6 dark:border-zinc-800">
                    <Logo />
                </div>

                <Navigation />
            </SheetContent>
        </Sheet>
    );
}

export default MobileSidebar;
