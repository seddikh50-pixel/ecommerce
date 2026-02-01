
import type { Metadata } from "next";
import { Montserrat, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Poppins } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700", "900"], variable: "--font-poppins" });
import { Providers } from "@/components/snackProvider/ProviderSnack";



export const metadata: Metadata = {
  title: 'sedTech - Your One-Stop Online Shop for Everything!',
  description: 'An all-in-one online marketplace where you can find everything you need — from everyday essentials to the latest trends, all in one place.', 

  verification: {
    google: "uZYwyCG6sKV35mH_vDV4Oz6KetvWxenVB5g0_sm5yEQ",
  }
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  return (
    <html lang="ar" className={poppins.className}>
      <body className="antialiased" >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}