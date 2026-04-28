import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import '../globals.css'
import Navbar from '@/components/navbar'
import { getDictionary } from '@/lib/get-dictionary'

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' })
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'ARMMK – Association des Rescapés des Massacres de Makobola',
  description:
    'Association des Rescapés des Massacres de Makobola (ARMMK) – Mémoire, Réconciliation et Paix inter-ethnique à Fizi, Sud-Kivu, République Démocratique du Congo.',
  generator: 'v0.dev',
}

export async function generateStaticParams() {
  return [{ lang: 'fr' }, { lang: 'en' }, { lang: 'es' }]
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang as 'fr' | 'en' | 'es')

  return (
    <html lang={lang}>
      <body className={`${playfair.variable} ${inter.variable} font-sans antialiased`}>
        <Navbar lang={lang} dict={dict.navbar} />
        {children}
      </body>
    </html>
  )
}
