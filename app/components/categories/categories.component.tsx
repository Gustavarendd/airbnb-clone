'use client';

import { BsSliders } from 'react-icons/bs';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { HiOutlineHomeModern, HiOutlineFire } from 'react-icons/hi2';
import { MdOutlineHouseboat } from 'react-icons/md';
import { FaSkiing } from 'react-icons/fa';
import {
  GiIsland,
  GiPalmTree,
  GiFamilyHouse,
  GiWindmill,
  GiSydneyOperaHouse,
} from 'react-icons/gi';
import {
  TbBeach,
  TbPool,
  TbSailboat,
  TbTent,
  TbCactus,
  TbCoffee,
} from 'react-icons/tb';

import { usePathname, useSearchParams } from 'next/navigation';

import CategoryCard from './categoryCard.component';

export const categories = [
  {
    label: 'Beach',
    icon: TbBeach,
    description: 'This property is close to the beach!',
  },
  {
    label: 'Mansions',
    icon: GiFamilyHouse,
    description: 'This property is a mansion!',
  },
  {
    label: 'Countryside',
    icon: GiWindmill,
    description: 'This property is in the countryside!',
  },
  {
    label: 'Houseboats',
    icon: MdOutlineHouseboat,
    description: 'This property is a houseboat!',
  },
  {
    label: 'Pools',
    icon: TbPool,
    description: 'This property has a pool!',
  },
  {
    label: 'Islands',
    icon: GiIsland,
    description: 'This property is on an island!',
  },
  {
    label: 'boats',
    icon: TbSailboat,
    description: 'This property is a boat!',
  },
  {
    label: 'Bed & breakfasts',
    icon: TbCoffee,
    description: 'This property is a bed and breakfast!',
  },
  {
    label: 'Iconic cities',
    icon: GiSydneyOperaHouse,
    description: 'This property is in a iconic city!',
  },
  {
    label: 'Camping',
    icon: TbTent,
    description: 'This property has camping!',
  },
  {
    label: 'Trending',
    icon: HiOutlineFire,
    description: 'This property is trending right now!',
  },
  {
    label: 'Tropics',
    icon: GiPalmTree,
    description: 'This property is in the tropics!',
  },
  {
    label: 'Desert',
    icon: TbCactus,
    description: 'This property is in the desert!',
  },
  {
    label: 'Tiny homes',
    icon: HiOutlineHomeModern,
    description: 'This property is a tiny home!',
  },
  {
    label: 'Ski-in/out',
    icon: FaSkiing,
    description: 'This property is close to the slopes!',
  },
];

const Categories = () => {
  const params = useSearchParams();
  const categoryParam = params?.get('category');
  const pathname = usePathname();

  const isMainPage = pathname === '/';

  if (!isMainPage) return null;

  let scroll = 0;

  const scrollLeft = () => {
    const container = document.getElementById('scroll-container');
    scroll = scroll + window.innerWidth / 2;
    if (scroll > container!.scrollWidth) scroll = container!.scrollWidth;
    container?.scroll({ left: scroll, behavior: 'smooth' });
  };

  const scrollRight = () => {
    const container = document.getElementById('scroll-container');
    if (scroll < 0) scroll = 0;
    scroll = scroll - window.innerWidth / 2;
    container?.scroll({ left: scroll, behavior: 'smooth' });
  };

  return (
    <div className="max-w-[100vw] grid md:grid-cols-[minmax(0,_9fr)_minmax(0,_100px)] grid-cols-[minmax(0,_9fr)_minmax(0,_50px)] gap-5 items-center justify-between px-10 border-b-[1px]">
      <div className="relative col-span-1 flex flex-row items-center">
        <div
          id="scroll-container"
          className=" flex flex-row gap-8 overflow-hidden no-scrollbar px-[67px]"
        >
          {categories.map(category => (
            <CategoryCard
              key={category.label}
              icon={category.icon}
              label={category.label}
              selected={categoryParam === category.label}
            />
          ))}
        </div>
        <div className="absolute flex items-center bg-gray-100 fade-left h-full w-[67px]">
          <div
            onClick={scrollRight}
            className="border-[1px] cursor-pointer bg-white rounded-full p-1"
          >
            <IoIosArrowBack />
          </div>
        </div>
        <div className="absolute right-0 flex items-center justify-end fade-right h-full w-[67px] ">
          <div
            onClick={scrollLeft}
            className="border-[1px] cursor-pointer bg-white rounded-full p-1 "
          >
            <IoIosArrowForward />
          </div>
        </div>
      </div>
      <div className="col-span-1 flex items-center gap-2 justify-self-end border-[1px] p-3 rounded-xl ml-3 font-semibold text-[10px] w-fit">
        <BsSliders size={10} />
        <div className="hidden md:flex">Filters</div>
      </div>
    </div>
  );
};

export default Categories;
