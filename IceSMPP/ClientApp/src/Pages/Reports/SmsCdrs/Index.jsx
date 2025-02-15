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
import { Badge } from '@/components/ui/badge';
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from 'lucide-react';

export default function Index({ auth, cdrs, filters, customers, summary }) {
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
                accessorKey: 'message_id',
                header: 'Message ID',
                cell: ({ row }) => <div className="font-medium">{row.original.message_id}</div>,
            },
            {
                accessorKey: 'customer',
                header: 'Customer',
                cell: ({ row }) => (
                    <div>
                        {row.original.customer.name}
                        <div className="text-xs text-muted-foreground">
                            {row.original.customer_user}
                        </div>
                    </div>
                ),
            },
            {
                accessorKey: 'sender_msisdn',
                header: 'From',
            },
            {
                accessorKey: 'receiver_msisdn',
                header: 'To',
            },
            {
                accessorKey: 'sms_status',
                header: 'Status',
                cell: ({ row }) => (
                    <Badge variant={
                        row.original.sms_status === 'DELIVERED' ? 'success' :
                        row.original.sms_status === 'PENDING' ? 'warning' :
                        'destructive'
                    }>
                        {row.original.sms_status}
                    </Badge>
                ),
            },
            {
                id: 'type',
                header: 'Type',
                cell: ({ row }) => (
                    <div className="flex flex-col gap-1">
                        <Badge variant="outline">
                            {row.original.connection_type.toUpperCase()}
                        </Badge>
                        <Badge variant="secondary">
                            {row.original.direction === 'mt' ? 'MT' : 'MO'}
                        </Badge>
                    </div>
                ),
            },
            {
                accessorKey: 'send_timestamp',
                header: 'Send Time',
                cell: ({ row }) => format(new Date(row.original.send_timestamp), 'dd.MM.yyyy HH:mm:ss'),
            },
            {
                id: 'price',
                header: 'Price',
                cell: ({ row }) => (
                    <div className="space-y-1 text-right">
                        <div className="text-xs text-muted-foreground">
                            Sale: {formatCurrency(row.original.sale_price)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                            Cost: {formatCurrency(row.original.cost_price)}
                        </div>
                    </div>
                ),
            },
        ],
        []
    );

    const table = useReactTable({
        data: cdrs.data,
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
        pageCount: Math.ceil(cdrs.total / cdrs.per_page),
    });

    const updateUrl = () => {
        router.get(route('reports.sms-cdrs.index'), {
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
                title: "SMS CDRs",
                module: "Reports"
            }}
        >
            <Head title="SMS CDRs" />

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
                                <CardTitle>SMS CDRs</CardTitle>
                                <CardDescription>
                                    View and search SMS Call Detail Records
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
                                    value={columnFilters.dateRange?.split(' to ')[0] || ''}
                                    onChange={(e) => {
                                        const fromDate = e.target.value;
                                        const toDate = columnFilters.dateRange?.split(' to ')[1] || '';
                                        setColumnFilters({
                                            ...columnFilters,
                                            dateRange: fromDate && toDate ? `${fromDate} to ${toDate}` : undefined
                                        });
                                        updateUrl();
                                    }}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>To Date</Label>
                                <Input
                                    type="datetime-local"
                                    value={columnFilters.dateRange?.split(' to ')[1] || ''}
                                    onChange={(e) => {
                                        const fromDate = columnFilters.dateRange?.split(' to ')[0] || '';
                                        const toDate = e.target.value;
                                        setColumnFilters({
                                            ...columnFilters,
                                            dateRange: fromDate && toDate ? `${fromDate} to ${toDate}` : undefined
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

                            <Select
                                value={columnFilters.sms_status || undefined}
                                onValueChange={(value) => {
                                    setColumnFilters({
                                        ...columnFilters,
                                        sms_status: value || undefined
                                    });
                                    updateUrl();
                                }}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="DELIVERED">Delivered</SelectItem>
                                    <SelectItem value="PENDING">Pending</SelectItem>
                                    <SelectItem value="FAILED">Failed</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select
                                value={columnFilters.connection_type || undefined}
                                onValueChange={(value) => {
                                    setColumnFilters({
                                        ...columnFilters,
                                        connection_type: value || undefined
                                    });
                                    updateUrl();
                                }}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Types</SelectItem>
                                    <SelectItem value="http">HTTP</SelectItem>
                                    <SelectItem value="smpp">SMPP</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select
                                value={columnFilters.direction || undefined}
                                onValueChange={(value) => {
                                    setColumnFilters({
                                        ...columnFilters,
                                        direction: value || undefined
                                    });
                                    updateUrl();
                                }}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select direction" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Directions</SelectItem>
                                    <SelectItem value="mt">MT (Mobile Terminated)</SelectItem>
                                    <SelectItem value="mo">MO (Mobile Originated)</SelectItem>
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
                                                {!columnFilters.dateRange ? (
                                                    <div className="text-muted-foreground">
                                                        Please select a date range to view records
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
                                {cdrs.total} record(s) found.
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