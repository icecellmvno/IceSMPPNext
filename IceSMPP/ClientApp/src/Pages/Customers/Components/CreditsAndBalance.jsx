import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { CreditCard, Plus, Minus, Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { currencies } from '@/constants';
import {
    Card,
    CardContent,
    CardHeader,
} from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    getPaginationRowModel,
} from '@tanstack/react-table';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CreditsAndBalance({ customer, creditLogs }) {
    const [showAddCreditDialog, setShowAddCreditDialog] = useState(false);
    const [showDeductCreditDialog, setShowDeductCreditDialog] = useState(false);
    const [showAddMoneyDialog, setShowAddMoneyDialog] = useState(false);
    const [showDeductMoneyDialog, setShowDeductMoneyDialog] = useState(false);

    const { data: creditData, setData: setCreditData, post: submitCredit, processing: creditProcessing, errors: creditErrors, reset: resetCredit } = useForm({
        amount: '',
        description: '',
    });

    const { data: moneyData, setData: setMoneyData, post: submitMoney, processing: moneyProcessing, errors: moneyErrors, reset: resetMoney } = useForm({
        amount: '',
        currency: '',
        description: '',
    });

    const handleAddCredit = (e) => {
        e.preventDefault();
        submitCredit(route('customers.credit.add', customer), {
            onSuccess: () => {
                setShowAddCreditDialog(false);
                resetCredit();
            },
        });
    };

    const handleDeductCredit = (e) => {
        e.preventDefault();
        submitCredit(route('customers.credit.deduct', customer), {
            onSuccess: () => {
                setShowDeductCreditDialog(false);
                resetCredit();
            },
        });
    };

    const handleAddMoney = (e) => {
        e.preventDefault();
        submitMoney(route('customers.money.add', customer), {
            onSuccess: () => {
                setShowAddMoneyDialog(false);
                resetMoney();
            },
        });
    };

    const handleDeductMoney = (e) => {
        e.preventDefault();
        submitMoney(route('customers.money.deduct', customer), {
            onSuccess: () => {
                setShowDeductMoneyDialog(false);
                resetMoney();
            },
        });
    };

    const columns = [
        {
            header: 'Date',
            accessorKey: 'created_at',
            cell: ({ row }) => new Date(row.original.created_at).toLocaleString(),
        },
        {
            header: 'Type',
            accessorKey: 'type',
            cell: ({ row }) => (
                <Badge variant={row.original.type === 'add' ? 'success' : 'destructive'}>
                    {row.original.type === 'add' ? 'Added' : 'Deducted'}
                </Badge>
            ),
        },
        {
            header: 'Category',
            accessorKey: 'log_type',
            cell: ({ row }) => (
                <Badge variant="outline">
                    {row.original.log_type === 'credit' ? 'SMS Credit' : 'Money'}
                </Badge>
            ),
        },
        {
            header: 'Amount',
            accessorKey: 'amount',
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <span className={row.original.type === 'add' ? 'text-green-600' : 'text-red-600'}>
                        {row.original.type === 'add' ? '+' : '-'}{Math.abs(row.original.amount)}
                    </span>
                    {row.original.currency && (
                        <span className="text-muted-foreground text-sm">
                            {row.original.currency}
                        </span>
                    )}
                </div>
            ),
        },
        {
            header: 'Description',
            accessorKey: 'description',
        },
        {
            header: 'Created By',
            accessorKey: 'creator.name',
        },
    ];

    const table = useReactTable({
        data: creditLogs.data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        pageCount: Math.ceil(creditLogs.total / creditLogs.per_page),
        state: {
            pagination: {
                pageIndex: creditLogs.current_page - 1,
                pageSize: creditLogs.per_page,
            },
        },
        onPaginationChange: (updater) => {
            if (typeof updater === 'function') {
                const nextState = updater({
                    pageIndex: creditLogs.current_page - 1,
                    pageSize: creditLogs.per_page,
                });
                router.get(
                    route('customers.show', customer.id),
                    { page: nextState.pageIndex + 1, per_page: nextState.pageSize },
                    { preserveState: true, preserveScroll: true }
                );
            }
        },
    });

    return (
        <>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <h2 className="text-2xl font-semibold tracking-tight">Credits & Balance</h2>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm text-muted-foreground">SMS Credits: {customer.sms_credit}</span>
                                </div>
                                {customer.rates.map((rate) => (
                                    <div key={rate.id} className="flex items-center gap-2">
                                        <Coins className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">
                                            {rate.currency} Balance: {rate.balance}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => setShowAddCreditDialog(true)}>
                                        <CreditCard className="mr-2 h-4 w-4" />
                                        Add SMS Credit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setShowAddMoneyDialog(true)}>
                                        <Coins className="mr-2 h-4 w-4" />
                                        Add Money
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">
                                        <Minus className="mr-2 h-4 w-4" />
                                        Deduct
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => setShowDeductCreditDialog(true)}>
                                        <CreditCard className="mr-2 h-4 w-4" />
                                        Deduct SMS Credit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setShowDeductMoneyDialog(true)}>
                                        <Coins className="mr-2 h-4 w-4" />
                                        Deduct Money
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label>SMS Credit</Label>
                                <div className="flex items-center gap-2">
                                    <CreditCard className="h-4 w-4" />
                                    <span className="text-2xl font-bold">{customer.sms_credit}</span>
                                </div>
                            </div>
                            {customer.rates.map((rate) => (
                                <div key={rate.id} className="space-y-2">
                                    <Label>{rate.currency} Balance</Label>
                                    <div className="flex items-center gap-2">
                                        <Coins className="h-4 w-4" />
                                        <span className="text-2xl font-bold">{rate.balance}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    {table.getHeaderGroups().map((headerGroup) => (
                                        <TableRow key={headerGroup.id}>
                                            {headerGroup.headers.map((header) => (
                                                <TableHead key={header.id}>
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                                </TableHead>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableHeader>
                                <TableBody>
                                    {table.getRowModel().rows.map((row) => (
                                        <TableRow key={row.id}>
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => table.previousPage()}
                                    disabled={!table.getCanPreviousPage()}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => table.nextPage()}
                                    disabled={!table.getCanNextPage()}
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">
                                    Page {table.getState().pagination.pageIndex + 1} of{' '}
                                    {table.getPageCount()}
                                </span>
                                <Select
                                    value={table.getState().pagination.pageSize.toString()}
                                    onValueChange={(value) => {
                                        table.setPageSize(Number(value));
                                    }}
                                >
                                    <SelectTrigger className="h-8 w-[70px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {[10, 20, 30, 40, 50].map((pageSize) => (
                                            <SelectItem key={pageSize} value={pageSize.toString()}>
                                                {pageSize}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Dialog open={showAddCreditDialog} onOpenChange={setShowAddCreditDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add SMS Credit</DialogTitle>
                        <DialogDescription>
                            Add SMS credits to customer's account
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleAddCredit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="amount">Amount</Label>
                            <Input
                                id="amount"
                                type="number"
                                min="1"
                                value={creditData.amount}
                                onChange={e => setCreditData('amount', e.target.value)}
                            />
                            {creditErrors.amount && (
                                <p className="text-sm text-destructive">{creditErrors.amount}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Input
                                id="description"
                                value={creditData.description}
                                onChange={e => setCreditData('description', e.target.value)}
                            />
                            {creditErrors.description && (
                                <p className="text-sm text-destructive">{creditErrors.description}</p>
                            )}
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setShowAddCreditDialog(false)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={creditProcessing}>
                                Add Credit
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={showDeductCreditDialog} onOpenChange={setShowDeductCreditDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Deduct SMS Credit</DialogTitle>
                        <DialogDescription>
                            Deduct SMS credits from customer's account
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleDeductCredit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="amount">Amount</Label>
                            <Input
                                id="amount"
                                type="number"
                                min="1"
                                value={creditData.amount}
                                onChange={e => setCreditData('amount', e.target.value)}
                            />
                            {creditErrors.amount && (
                                <p className="text-sm text-destructive">{creditErrors.amount}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Input
                                id="description"
                                value={creditData.description}
                                onChange={e => setCreditData('description', e.target.value)}
                            />
                            {creditErrors.description && (
                                <p className="text-sm text-destructive">{creditErrors.description}</p>
                            )}
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setShowDeductCreditDialog(false)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={creditProcessing}>
                                Deduct Credit
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={showAddMoneyDialog} onOpenChange={setShowAddMoneyDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Money</DialogTitle>
                        <DialogDescription>
                            Add money to customer's account
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleAddMoney} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="amount">Amount</Label>
                            <Input
                                id="amount"
                                type="number"
                                min="0.01"
                                step="0.01"
                                value={moneyData.amount}
                                onChange={e => setMoneyData('amount', e.target.value)}
                            />
                            {moneyErrors.amount && (
                                <p className="text-sm text-destructive">{moneyErrors.amount}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="currency">Currency</Label>
                            <Select
                                value={moneyData.currency}
                                onValueChange={(value) => setMoneyData('currency', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select currency" />
                                </SelectTrigger>
                                <SelectContent>
                                    {currencies.map((currency) => (
                                        <SelectItem key={currency.code} value={currency.code}>
                                            {currency.name} ({currency.code})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {moneyErrors.currency && (
                                <p className="text-sm text-destructive">{moneyErrors.currency}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Input
                                id="description"
                                value={moneyData.description}
                                onChange={e => setMoneyData('description', e.target.value)}
                            />
                            {moneyErrors.description && (
                                <p className="text-sm text-destructive">{moneyErrors.description}</p>
                            )}
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setShowAddMoneyDialog(false)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={moneyProcessing}>
                                Add Money
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={showDeductMoneyDialog} onOpenChange={setShowDeductMoneyDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Deduct Money</DialogTitle>
                        <DialogDescription>
                            Deduct money from customer's account
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleDeductMoney} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="amount">Amount</Label>
                            <Input
                                id="amount"
                                type="number"
                                min="0.01"
                                step="0.01"
                                value={moneyData.amount}
                                onChange={e => setMoneyData('amount', e.target.value)}
                            />
                            {moneyErrors.amount && (
                                <p className="text-sm text-destructive">{moneyErrors.amount}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="currency">Currency</Label>
                            <Select
                                value={moneyData.currency}
                                onValueChange={(value) => setMoneyData('currency', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select currency" />
                                </SelectTrigger>
                                <SelectContent>
                                    {currencies.map((currency) => (
                                        <SelectItem key={currency.code} value={currency.code}>
                                            {currency.name} ({currency.code})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {moneyErrors.currency && (
                                <p className="text-sm text-destructive">{moneyErrors.currency}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Input
                                id="description"
                                value={moneyData.description}
                                onChange={e => setMoneyData('description', e.target.value)}
                            />
                            {moneyErrors.description && (
                                <p className="text-sm text-destructive">{moneyErrors.description}</p>
                            )}
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setShowDeductMoneyDialog(false)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={moneyProcessing}>
                                Deduct Money
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
} 