"use client"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"







import React, { useState } from 'react'
import Container from '@/components/common/Container'
import { tokenStore } from '@/app/store/token.store';
import { useRouter } from 'next/navigation';
import { SnackbarProvider, enqueueSnackbar } from 'notistack'

const Login = () => {
    const router = useRouter()
    const token = tokenStore((state) => state.token);
    const setToken = tokenStore((state) => state.setToken);
    const [isAdmin, setIsAdmin] = useState(false)


    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');
        console.log(email, password)

        const response = await fetch('/api/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),

        })
        const data = await response.json();
        if (data.success) {
            enqueueSnackbar(data.msg, { variant: 'success' })
            router.push('/admin')

        }
    }

    return (
        <div className='bg-gray-100 pb-10 flex h-screen items-center justify-center'>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Login to your dashboard</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your dashbord
                    </CardDescription>

                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                name="email"
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input id="password" type="password" name="password"  required />
                            </div>
                            <div className="grid gap-2">
                                <Button  type='submit' className="w-full bg-store">
                                    Login
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default Login