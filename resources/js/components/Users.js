import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

// layout
import { DashboardCard, DashboardPanel } from './Dashboard/DashboardPanel';

// elements
import { DataGrid } from '@material-ui/data-grid';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

// icons
import PeopleIcon from '@material-ui/icons/People';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';


import Title from './Elements/Title';
import { Styles } from './Elements/Styles';


const columns = [
    { field: 'id', headerClassName: 'table-header-light', headerName: 'ID', width: 0, hide: true },
    {
        field: 'name',
        headerName: 'Name',
        headerClassName: 'table-header-light',
        width: 300,
        editable: true,
    },
    {
        field: 'image',
        headerName: 'Image',
        headerClassName: 'table-header-light',
        width: 150,
        editable: false,
        renderCell: (params) => {
            const classes = Styles();
            return (
                <Avatar variant="rounded" className={classes.avatar}>
                    <AssignmentIcon />
                </Avatar>
            )
        }
    },
    {
        field: 'role',
        headerName: 'User Role',
        headerClassName: 'table-header-light',
        width: 150,
        editable: false,
        renderCell: () => {
            const classes = Styles();
            return (
                <Avatar variant="rounded" className={classes.label}>
                    Administrator
                </Avatar>
            )
        }
    },
    {
        field: 'updated',
        headerName: 'Updated On',
        headerClassName: 'table-header-light',
        width: 180,
        type: 'date'
    },
    {
        field: 'actions',
        headerName: 'Actions',
        headerClassName: 'table-header-light',
        width: 200,
        renderCell: () => {
            const classes = Styles();
            return (
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.button}
                        startIcon={<EditIcon />}>
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        className={classes.button}
                        startIcon={<DeleteIcon />}>
                        Delete
                    </Button>
                </div>
            );
        }
    },
];

const rows = [
    {
        id: 1,
        name: 'Welcome to postbox',
        image: '',
        role: '',
        updated: moment(new Date().toLocaleString()).format('MMMM Do YYYY'),
        actions: null
    },
    {
        id: 2,
        name: 'This is a demo',
        image: '',
        role: '',
        updated: moment(new Date().toLocaleString()).format('MMMM Do YYYY'),
        actions: null
    }

];

const UsersBody = (props) => {
    const classes = Styles();
    return (
        <React.Fragment>
            <div className={classes.header}>
                <Title className={classes.title}>
                    <PeopleIcon className={classes.headerIcon}/> {props.title}
                </Title>
                <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    className={classes.largebutton}
                    startIcon={<AddIcon />}>
                    Add User
                </Button>
            </div>
            <div className={classes.grid}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    checkboxSelection
                    disableSelectionOnClick
                />
            </div>
        </React.Fragment>
    );
}

export const UserCard = (props) => {
    const classes = Styles();
    return (
        <React.Fragment>
            <Grid container>
                <Grid item xs={10} md={9} lg={10}>
                    <Title>{props.title}</Title>
                    <Typography component="p" variant="h4">
                        0
                </Typography>
                    <Typography color="textSecondary" className={classes.cardText}>
                        Last updated: a few seconds ago
                    </Typography>
                    <Link color="primary" to="/users">
                        View more
                </Link>
                </Grid>
                <Grid item xs={2} md={3} lg={2}>
                    <Typography align="right">
                        <PeopleIcon className={classes.icon} />
                    </Typography>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default function Users(props) {
    return (
        <DashboardPanel>
            <DashboardCard xs={12}>
                <UsersBody {...props}/>
            </DashboardCard>
        </DashboardPanel>
    );
}
