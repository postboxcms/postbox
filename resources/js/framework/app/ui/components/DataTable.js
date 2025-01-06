import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Skeleton } from "@mui/material";
import { useAuthentication } from "@app/hooks";
import NoRowsOverlay from "@ui/components/NoRowsOverlay";

export const DataTable = ({ headers, api, onUpdate, onReset }) => {
    const [rows, setRows] = React.useState([]);
    const [columns, setColumns] = React.useState(headers);
    const auth = useAuthentication();
    const pageIcon = "fa-layer-group";
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

        if (api) {
            auth.get(api).then((response) => {
                setRows(response.data.fields);
                if (onUpdate) {
                    onUpdate();
                }
            });
        } else {
            setRows([]);
            if(onReset) {
                onReset();
            }
        }
    }, [api]);

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
                            {/* <Placeholder check={loader}>
                                <Loader lines={10} height={30} />
                            </Placeholder> */}
                            <NoRowsOverlay
                                icon={pageIcon}
                                message="No content type selected"
                            />
                        </>
                    );
                },
            }}
        />

    )
}

export default DataTable;