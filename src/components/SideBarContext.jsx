import React, { createContext, useState } from "react";

const SidebarContext = createContext();

const SidebarProvider = ({ children }) => {
    const [isSidebarVisible, setSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    return (
        <SidebarContext.Provider value={{ isSidebarVisible, toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
};

export { SidebarContext, SidebarProvider };
