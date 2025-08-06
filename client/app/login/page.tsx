"use client"
import React, { useState } from 'react'
import Container from '@/components/common/Container'
import { tokenStore } from '@/app/store/token.store';
import { useRouter } from 'next/navigation';

const Login = () => {
    const router = useRouter()
    const token = tokenStore((state) => state.token);
    const setToken = tokenStore((state) => state.setToken);
    const [isAdmin , setIsAdmin] = useState(false)

    
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');
        const response = await fetch('/api/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
           
        })
        const data = await response.json();
       
        if (data.success) {
            setToken(data.token)
            localStorage.setItem('token', data.token)
            setIsAdmin(true)
            router.push('/admin')
        }
    }

    return (
        <div className='bg-gray-100 pb-10 flex h-screen items-center justify-center'>

            <Container className='flex flex-col h-screen items-center justify-center gap-4'>
                <h1 className='text-4xl font-black'>ADMIN PANEL</h1>
                <form action="" onSubmit={onSubmit} className='flex flex-col gap-4 p-4 max-w-[450px] w-[450px]'>
                    <input name="email" type="email" placeholder='Email' className='bg-white w-full py-2 px-4' />
                    <input name="password" type="password" placeholder='Password' className='bg-white  w-full py-2  px-4' />
                    <button type='submit'>Send </button>
                </form>
            </Container>
        </div>
    )
}

export default Login