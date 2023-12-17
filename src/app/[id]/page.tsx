'use client';

import { getProducts } from "@/helpers";
import { ProductType } from "../../../type";
import Container from "@/components/Container";
import Image from "next/image";
import FormattedPrice from "@/components/FormattedPrice";

type Porps ={
  searchParams: {[key:string]: string | string[] | undefined };
};

const page = async ({searchParams}:Porps) => {
  const products = await getProducts();
  // console.log(products);

  const _idString = searchParams?.id;
  const id = Number(_idString);
  const singleProduct=(id:number)=>{
    const item = products.data.find((product:ProductType)=> product.id === id);
    return item;
  };
  const product = singleProduct(id);
  console.log(product);

 
  return (
    <Container className="flex items-center flex-col md:flex-row px-4 xl:px-0">
    <div className="w-full md:w-1/2 overflow-hidden bg-zinc-500 flex items-center justify-center p-10">
      <Image src={product?.attributes?.image?.data?.attributes?.url} alt="product image" width={500} height={500} className="transform transition-transform hover:scale-110 duration-500" />
    </div>
    <div className="w-full md:w-1/2 flex flex-col gap-2 px-5">
      <h2 className="text-3xl font-semibold">{product?.attributes?.title}</h2>
      <p className="flex items-center gap-10">
        <FormattedPrice amount={product?.attributes?.price} className="text-lg font-semibold" />
        <FormattedPrice amount={product?.attributes?.previousPrice} className="text-zinc-500 line-through" />
      </p>
      <p>You saved{" "}
        <FormattedPrice
          amount={product?.attributes?.previousPrice - product?.attributes?.price}
          className="text-base font-semibold bg-desingColor underline underline-offset-2"
        />{" "}
        from this product..
      </p>
      
      <button 
    
      className="bg-desingColor/80 text-zinc-700 px-6 py-2 font-medium rounded-md hover:bg-desingColor hover:text-black cursor-pointer duration-200 hover:shadow-lg w-40 my-2"
      >
        add to cart
      </button>

      {product?.attributes?.isNew && (
        <p className="text-desingColor font-semibold">New Arrival</p>
      )}
      <p>Brand: <span className="font-semibold">{product?.attributes?.brand}</span></p>
      <p>
        Category: <span className="font-semibold">{product?.attributes?.category}</span>
      </p>
      <p>{product?.attributes?.description}</p>
    </div>
  </Container>
  )
}

export default page