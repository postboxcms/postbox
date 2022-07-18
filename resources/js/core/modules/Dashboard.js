import React, { useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Card, Frame, Body, Data } from '../ui/layout/Frame';

import {api} from '../libs/vars';
import jwt from '../libs/jwtmanager';
import auth from '../libs/authmanager';

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
    const [contentTypes,setContentTypes] = useState({content_types:[]});

    React.useEffect(() => {
        // fetch all content types
        if(jwt.getToken('postbox_token') !== null) {
            auth.get(api.url+'/ContentType').then((response) => setContentTypes(response.data))
        }
    },[]);
    return (
        <Frame className={classes.body} spacing={3}>
            {/* LOOP OVER CARDS */}
            {contentTypes['content_types'].map((data,i) => {
                const Icon = `${data.icon}`;
                return(
                    <Card xs={12} md={4} lg={4}>
                        <Body height="fixed" className="coaster">
                            <Data { ...props } { ...data }
                                title={data.name}
                                icon={<Icon className={classes.icon} />}/>
                        </Body>
                    </Card>
                );
            })}
        </Frame>

    );
}

export default Dashboard;
