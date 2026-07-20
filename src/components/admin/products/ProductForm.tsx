"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Brand, Category, ProductStatus, Store } from "@prisma/client";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { ROUTES } from "@/constants/routes";
import { PRODUCT_STATUS } from "@/constants/status";
import { slugify } from "@/lib/slug";
import type { Product } from "@/types/product";
import {
    createProductAction,
    updateProductAction,
} from "@/actions/product.actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type ImageRow = { imageUrl: string; alt: string };
type SpecRow = { key: string; value: string };

type ProductFormProps = {
    stores: Store[];
    categories: Category[];
    brands: Brand[];
    product?: Product;
};

export function ProductForm({
    stores,
    categories,
    brands,
    product,
}: ProductFormProps) {
    const router = useRouter();
    const isEditing = !!product;
    const [isPending, startTransition] = useTransition();
    const [slugTouched, setSlugTouched] = useState(isEditing);

    const [name, setName] = useState(product?.name ?? "");
    const [slug, setSlug] = useState(product?.slug ?? "");
    const [description, setDescription] = useState(product?.description ?? "");
    const [sku, setSku] = useState(product?.sku ?? "");
    const [price, setPrice] = useState(product?.price?.toString() ?? "");
    const [oldPrice, setOldPrice] = useState(
        product?.oldPrice?.toString() ?? ""
    );
    const [stock, setStock] = useState(product?.stock?.toString() ?? "0");
    const [featured, setFeatured] = useState(product?.featured ?? false);
    const [status, setStatus] = useState<ProductStatus>(
        product?.status ?? "AVAILABLE"
    );
    const [storeId, setStoreId] = useState(product?.storeId ?? "");
    const [categoryId, setCategoryId] = useState(product?.categoryId ?? "");
    const [brandId, setBrandId] = useState(product?.brandId ?? "");

    const [images, setImages] = useState<ImageRow[]>(
        product?.images?.length
            ? product.images.map((img) => ({
                  imageUrl: img.imageUrl,
                  alt: img.alt ?? "",
              }))
            : [{ imageUrl: "", alt: "" }]
    );

    const [specs, setSpecs] = useState<SpecRow[]>(
        product?.specifications?.length
            ? product.specifications.map((spec) => ({
                  key: spec.key,
                  value: spec.value,
              }))
            : [{ key: "", value: "" }]
    );

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!storeId || !categoryId || !brandId) {
            toast.error("Sélectionne une boutique, une catégorie et une marque");
            return;
        }

        const input = {
            name,
            slug,
            description: description || undefined,
            sku: sku || undefined,
            price: Number(price),
            oldPrice: oldPrice ? Number(oldPrice) : undefined,
            stock: Number(stock),
            featured,
            status,
            storeId,
            categoryId,
            brandId,
            images,
            specifications: specs,
        };

        startTransition(async () => {
            const result = isEditing
                ? await updateProductAction(product.id, input)
                : await createProductAction(input);

            if (result.success) {
                toast.success(result.message);
                router.push(ROUTES.ADMIN_PRODUCTS);
                router.refresh();
            } else {
                toast.error(result.message);
            }
        });
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 pb-10">
            <section className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                <h2 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                    Informations générales
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5 sm:col-span-2">
                        <Label htmlFor="name">Nom du produit</Label>
                        <Input
                            id="name"
                            required
                            value={name}
                            onChange={(e) => {
                                const value = e.target.value;
                                setName(value);
                                if (!slugTouched) setSlug(slugify(value));
                            }}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="slug">Slug</Label>
                        <Input
                            id="slug"
                            required
                            value={slug}
                            onChange={(e) => {
                                setSlugTouched(true);
                                setSlug(e.target.value);
                            }}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="sku">SKU</Label>
                        <Input
                            id="sku"
                            value={sku}
                            onChange={(e) => setSku(e.target.value)}
                        />
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>
            </section>

            <section className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                <h2 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                    Prix &amp; stock
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="space-y-1.5">
                        <Label htmlFor="price">Prix (FCFA)</Label>
                        <Input
                            id="price"
                            type="number"
                            min={0}
                            required
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="oldPrice">Ancien prix (FCFA)</Label>
                        <Input
                            id="oldPrice"
                            type="number"
                            min={0}
                            value={oldPrice}
                            onChange={(e) => setOldPrice(e.target.value)}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="stock">Stock</Label>
                        <Input
                            id="stock"
                            type="number"
                            min={0}
                            required
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                    </div>
                </div>

                <div className="mt-4 flex items-center gap-2">
                    <input
                        id="featured"
                        type="checkbox"
                        checked={featured}
                        onChange={(e) => setFeatured(e.target.checked)}
                        className="h-4 w-4 rounded border-zinc-300 accent-teal-600 dark:border-zinc-700"
                    />
                    <Label htmlFor="featured" className="font-normal">
                        Produit mis en avant
                    </Label>
                </div>
            </section>

            <section className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                <h2 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                    Classification
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-1.5">
                        <Label>Boutique</Label>
                        <Select
                            value={storeId || null}
                            onValueChange={(value) => setStoreId(value as string)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Choisir...">
                                    {(value: string | null) =>
                                        stores.find((store) => store.id === value)
                                            ?.name ?? "Choisir..."
                                    }
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {stores.map((store) => (
                                    <SelectItem key={store.id} value={store.id}>
                                        {store.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-1.5">
                        <Label>Catégorie</Label>
                        <Select
                            value={categoryId || null}
                            onValueChange={(value) => setCategoryId(value as string)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Choisir...">
                                    {(value: string | null) =>
                                        categories.find(
                                            (category) => category.id === value
                                        )?.name ?? "Choisir..."
                                    }
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem key={category.id} value={category.id}>
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-1.5">
                        <Label>Marque</Label>
                        <Select
                            value={brandId || null}
                            onValueChange={(value) => setBrandId(value as string)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Choisir...">
                                    {(value: string | null) =>
                                        brands.find((brand) => brand.id === value)
                                            ?.name ?? "Choisir..."
                                    }
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {brands.map((brand) => (
                                    <SelectItem key={brand.id} value={brand.id}>
                                        {brand.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-1.5">
                        <Label>Statut</Label>
                        <Select
                            value={status}
                            onValueChange={(value) =>
                                setStatus(value as ProductStatus)
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue>
                                    {(value: string) =>
                                        PRODUCT_STATUS.find(
                                            (option) => option.value === value
                                        )?.label ?? value
                                    }
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {PRODUCT_STATUS.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </section>

            <section className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                        Images (URL)
                    </h2>

                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="gap-1.5"
                        onClick={() =>
                            setImages((rows) => [...rows, { imageUrl: "", alt: "" }])
                        }
                    >
                        <Plus className="h-3.5 w-3.5" />
                        Ajouter une image
                    </Button>
                </div>

                <div className="space-y-3">
                    {images.map((row, index) => (
                        <div key={index} className="flex gap-2">
                            <Input
                                type="url"
                                placeholder="https://...jpg"
                                value={row.imageUrl}
                                onChange={(e) =>
                                    setImages((rows) =>
                                        rows.map((r, i) =>
                                            i === index
                                                ? { ...r, imageUrl: e.target.value }
                                                : r
                                        )
                                    )
                                }
                                className="flex-1"
                            />

                            <Input
                                placeholder="Texte alternatif"
                                value={row.alt}
                                onChange={(e) =>
                                    setImages((rows) =>
                                        rows.map((r, i) =>
                                            i === index ? { ...r, alt: e.target.value } : r
                                        )
                                    )
                                }
                                className="w-48"
                            />

                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                aria-label="Retirer"
                                onClick={() =>
                                    setImages((rows) => rows.filter((_, i) => i !== index))
                                }
                                className="text-red-600 hover:bg-red-500/10 dark:text-red-400"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </section>

            <section className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                        Spécifications
                    </h2>

                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="gap-1.5"
                        onClick={() =>
                            setSpecs((rows) => [...rows, { key: "", value: "" }])
                        }
                    >
                        <Plus className="h-3.5 w-3.5" />
                        Ajouter une spec
                    </Button>
                </div>

                <div className="space-y-3">
                    {specs.map((row, index) => (
                        <div key={index} className="flex gap-2">
                            <Input
                                placeholder="Clé (ex: RAM)"
                                value={row.key}
                                onChange={(e) =>
                                    setSpecs((rows) =>
                                        rows.map((r, i) =>
                                            i === index ? { ...r, key: e.target.value } : r
                                        )
                                    )
                                }
                                className="w-48"
                            />

                            <Input
                                placeholder="Valeur (ex: 8 Go)"
                                value={row.value}
                                onChange={(e) =>
                                    setSpecs((rows) =>
                                        rows.map((r, i) =>
                                            i === index ? { ...r, value: e.target.value } : r
                                        )
                                    )
                                }
                                className="flex-1"
                            />

                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                aria-label="Retirer"
                                onClick={() =>
                                    setSpecs((rows) => rows.filter((_, i) => i !== index))
                                }
                                className="text-red-600 hover:bg-red-500/10 dark:text-red-400"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </section>

            <div className="flex justify-end gap-2">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push(ROUTES.ADMIN_PRODUCTS)}
                >
                    Annuler
                </Button>

                <Button
                    type="submit"
                    disabled={isPending}
                    className="bg-teal-600 text-white hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-500"
                >
                    {isPending
                        ? "Enregistrement..."
                        : isEditing
                          ? "Enregistrer les modifications"
                          : "Créer le produit"}
                </Button>
            </div>
        </form>
    );
}

export default ProductForm;
