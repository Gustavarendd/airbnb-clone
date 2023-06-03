import ClientOnly from '../components/clientOnly.component';
import EmptyState from '../components/emptyState.component';

import getCurrentUser from '../actions/getCurrentUser';
import getFavoriteProperties from '../actions/getFavoriteProperties';
import FavoritesClient from './favoritesClient';

const FavoritesPage = async () => {
  const favoriteProperties = await getFavoriteProperties();
  const currentUser = await getCurrentUser();

  if (favoriteProperties.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No favorites found"
          subtitle="Looks like you have no favorites yet!"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoritesClient
        properties={favoriteProperties}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default FavoritesPage;
