import Link from "next/link";
import { Plus, Search } from "lucide-react";

import { Container, PageTitle } from "@/components/layout/admin";
import { ProductRowActions } from "@/components/admin/products/ProductRowActions";
import { ExportCatalogButton } from "@/components/admin/export/ExportCatalogButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ROUTES } from "@/constants/routes";
import { PRODUCT_STATUS } from "@/constants/status";
import { formatPrice } from "@/lib/format";
import { getProducts } from "@/services/product.service";
import { getStores } from "@/services/store.service";

const STATUS_VARIANT: Record<string, "default" | "secondary" | "destructive"> = {
    AVAILABLE: "default",
    OUT_OF_STOCK: "secondary",
    DISCONTINUED: "destructive",
};

const PRODUCTS_PER_PAGE = 10;

type AdminProductsPageProps = {
    searchParams: Promise<{ search?: string; page?: string }>;
};

export default async function AdminProductsPage({
    searchParams,
}: AdminProductsPageProps) {
    const { search, page } = await searchParams;

    const [allProducts, stores] = await Promise.all([
        getProducts(),
        getStores(),
    ]);

    const searchTerm = search?.trim().toLowerCase();

    const filteredProducts = searchTerm
        ? allProducts.filter((product) =>
              [
                  product.name,
                  product.sku ?? "",
                  product.store.name,
                  product.brand.name,
                  product.category.name,
              ]
                  .join(" ")
                  .toLowerCase()
                  .includes(searchTerm)
          )
        : allProducts;

    const totalPages = Math.max(
        1,
        Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
    );
    const currentPage = Math.min(Math.max(1, Number(page) || 1), totalPages);
    const products = filteredProducts.slice(
        (currentPage - 1) * PRODUCTS_PER_PAGE,
        currentPage * PRODUCTS_PER_PAGE
    );

    return (
        <Container>
            <PageTitle
                title="Produits"
                description="Gérez le catalogue de produits."
                actions={
                    <div className="flex items-center gap-2">
                        <ExportCatalogButton products={allProducts} stores={stores} />

                        <Button
                            render={<Link href={ROUTES.ADMIN_PRODUCTS_CREATE} />}
                            nativeButton={false}
                            className="gap-1.5 bg-teal-600 text-white hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-500"
                        >
                            <Plus className="h-4 w-4" />
                            Ajouter un produit
                        </Button>
                    </div>
                }
            />

            <form
                action={ROUTES.ADMIN_PRODUCTS}
                className="mb-4 max-w-xs"
            >
                <div className="relative">
                    <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                    <Input
                        type="search"
                        name="search"
                        defaultValue={search ?? ""}
                        placeholder="Rechercher un produit..."
                        className="h-9 pl-8"
                    />
                </div>
            </form>

            <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Produit</TableHead>
                            <TableHead>Boutique</TableHead>
                            <TableHead>Prix</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {products.length === 0 && (
                            <TableRow>
                                <TableCell
                                    colSpan={6}
                                    className="py-10 text-center text-sm text-zinc-500 dark:text-zinc-400"
                                >
                                    {searchTerm
                                        ? "Aucun produit ne correspond à cette recherche."
                                        : "Aucun produit pour le moment."}
                                </TableCell>
                            </TableRow>
                        )}

                        {products.map((product) => {
                            const cover = product.images[0];
                            const statusLabel =
                                PRODUCT_STATUS.find((s) => s.value === product.status)
                                    ?.label ?? product.status;

                            return (
                                <TableRow key={product.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
                                                {cover && (
                                                    // eslint-disable-next-line @next/next/no-img-element -- arbitrary admin-pasted URL, not an allowlisted domain
                                                    <img
                                                        src={cover.imageUrl}
                                                        alt={cover.alt ?? product.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                )}
                                            </div>

                                            <span className="font-medium text-zinc-900 dark:text-zinc-50">
                                                {product.name}
                                            </span>
                                        </div>
                                    </TableCell>

                                    <TableCell className="text-zinc-500 dark:text-zinc-400">
                                        {product.store.name}
                                    </TableCell>

                                    <TableCell className="text-zinc-500 dark:text-zinc-400">
                                        {formatPrice(product.price)}
                                    </TableCell>

                                    <TableCell className="text-zinc-500 dark:text-zinc-400">
                                        {product.stock}
                                    </TableCell>

                                    <TableCell>
                                        <Badge variant={STATUS_VARIANT[product.status]}>
                                            {statusLabel}
                                        </Badge>
                                    </TableCell>

                                    <TableCell className="text-right">
                                        <ProductRowActions product={product} />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                basePath={ROUTES.ADMIN_PRODUCTS}
                searchParams={{ search }}
            />
        </Container>
    );
}
