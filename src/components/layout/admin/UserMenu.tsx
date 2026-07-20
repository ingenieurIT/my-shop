"use client";

import { signOut, useSession } from "next-auth/react";
import { LogOut } from "lucide-react";

import { ROUTES } from "@/constants/routes";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ROLE_LABELS: Record<string, string> = {
    SUPER_ADMIN: "Super administrateur",
    STORE_MANAGER: "Gestionnaire boutique",
};

export function UserMenu() {
    const { data: session } = useSession();

    const name = session?.user?.name ?? "...";
    const role = session?.user?.role
        ? (ROLE_LABELS[session.user.role] ?? session.user.role)
        : "";

    const initials = name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className="
                    flex items-center gap-3
                    rounded-xl
                    px-3 py-2
                    transition-colors
                    hover:bg-slate-50
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-teal-500/30
                    dark:hover:bg-zinc-800
                "
                aria-label="Menu utilisateur"
            >
                <div
                    className="
                        flex h-9 w-9 items-center justify-center
                        rounded-full
                        bg-teal-50
                        text-sm font-semibold
                        text-teal-600
                        dark:bg-teal-500/15 dark:text-teal-400
                    "
                >
                    {initials || "?"}
                </div>

                <div className="hidden text-left sm:block">
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                        {name}
                    </p>

                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        {role}
                    </p>
                </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>{session?.user?.email}</DropdownMenuLabel>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    variant="destructive"
                    onClick={() => signOut({ callbackUrl: ROUTES.LOGIN })}
                >
                    <LogOut className="h-4 w-4" />
                    Se déconnecter
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default UserMenu;
