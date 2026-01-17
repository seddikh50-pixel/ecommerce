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
        <div className='flex justify-between items-center h-full '>
            <h1 className='  border-gray-400 text-xl font-bold'>SedTech Admin</h1>
            <Button className='rounded-sm bg-black ' onClick={handleLogout} >log out </Button>
        </div>
    )
}

export default Admin

