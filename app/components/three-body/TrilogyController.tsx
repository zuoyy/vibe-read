'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import VolumeOne from './VolumeOne'
import VolumeTwo from './VolumeTwo'
import VolumeThree from './VolumeThree'
import { useTranslations } from 'next-intl'

export default function TrilogyController() {
    const [status, setStatus] = useState<'cover' | 'open'>('cover')
    const [volume, setVolume] = useState<1 | 2 | 3>(1)
    const t = useTranslations('three-body.hub')
    const tBack = useTranslations('back')

    const volumes = [
        { id: 1, color: '#FF3333' },
        { id: 2, color: '#00EAFF' },
        { id: 3, color: '#BF00FF' }
    ]

    // Cover View
    if (status === 'cover') {
        return (
            <main className="h-screen w-full bg-[#050505] text-white flex flex-col items-center justify-center relative overflow-hidden cursor-pointer"
                onClick={() => setStatus('open')}>

                {/* Background Pulse */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[80vw] h-[80vw] bg-white/5 rounded-full blur-[100px] animate-pulse" />
                </div>

                <motion.div
                    layoutId="trilogy-title"
                    className="relative z-10 text-center mix-blend-difference"
                >
                    <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-4">
                        {t('title').toUpperCase()}
                    </h1>
                    <p className="text-xl font-mono tracking-widest uppercase opacity-70">
                        {t('subtitle')}
                    </p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mt-12 inline-flex items-center gap-2 text-sm font-mono border border-white/30 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-colors"
                    >
                        CLICK TO ENTER
                    </motion.div>
                </motion.div>

                <div className="absolute bottom-8 text-xs font-mono opacity-30">
                    A VIBE READ ORIGINAL
                </div>
            </main>
        )
    }

    // Open/Reading View
    return (
        <main className="min-h-screen bg-[#050505] text-white relative">

            {/* Sticky Navigation */}
            <nav className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/" className="text-xs font-mono opacity-50 hover:opacity-100 transition-opacity">
                        ← {tBack('library')}
                    </Link>
                </div>

                <div className="flex gap-2 bg-white/5 p-1 rounded-lg">
                    {volumes.map((v) => (
                        <button
                            key={v.id}
                            onClick={() => setVolume(v.id as 1 | 2 | 3)}
                            className={`px-4 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer
                                ${volume === v.id
                                    ? 'bg-white text-black shadow-lg scale-105'
                                    : 'text-white/50 hover:text-white hover:bg-white/10'}
                            `}
                        >
                            {t(`nav.vol${v.id}`)}
                        </button>
                    ))}
                </div>
            </nav>

            {/* Content Area */}
            <div className="relative min-h-[calc(100vh-64px)] pb-24">
                {/* Accent Background based on active volume */}
                <div
                    className="fixed top-0 left-0 right-0 h-[50vh] opacity-10 blur-[120px] pointer-events-none -z-10 transition-colors duration-1000"
                    style={{ backgroundColor: volumes[volume - 1].color }}
                />

                <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
                    {volume === 1 && (
                        <VolumeOne
                            key="vol1"
                            onNext={() => setVolume(2)}
                        />
                    )}
                    {volume === 2 && (
                        <VolumeTwo
                            key="vol2"
                            onPrev={() => setVolume(1)}
                            onNext={() => setVolume(3)}
                        />
                    )}
                    {volume === 3 && (
                        <VolumeThree
                            key="vol3"
                            onPrev={() => setVolume(2)}
                            onRestart={() => setVolume(1)}
                        />
                    )}
                </AnimatePresence>
            </div>

        </main>
    )
}
