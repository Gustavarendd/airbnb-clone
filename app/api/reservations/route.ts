import { NextResponse } from 'next/server';

import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const { propertyId, startDate, endDate, totalPrice } = body;

  if (!propertyId || !startDate || !endDate || !totalPrice) {
    return NextResponse.error();
  }

  const propertiesAndReservation = await prisma.property.update({
    where: {
      id: propertyId,
    },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          startDate,
          endDate,
          totalPrice,
        },
      },
    },
  });

  return NextResponse.json(propertiesAndReservation);
}
