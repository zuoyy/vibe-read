'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function DimensionalCollapse() {
    const [collapsed, setCollapsed] = useState(false)

    return (
        <div className="relative w-full h-[500px] border border-white/10 overflow-hidden bg-[#050505] perspective-1000 group">
            {/* 3D Elements (Before Collapse) */}
            <motion.div
                animate={collapsed ? {
                    rotateX: 0,
                    rotateY: 0,
                    scale: 3,
                    opacity: 0.5
                } : {
                    rotateX: 20,
                    rotateY: 20
                }}
                transition={{ duration: 5 }}
                className="absolute inset-0 flex items-center justify-center preserve-3d"
            >
                {/* Solar System Representation */}
                <div className="w-64 h-64 border border-white/20 rounded-full absolute animate-[spin_10s_linear_infinite]" />
                <div className="w-48 h-48 border border-white/20 rounded-full absolute animate-[spin_8s_linear_infinite_reverse]" />
                <div className="w-32 h-32 bg-yellow-500/20 rounded-full blur-xl absolute" />

                {/* Planets */}
                <div className="absolute w-4 h-4 bg-blue-500 rounded-full top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_20px_blue]" />
            </motion.div>

            {/* The Foil */}
            <motion.div
                className="absolute top-1/2 left-1/2 w-4 h-4 bg-white shadow-[0_0_50px_white] z-50 cursor-pointer"
                animate={collapsed ? {
                    scale: [1, 100],
                    opacity: [1, 0.8]
                } : {
                    scale: [1, 1.2, 1],
                }}
                transition={{ duration: collapsed ? 4 : 2, repeat: collapsed ? 0 : Infinity }}
                onClick={() => setCollapsed(true)}
            >
                {!collapsed && <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 font-mono text-[10px] whitespace-nowrap text-white/50">CLICK TO FLATTEN</div>}
            </motion.div>

            {/* Van Gogh Effect (After Collapse) */}
            {collapsed && (
                <motion.div
                    initial={{ opacity: 0, clipPath: 'circle(0% at 50% 50%)' }}
                    animate={{ opacity: 1, clipPath: 'circle(150% at 50% 50%)' }}
                    transition={{ duration: 4, ease: "easeInOut" }}
                    className="absolute inset-0 bg-[url('/noise.png')] mix-blend-overlay z-40 bg-purple-900/50"
                >
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        {[...Array(50)].map((_, i) => (
                            <div key={i} className="w-full h-2 bg-gradient-to-r from-transparent via-white/20 to-transparent my-1 blur-sm transform scale-x-150"
                                style={{ animationDelay: `${i * 0.1}s` }} />
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    )
}
