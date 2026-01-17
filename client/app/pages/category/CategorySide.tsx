import Link from 'next/link';
import React from 'react'


interface category {
  name: string;
  id: string;
  image: string;

}


interface Categories {
  categories: category[]
   category: string;
}


const CategorySide = ({ categories, category}: Categories ) => {

  return (
    <div className='w-64 border'>
      {categories?.map((cat) =>
        <Link  href={`/category/${cat.name.replace(/\s/g,'-')}`} key={cat.id} className={`border-t block px-2 py-2 text-sm font-bold whitespace-nowrap ${cat.name === category.replace("-", " ") && "bg-store text-white"}`}>
          <h1>{cat.name} </h1>
        </Link>
      )}
    </div>
  )
}

export default CategorySide
