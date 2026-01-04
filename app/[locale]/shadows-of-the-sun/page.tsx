import Content from '@/app/components/shadows-of-the-sun/Content'
import Hero from '@/app/components/shadows-of-the-sun/Hero'
import { getTranslations } from 'next-intl/server'

export const runtime = 'edge'

type Props = {
    params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: 'shadows-of-the-sun.metadata' })

    return {
        title: t('title'),
        description: t('description'),
    }
}

export default function ArticlePage() {
    return (
        <main className="min-h-screen bg-[#0A0A0A] text-white selection:bg-[#FDB813] selection:text-black">
            <Hero />
            <Content />
        </main>
    )
}
