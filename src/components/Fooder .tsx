import React from 'react';
import Container from './Container';
import Logo from './Logo';
import { navigation } from '@/constants/data';
import Link from 'next/link';

const Fooder = () => {
  return (
    <div className='bg-[#180735] mt-10 py-1 md:py-10 text-zinc-300 overflow-hidden '>
        <Container className='flex items-center justify-between relative '>
            <Logo className='text-white mr-[50px]' spanClassName="bg-white text-black"/>
            <ul className='gap-2 md:gap-5 items-center justify-center hidden md:flex'>
                {navigation.map((item)=>(
                    <Link href={item?.href} key={item?.id}>
                        <li className='hover:text-white duration-200'>{item?.title}</li>
                    </Link>
                ))}
            </ul>
            <p className='text-right '>Join me with @reactbd.com</p>
        </Container>
    </div>
  )
}

export default Fooder;