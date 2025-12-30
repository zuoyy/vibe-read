'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import TimeScale from './TimeScale'
import GossipGraph from './GossipGraph'
import WheatTrap from './WheatTrap'


export default function Content() {
    const t = useTranslations('sapiens.content')

    return (
        <div className="relative z-10 bg-[#f4f1ea] text-[#2c1810]">
            {/* Intro Section */}
            <section className="max-w-4xl mx-auto px-6 py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-black mb-6 font-serif">{t('intro.title')}</h2>
                    <p className="text-xl leading-relaxed opacity-80 font-serif italic">
                        "{t('intro.text')}"
                    </p>
                </motion.div>

                {/* VISUALIZATION: TIMELINE */}
                <div className="mb-24">
                    <TimeScale />
                </div>
            </section>

            {/* Chapter I: Cognitive Revolution */}
            <section className="bg-white px-6 py-24 border-t border-[#D4A373]/20">
                <div className="max-w-4xl mx-auto">
                    <span className="font-mono text-xs tracking-widest text-[#D4A373] mb-2 block">{t('chapters.cognitive.subtitle')}</span>
                    <h2 className="text-4xl font-bold mb-8 font-serif">{t('chapters.cognitive.title')}</h2>
                    <p className="text-lg leading-loose opacity-80 mb-12 whitespace-pre-line">
                        {t('chapters.cognitive.text')}
                    </p>

                    {/* TOY: GOSSIP GRAPH */}
                    <div className="my-16 -mx-6 md:-mx-12 lg:-mx-24 relative z-0">
                        <GossipGraph />
                        <p className="text-center text-xs font-mono text-[#D4A373] mt-4 tracking-widest opacity-60">
                            {t('chapters.cognitive.toy_caption')}
                        </p>
                    </div>
                </div>
            </section>

            {/* Chapter II: Agricultural Revolution */}
            <section className="bg-[#f0ece2] px-6 py-32 border-t border-[#D4A373]/20 relative overflow-hidden">
                <div className="max-w-4xl mx-auto relative z-10">
                    <span className="font-mono text-xs tracking-widest text-[#D4A373] mb-4 block">{t('chapters.agricultural.subtitle')}</span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-12 font-serif text-[#8B5A2B]">{t('chapters.agricultural.title')}</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start mb-24">
                        <p className="text-lg leading-loose opacity-80 whitespace-pre-line font-serif">
                            {t('chapters.agricultural.text')}
                        </p>
                        <blockquote className="border-l-2 border-[#D4A373] pl-6 py-2 italic font-serif text-3xl text-[#D4A373] leading-tight">
                            {t('chapters.agricultural.quote')}
                        </blockquote>
                    </div>

                    {/* TOY: WHEAT TRAP */}
                    <div className="-mx-6 md:-mx-12 lg:-mx-32">
                        <WheatTrap />
                    </div>
                </div>
            </section>

            {/* Chapter III: Scientific Revolution */}
            <section className="bg-[#1a1512] text-[#f4f1ea] px-6 py-32 border-t border-[#D4A373]/20">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-16 items-start mb-24">
                        <div className="flex-1">
                            <span className="font-mono text-xs tracking-widest text-[#D4A373] mb-4 block">{t('chapters.scientific.subtitle')}</span>
                            <h2 className="text-4xl md:text-5xl font-bold mb-8 font-serif">{t('chapters.scientific.title')}</h2>
                            <p className="text-lg leading-loose opacity-70 whitespace-pre-line">
                                {t('chapters.scientific.text')}
                            </p>
                        </div>
                    </div>



                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4A373]/30 to-transparent my-16" />

                    {/* Conclusion */}
                    <div className="text-center max-w-2xl mx-auto relative">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 text-[#D4A373]/10 text-9xl font-serif">?</div>
                        <h3 className="text-2xl font-bold mb-6 font-serif relative z-10">{t('conclusion.title')}</h3>
                        <p className="opacity-60 mb-12 text-lg font-serif italic relative z-10">"{t('conclusion.text')}"</p>
                        <div className="inline-block border-y border-[#D4A373]/30 px-12 py-6 font-mono text-xs tracking-[0.2em] text-[#D4A373] relative z-10">
                            {t('conclusion.final_word')}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
