import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { construirMetadata } from '@/lib/metadata'
import { obtenerLocale } from '@/lib/locale'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

/** Título, descripción, favicon y vista previa social: todo desde el panel. */
export async function generateMetadata(): Promise<Metadata> {
  const locale = await obtenerLocale()
  return construirMetadata(locale)
}

export const viewport: Viewport = {
  themeColor: '#2347f2',
  width: 'device-width',
  initialScale: 1,
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const locale = await obtenerLocale()

  return (
    <html lang={locale} className={poppins.variable}>
      <body className="flex min-h-dvh flex-col">
        <Header locale={locale} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  )
}
