import EmptyState from './components/emptyState.component';

import getProperties, { IPropertiesParams } from './actions/getProperties';
import getCurrentUser from './actions/getCurrentUser';
import ClientOnly from './components/clientOnly.component';
import PropertyCard from './components/properties/propertyCard.component';
import Container from './components/container.component';

interface HomeProps {
  searchParams: IPropertiesParams;
}
const Home = async ({ searchParams }: HomeProps) => {
  const properties = await getProperties(searchParams);
  const currentUser = await getCurrentUser();

  if (properties.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <main className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {properties.map(property => {
            return (
              <PropertyCard
                currentUser={currentUser}
                key={property.id}
                data={property}
              />
            );
          })}
        </main>
      </Container>
    </ClientOnly>
  );
};

export default Home;
