export interface Answer {
  id: number | null
  answer: string
  isCorrect: boolean | null
  questionId: number | null
}

export interface Question {
  id: number | null
  question: string
  answers: Answer[] | null
  setId: number | null
}

export interface Set {
  id: number | null
  name: string
  subject: string | null
  visits: number | null
  userId: number | null
  questions: Question[] | null
}

export interface Profile {
  id: number | null
  name: string | null
  email: string
  sets: Set[] | null
}
