import { Head, Link, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
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
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Mail, Phone, MapPin, Receipt, FileText, Network, Plus, Server, Settings, MessageSquare, CreditCard, Trash2, PencilLine, Coins } from 'lucide-react';

const currencies = [
    { code: 'TRY', name: 'Turkish Lira' },
    { code: 'USD', name: 'US Dollar' },
    { code: 'EUR', name: 'Euro' },
    { code: 'GBP', name: 'British Pound' },
    { code: 'ZAR', name: 'South African Rand' },
    { code: 'NGN', name: 'Nigerian Naira' },
    { code: 'KES', name: 'Kenyan Shilling' },
    { code: 'EGP', name: 'Egyptian Pound' },
    { code: 'GHS', name: 'Ghanaian Cedi' },
    { code: 'MAD', name: 'Moroccan Dirham' },
    { code: 'XOF', name: 'West African CFA Franc' },
    { code: 'XAF', name: 'Central African CFA Franc' },
    { code: 'UGX', name: 'Ugandan Shilling' },
    { code: 'TZS', name: 'Tanzanian Shilling' },
    { code: 'RWF', name: 'Rwandan Franc' },
];

export default function Show({ auth, vendor }) {
    const [addConnectionOpen, setAddConnectionOpen] = useState(false);
    const [editConnectionOpen, setEditConnectionOpen] = useState(null);
    const [deleteConnectionId, setDeleteConnectionId] = useState(null);
    const [editingRate, setEditingRate] = useState(null);
    const [showCreateRateDialog, setShowCreateRateDialog] = useState(false);
    const [showEditRateDialog, setShowEditRateDialog] = useState(false);
    const [deleteRateId, setDeleteRateId] = useState(null);

    const { data: connectionData, setData: setConnectionData, post: createConnection, processing: connectionProcessing, errors: connectionErrors, reset: resetConnection } = useForm({
        type: 'smpp',
        host: '',
        port: '',
        username: '',
        password: '',
        system_type: '',
        config: {
            source_ton: '5',
            source_npi: '0',
            dest_ton: '1',
            dest_npi: '1',
            endpoints: [],
        },
        notes: '',
    });

    const { data: editConnectionData, setData: setEditConnectionData, put: updateConnection, processing: editConnectionProcessing, errors: editConnectionErrors, reset: resetEditConnection } = useForm({
        type: 'smpp',
        host: '',
        port: '',
        username: '',
        password: '',
        system_type: '',
        config: {
            source_ton: '5',
            source_npi: '0',
            dest_ton: '1',
            dest_npi: '1',
            endpoints: [],
        },
        is_active: true,
        notes: '',
    });

    const { data: rateData, setData: setRateData, post: createRate, processing: processingRate, errors: rateErrors, reset: resetRate } = useForm({
        prefix: '',
        rate: '',
        currency: 'XAF',
        notes: '',
        balance: '',
    });

    const { data: editRateData, setData: setEditRateData, put: updateRate, processing: processingEditRate, errors: editRateErrors, reset: resetEditRate } = useForm({
        prefix: '',
        rate: '',
        currency: '',
        is_active: true,
        notes: '',
        balance: '',
    });

    const handleCreateConnection = (e) => {
        e.preventDefault();
        createConnection(route('vendors.connections.store', vendor), {
            onSuccess: () => {
                setAddConnectionOpen(false);
                resetConnection();
            },
        });
    };

    const handleEditConnection = (e) => {
        e.preventDefault();
        updateConnection(route('vendors.connections.update', [vendor, editConnectionOpen]), {
            onSuccess: () => {
                setEditConnectionOpen(null);
                resetEditConnection();
            },
        });
    };

    const startEditConnection = (connection) => {
        setEditConnectionData({
            type: connection.type,
            host: connection.host,
            port: connection.port,
            username: connection.username || '',
            system_type: connection.system_type || '',
            config: {
                source_ton: connection.config?.source_ton || '5',
                source_npi: connection.config?.source_npi || '0',
                dest_ton: connection.config?.dest_ton || '1',
                dest_npi: connection.config?.dest_npi || '1',
                ...connection.config,
            },
            is_active: connection.is_active,
            notes: connection.notes || '',
        });
        setEditConnectionOpen(connection.id);
    };

    const handleDeleteConnection = () => {
        if (deleteConnectionId) {
            router.delete(route('vendors.connections.destroy', [vendor, deleteConnectionId]));
            setDeleteConnectionId(null);
        }
    };

    const handleCreateRate = (e) => {
        e.preventDefault();
        createRate(route('vendors.rates.store', vendor), {
            onSuccess: () => {
                setShowCreateRateDialog(false);
                resetRate();
            },
        });
    };

    const handleEditRate = (e) => {
        e.preventDefault();
        updateRate(route('vendors.rates.update', [vendor, editingRate]), {
            onSuccess: () => {
                setShowEditRateDialog(false);
                setEditingRate(null);
                resetEditRate();
            },
        });
    };

    const startEditRate = (rate) => {
        setEditingRate(rate.id);
        setEditRateData({
            prefix: rate.prefix || '',
            rate: rate.rate,
            currency: rate.currency,
            is_active: rate.is_active,
            notes: rate.notes || '',
            balance: rate.balance,
        });
        setShowEditRateDialog(true);
    };

    const handleDeleteRate = () => {
        if (deleteRateId) {
            router.delete(route('vendors.rates.destroy', [vendor, deleteRateId]), {
                onSuccess: () => {
                    setDeleteRateId(null);
                },
            });
        }
    };

    const renderSmppConfig = (data, setData, errors, isEdit = false) => {
        const prefix = isEdit ? 'edit-' : '';
        return (
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor={`${prefix}system_type`}>System Type</Label>
                    <Input
                        id={`${prefix}system_type`}
                        value={data.system_type}
                        onChange={e => setData('system_type', e.target.value)}
                    />
                    {errors.system_type && (
                        <p className="text-sm text-destructive">{errors.system_type}</p>
                    )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor={`${prefix}source_ton`}>Source TON</Label>
                        <select
                            id={`${prefix}source_ton`}
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            value={data.config.source_ton}
                            onChange={e => setData('config', { ...data.config, source_ton: e.target.value })}
                        >
                            <option value="0">Unknown (0)</option>
                            <option value="1">International (1)</option>
                            <option value="2">National (2)</option>
                            <option value="3">Network Specific (3)</option>
                            <option value="4">Subscriber Number (4)</option>
                            <option value="5">Alphanumeric (5)</option>
                            <option value="6">Abbreviated (6)</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor={`${prefix}source_npi`}>Source NPI</Label>
                        <select
                            id={`${prefix}source_npi`}
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            value={data.config.source_npi}
                            onChange={e => setData('config', { ...data.config, source_npi: e.target.value })}
                        >
                            <option value="0">Unknown (0)</option>
                            <option value="1">ISDN/Telephone (1)</option>
                            <option value="3">Data (3)</option>
                            <option value="4">Telex (4)</option>
                            <option value="6">Land Mobile (6)</option>
                            <option value="8">National (8)</option>
                            <option value="9">Private (9)</option>
                            <option value="10">ERMES (10)</option>
                            <option value="14">Internet (14)</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor={`${prefix}dest_ton`}>Destination TON</Label>
                        <select
                            id={`${prefix}dest_ton`}
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            value={data.config.dest_ton}
                            onChange={e => setData('config', { ...data.config, dest_ton: e.target.value })}
                        >
                            <option value="0">Unknown (0)</option>
                            <option value="1">International (1)</option>
                            <option value="2">National (2)</option>
                            <option value="3">Network Specific (3)</option>
                            <option value="4">Subscriber Number (4)</option>
                            <option value="5">Alphanumeric (5)</option>
                            <option value="6">Abbreviated (6)</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor={`${prefix}dest_npi`}>Destination NPI</Label>
                        <select
                            id={`${prefix}dest_npi`}
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            value={data.config.dest_npi}
                            onChange={e => setData('config', { ...data.config, dest_npi: e.target.value })}
                        >
                            <option value="0">Unknown (0)</option>
                            <option value="1">ISDN/Telephone (1)</option>
                            <option value="3">Data (3)</option>
                            <option value="4">Telex (4)</option>
                            <option value="6">Land Mobile (6)</option>
                            <option value="8">National (8)</option>
                            <option value="9">Private (9)</option>
                            <option value="10">ERMES (10)</option>
                            <option value="14">Internet (14)</option>
                        </select>
                    </div>
                </div>
            </div>
        );
    };

    const renderHttpConfig = (data, setData, errors, isEdit = false) => {
        const prefix = isEdit ? 'edit-' : '';
        const addEndpoint = (tag = 'auth') => {
            const endpoints = data.config.endpoints || [];
            const templates = {
                auth: {
                    method: 'POST',
                    path: '/oauth/v3/token',
                    content_type: 'application/x-www-form-urlencoded',
                    tag: 'auth',
                    headers: {
                        'Authorization': '{{authorization_header}}',
                        'Accept': 'application/json'
                    },
                    template: {
                        'grant_type': 'client_credentials'
                    }
                },
                login: {
                    method: 'POST',
                    path: '/login',
                    content_type: 'application/json',
                    tag: 'login',
                    headers: {
                        'Accept': 'application/json'
                    },
                    template: {
                        'username': '{{username}}',
                        'password': '{{password}}'
                    }
                },
                sendsms: {
                    method: 'POST',
                    path: '/sendsms',
                    content_type: 'application/json',
                    tag: 'sendsms',
                    headers: {
                        'Authorization': 'Bearer {{access_token}}',
                        'Accept': 'application/json'
                    },
                    template: {
                        'to': '{{phone}}',
                        'message': '{{message}}',
                        'from': '{{sender}}'
                    }
                },
                sendsms_multi: {
                    method: 'POST',
                    path: '/sendsms/multi',
                    content_type: 'application/json',
                    tag: 'sendsms_multi',
                    headers: {
                        'Authorization': 'Bearer {{access_token}}',
                        'Accept': 'application/json'
                    },
                    template: {
                        'messages': [
                            {
                                'to': '{{phone}}',
                                'message': '{{message}}',
                                'from': '{{sender}}'
                            }
                        ]
                    }
                },
                dlrreports: {
                    method: 'GET',
                    path: '/reports/dlr',
                    content_type: 'application/json',
                    tag: 'dlrreports',
                    headers: {
                        'Authorization': 'Bearer {{access_token}}',
                        'Accept': 'application/json'
                    },
                    template: {
                        'message_id': '{{message_id}}',
                        'from_date': '{{from_date}}',
                        'to_date': '{{to_date}}'
                    }
                }
            };

            setData('config', {
                ...data.config,
                endpoints: [
                    ...endpoints,
                    templates[tag] || {
                        method: 'POST',
                        path: '',
                        content_type: 'application/json',
                        tag: 'custom',
                        headers: {},
                        template: {}
                    }
                ]
            });
        };

        const updateEndpoint = (index, field, value) => {
            const endpoints = [...(data.config.endpoints || [])];
            endpoints[index] = {
                ...endpoints[index],
                [field]: value
            };
            setData('config', { ...data.config, endpoints });
        };

        const removeEndpoint = (index) => {
            const endpoints = [...(data.config.endpoints || [])];
            endpoints.splice(index, 1);
            setData('config', { ...data.config, endpoints });
        };

        return (
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <Label>Endpoints</Label>
                    <div className="flex items-center gap-2">
                        <select
                            className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            onChange={e => addEndpoint(e.target.value)}
                            value=""
                        >
                            <option value="" disabled>Add Endpoint...</option>
                            <option value="auth">Authentication</option>
                            <option value="login">Login</option>
                            <option value="sendsms">Send SMS</option>
                            <option value="sendsms_multi">Send Multiple SMS</option>
                            <option value="dlrreports">DLR Reports</option>
                            <option value="custom">Custom Endpoint</option>
                        </select>
                    </div>
                </div>

                {(data.config.endpoints || []).map((endpoint, index) => (
                    <Card key={index}>
                        <CardHeader className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <CardTitle className="text-base">Endpoint {index + 1}</CardTitle>
                                    <Badge variant="outline">{endpoint.tag || 'custom'}</Badge>
                                </div>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeEndpoint(index)}
                                >
                                    Remove
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0 space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>HTTP Method</Label>
                                    <select
                                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                        value={endpoint.method}
                                        onChange={e => updateEndpoint(index, 'method', e.target.value)}
                                    >
                                        <option value="POST">POST</option>
                                        <option value="GET">GET</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Content Type</Label>
                                    <select
                                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                        value={endpoint.content_type}
                                        onChange={e => updateEndpoint(index, 'content_type', e.target.value)}
                                    >
                                        <option value="application/json">application/json</option>
                                        <option value="application/x-www-form-urlencoded">application/x-www-form-urlencoded</option>
                                        <option value="multipart/form-data">multipart/form-data</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Path</Label>
                                <Input
                                    value={endpoint.path}
                                    onChange={e => updateEndpoint(index, 'path', e.target.value)}
                                    placeholder="/api/endpoint"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Headers (JSON)</Label>
                                <Textarea
                                    value={JSON.stringify(endpoint.headers, null, 2)}
                                    onChange={e => {
                                        try {
                                            const headers = JSON.parse(e.target.value);
                                            updateEndpoint(index, 'headers', headers);
                                        } catch (error) {
                                            // Invalid JSON, just update the text
                                            updateEndpoint(index, 'headers', e.target.value);
                                        }
                                    }}
                                    placeholder='{\n  "Authorization": "Bearer {{access_token}}",\n  "Accept": "application/json"\n}'
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Request Template (JSON)</Label>
                                <Textarea
                                    value={JSON.stringify(endpoint.template, null, 2)}
                                    onChange={e => {
                                        try {
                                            const template = JSON.parse(e.target.value);
                                            updateEndpoint(index, 'template', template);
                                        } catch (error) {
                                            // Invalid JSON, just update the text
                                            updateEndpoint(index, 'template', e.target.value);
                                        }
                                    }}
                                    placeholder='{\n  "key": "value"\n}'
                                />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={{
                title: vendor.name,
                module: "Vendors"
            }}
        >
            <Head title={`Vendor: ${vendor.name}`} />

            <div className="container mx-auto py-6">
                {/* Statistics Cards */}
                <div className="grid gap-4 md:grid-cols-2 mb-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Messages
                            </CardTitle>
                            <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">45,231</div>
                            <p className="text-xs text-muted-foreground">
                                +20.1% from last month
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Cost
                            </CardTitle>
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">$2,350</div>
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
                                Vendor Information
                            </TabsTrigger>
                            <TabsTrigger value="connections" className="flex items-center gap-2">
                                <Server className="h-4 w-4" />
                                Connections
                            </TabsTrigger>
                            <TabsTrigger value="rates" className="flex items-center gap-2">
                                <Coins className="size-4" />
                                Rates
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="info">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <CardTitle>Vendor Information</CardTitle>
                                            <CardDescription>
                                                View and manage vendor details
                                            </CardDescription>
                                        </div>
                                        <Button variant="outline" asChild>
                                            <Link href={route('vendors.edit', vendor)}>
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
                                                <span className="text-sm text-muted-foreground">Code:</span>
                                                <code className="rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                                                    {vendor.code}
                                                </code>
                                            </div>
                                            {(vendor.mcc || vendor.mnc) && (
                                                <div className="flex items-center gap-2">
                                                    <Network className="h-4 w-4 text-muted-foreground" />
                                                    <span className="text-sm text-muted-foreground">Network:</span>
                                                    <div className="flex gap-2">
                                                        {vendor.mcc && (
                                                            <code className="rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                                                                MCC: {vendor.mcc}
                                                            </code>
                                                        )}
                                                        {vendor.mnc && (
                                                            <code className="rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                                                                MNC: {vendor.mnc}
                                                            </code>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                            {vendor.email && (
                                                <div className="flex items-center gap-2">
                                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                                    <span className="text-sm text-muted-foreground">Email:</span>
                                                    <span>{vendor.email}</span>
                                                </div>
                                            )}
                                            {vendor.phone && (
                                                <div className="flex items-center gap-2">
                                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                                    <span className="text-sm text-muted-foreground">Phone:</span>
                                                    <span>{vendor.phone}</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="space-y-4">
                                            {vendor.tax_number && (
                                                <div className="flex items-center gap-2">
                                                    <Receipt className="h-4 w-4 text-muted-foreground" />
                                                    <span className="text-sm text-muted-foreground">Tax Number:</span>
                                                    <span>{vendor.tax_number}</span>
                                                </div>
                                            )}
                                            {vendor.tax_office && (
                                                <div className="flex items-center gap-2">
                                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                                    <span className="text-sm text-muted-foreground">Tax Office:</span>
                                                    <span>{vendor.tax_office}</span>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-2">
                                                <Badge variant={vendor.is_active ? "success" : "secondary"}>
                                                    {vendor.is_active ? "Active" : "Inactive"}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>

                                    {vendor.address && (
                                        <div className="border-t pt-4">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-sm font-medium">Address</span>
                                            </div>
                                            <p className="mt-2 text-sm text-muted-foreground">{vendor.address}</p>
                                        </div>
                                    )}

                                    {vendor.notes && (
                                        <div className="border-t pt-4">
                                            <h4 className="text-sm font-medium mb-2">Notes</h4>
                                            <p className="text-sm text-muted-foreground">{vendor.notes}</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="connections">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <CardTitle>Connections</CardTitle>
                                            <CardDescription>
                                                Manage SMPP and HTTP connections
                                            </CardDescription>
                                        </div>
                                        <Button asChild>
                                            <Link href={route('vendors.connections.create', vendor)}>
                                                <Plus className="mr-2 h-4 w-4" />
                                                Add Connection
                                            </Link>
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Tabs defaultValue="smpp" className="space-y-4">
                                        <TabsList>
                                            <TabsTrigger value="smpp" className="flex items-center gap-2">
                                                <Server className="h-4 w-4" />
                                                SMPP Connections
                                            </TabsTrigger>
                                            <TabsTrigger value="http" className="flex items-center gap-2">
                                                <Network className="h-4 w-4" />
                                                HTTP Connections
                                            </TabsTrigger>
                                        </TabsList>

                                        <TabsContent value="smpp">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Host</TableHead>
                                                        <TableHead>Port</TableHead>
                                                        <TableHead>Username</TableHead>
                                                        <TableHead>System Type</TableHead>
                                                        <TableHead>TON/NPI</TableHead>
                                                        <TableHead>Status</TableHead>
                                                        <TableHead>Actions</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {vendor.connections?.filter(c => c.type === 'smpp').map((connection) => (
                                                        <TableRow key={connection.id}>
                                                            <TableCell>
                                                                <code className="rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                                                                    {connection.host}
                                                                </code>
                                                            </TableCell>
                                                            <TableCell>{connection.port}</TableCell>
                                                            <TableCell>{connection.username}</TableCell>
                                                            <TableCell>{connection.system_type}</TableCell>
                                                            <TableCell>
                                                                <div className="space-y-1 text-sm">
                                                                    <div>Src: {connection.config?.source_ton}/{connection.config?.source_npi}</div>
                                                                    <div>Dst: {connection.config?.dest_ton}/{connection.config?.dest_npi}</div>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Badge variant={connection.is_active ? "success" : "secondary"}>
                                                                    {connection.is_active ? "Active" : "Inactive"}
                                                                </Badge>
                                                            </TableCell>
                                                            <TableCell>
                                                                <div className="flex items-center gap-2">
                                                                    <Button
                                                                        variant="outline"
                                                                        size="sm"
                                                                        asChild
                                                                    >
                                                                        <Link href={route('vendors.connections.edit', [vendor, connection])}>
                                                                            Edit
                                                                        </Link>
                                                                    </Button>
                                                                    <Button
                                                                        variant="destructive"
                                                                        size="sm"
                                                                        onClick={() => setDeleteConnectionId(connection.id)}
                                                                    >
                                                                        <Trash2 className="h-4 w-4" />
                                                                    </Button>
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TabsContent>

                                        <TabsContent value="http">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Host</TableHead>
                                                        <TableHead>Endpoints</TableHead>
                                                        <TableHead>Status</TableHead>
                                                        <TableHead>Actions</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {vendor.connections?.filter(c => c.type === 'http').map((connection) => (
                                                        <TableRow key={connection.id}>
                                                            <TableCell>
                                                                <code className="rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                                                                    {connection.host}:{connection.port}
                                                                </code>
                                                            </TableCell>
                                                            <TableCell>
                                                                <div className="space-y-1">
                                                                    {connection.config?.endpoints?.map((endpoint, index) => (
                                                                        <div key={index} className="flex items-center gap-2">
                                                                            <Badge variant="outline">
                                                                                {endpoint.method}
                                                                            </Badge>
                                                                            <code className="text-sm">
                                                                                {endpoint.path}
                                                                            </code>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Badge variant={connection.is_active ? "success" : "secondary"}>
                                                                    {connection.is_active ? "Active" : "Inactive"}
                                                                </Badge>
                                                            </TableCell>
                                                            <TableCell>
                                                                <div className="flex items-center gap-2">
                                                                    <Button
                                                                        variant="outline"
                                                                        size="sm"
                                                                        asChild
                                                                    >
                                                                        <Link href={route('vendors.connections.edit', [vendor, connection])}>
                                                                            Edit
                                                                        </Link>
                                                                    </Button>
                                                                    <Button
                                                                        variant="destructive"
                                                                        size="sm"
                                                                        onClick={() => setDeleteConnectionId(connection.id)}
                                                                    >
                                                                        <Trash2 className="h-4 w-4" />
                                                                    </Button>
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TabsContent>
                                    </Tabs>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="rates">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <CardTitle>SMS Rates</CardTitle>
                                            <CardDescription>
                                                Manage vendor SMS pricing
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
                                            {vendor.rates?.map((rate) => (
                                                <TableRow key={rate.id}>
                                                    <TableCell>
                                                        <code className="rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                                                            {rate.prefix || '*'}
                                                        </code>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="font-mono">
                                                            {rate.rate}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <select
                                                            id="currency"
                                                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                                            value={rate.currency}
                                                            onChange={e => setRateData('currency', e.target.value)}
                                                        >
                                                            {currencies.map(currency => (
                                                                <option key={currency.code} value={currency.code}>
                                                                    {currency.code} - {currency.name}
                                                                </option>
                                                            ))}
                                                        </select>
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
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

            <Dialog open={!!deleteConnectionId} onOpenChange={(open) => !open && setDeleteConnectionId(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Connection</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this connection? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setDeleteConnectionId(null)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDeleteConnection}
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
                            Add a new SMS rate for this vendor.
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
                                type="number"
                                step="0.01"
                                min="0"
                                value={rateData.rate}
                                onChange={e => setRateData('rate', e.target.value)}
                                placeholder="18.50"
                            />
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
                                        {currency.code} - {currency.name}
                                    </option>
                                ))}
                            </select>
                            {rateErrors.currency && (
                                <p className="text-sm text-destructive">{rateErrors.currency}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="balance">Balance</Label>
                            <Input
                                id="balance"
                                type="number"
                                step="0.01"
                                min="0"
                                value={rateData.balance}
                                onChange={e => setRateData('balance', e.target.value)}
                                placeholder="1000.00"
                            />
                            {rateErrors.balance && (
                                <p className="text-sm text-destructive">{rateErrors.balance}</p>
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
                                type="number"
                                step="0.01"
                                min="0"
                                value={editRateData.rate}
                                onChange={e => setEditRateData('rate', e.target.value)}
                                placeholder="18.50"
                            />
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
                                        {currency.code} - {currency.name}
                                    </option>
                                ))}
                            </select>
                            {editRateErrors.currency && (
                                <p className="text-sm text-destructive">{editRateErrors.currency}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Switch
                                    id="edit-is_active"
                                    checked={editRateData.is_active}
                                    onCheckedChange={checked => setEditRateData('is_active', checked)}
                                />
                                <Label htmlFor="edit-is_active">Active</Label>
                            </div>
                            {editRateErrors.is_active && (
                                <p className="text-sm text-destructive">{editRateErrors.is_active}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="edit-balance">Balance</Label>
                            <Input
                                id="edit-balance"
                                type="number"
                                step="0.01"
                                min="0"
                                value={editRateData.balance}
                                onChange={e => setEditRateData('balance', e.target.value)}
                                placeholder="1000.00"
                            />
                            {editRateErrors.balance && (
                                <p className="text-sm text-destructive">{editRateErrors.balance}</p>
                            )}
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
        </AuthenticatedLayout>
    );
} 