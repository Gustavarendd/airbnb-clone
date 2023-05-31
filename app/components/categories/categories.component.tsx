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
    description: 'This property is in a castle!',
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

  return (
    <div className="flex items-center justify-between px-10 border-b-[1px]">
      <div className="relative flex flex-row items-center">
        <div className="w-[85vw] flex flex-row flex-nowrap gap-8 overflow-x-hidden no-scrollbar px-[67px]">
          {categories.map(category => (
            <CategoryCard
              key={category.label}
              icon={category.icon}
              label={category.label}
              selected={
                categoryParam === category.label.toLowerCase().replace('&', '')
              }
            />
          ))}
        </div>
        <div className="absolute flex items-center bg-gray-100 fade-left h-full w-[67px]">
          <div className="border-[1px] cursor-pointer bg-white rounded-full p-1">
            <IoIosArrowBack />
          </div>
        </div>
        <div className="absolute right-0 flex items-center justify-end fade-right h-full w-[67px] ">
          <div className="flex border-[1px] cursor-pointer bg-white rounded-full p-1 ">
            <IoIosArrowForward />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 border-[1px] p-3 rounded-xl ml-3 font-semibold text-[10px]">
        <BsSliders size={10} />
        <div>Filters</div>
      </div>
    </div>
  );
};

export default Categories;
