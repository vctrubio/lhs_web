import React from "react";
import { Content } from "@/components/SideBarContentProperty";
import { Property } from "@/types/property";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="layout-div">
            <main style={{ flex: 1, paddingTop: '24px' }}>
                {children}
            </main>
        </div>
    );
};


export default Layout;

