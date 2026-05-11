import React from 'react';
import { first } from 'lodash';

import { MenuItem, Select, FormControl, FormControlLabel } from '@mui/material';

import { useWebCSS, useModal } from '@app/hooks';
import { useNotifier, useSecureRoute, useCMSRoute } from '@app/hooks';

import IOSSwitch from '@ui/components/elements/IOSSwitch';
import Title from '@ui/components/elements/Title';
import Input from '@ui/components/elements/Input';
import ClassicButton from '@ui/components/elements/ClassicButton';
import Dialog from '@ui/components/Dialog';
import DataTable from '@ui/components/DataTable';
import IconButton from '@ui/components/elements/IconButton';
import AddEditField from './AddEditField';
import DeleteField from './DeleteField';

const Body = (props) => {
  const classes = useWebCSS();
  const modal = useModal();
  const api = useSecureRoute();
  const cms = useCMSRoute();
  const notify = useNotifier();
  const [addRows, setAddRows] = React.useState(false);
  const [gridResponse, setGridResponse] = React.useState([]);
  const [formdata, setFormdata] = React.useState({});
  const [cellFocus, setCellFocus] = React.useState(false);
  const [endpoint, setEndpoint] = React.useState(null);
  const pageIcon = 'fa-layer-group';

  const fieldTypes = [
    { value: 'index', label: 'Index', dataType: 'id' },
    { value: 'hidden', label: 'Hidden', dataType: 'string' },
    { value: 'text', label: 'Text', dataType: 'string' },
    { value: 'email', label: 'Email', dataType: 'string' },
    { value: 'password', label: 'Password', dataType: 'string' },
    { value: 'dropdown', label: 'Dropdown', dataType: 'string' },
    { value: 'radio', label: 'Radio', dataType: 'string' },
    { value: 'checkbox', label: 'Checkbox', dataType: 'string' },
    { value: 'switch', label: 'Switch', dataType: 'boolean' },
    { value: 'editor', label: 'Editor', dataType: 'longText' },
    { value: 'textarea', label: 'Textarea', dataType: 'longText' },
    { value: 'editor', label: 'Editor', dataType: 'longText' },
    { value: 'image', label: 'Image', dataType: 'string' },
    { value: 'timestamp', label: 'Timestamp', dataType: 'timestamp' },
    { value: 'user', label: 'User', dataType: 'integer' },
  ];

  const editPagePositions = [
    { value: 'none', label: 'None' },
    { value: 'left', label: 'Left' },
    { value: 'right', label: 'Right' },
  ];

  const guardedFields = ['id', 'uuid'];
  const guardedTypes = ['index', 'timestamp'];
  const inputFields = ['text'];

  const columns = [
    {
      field: 'id',
      headerClassName: 'table-header-light',
      headerName: 'ID',
      width: 0,
      hide: true,
    },
    {
      field: 'table',
      headerClassName: 'table-header-light',
      headerName: 'TABLE',
      width: 0,
      hide: true,
    },
    {
      field: 'field',
      headerClassName: 'table-header-light',
      headerName: 'FIELD',
      flex: 1,
      renderCell: (params) => {
        return (
          <div>
            <Input disabled value={params.value} id="outlined-basic" label="" />
          </div>
        );
      },
    },
    {
      field: 'alias',
      headerName: 'ALIAS',
      headerClassName: 'table-header-light',
      flex: 1,
      renderCell: (params) => {
        return (
          <div>
            <Input
              onChange={(event) => updateCell(event, params)}
              defaultValue={params.value}
              label=""
              name="alias"
              size="small"
              onKeyDown={(event) => {
                event.stopPropagation();
              }}
            />
          </div>
        );
      },
    },
    {
      field: 'type',
      headerName: 'TYPE',
      headerClassName: 'table-header-light',
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <FormControl className="dropdown data-dropdown" sx={{ m: 1, minWidth: 120 }}>
              <Select
                defaultValue={'hidden'}
                name="type"
                value={params.value ? params.value : 'hidden'}
                onChange={(event) => updateCell(event, params)}
              >
                {fieldTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        );
      },
    },
    {
      field: 'list',
      alignItems: 'center',
      headerName: 'VIEW IN LIST',
      headerClassName: 'table-header-light',
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <FormControlLabel
              onChange={(event) => updateCell(event, params)}
              control={
                <IOSSwitch sx={{ m: 1 }} checked={params.value ? Boolean(params.value) : false} />
              }
              label=""
            />
          </>
        );
      },
    },
    {
      field: 'mandatory',
      alignItems: 'center',
      headerName: 'MANDATORY',
      headerClassName: 'table-header-light',
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <FormControlLabel
              onChange={(event) => updateCell(event, params)}
              control={
                <IOSSwitch
                  sx={{ m: 1 }}
                  disabled={
                    guardedFields.includes(params?.row?.field) ||
                    guardedTypes.includes(params?.row?.type)
                      ? true
                      : false
                  }
                  checked={params.value ? Boolean(params.value) : false}
                />
              }
              label=""
            />
          </>
        );
      },
    },
    {
      field: 'url',
      alignItems: 'center',
      headerName: 'FRONTEND URL',
      headerClassName: 'table-header-light',
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <FormControlLabel
              name="url"
              onChange={(event) => updateCell(event, params)}
              control={
                <IOSSwitch
                  sx={{ m: 1 }}
                  disabled={
                    guardedFields.includes(params?.row?.field) ||
                    guardedTypes.includes(params?.row?.type) || 
                    !inputFields.includes(params?.row?.type)
                      ? true
                      : false
                  }
                  checked={params.value ? Boolean(params.value) : false}
                />
              }
              label=""
            />
          </>
        );
      },
    },
    {
      field: 'position',
      headerName: 'EDIT PAGE POSITION',
      headerClassName: 'table-header-light',
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <FormControl className="dropdown data-dropdown" sx={{ m: 1, minWidth: 120 }}>
              <Select
                onChange={(event) => updateCell(event, params)}
                defaultValue={'none'}
                disabled={
                  guardedFields.includes(params?.row?.field) ||
                  guardedTypes.includes(params?.row?.type)
                    ? true
                    : false
                }
                value={params.value ? params.value : 'none'}
              >
                {editPagePositions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        );
      },
    },
    {
      field: 'actions',
      headerName: 'ACTIONS',
      headerClassName: 'table-header-light',
      flex: 1,
      renderCell: (params) => {
        return (
          <FormControl
            sx={{
              m: 1,
              maxWidth: 50,
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <IconButton
              disabled={
                guardedFields.includes(params?.row?.field) ||
                guardedTypes.includes(params?.row?.type)
                  ? true
                  : false
              }
              name="fa-pen-to-square"
              color={params?.row?.type == 'index' ? '' : 'primary'}
              onClick={() => {
                console.log('gridResponse', gridResponse);
                modal.handleOpen(
                  <AddEditField
                    typeList={fieldTypes}
                    mode="edit"
                    row={params?.row}
                    table={first(gridResponse)?.table || params?.row?.table}
                    positionList={editPagePositions}
                    onClose={() => {
                      setCellFocus(!cellFocus);
                      modal.handleClose();
                    }}
                  />,
                  'Edit field',
                  'fa-pen-to-square'
                );
              }}
            />
            <IconButton
              disabled={
                guardedFields.includes(params?.row?.field) ||
                guardedTypes.includes(params?.row?.type)
                  ? true
                  : false
              }
              name="fa-trash"
              color={params?.row?.type == 'index' ? '' : 'primary'}
              onClick={() => {
                modal.handleOpen(
                  <DeleteField
                    data={{
                      table: params?.row?.table,
                      column: params?.row.field,
                      type: params?.row.type,
                    }}
                    onClose={() => {
                      refreshTable();
                      modal.handleClose();
                    }}
                  />,
                  'Delete field',
                  'fa-folder-minus'
                );
              }}
            />
          </FormControl>
        );
      },
    },
  ];

  const refreshTable = () => {
    setCellFocus(Math.random());
    return;
  };

  const processPayload = (payload, event) => {
    let data = payload;
    data.row[data.field] =
      typeof event.target.type !== typeof undefined && event.target.type == 'checkbox'
        ? event.target.checked
        : event.target.value;
    data.value = data.row[data.field];
    data.formattedValue = data.row[data.field];
    return data;
  };

  const updateText = (data, event) => {
    setTimeout(() => {
      data['event'] = event;
      setFormdata(data);
    }, 1000);
    return;
  };

  const updateCell = (event, data) => {
    if (event.target.type == 'text') {
      return updateText(data, event);
    }

    if (event.target.name == 'type') {
      return updateSchema(data, event);
    }

    return saveField(processPayload(data, event), event);
  };

  const updateSchema = (payload, event) => {
    const data = processPayload(payload, event);
    const replaceType = event.target.value;
    const fieldType = fieldTypes.find((type) => type.value === replaceType);
    const dataType = fieldType ? fieldType.dataType : null;
    const params = { field: data.row.field, replaceType: dataType };
    const table = data.row.table;

    if (params.replaceType !== 'id') {
      return cms
        .patch('/dbo/' + table, params)
        .then(() => {
          console.log('Schema updated successfully', data);
          saveField(data, event);
        })
        .catch((error) => {
          console.error('Error updating schema:', error);
          notify(error.response.data.message, 'error');
        });
    }
    return saveField(data, event);
  };

  const saveField = (data, event) => {
    return api.post('/crud', data.row).then((response) => {
      if (typeof event.target.type === typeof undefined || event.target.type == 'checkbox') {
        setCellFocus(!cellFocus);
        data.api.setCellFocus(cellFocus);
      }
      notify(response.data.message);
      setFormdata({});
    });
  };

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (formdata && formdata.event) {
        const data = processPayload(formdata, formdata.event);
        saveField(data, formdata.event);
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [formdata]);

  return (
    <React.Fragment>
      <div className={classes.header}>
        <Title icon={pageIcon}>{props['title'] ? props['title'] : props['name']}</Title>
        <FormControl className="controls" sx={{ m: 1, minWidth: 80 }}>
          <ClassicButton
            type="button"
            onClick={() => {
              console.log('gridResponse', gridResponse);
              modal.handleOpen(
                <AddEditField
                  typeList={fieldTypes}
                  table={first(gridResponse)?.table}
                  positionList={editPagePositions}
                  onClose={() => {
                    setCellFocus(!cellFocus);
                    modal.handleClose();
                  }}
                />,
                'Add a new field',
                'fa-folder-plus'
              );
            }}
            disabled={!addRows}
            icon="fa-plus"
          >
            New field
          </ClassicButton>
          <Select
            onChange={(e) =>
              e.target.value ? setEndpoint('/crud/' + e.target.value) : setEndpoint('')
            }
            defaultValue=""
            displayEmpty
          >
            <MenuItem value="">Entity</MenuItem>
            {props['entities']
              ? props['entities'].map((entity, i) => (
                  <MenuItem key={entity.id} value={entity.slug}>
                    {entity.name}
                  </MenuItem>
                ))
              : ''}
          </Select>
        </FormControl>
      </div>
      <div className={classes.grid}>
        <DataTable
          headers={columns}
          source={endpoint}
          triggerRefresh={cellFocus}
          overlayIcon={pageIcon}
          overlayMessage="No entity selected"
          onUpdate={() => setAddRows(true)}
          onReset={() => setAddRows(false)}
          onLoad={(response) => setGridResponse(response)}
        />
      </div>
      <div>
        <Dialog {...modal} />
      </div>
    </React.Fragment>
  );
};

export default Body;
