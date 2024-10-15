import React from "react";
import { Content } from "@/components/SideBarContentProperty";
import { Property } from "@/types/property";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <main style={{ flex: 1}}>
            {children}
        </main>
    );
};


export default Layout;

