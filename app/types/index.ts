import { Property, Reservation, User } from '@prisma/client';

export type SafeProperty = Omit<Property, 'createdAt'> & {
  createdAt: string;
};
export type SafeReservation = Omit<
  Reservation,
  'createdAt' | 'startDate' | 'endDate' | 'property'
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  property: SafeProperty;
};

export type SafeUser = Omit<
  User,
  'createdAt' | 'updatedAt' | 'emailVerified'
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
