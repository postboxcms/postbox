import React, { useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';

import { Card, Frame, Body, Data } from '../ui/layout/Frame';

import jwt from '../libs/jwtmanager';
import auth from '../libs/authmanager';
import Placeholder from '../ui/elements/Placeholder';

const useStyles = makeStyles((theme) => ({
    body: {
        paddingTop: theme.spacing(4)
    },
    icon: {
        float: "right",
        fontSize: 80,
        opacity: 0.5,
        color: "#ddd"
    }
}));

const Dashboard = (props) => {
    const classes = useStyles();
    const [contentTypes,setContentTypes] = useState([]);

    React.useEffect(() => {
        // fetch all content types
        if(jwt.getToken('postbox_token') !== null) {
            auth.get('/ContentType').then((response) => setContentTypes(response.data.content_types))
        }
    },[]);
    return (
        <Frame className={classes.body} spacing={3}>
            {/* LOOP OVER CARDS */}
            {contentTypes.length > 0?contentTypes.map((data,i) => {
                return(
                    <Card xs={12} md={4} lg={4} key={data['id']}>
                        <Body height="fixed" className="coaster">
                            <Data { ...props } { ...data }
                                title={data.name}
                                icon={data.icon}/>
                        </Body>
                    </Card>
                );
            }):
            [...Array(3)].map((e, i) => {
                return(
                    <Card xs={12} md={4} lg={4}>
                        <Body height="fixed" className="coaster">
                            <Placeholder count={4} />
                        </Body>
                    </Card>
                )
            })
            }
        </Frame>

    );
}

export default Dashboard;
