import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export default function Settings({ customer }) {
    const { data: settingsData, setData: setSettingsData, put: updateSettings, processing: settingsProcessing, errors: settingsErrors } = useForm({
        enable_originator_restriction: customer.settings.enable_originator_restriction,
        smpp_rate_limit: customer.settings.smpp_rate_limit,
    });

    const handleUpdateSettings = (e) => {
        e.preventDefault();
        updateSettings(route('customers.settings.update', customer), {
            preserveScroll: true,
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>
                    Manage customer settings and preferences
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleUpdateSettings} className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="enable_originator_restriction"
                            checked={settingsData.enable_originator_restriction}
                            onCheckedChange={checked => setSettingsData('enable_originator_restriction', checked)}
                        />
                        <Label htmlFor="enable_originator_restriction">Enable Originator Restriction</Label>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="smpp_rate_limit">SMPP Rate Limit</Label>
                        <Input
                            id="smpp_rate_limit"
                            type="number"
                            min="1"
                            value={settingsData.smpp_rate_limit}
                            onChange={e => setSettingsData('smpp_rate_limit', e.target.value)}
                        />
                        {settingsErrors.smpp_rate_limit && (
                            <p className="text-sm text-destructive">{settingsErrors.smpp_rate_limit}</p>
                        )}
                    </div>

                    <Button type="submit" disabled={settingsProcessing}>
                        Save Changes
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
} 