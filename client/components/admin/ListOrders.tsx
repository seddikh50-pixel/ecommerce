"use client"
import { JsonValue } from '@/lib/generated/prisma/runtime/library';
import { useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import React from 'react'
import Swal from 'sweetalert2';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '../ui/button';
import Link from 'next/link';



interface Order {
  id: string;
  createdAt: Date;
  email: string;
  stripeSessionId: string;
  userId: string;
  amount: number;
  status: string;
  items: JsonValue;  // نتركها JSON
  fullName: string
}




interface category {
  id: string
  name: string
  image: string
}

interface Product {
  isStocked: boolean;
  name: string;
  id: string;
  category: category
  images: string[];
  price: string;
  description: string;
  categoryId: string;
  brandId: string;
  stripeProductId: string | null; // ✅ أضف | null هنا
  stripePriceId: string | null;
};


interface ListOrdersProps {
  orders: Order[];
  products: Product[];
}

interface OrderItem {
  stripePriceId: string;
  quantity?: number;
  // أي خصائص أخرى موجودة في الـ item
}



const ListOrders = ({ orders, products }: ListOrdersProps) => {


  const route = useRouter()


  const deleteOrder = async (id: string) => {

    Swal.fire({
      title: "هل أنت متأكد؟",
      text: "لا يمكن التراجع بعد الحذف!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "نعم، احذف",
      cancelButtonText: "إلغاء",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`/api/orders/${id}`,
            {
              method: "DELETE",
            }
          )
          const data = await response.json()
          if (data.success) {
            enqueueSnackbar(data.message, { variant: 'success' })
            route.push('/admin/orders ')
          }
        } catch (error) {
          enqueueSnackbar("somthing went wrong" + error, { variant: "error" })
        }
      }

    })

  }

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold '>A list of orders.</h1>

      <Table>
        <TableCaption>A list of orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Total price</TableHead>
            {/* <TableHead>Quantity</TableHead> */}
            <TableHead className="">Payment Status</TableHead>
            <TableHead className="">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order, index) => {



            return (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{order.fullName}</TableCell>
                <TableCell>{order.email}</TableCell>
                <TableCell>{order.amount}$</TableCell>
                <TableCell className="">{order.status}</TableCell>
                <TableCell className='flex gap-3'>
                  <Link href={`/admin/orders/${order.id}`} className='bg-green-600 rounded-sm flex justify-center items-center hover:bg-green-600/90 text-white  px-2 '>View detail</Link>
                  <Button className='bg-red-600 rounded-sm hover:bg-red-600/90 text-white px-4 ' onClick={() => deleteOrder(order.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
        {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
      </Table>
    </div>

  )
}

export default ListOrders
