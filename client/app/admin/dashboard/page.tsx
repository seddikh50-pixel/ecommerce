"use client"


import React, { useEffect, useState } from 'react'



const Dashboard = () => {
  const [token, setToken] = useState<string | null>("");



  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
    const fetchData = async () => {
      const response = await fetch('/api/admin/tokenCheck', {
        method: 'POST',
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);
    };

    fetchData();
  }, [token]);
  return (
    <div>dashboard</div>
  )
}

export default Dashboard