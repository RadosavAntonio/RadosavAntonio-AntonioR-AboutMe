import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserState } from '../../types/slices/userSlice'

const initialState: UserState = {
  userId: null,
  phoneNumber: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ userId: string; phoneNumber: string }>,
    ) => {
      state.userId = action.payload.userId
      state.phoneNumber = action.payload.phoneNumber
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload
    },
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload
    },
    clearUser: state => {
      state.userId = null
      state.phoneNumber = null
    },
  },
})

export const { setUser, setUserId, setPhoneNumber, clearUser } =
  userSlice.actions
export default userSlice.reducer
