import { getTranslations } from 'next-intl/server'
import TrilogyController from '@/app/components/three-body/TrilogyController'

export const runtime = 'edge'

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

export default function ThreeBodyPage() {
    return <TrilogyController />
}
