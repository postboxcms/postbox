import React from "react";
import { useSelector } from "react-redux";

import { Container, Grid, Typography } from "@mui/material";
import Panel from "@ui/components/Panel";
import Icon from "@ui/elements/Icon";
import { useCSS } from "@app/hooks";

import { getWebsiteStatus } from "@modules/Settings/reducers/site";
import { site } from "@app/utils";
import Title from "@ui/elements/Title";

export const Body = () => {
    const websiteStatus = useSelector(getWebsiteStatus);
    const systemStatus = useSelector((state) => state.site.status);
    const classes = useCSS();
    const BodyContent = ({ message }) => (
        <Grid container spacing={2} className={classes.body}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                <Panel
                    style={{ padding: "16px", justifyContent: "center" }}
                >
                    <p>{message}</p>
                </Panel>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Panel
                    style={{ padding: "16px", justifyContent: "center" }}
                >
                    <p>{message}</p>
                </Panel>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                <Panel
                    style={{ padding: "16px", justifyContent: "center" }}
                >
                    <p>{message}</p>
                </Panel>
            </Grid>
        </Grid>
    )

    const ComingSoonContent = () => (
        <Grid container justifyContent={"center"} flex={1} spacing={2}>
            <Grid alignItems={"center"} textAlign={"center"} justifyContent={"center"} item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Icon name="fa-dolly" color="#ccc" size="240px" />
            </Grid>
            <Grid alignItems={"center"} textAlign={"center"} justifyContent={"center"} item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Title variant="normal">
                    {site.comingSoonMessage}
                </Title>
            </Grid>
        </Grid>
    );

    return (
        <Container
            maxWidth="lg"
            style={{ justifyContent: "center", display: "flex" }}
        >
            {/* shift the above code to Theme and render the theme as a module through Website layout */}
            {/* <Typography
                    component="h1"
                    variant="p"
                    color="inherit"
                    noWrap
                    className="title"
                >
                    {systemStatus !== "idle" ? (websiteStatus ? site.themeMessage : site.comingSoonMessage) : site.loadingMessage}
                </Typography> */}
            {systemStatus === "idle" &&
                <BodyContent message={site.loadingMessage} />}
            {systemStatus !== "idle" && websiteStatus &&
                <BodyContent message={site.themeMessage} />}
            {systemStatus !== "idle" && !websiteStatus &&
                <ComingSoonContent />}
        </Container >
    );
};

export default Body;
