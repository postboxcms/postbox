import React from 'react';
import { Link } from 'react-router-dom';

import { DataGrid } from '@material-ui/data-grid';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

import Title from './Elements/Title';
import { DashboardCard, DashboardPanel, DashboardContent } from './Dashboard/DashboardPanel';

function preventDefault(event) {
    event.preventDefault();
}

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
    return { id, date, name, shipTo, paymentMethod, amount };
}


const useStyles = makeStyles({
    pageContext: {
        flex: 1,
        fontSize: "14px"
    },
    icon: {
        float: "right",
        fontSize: 80,
        opacity: 0.5,
        color: "#ddd"
    }
});

const columns = [
    { field: 'id', headerName: 'ID', width: 90, hide: true },
    {
        field: 'firstName',
        headerName: 'First name',
        width: 150,
        editable: true,
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 150,
        editable: true,
    },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
            `${params.getValue(params.id, 'firstName') || ''} ${params.getValue(params.id, 'lastName') || ''
            }`,
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];


const PagesBody = () => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Title></Title>
            <div style={{ height: 400, width: '100%' }}>
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

export const PageCard = () => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Grid container>
                <Grid item xs={10} md={9} lg={10}>
                    <Title>Pages</Title>
                    <Typography component="p" variant="h4">
                        0
                </Typography>
                    <Typography color="textSecondary" className={classes.pageContext}>
                        Last updated: a few seconds ago
                </Typography>
                    <Link color="primary" to="/pages">
                        View more
                </Link>
                </Grid>
                <Grid item xs={2} md={3} lg={2}>
                    <Typography align="right" className={classes.iconClass}>
                        <LibraryBooksIcon className={classes.icon}/>
                    </Typography>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default function Pages() {
    return (
        <DashboardPanel>
            <DashboardCard xs={12}>
                <DashboardContent>
                    <PagesBody />
                </DashboardContent>
            </DashboardCard>
        </DashboardPanel>
    );
}
