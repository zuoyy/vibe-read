'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion'
import { useTranslations } from 'next-intl'

export default function CobraEncounter() {
    const t = useTranslations('shadows-of-the-sun.content.chapter3')
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollY } = useScroll()
    const scrollVelocity = useVelocity(scrollY)

    // Transform velocity into a "Danger Level" (0 to 1)
    const rawDanger = useTransform(scrollVelocity, (v) => Math.min(Math.abs(v) / 1000, 1))
    const dangerLevel = useSpring(rawDanger, { damping: 20, stiffness: 200 })

    // Visual states based on danger
    const opacity = useTransform(dangerLevel, [0, 0.8], [1, 0])
    const threatOpacity = useTransform(dangerLevel, [0.2, 1], [0, 1])
    const scale = useTransform(dangerLevel, [0, 1], [1, 1.1])
    const redness = useTransform(dangerLevel, [0, 1], ["#000000", "#500000"])

    return (
        <motion.div
            ref={containerRef}
            className="relative w-full min-h-[150vh] bg-black text-white flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: redness }}
        >
            {/* Background Noise / Grain */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('/noise.svg')]" />

            {/* The Threat Visual (Hidden unless scrolling fast) */}
            <motion.div
                style={{ opacity: threatOpacity, scale }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
            >
                <div className="w-[80vw] h-[80vw] border-[2px] border-red-600 rounded-full blur-[100px] opacity-50 animate-pulse" />
                <p className="absolute text-red-600 font-black text-[20vw] tracking-tighter uppercase blur-sm animate-pulse">
                    DANGER
                </p>
            </motion.div>

            {/* The Safe Content (Visible only when still) */}
            <div className="relative z-10 max-w-4xl px-6 text-center">
                <motion.div style={{ opacity }}>
                    <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-12 text-[#FDB813]">
                        {t('title')}
                    </h2>
                    <div className="prose prose-invert prose-2xl mx-auto leading-relaxed text-gray-400 font-serif">
                        <p>{t('text')}</p>
                    </div>

                    <motion.div
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="mt-24 text-sm font-mono tracking-[0.3em] text-red-500 uppercase"
                    >
                        ⚠️ Slow Down to Survive
                    </motion.div>
                </motion.div>
            </div>

            {/* Flash overlay for extreme speed */}
            <motion.div
                style={{ opacity: useTransform(dangerLevel, [0.8, 1], [0, 0.8]) }}
                className="absolute inset-0 bg-red-600 z-20 pointer-events-none mix-blend-overlay"
            />
        </motion.div>
    )
}
