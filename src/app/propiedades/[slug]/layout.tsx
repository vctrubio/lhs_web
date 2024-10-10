import React from "react";
import { Content } from "@/components/PropertyDesc";
import { Property } from "@/types/property";

interface LayoutProps {
    children: React.ReactNode;
    property: Property; // Ensure the property type matches your data
}

const Layout: React.FC<LayoutProps> = ({ children, property }) => {
    console.log("Layout Property:", property); // Log the property

    return (
        <div className="layout-div">
            <div style={{ width: 420 }}>
                <Content property={property} />
            </div>
            <main style={{ flex: 1, padding: '1rem' }}>
                {children}
            </main>
        </div>
    );
};


export default Layout;

