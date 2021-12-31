import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';

// layout
import { Card, Body, Frame } from './ui/Frame';

// elements
import { DataGrid } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

// icons
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';


import Title from './ui/elements/Title';
import { comStyles } from './ui/elements/comStyles';

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
            const classes = comStyles();
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
            const classes = comStyles();
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
            const classes = comStyles();
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
    const classes = comStyles();
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
            <Body className="coaster">
                {props.title}
            </Body>
        </React.Fragment>
    );
};

export const PostCard = (props) => {
    const classes = comStyles();
    const [data, setData] = useState({
        posts:0,
        pages:0,
        users:0
    });

    useEffect(() => {
        // fetch()
        data.posts = 2;
        setData((data) => ({ ...data }));
    },[]);

    return (
        <React.Fragment>
            <Grid container>
                <Grid item xs={10} md={9} lg={10}>
                    <Title>{props.title}</Title>
                    <Typography component="p" variant="h4">
                        {data.posts}
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
                <Frame>
                    <Card xs={12}>
                        <AddEditPosts {...props} />
                    </Card>
                </Frame>
            );
        }
    }
    return (
        <Frame>
            <Card xs={12}>
                <PostsBody {...props} />
            </Card>
        </Frame>
    );
}
