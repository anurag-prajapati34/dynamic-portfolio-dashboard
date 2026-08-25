"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { TopBar } from "./TopBar";
import { Sidebar } from "./Sidebar";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {

    const [isMenuBarOpen, setIsMenuBarOpen] = useState(false);

    const pathname = usePathname();

    useEffect(() => {
        console.log("Current path changed to:", pathname);
    }, [pathname]);

    return <div className="bg-white">
        <TopBar onMenuClick={() => setIsMenuBarOpen(!isMenuBarOpen)} />
        <div className="flex pt-12 h-full ">
            <Sidebar isOpen={isMenuBarOpen} onClose={() => setIsMenuBarOpen(false)} />
            <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
                {children}
            </div>
        </div>
    </div>
}