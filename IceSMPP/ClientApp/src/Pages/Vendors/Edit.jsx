import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export default function Edit({ auth, vendor }) {
    const { data, setData, patch, processing, errors } = useForm({
        name: vendor.name,
        code: vendor.code,
        mcc: vendor.mcc || '',
        mnc: vendor.mnc || '',
        email: vendor.email || '',
        phone: vendor.phone || '',
        address: vendor.address || '',
        tax_number: vendor.tax_number || '',
        tax_office: vendor.tax_office || '',
        is_active: vendor.is_active,
        notes: vendor.notes || '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        patch(route('vendors.update', vendor));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={{
                title: "Edit Vendor",
                module: "Management"
            }}
        >
            <Head title={`Edit Vendor: ${vendor.name}`} />

            <div className="container mx-auto py-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Edit Vendor Details</CardTitle>
                        <CardDescription>
                            Update vendor information and status
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-destructive">{errors.name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="code">Code</Label>
                                    <Input
                                        id="code"
                                        value={data.code}
                                        onChange={e => setData('code', e.target.value.toUpperCase())}
                                        placeholder="e.g. TURKCELL"
                                    />
                                    {errors.code && (
                                        <p className="text-sm text-destructive">{errors.code}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="mcc">MCC (Mobile Country Code)</Label>
                                    <Input
                                        id="mcc"
                                        value={data.mcc}
                                        onChange={e => setData('mcc', e.target.value)}
                                        placeholder="e.g. 286"
                                        maxLength={3}
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        3 digits code (e.g. 286 for Turkey)
                                    </p>
                                    {errors.mcc && (
                                        <p className="text-sm text-destructive">{errors.mcc}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="mnc">MNC (Mobile Network Code)</Label>
                                    <Input
                                        id="mnc"
                                        value={data.mnc}
                                        onChange={e => setData('mnc', e.target.value)}
                                        placeholder="e.g. 01"
                                        maxLength={2}
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        2 digits code (e.g. 01 for Turkcell)
                                    </p>
                                    {errors.mnc && (
                                        <p className="text-sm text-destructive">{errors.mnc}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-destructive">{errors.email}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input
                                        id="phone"
                                        value={data.phone}
                                        onChange={e => setData('phone', e.target.value)}
                                    />
                                    {errors.phone && (
                                        <p className="text-sm text-destructive">{errors.phone}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="tax_number">Tax Number</Label>
                                    <Input
                                        id="tax_number"
                                        value={data.tax_number}
                                        onChange={e => setData('tax_number', e.target.value)}
                                    />
                                    {errors.tax_number && (
                                        <p className="text-sm text-destructive">{errors.tax_number}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="tax_office">Tax Office</Label>
                                    <Input
                                        id="tax_office"
                                        value={data.tax_office}
                                        onChange={e => setData('tax_office', e.target.value)}
                                    />
                                    {errors.tax_office && (
                                        <p className="text-sm text-destructive">{errors.tax_office}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Textarea
                                    id="address"
                                    value={data.address}
                                    onChange={e => setData('address', e.target.value)}
                                />
                                {errors.address && (
                                    <p className="text-sm text-destructive">{errors.address}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="notes">Notes</Label>
                                <Textarea
                                    id="notes"
                                    value={data.notes}
                                    onChange={e => setData('notes', e.target.value)}
                                />
                                {errors.notes && (
                                    <p className="text-sm text-destructive">{errors.notes}</p>
                                )}
                            </div>

                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="is_active"
                                    checked={data.is_active}
                                    onCheckedChange={checked => setData('is_active', checked)}
                                />
                                <Label htmlFor="is_active">Active</Label>
                            </div>

                            <div className="flex justify-end">
                                <Button type="submit" disabled={processing}>
                                    Save Changes
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
} 