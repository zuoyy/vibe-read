'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

import { useTranslations } from 'next-intl'

export default function ThreeBodySimulator() {
    const t = useTranslations('three-body')
    // Simplified 3-body visualizer (kinematic, not strictly physics engine to avoid heavy libs)
    // We simulate 3 chaotic points

    const [time, setTime] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(t => t + 0.02)
        }, 16)
        return () => clearInterval(interval)
    }, [])

    // Parametric equations loosely mimicking chaotic orbits
    const getPos = (offset: number) => {
        const t = time + offset
        const x = Math.sin(t) * 100 + Math.sin(t * 1.5) * 50
        const y = Math.cos(t * 0.8) * 100 + Math.sin(t * 2.1) * 50
        return { x, y }
    }

    const bodies = [0, 2, 4].map(offset => getPos(offset))

    return (
        <div className="w-full h-[400px] bg-black border border-white/10 relative overflow-hidden flex items-center justify-center my-12">
            <div className="absolute top-4 left-4 text-xs font-mono text-white/50">
                {t('vol1.content.simulator.status')}<br />
                {t('vol1.content.simulator.epoch')}
            </div>

            {/* Trails (SVG) */}
            <svg className="absolute inset-0 w-full h-full opacity-30">
                {/* Simplified trails could go here */}
            </svg>

            {/* Bodies */}
            {bodies.map((pos, i) => (
                <motion.div
                    key={i}
                    className="absolute w-4 h-4 bg-white rounded-full shadow-[0_0_20px_white]"
                    style={{
                        left: '50%',
                        top: '50%',
                        x: pos.x,
                        y: pos.y
                    }}
                />
            ))}

            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 overflow-visible">
                <g transform="translate(50%, 50%)"> {/* Center origin */}
                    <line x1={bodies[0].x} y1={bodies[0].y} x2={bodies[1].x} y2={bodies[1].y} stroke="white" strokeWidth="1" />
                    <line x1={bodies[1].x} y1={bodies[1].y} x2={bodies[2].x} y2={bodies[2].y} stroke="white" strokeWidth="1" />
                    <line x1={bodies[2].x} y1={bodies[2].y} x2={bodies[0].x} y2={bodies[0].y} stroke="white" strokeWidth="1" />
                </g>
            </svg>
        </div>
    )
}
