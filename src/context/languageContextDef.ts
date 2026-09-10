import { createContext } from 'react';
import { Language, TextSize } from '../types';
import { translations } from '../i18n/translations';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  textSize: TextSize;
  setTextSize: (size: TextSize) => void;
  t: (key: keyof typeof translations) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

