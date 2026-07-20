export interface PaginationOptions {
    page?: number;
    pageSize?: number;
}

export function getPagination(options?: PaginationOptions) {
    const page = options?.page ?? 1;

    const pageSize = options?.pageSize ?? 20;

    return {
        page,
        pageSize,
        skip: (page - 1) * pageSize,
        take: pageSize,
    };
}