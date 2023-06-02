import { create } from 'zustand';

interface AirbnbYourHomeModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useAirbnbYourHomeModal = create<AirbnbYourHomeModalStore>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useAirbnbYourHomeModal;
