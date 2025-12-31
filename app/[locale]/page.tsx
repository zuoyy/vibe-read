'use client'

export const runtime = 'edge'
import { useTranslations } from 'next-intl'
import LanguageSwitch from '@/app/components/common/LanguageSwitch'
import { Link } from '@/i18n/navigation'
import { BookProject } from '@/app/components/types'
import { motion, Variants } from 'framer-motion'
import { useRef, useState } from 'react'
import GenericCover from '@/app/components/common/GenericCover'
// Mock Books Definition
import { newBook as threeBody } from '@/app/components/three-body'
import { newBook as sapiens } from '@/app/components/sapiens'
// 书架内容
const library: BookProject[] = [
  threeBody,
  sapiens
]
import { TAG_ORDER } from '@/app/config/tags'
// Interactive Background with Swiss Grid
function InteractiveBackground() {
  return (
    <div className="fixed inset-0 z-[-1] bg-[#F2F2F0] overflow-hidden pointer-events-none">
      {/* Swiss Grid Pattern - Dark, Low Opacity */}
      <div
        className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"
      />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-multiply"></div>
    </div>
  )
}
// Swiss Design Book Card
// Premium Book Card
function BookCard({ book, index }: { book: BookProject, index: number }) {
  const t = useTranslations(book.meta.id)
  const tTags = useTranslations('tags')
  const { Cover } = book

  // Get theme color from metadata (default to black if missing)
  const themeColor = t('metadata.coverStyle.color') || '#000000'

  return (
    <Link href={`/${book.meta.id}`} className="block w-full h-full group relative">
      {/* Dynamic Glow Background */}
      <div
        className="absolute -inset-4 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl blur-2xl z-0"
        style={{ backgroundColor: themeColor }}
      />

      <div className="relative z-10 w-full h-full flex flex-col transition-all duration-300 transform group-hover:-translate-y-2">
        {/* Cover Container */}
        <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300 bg-[#F2F2F0]">
          {/* The Actual Cover Component */}
          <div className="w-full h-full transform transition-transform duration-700 group-hover:scale-105">
            <Cover inShelf={true} title={t('metadata.title')} />
          </div>

          {/* Overlay Gradient on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
            <span className="text-white font-mono text-xs tracking-[0.2em] border border-white/30 px-4 py-2 rounded-full backdrop-blur-md uppercase">
              {t('metadata.read_now')}
            </span>
          </div>
        </div>

        {/* Info Area - Minimalist */}
        <div className="mt-6 text-center">
          <h3 className="text-2xl font-bold text-black/90 mb-2 font-serif group-hover:text-black transition-colors">
            {t('metadata.title')}
          </h3>
          <div className="flex items-center justify-center gap-2 text-xs font-mono tracking-widest text-black/40 uppercase">
            <span>{t('metadata.author')}</span>
            <span className="w-1 h-1 rounded-full bg-black/20" />
            <span>{tTags(book.meta.tags[0])}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
export default function HomePage() {
  const t = useTranslations()
  // State for category filtering
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL')
  // Compute unique tags from all books and sort them
  const rawCategories = Array.from(new Set(library.flatMap(book => book.meta.tags)))
  const categories = ['ALL', ...rawCategories.sort((a, b) => {
    const customIndexA = TAG_ORDER.indexOf(a)
    const customIndexB = TAG_ORDER.indexOf(b)
    // If both are in custom order, sort by custom order
    if (customIndexA !== -1 && customIndexB !== -1) return customIndexA - customIndexB
    // If only A is in custom order, A comes first
    if (customIndexA !== -1) return -1
    // If only B is in custom order, B comes first
    if (customIndexB !== -1) return 1
    // Otherwise alphabetical
    return a.localeCompare(b)
  })]
  // Filter books based on selection
  const filteredLibrary = selectedCategory === 'ALL'
    ? library
    : library.filter(book => book.meta.tags.includes(selectedCategory))
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }
  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  }
  return (
    <main className="min-h-screen relative text-black selection:bg-black selection:text-white">
      <InteractiveBackground />
      <LanguageSwitch />
      {/* Vertical Sidebar Text */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 hidden xl:block pointer-events-none z-0">
        <div className="writing-mode-vertical-lr rotate-180 text-[120px] font-black text-black/[0.03] tracking-tighter leading-none whitespace-nowrap select-none">
          VIBE READ // VIBE READ // VIBE READ
        </div>
      </div>
      {/* Header */}
      <div className="relative flex flex-col items-center justify-center pt-20 pb-16 border-b-[2px] border-black bg-[#F2F2F0]">
        <div className="text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-black mb-4 leading-tight">
            {t('home.blogTitle')}
          </h1>
          <p className="text-lg font-medium text-black/60 max-w-xl md:max-w-5xl mx-auto leading-relaxed tracking-tight">
            {t('home.subtitle')}
          </p>
        </div>
      </div>
      {/* Filter Bar */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-9 mb-0">
        <div className="flex flex-wrap gap-4 md:gap-8 justify-center border-b-[2px] border-black/10 pb-4">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`text-sm font-bold tracking-widest uppercase transition-colors relative cursor-pointer
                        ${selectedCategory === category ? 'text-black' : 'text-black/40 hover:text-black/70'}
                    `}
            >
              <span className="relative z-10">{t(`tags.${category}`)}</span>
              {selectedCategory === category && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute -bottom-[18px] left-0 right-0 h-[2px] bg-black"
                />
              )}
            </button>
          ))}
        </div>
      </div>
      {/* Bookshelf Grid */}
      {/* [DESIGN NOTE] max-w-[...] controls total width, px-... controls side margins. grid-cols controls columns. */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12 pb-24">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          key={selectedCategory} // Re-animate on category change
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
        >
          {filteredLibrary.map((book, index) => {
            return (
              <motion.div
                variants={item}
                key={book.meta.id}
                className="relative"
              >
                <BookCard book={book} index={index} />
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="py-12 text-center text-sm font-bold text-black/40 uppercase tracking-widest border-t-[2px] border-black/5 mx-6 md:mx-12">
        {t('footer.copyright')}
      </footer>
    </main>
  )
}
