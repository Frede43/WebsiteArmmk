import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' })
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'ARMMK – Association des Rescapés des Massacres de Makobola',
  description:
    'Association des Rescapés des Massacres de Makobola (ARMMK) – Mémoire, Réconciliation et Paix inter-ethnique à Fizi, Sud-Kivu, République Démocratique du Congo.',
  generator: 'v0.dev',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${playfair.variable} ${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
