'use client';

import { IconType } from 'react-icons';

interface PropertyCategoryProps {
  icon: IconType;
  label: string;
  description: string;
}

const PropertyCategory: React.FC<PropertyCategoryProps> = ({
  icon: Icon,
  label,
  description,
}) => {
  return (
    <div>
      <div>
        <Icon size={40} />
      </div>
    </div>
  );
};

export default PropertyCategory;
