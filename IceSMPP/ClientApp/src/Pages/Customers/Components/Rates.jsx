import { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { currencies } from '@/constants';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export default function Rates({ customer }) {
    const [showCreateRateDialog, setShowCreateRateDialog] = useState(false);
    const [showEditRateDialog, setShowEditRateDialog] = useState(false);
    const [editingRate, setEditingRate] = useState(null);
    const [deleteRateId, setDeleteRateId] = useState(null);

    const { data: rateData, setData: setRateData, post: createRate, processing: processingRate, errors: rateErrors, reset: resetRate } = useForm({
        prefix: '',
        rate: '',
        currency: 'XAF',
        notes: '',
    });

    const { data: editRateData, setData: setEditRateData, put: updateRate, processing: processingEditRate, errors: editRateErrors, reset: resetEditRate } = useForm({
        prefix: '',
        rate: '',
        currency: 'XAF',
        is_active: true,
        notes: '',
    });

    const handleCreateRate = (e) => {
        e.preventDefault();
        createRate(route('customers.rates.store', customer), {
            onSuccess: () => {
                setShowCreateRateDialog(false);
                resetRate();
            },
        });
    };

    const handleEditRate = (e) => {
        e.preventDefault();
        if (!editingRate) return;
        
        updateRate(route('customers.rates.update', [customer, editingRate]), {
            onSuccess: () => {
                setShowEditRateDialog(false);
                setEditingRate(null);
                resetEditRate();
            },
        });
    };

    const startEditRate = (rate) => {
        setEditingRate(rate);
        setEditRateData({
            prefix: rate.prefix || '',
            rate: rate.rate,
            currency: rate.currency,
            is_active: rate.is_active,
            notes: rate.notes || '',
        });
        setShowEditRateDialog(true);
    };

    const handleDeleteRate = () => {
        if (!deleteRateId) return;
        
        router.delete(route('customers.rates.destroy', [customer, deleteRateId]), {
            onSuccess: () => {
                setDeleteRateId(null);
            },
        });
    };

    return (
        <>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <CardTitle>SMS Rates</CardTitle>
                            <CardDescription>
                                Manage SMS rates for this customer
                            </CardDescription>
                        </div>
                        <Button onClick={() => setShowCreateRateDialog(true)}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Rate
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Prefix</TableHead>
                                <TableHead>Rate</TableHead>
                                <TableHead>Currency</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {customer.rates?.map((rate) => (
                                <TableRow key={rate.id}>
                                    <TableCell className="font-medium">
                                        {rate.prefix || 'Any'}
                                    </TableCell>
                                    <TableCell>
                                        {rate.rate}
                                    </TableCell>
                                    <TableCell>
                                        {rate.currency}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={rate.is_active ? "success" : "secondary"}>
                                            {rate.is_active ? "Active" : "Inactive"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => startEditRate(rate)}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => setDeleteRateId(rate.id)}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={!!deleteRateId} onOpenChange={(open) => !open && setDeleteRateId(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Rate</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this rate? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setDeleteRateId(null)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDeleteRate}
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={showCreateRateDialog} onOpenChange={(open) => !open && setShowCreateRateDialog(false)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Rate</DialogTitle>
                        <DialogDescription>
                            Add a new SMS rate for this customer.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleCreateRate} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="prefix">Prefix Pattern</Label>
                            <Input
                                id="prefix"
                                value={rateData.prefix}
                                onChange={e => setRateData('prefix', e.target.value)}
                                placeholder="e.g. ^90[0-9]{10}$"
                            />
                            <p className="text-xs text-muted-foreground">
                                Regular expression pattern for matching phone numbers. Leave empty to match all numbers.
                            </p>
                            {rateErrors.prefix && (
                                <p className="text-sm text-destructive">{rateErrors.prefix}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="rate">Rate</Label>
                            <Input
                                id="rate"
                                type="text"
                                pattern="^\d*[,.]?\d{0,5}$"
                                value={rateData.rate}
                                onChange={e => {
                                    const value = e.target.value.replace('.', ',');
                                    if (value === '' || /^\d*[,]?\d{0,5}$/.test(value)) {
                                        setRateData('rate', value);
                                    }
                                }}
                                placeholder="18,5"
                            />
                            <p className="text-xs text-muted-foreground">
                                Enter rate with comma separator (e.g. 18,5)
                            </p>
                            {rateErrors.rate && (
                                <p className="text-sm text-destructive">{rateErrors.rate}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="currency">Currency</Label>
                            <select
                                id="currency"
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                value={rateData.currency}
                                onChange={e => setRateData('currency', e.target.value)}
                            >
                                {currencies.map(currency => (
                                    <option key={currency.code} value={currency.code}>
                                        {currency.name} ({currency.code})
                                    </option>
                                ))}
                            </select>
                            {rateErrors.currency && (
                                <p className="text-sm text-destructive">{rateErrors.currency}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="notes">Notes</Label>
                            <Textarea
                                id="notes"
                                value={rateData.notes}
                                onChange={e => setRateData('notes', e.target.value)}
                            />
                            {rateErrors.notes && (
                                <p className="text-sm text-destructive">{rateErrors.notes}</p>
                            )}
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setShowCreateRateDialog(false)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processingRate}>
                                Add Rate
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={showEditRateDialog} onOpenChange={(open) => !open && setShowEditRateDialog(false)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Rate</DialogTitle>
                        <DialogDescription>
                            Update the SMS rate details.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleEditRate} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-prefix">Prefix Pattern</Label>
                            <Input
                                id="edit-prefix"
                                value={editRateData.prefix}
                                onChange={e => setEditRateData('prefix', e.target.value)}
                                placeholder="e.g. ^90[0-9]{10}$"
                            />
                            <p className="text-xs text-muted-foreground">
                                Regular expression pattern for matching phone numbers. Leave empty to match all numbers.
                            </p>
                            {editRateErrors.prefix && (
                                <p className="text-sm text-destructive">{editRateErrors.prefix}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="edit-rate">Rate</Label>
                            <Input
                                id="edit-rate"
                                type="text"
                                pattern="^\d*[,.]?\d{0,5}$"
                                value={editRateData.rate}
                                onChange={e => {
                                    const value = e.target.value.replace('.', ',');
                                    if (value === '' || /^\d*[,]?\d{0,5}$/.test(value)) {
                                        setEditRateData('rate', value);
                                    }
                                }}
                                placeholder="18,5"
                            />
                            <p className="text-xs text-muted-foreground">
                                Enter rate with comma separator (e.g. 18,5)
                            </p>
                            {editRateErrors.rate && (
                                <p className="text-sm text-destructive">{editRateErrors.rate}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="edit-currency">Currency</Label>
                            <select
                                id="edit-currency"
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                value={editRateData.currency}
                                onChange={e => setEditRateData('currency', e.target.value)}
                            >
                                {currencies.map(currency => (
                                    <option key={currency.code} value={currency.code}>
                                        {currency.name} ({currency.code})
                                    </option>
                                ))}
                            </select>
                            {editRateErrors.currency && (
                                <p className="text-sm text-destructive">{editRateErrors.currency}</p>
                            )}
                        </div>

                        <div className="flex items-center space-x-2">
                            <Switch
                                id="edit-is_active"
                                checked={editRateData.is_active}
                                onCheckedChange={checked => setEditRateData('is_active', checked)}
                            />
                            <Label htmlFor="edit-is_active">Active</Label>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="edit-notes">Notes</Label>
                            <Textarea
                                id="edit-notes"
                                value={editRateData.notes}
                                onChange={e => setEditRateData('notes', e.target.value)}
                            />
                            {editRateErrors.notes && (
                                <p className="text-sm text-destructive">{editRateErrors.notes}</p>
                            )}
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setShowEditRateDialog(false)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processingEditRate}>
                                Update Rate
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
} 