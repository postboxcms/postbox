import React from "react";
import { useNotifier, useSecureRoute } from "@app/hooks";
import NoRowsOverlay from "@ui/components/NoRowsOverlay";

const Table = ({ rows, columns, pageSize = 10, checkboxSelection = false, onRowsChange, onCellFocus, emptyState }) => {
    const [page, setPage] = React.useState(0);
    const [selected, setSelected] = React.useState([]);
    const [sort, setSort] = React.useState({ field: null, direction: "asc" });
    const visibleColumns = columns.filter((column) => !column.hide);
    const sortedRows = React.useMemo(() => {
        if (!sort.field) return rows;
        return [...rows].sort((first, second) => {
            const firstValue = first[sort.field];
            const secondValue = second[sort.field];
            const result = typeof firstValue === "number" && typeof secondValue === "number"
                ? firstValue - secondValue
                : String(firstValue ?? "").localeCompare(String(secondValue ?? ""), undefined, {
                    numeric: true,
                    sensitivity: "base",
                });
            return sort.direction === "asc" ? result : -result;
        });
    }, [rows, sort]);
    const pageCount = Math.max(1, Math.ceil(sortedRows.length / pageSize));
    const pageRows = sortedRows.slice(page * pageSize, (page + 1) * pageSize);

    React.useEffect(() => {
        setPage(0);
        setSelected([]);
    }, [rows.length, pageSize]);

    const updateRows = (updates) => {
        if (!onRowsChange) return;
        const nextRows = [...rows];
        updates.forEach((updated) => {
            const index = nextRows.findIndex((row) => row.id === updated.id);
            if (index >= 0) nextRows[index] = { ...nextRows[index], ...updated };
        });
        onRowsChange(nextRows);
    };

    return (
        <div className="h-full overflow-auto rounded-lg border border-slate-200 bg-white">
            <table className="w-full border-collapse text-left text-sm">
                <thead className="sticky top-0 z-10 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-600">
                    <tr>
                        {checkboxSelection && (
                            <th className="w-10 border-b border-slate-200 px-3 py-3">
                                <input
                                    type="checkbox"
                                    aria-label="Select all rows"
                                    checked={pageRows.length > 0 && pageRows.every((row) => selected.includes(row.id))}
                                    onChange={(event) => setSelected(event.target.checked ? pageRows.map((row) => row.id) : [])}
                                    className="app-primary-checkbox h-4 w-4"
                                />
                            </th>
                        )}
                        {visibleColumns.map((column) => (
                            <th
                                key={column.field}
                                aria-sort={sort.field === column.field ? (sort.direction === "asc" ? "ascending" : "descending") : "none"}
                                className="border-b border-slate-200 px-3 py-3"
                                style={column.width ? { width: column.width } : undefined}
                            >
                                <button
                                    type="button"
                                    disabled={column.sortable === false}
                                    onClick={() => setSort((current) => ({
                                        field: column.field,
                                        direction: current.field === column.field && current.direction === "asc" ? "desc" : "asc",
                                    }))}
                                    className="text-left disabled:cursor-default"
                                >
                                    {column.headerName || column.field}
                                    {sort.field === column.field ? (sort.direction === "asc" ? " ↑" : " ↓") : ""}
                                </button>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {pageRows.map((row, rowIndex) => (
                        <tr key={row.id ?? rowIndex} className="hover:bg-slate-50">
                            {checkboxSelection && (
                                <td className="px-3 py-2">
                                    <input
                                        type="checkbox"
                                        aria-label={`Select row ${row.id ?? rowIndex + 1}`}
                                        checked={selected.includes(row.id)}
                                        onChange={(event) => setSelected(event.target.checked ? [...selected, row.id] : selected.filter((id) => id !== row.id))}
                                        className="app-primary-checkbox h-4 w-4"
                                    />
                                </td>
                            )}
                            {visibleColumns.map((column) => {
                                const params = {
                                    id: row.id,
                                    row,
                                    field: column.field,
                                    value: row[column.field],
                                    formattedValue: row[column.field],
                                    api: {
                                        updateRows,
                                        setCellFocus: onCellFocus || (() => {}),
                                    },
                                };
                                return (
                                    <td key={column.field} className="px-3 py-2 align-middle text-slate-700">
                                        {column.renderCell ? column.renderCell(params) : row[column.field]}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                    {!rows.length && emptyState && (
                        <tr>
                            <td colSpan={visibleColumns.length + Number(checkboxSelection)} className="h-48 px-4 text-center">
                                {emptyState}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {rows.length > pageSize && (
                <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-4 py-2 text-sm text-slate-600">
                    <span className="table-pagination">{page * pageSize + 1}-{Math.min((page + 1) * pageSize, rows.length)} of {rows.length}</span>
                    <button type="button" aria-label="Previous page" disabled={page === 0} onClick={() => setPage(page - 1)} className="rounded px-2 py-1 hover:bg-slate-100 disabled:opacity-40">‹</button>
                    <button type="button" aria-label="Next page" disabled={page + 1 >= pageCount} onClick={() => setPage(page + 1)} className="rounded px-2 py-1 hover:bg-slate-100 disabled:opacity-40">›</button>
                </div>
            )}
        </div>
    );
};

export const DataTable = ({
    headers = [],
    source,
    onUpdate,
    onReset,
    onLoad,
    overlayMessage,
    overlayIcon,
    triggerRefresh,
}) => {
    const [rows, setRows] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const api = useSecureRoute();
    const notify = useNotifier();

    React.useEffect(() => {
        let mounted = true;
        if (!source) {
            setRows([]);
            setLoading(false);
            if (onReset) onReset();
            return () => { mounted = false; };
        }

        setLoading(true);
        api.get(source)
            .then((response) => {
                if (!mounted) return;
                const fields = response.data.fields;
                setRows(fields);
                if (onUpdate) onUpdate();
                if (onLoad) onLoad(fields);
            })
            .catch((error) => {
                if (!mounted) return;
                const message = error?.response?.data?.message || error?.message;
                if (message) notify(message, "error");
                else {
                    console.error("Failed to load table data", error);
                    notify("Failed to load table data", "error");
                }
            })
            .finally(() => {
                if (mounted) setLoading(false);
            });

        return () => { mounted = false; };
    }, [source, triggerRefresh]);

    const emptyState = loading ? (
        <div className="space-y-3">
            {[...Array(4)].map((_, index) => <div key={index} className="animate-pulse rounded bg-slate-100 py-2" />)}
        </div>
    ) : (
        <NoRowsOverlay icon={overlayIcon} message={overlayMessage} />
    );

    return <Table rows={rows} columns={headers} pageSize={Math.max(rows.length, 1)} emptyState={emptyState} />;
};

export { Table };
export default DataTable;
