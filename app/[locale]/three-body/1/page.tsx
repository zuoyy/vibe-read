export const runtime = 'edge'

import Content from '@/app/components/three-body/Content'
import Hero from '@/app/components/three-body/Hero'
import { getTranslations } from 'next-intl/server'

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

export default function ArticlePage() {
    return (
        <main className="min-h-screen bg-black text-white">
            <Hero />
            <Content />
        </main>
    )
}
