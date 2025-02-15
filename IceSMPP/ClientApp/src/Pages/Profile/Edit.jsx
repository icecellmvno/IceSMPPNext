import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import TwoFactorAuthentication from './TwoFactorAuthentication';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { User, KeyRound, Shield } from "lucide-react";

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={{
                title: "Profile Settings",
                module: "Account"
            }}
        >
            <Head title="Profile" />

            <div className="container mx-auto py-6">
                <Tabs defaultValue="profile" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="profile" className="flex items-center gap-2">
                            <User className="size-4" />
                            Profile
                        </TabsTrigger>
                        <TabsTrigger value="password" className="flex items-center gap-2">
                            <KeyRound className="size-4" />
                            Password
                        </TabsTrigger>
                        <TabsTrigger value="2fa" className="flex items-center gap-2">
                            <Shield className="size-4" />
                            2FA
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="profile">
                        <Card>
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            />
                        </Card>
                    </TabsContent>

                    <TabsContent value="password">
                        <Card>
                            <UpdatePasswordForm className="max-w-xl" />
                        </Card>
                    </TabsContent>

                    <TabsContent value="2fa">
                        <Card>
                            <TwoFactorAuthentication user={auth.user} className="max-w-xl" />
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </AuthenticatedLayout>
    );
}
