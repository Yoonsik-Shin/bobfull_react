import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCode } from "../../store/KakaoAuth.js";
import { Spinner } from 'react-bootstrap';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { loginUser, clearUser } from '../../store/userSlice.js'

const GoogleAuth = () => {
  const dispatch = useDispatch()
  const code = new URL(window.location.href).searchParams.get('code')
  console.log(window.location.href)
  console.log(code)
  let navigate = useNavigate()

  useEffect(() => {
    dispatch(setCode({code: code}))
    axios({
      method: 'get',
      url: `http://localhost:8000/accounts/google/callback/?code=${code}`,
    })
      .then((res) => {
        console.log({...res.data.user})
        dispatch(loginUser({...res.data.user, access_token: res.data.access_token, refresh_token: res.data.refresh_token}))
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.access_token}`
        localStorage.setItem('Authorization', `Bearer ${res.data.access_token}`)
        alert('정상적으로 로그인 되었습니다.')
        navigate('/profile')
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  
  return (
    <>
      <Spinner animation="border" />
    </>
  )
}

export default GoogleAuth