'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

export default function IgnoranceMap() {
    const t = useTranslations('sapiens.toy.science')
    const [discovered, setDiscovered] = useState<number[]>([])

    const areas = [
        { id: 1, x: 20, y: 30, name: "America" },
        { id: 2, x: 70, y: 60, name: "Australia" },
        { id: 3, x: 50, y: 20, name: "Physics" },
        { id: 4, x: 80, y: 30, name: "Biology" },
        { id: 5, x: 30, y: 70, name: "Chemistry" }
    ]

    const handleDiscover = (id: number) => {
        if (!discovered.includes(id)) {
            setDiscovered([...discovered, id])
        }
    }

    return (
        <div className="w-full h-[600px] relative rounded-lg overflow-hidden cursor-crosshair group select-none">
            {/* Background: No borders, just pure darkness fading in */}
            <div className="absolute inset-0 bg-black" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 bg-[size:40px_40px]" />

            {/* HUD - Integrated into the scene */}
            <div className="absolute top-12 left-12 z-10 pointer-events-none">
                <div className="font-mono text-xs text-[#D4A373]/50 tracking-[0.2em] mb-4 uppercase">{t('title')}</div>
                <div className="text-6xl font-black text-white/5 font-serif leading-none tracking-tighter">
                    {Math.round(discovered.length / areas.length * 100)}%
                </div>
                <div className="text-white/20 font-serif text-sm italic mt-2">
                    {discovered.length === areas.length ? t('complete') : t('progress')}
                </div>
            </div>

            {/* The Void / Fog */}
            <div
                className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black pointer-events-none transition-opacity duration-1000"
                style={{ opacity: Math.max(0, 0.8 - discovered.length * 0.15) }}
            />

            {/* Interactive Points - Organic Glowing Orbs */}
            {areas.map((area) => (
                <motion.button
                    key={area.id}
                    onClick={() => handleDiscover(area.id)}
                    className="absolute w-40 h-40 -ml-20 -mt-20 flex items-center justify-center outline-none focus:outline-none mix-blend-screen"
                    style={{ left: `${area.x}%`, top: `${area.y}%` }}
                >
                    {/* The Unknown (Question Mark) */}
                    {!discovered.includes(area.id) && (
                        <motion.div
                            initial={{ scale: 1, opacity: 0.3 }}
                            whileHover={{ scale: 1.1, opacity: 0.8 }}
                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="font-serif text-8xl font-thin text-white/10"
                        >
                            ?
                        </motion.div>
                    )}

                    {/* The Discovery */}
                    {discovered.includes(area.id) && (
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-center relative"
                        >
                            {/* Glowing Orb */}
                            <div className="w-2 h-2 bg-[#D4A373] rounded-full mx-auto mb-4 shadow-[0_0_40px_10px_rgba(212,163,115,0.3)] animate-pulse" />

                            {/* Label */}
                            <div className="text-xs font-mono text-[#D4A373] tracking-[0.3em] uppercase">{area.name}</div>

                            {/* Connection Line */}
                            <div className="absolute top-1 left-1/2 w-full h-[1px] bg-gradient-to-r from-[#D4A373]/40 to-transparent -translate-x-full rotate-45 origin-right" />
                        </motion.div>
                    )}
                </motion.button>
            ))}

            {/* Instruction overlay - fades out */}
            {discovered.length === 0 && (
                <div className="absolute bottom-12 left-0 right-0 text-center">
                    <span className="px-4 py-2 border border-white/10 rounded-full text-white/30 font-mono text-[10px] tracking-widest animate-pulse">
                        {t('instruction')}
                    </span>
                </div>
            )}
        </div>
    )
}
