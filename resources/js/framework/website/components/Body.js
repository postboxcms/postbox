import React from "react";
import { useSelector } from "react-redux";

import { Container, Grid, Typography } from "@mui/material";

import { getWebsiteStatus } from "../../app/modules/Settings/reducers/site";
import { site } from "../../app/utils/constants";

export const Body = () => {
    const websiteStatus = useSelector(getWebsiteStatus);

    return (
        <Container
            maxWidth="lg"
            style={{ justifyContent: "center", display: "flex" }}
        >
            {/* shift the above code to Theme and render the theme as a module through Website layout */}
            <Grid>
                <Typography
                    component="h1"
                    variant="p"
                    color="inherit"
                    noWrap
                    className="title"
                >
                    {websiteStatus ? site.themeMessage : site.comingSoonMessage}
                </Typography>
            </Grid>
        </Container>
    );
};

export default Body;
