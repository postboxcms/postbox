import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import Panel from "@ui/components/Panel";
import { useConsumer } from "@website/hooks/consumer";

export const FeedPanel = ({ message }) => {
    const attributes = useConsumer();
    return (
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Panel
                style={{ padding: "16px", justifyContent: "center" }}
            >
                <p>{attributes}</p>
            </Panel>
        </Grid>
    )
};

export default FeedPanel;