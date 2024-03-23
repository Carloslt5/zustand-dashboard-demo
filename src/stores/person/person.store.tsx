import { StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";
import { customSessionStorage } from "../../utils/session-storage";

type PersonState = {
  firstName: string;
  lastName: string;

  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
};

const storeAPI: StateCreator<PersonState> = (set) => ({
  firstName: "",
  lastName: "",

  setFirstName: (value: string) => set((_state) => ({ firstName: value })),
  setLastName: (value: string) => set((_state) => ({ lastName: value })),
});

export const usePersonStore = create(
  persist(storeAPI, {
    name: "person-storage",
    storage: customSessionStorage,
  })
);
