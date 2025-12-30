export const runtime = 'edge'

import { Link } from '@/i18n/navigation'
import GenericCover from '@/app/components/common/GenericCover'
import { useTranslations } from 'next-intl'

export default function Vol2Page() {
    const t = useTranslations('three-body.vol2.content')
    const tm = useTranslations('three-body.vol2.metadata')

    // Unified Black Theme
    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500 selection:text-black">
            {/* Hero Section */}
            <div className="h-[70vh] flex items-center justify-center relative overflow-hidden border-b border-white/10">
                <GenericCover color="#00EAFF" texture="cyber" title={tm('title')} inShelf={false} />
                <div className="absolute inset-0 bg-black/50" />

                {/* Visual Accent: The Droplet */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vw] border-[1px] border-cyan-500/30 rounded-full blur-[50px] pointer-events-none" />

                <div className="absolute z-10 text-center mix-blend-screen">
                    <h1 className="text-6xl md:text-9xl font-black mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
                        {tm('title')}
                    </h1>
                    <p className="font-mono text-sm text-cyan-400 tracking-[0.3em] uppercase animate-pulse">
                        THE DARK FOREST THEORY
                    </p>
                </div>
            </div>

            <article className="max-w-4xl mx-auto px-6 py-24 font-serif leading-loose">
                <p className="text-xl md:text-2xl text-white/80 mb-16 first-letter:text-7xl first-letter:font-black first-letter:mr-4 first-letter:float-left first-letter:text-cyan-500">
                    {t('intro')}
                </p>

                <section className="bg-white/5 p-12 rounded-lg border border-white/10 mb-16 relative overflow-hidden group hover:border-cyan-500/50 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-9xl select-none">?</div>
                    <h2 className="text-3xl font-bold mb-6 font-sans">The Wallfacer Project</h2>
                    <p className="opacity-80 text-lg">{t('wallfacers')}</p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                    <div className="border-l-2 border-cyan-500 pl-6 py-2">
                        <h3 className="text-xl font-bold mb-2 font-sans">{t('luoji.name')}</h3>
                        <p className="opacity-60 text-sm mb-4">{t('luoji.desc')}</p>
                        <i className="text-cyan-400">"{t('luoji.quote')}"</i>
                    </div>
                    <div className="border-l-2 border-white/20 pl-6 py-2">
                        <h3 className="text-xl font-bold mb-2 font-sans">{t('droplet.title')}</h3>
                        <p className="opacity-60 text-sm">{t('droplet.desc')}</p>
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
