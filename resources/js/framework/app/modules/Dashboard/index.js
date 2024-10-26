import React from "react";
import { useSelector } from "react-redux";

import { Card, Frame, Body, DataCard } from "../../ui/layout/Frame";

import Placeholder, { Loader } from "../../ui/elements/Placeholder";
import { useCSS } from "../../hooks/css";
import { getContentTypes } from "../ContentType/reducers/contentTypes";


const Dashboard = (props) => {
    const classes = useCSS();
    const contentTypes = useSelector(getContentTypes);

    return (
        <Frame className={classes.body} spacing={3}>
            {/* LOOP OVER CARDS */}
            <Placeholder repeat={3} map={contentTypes?.content_types}>
                <Card xs={12} md={4} lg={4}>
                    <Body height="fixed">
                        <Loader lines={4} />
                    </Body>
                </Card>
            </Placeholder>
            {contentTypes?.content_types?.map((data, i) => {
                return (
                    <Card xs={12} md={4} lg={4} key={data["id"]}>
                        <Body
                            key={data["id"]}
                            height="fixed"
                            className={classes.coaster}
                        >
                            <DataCard
                                {...props}
                                {...data}
                                key={data["id"]}
                                title={data.name}
                                icon={data.icon}
                            />
                        </Body>
                    </Card>
                );
            })}
        </Frame>
    );
};

export default Dashboard;
