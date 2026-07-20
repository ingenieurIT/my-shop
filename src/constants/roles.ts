import { UserRole } from "@prisma/client";

export const ROLES = {
    SUPER_ADMIN: UserRole.SUPER_ADMIN,

    STORE_MANAGER: UserRole.STORE_MANAGER,
};

export const ADMIN_ROLES = [
    UserRole.SUPER_ADMIN,
];

export const STORE_ROLES = [
    UserRole.STORE_MANAGER,
];