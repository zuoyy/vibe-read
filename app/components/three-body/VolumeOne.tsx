'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import ThreeBodySimulator from './ThreeBodySimulator'
import CharacterMap from './CharacterMap'
import CountdownBackground from './CountdownBackground'
import { useState } from 'react'

export default function VolumeOne({ onNext }: { onNext?: () => void }) {
    // Keeping namespace as is
    const t = useTranslations('three-body.vol1.content')
    const [transmitted, setTransmitted] = useState(false)

    const handleTransmit = () => setTransmitted(true)

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-6xl mx-auto"
        >
            {/* Header */}
            <div className="text-center mb-24 pt-12">
                <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter text-white">
                    {useTranslations('three-body.vol1.metadata')('title')}
                </h2>
                <p className="font-mono text-red-500 tracking-[0.3em] uppercase text-sm">
                    THE BETRAYAL OF HUMANITY
                </p>
            </div>

            <article className="px-6 font-serif text-white leading-loose">
                {/* Synopsis */}
                {/* Synopsis */}
                <section className="mb-24 text-center relative py-20 overflow-hidden">
                    <CountdownBackground />
                    <p className="text-xl md:text-2xl italic text-white/90 max-w-2xl mx-auto leading-relaxed relative z-10">
                        "{t('synopsis')}"
                    </p>
                    <div className="w-12 h-1 bg-red-500 mx-auto mt-12 relative z-10" />
                </section>

                {/* Flashing Warning */}
                <motion.div
                    animate={{ opacity: [0, 1, 0, 1, 0, 0, 0, 1, 0] }}
                    transition={{ duration: 4, repeat: Infinity, times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.8, 0.9, 1] }}
                    className="text-center mb-16 text-red-600 font-mono font-black tracking-[0.5em] text-sm md:text-lg select-none mix-blend-screen"
                >
                    {useTranslations('three-body.vol1.metadata')('warning')}
                </motion.div>

                {/* Character Archive */}
                <CharacterMap volume="vol1" theme="red" />

                {/* Chapter I */}
                <section className="mb-32 relative">
                    <div className="absolute -left-12 top-0 text-red-600/20 font-black text-9xl -z-10 select-none">I</div>
                    <h3 className="text-red-500 font-mono text-sm tracking-widest mb-2">{t('chapters.one.subtitle')}</h3>
                    <h2 className="text-4xl font-bold mb-8">{t('chapters.one.title')}</h2>
                    <p className="text-xl opacity-90 mb-8 whitespace-pre-line">
                        {t('chapters.one.text')}
                    </p>
                    <div className="my-12 p-8 border border-red-900/50 bg-red-900/10 text-center rounded-lg">
                        <p className="font-mono text-xs text-red-500 mb-4">{t('chapters.one.quote')}</p>
                        <button
                            onClick={handleTransmit}
                            disabled={transmitted}
                            className={`px-8 py-3 rounded font-mono text-sm tracking-widest transition-all duration-500
                                ${transmitted
                                    ? 'bg-red-500 text-black shadow-[0_0_50px_rgba(255,0,0,0.5)]'
                                    : 'bg-transparent border border-red-500 text-red-500 hover:bg-red-500 hover:text-black'}
                            `}
                        >
                            {transmitted ? 'SIGNAL SENT TO ALPHA CENTAURI' : t('chapters.one.action')}
                        </button>
                    </div>
                </section>

                <div className="w-full h-[1px] bg-white/10 my-24" />

                {/* Chapter II */}
                <section className="mb-32 relative">
                    <div className="absolute -right-12 top-0 text-white/5 font-black text-9xl -z-10 select-none">II</div>
                    <h3 className="text-white/40 font-mono text-sm tracking-widest mb-2">{t('chapters.two.subtitle')}</h3>
                    <h2 className="text-4xl font-bold mb-8">{t('chapters.two.title')}</h2>
                    <p className="text-xl opacity-90 mb-8 whitespace-pre-line">
                        {t('chapters.two.text')}
                    </p>
                    <div className="my-12">
                        <ThreeBodySimulator />
                        <p className="text-center font-mono text-xs text-red-500 mt-2 tracking-widest animate-pulse">
                            {t('chapters.two.physics_caption')}
                        </p>
                    </div>
                </section>

                <div className="w-full h-[1px] bg-white/10 my-24" />

                {/* Chapter III */}
                <section className="mb-32 relative">
                    <div className="absolute -left-12 top-0 text-white/5 font-black text-9xl -z-10 select-none">III</div>
                    <h3 className="text-white/40 font-mono text-sm tracking-widest mb-2">{t('chapters.three.subtitle')}</h3>
                    <h2 className="text-4xl font-bold mb-8">{t('chapters.three.title')}</h2>
                    <div className="relative">
                        <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-white/50 z-10" style={{ left: '30%' }}></div>
                        <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-white/50 z-10" style={{ left: '32%' }}></div>
                        <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-white/50 z-10" style={{ left: '34%' }}></div>
                        <p className="text-xl opacity-90 mb-8 whitespace-pre-line pl-8 border-l border-white/20">
                            {t('chapters.three.text')}
                        </p>
                    </div>
                    <blockquote className="text-4xl font-black text-center text-white/20 mt-16 font-sans uppercase">
                        {t('chapters.three.quote')}
                    </blockquote>
                </section>

                <div className="w-full h-[1px] bg-white/10 my-24" />

                {/* Conclusion */}
                <section className="mb-32 text-center max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold mb-8 font-sans">{t('conclusion.title')}</h2>
                    <p className="text-lg opacity-80 mb-12">
                        {t('conclusion.text')}
                    </p>
                    <button
                        onClick={onNext}
                        className="inline-block border-2 border-white px-8 py-4 font-mono font-bold tracking-widest hover:bg-white hover:text-black transition-colors cursor-pointer"
                    >
                        {t('conclusion.final_word')}
                    </button>
                </section>
            </article>
        </motion.div>
    )
}
