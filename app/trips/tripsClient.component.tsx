'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import Title from '../components/title.component';
import { SafeReservation, SafeUser } from '../types';
import { toast } from 'react-hot-toast';

import PropertyCard from '../components/properties/propertyCard.component';
import Container from '../components/container.component';

interface TripsClientProps {
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
}

const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success('Reservation canceled!');
          router.refresh();
        })
        .catch(error => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId('');
        });
    },
    [router],
  );

  return (
    <Container>
      <Title
        title="Trips"
        subtitle="Where you've been and where you are going"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map(reservation => (
          <PropertyCard
            key={reservation.id}
            data={reservation.property}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel reservation!"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;
