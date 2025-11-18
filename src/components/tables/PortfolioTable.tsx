import { useMemo } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    flexRender,
    createColumnHelper,
    type SortingState,
    type ColumnFiltersState,
} from '@tanstack/react-table';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Chip,
    Box,
    Typography,
    TextField,
    InputAdornment,
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    ArrowUpward,
    ArrowDownward,
    Search as SearchIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import type { Stock } from '../../types/stock.types';

interface PortfolioTableProps {
    stocks: Stock[];
    onEdit: (stock: Stock) => void;
    onDelete: (stock: Stock) => void;
}

const columnHelper = createColumnHelper<Stock>();

export const PortfolioTable: React.FC<PortfolioTableProps> = ({
    stocks,
    onEdit,
    onDelete,
}) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState('');

    const columns = useMemo(
        () => [
            columnHelper.accessor('ticker', {
                header: 'Ticker',
                cell: (info) => (
                    <Typography fontWeight={600} color="primary">
                        {info.getValue()}
                    </Typography>
                ),
            }),
            columnHelper.accessor('companyName', {
                header: 'Company Name',
                cell: (info) => <Typography>{info.getValue()}</Typography>,
            }),
            columnHelper.accessor('quantity', {
                header: 'Quantity',
                cell: (info) => (
                    <Typography>{info.getValue().toLocaleString()}</Typography>
                ),
            }),
            columnHelper.accessor('purchasePrice', {
                header: 'Purchase Price',
                cell: (info) => (
                    <Typography>${info.getValue().toFixed(2)}</Typography>
                ),
            }),
            columnHelper.accessor('currentPrice', {
                header: 'Current Price',
                cell: (info) => (
                    <Typography>${info.getValue().toFixed(2)}</Typography>
                ),
            }),
            columnHelper.display({
                id: 'totalValue',
                header: 'Total Value',
                cell: ({ row }) => {
                    const value = row.original.quantity * row.original.currentPrice;
                    return <Typography fontWeight={600}>${value.toFixed(2)}</Typography>;
                },
            }),
            columnHelper.display({
                id: 'gainLoss',
                header: 'Gain/Loss',
                cell: ({ row }) => {
                    const cost = row.original.quantity * row.original.purchasePrice;
                    const value = row.original.quantity * row.original.currentPrice;
                    const gainLoss = value - cost;
                    const isPositive = gainLoss >= 0;

                    return (
                        <Typography
                            color={isPositive ? 'success.main' : 'error.main'}
                            fontWeight={600}
                        >
                            {isPositive ? '+' : ''}${gainLoss.toFixed(2)}
                        </Typography>
                    );
                },
            }),
            columnHelper.display({
                id: 'gainLossPercent',
                header: 'Gain/Loss %',
                cell: ({ row }) => {
                    const cost = row.original.quantity * row.original.purchasePrice;
                    const value = row.original.quantity * row.original.currentPrice;
                    const gainLoss = value - cost;
                    const percentage = cost > 0 ? (gainLoss / cost) * 100 : 0;
                    const isPositive = percentage >= 0;

                    return (
                        <Chip
                            label={`${isPositive ? '+' : ''}${percentage.toFixed(2)}%`}
                            color={isPositive ? 'success' : 'error'}
                            size="small"
                            sx={{ fontWeight: 600 }}
                        />
                    );
                },
            }),
            columnHelper.accessor('dateOfPurchase', {
                header: 'Purchase Date',
                cell: (info) => (
                    <Typography variant="body2">
                        {new Date(info.getValue()).toLocaleDateString()}
                    </Typography>
                ),
            }),
            columnHelper.display({
                id: 'actions',
                header: 'Actions',
                cell: ({ row }) => (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                            size="small"
                            color="primary"
                            onClick={() => onEdit(row.original)}
                        >
                            <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                            size="small"
                            color="error"
                            onClick={() => onDelete(row.original)}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Box>
                ),
            }),
        ],
        [onEdit, onDelete]
    );

    const table = useReactTable({
        data: stocks,
        columns,
        state: {
            sorting,
            columnFilters,
            globalFilter,
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    return (
        <Box>
            <Box sx={{ mb: 3 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search by ticker or company name..."
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableCell
                                        key={header.id}
                                        sx={{
                                            fontWeight: 600,
                                            backgroundColor: 'grey.100',
                                            cursor: header.column.getCanSort()
                                                ? 'pointer'
                                                : 'default',
                                        }}
                                        onClick={header.column.getToggleSortingHandler()}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 0.5,
                                            }}
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {header.column.getIsSorted() === 'asc' && (
                                                <ArrowUpward fontSize="small" />
                                            )}
                                            {header.column.getIsSorted() === 'desc' && (
                                                <ArrowDownward fontSize="small" />
                                            )}
                                        </Box>
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody>
                        {table.getRowModel().rows.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    sx={{ textAlign: 'center', py: 8 }}
                                >
                                    <Typography variant="body1" color="text.secondary">
                                        No stocks found. Add your first stock to get started.
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{
                                        '&:hover': { backgroundColor: 'grey.50' },
                                    }}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};
