'use client'

import { motion } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import GenericCover from '@/app/components/common/GenericCover'
import { useTranslations } from 'next-intl'

interface HeroProps {
    inHome?: boolean
}

export default function Hero({ inHome = false }: HeroProps) {
    // UPDATED NAMESPACE: three-body.vol1.metadata
    const t = useTranslations('three-body.vol1.metadata')
    const tBack = useTranslations('back')

    if (inHome) {
        return <GenericCover color="#000000" texture="cyber" title={t('title')} inShelf={true} />
    }

    return (
        <header className="relative w-full h-[80vh] flex flex-col items-center justify-center overflow-hidden bg-black text-white">
            <div className="absolute inset-0 opacity-30">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="absolute top-1/2 left-1/2 w-[40vw] h-[40vw] border border-white/20 rounded-full"
                        style={{ x: '-50%', y: '-50%' }}
                        animate={{
                            rotate: 360,
                            scale: [1, 1.1 + i * 0.1, 1]
                        }}
                        transition={{
                            duration: 10 + i * 5,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 text-center px-4 mix-blend-difference">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-6xl md:text-9xl font-black tracking-tighter mb-6"
                >
                    {t('title')}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-lg md:text-xl font-mono text-white/60 tracking-widest uppercase"
                >
                    {t('description')}
                </motion.p>
            </div>

            {/* UPDATED BACK LINK: To Hub */}
            <Link
                href="/three-body"
                className="absolute top-8 left-8 text-sm font-mono text-white/50 hover:text-white transition-colors z-50 flex items-center gap-2"
            >
                ← {tBack('library')}
            </Link>
        </header>
    )
}
