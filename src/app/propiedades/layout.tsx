import React from "react";
import { SideBar } from "@/components/sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="layout-div">
            {/* <SideBar /> */}
            <main style={{ flex: 1, padding: '1rem' }}>
                {children}
            </main>
        </div>
    );
};

export default Layout;

