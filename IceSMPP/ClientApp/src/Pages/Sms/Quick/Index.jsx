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
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/Components/ui/select.jsx";



export default function Index({ auth,src_address }) {
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={{
                title: "Quick Send Sms",
                module: "SMS",
            }}
        >
            <Head title="Quick Send Sms" />

            <div className="container mx-auto py-6">
         
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <CardTitle>Sms</CardTitle>
                                <CardDescription>
                                   Send Quick Sms Multiple Contacts
                                </CardDescription>
                            </div>
                          
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Theme" />
                            </SelectTrigger>
                            <SelectContent>
                                {src_address.map((item, index) => (   <SelectItem value={index}>{item}</SelectItem>))}
                             
                         
                            </SelectContent>
                        </Select>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
} 