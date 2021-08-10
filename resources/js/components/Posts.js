import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';

// layout
import { DashboardCard, DashboardContent, DashboardPanel } from './Dashboard/DashboardPanel';

// elements
import { DataGrid, filterGridColumnLookupSelector } from '@material-ui/data-grid';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

// icons
import LocalPostOfficeIcon from '@material-ui/icons/LocalPostOffice';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';


import Title from './Elements/Title';
import { Styles } from './Elements/Styles';


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
            const classes = Styles();
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
            const classes = Styles();
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


const PostsBody = (props) => {
    const classes = Styles();
    const history = useHistory();
    const addPost = () => {
        history.push('/post/add');
    };

    return (
        <React.Fragment>
            <div className={classes.header}>
                <Title className={classes.title}>
                    <LocalPostOfficeIcon className={classes.headerIcon} /> {props.title}
                </Title>
                <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    onClick={addPost}
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

const AddEditPosts = (props) => {
    // use quilljs for rich text editor
    return (
        <React.Fragment>
            <Title>{props.title}</Title>
            <DashboardContent className="coaster">
                {props.title}
            </DashboardContent>
        </React.Fragment>
    );
};

export const PostCard = (props) => {
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

export default function Posts(props) {
    if (typeof props.mode !== typeof undefined) {
        if (props.mode == 'edit' || props.mode == 'add') {
            return (
                <DashboardPanel>
                    <DashboardCard xs={12}>
                        <AddEditPosts {...props} />
                    </DashboardCard>
                </DashboardPanel>
            );
        }
    }
    return (
        <DashboardPanel>
            <DashboardCard xs={12}>
                <PostsBody {...props} />
            </DashboardCard>
        </DashboardPanel>
    );
}
