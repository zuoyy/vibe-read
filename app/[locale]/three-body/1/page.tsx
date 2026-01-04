

import Content from '@/app/components/three-body/Content'
import Hero from '@/app/components/three-body/Hero'
import { getTranslations, setRequestLocale } from 'next-intl/server'

type Props = {
    params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: 'three-body.vol1.metadata' })

    return {
        title: t('title'),
        description: t('description'),
    }
}

export default async function ArticlePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    setRequestLocale(locale)
    return (
        <main className="min-h-screen bg-black text-white selection:bg-red-900 selection:text-white">
            <Hero />
            <Content />
        </main>
    )
}
