import React from "react";
import { admin, website } from "./theme";

export const setup = () => {
    // app init code goes here
    const theme = getTheme();
    return {
        theme
    };
}

export const getTheme = () => {
    const url = typeof window !== typeof undefined ? window.location.href : "";
    return url.includes("/admin") ? admin : website;
}