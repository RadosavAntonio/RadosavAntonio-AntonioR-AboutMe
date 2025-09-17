import React, { createContext, ReactNode, useContext } from 'react'
import { useAppSelector } from '../store/hooks'
import { englishTranslations } from './resources/languages/englishLanguage'
import { spanishTranslations } from './resources/languages/spanishLanguage'

// ----- Language Types -----
export type SupportedLanguage = 'en' | 'es'

// ----- Translation Definitions -----
const translations = {
  en: englishTranslations,
  es: spanishTranslations,
} as const

// ----- Language Context Types -----
export type Translations = (typeof translations)[keyof typeof translations]
export type PhoneAuthTranslations = Translations['phoneAuth']

interface LanguageContextType {
  language: SupportedLanguage
  translations: Translations
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
)

// ----- Language Provider Component -----
interface LanguageProviderProps {
  children: ReactNode
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const language = useAppSelector(
    state => state.appSettings.language || 'en',
  ) as SupportedLanguage

  const currentTranslations = translations[language]

  const contextValue: LanguageContextType = {
    language,
    translations: currentTranslations,
    t: currentTranslations, // Alias for easier access
  }

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  )
}

// ----- Language Hook -----
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext)

  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }

  return context
}

// ----- Convenience Hook for PhoneAuth -----
export const usePhoneAuthTranslations = (): PhoneAuthTranslations => {
  const { t } = useLanguage()
  return t.phoneAuth
}
