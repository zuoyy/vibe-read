'use client'

import { motion } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import GenericCover from '@/app/components/common/GenericCover'
import { useTranslations } from 'next-intl'

interface HeroProps {
    inHome?: boolean
}

export default function Hero({ inHome = false }: HeroProps) {
    const t = useTranslations('sapiens.metadata')
    const tBack = useTranslations('back')

    if (inHome) {
        return <GenericCover color="#A63D40" texture="minimal" title={t('title')} inShelf={true} />
    }

    return (
        <header className="relative w-full h-[80vh] flex flex-col items-center justify-center overflow-hidden bg-[#F2F0E9] text-black">
            {/* Huge Typography Background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
                <span className="text-[20vw] font-black leading-none tracking-tighter">
                    HOMO
                </span>
            </div>

            <div className="relative z-10 text-center px-4">
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-6xl md:text-9xl font-black tracking-tighter mb-2 text-[#A63D40]"
                >
                    {t('title').toUpperCase()}
                </motion.h1>
                <div className="w-24 h-2 bg-black mx-auto mb-6" />
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-lg md:text-xl font-bold tracking-widest uppercase max-w-xl mx-auto"
                >
                    {t('description')}
                </motion.p>
            </div>

            {/* Timeline Decoration line */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F2F0E9] to-transparent z-20" />
            <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-black/10 -z-1" />

            {/* Back Button */}
            {/* Back Button - Fixed & Stylized */}
            <Link
                href="/"
                className="fixed top-6 left-6 z-50 px-4 py-2 bg-[#F2F0E9]/80 backdrop-blur-md border border-black/10 rounded-full text-xs font-bold tracking-widest text-black/70 hover:text-black hover:bg-white transition-all hover:scale-105 shadow-sm"
            >
                ← {tBack('library')}
            </Link>
        </header>
    )
}
