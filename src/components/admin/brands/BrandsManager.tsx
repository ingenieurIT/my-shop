"use client";

import { useState, useTransition } from "react";
import type { Brand } from "@prisma/client";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";

import {
    createBrandAction,
    deleteBrandAction,
    updateBrandAction,
} from "@/actions/brand.actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetFooter,
} from "@/components/ui/sheet";
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

type BrandsManagerProps = {
    brands: Brand[];
};

const EMPTY_FORM = { name: "", logo: "", website: "" };

export function BrandsManager({ brands }: BrandsManagerProps) {
    const [sheetOpen, setSheetOpen] = useState(false);
    const [editing, setEditing] = useState<Brand | null>(null);
    const [form, setForm] = useState(EMPTY_FORM);
    const [deleteTarget, setDeleteTarget] = useState<Brand | null>(null);
    const [isPending, startTransition] = useTransition();
    const [search, setSearch] = useState("");

    const filteredBrands = brands.filter((brand) =>
        `${brand.name} ${brand.website ?? ""}`
            .toLowerCase()
            .includes(search.trim().toLowerCase())
    );

    function openCreate() {
        setEditing(null);
        setForm(EMPTY_FORM);
        setSheetOpen(true);
    }

    function openEdit(brand: Brand) {
        setEditing(brand);
        setForm({
            name: brand.name,
            logo: brand.logo ?? "",
            website: brand.website ?? "",
        });
        setSheetOpen(true);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        startTransition(async () => {
            const input = {
                name: form.name,
                logo: form.logo || undefined,
                website: form.website || undefined,
            };

            const result = editing
                ? await updateBrandAction(editing.id, input)
                : await createBrandAction(input);

            if (result.success) {
                toast.success(result.message);
                setSheetOpen(false);
            } else {
                toast.error(result.message);
            }
        });
    }

    function handleDelete() {
        if (!deleteTarget) return;

        startTransition(async () => {
            const result = await deleteBrandAction(deleteTarget.id);

            if (result.success) {
                toast.success(result.message);
            } else {
                toast.error(result.message);
            }

            setDeleteTarget(null);
        });
    }

    return (
        <div>
            <div className="mb-4 flex items-center justify-between gap-4">
                <div className="relative max-w-xs flex-1">
                    <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                    <Input
                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Rechercher une marque..."
                        className="h-9 pl-8"
                    />
                </div>

                <Button
                    type="button"
                    onClick={openCreate}
                    className="gap-1.5 bg-teal-600 text-white hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-500"
                >
                    <Plus className="h-4 w-4" />
                    Ajouter une marque
                </Button>
            </div>

            <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nom</TableHead>
                            <TableHead>Site web</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {filteredBrands.length === 0 && (
                            <TableRow>
                                <TableCell
                                    colSpan={3}
                                    className="py-10 text-center text-sm text-zinc-500 dark:text-zinc-400"
                                >
                                    {search
                                        ? "Aucune marque ne correspond à cette recherche."
                                        : "Aucune marque pour le moment."}
                                </TableCell>
                            </TableRow>
                        )}

                        {filteredBrands.map((brand) => (
                            <TableRow key={brand.id}>
                                <TableCell className="font-medium text-zinc-900 dark:text-zinc-50">
                                    {brand.name}
                                </TableCell>

                                <TableCell className="text-zinc-500 dark:text-zinc-400">
                                    {brand.website || "—"}
                                </TableCell>

                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-1">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon-sm"
                                            aria-label="Modifier"
                                            onClick={() => openEdit(brand)}
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>

                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon-sm"
                                            aria-label="Supprimer"
                                            className="text-red-600 hover:bg-red-500/10 hover:text-red-600 dark:text-red-400"
                                            onClick={() => setDeleteTarget(brand)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetContent className="w-full sm:max-w-md">
                    <SheetHeader>
                        <SheetTitle>
                            {editing ? "Modifier la marque" : "Nouvelle marque"}
                        </SheetTitle>
                    </SheetHeader>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-1 flex-col gap-4 overflow-y-auto px-4"
                    >
                        <div className="space-y-1.5">
                            <Label htmlFor="brand-name">Nom</Label>
                            <Input
                                id="brand-name"
                                required
                                value={form.name}
                                onChange={(e) =>
                                    setForm((f) => ({ ...f, name: e.target.value }))
                                }
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="brand-logo">Logo (URL)</Label>
                            <Input
                                id="brand-logo"
                                type="url"
                                placeholder="https://..."
                                value={form.logo}
                                onChange={(e) =>
                                    setForm((f) => ({ ...f, logo: e.target.value }))
                                }
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="brand-website">Site web</Label>
                            <Input
                                id="brand-website"
                                type="url"
                                placeholder="https://..."
                                value={form.website}
                                onChange={(e) =>
                                    setForm((f) => ({ ...f, website: e.target.value }))
                                }
                            />
                        </div>

                        <SheetFooter className="px-0">
                            <Button
                                type="submit"
                                disabled={isPending}
                                className="bg-teal-600 text-white hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-500"
                            >
                                {isPending ? "Enregistrement..." : "Enregistrer"}
                            </Button>
                        </SheetFooter>
                    </form>
                </SheetContent>
            </Sheet>

            <AlertDialog
                open={!!deleteTarget}
                onOpenChange={(open) => !open && setDeleteTarget(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Supprimer cette marque ?</AlertDialogTitle>
                        <AlertDialogDescription>
                            « {deleteTarget?.name} » sera définitivement supprimée. Cette
                            action est irréversible.
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

export default BrandsManager;
