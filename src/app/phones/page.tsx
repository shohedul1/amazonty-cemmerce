import Container from '@/components/Container';
import Product from '@/components/Product';
import { getPhones } from '@/helpers';
import React from 'react';
import { ProductType } from '../../../type';

const page = async () => {
  const products = await getPhones();
  return (
    <Container>
      <div className='border-b-[1px] border-b-zinc-400 pb-4 flex items-center justify-between'>
        <h2>Phones</h2>
        <p>Get the Phone you want</p>
      </div>
      <p className='mt-4 text-zinc-500 font-semibold'>Showing all {products?.data?.attributes?.products?.data.length} results</p>
      {/* product grid cart */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">
        {products?.data?.attributes?.products?.data.map((item: ProductType) => (
          <Product key={item?.id} item={item} />
        ))}
      </div>

    </Container>
  )
}

export default page;