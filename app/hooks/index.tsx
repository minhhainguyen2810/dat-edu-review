import { create } from 'zustand';

interface ModalState {
  opened: boolean;
  setOpened: (by: boolean) => void;
}

export const useModalStore = create<ModalState>()((set) => ({
  opened: false,
  setOpened: (opened) => set(() => ({ opened }))
}));
