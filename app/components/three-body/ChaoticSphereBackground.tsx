'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function ChaoticSphereBackground() {
    // 3 Suns: Red, Cyan (Blue-ish), Purple (representing the trilogy themes)
    const orbs = [
        { id: 1, color: '#FF3333', size: 120, delay: 0 },   // Vol 1
        { id: 2, color: '#00EAFF', size: 100, delay: 0.5 },   // Vol 2
        { id: 3, color: '#BF00FF', size: 150, delay: 1 },   // Vol 3
    ]

    // Generating chaotic paths using multiple sine waves
    // to simulate the "unpredictable" nature of the 3-body problem
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-black">
            {orbs.map((orb) => (
                <motion.div
                    key={orb.id}
                    className="absolute rounded-full blur-[40px] opacity-60 mix-blend-screen"
                    style={{
                        backgroundColor: orb.color,
                        width: orb.size,
                        height: orb.size,
                        left: '50%',
                        top: '50%',
                    }}
                    animate={{
                        x: [
                            (Math.random() - 0.5) * 1500,
                            (Math.random() - 0.5) * 1500,
                            (Math.random() - 0.5) * 1500
                        ],
                        y: [
                            (Math.random() - 0.5) * 1000,
                            (Math.random() - 0.5) * 1000,
                            (Math.random() - 0.5) * 1000
                        ],
                        scale: [1, 1.2, 0.8, 1],
                    }}
                    transition={{
                        duration: 1.5 + Math.random() * 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: orb.delay
                    }}
                />
            ))}


        </div>
    )
}
