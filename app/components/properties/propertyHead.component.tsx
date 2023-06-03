'use client';

import useCountries from '@/app/hooks/useCountries';
import { SafeUser } from '@/app/types';
import Image from 'next/image';
import HeartButton from '../button/heartButton.component';
import Title from '../title.component';

interface PropertyHeadProps {
  title: string;
  imageSrc: string;
  locationValue: string;
  id: string;
  currentUser?: SafeUser | null;
}

const PropertyHead: React.FC<PropertyHeadProps> = ({
  title,
  imageSrc,
  locationValue,
  id,
  currentUser,
}) => {
  const { getByValue } = useCountries();

  const location = getByValue(locationValue);

  return (
    <>
      <Title
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div
        className="
            w-full
            h-[60vh]
            overflow-hidden
            rounded-xl
            relative"
      >
        <Image
          alt="Image"
          src={imageSrc}
          fill
          className="object-cover w-full"
        />
        <div className="absolute top-5 right-5">
          <HeartButton
            propertyId={id}
            currentUser={currentUser}
          />
        </div>
      </div>
    </>
  );
};

export default PropertyHead;
