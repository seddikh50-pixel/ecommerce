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
  filterProductByCategoryId: (id: string, id2: string) => void
  filterProductByBrandId: (id: string, id2: string) => void
  resetSelection: () => void
  loading: boolean
  // clearCart: () => void
  isMobileListOpen: boolean,
  setIsMobileListOpen: (value: boolean) => void,
  showSearch: boolean,
  setShowSearch: (value: boolean) => void
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
      loading: false,
      filterProductByCategoryId: (id: string, id2: string) => {
        console.log(id, id2)
        set({ loading: true })
        setTimeout(() => {
          const shopProduct = get().allShopProducts
          const filterProduct = shopProduct.filter((product) => id2 ?
            product.categoryId === id && product.brandId === id2
            : product.categoryId === id)
          console.log(filterProduct)
          set({ shopProducts: filterProduct, loading: false })
        }, 100)
      },
      filterProductByBrandId: (id: string, id2: string) => {
        set({ loading: true })
        setTimeout(() => {
          const shopProduct = get().allShopProducts

          const filterProduct = shopProduct.filter((product) => id2 ?
            product.brandId === id && product.categoryId === id2
            : product.brandId === id)
          console.log(filterProduct)
          set({ shopProducts: filterProduct, loading: false })
        }, 100)
      },
      isMobileListOpen: false,
      setIsMobileListOpen: (value) => set({ isMobileListOpen: value }),
      showSearch: false,
      setShowSearch: (value) => set({ showSearch: value }),
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
