'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'

export default function IgnoranceMap() {
    const t = useTranslations('sapiens.toy.science')
    const [discovered, setDiscovered] = useState<number[]>([])

    const areas = [
        { id: 1, x: 20, y: 30, name: "America", label: "New Lands" },
        { id: 2, x: 70, y: 60, name: "Australia", label: "Terra Australis" },
        { id: 3, x: 50, y: 20, name: "Physics", label: "Calculus" },
        { id: 4, x: 80, y: 30, name: "Biology", label: "Microbiology" },
        { id: 5, x: 30, y: 70, name: "Chemistry", label: "Elements" }
    ]

    useEffect(() => {
        if (discovered.length === areas.length && areas.length > 0) {
            const timer = setTimeout(() => {
                setDiscovered([])
            }, 6000)
            return () => clearTimeout(timer)
        }
    }, [discovered])

    const handleDiscover = (id: number) => {
        if (!discovered.includes(id)) {
            setDiscovered([...discovered, id])
        }
    }

    return (
        <div className="w-full h-[500px] relative overflow-hidden select-none bg-[#E6E2D6] rounded-sm">
            {/* Texture Overlay */}
            <div className="absolute inset-0 opacity-30 pointer-events-none mix-blend-multiply"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            {/* Title / Watermark */}
            <div className="absolute top-8 left-8 z-10 opacity-40 mix-blend-multiply pointer-events-none">
                <h3 className="font-serif text-3xl italic text-[#8B5A2B]">{t('terra_incognita')}</h3>
                <p className="font-mono text-xs text-[#8B5A2B] tracking-widest mt-1 uppercase">{t('title')}</p>
            </div>

            {/* Interactive Areas */}
            {areas.map((area) => {
                const isDiscovered = discovered.includes(area.id)

                return (
                    <motion.div
                        key={area.id}
                        className="absolute w-48 h-48 -ml-24 -mt-24 flex items-center justify-center cursor-pointer group"
                        style={{ left: `${area.x}%`, top: `${area.y}%` }}
                        onClick={() => handleDiscover(area.id)}
                        whileHover={{ scale: 1.05 }}
                    >
                        {/* The Fog / Cloud (Cover) */}
                        <motion.div
                            initial={false}
                            animate={{
                                opacity: isDiscovered ? 0 : 1,
                                scale: isDiscovered ? 0.8 : 1
                            }}
                            className="absolute inset-0 bg-[#D4A373] rounded-full blur-[40px] opacity-60 mix-blend-multiply group-hover:opacity-40 transition-opacity duration-700"
                        />

                        {!isDiscovered && (
                            <div className="relative z-10 font-serif italic text-[#8B5A2B]/40 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                {t('hic_sunt_dragones')}
                            </div>
                        )}

                        {/* The Discovery (Revealed Content) */}
                        <motion.div
                            initial={false}
                            animate={{
                                opacity: isDiscovered ? 1 : 0,
                                y: isDiscovered ? 0 : 10
                            }}
                            className="relative z-10 text-center"
                        >
                            <div className="font-serif text-2xl font-bold text-[#5C3A1E] mb-1">{t(`areas.${area.name.toLowerCase()}`)}</div>
                            <div className="w-12 h-[1px] bg-[#8B5A2B]/30 mx-auto" />
                        </motion.div>
                    </motion.div>
                )
            })}

            {/* Decorative Grid Lines */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
                <svg width="100%" height="100%">
                    <line x1="10%" y1="0" x2="10%" y2="100%" stroke="#8B5A2B" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="90%" y1="0" x2="90%" y2="100%" stroke="#8B5A2B" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="0" y1="20%" x2="100%" y2="20%" stroke="#8B5A2B" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="0" y1="80%" x2="100%" y2="80%" stroke="#8B5A2B" strokeWidth="1" strokeDasharray="4 4" />
                </svg>
            </div>

            {/* Progress Text */}
            <div className="absolute bottom-6 right-8 font-serif italic text-[#8B5A2B] text-sm opacity-60">
                {discovered.length === areas.length ? t('complete') : `${Math.round(discovered.length / areas.length * 100)}% ${t('explored_suffix')}`}
            </div>
        </div>
    )
}
