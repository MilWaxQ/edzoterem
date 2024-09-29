import { RefObject } from "react"

interface NotificationData {
  ID: number,
  title: string
  description: string
  date: string
  item?: string
  success: boolean
}
export default NotificationData