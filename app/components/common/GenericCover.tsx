'use client'

import { motion } from 'framer-motion'

interface GenericCoverProps {
    inShelf?: boolean
    color: string
    texture?: string
    title?: string
}

export default function GenericCover({ inShelf = false, color, texture = 'default', title = '' }: GenericCoverProps) {
    // 1. TYPOGRAPHY SYSTEM: Bold, repeated text, Swiss style
    const renderTypography = () => (
        <div className="absolute inset-0 bg-white overflow-hidden">
            <div className="absolute inset-0 flex flex-col justify-between p-4">
                {/* Repeating Title Background */}
                <div className="absolute -inset-10 flex flex-col gap-0 opacity-[0.03] rotate-[-5deg] pointer-events-none select-none">
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className="text-6xl font-black uppercase whitespace-nowrap leading-none text-black">
                            {title} {title}
                        </div>
                    ))}
                </div>

                {/* Main Title Architecture */}
                <div className="relative z-10 mix-blend-multiply">
                    <div className="w-12 h-2 bg-black mb-4"></div>
                    <h1 className="text-4xl font-black uppercase leading-[0.85] tracking-tighter break-words" style={{ color: color === '#ffffff' ? '#000' : color }}>
                        {title}
                    </h1>
                </div>

                <div className="relative z-10 w-full flex justify-between items-end border-t-2 border-black pt-2">
                    <div className="text-[10px] font-bold tracking-widest uppercase">VOL.01</div>
                    <div className="w-4 h-4 rounded-full border-2 border-black"></div>
                </div>
            </div>
        </div>
    )

    // 2. GEOMETRIC SYSTEM: Bauhaus inspired shapes
    const renderGeometric = () => (
        <div className="absolute inset-0 bg-[#F2F2F0] overflow-hidden">
            <div className="absolute top-0 right-0 w-[80%] h-[80%] bg-black rounded-bl-full opacity-5"></div>
            <div className="absolute bottom-0 left-0 w-[60%] h-[60%] rounded-tr-full mix-blend-multiply opacity-80" style={{ backgroundColor: color }}></div>

            <div className="absolute inset-0 p-4 flex flex-col justify-center items-center z-10">
                <div className="w-24 h-24 border-[10px] border-black rounded-full mb-4 mix-blend-multiply"></div>
                <div className="w-full h-2 bg-black mx-auto"></div>
                <div className="absolute bottom-4 right-4 font-mono text-xs font-bold -rotate-90 origin-bottom-right opacity-50">
                    FIGURE.A
                </div>
            </div>
        </div>
    )

    // 3. OPTICAL SYSTEM: Op-art illusions
    const renderOptical = () => (
        <div className="absolute inset-0 bg-black overflow-hidden flex items-center justify-center">
            {/* Concentric Circles */}
            {[...Array(10)].map((_, i) => (
                <div
                    key={i}
                    className="absolute rounded-full border border-white/20"
                    style={{
                        width: `${(i + 1) * 30}%`,
                        height: `${(i + 1) * 30}%`,
                        borderColor: i % 2 === 0 ? color : 'transparent',
                        borderWidth: '2px'
                    }}
                />
            ))}

            <div className="relative z-10 mix-blend-difference text-white text-center">
                <div className="text-6xl font-mono font-bold tracking-tighter animate-pulse">
                    {(title || '??').substring(0, 2)}
                </div>
            </div>
        </div>
    )

    // Dispatcher
    const renderContent = () => {
        switch (texture) {
            case 'minimal': // Maps to Typography
                return renderTypography()
            case 'organic': // Maps to Geometric
            case 'paper':
                return renderGeometric()
            case 'matrix': // Maps to Optical
            case 'cyber':
                return renderOptical()
            default:
                return renderTypography()
        }
    }

    return (
        <div className="relative w-full h-full overflow-hidden transition-all duration-500 bg-neutral-100">
            {renderContent()}
        </div>
    )
}
