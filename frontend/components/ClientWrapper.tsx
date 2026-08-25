"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {

    const [isMenuBarOpen, setIsMenuBarOpen] = useState(false);





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