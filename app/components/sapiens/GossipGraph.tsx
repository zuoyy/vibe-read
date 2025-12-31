'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'

export default function GossipGraph() {
    const t = useTranslations('sapiens.toy')
    const [connected, setConnected] = useState(false)
    const [nodes, setNodes] = useState<{ x: number, y: number }[]>([])

    useEffect(() => {
        const newNodes = Array.from({ length: 60 }).map(() => ({
            x: Math.random() * 100,
            y: Math.random() * 100
        }))
        setNodes(newNodes)
    }, [])

    useEffect(() => {
        if (connected) {
            const timer = setTimeout(() => setConnected(false), 8000)
            return () => clearTimeout(timer)
        }
    }, [connected])

    return (
        <div className="w-full h-[400px] md:h-[500px] relative overflow-hidden group cursor-pointer select-none"
            onClick={() => setConnected(!connected)}>

            {/* Background - Transparent/Organic */}
            <div className="absolute inset-0 bg-[#D4A373]/5 rounded-3xl transition-colors duration-1000 group-hover:bg-[#D4A373]/10" />

            {/* Instructions - Floating */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10">
                <div className={`text-xs font-mono tracking-[0.2em] transition-all duration-500 uppercase ${connected ? 'text-[#D4A373] bg-white px-4 py-2 rounded-full shadow-sm' : 'text-[#D4A373]/60 animate-pulse'}`}>
                    {connected ? t('connected') : t('disconnected')}
                </div>
            </div>

            {/* Nodes */}
            {nodes.map((node, i) => (
                <motion.div
                    key={i}
                    layout
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, x: `${node.x}%`, y: `${node.y}%` }}
                    transition={{ duration: 1.5, delay: i * 0.005, ease: "backOut" }}
                    className={`absolute w-1.5 h-1.5 rounded-full transition-colors duration-500 ${connected ? 'bg-[#D4A373]' : 'bg-[#D4A373]/40'}`}
                />
            ))}

            {/* Organic Connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                {connected && nodes.map((node, i) => (
                    nodes.map((target, j) => {
                        if (i < j && Math.abs(node.x - target.x) < 25 && Math.abs(node.y - target.y) < 25) {
                            return (
                                <motion.path
                                    key={`${i}-${j}`}
                                    d={`M ${node.x}% ${node.y}% Q ${(node.x + target.x) / 2}% ${(node.y + target.y) / 2 + 5}% ${target.x}% ${target.y}%`}
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 0.15 }}
                                    transition={{ duration: 2, ease: "easeInOut" }}
                                    fill="none"
                                    stroke="#D4A373"
                                    strokeWidth="1"
                                />
                            )
                        }
                        return null
                    })
                ))}
            </svg>

            {/* Central Myth - Typography Integration */}
            {connected && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                    <h3 className="text-5xl md:text-7xl font-black text-[#D4A373] opacity-10 uppercase tracking-tighter text-center leading-none font-serif mix-blend-multiply">
                        {t('center')}
                    </h3>
                </motion.div>
            )}
        </div>
    )
}
