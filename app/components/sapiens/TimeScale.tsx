'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'

export default function TimeScale() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const t = useTranslations('sapiens.timeline')

    // Map scroll progress to a visual timeline
    // This is a simplified vertical timeline visualizer

    return (
        <div ref={containerRef} className="relative py-24 my-12 border-l-2 border-black/10 ml-4 md:ml-12 pl-8 md:pl-16">
            <h3 className="text-sm font-bold tracking-widest text-black/40 mb-12 absolute -top-4 -left-[7px] bg-[#F2F0E9] py-2">
                TIMELINE
            </h3>

            {/* Event 1 */}
            <div className="mb-32 relative">
                <div className="absolute -left-[41px] md:-left-[73px] top-2 w-4 h-4 bg-black rounded-full ring-4 ring-[#F2F0E9]" />
                <span className="font-mono text-sm text-[#A63D40] font-bold block mb-2">-70,000 YEARS</span>
                <h4 className="text-3xl font-black mb-4">{t('events.cognitive.title')}</h4>
                <p className="text-lg opacity-80 max-w-lg">{t('events.cognitive.desc')}</p>
            </div>

            {/* Event 2 */}
            <div className="mb-32 relative">
                <div className="absolute -left-[41px] md:-left-[73px] top-2 w-4 h-4 bg-black/50 rounded-full ring-4 ring-[#F2F0E9]" />
                <span className="font-mono text-sm text-[#A63D40] font-bold block mb-2">-12,000 YEARS</span>
                <h4 className="text-3xl font-black mb-4">{t('events.agricultural.title')}</h4>
                <p className="text-lg opacity-80 max-w-lg">{t('events.agricultural.desc')}</p>
            </div>

            {/* Event 3 */}
            <div className="relative">
                <div className="absolute -left-[41px] md:-left-[73px] top-2 w-4 h-4 bg-black/20 rounded-full ring-4 ring-[#F2F0E9]" />
                <span className="font-mono text-sm text-[#A63D40] font-bold block mb-2">-500 YEARS</span>
                <h4 className="text-3xl font-black mb-4">{t('events.scientific.title')}</h4>
                <p className="text-lg opacity-80 max-w-lg">{t('events.scientific.desc')}</p>
            </div>

            {/* Progress Line */}
            <motion.div
                className="absolute top-0 bottom-0 left-[-2px] w-[2px] bg-[#A63D40] origin-top"
                style={{ scaleY: scrollYProgress }}
            />
        </div>
    )
}
