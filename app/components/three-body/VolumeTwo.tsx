'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import DropletProbe from './DropletProbe'
import CharacterMap from './CharacterMap'

export default function VolumeTwo({ onPrev, onNext }: { onPrev?: () => void, onNext?: () => void }) {
    const t = useTranslations('three-body.vol2.content')
    const tm = useTranslations('three-body.vol2.metadata')

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-6xl mx-auto"
        >
            {/* Header */}
            <div className="text-center mb-24 pt-12">
                <h2 className="text-4xl md:text-6xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
                    {tm('title')}
                </h2>
                <p className="font-mono text-cyan-400 tracking-[0.3em] uppercase animate-pulse text-sm">
                    THE DARK FOREST THEORY
                </p>
            </div>

            <article className="font-serif leading-loose px-6 text-white text-lg">
                {/* Synopsis */}
                <p className="text-xl md:text-2xl text-white/80 mb-16 first-letter:text-7xl first-letter:font-black first-letter:mr-4 first-letter:float-left first-letter:text-cyan-500">
                    {t('synopsis')}
                </p>

                <CharacterMap volume="vol2" theme="cyan" />

                {/* Chapter I: Wallfacers */}
                <section className="bg-white/5 p-12 rounded-lg border border-white/10 mb-24 relative overflow-hidden group hover:border-cyan-500/50 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-9xl select-none">?</div>
                    <h3 className="text-cyan-500 font-mono text-xs tracking-widest mb-2">{t('chapters.one.subtitle')}</h3>
                    <h2 className="text-3xl font-bold mb-6 font-sans">{t('chapters.one.title')}</h2>
                    <p className="opacity-80 text-lg whitespace-pre-line mb-8">{t('chapters.one.text')}</p>
                    <blockquote className="border-l-2 border-cyan-500 pl-4 italic text-cyan-100">
                        "{t('chapters.one.quote')}"
                    </blockquote>
                </section>

                <div className="w-full h-[1px] bg-white/10 my-24" />

                {/* Chapter II: The Droplet */}
                <section className="mb-24">
                    <h3 className="text-white/40 font-mono text-xs tracking-widest mb-2">{t('chapters.two.subtitle')}</h3>
                    <h2 className="text-4xl font-bold mb-8">{t('chapters.two.title')}</h2>
                    <p className="opacity-90 whitespace-pre-line mb-12">{t('chapters.two.text')}</p>

                    {/* INTERACTIVE COMPONENT */}
                    <DropletProbe />
                </section>

                <div className="w-full h-[1px] bg-white/10 my-24" />

                {/* Chapter III: The Spell */}
                <section className="mb-24">
                    <h3 className="text-white/40 font-mono text-xs tracking-widest mb-2">{t('chapters.three.subtitle')}</h3>
                    <h2 className="text-4xl font-bold mb-8">{t('chapters.three.title')}</h2>
                    <div className="p-8 border border-white/10 bg-black/50 backdrop-blur-sm rounded">
                        <p className="opacity-90 whitespace-pre-line mb-8">{t('chapters.three.text')}</p>
                        <p className="font-mono text-center text-cyan-400 tracking-widest uppercase text-sm">
                            &gt; {t('chapters.three.quote')} <span className="animate-blink">_</span>
                        </p>
                    </div>
                </section>

                {/* Conclusion */}
                <section className="mb-32 text-center max-w-2xl mx-auto opacity-70 hover:opacity-100 transition-opacity">
                    <h2 className="text-2xl font-bold mb-4 font-sans text-cyan-200">{t('conclusion.title')}</h2>
                    <p className="text-base mb-8">{t('conclusion.text')}</p>
                    <button
                        onClick={onNext}
                        className="text-xs font-mono tracking-[0.5em] cursor-pointer hover:text-cyan-400 transition-colors uppercase"
                    >
                        {t('conclusion.final_word')}
                    </button>
                </section>

            </article>
        </motion.div>
    )
}
