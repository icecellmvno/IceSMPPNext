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
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

export default function SmppUsers({ customer }) {
    const [addSmppUserOpen, setAddSmppUserOpen] = useState(false);
    const [editSmppUserOpen, setEditSmppUserOpen] = useState(null);

    const { data: smppUserData, setData: setSmppUserData, post: createSmppUser, processing: smppUserProcessing, errors: smppUserErrors, reset: resetSmppUser } = useForm({
        system_id: '',
        system_type: '',
        password: '',
        ip_address: '',
        max_binds: 1,
        notes: '',
    });

    const { data: editSmppUserData, setData: setEditSmppUserData, put: updateSmppUser, processing: editSmppUserProcessing, errors: editSmppUserErrors, reset: resetEditSmppUser } = useForm({
        system_id: '',
        system_type: '',
        password: '',
        ip_address: '',
        max_binds: 1,
        is_active: true,
        notes: '',
    });

    const handleCreateSmppUser = (e) => {
        e.preventDefault();
        createSmppUser(route('customers.smpp-users.store', customer), {
            onSuccess: () => {
                setAddSmppUserOpen(false);
                resetSmppUser();
            },
        });
    };

    const handleEditSmppUser = (e) => {
        e.preventDefault();
        updateSmppUser(route('customers.smpp-users.update', [customer, editSmppUserOpen]), {
            onSuccess: () => {
                setEditSmppUserOpen(null);
                resetEditSmppUser();
            },
        });
    };

    const startEditSmppUser = (smppUser) => {
        setEditSmppUserData({
            system_id: smppUser.system_id,
            system_type: smppUser.system_type,
            ip_address: smppUser.ip_address || '',
            max_binds: smppUser.max_binds,
            is_active: smppUser.is_active,
            notes: smppUser.notes || '',
        });
        setEditSmppUserOpen(smppUser.id);
    };

    return (
        <>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <CardTitle>SMPP Users</CardTitle>
                            <CardDescription>
                                Manage SMPP users and their configurations
                            </CardDescription>
                        </div>
                        <Dialog open={addSmppUserOpen} onOpenChange={setAddSmppUserOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add SMPP User
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <form onSubmit={handleCreateSmppUser}>
                                    <DialogHeader>
                                        <DialogTitle>Add SMPP User</DialogTitle>
                                        <DialogDescription>
                                            Create a new SMPP user for this customer
                                        </DialogDescription>
                                    </DialogHeader>

                                    <div className="grid gap-4 py-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="system_id">System ID</Label>
                                            <Input
                                                id="system_id"
                                                value={smppUserData.system_id}
                                                onChange={e => setSmppUserData('system_id', e.target.value)}
                                                placeholder="Enter system ID"
                                            />
                                            {smppUserErrors.system_id && (
                                                <p className="text-sm text-destructive">{smppUserErrors.system_id}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="system_type">System Type</Label>
                                            <Input
                                                id="system_type"
                                                value={smppUserData.system_type}
                                                onChange={e => setSmppUserData('system_type', e.target.value)}
                                                placeholder="Enter system type"
                                            />
                                            {smppUserErrors.system_type && (
                                                <p className="text-sm text-destructive">{smppUserErrors.system_type}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="password">Password</Label>
                                            <Input
                                                id="password"
                                                type="password"
                                                value={smppUserData.password}
                                                onChange={e => setSmppUserData('password', e.target.value)}
                                                placeholder="Enter password"
                                            />
                                            {smppUserErrors.password && (
                                                <p className="text-sm text-destructive">{smppUserErrors.password}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="ip_address">IP Address</Label>
                                            <Input
                                                id="ip_address"
                                                value={smppUserData.ip_address}
                                                onChange={e => setSmppUserData('ip_address', e.target.value)}
                                                placeholder="Enter IP address"
                                            />
                                            {smppUserErrors.ip_address && (
                                                <p className="text-sm text-destructive">{smppUserErrors.ip_address}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="max_binds">Max Binds</Label>
                                            <Input
                                                id="max_binds"
                                                type="number"
                                                min="1"
                                                value={smppUserData.max_binds}
                                                onChange={e => setSmppUserData('max_binds', e.target.value)}
                                            />
                                            {smppUserErrors.max_binds && (
                                                <p className="text-sm text-destructive">{smppUserErrors.max_binds}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="notes">Notes</Label>
                                            <Textarea
                                                id="notes"
                                                value={smppUserData.notes}
                                                onChange={e => setSmppUserData('notes', e.target.value)}
                                            />
                                            {smppUserErrors.notes && (
                                                <p className="text-sm text-destructive">{smppUserErrors.notes}</p>
                                            )}
                                        </div>
                                    </div>

                                    <DialogFooter>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setAddSmppUserOpen(false)}
                                        >
                                            Cancel
                                        </Button>
                                        <Button type="submit" disabled={smppUserProcessing}>
                                            Create SMPP User
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>System ID</TableHead>
                                <TableHead>System Type</TableHead>
                                <TableHead>IP Address</TableHead>
                                <TableHead>Max Binds</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {customer.smpp_users?.map((smppUser) => (
                                <TableRow key={smppUser.id}>
                                    <TableCell className="font-medium">
                                        {smppUser.system_id}
                                    </TableCell>
                                    <TableCell>
                                        {smppUser.system_type}
                                    </TableCell>
                                    <TableCell>
                                        {smppUser.ip_address || 'Any'}
                                    </TableCell>
                                    <TableCell>
                                        {smppUser.max_binds}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={smppUser.is_active ? "success" : "secondary"}>
                                            {smppUser.is_active ? "Active" : "Inactive"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => startEditSmppUser(smppUser)}
                                            >
                                                Edit
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={editSmppUserOpen !== null} onOpenChange={() => setEditSmppUserOpen(null)}>
                <DialogContent>
                    <form onSubmit={handleEditSmppUser}>
                        <DialogHeader>
                            <DialogTitle>Edit SMPP User</DialogTitle>
                            <DialogDescription>
                                Update SMPP user settings
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="edit-system_id">System ID</Label>
                                <Input
                                    id="edit-system_id"
                                    value={editSmppUserData.system_id}
                                    onChange={e => setEditSmppUserData('system_id', e.target.value)}
                                    placeholder="Enter system ID"
                                />
                                {editSmppUserErrors.system_id && (
                                    <p className="text-sm text-destructive">{editSmppUserErrors.system_id}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="edit-system_type">System Type</Label>
                                <Input
                                    id="edit-system_type"
                                    value={editSmppUserData.system_type}
                                    onChange={e => setEditSmppUserData('system_type', e.target.value)}
                                    placeholder="Enter system type"
                                />
                                {editSmppUserErrors.system_type && (
                                    <p className="text-sm text-destructive">{editSmppUserErrors.system_type}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="edit-password">Password</Label>
                                <Input
                                    id="edit-password"
                                    type="password"
                                    value={editSmppUserData.password}
                                    onChange={e => setEditSmppUserData('password', e.target.value)}
                                    placeholder="Enter new password (leave empty to keep current)"
                                />
                                {editSmppUserErrors.password && (
                                    <p className="text-sm text-destructive">{editSmppUserErrors.password}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="edit-ip_address">IP Address</Label>
                                <Input
                                    id="edit-ip_address"
                                    value={editSmppUserData.ip_address}
                                    onChange={e => setEditSmppUserData('ip_address', e.target.value)}
                                    placeholder="Enter IP address"
                                />
                                {editSmppUserErrors.ip_address && (
                                    <p className="text-sm text-destructive">{editSmppUserErrors.ip_address}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="edit-max_binds">Max Binds</Label>
                                <Input
                                    id="edit-max_binds"
                                    type="number"
                                    min="1"
                                    value={editSmppUserData.max_binds}
                                    onChange={e => setEditSmppUserData('max_binds', e.target.value)}
                                />
                                {editSmppUserErrors.max_binds && (
                                    <p className="text-sm text-destructive">{editSmppUserErrors.max_binds}</p>
                                )}
                            </div>

                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="edit-is_active"
                                    checked={editSmppUserData.is_active}
                                    onCheckedChange={checked => setEditSmppUserData('is_active', checked)}
                                />
                                <Label htmlFor="edit-is_active">Active</Label>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="edit-notes">Notes</Label>
                                <Textarea
                                    id="edit-notes"
                                    value={editSmppUserData.notes}
                                    onChange={e => setEditSmppUserData('notes', e.target.value)}
                                />
                                {editSmppUserErrors.notes && (
                                    <p className="text-sm text-destructive">{editSmppUserErrors.notes}</p>
                                )}
                            </div>
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setEditSmppUserOpen(null)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={editSmppUserProcessing}>
                                Save Changes
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
} 