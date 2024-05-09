import { StateStorage, createJSONStorage } from "zustand/middleware";

const firebaseStorageApi =
  "https://zustand-demo-f7c44-default-rtdb.europe-west1.firebasedatabase.app/zustand";

const sessionAPI: StateStorage = {
  getItem: async function (name: string): Promise<string | null> {
    try {
      const data = await fetch(`${firebaseStorageApi}/${name}.json`).then((res) => res.json());
      return JSON.stringify(data);
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  },
  setItem: async function (name: string, value: string): Promise<void> {
    try {
      const data = await fetch(`${firebaseStorageApi}/${name}.json`, {
        method: "PUT",
        body: value,
      }).then((res) => res.json());
      console.log("data", data);
      return;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  },
  removeItem: function (name: string): Promise<void> | void {
    console.log("🚀 removeItem", name);
  },
};

export const firebaseStorage = createJSONStorage(() => sessionAPI);
