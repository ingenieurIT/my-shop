export function UserMenu() {
    return (
        <button
            type="button"
            aria-label="Menu utilisateur"
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
                IT
            </div>

            <div className="hidden text-left sm:block">
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                    Ivan
                </p>

                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Administrateur
                </p>
            </div>
        </button>
    );
}

export default UserMenu;