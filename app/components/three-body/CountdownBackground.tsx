'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function CountdownBackground() {
    const [time, setTime] = useState(25920000000) // Approx ~300 days in ms, arbitrary start

    useEffect(() => {
        // Run a fast countdown effect
        const interval = setInterval(() => {
            setTime(prev => prev - 37) // Irregular decrement for "glitchy" feel
        }, 30)
        return () => clearInterval(interval)
    }, [])

    // Format millisecond timestamp into a sci-fi string
    const formatTime = (ms: number) => {
        const hours = Math.floor(ms / 3600000)
        const mins = Math.floor((ms % 3600000) / 60000)
        const secs = Math.floor((ms % 60000) / 1000)
        const mils = ms % 1000

        return `${hours.toString().padStart(4, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}:${mils.toString().padStart(3, '0')}`
    }

    return (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
            {/* Main Giant Countdown */}
            <div className="font-mono font-black text-[12vw] md:text-[8vw] text-red-600/30 leading-none tracking-tighter tabular-nums scale-150 opacity-100 mix-blend-screen">
                {formatTime(time)}
            </div>

            {/* Floating Decoys / Glitch Text */}
            <motion.div
                animate={{ opacity: [0.1, 0.4, 0.1] }}
                transition={{ duration: 0.2, repeat: Infinity, repeatType: "reverse" }}
                className="absolute top-1/4 left-10 font-mono text-red-500/40 text-xs"
            >
                T-MINUS
            </motion.div>

            <motion.div
                animate={{ opacity: [0.1, 0.4, 0.1] }}
                transition={{ duration: 0.3, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
                className="absolute bottom-1/4 right-10 font-mono text-red-500/40 text-xs text-right"
            >
                SYSTEM DECAY<br />
                ERR_code: 3BODY
            </motion.div>

            {/* Scanline Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06)_1px,transparent_1px)] bg-[length:100%_4px,20px_100%] z-0" />
        </div>
    )
}
