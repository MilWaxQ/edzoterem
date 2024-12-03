import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(d: Date, showTime = false) {
  const date = new Date(d);
  const year = date.getFullYear();
  const month = date.getMonth()+1 < 10 ? `0${date.getMonth()+1}` : date.getMonth()+1;
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

  const hour = date.getHours();
  const minutes = date.getMinutes();

  return `${year}. ${month}. ${day}.${showTime ? " " + hour + ":" + minutes : ""}`;
}
