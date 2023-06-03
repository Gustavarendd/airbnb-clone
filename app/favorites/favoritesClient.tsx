'use client';

import Container from '../components/container.component';
import PropertyCard from '../components/properties/propertyCard.component';
import Title from '../components/title.component';
import { SafeProperty, SafeUser } from '../types';

interface FavoritesClientProps {
  properties: SafeProperty[];
  currentUser?: SafeUser | null;
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
  properties,
  currentUser,
}) => {
  return (
    <Container>
      <Title
        title="Favorites"
        subtitle="List of places you like!"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {properties.map(property => (
          <PropertyCard
            key={property.id}
            data={property}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesClient;
