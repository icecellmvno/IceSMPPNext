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

import { Badge } from '@/components/ui/badge';
import { Plus, Building2, Mail, Phone } from 'lucide-react';

export default function Index({ auth, vendors }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={{
                title: "Blacklist",
                module: "Phonebook",
            }}
        >
            <Head title="BlackList" />

            <div className="container mx-auto py-6">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <CardTitle>Blacklist</CardTitle>
                                <CardDescription>
                                    Manage your blacklist
                                </CardDescription>
                            </div>
                            <Button asChild>
                                <Link href="">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Blacklist
                                </Link>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                      
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
} 