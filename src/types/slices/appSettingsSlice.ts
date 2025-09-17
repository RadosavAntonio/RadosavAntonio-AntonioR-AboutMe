export enum SupportedLanguage {
  ENGLISH = 'en',
  SPANISH = 'es',
}

export interface AppSettingsState {
  darkMode: boolean // Persistent
  language: SupportedLanguage // Persistent
  appVersion: string // Non-persistent
}
