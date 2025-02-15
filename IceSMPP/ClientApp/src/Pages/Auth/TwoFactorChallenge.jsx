import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function TwoFactorChallenge() {
    const [recovery, setRecovery] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        code: '',
        recovery_code: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('two-factor.login'));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Head title="Two Factor Authentication" />

            <Card className="w-[400px]">
                <CardHeader>
                    <CardTitle>Two Factor Authentication</CardTitle>
                    <CardDescription>
                        {recovery
                            ? 'Please confirm access to your account by entering one of your emergency recovery codes.'
                            : 'Please confirm access to your account by entering the authentication code provided by your authenticator application.'}
                    </CardDescription>
                </CardHeader>

                <form onSubmit={submit}>
                    <CardContent className="space-y-4">
                        {!recovery ? (
                            <div className="space-y-2">
                                <Label htmlFor="code">Authentication Code</Label>
                                <Input
                                    id="code"
                                    type="text"
                                    inputMode="numeric"
                                    name="code"
                                    value={data.code}
                                    autoComplete="one-time-code"
                                    onChange={e => setData('code', e.target.value)}
                                    autoFocus
                                />
                                {errors.code && (
                                    <p className="text-sm text-red-600">{errors.code}</p>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <Label htmlFor="recovery_code">Recovery Code</Label>
                                <Input
                                    id="recovery_code"
                                    type="text"
                                    name="recovery_code"
                                    value={data.recovery_code}
                                    onChange={e => setData('recovery_code', e.target.value)}
                                    autoComplete="one-time-code"
                                    autoFocus
                                />
                                {errors.recovery_code && (
                                    <p className="text-sm text-red-600">{errors.recovery_code}</p>
                                )}
                            </div>
                        )}
                    </CardContent>

                    <CardFooter className="flex justify-between">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => {
                                setRecovery(!recovery);
                                setData('code', '');
                                setData('recovery_code', '');
                            }}
                        >
                            {recovery ? 'Use authentication code' : 'Use recovery code'}
                        </Button>

                        <Button type="submit" disabled={processing}>
                            Verify
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
} 