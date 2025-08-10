"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';


import { Button } from "@/components/ui/button";

const Admin = () => {
    const router = useRouter()
  
    // const verifyToken = async () => {
       
    //     try {
    //         const response = await fetch('/api/admin/tokenCheck', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });
    //         const data = await response.json()
    //         if (data.role === "admin") {
    //             router.push('admin')
    //         } else {
    //             router.push("/login");
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // useEffect(() => {
    //     verifyToken()
    // }, []);


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













