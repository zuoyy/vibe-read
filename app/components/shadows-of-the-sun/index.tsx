import { BookProject } from '@/app/components/types'
import Content from './Content'
import GenericCover from '@/app/components/common/GenericCover'
import ShadowsCover from './ShadowsCover'

export const shadowsOfTheSun: BookProject = {
    meta: {
        id: 'shadows-of-the-sun',
        title: 'The Shadow of the Sun',
        author: 'Ryszard Kapuściński',
        coverStyle: { color: '#FDB813', texture: 'grain' },
        summary: 'A visceral journey into the heart of Africa.',
        readingTime: '20 min',
        tags: ['HISTORY', 'JOURNALISM'],
        publishDate: '2025-06-01'
    },
    Cover: ShadowsCover,
    Experience: Content
}
