"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { deleteProductAction } from "@/actions/product.actions";
import type { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ExportProductButton } from "@/components/admin/export/ExportProductButton";

type ProductRowActionsProps = {
    product: Product;
};

export function ProductRowActions({ product }: ProductRowActionsProps) {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    function handleDelete() {
        startTransition(async () => {
            const result = await deleteProductAction(product.id);

            if (result.success) {
                toast.success(result.message);
            } else {
                toast.error(result.message);
            }

            setOpen(false);
        });
    }

    return (
        <div className="flex justify-end gap-1">
            <ExportProductButton product={product} />

            <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Modifier"
                render={<Link href={`/admin/products/${product.id}`} />}
                nativeButton={false}
            >
                <Pencil className="h-4 w-4" />
            </Button>

            <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label="Supprimer"
                className="text-red-600 hover:bg-red-500/10 hover:text-red-600 dark:text-red-400"
                onClick={() => setOpen(true)}
            >
                <Trash2 className="h-4 w-4" />
            </Button>

            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Supprimer ce produit ?</AlertDialogTitle>
                        <AlertDialogDescription>
                            « {product.name} » sera définitivement supprimé. Cette action
                            est irréversible.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={isPending}
                            className="bg-red-600 text-white hover:bg-red-700"
                        >
                            Supprimer
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

export default ProductRowActions;
