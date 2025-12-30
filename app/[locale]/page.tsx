'use client'
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
function BookCard({ book, index }: { book: BookProject, index: number }) {
  const t = useTranslations(book.meta.id)
  const { Cover, meta } = book
  return (
    <Link href={`/${book.meta.id}`} className="block w-full h-full group">
      <div className="w-full h-full bg-white border-[2px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 transition-all duration-200 flex flex-col">
        {/* Visual Area - The "Cover" */}
        {/* [DESIGN NOTE] Aspect Ratio controls height: aspect-[3/4] is portrait (book), aspect-[4/3] is landscape. */}
        <div className="relative w-full aspect-[4/5] border-b-[2px] border-black overflow-hidden bg-black group-hover:invert transition-all duration-300">
          {/* Constrain Cover to fit */}
          <div className="absolute inset-0 transform scale-100 group-hover:scale-105 transition-transform duration-500">
            <Cover inShelf={true} title={t('metadata.title')} />
          </div>
        </div>
        {/* Info Area */}
        <div className="flex-1 p-4 flex flex-col justify-between bg-white text-black min-h-[120px]">
          <div>
            <h3 className="text-2xl font-bold leading-tight tracking-tight mb-2 line-clamp-2">
              {t('metadata.title')}
            </h3>
          </div>
          <div className="flex flex-col gap-3 mt-2">
            <div className="w-full h-[1px] bg-black/10"></div>
            <div className="flex justify-end items-end">
              <div className="flex flex-col items-end">
                <span className="font-bold text-xs tracking-tight">{t('metadata.author')}</span>
              </div>
            </div>
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
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } }
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
      <div className="relative flex flex-col items-center justify-center pt-15 pb-16 border-b-[2px] border-black bg-[#F2F2F0]">
        <div className="text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-black mb-4 leading-tight">
            {t('home.blogTitle')}
          </h1>
          <p className="text-lg font-medium text-black/60 max-w-xl mx-auto leading-relaxed tracking-tight">
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
              className={`text-sm font-bold tracking-widest uppercase transition-colors relative
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
