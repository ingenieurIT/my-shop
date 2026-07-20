"use client";

import { useState } from "react";

export function useConfirm() {
    const [isOpen, setOpen] =
        useState(false);

    const [payload, setPayload] =
        useState<any>(null);

    const confirm = (data?: any) => {
        setPayload(data);
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