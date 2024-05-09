import { StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { firebaseStorage } from "../../utils/firebase-storage";
// import { logger } from "../middlewares/logger.middleware";

type PersonState = {
  firstName: string;
  lastName: string;

  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
};

const storeAPI: StateCreator<PersonState, [["zustand/devtools", never]]> = (set) => ({
  firstName: "",
  lastName: "",

  setFirstName: (value: string) => set((_state) => ({ firstName: value }), false, "setFirstName"),
  setLastName: (value: string) => set((_state) => ({ lastName: value }), false, "setLastName"),
});

export const usePersonStore = create(
  // logger(
  devtools(
    persist(storeAPI, {
      name: "person-storage",
      // storage: customSessionStorage, // session storage
      storage: firebaseStorage, // firebase session storage
    })
  )
  // ) custom logger middleware
);
