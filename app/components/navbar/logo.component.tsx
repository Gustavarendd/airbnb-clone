'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Logo = () => {
  const router = useRouter();
  return (
    <Image
      onClick={() => router.push('/')}
      src="/images/logo.svg"
      alt="logo"
      width={100}
      height={100}
      className="cursor-pointer justify-self-start hidden sm:flex"
    />
  );
};

export default Logo;
