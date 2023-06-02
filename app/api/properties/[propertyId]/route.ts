import { NextResponse } from 'next/server';

import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

interface IParams {
  propertyId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams },
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { propertyId } = params;

  if (!propertyId || typeof propertyId !== 'string') {
    throw new Error('Invalid ID');
  }

  const property = await prisma.property.deleteMany({
    where: {
      id: propertyId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(property);
}
