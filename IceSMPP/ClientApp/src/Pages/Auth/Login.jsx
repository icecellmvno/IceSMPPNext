import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Checkbox } from '@/Components/ui/checkbox';
import {Head, Link, useForm, usePage} from '@inertiajs/react';
import { useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Login({ status, canResetPassword }) {
    const [showTwoFactor, setShowTwoFactor] = useState(false);
    const { data, setData, post, processing, reset } = useForm({
        Identity: '',
        Password: '',
        Remember: false,
        Code: '',
    });
    const { errors } = usePage().props;
    console.log(errors);
    const submit = (e) => {
        e.preventDefault();

        post(showTwoFactor ? '/auth/twofactor' : '/auth/Login', {
            onSuccess: (response) => {
                if (response?.props?.requiresTwoFactor) {
                    setShowTwoFactor(true);
                    reset('Password');
                }
            },
            onFinish: () => {
                if (!showTwoFactor) {
                    reset('Password');
                }
            },
        });
    };

    return (
        <GuestLayout>
            <Head title={showTwoFactor ? "Two Factor Authentication" : "Log in"} />
            {errors.message && (
                <p className="text-sm text-red-600 dark:text-red-400">{errors.message}</p>
            )}
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            {showTwoFactor ? "Two Factor Authentication" : "Login to your account"}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {showTwoFactor 
                                ? "Please confirm access to your account by entering the authentication code provided by your authenticator application."
                                : "Enter your credentials below to login to your account"}
                        </p>
                    </div>

                    {status && (
                        <div className="text-sm font-medium text-green-600 dark:text-green-400">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit}>
                        <div className="grid gap-4">
                            {!showTwoFactor ? (
                                <>
                                    <div className="grid gap-2">
                                        <Label htmlFor="Identity">Username or Email</Label>
                                        <Input
                                            id="Identity"
                                            type="text"
                                            placeholder="m@example.com"
                                            name="Identity"
                                            value={data.Identity}
                                            autoComplete="username"
                                            onChange={(e) => setData('Identity', e.target.value)}
                                        />
                                        {errors.identity && (
                                            <p className="text-sm text-red-600 dark:text-red-400">{errors.identity}</p>
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="Password">Password</Label>
                                        <Input
                                            id="Password"
                                            type="Password"
                                            name="Password"
                                            value={data.Password}
                                            autoComplete="current-password"
                                            onChange={(e) => setData('Password', e.target.value)}
                                        />
                                        {errors.password && (
                                            <p className="text-sm text-red-600 dark:text-red-400">{errors.password}</p>
                                        )}
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="remember"
                                            checked={data.remember}
                                            onCheckedChange={(checked) => setData('Remember', checked)}
                                        />
                                        <label
                                            htmlFor="remember"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Remember me
                                        </label>
                                    </div>
                                </>
                            ) : (
                                <div className="grid gap-2">
                                    <Label htmlFor="code">Authentication Code</Label>
                                    <Input
                                        id="code"
                                        type="text"
                                        inputMode="numeric"
                                        name="code"
                                        value={data.code}
                                        autoComplete="one-time-code"
                                        onChange={(e) => setData('code', e.target.value)}
                                    />
                                    {errors.code && (
                                        <p className="text-sm text-red-600 dark:text-red-400">{errors.code}</p>
                                    )}
                                </div>
                            )}

                            <Button className="w-full" type="submit" disabled={processing}>
                                {showTwoFactor ? "Verify" : "Log in"}
                            </Button>
                        </div>
                    </form>

                    {!showTwoFactor && canResetPassword && (
                        <div className="text-center text-sm">
                            <Link
                                href={route('password.request')}
                                className="text-sm text-muted-foreground underline underline-offset-4 hover:text-primary"
                            >
                                Forgot your password?
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </GuestLayout>
    );
}
