"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';


import { Button } from "@/components/ui/button";

const Admin = () => {
    const router = useRouter()

    const handleLogout = async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        router.push("/login");
    };




    return (
        <div className='flex justify-center items-center text-white h-full'>
            <p className='max-w-[800px] text-center text-6xl'>
                Welcome to the sed-store Admin Dashboard!
                You can manage products, orders, and users easily from here.</p>
        </div>
    )
}

export default Admin













