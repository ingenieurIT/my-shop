"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import type { Store } from "@prisma/client";
import { Download, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

import type { Product } from "@/types/product";
import { proxiedImageUrl, toDataUrl } from "@/lib/image-proxy";
import { capturePng } from "@/lib/capture";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { CatalogPoster } from "./CatalogPoster";

const ALL_STORES_VALUE = "__all__";

const FALLBACK_IMAGE =
    "https://placehold.co/480x480/f4f4f5/71717a/png?text=Produit";

type ExportCatalogButtonProps = {
    products: Product[];
    stores: Store[];
};

export function ExportCatalogButton({
    products,
    stores,
}: ExportCatalogButtonProps) {
    const [open, setOpen] = useState(false);
    const [storeId, setStoreId] = useState<string>(ALL_STORES_VALUE);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [imagesReady, setImagesReady] = useState(false);
    const [imageMap, setImageMap] = useState<Record<string, string>>({});
    const [isPending, startTransition] = useTransition();
    const posterRef = useRef<HTMLDivElement>(null);

    const selectedStore = stores.find((store) => store.id === storeId);

    const filteredProducts =
        storeId === ALL_STORES_VALUE
            ? products
            : products.filter((product) => product.storeId === storeId);

    const selectedProducts = filteredProducts.filter((product) =>
        selectedIds.has(product.id)
    );

    const allSelected =
        filteredProducts.length > 0 &&
        selectedProducts.length === filteredProducts.length;

    const title = selectedStore ? selectedStore.name : "Tous nos produits";

    useEffect(() => {
        setSelectedIds(new Set(filteredProducts.map((product) => product.id)));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storeId]);

    function toggleProduct(id: string) {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    }

    function toggleAll() {
        setSelectedIds(
            allSelected
                ? new Set()
                : new Set(filteredProducts.map((product) => product.id))
        );
    }

    useEffect(() => {
        if (!open) return;

        const imageUrls = Array.from(
            new Set(
                filteredProducts.map(
                    (product) => product.images[0]?.imageUrl ?? FALLBACK_IMAGE
                )
            )
        );

        setImagesReady(false);

        Promise.all(
            imageUrls.map((url) =>
                toDataUrl(url)
                    .then((dataUrl) => [url, dataUrl] as const)
                    .catch(() => [url, null] as const)
            )
        ).then((results) => {
            const map: Record<string, string> = {};

            results.forEach(([url, dataUrl]) => {
                if (dataUrl) map[url] = dataUrl;
            });

            setImageMap(map);
            setImagesReady(true);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, storeId]);

    function handleDownload() {
        if (!posterRef.current) return;

        startTransition(async () => {
            try {
                const dataUrl = await capturePng(posterRef.current!);

                const link = document.createElement("a");
                link.download = `catalogue-${selectedStore?.slug ?? "toutes-boutiques"}.png`;
                link.href = dataUrl;
                link.click();

                toast.success("Catalogue téléchargé");
            } catch (error) {
                console.error("Erreur d'export du catalogue :", error);
                toast.error("Erreur lors de la génération du catalogue");
            }
        });
    }

    return (
        <>
            <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(true)}
                className="gap-1.5"
            >
                <ImageIcon className="h-4 w-4" />
                Exporter le catalogue
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>Exporter le catalogue en image</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-1.5">
                        <Label>Boutique</Label>

                        <Select
                            value={storeId}
                            onValueChange={(value) => setStoreId(value as string)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue>
                                    {(value: string) =>
                                        value === ALL_STORES_VALUE
                                            ? "Toutes les boutiques"
                                            : stores.find(
                                                  (store) => store.id === value
                                              )?.name
                                    }
                                </SelectValue>
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value={ALL_STORES_VALUE}>
                                    Toutes les boutiques
                                </SelectItem>

                                {stores.map((store) => (
                                    <SelectItem key={store.id} value={store.id}>
                                        {store.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                            <Label>
                                Produits ({selectedProducts.length}/
                                {filteredProducts.length} sélectionnés)
                            </Label>

                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={toggleAll}
                                disabled={filteredProducts.length === 0}
                            >
                                {allSelected
                                    ? "Tout désélectionner"
                                    : "Tout sélectionner"}
                            </Button>
                        </div>

                        <div className="max-h-56 overflow-y-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
                            {filteredProducts.length === 0 ? (
                                <p className="p-4 text-center text-sm text-zinc-500 dark:text-zinc-400">
                                    Aucun produit dans cette boutique.
                                </p>
                            ) : (
                                filteredProducts.map((product) => {
                                    const cover =
                                        product.images[0]?.imageUrl ?? FALLBACK_IMAGE;

                                    return (
                                        <label
                                            key={product.id}
                                            className="flex cursor-pointer items-center gap-3 border-b border-zinc-100 px-3 py-2 last:border-b-0 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50"
                                        >
                                            <Checkbox
                                                checked={selectedIds.has(product.id)}
                                                onCheckedChange={() =>
                                                    toggleProduct(product.id)
                                                }
                                            />

                                            <div className="h-8 w-8 shrink-0 overflow-hidden rounded-md bg-zinc-100 dark:bg-zinc-800">
                                                {/* eslint-disable-next-line @next/next/no-img-element -- proxied thumbnail preview only, not part of the exported poster */}
                                                <img
                                                    src={proxiedImageUrl(cover)}
                                                    alt={product.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>

                                            <span className="min-w-0 flex-1 truncate text-sm text-zinc-700 dark:text-zinc-300">
                                                {product.name}
                                            </span>

                                            <span className="shrink-0 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                                                {formatPrice(product.price)}
                                            </span>
                                        </label>
                                    );
                                })
                            )}
                        </div>
                    </div>

                    <div className="max-h-[55vh] overflow-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
                        <CatalogPoster
                            ref={posterRef}
                            products={selectedProducts}
                            title={title}
                            subtitle="Catalogue produits"
                            contactPhone={selectedStore?.phone}
                            contactEmail={selectedStore?.email}
                            imageMap={imageMap}
                        />
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            disabled={isPending || !imagesReady || selectedProducts.length === 0}
                            onClick={handleDownload}
                            className="gap-1.5 bg-teal-600 text-white hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-500"
                        >
                            <Download className="h-4 w-4" />
                            {!imagesReady
                                ? "Préparation..."
                                : isPending
                                  ? "Génération..."
                                  : "Télécharger en PNG"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default ExportCatalogButton;
