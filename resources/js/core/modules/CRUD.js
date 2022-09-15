import React from 'react';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { DataGrid } from '@mui/x-data-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

import { Card, Frame } from '../ui/layout/Frame';
import { ElementCSS } from '../ui/elements/element.css';
import Title from '../ui/elements/Title';

import { IOSSwitch } from '../libs/elements';
import { useNotifier } from '../libs/notifications';
import auth from '../libs/authmanager';

import NoRowsOverlay from '../ui/elements/NoRowsOverlay';
import Placeholder, { Loader } from '../ui/elements/Placeholder';

const Body = (props) => {
    const classes = ElementCSS();
    const [rows,setRows] = React.useState([]);
    const [cellFocus, setCellFocus] = React.useState(false);
    const [loader, setLoader] = React.useState(false);
    const columns = [
        {
            field: 'id',
            headerClassName: 'table-header-light',
            headerName: 'ID',
            width: 0,
            hide: true
        },
        {
            field: 'table',
            headerClassName: 'table-header-light',
            headerName: 'TABLE',
            width: 0,
            hide: true
        },
        {
            field: 'field',
            headerClassName: 'table-header-light',
            headerName: 'FIELD',
            width: 200,
            renderCell: (params) => {
                return (
                    <div>
                        <TextField disabled value={params.value} id="outlined-basic" label="" size='small' variant="outlined" />
                    </div>
                )
            }
        },
        {
            field: 'alias',
            headerName: 'ALIAS',
            headerClassName: 'table-header-light',
            width: 200,
            renderCell: (params) => {
                return (
                    <div>
                        <TextField
                            onChange={(event) => updateCell(event,params)}
                            defaultValue={params.value}
                            label=""
                            size='small'
                            variant="outlined"
                            onKeyDown={(event) => {
                                event.stopPropagation();
                            }}
                            />
                    </div>
                )
            }
        },
        {
            field: 'type',
            headerName: 'TYPE',
            headerClassName: 'table-header-light',
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <FormControl className='dropdown data-dropdown' sx={{ m: 1, minWidth: 120 }}>
                            <Select
                                defaultValue={"hidden"}
                                value={params.value?params.value:"hidden"}
                                onChange={(event) => updateCell(event,params)}
                            >
                                <MenuItem value="hidden">Hidden</MenuItem>
                                <MenuItem value="text">Text</MenuItem>
                                <MenuItem value="email">Email</MenuItem>
                                <MenuItem value="password">Password</MenuItem>
                                <MenuItem value="dropdown">Dropdown</MenuItem>
                                <MenuItem value="radio">Radio</MenuItem>
                                <MenuItem value="editor">Editor</MenuItem>
                                <MenuItem value="textarea">Textarea</MenuItem>
                                <MenuItem value="image">Image</MenuItem>
                            </Select>
                        </FormControl>
                    </>
                )
            }
        },
        {
            field: 'list',
            alignItems: 'center',
            headerName: 'VIEW IN LIST',
            headerClassName: 'table-header-light',
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <FormControlLabel
                            onChange={(event) => updateCell(event,params)}
                            control={<IOSSwitch sx={{ m: 1 }} checked={params.value?Boolean(params.value):false} />}
                            label=""
                        />
                    </>
                )
            }
        },
        {
            field: 'position',
            headerName: 'EDIT PAGE POSITION',
            headerClassName: 'table-header-light',
            width: 200,
            renderCell: (params) => {
                return (
                    <>
                        <FormControl className='dropdown data-dropdown' sx={{ m: 1, minWidth: 120 }}>
                            <Select
                                onChange={(event) => updateCell(event,params)}
                                defaultValue={"none"}
                                value={params.value?params.value:"none"}
                            >
                                <MenuItem value="none">None</MenuItem>
                                <MenuItem value="left">Left</MenuItem>
                                <MenuItem value="right">Right</MenuItem>
                            </Select>
                        </FormControl>
                    </>
                )
            }
        },
        {
            field: 'actions',
            headerName: 'Actions',
            headerClassName: 'table-header-light',
            width: 150,
            renderCell: (params) => {
                const classes = ElementCSS();
                return (
                    <div>
                        <Button
                            onClick={() => saveField(params.row)}
                            variant="contained"
                            disableElevation={true}
                            color="primary"
                            size="small"
                            className={classes.button}
                            startIcon={<SaveAltIcon />}>
                            Save
                        </Button>
                    </div>
                );
            }
        },
    ];
    const notify = useNotifier();

    const setContentType = (e) => {
        setLoader(true);
        if(e.target.value !== "") {
            auth.get('/CRUD/'+e.target.value)
                .then((response) => {
                    setRows(response.data.fields);
                    setLoader(false);
                });
        } else {
            setRows([]);
            setLoader(false);
        }
    }

    const updateCell = (event,data) => {
        data.row[data.field] = typeof event.target.type !== typeof undefined && event.target.type == 'checkbox'?event.target.checked:event.target.value;
        data.value = data.row[data.field];
        data.formattedValue = data.row[data.field];
        if(typeof event.target.type === typeof undefined || event.target.type == 'checkbox') {
            setCellFocus(!cellFocus);
            data.api.setCellFocus(cellFocus);
        }
    }

    const saveField = (data) => {
        auth.post('/CRUD', data)
            .then((response) => notify(response.data.message));
    }

    return (
        <React.Fragment>
            <div className={classes.header}>
                <Title className={classes.title}>
                    <FontAwesomeIcon size='lg' icon={props['icon']} /> {props['title'] ? props['title'] : props['name']}
                </Title>
                <FormControl className='dropdown' sx={{ m: 1, minWidth: 120 }}>
                    <Select
                        onChange={setContentType}
                        defaultValue=""
                        displayEmpty
                    >
                        <MenuItem value="">Content Type</MenuItem>
                        {props['content_types'] ?
                            props['content_types'].map((ctype, i) =>
                                <MenuItem key={ctype.id} value={ctype.slug}>{ctype.name}</MenuItem>)
                            : ""
                        }
                    </Select>
                </FormControl>
            </div>
            <div className={classes.grid}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={rows.length}
                    disableSelectionOnClick
                    components={{
                        NoRowsOverlay: function () {
                            return (
                                <>
                                    <Placeholder check={loader}>
                                        <Loader height={50} lines={8} />
                                    </Placeholder>
                                    <NoRowsOverlay icon={props['icon']} message="No content type selected" />
                                </>
                            );
                        },
                    }}
                />
            </div>
        </React.Fragment>
    );
}

export default function CRUD(props) {
    const [data, setData] = React.useState({});
    React.useEffect(function () {
        auth.get('/CRUD')
            .then(response => setData(response.data));
    }, [props.path]);

    return (
        <Frame>
            <Card xs={12}>
                <Body {...props} {...data} />
            </Card>
        </Frame>
    );
}