import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { api } from '../../libs/vars';
import jwt from '../../libs/jwtmanager';
import auth from '../../libs/authmanager';
import iconList from '../../libs/icons';


export const MainItems = (props) => {
    const [contentTypes, setContentTypes] = useState({ content_types: [] });

    React.useEffect(() => {
        // fetch all content types
        if (jwt.getToken('postbox_token') !== null) {
            auth.get('/ContentType').then((response) => setContentTypes(response.data))
        }
    }, []);
    return (
        <React.Fragment>
            <div className={props.navbar}>
                <Link to="/">
                    <ListItem button>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                </Link>
                {contentTypes['content_types'].map((data) => {
                    return (
                        <Link to={data['slug']} key={data['id']}>
                            <ListItem button>
                                <ListItemIcon>
                                    <FontAwesomeIcon size='lg' icon={data['icon']} />
                                </ListItemIcon>
                                <ListItemText primary={data['name']} />
                            </ListItem>
                        </Link>
                    );
                })}
            </div>
        </React.Fragment>
    )
};

export const SubItems = (props) => {
    return (
        <React.Fragment>
            <div className={props.navbar}>
                <ListSubheader inset>Preferences</ListSubheader>
                <Link to="/crud" key="0">
                    <ListItem button>
                        <ListItemIcon>
                            <FontAwesomeIcon size='lg' icon="layer-group" />
                        </ListItemIcon>
                        <ListItemText primary="CRUD" />
                    </ListItem>
                </Link>
                <ListItem button>
                    <ListItemIcon>
                        <BarChartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Reports" />
                </ListItem>
            </div>
        </React.Fragment>
    )
};
