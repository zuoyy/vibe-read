'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import DimensionalCollapse from './DimensionalCollapse'

export default function VolumeThree() {
    const t = useTranslations('three-body.vol3.content')
    const tm = useTranslations('three-body.vol3.metadata')

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-4xl mx-auto"
        >
            {/* Header */}
            <div className="text-center mb-24 pt-12 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-purple-900/10 blur-3xl -z-10" />
                <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter text-white">
                    {tm('title')}
                </h2>
                <p className="font-mono text-purple-400 tracking-[0.3em] uppercase transform scale-y-50 origin-bottom text-sm">
                    ▼ DIMENSIONAL COLLAPSE IMMINENT ▼
                </p>
            </div>

            <article className="font-serif leading-loose px-6 text-white text-lg">
                <p className="text-xl md:text-2xl text-white/80 mb-16 border-l-4 border-purple-500 pl-8">
                    {t('synopsis')}
                </p>

                {/* Chapter I */}
                <section className="mb-24">
                    <h3 className="text-purple-400 font-mono text-xs tracking-widest mb-2">{t('chapters.one.subtitle')}</h3>
                    <h2 className="text-3xl font-bold mb-6">{t('chapters.one.title')}</h2>
                    <p className="opacity-90 whitespace-pre-line mb-8">{t('chapters.one.text')}</p>
                    <div className="flex justify-center my-12">
                        <div className="w-32 h-32 border border-white/20 rounded-full flex items-center justify-center animate-pulse">
                            <div className="w-24 h-24 bg-white/5 rounded-full blur-md" />
                        </div>
                    </div>
                </section>

                <div className="w-full h-[1px] bg-white/10 my-24" />

                {/* Chapter II */}
                <section className="mb-24">
                    <h3 className="text-white/40 font-mono text-xs tracking-widest mb-2">{t('chapters.two.subtitle')}</h3>
                    <h2 className="text-3xl font-bold mb-6">{t('chapters.two.title')}</h2>
                    <p className="opacity-90 whitespace-pre-line mb-8">{t('chapters.two.text')}</p>
                </section>

                <div className="w-full h-[1px] bg-white/10 my-24" />

                {/* Chapter III */}
                <section className="mb-24 relative">
                    <h3 className="text-purple-400 font-mono text-xs tracking-widest mb-2">{t('chapters.three.subtitle')}</h3>
                    <h2 className="text-3xl font-bold mb-6 font-sans text-purple-200">{t('chapters.three.title')}</h2>
                    <p className="opacity-80 text-lg mb-12">{t('chapters.three.text')}</p>

                    {/* INTERACTIVE COMPONENT */}
                    <DimensionalCollapse />
                </section>

                {/* Conclusion */}
                <section className="mb-32 text-center max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold mb-8 font-sans">{t('conclusion.title')}</h2>
                    <p className="text-lg opacity-80 mb-12">{t('conclusion.text')}</p>
                    <div className="inline-block border-t border-b border-white/20 py-4 w-full font-mono font-bold tracking-widest">
                        {t('conclusion.final_word')}
                    </div>
                </section>
            </article>
        </motion.div>
    )
}
