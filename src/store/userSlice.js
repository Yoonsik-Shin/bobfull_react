import { createSlice } from '@reduxjs/toolkit'

let user = createSlice({
  name: 'user',
  initialState: {
    id: null,
    email: "",
    nickname: "닉네임을 설정해주세요.",
    name: "",
    alcohol: null,
    talk: null,
    smoke: null,
    speed: null,
    gender: null,
    manner: null,
    access_token: null,
    refresh_token: null,
    isLoading: false,
    isLogin: null,
  },
  reducers: {
    loginUser(state, action) { 
      state.id = action.payload.pk
      state.email = action.payload.email
      state.nickname = action.payload.nickname
      state.name = action.payload.name
      state.alcohol = action.payload.alcohol
      state.talk = action.payload.talk
      state.smoke = action.payload.smoke
      state.speed = action.payload.speed
      state.gender = action.payload.gender
      state.manner = action.payload.manner
      state.access_token = action.payload.access_token
      state.refresh_token = action.payload.refresh_token
      state.isLogin = true
    },
    clearUser(state) {
      state.id = null
      state.email = ""
      state.nickname = ""
      state.name = ""
      state.alcohol = null
      state.talk = null
      state.smoke = null
      state.speed = null
      state.gender = null
      state.manner = null
      state.access_token = null
      state.refresh_token = null
      state.isLogin = false
    },
    changeUser(state, action) {
      state.nickname = action.payload.nickname
      state.name = action.payload.name
      state.alcohol = action.payload.alcohol
      state.talk = action.payload.talk
      state.smoke = action.payload.smoke
      state.speed = action.payload.speed
      state.gender = action.payload.gender
      state.manner = action.payload.manner
    }
  }
})

export let {loginUser, clearUser, changeUser} = user.actions;
export default user