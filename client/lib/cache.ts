import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";


export const getAllProducts = unstable_cache(
  async () => {
    return prisma.product.findMany({
      include: { category: true, brand: true },
    });
  },
  ["all-products"],
  { tags: ["products"]  }
);

// ✅ الكاتيجوري
export const getAllCategories = unstable_cache(
  async () => {
    return prisma.category.findMany();
  },
  ["all-categories"],
  { tags: ["categories"]  }
);

// ✅ البراند
export const getAllBrands = unstable_cache(
  async () => {
    return prisma.brand.findMany();
  },
  ["all-brands"],
  { tags: ["brands"]  },
 
);


export const getAllBlogs = unstable_cache(
  async () => {
    return prisma.blog.findMany();
  },
  ["all-blogs"],
  { tags: ["blogs"] }
);






