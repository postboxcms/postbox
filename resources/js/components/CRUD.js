import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { DataGrid } from '@mui/x-data-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Card, Frame } from '../core/ui/layout/Frame';
import Title from '../core/ui/elements/Title';
import { ElementCSS } from '../core/ui/elements/element.css';

import auth from '../core/libs/authmanager';
import NoRowsOverlay from '../core/ui/elements/NoRowsOverlay';

const Body = (props) => {
    const classes = ElementCSS();
    const rows = [];
    const columns = [];
    const setContentType = () => {

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
                        {props['content_types']?
                            props['content_types'].map((ctype,i) =>
                                <MenuItem key={ctype.id} value={ctype.id}>{ctype.name}</MenuItem>)
                            :""
                        }
                    </Select>
                </FormControl>
            </div>
            <div className={classes.grid}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    // checkboxSelection
                    disableSelectionOnClick
                    components={{
                        NoRowsOverlay: function() {
                            return (<NoRowsOverlay message="No content type selected" />)
                        },
                      }}
                />
            </div>
        </React.Fragment>
    );
}

export default function CRUD(props) {
    const [data,setData] = React.useState({});
    React.useEffect(function() {
        auth.get('/CRUD')
            .then(response =>  setData(response.data));
    },[props.path]);

    return (
        <Frame>
            <Card xs={12}>
                <Body {...props} {...data} />
            </Card>
        </Frame>
    );
}
