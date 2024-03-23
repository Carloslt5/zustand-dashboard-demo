import { StateStorage, createJSONStorage } from "zustand/middleware";

const sessionAPI: StateStorage = {
  getItem: function (name: string): string | Promise<string | null> | null {
    const data = sessionStorage.getItem(name);
    return data;
  },
  setItem: function (name: string, value: string): void {
    sessionStorage.setItem(name, value);
  },
  removeItem: function (name: string): Promise<void> | void {
    console.log("🚀 removeItem", name);
  },
};

export const customSessionStorage = createJSONStorage(() => sessionAPI);
