import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
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
import { Plus, CreditCard } from 'lucide-react';

export default function Index({ auth, customers }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={{
                title: "Customers",
                module: "Management"
            }}
        >
            <Head title="Customers" />

            <div className="container mx-auto py-6">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <CardTitle>Customers</CardTitle>
                                <CardDescription>
                                    Manage your customers and their SMS credits
                                </CardDescription>
                            </div>
                            <Button asChild>
                                <Link href="/customers/create">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Customer
                                </Link>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Company</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Phone</TableHead>
                                    <TableHead>SMS Credit</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {customers.data.map((customer) => (
                                    <TableRow key={customer.id}>
                                        <TableCell className="font-medium">
                                            <Link
                                                href={route('customers.show', customer)}
                                                className="hover:underline"
                                            >
                                                {customer.name}
                                            </Link>
                                        </TableCell>
                                        <TableCell>{customer.company_name}</TableCell>
                                        <TableCell>{customer.email}</TableCell>
                                        <TableCell>{customer.phone}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                <CreditCard className="h-4 w-4" />
                                                {customer.sms_credit}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={customer.is_active ? "success" : "secondary"}>
                                                {customer.is_active ? "Active" : "Inactive"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    asChild
                                                >
                                                    <Link href={route('customers.edit', customer)}>
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