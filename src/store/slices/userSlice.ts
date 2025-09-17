import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserState } from '../../types/slices/userSlice'

const initialState: UserState = {
  userId: null,
  phoneNumber: null,
  ipAddressLocation: null,
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
    setIpAddressLocation: (state, action: PayloadAction<string>) => {
      state.ipAddressLocation = action.payload
    },
    clearUser: state => {
      state.userId = null
      state.phoneNumber = null
      state.ipAddressLocation = null
    },
  },
})

export const {
  setUser,
  setUserId,
  setPhoneNumber,
  setIpAddressLocation,
  clearUser,
} = userSlice.actions
export default userSlice.reducer
