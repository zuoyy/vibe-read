'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

interface ShadowsCoverProps {
    inShelf?: boolean
}

export default function ShadowsCover({ inShelf = false }: ShadowsCoverProps) {
    const t = useTranslations('shadows-of-the-sun.metadata')

    return (
        <div className="relative w-full h-full overflow-hidden bg-[#FDB813] group">
            {/* 0. Texture Overlay */}
            <div className="absolute inset-0 opacity-20 bg-[url('/noise.svg')] mix-blend-multiply pointer-events-none" />

            {/* 1. The Blinding Sun (White Hot Center) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gradient-radial from-white via-[#FDB813] to-[#C04000] opacity-50 blur-3xl" />

            {/* 2. The Monolith (Shadow Caster) */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[70%] bg-[#0A0A0A] shadow-[0_0_50px_rgba(0,0,0,0.5)] transform -skew-x-6 origin-bottom transition-transform duration-700 group-hover:skew-x-0 group-hover:scale-110" />

            {/* 3. Typography */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between z-20">
                {/* Author - Vertical on top right */}
                <div className="self-end writing-vertical-rl text-[10px] font-mono font-bold tracking-[0.2em] text-[#0A0A0A] mix-blend-overlay opacity-60">
                    RYSZARD KAPUŚCIŃSKI
                </div>

                {/* Title - Massive, Breaking the layout */}
                <div className="relative mix-blend-exclusion text-white">
                    <h1 className="text-5xl md:text-6xl font-black leading-[0.85] uppercase tracking-tighter">
                        <div>THE</div>
                        <div>SHADOW</div>
                        <div className="text-transparent stroke-white" style={{ WebkitTextStroke: '1px white' }}>OF THE</div>
                        <div>SUN</div>
                    </h1>
                </div>
            </div>

            {/* 4. Interactive Shadow Hint */}
            <motion.div
                className="absolute bottom-4 right-4 w-3 h-3 bg-black rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
            />
        </div>
    )
}
