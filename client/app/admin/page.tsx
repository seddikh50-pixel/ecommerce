"use client"

import React, { useState, useEffect } from 'react'
import Container from '@/components/common/Container'
import { tokenStore } from '@/app/store/token.store';
import { useRouter } from 'next/navigation';


import { Button } from "@/components/ui/button";

const Admin = () => {
    const router = useRouter()
    // const token = tokenStore((state) => state.token);
    // const setToken = tokenStore((state) => state.setToken);
    // const [isAdmin, setIsAdmin] = useState(false)



    // const verfyToken = async () => {
    //     console.log(token)
    //     try {
    //         const response = await fetch('/api/admin/tokenCheck', {
    //             method: 'POST',
    //             headers: {
    //                 'Authorization': `Bearer ${token}`,
    //                 'Content-Type': 'application/json',
    //             },
    //         });
    //         const data = await response.json()
    //         if (data.success === false) {
    //             return router.push('/login')
    //         }
    //         if (data.role === "admin") {
    //             setIsAdmin(true)
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // useEffect(() => {
    //     if(token){
    //         verfyToken()
    //     }
    // }, [token]);



    const verifyToken = async () => {
        console.log(document.cookie);
        try {
            const response = await fetch('/api/admin/tokenCheck', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json()
            if (data.role === "admin") {
                router.push('admin')
            } else {
                router.push("/login");
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        verifyToken()
    }, []);


    const handleLogout = async () => {
       const response =  await fetch("/api/admin/logout", { method: "POST" });
       console.log(response)
        router.push("/login");
    };




    return (
        <div className='bg-gray-100 pb-10 flex h-screen items-center justify-center gap-10'>
            DASHBOARD
            <Button onClick={handleLogout} >log out </Button>
        </div>
    )
}

export default Admin













