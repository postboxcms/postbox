import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
// elements
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
// icons
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
// auth manager
import auth from '../libs/authmanager';
import NoRowsOverlay from '../ui/elements/NoRowsOverlay';
import Placeholder, {Loader} from '../ui/elements/Placeholder';

// const rows = [
//     {
//         id: 1,
//         name: 'Welcome to postbox',
//         image: '',
//         role: '',
//         updated: moment(new Date().toLocaleString()).format('MMMM Do YYYY'),
//         actions: null
//     },
//     {
//         id: 2,
//         name: 'This is a demo',
//         image: '',
//         role: '',
//         updated: moment(new Date().toLocaleString()).format('MMMM Do YYYY'),
//         actions: null
//     }

// ];

const CTBody = (props) => {
    const classes = ElementCSS();
    const [loader, setLoader] = React.useState(false);
    const [rows, setRows] = React.useState([]);
    const [columns, setColumns] = React.useState([]);
    const noRowsMessage = "No "+(props['title']?props['title']:props['name'])+" added yet";
    React.useEffect(() => {
        auth.get('/CRUD'+props['path'])
            .then((response) => {
                response.data.columns.push({
                    field: 'actions',
                    headerName: 'Actions',
                    headerClassName: 'table-header-light',
                    flex:1,
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
                });
                setColumns(response.data.columns);

            })
    },[props['path']]);
    return (
        <React.Fragment>
            <div className={classes.header}>
                <Title className={classes.title}>
                    <FontAwesomeIcon size='lg' icon={props['icon']} /> {props['title']?props['title']:props['name']}
                </Title>
                <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    className={classes.largebutton}
                    startIcon={<AddIcon />}>
                    Add {props['title']?props['title']:props['name']}
                </Button>
            </div>
            <div className={classes.grid}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    checkboxSelection
                    disableSelectionOnClick
                    components={{
                        NoRowsOverlay: function () {
                            return (
                                <>
                                    <Placeholder check={loader}>
                                        <Loader height={50} lines={8} />
                                    </Placeholder>
                                    <NoRowsOverlay icon={props['icon']} message={noRowsMessage} />
                                </>
                            );
                        },
                    }}
                />
            </div>
        </React.Fragment>
    );
}

export default function ContentType(props) {
    const [data,setData] = React.useState({});
    React.useEffect(function() {
        if(typeof props.path !== typeof undefined) {
            auth.get('/ContentType' + props.path)
                .then(response =>  setData(response['data']['content_type']));
        } else {
            setData({});
        }
    },[props.path]);

    return (
        <Frame>
            <Card xs={12}>
                <CTBody { ...props } { ...data } />
            </Card>
        </Frame>
    );
}
