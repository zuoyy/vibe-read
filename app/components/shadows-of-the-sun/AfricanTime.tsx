'use client'

import { useRef } from 'react'
import { motion, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion'
import { useTranslations } from 'next-intl'

export default function AfricanTime() {
    const t = useTranslations('shadows-of-the-sun.content.chapter4')
    const containerRef = useRef<HTMLDivElement>(null)

    // Track scroll velocity inside this section
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const { scrollY } = useScroll()
    const velocity = useVelocity(scrollY)
    const smoothVelocity = useSpring(velocity, { damping: 50, stiffness: 400 })

    // Distortion factors
    const skew = useTransform(smoothVelocity, [-1000, 1000], [-20, 20])
    const scale = useTransform(smoothVelocity, v => 1 + Math.abs(v / 2000))
    const blur = useTransform(smoothVelocity, v => Math.min(Math.abs(v / 100), 10))

    return (
        <div ref={containerRef} className="relative w-full py-48 overflow-hidden bg-[#FDB813] text-black">

            {/* Decorative elastic lines background */}
            <div className="absolute inset-0 flex flex-col justify-between opacity-10 pointer-events-none">
                {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                        key={i}
                        style={{ skewX: skew }}
                        className="w-full h-px bg-black"
                    />
                ))}
            </div>

            <div className="relative z-10 max-w-[90vw] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">

                {/* The "Clock" / Concept Visual */}
                <div className="relative aspect-square flex items-center justify-center">
                    <motion.div
                        style={{
                            rotate: useTransform(scrollYProgress, [0, 1], [0, 360]),
                            scaleX: scale,
                            scaleY: useTransform(scale, s => 1 / s), // Stretch effect
                            filter: useTransform(blur, b => `blur(${b}px)`),
                        }}
                        className="w-full h-full border-[20px] border-black rounded-full flex items-center justify-center"
                    >
                        <motion.div
                            className="w-[80%] h-[20px] bg-black"
                            style={{ skewX: skew }}
                        />
                    </motion.div>
                </div>

                {/* The Text Content */}
                <div className="space-y-12">
                    <motion.h2
                        style={{ skewX: skew, x: useTransform(skew, s => s * -2) }}
                        className="text-8xl md:text-[10vw] font-black leading-[0.8] tracking-tighter uppercase"
                    >
                        {t('title')}
                    </motion.h2>

                    <motion.div
                        style={{ opacity: useTransform(blur, [0, 5], [1, 0.5]) }}
                        className="text-xl md:text-3xl font-bold leading-tight"
                    >
                        {t('text')}
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
