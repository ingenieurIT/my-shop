import Link from "next/link";
import { Plus } from "lucide-react";

import { Container, PageTitle } from "@/components/layout/admin";
import { ProductRowActions } from "@/components/admin/products/ProductRowActions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

const STATUS_VARIANT: Record<string, "default" | "secondary" | "destructive"> = {
    AVAILABLE: "default",
    OUT_OF_STOCK: "secondary",
    DISCONTINUED: "destructive",
};

export default async function AdminProductsPage() {
    const products = await getProducts();

    return (
        <Container>
            <PageTitle
                title="Produits"
                description="Gérez le catalogue de produits."
                actions={
                    <Button
                        render={<Link href={ROUTES.ADMIN_PRODUCTS_CREATE} />}
                        nativeButton={false}
                        className="gap-1.5 bg-teal-600 text-white hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-500"
                    >
                        <Plus className="h-4 w-4" />
                        Ajouter un produit
                    </Button>
                }
            />

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
                                    Aucun produit pour le moment.
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
                                        <ProductRowActions
                                            productId={product.id}
                                            productName={product.name}
                                        />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </Container>
    );
}
