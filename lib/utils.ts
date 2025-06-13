import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Simple helper to generate a unique identifier
export function uniqueKey(prefix: string = 'key') {
  const random = Math.random().toString(36).slice(2)
  return `${prefix}-${random}`
}
