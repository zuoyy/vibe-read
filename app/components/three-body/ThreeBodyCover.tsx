'use client'

import { motion } from 'framer-motion'
import CountdownBackground from './CountdownBackground'
import { useTranslations } from 'next-intl'

interface ThreeBodyCoverProps {
    inShelf?: boolean
    color: string
    texture?: string
    title?: string
}

export default function ThreeBodyCover({ inShelf = false, color, title = '' }: ThreeBodyCoverProps) {
    const t = useTranslations('three-body.vol1.metadata')

    return (
        <div className="relative w-full h-full overflow-hidden bg-black flex flex-col items-center justify-center p-4">


            {/* 2. subtle texture (original circles) */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-500/40"
                        style={{
                            width: `${(i + 1) * 60}%`,
                            height: `${(i + 1) * 60}%`,
                        }}
                    />
                ))}
            </div>

            {/* 3. Title Group with Countdown Background */}
            <div className="relative w-full px-4 py-12 flex flex-col items-center justify-center mb-6">
                {/* The Countdown - Centered behind title */}
                <div className="absolute inset-0 opacity-100 pointer-events-none flex items-center justify-center">
                    <CountdownBackground small />
                </div>

                {/* The Title */}
                <h1 className="relative z-10 text-4xl md:text-5xl font-black tracking-tighter text-white leading-none uppercase break-words max-w-full">
                    {title || 'Three-Body'}
                </h1>
            </div>

            {/* 4. flashing warning below title group */}
            <motion.div
                animate={{ opacity: [0, 1, 0, 1, 0, 0, 0, 1, 0] }}
                transition={{ duration: 4, repeat: Infinity, times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.8, 0.9, 1] }}
                className="relative z-20 text-center"
            >
                <div className="text-red-500 font-mono font-black text-xs tracking-[0.3em] bg-black/80 px-3 py-1 border-y border-red-500/50 inline-block uppercase">
                    {t('warning')}
                </div>
            </motion.div>
        </div>
    )
}
