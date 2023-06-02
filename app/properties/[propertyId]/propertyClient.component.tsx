'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns';

import { toast } from 'react-hot-toast';

import PropertyHead from '@/app/components/properties/propertyHead.component';
import PropertyInfo from '@/app/components/properties/PropertyInfo.component';
import { categories } from '@/app/components/categories/categories.component';

import useLoginModal from '@/app/hooks/useLoginModal';
import { SafeProperty, SafeReservation, SafeUser } from '@/app/types';
import PropertyReservation from '@/app/components/properties/PropertyReservation.component';

import { Range } from 'react-date-range';

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
};

interface PropertyClientProps {
  reservations?: SafeReservation[];
  property: SafeProperty & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const ListingClient: React.FC<PropertyClientProps> = ({
  property,
  reservations = [],
  currentUser,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const disableDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach(reservation => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });
    return dates;
  }, [reservations]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(property.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) return loginModal.onOpen();

    setIsLoading(true);

    axios
      .post('/api/reservations', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        propertyId: property?.id,
      })
      .then(() => {
        toast.success('Property Reserved!');
        setDateRange(initialDateRange);

        // redirect to /trips
        router.push('/trips');
      })
      .catch(() => {
        toast.error('Something went wrong!');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [totalPrice, dateRange, property?.id, router, currentUser, loginModal]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate,
      );

      if (dayCount && property.price) {
        setTotalPrice(dayCount * property.price);
      } else {
        setTotalPrice(property.price);
      }
    }
  }, [dateRange, property.price]);

  const category = useMemo(() => {
    return categories.find(item => item.label === property.category);
  }, [property.category]);

  return (
    <div>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <PropertyHead
            title={property.title}
            imageSrc={property.imageSrc}
            locationValue={property.locationValue}
            id={property.id}
            currentUser={currentUser}
          />
          <div
            className="
            grid
            grid-cols-1
            md:grid-cols-7
            md:gap-10
            mt-6"
          >
            <PropertyInfo
              user={property.user}
              category={category}
              description={property.description}
              roomCount={property.roomCount}
              guestCount={property.guestCount}
              bathroomCount={property.bathroomCount}
              locationValue={property.locationValue}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <PropertyReservation
                price={property.price}
                totalPrice={totalPrice}
                onChangeDate={value => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disableDates}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingClient;
