'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

import { useTranslations } from 'next-intl'

export default function DropletProbe() {
    const t = useTranslations('three-body.vol2.content')
    const [attack, setAttack] = useState(false)

    const handleAttack = () => {
        if (attack) return
        setAttack(true)
        setTimeout(() => setAttack(false), 5000)
    }

    return (
        <div className="relative w-full h-[400px] bg-black border border-white/10 rounded-lg overflow-hidden cursor-crosshair" onClick={handleAttack}>
            {/* Grid Line Background (Space Fleet Formation) */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 bg-[size:50px_50px]" />

            {/* Fleet Targets */}
            <div className="absolute inset-0 flex flex-wrap gap-8 items-center justify-center opacity-50">
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={attack ? {
                            scale: 0,
                            opacity: [1, 1, 0],
                            filter: ["blur(0px)", "blur(0px)", "blur(20px)"]
                        } : {}}
                        transition={{ delay: i * 0.1, duration: 0.2 }}
                        className="w-12 h-12 border border-white/30 bg-white/5 rounded-sm relative"
                    >
                        <div className="absolute inset-0 bg-blue-500/20" />
                    </motion.div>
                ))}
            </div>

            {/* The Droplet */}
            <motion.div
                className="absolute top-1/2 left-0 w-8 h-12 bg-gradient-to-br from-white via-cyan-200 to-cyan-500 rounded-full blur-[2px] shadow-[0_0_30px_#00EAFF]"
                style={{ borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' }} // Teardrop shape approximation
                animate={attack ? {
                    offsetDistance: "100%",
                    left: ["0%", "100%", "0%", "100%", "50%"],
                    top: ["50%", "20%", "80%", "10%", "50%"],
                    scale: [1, 0.5, 1.5, 0.2, 50]
                } : {
                    x: [0, 20, 0]
                }}
                transition={attack ? {
                    duration: 2,
                    ease: "easeInOut",
                    times: [0, 0.2, 0.4, 0.6, 1]
                } : {
                    repeat: Infinity,
                    duration: 4
                }}
            />

            {/* Overlay Text */}
            <div className="absolute bottom-4 right-4 font-mono text-xs text-cyan-500">
                {attack ? t('interactive.status_destroyed') : t('interactive.click_to_attack')}
            </div>

            {/* Explosion Flash */}
            {attack && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ delay: 1.8, duration: 0.5 }}
                    className="absolute inset-0 bg-white mix-blend-screen"
                />
            )}
        </div>
    )
}
