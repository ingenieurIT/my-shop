"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Changer de thème"
            onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
            {mounted && resolvedTheme === "dark" ? (
                <Sun className="h-4.5 w-4.5" />
            ) : (
                <Moon className="h-4.5 w-4.5" />
            )}
        </Button>
    );
}

export default ThemeToggle;
