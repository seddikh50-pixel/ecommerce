"use client"

import { SnackbarProvider } from 'notistack'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={3000}
      preventDuplicate >
      {children}
    </SnackbarProvider>
  )
}