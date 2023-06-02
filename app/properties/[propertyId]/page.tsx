import getCurrentUser from '@/app/actions/getCurrentUser';
import getPropertiesById from '@/app/actions/getPropertyById';
import ClientOnly from '@/app/components/clientOnly.component';
import EmptyState from '@/app/components/emptyState.component';
import PropertyClient from './propertyClient.component';
import getReservations from '@/app/actions/getReservations';

interface IParams {
  propertyId: string;
}

const PropertyPage = async ({ params }: { params: IParams }) => {
  const property = await getPropertiesById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!property) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <PropertyClient
        property={property}
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default PropertyPage;
