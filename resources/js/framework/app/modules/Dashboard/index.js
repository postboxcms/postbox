import React from "react";
import { useSelector } from "react-redux";

import { Card, Frame, Body, DataCard } from "../../ui/layout/Frame";

import Placeholder, { Loader } from "@ui/components/Placeholder";
import { useWebCSS } from "@app/hooks/css";
import { getEntities } from "@modules/Entity/reducers/entities";


const Dashboard = (props) => {
    const classes = useWebCSS();
    const entities = useSelector(getEntities);

    return (
        <Frame className={classes.body} spacing={3}>
            {/* LOOP OVER CARDS */}
            <Placeholder repeat={3} map={entities}>
                <Card xs={12} md={4} lg={4}>
                    <Body height="fixed">
                        <div style={{ display: 'flex', flexDirection: "row", alignItems: 'left' }}>
                            <div style={{ display: 'flex', flex: "1 0", width: "30%", flexDirection: "column", alignItems: 'left' }}>
                                <Loader variant="text" height={40} width="30%" />
                                <Loader variant="circular" height={50} width={50} />
                                <Loader variant="text" height={20} width="20%"  />
                                <Loader variant="text" height={20} width="20%" />
                            </div>
                            <div style={{ display: 'flex', flexDirection: "column", alignItems: 'end' }}>
                                <Loader variant="rounded" height={60} width={60} />
                            </div>
                        </div>
                    </Body>
                </Card>
            </Placeholder>
            {entities?.entities?.map((data, i) => {
                return data['dashboard'] && (
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
