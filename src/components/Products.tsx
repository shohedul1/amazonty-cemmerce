
import React from 'react'
import Container from './Container';
import { PcCase, ScanFace, Smartphone, Watch } from 'lucide-react';
import Link from 'next/link';
import Product from './Product';
import { getProducts } from '@/helpers';
import { ProductType } from '../../type';


const Products = async () => {
    const product = await getProducts();
   
    return (
        <div className='mt-10'>
            <Container>
                <div className='flex flex-col gap-2 items-center'>
                    <h2 className='text-3xl font-semibold'>Choose a category</h2>
                    <p className='text-lg text-center'>
                        Explore dozens of customized layout made my our brilliant designers.
                    </p>
                    <div className='text-zinc-500 flex items-center gap-2 md:gap-6 mt-5'>
                        <Link href={"/phones"} className='flex gap-2 hover:text-black cursor-pointer duration-200'>
                            <Smartphone />
                            <p>Phone</p>
                        </Link>
                        <div className='h-7 w-[1px] bg-desingColor inline-flex' />

                        <Link href={"/phones"} className='flex gap-2 hover:text-black cursor-pointer duration-200'>
                            <PcCase />
                            <p>Phone Case</p>
                        </Link>
                        <div className='h-7 w-[1px] bg-desingColor inline-flex' />

                        <Link href={"/watches"} className='flex gap-2 hover:text-black cursor-pointer duration-200'>
                            <Watch />
                            <p>Watches</p>
                        </Link>
                        <div className='h-7 w-[1px] bg-desingColor inline-flex' />

                        <Link href={"/accessories"} className='flex gap-2 hover:text-black cursor-pointer duration-200'>
                            <ScanFace />
                            <p>accessories</p>
                        </Link>
                        <div className='h-7 w-[1px] bg-desingColor inline-flex' />
                    </div>
                </div>

                {/* product grid cart */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">
                    {product?.data.map((item:ProductType)=>(
                        <Product key={item?.id} item={item}/>
                    ))}
                </div>        
                
            </Container>
        </div>
    )
}

export default Products