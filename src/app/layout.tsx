import type { Metadata } from 'next'
import '@mantine/core/styles.css'
import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import { Inter } from 'next/font/google'
import './globals.css'
import React from 'react'
import dotenv from 'dotenv'
dotenv.config()

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Easy Cards',
  description: 'An easier way to make powerful flashcards'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>): React.JSX.Element {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  )
}
