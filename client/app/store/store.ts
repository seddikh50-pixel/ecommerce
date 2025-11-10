import { Product } from '@/lib/generated/prisma';
import { create } from 'zustand';
import { persist } from "zustand/middleware"
import { enqueueSnackbar } from 'notistack'


export interface CartItem extends Product {
  quantity: number;
}


interface GoogleUser {
  id: string;
  email: string;
  verified_email: boolean;
  name?: string | null;
  given_name?: string | null;
  family_name?: string | null;
  picture?: string | null;

}


interface CartState {
  items: CartItem[]
  addToCart: (product: Product, user: GoogleUser) => void
  increaseQuantity: (id: string) => void
  decreaseQuantity: (id: string) => void
  removeFromCart: (id: string) => void
  shopProducts: Product[]
  allShopProducts: Product[]
  setShopProducts: (shopProducts: Product[]) => void
  setAllShopProducts: (allShopProducts: Product[]) => void
  filterProductByCategoryId: (id: string) => void
  resetSelection: () => void
  // clearCart: () => void
}



export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      allShopProducts: [],
      setAllShopProducts: (allShopProducts) => set({ allShopProducts }),
      shopProducts: [],
      setShopProducts: (shopProducts) => set({ shopProducts })
      ,
      filterProductByCategoryId: (id: string) => {
        const shopProduct = get().allShopProducts
        const filterProduct = shopProduct.filter((product) => product.categoryId === id)
        set({ shopProducts: filterProduct })


      },
      resetSelection: () => {
        const products = get().allShopProducts
        set({ shopProducts: products })

      },
      addToCart: (product: Product, user: GoogleUser) => {
        const items = get().items

        const existingItem = items.find((item) => item.id === product.id)
        if (existingItem) {
          const updatedItems = items.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          )
          set({ items: updatedItems })
          enqueueSnackbar(`${product?.name} increased successfully`, { variant: 'success' })

        } else {
          const newItems = { ...product, quantity: 1 }
          set({ items: [...items, newItems] })
          enqueueSnackbar(`${product?.name} Added successfully`, { variant: 'success' })

        }

      },


      increaseQuantity: (id) => {
        const updatedItems = get().items.map((item) =>
          item.id === id ?
            { ...item, quantity: item.quantity + 1 } : item
        )

        set({ items: updatedItems })
        enqueueSnackbar("Quantity Increased successfully", { variant: 'success' })
      },



      decreaseQuantity: (id) => {
        const updatedItems = get().items.map((item) =>
          item.id === id ?
            { ...item, quantity: item.quantity - 1 } : item
        )
        const itemQuantity = updatedItems.find((item) => item.id === id)?.quantity
        if (itemQuantity !== undefined && itemQuantity <= 0) {
          get().removeFromCart(id) // ✅ مرر id هنا
          // enqueueSnackbar(`${product?.name} removed successfully`, { variant: 'success' })
        } else {
          set({ items: updatedItems }) // ✅ فقط إذا لم نحذف العنصر
          enqueueSnackbar("Quantity Decreased successfully", { variant: 'success' })
        }
      },

      // // ❌ حذف منتج نهائيًا
      removeFromCart: (id) => {
        console.log("seddik")
        const filtered = get().items.filter((item) => item.id !== id)
        set({ items: filtered })
        enqueueSnackbar("product deleted successfully", { variant: 'success' })


      },

      // // 🧹 تفريغ السلة بالكامل
      // clearCart: () => set({ items: [] }),

    }),
    {
      name: 'cart-storage', // ← اسم المفتاح داخل localStorage
    }
  )
)

// export const useCartStore = create<CartState>((set, get) => ({
//   items: [],
//   addToCart: (product: Product) => {

//     const items = get().items
//     const existingItem = items.find((item) => item.id === product.id)

//     if (existingItem) {
//       // إذا المنتج موجود بالفعل → زِد الكمية
//       const updatedItems = items.map((item) =>
//         item.id === product.id
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       )
//       set({ items: updatedItems })
//     } else {
//       // إذا المنتج جديد → أضِفه بكمية 1
//       const newItem: CartItem = { ...product, quantity: 1 }
//       set({ items: [...items, newItem] })
//       console.log(newItem)
//       console.log(items)
//     }
//   },

// ➖ تقليل الكمية
// decreaseQuantity: (id) => {
//   const updatedItems = get().items
//     .map((item) =>
//       item.id === id
//         ? { ...item, quantity: item.quantity - 1 }
//         : item
//     )
//     .filter((item) => item.quantity > 0) // حذف إذا أصبحت الكمية 0
//   set({ items: updatedItems })
// },

// // ❌ حذف منتج نهائيًا
// removeFromCart: (id) => {
//   const filtered = get().items.filter((item) => item.id !== id)
//   set({ items: filtered })
// },

// // 🧹 تفريغ السلة بالكامل
// clearCart: () => set({ items: [] }),

// }));

