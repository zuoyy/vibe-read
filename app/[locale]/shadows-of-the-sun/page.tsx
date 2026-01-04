import Content from '@/app/components/shadows-of-the-sun/Content'
import Hero from '@/app/components/shadows-of-the-sun/Hero'
import { getTranslations, setRequestLocale } from 'next-intl/server'



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

export default async function ArticlePage({ params }: Props) {
    const { locale } = await params
    setRequestLocale(locale)
    return (
        <main className="min-h-screen bg-[#0A0A0A] text-white selection:bg-[#FDB813] selection:text-black">
            <Hero />
            <Content />
        </main>
    )
}
