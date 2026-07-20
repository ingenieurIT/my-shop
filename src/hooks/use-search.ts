"use client";

import { useState } from "react";

export function useSearch(initial = "") {
    const [search, setSearch] =
        useState(initial);

    const clear = () => setSearch("");

    return {
        search,
        setSearch,
        clear,
    };
}