import Container from '@/components/Container';
import ProfileInfo from '@/components/ProfileInfo';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';

const page = async () => {
    const session = await getServerSession();
    if(!session || !session.user){
        redirect("/");
    }
    console.log(session);

  return (
    <Container>
        <p className='text-xl font-semibold pb-10 underline underline-offset-4 decoration-[1px]'>profilepage</p>
        <ProfileInfo/>
    </Container>
  )
}

export default page;