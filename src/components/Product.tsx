'use client';

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { ItemProps, StateProps } from "../../type";
import FormattedPrice from "./FormattedPrice";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToFavorite } from "@/redux/proSlice";
import toast, { Toaster } from 'react-hot-toast';




const Product = ({ item }: ItemProps) => {
    const dispatch = useDispatch();

    const  {favoriteData } = useSelector((state: StateProps) => state.pro);

    const isFavorite = (productID:any)=>{
        return favoriteData.some((favoriteItem)=>favoriteItem.id == productID);
    }

    return (
        <div className="relative bg-white group border-[1px] border-zinc-200 hover:border-zinc-800 duration-300 hover:shadow-xl overflow-hidden">
            <Link href={{ pathname: `/${item?.id}`, query: { id: item?.id } }}>
                <Image
                    src={item?.attributes?.image?.data?.attributes?.url}
                    alt="Product image"
                    width={500}
                    height={500}
                    className="w-full h-80 object-contain lg:object-cover group-hover:scale-105 duration-300" />
            </Link>
            <Heart
             onClick={()=>{dispatch(addToFavorite(item));
                if(isFavorite(item?.id)){
                    toast.error(`${item.attributes.title} removed from favorites!`);
                }else{
                    toast.success(`${item.attributes.title} added to fovorites!`);
                }
            }}
            fill={isFavorite(item.id) ? "red" : "black"}
             className="absolute top-4 right-4 text-zinc-500 w-5 h-5 hover:text-black cursor-pointer duration-200" />
            <div className="p-4 bg-zinc-100 group-hover:bg-zinc-50 group-hover:shadow-xl duration-300">
                <p className="group-hover:text-desingColor duration-300">{item?.attributes?.title}</p>
                <p className="font-semibold"><FormattedPrice amount={item?.attributes?.price} /></p>
                <div className="flex items-center justify-between text-sm mt-2">
                    <button onClick={() => {
                        dispatch(addToCart(item)), toast.success(`${item?.attributes?.title} is added to Cart!`);
                    }}
                        className="uppercase font-semibold hover:text-desingColor duration-300"
                    >
                        Add to cart
                    </button>
                    <Link href={{ pathname: `/${item?.id}`, query: { id: item?.id } }} className="uppercase font-semibold hover:text-desingColor duration-300">More Info</Link>
                </div>
            </div>
            <Toaster
                position="bottom-right"
                toastOptions={{
                    style: {
                        background: "#000",
                        color: "#fff"
                    }
                }} />
        </div>
    )
}

export default Product;