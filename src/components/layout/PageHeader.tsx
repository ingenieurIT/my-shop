import Image from "next/image";

import { Breadcrumb, type BreadcrumbItem } from "./Breadcrumb";
import { Container } from "./Container";

type PageHeaderProps = {
    title: string;
    breadcrumbItems: BreadcrumbItem[];
};

const BANNER_IMAGE = "/banner4.jpg";

export function PageHeader({ title, breadcrumbItems }: PageHeaderProps) {
    return (
        <div className="relative isolate overflow-hidden border-b border-zinc-100 dark:border-zinc-800">
            <Image
                src={BANNER_IMAGE}
                alt=""
                fill
                priority
                className="object-cover"
            />

            <div className="absolute inset-0 bg-slate-50/60 dark:bg-zinc-900/70" />

            <Container className="relative py-8 sm:py-10">
                <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
                    {title}
                </h1>

                <div className="mt-3">
                    <Breadcrumb items={breadcrumbItems} />
                </div>
            </Container>
        </div>
    );
}

export default PageHeader;