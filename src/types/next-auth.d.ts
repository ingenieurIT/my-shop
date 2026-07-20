import { UserRole } from "@prisma/client";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface User {
        id: string;
        role: UserRole;
        storeId: string | null;
    }

    interface Session {
        user: {
            id: string;
            role: UserRole;
            storeId: string | null;
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        role: UserRole;
        storeId: string | null;
    }
}
