import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Skeleton } from "@mui/material";
import { useSecureRoute } from "@app/hooks";
import NoRowsOverlay from "@ui/components/NoRowsOverlay";

export const DataTable = ({ 
    headers, 
    source, 
    onUpdate, 
    onReset, 
    onLoad,
    overlayMessage, 
    overlayIcon,
    triggerRefresh
}) => {
    const [rows, setRows] = React.useState([]);
    const [columns, setColumns] = React.useState(headers);
    const api = useSecureRoute();
    const Loader = () => (
        <Skeleton variant="rounded" width="50%" height="35%" />
    );

    React.useEffect(() => {
        // this is a preloader state
        const mappedColumns = columns.map(column => ({
            ...column,
            renderCell: (params) => {
                return params.id > 0 ? column.renderCell(params) : <Loader />;
            }
        }));
        const mappedRows = Array.from({ length: 10 }, (_, index) => ({ id: -index }));
        setColumns(mappedColumns);
        setRows(mappedRows);

        if (source) {
            api.get(source).then((response) => {
                setRows(response.data.fields);
                if (onUpdate) {
                    onUpdate();
                }
                if(onLoad) {
                    onLoad(response.data.fields);
                }
            });
        } else {
            setRows([]);
            if(onReset) {
                onReset();
            }
        }
    }, [source, triggerRefresh]);

    return (
        <DataGrid
            rows={rows}
            columns={columns}
            pageSize={rows.length}
            disableSelectionOnClick
            components={{
                NoRowsOverlay: function () {
                    return (
                        <>
                            <NoRowsOverlay
                                icon={overlayIcon}
                                message={overlayMessage}
                            />
                        </>
                    );
                },
            }}
        />

    )
}

export default DataTable;