import { create } from 'zustand';

interface SorryModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSorryModal = create<SorryModalStore>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSorryModal;
