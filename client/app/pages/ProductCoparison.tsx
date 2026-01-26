"use client"
import { Loader, Search, X } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useCartStore } from '../store/store';
import { createClickOutsideHandler } from '@/components/documentEvent/doumentEvent';

interface products {
    id: string;
    name: string;
    description: string;
    price: string;
 
}




const ProductCoparison = ({ products }: { products: products[] }) => {
    const devRefOne = React.useRef<HTMLDivElement>(null);
    const devRefTwo = React.useRef<HTMLDivElement>(null);

    const router = useRouter();
    const [compareOne, setCompareOne] = useState<string>("");
    const [counter, setCounter] = useState<number>(0);
    const [compareTwo, setCompareTwo] = useState<string>("");
    const [isTrueOne, setIsTrueOne] = useState<boolean>(false);
    const [isTrueTwo, setIsTrueTwo] = useState<boolean>(false);
    const [filteredProductsOne, setFilteredProductsOne] = useState<products[]>([]);
    const [filteredProductsTwo, setFilteredProductsTwo] = useState<products[]>([]);
    const [loading, setLoading] = useState(false)


    const handleCompare = () => {


        const params = new URLSearchParams({
            prod1: compareOne,
            prod2: compareTwo,
        }).toString();
        console.log(params)
        router.push(`/compare?${params}`);
    }



    useEffect(() => {
        const functionOne = () => {
            if (counter > 0) {
                setIsTrueOne(false)
                setCounter(0)
                return
            }
            if (!compareOne) {
                setIsTrueOne(false);
                setFilteredProductsOne([]);
                return;
            }
            setLoading(true);
            const timmer = setTimeout(() => {
                const filteredOne = products.filter((product) =>
                    product.name.toLowerCase().startsWith(compareOne.toLowerCase())
                );
                setIsTrueOne(true);
                setFilteredProductsOne(filteredOne);
                setLoading(false);
            }, 500);

            return () => clearTimeout(timmer);
        }
        functionOne();
    }, [compareOne]);



    useEffect(() => {
        const functionTwo = () => {
            if (counter > 0) {
                setIsTrueOne(false)
                setCounter(0)
                return
            }

            if (!compareTwo) {
                setIsTrueTwo(false);
                setFilteredProductsTwo([]);
                return;
            }

            setLoading(true);
            const timmer = setTimeout(() => {
                const filteredTwo = products.filter((product) =>
                    product.name.toLowerCase().startsWith(compareTwo.toLowerCase())
                );
                setIsTrueTwo(true);
                setFilteredProductsTwo(filteredTwo);
                setLoading(false);
            }, 500);
            return () => clearTimeout(timmer);

        }
        functionTwo();
    }, [compareTwo]);


    useEffect(() => {
        const hanlder = createClickOutsideHandler(devRefOne, () => { setIsTrueOne(false) })
        document.addEventListener('click', hanlder)
        return () => document.removeEventListener("click", hanlder)
    }, []);

    useEffect(() => {
        const hanlder = createClickOutsideHandler(devRefTwo, () => { setIsTrueTwo(false) })
        document.addEventListener('click', hanlder)
        return () => document.removeEventListener("click", hanlder)
    }, []);


    return (
        <div className='h-1/2 w-full rounded-md bg-amber-200 flex  gap-1   items-center p-2 flex-col'>
            <div className='text-center relative flex flex-col p-1 text-stone-600 tracking-normal'>
                <h3 className='font-bold'>Compare Products</h3>
                <p className='text-sm line-clamp-1'>Choose Two Products To Compare</p>

            </div>
            <div className='w-full  '>
                <div className='w-full flex flex-col space-y-2'>

                    <div className='w-full relative'>
                        <input type="text" placeholder='Search and choose product' className=' placeholder:text-[12px] w-full text-sm bg-white px-3 py-[7px]' onChange={(e) => setCompareOne(e.target.value)} value={compareOne} />
                        {compareOne ? <X className='absolute right-2 top-1 text-gray-700 cursor-pointer' width={20} onClick={() => setCompareOne('')} /> : <Search className='absolute right-2 top-1 text-gray-700' width={20} />}
                        <div className={`absolute top-full left-0 bg-white w-full  z-10 ${isTrueOne ? 'block' : 'hidden'} `} ref={devRefOne}>
                            {loading ? (<div className="text-black text-sm flex justify-center items-center gap-2 py-4">
                                <Loader className='animate-spin text-store  ' />
                                Loading...
                            </div>
                            ) :
                                (filteredProductsOne.length > 0 ? filteredProductsOne.map((product) => (
                                    <div key={product.id} className='p-2 shadow-2xl  border-b border-gray-200 hover:bg-gray-100 cursor-pointer' onClick={() => {
                                        setCompareOne(product.name);
                                        setIsTrueOne(false);
                                        setCounter(counter + 1);
                                    }}>
                                        <p className='text-sm text-gray-700'>{product.name}</p>
                                    </div>
                                )) : <p className='p-2 text-sm text-gray-500'>No products found</p>)
                            }
                        </div>
                    </div>
                    <div className='w-full relative'>
                        <input type="text" placeholder='Search and choose product' className='placeholder:text-[12px]  w-full text-sm bg-white px-3 focus:outline-gray-200 py-[7px]' onChange={(e) => setCompareTwo(e.target.value)} value={compareTwo} />
                        {compareTwo ? <X className='absolute right-2 top-1 text-gray-700 cursor-pointer' width={20} onClick={() => setCompareTwo('')} /> : <Search className='absolute right-2 top-1 text-gray-700' width={20} />}
                        <div className={`absolute top-full left-0 bg-white w-full  z-10 ${isTrueTwo ? 'block' : 'hidden'} `} ref={devRefTwo}>
                            {loading ? (<div className="text-black text-sm flex justify-center items-center gap-2 py-4">
                                <Loader className='animate-spin text-store  ' />
                                Loading...
                            </div>
                            ) :
                                (filteredProductsTwo.length > 0 ? filteredProductsTwo.map((product) => (
                                    <div key={product.id} className='p-2 shadow-2xl  border-b border-gray-200 hover:bg-gray-100 cursor-pointer' onClick={() => {
                                        setCompareTwo(product.name);
                                        setIsTrueTwo(false);
                                        setCounter(counter + 1);
                                    }}>
                                        <p className='text-sm text-gray-700'>{product.name}</p>
                                    </div>
                                )) : <p className='p-2 text-sm text-gray-500'>No products found</p>)
                            }
                        </div>
                    </div>
                    <button className='w-full border border-gray-400 py-1 bg-gray-100 text-gray-400 font-bold' onClick={handleCompare}>View Comparison</button>
                </div>
            </div>
        </div>
    )
}

export default ProductCoparison