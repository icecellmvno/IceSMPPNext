import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

export default function OriginatorSettings({ customer }) {
    const [addOriginatorOpen, setAddOriginatorOpen] = useState(false);
    const [editOriginatorOpen, setEditOriginatorOpen] = useState(null);

    const { data: originatorData, setData: setOriginatorData, post: createOriginator, processing: originatorProcessing, errors: originatorErrors, reset: resetOriginator } = useForm({
        title: '',
        type: 'alfanumeric',
        notes: '',
    });

    const { data: editOriginatorData, setData: setEditOriginatorData, put: updateOriginator, processing: editOriginatorProcessing, errors: editOriginatorErrors, reset: resetEditOriginator } = useForm({
        title: '',
        type: 'alfanumeric',
        is_active: true,
        notes: '',
    });

    const handleCreateOriginator = (e) => {
        e.preventDefault();
        createOriginator(route('customers.originators.store', customer), {
            onSuccess: () => {
                setAddOriginatorOpen(false);
                resetOriginator();
            },
        });
    };

    const handleEditOriginator = (e) => {
        e.preventDefault();
        updateOriginator(route('customers.originators.update', [customer, editOriginatorOpen]), {
            onSuccess: () => {
                setEditOriginatorOpen(null);
                resetEditOriginator();
            },
        });
    };

    const startEditOriginator = (originator) => {
        setEditOriginatorData({
            title: originator.title,
            type: originator.type,
            is_active: originator.is_active,
            notes: originator.notes || '',
        });
        setEditOriginatorOpen(originator.id);
    };

    return (
        <>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <CardTitle>Originators</CardTitle>
                            <CardDescription>
                                Manage SMS originators for this customer
                            </CardDescription>
                        </div>
                        <Button onClick={() => setAddOriginatorOpen(true)}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Originator
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {customer.originators?.map((originator) => (
                                <TableRow key={originator.id}>
                                    <TableCell className="font-medium">
                                        {originator.title}
                                    </TableCell>
                                    <TableCell>
                                        {originator.type}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={originator.is_active ? "success" : "secondary"}>
                                            {originator.is_active ? "Active" : "Inactive"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => startEditOriginator(originator)}
                                        >
                                            Edit
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={addOriginatorOpen} onOpenChange={setAddOriginatorOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Originator</DialogTitle>
                        <DialogDescription>
                            Create a new SMS originator for this customer
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleCreateOriginator} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={originatorData.title}
                                onChange={e => setOriginatorData('title', e.target.value)}
                                placeholder="Enter originator title"
                            />
                            {originatorErrors.title && (
                                <p className="text-sm text-destructive">{originatorErrors.title}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="type">Type</Label>
                            <Select
                                value={originatorData.type}
                                onValueChange={(value) => setOriginatorData('type', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="alfanumeric">Alphanumeric</SelectItem>
                                    <SelectItem value="numeric">Numeric</SelectItem>
                                    <SelectItem value="shortcode">Shortcode</SelectItem>
                                </SelectContent>
                            </Select>
                            {originatorErrors.type && (
                                <p className="text-sm text-destructive">{originatorErrors.type}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="notes">Notes</Label>
                            <Textarea
                                id="notes"
                                value={originatorData.notes}
                                onChange={e => setOriginatorData('notes', e.target.value)}
                            />
                            {originatorErrors.notes && (
                                <p className="text-sm text-destructive">{originatorErrors.notes}</p>
                            )}
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setAddOriginatorOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={originatorProcessing}>
                                Create Originator
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={editOriginatorOpen !== null} onOpenChange={() => setEditOriginatorOpen(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Originator</DialogTitle>
                        <DialogDescription>
                            Update originator settings
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleEditOriginator} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-title">Title</Label>
                            <Input
                                id="edit-title"
                                value={editOriginatorData.title}
                                onChange={e => setEditOriginatorData('title', e.target.value)}
                                placeholder="Enter originator title"
                            />
                            {editOriginatorErrors.title && (
                                <p className="text-sm text-destructive">{editOriginatorErrors.title}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="edit-type">Type</Label>
                            <Select
                                value={editOriginatorData.type}
                                onValueChange={(value) => setEditOriginatorData('type', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="alfanumeric">Alphanumeric</SelectItem>
                                    <SelectItem value="numeric">Numeric</SelectItem>
                                    <SelectItem value="shortcode">Shortcode</SelectItem>
                                </SelectContent>
                            </Select>
                            {editOriginatorErrors.type && (
                                <p className="text-sm text-destructive">{editOriginatorErrors.type}</p>
                            )}
                        </div>

                        <div className="flex items-center space-x-2">
                            <Switch
                                id="edit-is_active"
                                checked={editOriginatorData.is_active}
                                onCheckedChange={checked => setEditOriginatorData('is_active', checked)}
                            />
                            <Label htmlFor="edit-is_active">Active</Label>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="edit-notes">Notes</Label>
                            <Textarea
                                id="edit-notes"
                                value={editOriginatorData.notes}
                                onChange={e => setEditOriginatorData('notes', e.target.value)}
                            />
                            {editOriginatorErrors.notes && (
                                <p className="text-sm text-destructive">{editOriginatorErrors.notes}</p>
                            )}
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setEditOriginatorOpen(null)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={editOriginatorProcessing}>
                                Save Changes
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
} 