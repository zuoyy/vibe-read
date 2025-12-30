import { Link } from '@/i18n/navigation'
import GenericCover from '@/app/components/common/GenericCover'
import { useTranslations } from 'next-intl'

export default function Vol3Page() {
    const t = useTranslations('three-body.vol3.content')
    const tm = useTranslations('three-body.vol3.metadata')

    // Unified Black Theme
    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-purple-500 selection:text-white">
            {/* Hero Section */}
            <div className="h-[70vh] flex items-center justify-center relative overflow-hidden border-b border-white/10">
                <GenericCover color="#FFFFFF" texture="cyber" title={tm('title')} inShelf={false} />
                <div className="absolute inset-0 bg-black/60" />

                {/* Visual Accent: Dimensional Collapse */}
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent" />

                <div className="absolute z-10 text-center">
                    <h1 className="text-6xl md:text-9xl font-black mb-6 tracking-tighter text-white">
                        {tm('title')}
                    </h1>
                    <p className="font-mono text-sm text-purple-400 tracking-[0.3em] uppercase transform scale-y-50 origin-bottom">
                        ▼ DIMENSIONAL COLLAPSE IMMINENT ▼
                    </p>
                </div>
            </div>

            <article className="max-w-4xl mx-auto px-6 py-24 font-serif leading-loose">
                <p className="text-xl md:text-2xl text-white/80 mb-16 border-l-4 border-purple-500 pl-8">
                    {t('intro')}
                </p>

                <section className="mb-24 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-transparent -z-10 blur-xl" />
                    <h2 className="text-3xl font-bold mb-6 font-sans text-purple-200">{t('dimensions.title')}</h2>
                    <p className="opacity-80 text-lg mb-8">{t('dimensions.desc')}</p>

                    {/* Visual 2D Effect */}
                    <div className="h-32 bg-white/5 w-full flex items-end overflow-hidden">
                        {[...Array(20)].map((_, i) => (
                            <div key={i} className="flex-1 bg-white/10 mx-[1px]" style={{ height: `${Math.random() * 100}%` }} />
                        ))}
                    </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-1 gap-8 mb-24">
                    <div className="border border-white/10 p-8 rounded-lg">
                        <h3 className="text-xl font-bold mb-2 font-sans">{t('chengxin.name')}</h3>
                        <p className="opacity-60 text-sm mb-4">{t('chengxin.desc')}</p>
                        <i className="text-purple-300 block text-right">"{t('chengxin.quote')}"</i>
                    </div>
                </div>

                <div className="text-center mt-32">
                    <Link href="/three-body" className="inline-block border border-white/20 px-8 py-3 font-mono text-xs tracking-widest hover:bg-white hover:text-black transition-colors">
                        ← RETURN TO TRILOGY HUB
                    </Link>
                </div>
            </article>
        </main>
    )
}
