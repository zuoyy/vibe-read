'use client'

import { useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'

const SunAndShadowSimulator = dynamic(() => import('./SunAndShadowSimulator'), { ssr: false })
const CobraEncounter = dynamic(() => import('./CobraEncounter'), { ssr: false })
const AfricanTime = dynamic(() => import('./AfricanTime'), { ssr: false })

export default function Content() {
    const t = useTranslations('shadows-of-the-sun.content')

    return (
        <article className="w-full bg-[#0A0A0A] text-white overflow-hidden">

            {/* Intro Section: Full Width, Huge Typography */}
            <section className="w-full px-6 py-24 md:py-48 min-h-[80vh] flex flex-col justify-center bg-[#FDB813] text-black">
                <div className="max-w-[90vw] mx-auto">
                    <h2 className="text-[12vw] leading-[0.8] font-black tracking-tighter uppercase mb-12">
                        Collision
                    </h2>
                    <p className="text-2xl md:text-5xl font-bold leading-tight max-w-4xl">
                        {t('synopsis')}
                    </p>
                </div>
            </section>

            {/* Chapter 1: Standard Reading (but styled) */}
            <section className="w-full px-6 py-24 md:py-32 bg-[#0A0A0A]">
                <div className="max-w-4xl mx-auto space-y-12">
                    <h3 className="text-4xl md:text-6xl font-bold text-[#FDB813] border-l-[10px] border-[#FDB813] pl-8">
                        {t('chapter1.title')}
                    </h3>
                    <div className="prose prose-invert prose-2xl text-gray-300">
                        <p>{t('chapter1.text')}</p>
                    </div>
                </div>
            </section>

            {/* INTERACTIVE: African Time */}
            <AfricanTime />

            {/* Chapter 2: High Contrast */}
            <section className="w-full px-6 py-24 md:py-32 bg-white text-black">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    <h3 className="text-6xl md:text-8xl font-black tracking-tighter uppercase">
                        {t('chapter2.title')}
                    </h3>
                    <div className="text-xl md:text-3xl font-medium leading-relaxed">
                        <p>{t('chapter2.text')}</p>
                    </div>
                </div>
            </section>

            {/* INTERACTIVE: The Toy */}
            <section className="w-full relative py-32 bg-[#0A0A0A]">
                <div className="absolute top-0 w-full text-center text-[#FDB813] text-sm tracking-widest uppercase py-4 z-20">
                    Geometry of Truth
                </div>
                {/* Make container wide */}
                <div className="w-full max-w-[100vw] overflow-hidden">
                    <SunAndShadowSimulator />
                </div>
            </section>

            {/* INTERACTIVE: Cobra Encounter */}
            <CobraEncounter />

            {/* Final Chapter: The Sun */}
            <section className="w-full px-6 py-32 md:py-64 bg-[#FDB813] text-black flex items-center justify-center">
                <div className="max-w-5xl text-center space-y-12">
                    <h3 className="text-5xl md:text-9xl font-black uppercase text-white mix-blend-overlay">
                        THE SUN
                    </h3>
                    <p className="text-2xl md:text-4xl font-serif leading-relaxed">
                        {t('chapter5.text')}
                    </p>
                </div>
            </section>

            <div className="w-full py-12 bg-black text-center">
                <p className="text-[#FDB813] font-mono uppercase tracking-[0.5em]">End of Transmission</p>
            </div>

        </article>
    )
}
