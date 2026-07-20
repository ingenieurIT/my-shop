import { ThemeToggle } from "@/components/theme-toggle";

import { Breadcrumb } from "./Breadcrumb";
import { MobileSidebar } from "./MobileSidebar";
import { UserMenu } from "./UserMenu";

export function Header() {
    return (
        <header
            className="
                sticky top-0 z-30
                flex h-16 items-center justify-between
                border-b border-zinc-100
                bg-white px-4 sm:px-6
                dark:border-zinc-800 dark:bg-zinc-900
            "
        >
            <div className="flex items-center gap-4">
                <MobileSidebar />

                <Breadcrumb />
            </div>

            <div className="flex items-center gap-2">
                <ThemeToggle />

                <UserMenu />
            </div>
        </header>
    );
}

export default Header;