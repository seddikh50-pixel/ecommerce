"use client"
import { redirect } from 'next/navigation';
import { tokenStore } from '@/app/store/token.store';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react'
import Admin from '../page';
import { useRouter } from 'next/navigation';



const Dashboard = () => {

  const setToken = tokenStore((state) => state.setToken);




  const removeToken = () => {
    localStorage.setItem("token", '');
    setToken('');
  }


  return (
    <div>
        <h1>Dashboard</h1>
        <Button onClick={removeToken}>Sign Out</Button>
    </div>
  )
}

export default Dashboard