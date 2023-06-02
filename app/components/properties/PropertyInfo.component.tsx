'use client';

import useCountries from '@/app/hooks/useCountries';
import { SafeUser } from '@/app/types';
import { IconType } from 'react-icons';
import Image from 'next/image';

import PropertyCategory from './propertyCategory.component';
import { IoPersonCircle } from 'react-icons/io5';
import LocationMap from '../map/map.component';

interface PropertyInfoProps {
  user: SafeUser;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
}
const PropertyInfo: React.FC<PropertyInfoProps> = ({
  user,
  category,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  locationValue,
}) => {
  const { getByValue } = useCountries();
  const coords = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div>Hosted by {user?.name}</div>
          <div>
            {user?.image ? (
              <Image
                src={user.image}
                alt="Profile picture"
                height={26}
                width={26}
                className="rounded-full"
              />
            ) : (
              <IoPersonCircle size={26} />
            )}
          </div>
        </div>
        <div className="flex fle-row items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <PropertyCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      <LocationMap location={coords || [51, 10]} />
    </div>
  );
};

export default PropertyInfo;
