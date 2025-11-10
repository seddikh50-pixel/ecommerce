"use client";

import LinkHeader from "@/app/pages/LinkHeader";
import { useCartStore } from "@/app/store/store";
import AppLoader from "@/components/common/Loading";
import { Button } from "@/components/ui/button";
import SignIn from "@/components/users/SignIn";
import SignUp from "@/components/users/SignUp";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { usePathname } from 'next/navigation';

import { FcGoogle } from "react-icons/fc";

interface GoogleUser {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  createdAt: string
}
export default function AccountPage() {
  const pathName = usePathname()
  const router = useRouter()
  const { items } = useCartStore()
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [spinner, setSpinner] = useState(false);

  // 🔹 نحاول قراءة بيانات المستخدم من الكوكي (بعد تسجيل الدخول)
  useEffect(() => {
    const handeUserAndSend = async () => {
      const localItem = localStorage.getItem('cart-storage')
      let itemsData;
      if (localItem) {
        itemsData = JSON.parse(decodeURIComponent(localItem));
      }
      try {

        const res = await fetch("/api/user", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",

          },
          body: JSON.stringify({
            cart: itemsData
          })

        });
        const data = await res.json()
        if (data.success) {
          console.log(data.user)
          setUser(data.user)
        } else {
          setUser(null)
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
    try {
      setSpinner(true)

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

    } catch (error) {
      console.log(error)
      setSpinner(false)
    }
  };

  // 🔹 تسجيل الخروج (مسح الكوكي)
  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
      credentials: "include"
    });
    setUser(null);
  };

  return (
    <>
      <LinkHeader pathName={pathName} />
      {loading ? <AppLoader /> :
        <div className="flex flex-col  min-h-screen text-center">
          {user ? (
            <SignIn handleLogout={handleLogout} user={user} />
          ) : (
            <SignUp handleGoogleSignIn={handleGoogleSignIn} spinner={spinner} />
          )}
        </div>
      }

    </>
  );
}
