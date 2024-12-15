import React from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";

import { Container, Typography, Toolbar, AppBar } from "@mui/material";

import { useLayoutCSS } from "../../app/hooks/layout";
import {
    getWebsiteLogo,
    getWebsiteName,
} from "../../app/modules/Settings/reducers/site";

export const Header = () => {
    const classes = useLayoutCSS();
    const websiteName = useSelector(getWebsiteName);
    const websiteLogo = useSelector(getWebsiteLogo);

    return (
        <AppBar position="relative" className={clsx(classes.appBar, open)}>
            <Container maxWidth="lg">
                <Toolbar className={classes.toolbar}>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        className="title"
                    >
                        {websiteLogo ? (
                            <img
                                src={`images/${websiteLogo}`}
                                style={{ maxHeight: "36px" }}
                            />
                        ) : (
                            websiteName
                        )}
                    </Typography>
                </Toolbar>
            </Container>{" "}
        </AppBar>
    );
};

export default Header;
