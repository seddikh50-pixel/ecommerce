
"use client";
import { ChartBarIcon, HeartIcon, ShoppingBasket, X } from "lucide-react";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useCartStore } from "@/app/store/store";

const CartMenu = () => {
 
    const [isOpen, setIsOpen] = useState(false);
    const [cartCount, setCartCount] = useState(2);
    const { items } = useCartStore()

    const icons = [
        { id: 1, icon: <HeartIcon />, position: "-top-13", delay: 0.1, href: "/wishlist" },
        { id: 2, icon: <ChartBarIcon />, position: "-top-26", delay: 0.2, href: "/wishlist" },
        { id: 3, icon: <ShoppingBasket />, position: "-top-39", delay: 0.3, href: "/cart" },
    ];

    return (
        <div className="fixed bottom-5 right-5 z-50">
            <div className="relative bg-violet-600 text-white w-12 h-12 flex justify-center items-center rounded-full">
                {/* زر التحكم */}
                <button
                    className="flex justify-center items-center w-5 h-5"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <ShoppingBasket />}
                </button>

                {/* عدد السلة لما يكون مقفول */}
                {!isOpen && cartCount > 0 && (
                    <span className="absolute w-5 h-5 -right-1 -top-1 rounded-full text-xs font-bold flex justify-center items-center text-white bg-black">
                        {items.length}
                    </span>
                )}

                {/* الأيقونات اللي تطلع */}
                <AnimatePresence>
                    {isOpen &&
                        icons.map((icon) => (
                            <motion.div
                                key={icon.id}
                                className={`absolute ${icon.position} bg-black hover:bg-store w-12 h-12 flex justify-center items-center rounded-full`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ delay: icon.delay, duration: 0.3 }}
                            >
                                <Link href={icon.href}>  {icon.icon}</Link>
                            </motion.div>
                        ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default CartMenu