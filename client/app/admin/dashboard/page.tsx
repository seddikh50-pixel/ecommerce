"use client"
import { redirect } from 'next/navigation';
import { tokenStore } from '@/app/store/token.store';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react'
import Admin from '../page';



const Dashboard = () => {
  const token = tokenStore((state) => state.token);
  const setToken = tokenStore((state) => state.setToken);
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {

    const savedToken = localStorage.getItem('token')
    if (savedToken) {
      setToken(savedToken)
    }
    const fetchData = async () => {
      try {
        const response = await fetch('/api/admin/tokenCheck', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json()
        console.log(data)
        if (data.role === "admin") {
           setIsAdmin(true)
        }else{
          setIsAdmin(false)
        }
      } catch (error) {
        console.log(error)
      }

    };

    fetchData()
  }, [token]);






  const removeToken = () => {
    localStorage.setItem("token", '');
    setToken('');
  }


  return (
    <div>
      {/* {!token ? <div>login</div> : <div>dashboard</div>} */}
      {isAdmin ?
        <div>
          Dashboard
          <Button className='' onClick={removeToken}>LogOut</Button>
        </div> :
        <Admin />}
    </div>
  )
}

export default Dashboard