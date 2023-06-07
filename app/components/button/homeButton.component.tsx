'use client';

import { AiOutlineHome } from 'react-icons/ai';
import { useRouter } from 'next/navigation';

const HomeButton = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push('/')}
      className="fixed sm:hidden right-5 bottom-5 bg-white hover:bg-slate-100 rounded-full p-2 cursor-pointer border-[1px] z-40"
    >
      <AiOutlineHome />
    </div>
  );
};

export default HomeButton;
