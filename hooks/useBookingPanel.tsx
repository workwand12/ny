'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface BookingPanelContextType {
  isOpen: boolean
  openPanel: () => void
  closePanel: () => void
}

const BookingPanelContext = createContext<BookingPanelContextType | undefined>(undefined)

export function BookingPanelProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <BookingPanelContext.Provider
      value={{
        isOpen,
        openPanel: () => setIsOpen(true),
        closePanel: () => setIsOpen(false),
      }}
    >
      {children}
    </BookingPanelContext.Provider>
  )
}

export function useBookingPanel() {
  const context = useContext(BookingPanelContext)
  if (!context) {
    throw new Error('useBookingPanel must be used within BookingPanelProvider')
  }
  return context
}

