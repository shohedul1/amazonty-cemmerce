'use client';
import { useDispatch, useSelector } from 'react-redux';
import { ProductType, StateProps } from '../../type';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import FormattedPrice from './FormattedPrice';
import Link from "next/link";
import { resetOrder } from '@/redux/proSlice';

const OrderDetails = () => {
    const dispatch = useDispatch();
    const { orderData } = useSelector((state: StateProps) => state?.pro);
    console.log(orderData);
    const [totalAmt, setTotalAmt] = useState(0);

    useEffect(() => {
        let amt = 0;
        orderData?.order?.map((item: ProductType) => {
            amt += item.attributes.price * item.attributes.quantity;
        });
        setTotalAmt(amt);
    }, [orderData.order]);
    return (
        <div>
            {
                orderData?.order?.length > 0 ? (
                    <div>
                        <div className='grid grid-cols-7 uppercase text-sm font-medium py-2 border-b-[1px] border-b-gray-300'>
                            <p className='col-span-4'>Items</p>
                            <p className='flex items-center justify-center'>Quantity</p>
                            <p className='flex items-center justify-center'>Unit Price</p>
                            <p className='flex items-center justify-center'>Amount</p>
                        </div>
                        <div className='py-2 flex flex-col justify-center gap-2'>
                            {
                                orderData?.order?.map((item: ProductType) => (
                                    <div key={item?.id} className='py-2 border-b-[1px] border-gray-300 grid grid-cols-7 items-center'>
                                        <div className='col-span-4 flex items-start gap-2 text-sm'>
                                            <Image src={item?.attributes?.image?.data?.attributes?.url} alt='product image'
                                                width={500} height={500}
                                                className='w-12 h-12 object-cover' />
                                            <div>
                                                <h3 className='text-base font-semibold mb-.5'>{item?.attributes?.title}</h3>
                                                <p>{item?.attributes?.description}</p>
                                            </div>
                                        </div>
                                        <p className='flex items-center justify-center'>{item?.attributes?.quantity}</p>
                                        <p className='flex items-center justify-center'>
                                            <FormattedPrice amount={item?.attributes?.price} />
                                        </p>
                                        <p className='flex items-center justify-center'>
                                            <FormattedPrice amount={item?.attributes?.price * item.attributes?.quantity} />
                                        </p>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='text-lg font-medium py-2 border-b-[1px] border-b-gray-300'>
                            <p>Payment Details</p>
                        </div>
                        <p className='py-2'>
                            Total Piad {" "}
                            <span className='text-xl font-semibold'>
                                <FormattedPrice amount={totalAmt} />
                            </span>
                        </p>
                        <button
                            onClick={() => dispatch(resetOrder())}
                            className='mt-5 border-[1px] border-gray-500 py-1 px-4 font-medium rounded-md hover:border-orange-600 cursor-pointer duration-200'>
                            Reset Order
                        </button>
                    </div>
                ) : (
                    <div className='py-10 bg-white text-black text-2xl text-center'>
                        <p>Nothing to show</p>
                        <Link href={"/"}>
                            <button className="bg-black mt-2 text-slate-100 w-44 h-12 rounded-full text-base font-semibold hover:bg-orange-600 duration-300">Continue Shopping</button>
                        </Link>
                    </div>
                )
            }
        </div>
    )
}

export default OrderDetails;