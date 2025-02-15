import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export default function Create({ auth, vendor }) {
    const { data, setData, post, processing, errors } = useForm({
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

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('vendors.connections.store', vendor));
    };

    const renderSmppConfig = () => {
        return (
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="system_type">System Type</Label>
                    <Input
                        id="system_type"
                        value={data.system_type}
                        onChange={e => setData('system_type', e.target.value)}
                    />
                    {errors.system_type && (
                        <p className="text-sm text-destructive">{errors.system_type}</p>
                    )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="source_ton">Source TON</Label>
                        <select
                            id="source_ton"
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
                        <Label htmlFor="source_npi">Source NPI</Label>
                        <select
                            id="source_npi"
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
                        <Label htmlFor="dest_ton">Destination TON</Label>
                        <select
                            id="dest_ton"
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
                        <Label htmlFor="dest_npi">Destination NPI</Label>
                        <select
                            id="dest_npi"
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

    const renderHttpConfig = () => {
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
                title: `Add Connection - ${vendor.name}`,
                module: "Vendors",
                breadcrumbs: [
                    { label: "Vendors", href: route('vendors.index') },
                    { label: vendor.name, href: route('vendors.show', vendor) },
                    { label: "Add Connection" }
                ]
            }}
        >
            <Head title={`Add Connection - ${vendor.name}`} />

            <div className="container mx-auto py-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Add Connection</CardTitle>
                        <CardDescription>
                            Create a new connection for {vendor.name}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="type">Type</Label>
                                <select
                                    id="type"
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                    value={data.type}
                                    onChange={e => setData('type', e.target.value)}
                                >
                                    <option value="smpp">SMPP</option>
                                    <option value="http">HTTP</option>
                                </select>
                                {errors.type && (
                                    <p className="text-sm text-destructive">{errors.type}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="host">Host</Label>
                                <Input
                                    id="host"
                                    value={data.host}
                                    onChange={e => setData('host', e.target.value)}
                                    placeholder={data.type === 'smpp' ? "e.g. smpp.example.com" : "e.g. api.example.com"}
                                />
                                {errors.host && (
                                    <p className="text-sm text-destructive">{errors.host}</p>
                                )}
                            </div>

                            {data.type === 'smpp' && (
                                <>
                                    <div className="space-y-2">
                                        <Label htmlFor="port">Port</Label>
                                        <Input
                                            id="port"
                                            type="number"
                                            value={data.port}
                                            onChange={e => setData('port', e.target.value)}
                                            placeholder="e.g. 2775"
                                        />
                                        {errors.port && (
                                            <p className="text-sm text-destructive">{errors.port}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="username">Username</Label>
                                        <Input
                                            id="username"
                                            value={data.username}
                                            onChange={e => setData('username', e.target.value)}
                                        />
                                        {errors.username && (
                                            <p className="text-sm text-destructive">{errors.username}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            value={data.password}
                                            onChange={e => setData('password', e.target.value)}
                                        />
                                        {errors.password && (
                                            <p className="text-sm text-destructive">{errors.password}</p>
                                        )}
                                    </div>
                                </>
                            )}

                            {data.type === 'smpp' && renderSmppConfig()}

                            {data.type === 'http' && renderHttpConfig()}

                            <div className="space-y-2">
                                <Label htmlFor="notes">Notes</Label>
                                <Textarea
                                    id="notes"
                                    value={data.notes}
                                    onChange={e => setData('notes', e.target.value)}
                                />
                            </div>

                            <div className="flex justify-end">
                                <Button type="submit" disabled={processing}>
                                    Create Connection
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
} 