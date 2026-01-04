
import { getTranslations, setRequestLocale } from 'next-intl/server'
import HomePageClient from './HomePageClient'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'home' })
  const tSite = await getTranslations({ locale, namespace: 'site' })

  return {
    title: `${t('welcome')} - ${tSite('title')}`,
    description: t('subtitle'),
  }
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return <HomePageClient />
}
