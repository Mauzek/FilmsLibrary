import React from 'react'

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
        <main>
            {children}
        </main>
    </>
  )
}
