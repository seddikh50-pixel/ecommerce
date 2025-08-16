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
        <div className=''>
            DASHBOARD
            <Button onClick={handleLogout} >log out </Button>
        </div>
    )
}

export default Admin













