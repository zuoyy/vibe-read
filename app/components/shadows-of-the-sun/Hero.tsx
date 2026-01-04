'use client'

import { useTranslations } from 'next-intl'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { useRef } from 'react'

export default function Hero({ inHome = false }: { inHome?: boolean }) {
    const t = useTranslations('shadows-of-the-sun.hero')
    const tBack = useTranslations('back')
    const containerRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })

    // Parallax effect for the sun
    const y = useTransform(scrollYProgress, [0, 1], [0, 200])
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

    const content = (
        <div ref={containerRef} className={`relative w-full overflow-hidden bg-[#0A0A0A] ${inHome ? 'h-[400px]' : 'h-screen'}`}>
            {/* Background Sun */}
            <motion.div
                style={{ y, opacity }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] max-w-[800px] aspect-square rounded-full bg-[#FDB813] blur-[60px] opacity-80 mix-blend-screen"
                animate={{
                    scale: [1, 1.05, 1],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Inner Sun Core */}
            <motion.div
                style={{ y, opacity }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-[400px] aspect-square rounded-full bg-[#FDB813]"
            />

            {/* Heat Haze Overlay (Simulated with noise texture or gradient) */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none" />

            {/* Back Button (Only not in Home) */}
            {!inHome && (
                <Link
                    href="/"
                    className="fixed top-6 left-6 z-50 text-white/50 hover:text-white transition-colors"
                >
                    ← {tBack('library')}
                </Link>
            )}

            {/* Title */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="text-4xl md:text-7xl font-bold text-center tracking-tighter text-black mix-blend-overlay uppercase"
                    style={{ textShadow: '0 2px 10px rgba(0,0,0,0.2)' }}
                >
                    {t('title')}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="mt-4 text-black/60 font-medium tracking-widest text-sm md:text-base uppercase"
                >
                    {t('subtitle')}
                </motion.p>
            </div>

            {/* Scroll Indicator (Only not in Home) */}
            {!inHome && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-[0.2em] uppercase"
                >
                    {t('enter')}
                </motion.div>
            )}
        </div>
    )

    if (inHome) {
        return (
            <Link href="/shadows-of-the-sun" className="block w-full h-full relative group overflow-hidden rounded-xl">
                {content}
                {/* Hover effect overlay for home card */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
            </Link>
        )
    }

    return content
}
