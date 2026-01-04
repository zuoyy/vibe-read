import type { Metadata, Viewport } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { Locale } from '@/i18n/config'
import NavigationProgress from '@/app/components/common/NavigationProgress'
import SwipeBack from '@/app/components/common/SwipeBack'
import LanguageSwitch from '@/app/components/common/LanguageSwitch'
import '@/app/globals.css'

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'site' })

  return {
    title: t('title'),
    description: t('description'),
    icons: {
      icon: '/icon.png',
      shortcut: '/favicon.ico',
      apple: '/icon.png',
    },
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  // Enable static rendering
  setRequestLocale(locale)

  if (!routing.locales.includes(locale as Locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <LanguageSwitch />
          <NavigationProgress />
          <SwipeBack>
            {children}
          </SwipeBack>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
