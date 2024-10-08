import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='h-screen flex justify-center items-center flex-col'>
      <Image src="404_error.svg" width={600} height={600} alt='404'></Image>
      <Link href="/">
      <Button>Return Home</Button></Link>
    </div>
  );
}