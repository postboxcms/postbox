import React from 'react';
import { Link } from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import DashboardIcon from '@material-ui/icons/Dashboard';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import LocalPostOfficeIcon from '@material-ui/icons/LocalPostOffice';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';

export const mainListItems = (props) => {
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
                <Link to="/posts">
                    <ListItem button>
                        <ListItemIcon>
                            <LocalPostOfficeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Posts" />
                    </ListItem>
                </Link>
                <Link to="/pages">
                    <ListItem button>
                        <ListItemIcon>
                            <LibraryBooksIcon />
                        </ListItemIcon>
                        <ListItemText primary="Pages" />
                    </ListItem>
                </Link>
                <Link to="/users">
                    <ListItem button>
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Users" />
                    </ListItem>
                </Link>
            </div>
        </React.Fragment>
    )
};

export const secondaryListItems = (props) => {
    return (
        <React.Fragment>
            <div className={props.navbar}>
                <ListSubheader inset>Preferences</ListSubheader>
                <ListItem button>
                    <ListItemIcon>
                        <BarChartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Reports" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <LayersIcon />
                    </ListItemIcon>
                    <ListItemText primary="Integrations" />
                </ListItem>
            </div>
        </React.Fragment>
    )
};
