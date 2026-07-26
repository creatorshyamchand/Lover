export type PageStep = 'welcome' | 'tease' | 'loading' | 'question' | 'accepted' | 'letter';

export type LetterLanguage = 'english' | 'bengali';

export interface FloatingHeart {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
}

export interface ProposalReason {
  id: number;
  title: string;
  titleBengali: string;
  description: string;
  descriptionBengali: string;
  icon: string;
}
