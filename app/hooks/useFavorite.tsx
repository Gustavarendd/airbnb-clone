import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';

import { SafeUser } from '../types';

import useLoginModal from './useLoginModal';

interface IUseFavorite {
  propertyId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ propertyId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasLiked = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(propertyId);
  }, [currentUser, propertyId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) return loginModal.onOpen();

      try {
        let request;

        if (hasLiked) {
          request = () => axios.delete(`/api/favorites/${propertyId}`);
        } else {
          request = () => axios.post(`/api/favorites/${propertyId}`);
        }

        await request();
        router.refresh();
        toast.success('Success!');
      } catch (error) {
        toast.error('Something went wrong!');
      }
    },
    [currentUser, hasLiked, propertyId, loginModal, router],
  );

  return {
    hasLiked,
    toggleFavorite,
  };
};

export default useFavorite;
