'use client';

import { IconType } from 'react-icons';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCallback } from 'react';
import queryString from 'query-string';

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

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = queryString.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    if (params?.get('category') === label) {
      delete updatedQuery.category;
    }

    const url = queryString.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      {
        skipNull: true,
      },
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center gap-2 hover:text-neutral-800 min-w-fit hover:border-b-neutral-400 border-b-2 transition cursor-pointer py-2  ${
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
