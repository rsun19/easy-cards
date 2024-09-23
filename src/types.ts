export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: number;
  refreshTokenExpires: number;
}

export interface AccessTokenResponse {
  accessToken: string;
  accessTokenExpires: number;
}

export interface UserSetCards {
  username?: string;
  name: string;
  id: number;
}

export interface Flashcards {
  question: string;
  answer: string[];
}

export interface QuestionType {
  id: number;
  question: string;
}

export interface AnswerType {
  id: number;
  isCorrect: boolean;
  answer: string;
}

export interface SetType {
  key: string;
  id: number;
  author: string;
  name: string;
}

export interface SetListType {
  username: string;
  sets: SetType[];
}

export interface SetCardProps {
  question: QuestionType;
  answers: AnswerType[];
}
