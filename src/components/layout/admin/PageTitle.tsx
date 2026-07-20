type PageTitleProps = {
    title: string;
    description?: string;
    actions?: React.ReactNode;
};

export function PageTitle({ title, description, actions }: PageTitleProps) {
    return (
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                    {title}
                </h1>

                {description && (
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                        {description}
                    </p>
                )}
            </div>

            {actions && (
                <div className="flex items-center gap-2">
                    {actions}
                </div>
            )}
        </div>
    );
}

export default PageTitle;
