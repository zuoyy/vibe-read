'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export default function CharacterMap() {
    // UPDATED NAMESPACE: three-body.vol1.content.characters
    const t = useTranslations('three-body.vol1.content.characters')
    const list = [0, 1, 2, 3]

    return (
        <div className="my-32">
            <h3 className="text-sm font-mono tracking-widest text-red-500 mb-12 border-b border-red-500/20 pb-4">
                {t('title')}
            </h3>
            {/* ... Rest is the same ... */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                <div className="absolute inset-0 pointer-events-none hidden md:block opacity-20">
                    <svg className="w-full h-full">
                        <line x1="25%" y1="25%" x2="75%" y2="75%" stroke="white" strokeDasharray="4 4" />
                        <line x1="75%" y1="25%" x2="25%" y2="75%" stroke="white" strokeDasharray="4 4" />
                    </svg>
                </div>

                {list.map((i) => (
                    <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-lg backdrop-blur-sm relative overflow-hidden group hover:border-red-500/50 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <h4 className="text-2xl font-bold">{t(`list.${i}.name`)}</h4>
                            <span className="text-xs font-mono bg-white/10 px-2 py-1 rounded text-red-400">
                                {t(`list.${i}.role`)}
                            </span>
                        </div>
                        <p className="text-sm text-white/60 mb-6 min-h-[3rem]">
                            {t(`list.${i}.desc`)}
                        </p>
                        <blockquote className="border-l-2 border-red-500 pl-4 italic text-white/80 text-sm">
                            "{t(`list.${i}.quote`)}"
                        </blockquote>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                ))}
            </div>

            <div className="mt-8 text-center">
                <p className="text-xs font-mono text-white/30 tracking-widest uppercase">
                    RELATIONSHIP NETWORK: {t('relations')}
                </p>
            </div>
        </div>
    )
}
