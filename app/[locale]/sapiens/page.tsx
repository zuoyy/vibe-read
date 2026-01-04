

import Content from '@/app/components/sapiens/Content'
import Hero from '@/app/components/sapiens/Hero'
import { getTranslations, setRequestLocale } from 'next-intl/server'

type Props = {
    params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: 'sapiens.metadata' })
    const tSite = await getTranslations({ locale, namespace: 'site' })

    return {
        title: `${t('title')} - ${tSite('title')}`,
        description: t('description'),
    }
}

export default async function ArticlePage({ params }: Props) {
    const { locale } = await params
    setRequestLocale(locale)
    return (
        <main className="min-h-screen bg-[#F2F0E9] text-black">
            <Hero />
            <Content />
        </main>
    )
}
