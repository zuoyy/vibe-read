'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useTranslations } from 'next-intl'

export default function SunAndShadowSimulator() {
    const t = useTranslations('shadows-of-the-sun.toy')
    const containerRef = useRef<HTMLDivElement>(null)

    // Mouse position
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Smooth spring physics for the sun
    const springConfig = { damping: 25, stiffness: 120 }
    const sunX = useSpring(mouseX, springConfig)
    const sunY = useSpring(mouseY, springConfig)

    // Update mouse position on move
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        mouseX.set(e.clientX - rect.left)
        mouseY.set(e.clientY - rect.top)
    }

    // Calculate shadow styles dynamically based on sun position? 
    // For a simpler "flashlight" reveal effect which is conceptually similar to "shadow reveals truth":
    // We can treat the cursor as a light source. But the prompt is "Truth is in the shadows".
    // So: The background is bright/blinding (The Sun). The Text is White. You can't see white text on bright background.
    // You need to cast a shadow to see the text.
    // Let's make an object that follows the mouse (or is draggable) that casts a shadow.
    // AND/OR: The user moves the SUN. There are static objects (Monoliths). The shadows rotate around the monoliths.
    // Text is hidden in the floor. When shadow passes over floor, text becomes visible (inverted color?).

    // Implementation:
    // 1. A central word/truth.
    // 2. User moves the Sun (yellow circle).
    // 3. A central block casts a shadow away from the sun.
    // 4. The shadow acts as a mask.

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative w-full h-[80vh] bg-[#FDB813] overflow-hidden cursor-none flex items-center justify-center border-y-[20px] border-black"
        >
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-40">
                <p className="text-black/20 font-black text-center px-4 uppercase tracking-[0.5em] text-xl md:text-4xl mix-blend-overlay">
                    {t('instruction')}
                </p>
            </div>

            {/* The Sun (Follows cursor) */}
            <motion.div
                style={{ x: sunX, y: sunY }} // Centered by transform usually, but let's correct offset
                className="absolute w-24 h-24 rounded-full bg-white blur-xl mix-blend-screen pointer-events-none -translate-x-1/2 -translate-y-1/2 z-20"
            />
            <motion.div
                style={{ x: sunX, y: sunY }}
                className="absolute w-12 h-12 rounded-full bg-white pointer-events-none -translate-x-1/2 -translate-y-1/2 z-30 shadow-[0_0_40px_rgba(255,255,255,0.8)]"
            />

            {/* The Monolith (Center) */}
            <div className="relative z-10 w-32 h-64 bg-black shadow-2xl skew-x-2" />

            {/* The Shadow Layer */}
            {/* We need a calculated shadow polygon. 
          Vector from Sun to Corners of Monolith -> extended to edges.
      */}
            <ShadowCaster containerRef={containerRef} sunX={sunX} sunY={sunY} />
        </div>
    )
}

