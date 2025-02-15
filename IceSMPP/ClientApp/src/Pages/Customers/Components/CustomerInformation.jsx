import { Link } from '@inertiajs/react';
import { Building2, Mail, Phone, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export default function CustomerInformation({ customer }) {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <CardTitle>Customer Information</CardTitle>
                        <CardDescription>
                            View and manage customer details
                        </CardDescription>
                    </div>
                    <Button variant="outline" asChild>
                        <Link href={route('customers.edit', customer)}>
                            Edit Details
                        </Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Company:</span>
                            <span>{customer.company_name || 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Email:</span>
                            <span>{customer.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Phone:</span>
                            <span>{customer.phone || 'N/A'}</span>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">SMS Credit:</span>
                            <span className="font-semibold">{customer.sms_credit}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant={customer.is_active ? "success" : "secondary"}>
                                {customer.is_active ? "Active" : "Inactive"}
                            </Badge>
                        </div>
                    </div>
                </div>
                {customer.notes && (
                    <div className="border-t pt-4">
                        <h4 className="text-sm font-medium mb-2">Notes</h4>
                        <p className="text-sm text-muted-foreground">{customer.notes}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
} 