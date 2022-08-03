import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
// elements
import { DataGrid } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
// icons
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// layout
import { Card, Frame } from '../ui/layout/Frame';
import Title from '../ui/elements/Title';
import { ElementCSS } from '../ui/elements/element.css';
import iconList from '../libs/icons';

const columns = [
    {
        field: 'id',
        headerClassName: 'table-header-light',
        headerName: 'ID',
        width: 0,
        hide: true
    },
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
            const classes = ElementCSS();
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
            const classes = ElementCSS();
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
            const classes = ElementCSS();
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

const CTBody = (props) => {
    const classes = ElementCSS();
    return (
        <React.Fragment>
            <div className={classes.header}>
                <Title className={classes.title}>
                    <FontAwesomeIcon size='lg' icon={props['icon']} /> {props['name']}
                </Title>
                <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    className={classes.largebutton}
                    startIcon={<AddIcon />}>
                    Add {props['name']}
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

export default function ContentType(props) {
    return (
        <Frame>
            <Card xs={12}>
                <CTBody { ...props }/>
            </Card>
        </Frame>
    );
}
