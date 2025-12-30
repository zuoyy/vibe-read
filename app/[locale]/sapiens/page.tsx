export const runtime = 'edge'

import Content from '@/app/components/sapiens/Content'
import Hero from '@/app/components/sapiens/Hero'
import { getTranslations } from 'next-intl/server'

type Props = {
    params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: 'sapiens.metadata' })

    return {
        title: t('title'),
        description: t('description'),
    }
}

export default function ArticlePage() {
    return (
        <main className="min-h-screen bg-[#F2F0E9] text-black">
            <Hero />
            <Content />
        </main>
    )
}
