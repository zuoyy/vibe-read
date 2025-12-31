'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'

export default function WheatTrap() {
    const t = useTranslations('sapiens.toy.wheat')
    const [wheat, setWheat] = useState(0)
    const [population, setPopulation] = useState(100)
    const [happiness, setHappiness] = useState(100)

    // Auto-reset when civilization collapses
    useEffect(() => {
        if (happiness <= 0) {
            const timer = setTimeout(() => {
                setWheat(0)
                setPopulation(100)
                setHappiness(100)
            }, 4000)
            return () => clearTimeout(timer)
        }
    }, [happiness])

    // Auto-grow wheat animation
    const stalks = Array.from({ length: 40 })

    const harvest = () => {
        if (happiness <= 0) return
        setWheat(prev => prev + 10)
        setPopulation(prev => prev + Math.floor(Math.random() * 50))
        setHappiness(prev => Math.max(0, prev - 15))
    }

    return (
        <div className="w-full relative py-24 group select-none overflow-hidden rounded-3xl">
            {/* Ambient Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#f0ece2] to-[#D4A373]/10 transition-opactiy duration-500" />

            {/* The Trap UI */}
            <div className="relative z-10 flex flex-col items-center">
                <div className="font-mono text-[10px] text-[#8B5A2B]/40 tracking-[0.3em] uppercase mb-8">{t('title')}</div>

                <div className="grid grid-cols-2 w-full max-w-2xl gap-8 mb-16 px-4">
                    {/* Population Metric */}
                    <div className="text-center group-hover:-translate-y-1 transition-transform duration-500">
                        <div className="text-[10px] font-bold text-[#8B5A2B]/40 mb-2 tracking-widest">{t('population')}</div>
                        <div className="text-5xl md:text-7xl font-serif text-[#8B5A2B] tabular-nums leading-none">
                            {population.toLocaleString()}
                        </div>
                        <div className="text-[#8B5A2B]/20 text-xs mt-2 font-mono">Homos Sapiens</div>
                    </div>

                    {/* Happiness Metric */}
                    <div className="text-center group-hover:-translate-y-1 transition-transform duration-500 delay-100">
                        <div className="text-[10px] font-bold text-[#8B5A2B]/40 mb-2 tracking-widest">{t('happiness')}</div>
                        <div className={`text-5xl md:text-7xl font-serif tabular-nums leading-none transition-colors duration-500 ${happiness < 30 ? 'text-red-900/40' : 'text-[#8B5A2B]'}`}>
                            {happiness}%
                        </div>
                        <div className="text-[#8B5A2B]/20 text-xs mt-2 font-mono">Quality of Life</div>
                    </div>
                </div>

                {/* The Button (The Trap) */}
                <button
                    onClick={harvest}
                    className="group/btn relative px-12 py-6 bg-transparent border border-[#8B5A2B]/20 hover:border-[#8B5A2B] hover:bg-[#8B5A2B] text-[#8B5A2B] hover:text-white transition-all duration-300 rounded-full overflow-hidden"
                >
                    <span className="relative z-10 font-serif font-bold tracking-widest text-sm">{t('action')}</span>
                </button>

                <p className={`mt-8 font-mono text-xs tracking-widest text-center transition-colors duration-300 ${happiness < 50 ? 'text-red-800/60' : 'text-[#8B5A2B]/40'}`}>
                    {happiness < 50 ? t('trap_warning') : t('instruction')}
                </p>
            </div>

            {/* Immersive Wheat Field - Parallax & Organic */}
            <div className="absolute bottom-0 left-0 right-0 h-48 flex items-end justify-between px-4 opacity-30 pointer-events-none space-x-1">
                {stalks.map((_, i) => (
                    <motion.div
                        key={i}
                        className="w-1 bg-[#D4A373] rounded-t-full origin-bottom"
                        initial={{ height: 20 }}
                        animate={{
                            height: 20 + wheat + Math.random() * 40,
                            rotate: Math.sin(i) * 5
                        }}
                        transition={{ type: "spring", stiffness: 50 }}
                    />
                ))}
            </div>
        </div>
    )
}
