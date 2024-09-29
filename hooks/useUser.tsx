import NotificationData from '@/types/notificationdata'
import { create } from 'zustand'

interface UserState {
  notifications: NotificationData[]
  addNotification: (notification: NotificationData) => void
  removeNotification: (notification: NotificationData) => void
  clearNotifications: () => void
}

const useUser = create<UserState>((set) => ({
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
  addNotification: (n) => set((state) => ({notifications: [...state.notifications, n]})),
  removeNotification: (n) => set((state) => ({notifications: state.notifications.filter((o) => o.ID != n.ID)})),
  clearNotifications: () => set((state) => ({notifications: []})),
}))

export default useUser;