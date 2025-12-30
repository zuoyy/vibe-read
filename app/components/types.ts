import { ComponentType } from 'react'

export interface BookMeta {
  id: string            // Unique identifier (kebab-case)
  title: string         // Book title
  author: string        // Original author
  coverStyle: {         // Cover styling config
    color: string       // Theme color
    texture?: string    // e.g. 'noise', 'glass'
  }
  summary: string       // One-line recommendation
  readingTime: string   // e.g. '15 min'
  tags: string[]        // e.g. ['AI', 'Philosophy']
  publishDate: string
}

export interface BookProject {
  meta: BookMeta
  Cover: ComponentType<{ inShelf?: boolean; title?: string }> // Replaces Hero
  Experience: ComponentType                   // Replaces Content
}
