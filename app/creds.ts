import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface credsState {
    userId: string
}

// Define the initial state using that type
const initialState = {
    userId: ""
} as credsState

export const credsSlice = createSlice({
    name: 'creds',
    initialState,
    reducers: {
        setCreds: (state, action: PayloadAction<string>) => {
            state.userId = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const { setCreds } = credsSlice.actions

export default credsSlice.reducer