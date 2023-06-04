import { create } from 'zustand';

interface HostYourHomeModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useHostYourHomeModal = create<HostYourHomeModalStore>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useHostYourHomeModal;
