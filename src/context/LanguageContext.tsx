import React, { useState, useEffect } from 'react';
import { Language, TextSize } from '../types';
import { translations, getTranslation } from '../i18n/translations';
import { LanguageContext } from './languageContextDef';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [textSize, setTextSize] = useState<TextSize>('normal');

  // Apply root font sizing dynamically for elderly / accessibility mode
  useEffect(() => {
    const root = document.documentElement;
    if (textSize === 'large') {
      root.style.fontSize = '18px';
    } else if (textSize === 'xlarge') {
      root.style.fontSize = '20px';
    } else {
      root.style.fontSize = '16px';
    }
  }, [textSize]);

  const t = (key: keyof typeof translations): string => {
    return getTranslation(key, language);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, textSize, setTextSize, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
