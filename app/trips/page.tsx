import EmptyState from '../components/emptyState.component';
import ClientOnly from '../components/clientOnly.component';
import TripsClient from './tripsClient.component';

import getCurrentUser from '../actions/getCurrentUser';
import getReservations from '../actions/getReservations';
import HomeButton from '../components/button/homeButton.component';

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthorized"
          subtitle="Please login"
        />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({
    userId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No trips found"
          subtitle="Looks like you haven't reserved any trips"
        />
        <HomeButton />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripsClient
        reservations={reservations}
        currentUser={currentUser}
      />
      <HomeButton />
    </ClientOnly>
  );
};

export default TripsPage;
