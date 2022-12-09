import { createSlice } from '@reduxjs/toolkit'

let kakaoAuth = createSlice({
  name: 'kakaoAuth',
  initialState: {
    code: null
  },
  reducers: {
    setCode(state, action) {
      state.code = action.payload.code
    },
    clearCode(state, action) {
      state.code = null
    }
  }
})

export let {setCode} = kakaoAuth.actions;
export default kakaoAuth