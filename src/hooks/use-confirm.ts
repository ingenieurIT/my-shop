"use client";

import { useState } from "react";

export function useConfirm<T = unknown>() {
    const [isOpen, setOpen] =
        useState(false);

    const [payload, setPayload] =
        useState<T | null>(null);

    const confirm = (data?: T) => {
        setPayload(data ?? null);
        setOpen(true);
    };

    const cancel = () => {
        setPayload(null);
        setOpen(false);
    };

    return {
        isOpen,
        payload,
        confirm,
        cancel,
    };
}