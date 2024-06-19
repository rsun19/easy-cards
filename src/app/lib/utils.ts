import type Quill from 'quill'

export const validateQuillContents = (obj: unknown): obj is Quill => typeof obj === 'object' && obj !== null && 'getContents' in obj
