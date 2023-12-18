'use client';
import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react";
import { deleteFavorite, resetFavorite } from "@/redux/proSlice";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import { calculatePercentage } from "@/helpers";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ProductType, StateProps } from "../../type";
import FormattedPrice from "./FormattedPrice";

const Wishlist = () => {
    const { favoriteData } = useSelector((state: StateProps) => state.pro);
    const dispatch = useDispatch();
    const router = useRouter();

    const { data: session } = useSession();

    const handleReset = () => {
        const confirmReset = window.confirm("Are you sure you want to rest your Wishlist?");
        if (confirmReset) {
            dispatch(resetFavorite());
            toast.success("Wishlist Reset Successfully");
            router.push("/");
        }
    };

    return (
        <>
            {favoriteData.length > 0 ? (
                <div className="mt-5 flex flex-col">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-white uppercase bg-zinc-950">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Product Information
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Unit Price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Saving
                                    </th>
                                </tr>
                            </thead>
                            {favoriteData.map((item: ProductType) => (
                                <tbody key={item?.id}>
                                    <tr className="bg-white border-b-[1px] border-b-zinc-300">
                                        <th scope="row" className="px-6 py-4 flex items-center gap-3">
                                            <X
                                                onClick={() => {
                                                    dispatch(deleteFavorite(item?.id)),
                                                        toast.success(
                                                            `${item.attributes.title} is remoived from Wishlist!`
                                                        );
                                                }}
                                                className="w-4 h-4 hover:text-red-600 cursor-pointer duration-200" />
                                            <Image
                                                src={item?.attributes?.image?.data?.attributes?.url}
                                                alt="product image"
                                                width={500}
                                                height={500}
                                                className="w-24 object-contain" />
                                            <p className="text-base font-medium text-black ">
                                                {item?.attributes?.title}
                                            </p>
                                        </th>
                                        <td className="px-6 py-4">
                                            <FormattedPrice amount={item?.attributes?.price} />
                                        </td>

                                        <td className="px-6 py-4">
                                            <p className="bg-zinc-900 w-20 text-sm font-semibold text-center text-white py-1 rounded-md">
                                                {calculatePercentage(item?.attributes?.price, item?.attributes?.previousPrice)} {" "}%save
                                            </p>
                                        </td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>
                    </div>
                    <button
                        onClick={handleReset}
                        className="bg-zinc-950 text-zinc-200 w-36 py-3 mt-5 rounded-md uppercase text-xs font-semibold hover:bg-red-700 hover:text-white duration-200">
                        Reset Cart
                    </button>
                </div>
            ) : (
                <div className="py-10 flex flex-col gap-1 items-center justify-center ">
                    <p className="text-lg font-bold">Your Wishlist is Empty</p>
                    <Link href={"/"} className="text-sm uppercase font-semibold underline underline-offset-2 hover:text-desingColor duration-200">
                        Go back to Shopping
                    </Link>
                </div>
            )}

            <Toaster position="bottom-right"
                toastOptions={{
                    style: {
                        background: "#000",
                        color: "#fff",
                    }
                }} />

        </>
    )
}

export default Wishlist