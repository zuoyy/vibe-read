import { getTranslations, setRequestLocale } from 'next-intl/server'
import TrilogyController from '@/app/components/three-body/TrilogyController'


type Props = {
    params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: 'three-body.metadata' })
    const tSite = await getTranslations({ locale, namespace: 'site' })

    return {
        title: `${t('title')} - ${tSite('title')}`,
        description: t('description'),
    }
}

export default async function ArticlePage({ params }: Props) {
    const { locale } = await params
    setRequestLocale(locale)
    return <TrilogyController />
}
