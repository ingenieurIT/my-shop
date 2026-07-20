import Link from "next/link";

import { APP } from "@/constants/app";
import { ROUTES } from "@/constants/routes";

type LogoProps = {
    collapsed?: boolean;
};

export function Logo({
    collapsed = false,
}: LogoProps) {
    return (
        <Link
            href={ROUTES.ADMIN}
            aria-label={`${APP.NAME} - Dashboard`}
            className="
                group flex items-center gap-3 rounded-xl
                outline-none transition-all duration-200
                focus-visible:ring-2 focus-visible:ring-teal-500/30
            "
        >
            <div
                className="
                    flex h-11 w-11 shrink-0 items-center justify-center
                    rounded-xl bg-teal-500/10 text-teal-600
                    transition-colors duration-200
                    group-hover:bg-teal-500/15
                    dark:bg-teal-500/15 dark:text-teal-400
                    dark:group-hover:bg-teal-500/20
                "
            >
                <span className="text-lg font-bold tracking-tight">
                    L
                </span>
            </div>

            {!collapsed && (
                <div className="flex flex-col">
                    <span className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                        {APP.NAME}
                    </span>

                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        Admin Dashboard
                    </span>
                </div>
            )}
        </Link>
    );
}

export default Logo;
