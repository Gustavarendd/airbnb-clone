'use client';

import Image from 'next/image';

const Logo = () => {
  return (
    <Image
      src="/images/logo.png"
      alt="logo"
      width={100}
      height={100}
    />
  );
};

export default Logo;
