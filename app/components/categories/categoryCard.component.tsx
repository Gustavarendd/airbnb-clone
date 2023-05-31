'use client';

import { IconType } from 'react-icons';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';

interface CategoryCardProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  let currentQuery = usePathname();

  const handleClick = useCallback(() => {
    const updatedQuery: any = {
      currentQuery,
      category: label,
    };

    if (params?.get('category') === label) {
      delete updatedQuery.category;
    }

    const url = `?category=${updatedQuery.category}`
      .toLowerCase()
      .replace('&', '');

    router.push(url);
  }, [router, currentQuery, label, params]);

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center gap-2 min-w-fit hover:text-neutral-800 hover:border-b-neutral-400 border-b-2 transition cursor-pointer py-2  ${
        selected ? 'border-b-neutral-800' : 'border-transparent'
      } 
    ${selected ? 'text-neutral-800' : 'text-neutral-400'}`}
    >
      <Icon size={24} />
      <span className="font-semibold text-[10px]">{label}</span>
    </div>
  );
};

export default CategoryCard;
