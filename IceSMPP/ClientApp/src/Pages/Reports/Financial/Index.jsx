import { useState, useMemo } from 'react';
import { Head, router } from '@inertiajs/react';
import { format } from 'date-fns';
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export default function Index({ auth, reports, customers, filters, summary }) {
    const [columnFilters, setColumnFilters] = useState(filters.columnFilters || {});
    const [globalFilter, setGlobalFilter] = useState(filters.globalFilter || '');
    const [sorting, setSorting] = useState(filters.sorting || []);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount);
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: 'customer',
                header: 'Customer',
                cell: ({ row }) => (
                    <div className="font-medium">
                        {row.original.customer.name}
                    </div>
                ),
            },
            {
                accessorKey: 'total_messages',
                header: 'Messages',
                cell: ({ row }) => (
                    <div className="text-right font-medium">
                        {row.original.total_messages}
                    </div>
                ),
            },
            {
                accessorKey: 'total_sms_parts',
                header: 'SMS Parts',
                cell: ({ row }) => (
                    <div className="text-right font-medium">
                        {row.original.total_sms_parts}
                    </div>
                ),
            },
            {
                accessorKey: 'total_sale_price',
                header: 'Sales',
                cell: ({ row }) => (
                    <div className="text-right font-medium">
                        {formatCurrency(row.original.total_sale_price)}
                    </div>
                ),
            },
            {
                accessorKey: 'total_cost_price',
                header: 'Costs',
                cell: ({ row }) => (
                    <div className="text-right font-medium">
                        {formatCurrency(row.original.total_cost_price)}
                    </div>
                ),
            },
            {
                accessorKey: 'total_profit',
                header: 'Profit',
                cell: ({ row }) => (
                    <div className="text-right font-medium">
                        {formatCurrency(row.original.total_profit)}
                    </div>
                ),
            },
        ],
        []
    );

    const table = useReactTable({
        data: reports.data,
        columns,
        state: {
            columnFilters,
            globalFilter,
            sorting,
        },
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        manualPagination: true,
        manualSorting: true,
        manualFiltering: true,
        pageCount: Math.ceil(reports.total / reports.per_page),
    });

    const updateUrl = () => {
        router.get(route('reports.financial.index'), {
            columnFilters,
            globalFilter,
            sorting,
            page: table.getState().pagination.pageIndex + 1,
            pageSize: table.getState().pagination.pageSize,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={{
                title: "Financial Reports",
                module: "Reports"
            }}
        >
            <Head title="Financial Reports" />

            <div className="container mx-auto py-6">
                {/* Summary Cards */}
                <div className="grid gap-4 md:grid-cols-5 mb-6">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{summary?.total_messages || 0}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Total SMS Parts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{summary?.total_sms_parts || 0}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(summary?.total_sale_price || 0)}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Total Costs</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(summary?.total_cost_price || 0)}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(summary?.total_profit || 0)}</div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <CardTitle>Financial Reports</CardTitle>
                                <CardDescription>
                                    View and analyze financial reports
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {/* Required Date Range Filter */}
                        <div className="grid gap-4 md:grid-cols-2 mb-6">
                            <div className="space-y-2">
                                <Label>From Date</Label>
                                <Input
                                    type="datetime-local"
                                    value={columnFilters.send_timestamp?.split(' to ')[0] || ''}
                                    onChange={(e) => {
                                        const fromDate = e.target.value;
                                        const toDate = columnFilters.send_timestamp?.split(' to ')[1] || '';
                                        setColumnFilters({
                                            ...columnFilters,
                                            send_timestamp: fromDate && toDate ? `${fromDate} to ${toDate}` : undefined
                                        });
                                        updateUrl();
                                    }}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>To Date</Label>
                                <Input
                                    type="datetime-local"
                                    value={columnFilters.send_timestamp?.split(' to ')[1] || ''}
                                    onChange={(e) => {
                                        const fromDate = columnFilters.send_timestamp?.split(' to ')[0] || '';
                                        const toDate = e.target.value;
                                        setColumnFilters({
                                            ...columnFilters,
                                            send_timestamp: fromDate && toDate ? `${fromDate} to ${toDate}` : undefined
                                        });
                                        updateUrl();
                                    }}
                                />
                            </div>
                        </div>

                        {/* Advanced Filters */}
                        <div className="flex flex-wrap items-center gap-4 py-4">
                            <Input
                                placeholder="Search all columns..."
                                value={globalFilter ?? ''}
                                onChange={(e) => {
                                    setGlobalFilter(e.target.value);
                                    updateUrl();
                                }}
                                className="max-w-xs"
                            />

                            <Select
                                value={columnFilters.customer || undefined}
                                onValueChange={(value) => {
                                    setColumnFilters({
                                        ...columnFilters,
                                        customer: value || undefined
                                    });
                                    updateUrl();
                                }}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select customer" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Customers</SelectItem>
                                    {customers.map((customer) => (
                                        <SelectItem key={customer.id} value={customer.name}>
                                            {customer.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Button
                                variant="outline"
                                onClick={() => {
                                    setColumnFilters({});
                                    setGlobalFilter('');
                                    updateUrl();
                                }}
                            >
                                Reset Filters
                            </Button>
                        </div>

                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    {table.getHeaderGroups().map((headerGroup) => (
                                        <TableRow key={headerGroup.id}>
                                            {headerGroup.headers.map((header) => (
                                                <TableHead key={header.id}>
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                </TableHead>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableHeader>
                                <TableBody>
                                    {table.getRowModel().rows?.length ? (
                                        table.getRowModel().rows.map((row) => (
                                            <TableRow
                                                key={row.id}
                                                data-state={row.getIsSelected() && "selected"}
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
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={columns.length}
                                                className="h-24 text-center"
                                            >
                                                {!columnFilters.send_timestamp ? (
                                                    <div className="text-muted-foreground">
                                                        Please select a date range to view reports
                                                    </div>
                                                ) : (
                                                    "No results found"
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        <div className="flex items-center justify-between space-x-2 py-4">
                            <div className="flex-1 text-sm text-muted-foreground">
                                {reports.total} record(s) found.
                            </div>
                            <div className="space-x-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        table.previousPage();
                                        updateUrl();
                                    }}
                                    disabled={!table.getCanPreviousPage()}
                                >
                                    Previous
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        table.nextPage();
                                        updateUrl();
                                    }}
                                    disabled={!table.getCanNextPage()}
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
} 