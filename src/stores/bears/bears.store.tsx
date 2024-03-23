import { create } from "zustand";

type Bear = {
  id: number;
  name: string;
};

type BearStore = {
  blackBears: number;
  polarBears: number;
  pandaBears: number;

  bears: Bear[];

  computed: {
    totalBears: number;
  };

  increaseBlackBears: (by: number) => void;
  increasePolarkBears: (by: number) => void;
  increasePandakBears: (by: number) => void;

  addBear: () => void;
  clearBear: () => void;
};

export const useBrearsStore = create<BearStore>((set, get) => ({
  blackBears: 10,
  polarBears: 5,
  pandaBears: 1,

  bears: [{ id: 1, name: "Bear #1" }],

  computed: {
    get totalBears() {
      return get().blackBears + get().polarBears + get().pandaBears + get().bears.length;
    },
  },

  increaseBlackBears: (by: number) => set((state) => ({ blackBears: state.blackBears + by })),
  increasePolarkBears: (by: number) => set((state) => ({ polarBears: state.polarBears + by })),
  increasePandakBears: (by: number) => set((state) => ({ pandaBears: state.pandaBears + by })),

  addBear: () =>
    set((state) => ({
      bears: [
        ...state.bears,
        { id: state.bears.length + 1, name: `Bear #${state.bears.length + 1}` },
      ],
    })),
  clearBear: () => set(() => ({ bears: [] })),
}));
