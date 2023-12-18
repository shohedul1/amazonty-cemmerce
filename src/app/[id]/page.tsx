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
    const product = products.data.find((product:ProductType)=> product.id === id);
    return product;
  };
  const item = singleProduct(id);
  

 
  return (
    <Container className="flex items-center flex-col md:flex-row px-4 xl:px-0">
    <div className="w-full md:w-1/2 overflow-hidden bg-zinc-500 flex items-center justify-center p-10">
      <Image src={item?.attributes?.image?.data?.attributes?.url} alt="product image" width={500} height={500} className="transform transition-transform hover:scale-110 duration-500" />
    </div>
    <div className="w-full md:w-1/2 flex flex-col gap-2 px-5">
      <h2 className="text-3xl font-semibold">{item?.attributes?.title}</h2>
      <p className="flex items-center gap-10">
        <FormattedPrice amount={item?.attributes?.price} className="text-lg font-semibold" />
        <FormattedPrice amount={item?.attributes?.previousPrice} className="text-zinc-500 line-through" />
      </p>
      <p>You saved{" "}
        <FormattedPrice
          amount={item?.attributes?.previousPrice - item?.attributes?.price}
          className="text-base font-semibold bg-desingColor underline underline-offset-2"
        />{" "}
        from this product..
      </p>
      
      {/* <button 
      
      className="bg-desingColor/80 text-zinc-700 px-6 py-2 font-medium rounded-md hover:bg-desingColor hover:text-black cursor-pointer duration-200 hover:shadow-lg w-40 my-2"
      >
        add to cart
      </button> */}

      {item?.attributes?.isNew && (
        <p className="text-desingColor font-semibold">New Arrival</p>
      )}
      <p>Brand: <span className="font-semibold">{item?.attributes?.brand}</span></p>
      <p>
        Category: <span className="font-semibold">{item?.attributes?.category}</span>
      </p>
      <p>{item?.attributes?.description}</p>
    </div>
  </Container>
  )
}

export default page