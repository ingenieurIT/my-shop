"use client";

import { ADMIN_NAVIGATION } from "@/constants/navigations";

import { SidebarItem } from "./SidebarItem";


type NavigationProps = {
    collapsed?: boolean;
};


export function Navigation({
                               collapsed = false,
                           }: NavigationProps) {

    return (
        <nav
            aria-label="Navigation principale"
            className="
                flex-1 overflow-y-auto
                px-4 py-6
            "
        >
            <ul className="space-y-2">

                {ADMIN_NAVIGATION.map((item) => (
                    <li key={item.href}>
                        <SidebarItem
                            title={item.title}
                            href={item.href}
                            icon={item.icon}
                            collapsed={collapsed}
                        />
                    </li>
                ))}

            </ul>
        </nav>
    );
}


export default Navigation;