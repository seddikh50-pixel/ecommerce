"use client";

import { useCartStore } from "@/app/store/store";
import AppLoader from "@/components/common/Loading";
import { Button } from "@/components/ui/button";
import SignUp from "@/components/users/SignUp";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";

import { FcGoogle } from "react-icons/fc";

interface GoogleUser {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
}
export default function AccountPage() {
  const router = useRouter()
  const { items } = useCartStore()
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔹 نحاول قراءة بيانات المستخدم من الكوكي (بعد تسجيل الدخول)
  useEffect(() => {
    const handeUserAndSend = async () => {
      // document.cookie = "user=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1IiwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwibmFtZSI6IkFsaSBBaG1lZCIsInBpY3R1cmUiOiJodHRwczovL2V4YW1wbGUuY29tL2F2YXRhci5qcGciLCJnaXZlbl9uYW1lIjoiQWxpIiwiZmFtaWx5X25hbWUiOiJBaG1lZCIsImlhdCI6MTc2MTc0NDM1MiwgImV4cCI6MTc2MTc1MTU1Mn0.R_aEzZUysIyQ_kGnj58lhWiatZ5n5ZZnhif7fbASXOs"
      const localItem = localStorage.getItem('cart-storage')
      let itemsData;
      if (localItem) {
        itemsData = JSON.parse(decodeURIComponent(localItem));
      }
      try {
        const cookie = document.cookie.split(';')
        const getToken = cookie.find((c) => c.trim().startsWith('user='))
        if (!getToken) {
          setUser(null)
        }
        else {
          const userToken = getToken.split('user=')[1]
          const res = await fetch("/api/user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${userToken}`,
            },
            body: JSON.stringify({
              cart: itemsData
            })

          });
          const data = await res.json()
          if (data.success) {
            setUser(data.user)
          } else {
            setUser(null)
          }



        }

      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    handeUserAndSend()

  }, []);


  // 🔹 تسجيل الدخول عبر Google
  const handleGoogleSignIn = () => {
    const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!, // من ملف .env
      redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!, // من ملف .env
      response_type: "code",
      scope: "openid email profile",
      access_type: "offline",
      prompt: "consent",
    });

    // تحويل المستخدم إلى صفحة Google
    window.location.href = `${googleAuthUrl}?${params.toString()}`;
  };

  // 🔹 تسجيل الخروج (مسح الكوكي)
  const handleLogout = () => {
    document.cookie =
      "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setUser(null);
  };

  return (
    <>
      {loading ? <AppLoader /> :
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          {user ? (
            <div>
              {/* <Image
                width={200}
                height={200}
                src={user?.picture}
                alt="User"
                className="w-24 h-24 rounded-full mx-auto mb-4"
              /> */}
              <h2 className="text-lg font-semibold mb-2">مرحبًا، {user.name}</h2>
              <p className="text-gray-600">{user.email}</p>

              <button
                onClick={handleLogout}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                تسجيل الخروج
              </button>
            </div>
          ) : (
            <SignUp handleGoogleSignIn={handleGoogleSignIn}  />
          )}
        </div>
      }

    </>
  );
}
