import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Building2, Server, MessageSquare, Settings as SettingsIcon, Coins } from 'lucide-react';
import CustomerInformation from './Components/CustomerInformation';
import OriginatorSettings from './Components/OriginatorSettings';
import CreditsAndBalance from './Components/CreditsAndBalance';
import SmppUsers from './Components/SmppUsers';
import Rates from './Components/Rates';
import Settings from './Components/Settings';

export default function Show({ auth, customer, creditLogs }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={{
                title: customer.name,
                module: "Customers"
            }}
        >
            <Head title={`Customer: ${customer.name}`} />

            <div className="container mx-auto py-6">
                {/* Statistics Cards */}
                <div className="grid gap-4 md:grid-cols-2 mb-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Revenue
                            </CardTitle>
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">$15,231.89</div>
                            <p className="text-xs text-muted-foreground">
                                +20.1% from last month
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total SMS Sent
                            </CardTitle>
                            <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+2350</div>
                            <p className="text-xs text-muted-foreground">
                                +180.1% from last month
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-6">
                    <Tabs defaultValue="info" className="space-y-4">
                        <TabsList>
                            <TabsTrigger value="info" className="flex items-center gap-2">
                                <Building2 className="h-4 w-4" />
                                Customer Information
                            </TabsTrigger>
                            <TabsTrigger value="originator" className="flex items-center gap-2">
                                <SettingsIcon className="h-4 w-4" />
                                Originator Settings
                            </TabsTrigger>
                            <TabsTrigger value="credits" className="flex items-center gap-2">
                                <Coins className="h-4 w-4" />
                                Credits & Balance
                            </TabsTrigger>
                            <TabsTrigger value="smpp" className="flex items-center gap-2">
                                <Server className="h-4 w-4" />
                                SMPP Users
                            </TabsTrigger>
                            <TabsTrigger value="rates" className="flex items-center gap-2">
                                <Coins className="h-4 w-4" />
                                Rates
                            </TabsTrigger>
                            <TabsTrigger value="settings" className="flex items-center gap-2">
                                <SettingsIcon className="h-4 w-4" />
                                Settings
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="info">
                            <CustomerInformation customer={customer} />
                        </TabsContent>

                        <TabsContent value="originator">
                            <OriginatorSettings customer={customer} />
                        </TabsContent>

                        <TabsContent value="credits">
                            <CreditsAndBalance customer={customer} creditLogs={creditLogs} />
                        </TabsContent>

                        <TabsContent value="smpp">
                            <SmppUsers customer={customer} />
                        </TabsContent>

                        <TabsContent value="rates">
                            <Rates customer={customer} />
                        </TabsContent>

                        <TabsContent value="settings">
                            <Settings customer={customer} />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}