"use client";
import { useEffect, useState } from "react";
import type Stripe from "stripe";




const SuccessPage = () => {
  const [sessionData, setSessionData] = useState<Stripe.Checkout.Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");

    if (!sessionId) {
      setLoading(false);
      return;
    }

    const fetchSession = async () => {
      try {
        const res = await fetch(`/api/checkout-session?sessionId=${sessionId}`);
        const data = await res.json();
        setSessionData(data);
      } catch (err) {
        console.error("Failed to fetch session:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  if (loading) return <div className="h-screen w-full flex justify-center items-center text-violet-700"><p>Loading payment details...</p></div>;
  if (!sessionData) return <p>Failed to load payment details.</p>;

  const products = sessionData.metadata?.products ? JSON.parse(sessionData.metadata.products) : [];
  const total = sessionData.amount_total ? sessionData.amount_total / 100 : 0; // Stripe stores amount in cents
  const currency = sessionData.currency?.toUpperCase();
  const customerEmail = sessionData.customer_email;
  const fullName = sessionData.metadata?.useName;


  return (
    <div className="h-160 flex justify-center items-center">
      <div className="w-[700px] mx-auto p-6 text-center border rounded-lg shadow mt-10">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Succeeded</h1>
        <p className="text-lg mb-2">Thank you, <strong>{fullName}</strong></p>
        <p>Email: {customerEmail}</p>
        <p className="mt-4 font-semibold text-lg">
          Total Paid: {total.toFixed(2)} {currency}
        </p>
      </div>
    </div>
  );
};

export default SuccessPage;
