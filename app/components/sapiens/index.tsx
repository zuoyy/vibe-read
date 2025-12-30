import { BookProject } from '@/app/components/types'
import Hero from './Hero'
import Content from './Content'
import GenericCover from '@/app/components/common/GenericCover'

export const newBook: BookProject = {
    meta: {
        id: 'sapiens',
        title: 'Sapiens: A Brief History of Humankind',
        author: 'Yuval Noah Harari',
        coverStyle: { color: '#D4A373', texture: 'paper' }, // Matches Hero texture
        summary: 'Seventy thousand years ago, there were at least six different human species on earth.',
        readingTime: '25 min',
        tags: ['HISTORY', 'PHILOSOPHY'], // Added HISTORY
        publishDate: '2025-04-15'
    },
    Cover: (props) => <GenericCover {...props} color="#D4A373" texture="paper" />,
    Experience: Content
}
