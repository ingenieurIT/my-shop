"use client";

import { useState, useTransition } from "react";
import type { Store } from "@prisma/client";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { slugify } from "@/lib/slug";
import {
    createStoreAction,
    deleteStoreAction,
    updateStoreAction,
} from "@/actions/store.actions";

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

type StoresManagerProps = {
    stores: Store[];
};

const EMPTY_FORM = {
    name: "",
    slug: "",
    logo: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    website: "",
};

export function StoresManager({ stores }: StoresManagerProps) {
    const [sheetOpen, setSheetOpen] = useState(false);
    const [editing, setEditing] = useState<Store | null>(null);
    const [form, setForm] = useState(EMPTY_FORM);
    const [slugTouched, setSlugTouched] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<Store | null>(null);
    const [isPending, startTransition] = useTransition();

    function openCreate() {
        setEditing(null);
        setForm(EMPTY_FORM);
        setSlugTouched(false);
        setSheetOpen(true);
    }

    function openEdit(store: Store) {
        setEditing(store);
        setForm({
            name: store.name,
            slug: store.slug,
            logo: store.logo ?? "",
            phone: store.phone ?? "",
            email: store.email ?? "",
            address: store.address ?? "",
            city: store.city ?? "",
            website: store.website ?? "",
        });
        setSlugTouched(true);
        setSheetOpen(true);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        startTransition(async () => {
            const input = {
                name: form.name,
                slug: form.slug,
                logo: form.logo || undefined,
                phone: form.phone || undefined,
                email: form.email || undefined,
                address: form.address || undefined,
                city: form.city || undefined,
                website: form.website || undefined,
            };

            const result = editing
                ? await updateStoreAction(editing.id, input)
                : await createStoreAction(input);

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
            const result = await deleteStoreAction(deleteTarget.id);

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
            <div className="mb-4 flex justify-end">
                <Button
                    type="button"
                    onClick={openCreate}
                    className="gap-1.5 bg-teal-600 text-white hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-500"
                >
                    <Plus className="h-4 w-4" />
                    Ajouter une boutique
                </Button>
            </div>

            <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nom</TableHead>
                            <TableHead>Ville</TableHead>
                            <TableHead>Téléphone</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {stores.length === 0 && (
                            <TableRow>
                                <TableCell
                                    colSpan={5}
                                    className="py-10 text-center text-sm text-zinc-500 dark:text-zinc-400"
                                >
                                    Aucune boutique pour le moment.
                                </TableCell>
                            </TableRow>
                        )}

                        {stores.map((store) => (
                            <TableRow key={store.id}>
                                <TableCell className="font-medium text-zinc-900 dark:text-zinc-50">
                                    {store.name}
                                </TableCell>

                                <TableCell className="text-zinc-500 dark:text-zinc-400">
                                    {store.city || "—"}
                                </TableCell>

                                <TableCell className="text-zinc-500 dark:text-zinc-400">
                                    {store.phone || "—"}
                                </TableCell>

                                <TableCell className="text-zinc-500 dark:text-zinc-400">
                                    {store.email || "—"}
                                </TableCell>

                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-1">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon-sm"
                                            aria-label="Modifier"
                                            onClick={() => openEdit(store)}
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>

                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon-sm"
                                            aria-label="Supprimer"
                                            className="text-red-600 hover:bg-red-500/10 hover:text-red-600 dark:text-red-400"
                                            onClick={() => setDeleteTarget(store)}
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
                            {editing ? "Modifier la boutique" : "Nouvelle boutique"}
                        </SheetTitle>
                    </SheetHeader>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-1 flex-col gap-4 overflow-y-auto px-4"
                    >
                        <div className="space-y-1.5">
                            <Label htmlFor="store-name">Nom</Label>
                            <Input
                                id="store-name"
                                required
                                value={form.name}
                                onChange={(e) => {
                                    const name = e.target.value;
                                    setForm((f) => ({
                                        ...f,
                                        name,
                                        slug: slugTouched ? f.slug : slugify(name),
                                    }));
                                }}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="store-slug">Slug</Label>
                            <Input
                                id="store-slug"
                                required
                                value={form.slug}
                                onChange={(e) => {
                                    setSlugTouched(true);
                                    setForm((f) => ({ ...f, slug: e.target.value }));
                                }}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="store-phone">Téléphone</Label>
                                <Input
                                    id="store-phone"
                                    value={form.phone}
                                    onChange={(e) =>
                                        setForm((f) => ({ ...f, phone: e.target.value }))
                                    }
                                />
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="store-email">Email</Label>
                                <Input
                                    id="store-email"
                                    type="email"
                                    value={form.email}
                                    onChange={(e) =>
                                        setForm((f) => ({ ...f, email: e.target.value }))
                                    }
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="store-city">Ville</Label>
                                <Input
                                    id="store-city"
                                    value={form.city}
                                    onChange={(e) =>
                                        setForm((f) => ({ ...f, city: e.target.value }))
                                    }
                                />
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="store-website">Site web</Label>
                                <Input
                                    id="store-website"
                                    type="url"
                                    value={form.website}
                                    onChange={(e) =>
                                        setForm((f) => ({ ...f, website: e.target.value }))
                                    }
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="store-address">Adresse</Label>
                            <Input
                                id="store-address"
                                value={form.address}
                                onChange={(e) =>
                                    setForm((f) => ({ ...f, address: e.target.value }))
                                }
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="store-logo">Logo (URL)</Label>
                            <Input
                                id="store-logo"
                                type="url"
                                placeholder="https://..."
                                value={form.logo}
                                onChange={(e) =>
                                    setForm((f) => ({ ...f, logo: e.target.value }))
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
                        <AlertDialogTitle>Supprimer cette boutique ?</AlertDialogTitle>
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

export default StoresManager;
