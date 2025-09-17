import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  AppSettingsState,
  SupportedLanguage,
} from '../../types/slices/appSettingsSlice'

const initialState: AppSettingsState = {
  darkMode: true, // Default to dark mode as requested
  language: SupportedLanguage.ENGLISH, // Default to English
  appVersion: '1.0.0', // Default version
}

const appSettingsSlice = createSlice({
  name: 'appSettings',
  initialState,
  reducers: {
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload
    },
    toggleDarkMode: state => {
      state.darkMode = !state.darkMode
    },
    setLanguage: (state, action: PayloadAction<SupportedLanguage>) => {
      state.language = action.payload
    },
    toggleLanguage: state => {
      state.language =
        state.language === SupportedLanguage.ENGLISH
          ? SupportedLanguage.SPANISH
          : SupportedLanguage.ENGLISH
    },
    setAppVersion: (state, action: PayloadAction<string>) => {
      state.appVersion = action.payload
    },
    setAppSettings: (
      state,
      action: PayloadAction<{
        darkMode?: boolean
        language?: SupportedLanguage
        appVersion?: string
      }>,
    ) => {
      if (action.payload.darkMode !== undefined) {
        state.darkMode = action.payload.darkMode
      }
      if (action.payload.language !== undefined) {
        state.language = action.payload.language
      }
      if (action.payload.appVersion !== undefined) {
        state.appVersion = action.payload.appVersion
      }
    },
    resetAppSettings: state => {
      state.darkMode = true
      state.language = SupportedLanguage.ENGLISH
      state.appVersion = '1.0.0'
    },
  },
})

export const {
  setDarkMode,
  toggleDarkMode,
  setLanguage,
  toggleLanguage,
  setAppVersion,
  setAppSettings,
  resetAppSettings,
} = appSettingsSlice.actions
export default appSettingsSlice.reducer
