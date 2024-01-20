import React, { useState } from "react";
import { useSelector } from "react-redux";
import makeStyles from "@mui/styles/makeStyles";

import { Card, Frame, Body, DataCard } from "../layout/layout/Frame";

import { useAuthentication } from "../hooks/auth";
import Placeholder, { Loader } from "../layout/elements/Placeholder";
import { getToken, getUser } from "../store/jwt";

const useStyles = makeStyles((theme) => ({
    body: {
        paddingTop: theme.spacing(4),
    },
    icon: {
        float: "right",
        fontSize: 80,
        opacity: 0.5,
        color: "#ddd",
    },
}));

const Dashboard = (props) => {
    const classes = useStyles();
    const auth = useAuthentication();
    const token = useSelector(getToken);
    const user = useSelector(getUser);
    const [contentTypes, setContentTypes] = useState([]);

    React.useEffect(() => {
        // fetch all content types
        if (token !== null) {
            auth.get("/ContentType").then((response) =>
                setContentTypes(response.data.content_types)
            );
        }
    }, []);
    return (
        <Frame className={classes.body} spacing={3}>
            {/* LOOP OVER CARDS */}
            <Placeholder repeat={3} map={contentTypes}>
                <Card xs={12} md={4} lg={4}>
                    <Body height="fixed" className="coaster">
                        <Loader lines={4} />
                    </Body>
                </Card>
            </Placeholder>
            {contentTypes.map((data, i) => {
                return (
                    <Card xs={12} md={4} lg={4} key={data["id"]}>
                        <Body
                            key={data["id"]}
                            height="fixed"
                            className="coaster"
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