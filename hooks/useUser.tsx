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
    {title: "Sikeres vásárlás!", description: "Megvásároltad ezt: ", item: "Napijegy", date: "07/31", success: true},
    {title: "Hiba!", description: "Valami hiba történt.", date: "07/31", success: false},
    {title: "Hiba!", description: "Valami hiba történt.", date: "07/31", success: false},
    {title: "Hiba!", description: "Valami hiba történt.", date: "07/31", success: false},
    {title: "Hiba!", description: "Valami hiba történt.", date: "07/31", success: false},
    {title: "Hiba!", description: "Valami hiba történt.", date: "07/31", success: false},
    {title: "Hiba!", description: "Valami hiba történt.", date: "07/31", success: false},
    {title: "Hiba!", description: "Valami hiba történt.", date: "07/31", success: false},
    {title: "Hiba!", description: "Valami hiba történt.", date: "07/31", success: false},
    {title: "Hiba!", description: "Valami hiba történt.", date: "07/31", success: false},
    {title: "Hiba!", description: "Valami hiba történt.", date: "07/31", success: false},
    {title: "Hiba!", description: "Valami hiba történt.", date: "07/31", success: false},
    {title: "Hiba!", description: "Valami hiba történt.", date: "07/31", success: false},
    {title: "Hiba!", description: "Valami hiba történt.", date: "07/31", success: false},
  ],
  addNotification: (n) => set((state) => ({notifications: [...state.notifications, n]})),
  removeNotification: (n) => set((state) => ({notifications: state.notifications.filter((o) => o.description != n.description)})),
  clearNotifications: () => set((state) => ({notifications: []})),
}))

export default useUser;