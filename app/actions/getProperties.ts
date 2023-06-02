import prisma from '@/app/libs/prismadb';

export interface IPropertiesParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getProperties(params: IPropertiesParams) {
  try {
    const {
      userId,
      guestCount,
      roomCount,
      bathroomCount,
      startDate,
      endDate,
      locationValue,
      category,
    } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }
    if (category) {
      query.category = category;
    }

    if (guestCount) {
      query.guestCount = { gte: +guestCount };
    }
    if (roomCount) {
      query.roomCount = { gte: +roomCount };
    }
    if (bathroomCount) {
      query.bathroomCount = { gte: +bathroomCount };
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };
    }

    const properties = await prisma.property.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const SafeProperties = properties.map(property => ({
      ...property,
      createdAt: property.createdAt.toISOString(),
    }));
    return SafeProperties;
  } catch (error: any) {
    throw new Error(error);
  }
}
