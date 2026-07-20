import { cn } from "@/lib/utils";

type ContainerProps = {
    children: React.ReactNode;
    className?: string;
};

export function Container({ children, className }: ContainerProps) {
    return (
        <div className={cn("mx-auto w-full max-w-7xl", className)}>
            {children}
        </div>
    );
}

export default Container;
