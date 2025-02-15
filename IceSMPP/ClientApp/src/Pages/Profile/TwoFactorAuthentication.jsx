import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, ShieldCheck, ShieldAlert } from "lucide-react";

export default function TwoFactorAuthentication({ user, className = '' }) {
    const [confirmingQrCode, setConfirmingQrCode] = useState(false);
    const [confirmingRecoveryCodes, setConfirmingRecoveryCodes] = useState(false);
    const { data, setData, processing, post, reset, errors } = useForm({
        code: '',
    });

    const enableTwoFactorAuthentication = () => {
        post(route('two-factor.enable'), {
            preserveScroll: true,
            onSuccess: () => {
                setConfirmingQrCode(true);
                reset();
            },
        });
    };

    const confirmTwoFactorAuthentication = (e) => {
        e.preventDefault();

        post(route('two-factor.confirm'), {
            preserveScroll: true,
            onSuccess: () => {
                setConfirmingQrCode(false);
                setConfirmingRecoveryCodes(true);
            },
        });
    };

    const regenerateRecoveryCodes = () => {
        post(route('two-factor.recovery-codes'), {
            preserveScroll: true,
        });
    };

    const disableTwoFactorAuthentication = () => {
        post(route('two-factor.disable'), {
            preserveScroll: true,
            onSuccess: () => {
                setConfirmingQrCode(false);
                setConfirmingRecoveryCodes(false);
            },
        });
    };

    return (
        <section className={className}>
            <CardHeader>
                <CardTitle>Two Factor Authentication</CardTitle>
                <CardDescription>
                    Add additional security to your account using two factor authentication.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
                {!user.two_factor_enabled && (
                    <>
                        <Alert>
                            <ShieldAlert className="size-4" />
                            <AlertDescription>
                                When two factor authentication is enabled, you will be prompted for a secure, random token during authentication. You may retrieve this token from your phone's Google Authenticator application.
                            </AlertDescription>
                        </Alert>

                        <Button
                            onClick={enableTwoFactorAuthentication}
                            disabled={processing}
                        >
                            Enable 2FA
                        </Button>
                    </>
                )}

                {user.two_factor_enabled && (
                    <>
                        <Alert>
                            <ShieldCheck className="size-4" />
                            <AlertDescription>
                                Two factor authentication is now enabled. Scan the following QR code using your phone's authenticator application.
                            </AlertDescription>
                        </Alert>

                        <div className="space-y-4">
                            {user.two_factor_qr_code && confirmingQrCode && (
                                <Dialog open={confirmingQrCode} onOpenChange={setConfirmingQrCode}>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Setup Two Factor Authentication</DialogTitle>
                                            <DialogDescription>
                                                To finish enabling two factor authentication, scan the following QR code using your phone's authenticator application or enter the setup key and provide the generated OTP code.
                                            </DialogDescription>
                                        </DialogHeader>

                                        <div className="mt-4">
                                            <div dangerouslySetInnerHTML={{ __html: user.two_factor_qr_code }}></div>
                                        </div>

                                        <form onSubmit={confirmTwoFactorAuthentication} className="space-y-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="code">Code</Label>
                                                <Input
                                                    id="code"
                                                    type="text"
                                                    inputMode="numeric"
                                                    value={data.code}
                                                    onChange={(e) => setData('code', e.target.value)}
                                                    autoComplete="one-time-code"
                                                />
                                                {errors.code && (
                                                    <p className="text-sm text-destructive">{errors.code}</p>
                                                )}
                                            </div>

                                            <DialogFooter>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() => setConfirmingQrCode(false)}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button type="submit" disabled={processing}>
                                                    Confirm
                                                </Button>
                                            </DialogFooter>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            )}

                            {user.two_factor_recovery_codes && confirmingRecoveryCodes && (
                                <Dialog open={confirmingRecoveryCodes} onOpenChange={setConfirmingRecoveryCodes}>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Two Factor Recovery Codes</DialogTitle>
                                            <DialogDescription>
                                                Store these recovery codes in a secure password manager. They can be used to recover access to your account if your two factor authentication device is lost.
                                            </DialogDescription>
                                        </DialogHeader>

                                        <div className="mt-4 space-y-2">
                                            {user.two_factor_recovery_codes.map((code) => (
                                                <div key={code} className="font-mono text-sm">
                                                    {code}
                                                </div>
                                            ))}
                                        </div>

                                        <DialogFooter>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => setConfirmingRecoveryCodes(false)}
                                            >
                                                Close
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            )}

                            <div className="space-y-2">
                                {user.two_factor_recovery_codes?.length > 0 && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={regenerateRecoveryCodes}
                                    >
                                        Regenerate Recovery Codes
                                    </Button>
                                )}

                                <Button
                                    type="button"
                                    variant="destructive"
                                    onClick={disableTwoFactorAuthentication}
                                >
                                    Disable 2FA
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </CardContent>
        </section>
    );
} 