function ShadowCaster({ containerRef, sunX, sunY }: { containerRef: React.RefObject<HTMLDivElement | null>, sunX: any, sunY: any }) {
    const [shadowPath, setShadowPath] = useState('')

    // We update the shadow path on animation frame or motion value change
    useEffect(() => {
        const updateShadow = () => {
            if (!containerRef.current) return

            // Layout constants
            const w = containerRef.current.clientWidth
            const h = containerRef.current.clientHeight
            const cx = w / 2
            const cy = h / 2

            // Monolith size (approx)
            const mw = 128 // 32 * 4
            const mh = 256 // 64 * 4

            // Monolith corners (simplified as a rect)
            // Left-Top, Right-Top, Right-Bottom, Left-Bottom
            const corners = [
                { x: cx - mw / 2, y: cy - mh / 2 },
                { x: cx + mw / 2, y: cy - mh / 2 },
                { x: cx + mw / 2, y: cy + mh / 2 },
                { x: cx - mw / 2, y: cy + mh / 2 },
            ]

            const sx = sunX.get()
            const sy = sunY.get()

            // Simple shadow logic: 
            // Find edges of the monolith outline relative to sun.
            // Project the farthest points away from sun.

            // For a simple hardcoded rect in center:
            // Just project all 4 corners away from sun and take the convex hull of the result?
            // Easier: Just project the two corners that form the silhouette.

            // Let's do a simple huge dark polygon for now.
            // Vector from Sun to Center
            const dx = cx - sx
            const dy = cy - sy
            const angle = Math.atan2(dy, dx)

            // Perpendicular to sun-center vector
            // This defines the "width" of the shadow roughly?
            // Actually, let's just cheat visually with a CSS drop-shadow rotated?
            // No, user wants mask.

            // Let's calculate projected points.
            // Project each corner by a large distance in direction (CORNER - SUN)
            const project = (p: { x: number, y: number }) => {
                const vecX = p.x - sx
                const vecY = p.y - sy
                const len = Math.sqrt(vecX * vecX + vecY * vecY)
                const scale = 1000 / len // Project far out
                return { x: p.x + vecX * scale, y: p.y + vecY * scale }
            }

            const projectedCorners = corners.map(project)

            // We need to form a shape that connects the back-facing corners and their projections.
            // Convex hull of (corners + projectedCorners)?
            // Keep it simple: Just draw a path from corner -> projected -> next projected -> next corner...
            // Actually, pure CSS shadow is hard to mask text with.

            // Let's try to just determine the shadow polygon string.
            // A simplified "Drop Shadow" approach: 
            // If Sun is Left-Top, Shadow is Right-Bottom.

            // Let's assume the shadow is a polygon formed by the two extreme tangent points and their projections.
            // Since it's a rect, it's simpler. We just project all 4 corners and wrap them?
            // Actually, we can just use the Convex Hull of relevant points.

            // Let's build a path string.
            // This is "The Shadow". It should be black.
            // Inside this black shadow, we place the hidden text.

            // To make "Text visible ONLY in shadow":
            // 1. Draw Shadow Polygon in Black.
            // 2. Use `mix-blend-mode: overlay` or similar on text? 
            //    Or put text inside the Shadow dict inside a clip-path?
            //    Yes, clip-path is best.

            // Determine hull points for the shadow polygon
            // The shadow polygon consists of the object vertices + projected vertices.
            // Graham scan or similar is overkill.
            // Just sorting by angle from center?

            // Construct path:
            // Start at Project(Corner1) -> Corner1 -> Corner2 -> Project(Corner2) -> ...
            // No.

            // Simplest visual hack: 
            // Just use a big rotated div that anchors at center.
            const dist = Math.sqrt(dx * dx + dy * dy)
            const shadowLen = 1000
            const shadowAngleDeg = (angle * 180 / Math.PI)

            // We can render a div that is rotated `angle`, positioned at center.

            setShadowPath(`rotate(${shadowAngleDeg}deg)`)
        }

        const unsubscribeX = sunX.on("change", updateShadow)
        const unsubscribeY = sunY.on("change", updateShadow)
        updateShadow()

        return () => {
            unsubscribeX()
            unsubscribeY()
        }
    }, [])

    return (
        <>
            {/* The Shadow Container */}
            <div
                className="absolute left-1/2 top-1/2 w-0 h-0 flex items-center justify-center overflow-visible z-0"
                style={{ transform: shadowPath }}
            >
                {/* The visual shadow casting away */}
                <div
                    className="absolute w-[300px] h-[1000px] bg-black origin-top left-[-150px] top-0 opacity-90 flex flex-col items-center pt-32 text-center"
                    style={{
                        // Mask at the top to fit the Monolith width? 
                        // Just a rectangle for now is okay for Vibe check.
                    }}
                >
                    <div className="rotate-[-90deg] whitespace-nowrap text-white font-serif text-2xl px-4">
                        <p>Power is the ability to command shade.</p>
                        <p className="text-sm mt-2 opacity-70">权力即是掌控阴影的能力。</p>
                    </div>
                </div>
            </div>
        </>
    )
}
