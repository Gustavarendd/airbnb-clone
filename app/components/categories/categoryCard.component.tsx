'use client';

import { IconType } from 'react-icons';

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
  return (
    <div className="flex flex-col items-center gap-2 min-w-fit">
      <Icon size={24} />
      <span className="font-semibold text-[10px]">{label}</span>
    </div>
  );
};

export default CategoryCard;
