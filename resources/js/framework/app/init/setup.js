import React from "react";
import { admin, website } from "./theme";
import { hydrateIcons } from "@app/utils";

export const setup = () => {
    // app init code goes here
    const theme = getTheme();
    const status = getStatus();
    
    return {
        theme,
        status,
        hydrateIcons,
    };
}

export const getTheme = () => {
    const url = typeof window !== typeof undefined ? window.location.href : "";
    return url.includes("/admin") ? admin : website;
}

export const getStatus = () => {
    // site status code goes here
    return true;
}