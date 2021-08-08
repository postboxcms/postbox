import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

// elements
import { DataGrid } from '@material-ui/data-grid';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { green, grey } from '@material-ui/core/colors';

// icons
import LocalPostOfficeIcon from '@material-ui/icons/LocalPostOffice';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';


import Title from './Elements/Title';
import { DashboardCard, DashboardPanel } from './Dashboard/DashboardPanel';

const useStyles = makeStyles((theme) => ({
    grid: {
        height: 400,
        width: '100%',
        backgroundColor: '#fff'
    },
    post: {
        flex: 1,
        fontSize: "14px"
    },
    body: {
        backgroundColor: '#fff'
    },
    icon: {
        float: "right",
        fontSize: 80,
        opacity: 0.5,
        color: "#ddd"
    },
    avatar: {
        color: '#fff',
        backgroundColor: grey[500],
    },
    label: {
        backgroundColor: green[500],
        fontSize: theme.spacing(1.5),
        fontWeight: 500,
        paddingRight: theme.spacing(0.2),
        paddingLeft: theme.spacing(0.2),
        width: theme.spacing(8),
        height: theme.spacing(3)
    },
    button: {
        marginRight: theme.spacing(1)
    },
    largebutton: {
        marginBottom: theme.spacing(1),
        float: 'right'
    },
    header: {
        overflow: 'hidden',
        clear: 'both'
    },
    headerIcon: {
        marginBottom: theme.spacing(0.6)
    },
    title: {
        float: 'left',
        marginBottom: 0
    }

}));

const columns = [
    { field: 'id', headerClassName: 'table-header-light', headerName: 'ID', width: 0, hide: true },
    {
        field: 'title',
        headerName: 'Title',
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
            const classes = useStyles();
            return (
                <Avatar variant="rounded" className={classes.avatar}>
                    <AssignmentIcon />
                </Avatar>
            )
        }
    },
    {
        field: 'status',
        headerName: 'Status',
        headerClassName: 'table-header-light',
        width: 150,
        editable: false,
        renderCell: () => {
            const classes = useStyles();
            return (
                <Avatar variant="rounded" className={classes.label}>
                    Published
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
            const classes = useStyles();
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
        title: 'Welcome to postbox',
        image: '',
        status: '',
        updated: moment(new Date().toLocaleString()).format('MMMM Do YYYY'),
        actions: null
    },
    {
        id: 2,
        title: 'This is a demo',
        image: '',
        status: '',
        updated: moment(new Date().toLocaleString()).format('MMMM Do YYYY'),
        actions: null
    }

];

const PostsBody = () => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <div className={classes.header}>
                <Title className={classes.title}>
                    <LocalPostOfficeIcon className={classes.headerIcon}/> Posts
                </Title>
                <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    className={classes.largebutton}
                    startIcon={<AddIcon />}>
                    Add Post
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

export const PostCard = () => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Grid container>
                <Grid item xs={10} md={9} lg={10}>
                    <Title>Posts</Title>
                    <Typography component="p" variant="h4">
                        0
                </Typography>
                    <Typography color="textSecondary" className={classes.post}>
                        Last updated: a few seconds ago
                </Typography>
                    <Link color="primary" to="/posts">
                        View more
                </Link>
                </Grid>
                <Grid item xs={2} md={3} lg={2}>
                    <Typography align="right">
                        <LocalPostOfficeIcon className={classes.icon} />
                    </Typography>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default function Posts() {
    const classes = useStyles();
    return (
        <DashboardPanel>
            <DashboardCard xs={12}>
                <PostsBody />
            </DashboardCard>
        </DashboardPanel>
    );
}
