import { Felhasznalo } from '@prisma/client'
import NotificationData from '@/types/notificationdata'
import { create } from 'zustand'
import { persist, createJSONStorage, StateStorage } from "zustand/middleware"
import {AES, enc} from "crypto-js";

interface UserState {
  user: Felhasznalo | undefined
  notifications: NotificationData[]
  isHydrated: boolean
  setUser: (user: Felhasznalo | undefined) => void
  setHydrated: (h: boolean) => void
  addNotification: (notification: NotificationData) => void
  removeNotification: (notification: NotificationData) => void
  clearNotifications: () => void
}

const SecureStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return AES.decrypt(localStorage.getItem(name) ?? "", "edzovizsga2024!!").toString(enc.Utf8);
  },
  setItem: async (name: string, value: string): Promise<void> => {
    localStorage.setItem(name, AES.encrypt(value, "edzovizsga2024!!").toString());
  },
  removeItem: async (name: string): Promise<void> => {
    localStorage.removeItem(name)
  },
};

const useUser = create<UserState>()(
  persist(
    (set) => ({
      user: undefined,
      isHydrated: false,
      notifications: [
        {ID: 1, title: "Sikeres vásárlás!", description: "Megvásároltad ezt: ", item: "Napijegy", date: "07/31", success: true},
        {ID: 2, title: "Hiba!", description: "Valami hiba történt.", date: "07/31", success: false},
        /*{ID: 3, title: "Hiba!", description: "Valami hiba történt.", date: "07/31", success: false},
        {ID: 4, title: "Hiba!", description: "Valami hiba történt.", date: "07/31", success: false},
        {ID: 5, title: "Hiba!", description: "Valami hiba történt.", date: "07/31", success: false},
        {ID: 6, title: "Hiba!", description: "Valami hiba történt.", date: "07/31", success: false},
        {ID: 7, title: "Hiba!", description: "Valami hiba történt.", date: "07/31", success: false},
        {ID: 8, title: "Hiba!", description: "Valami hiba történt.", date: "07/31", success: false},
        {ID: 9, title: "Hiba!", description: "Valami hiba történt.", date: "07/31", success: false},
        {ID: 10, title: "Hiba!", description: "Valami hiba történt.", date: "07/31", success: false},
        {ID: 11, title: "Hiba!", description: "Valami hiba történt.", date: "07/31", success: false},
        {ID: 12, title: "Hiba!", description: "Valami hiba történt.", date: "07/31", success: false},
        {ID: 13, title: "Hiba!", description: "Valami hiba történt.", date: "07/31", success: false},
        {ID: 14, title: "Hiba!", description: "Valami hiba történt.", date: "07/31", success: false},*/
      ],
      setHydrated: (h) => set(state => ({isHydrated: h})),
      setUser: (u: Felhasznalo | undefined) => set((state) => ({user: u})),
      addNotification: (n: NotificationData) => set((state) => ({notifications: [...state.notifications, n]})),
      removeNotification: (n: NotificationData) => set((state) => ({notifications: state.notifications.filter((o) => o.ID != n.ID)})),
      clearNotifications: () => set((state) => ({notifications: []})),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => SecureStorage),
      partialize: (state) => ({ user: state.user, notifications: state.notifications }),
      onRehydrateStorage: () => (state) => {state?.setHydrated(true)}
    },
  ),
)

export default useUser;