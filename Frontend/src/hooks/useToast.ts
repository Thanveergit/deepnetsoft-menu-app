

import { useState, useRef } from 'react'

interface UseToastReturn {
  toastMsg:     string
  toastVisible: boolean
  showToast:    (message: string) => void
}

export function useToast(): UseToastReturn {
  const [toastMsg,     setToastMsg]     = useState<string>('')
  const [toastVisible, setToastVisible] = useState<boolean>(false)

  // ReturnType<typeof setTimeout> works correctly in both
  // browser (returns number) and Node.js (returns NodeJS.Timeout)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function showToast(message: string): void {
    if (timerRef.current) clearTimeout(timerRef.current)
    setToastMsg(message)
    setToastVisible(true)
    timerRef.current = setTimeout(() => setToastVisible(false), 2500)
  }

  return { toastMsg, toastVisible, showToast }
}
