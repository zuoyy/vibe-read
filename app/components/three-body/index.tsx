import { BookProject } from '@/app/components/types'
import Hero from './Hero'
import Content from './Content'
import GenericCover from '@/app/components/common/GenericCover'
import ThreeBodyCover from './ThreeBodyCover'

// This index now effectively points to Vol 1 metadata but links to the "Hub" via the Hero logic or Main Page logic.
// However, the main page links to /three-body (the hub). 
// The metadata here is used for the Card on the homepage.

export const newBook: BookProject = {
    meta: {
        id: 'three-body',
        // We use the Trilogy Title here
        title: 'Remembrance of Earth\'s Past',
        author: 'Liu Cixin',
        coverStyle: { color: '#050505', texture: 'cyber' },
        summary: 'From the Red Coast Base to the heat death of the universe.',
        readingTime: 'TRILOGY',
        tags: ['SCI-FI'],
        publishDate: '2025-03-01'
    },
    // The Cover on the shelf still points to the Hub Page because the link wraps the whole card.
    // We override the title display in the card to use the Hub title if we want, 
    // but the card component uses `t('metadata.title')`. 
    // We need to ensure `three-body.metadata.title` exists or points to something valid.
    // My JSON restructure moved `metadata` inside `vol1`.
    // Wait, the HomePage uses `t(book.meta.id)`. So it looks for `three-body`.
    // In my new JSON, `three-body` root has `hub`, `vol1`, etc.
    // So `messages/en/three-body.json` -> root keys are `hub`, `vol1`.
    // The Home Page expects `three-body.metadata.title`.
    // I need to adjust the JSON or the Home Page. 
    // Easier: Map `three-body.metadata` in JSON to the Trilogy info.

    Cover: (props) => <ThreeBodyCover {...props} color="#050505" />,
    Experience: Content // This is technically unused if we go to Hub, but required by type.
}
