import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/components/ui/button';
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
import { Badge } from '@/components/ui/badge';
import { Plus, Building2, Mail, Phone } from 'lucide-react';

export default function Index({ auth, vendors }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={{
                title: "Vendors",
                module: "Management"
            }}
        >
            <Head title="Vendors" />

            <div className="container mx-auto py-6">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <CardTitle>Vendors</CardTitle>
                                <CardDescription>
                                    Manage your vendors and their information
                                </CardDescription>
                            </div>
                            <Button asChild>
                                <Link href={route('vendors.create')}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Vendor
                                </Link>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Code</TableHead>
                                    <TableHead>Contact</TableHead>
                                    <TableHead>Tax Info</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {vendors.data.map((vendor) => (
                                    <TableRow key={vendor.id}>
                                        <TableCell className="font-medium">
                                            <Link
                                                href={route('vendors.show', vendor)}
                                                className="hover:underline"
                                            >
                                                {vendor.name}
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <code className="rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                                                {vendor.code}
                                            </code>
                                        </TableCell>
                                        <TableCell>
                                            <div className="space-y-1">
                                                {vendor.email && (
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                                        {vendor.email}
                                                    </div>
                                                )}
                                                {vendor.phone && (
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                                        {vendor.phone}
                                                    </div>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="space-y-1">
                                                {vendor.tax_number && (
                                                    <div className="text-sm">
                                                        <span className="text-muted-foreground">Tax Number:</span> {vendor.tax_number}
                                                    </div>
                                                )}
                                                {vendor.tax_office && (
                                                    <div className="text-sm">
                                                        <span className="text-muted-foreground">Tax Office:</span> {vendor.tax_office}
                                                    </div>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={vendor.is_active ? "success" : "secondary"}>
                                                {vendor.is_active ? "Active" : "Inactive"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    asChild
                                                >
                                                    <Link href={route('vendors.edit', vendor)}>
                                                        Edit
                                                    </Link>
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
} 