import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SessionState } from '../../types/slices/sessionSlice'

const initialState: SessionState = {
  currentTab: null,
  currentScreen: null,
}

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setCurrentTab: (state, action: PayloadAction<string>) => {
      state.currentTab = action.payload
    },
    setCurrentScreen: (state, action: PayloadAction<string>) => {
      state.currentScreen = action.payload
    },
    setSession: (
      state,
      action: PayloadAction<{ currentTab: string; currentScreen: string }>,
    ) => {
      state.currentTab = action.payload.currentTab
      state.currentScreen = action.payload.currentScreen
    },
    clearSession: state => {
      state.currentTab = null
      state.currentScreen = null
    },
  },
})

export const { setCurrentTab, setCurrentScreen, setSession, clearSession } =
  sessionSlice.actions
export default sessionSlice.reducer
