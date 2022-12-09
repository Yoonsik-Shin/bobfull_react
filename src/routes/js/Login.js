import { Container, Form } from 'react-bootstrap';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearUser } from '../../store/userSlice.js';
import PasswordCheck from '../../components/js/Password.js'
import EmailCheck from '../../components/js/Email.js'
import KakaoLogin from '../../components/js/KakaoLogin.js'
import GoogleLogin from '../../components/js/GoogleLogin.js'
import '../css/Login.css'

function Login() {
  var baseURL = process.env.REACT_APP_BASE_URL // 환경변수설정
  let dispatch = useDispatch();

  const [inputId, setInputId] = useState('') // 아이디
  const [inputPw, setInputPw] = useState('') // 비밀번호
  const [loading, setLoading] = useState(false) // 로딩
  const [msg, setMsg] = useState("")  // 메시지
  const handleInputId = (e) => {  // 아이디 값 받기
    setInputId(e.target.value)
  }
  const handleInputPw = (e) => {  // 비밀번호 값 받기
    setInputPw(e.target.value)
  }

  const LoginFunc = (e) => {
    e.preventDefault();
    if (!inputId) {
      return alert("ID를 입력하세요.");
    }
    else if (!inputPw) {
      return alert("Password를 입력하세요.");
    } else {
      axios({
        method: 'post',
        url: `${baseURL}/accounts/login/`,
        headers: { 'Content-Type': 'application/json' },
        data: {
          email: inputId,
          password: inputPw
        }
      })
        .then((res) => {
          if (res.status === 200) {
            dispatch(loginUser({ ...res.data.user, ...res.data.user.profile, access_token: res.data.access_token, refresh_token: res.data.refresh_token }))
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.access_token}`
            localStorage.setItem('Authorization', `Bearer ${res.data.access_token}`)
            setMsg("")
            alert('성공적으로 로그인 되었습니다.')
          }
        })
        .catch((err) => {
          console.log(err)
          if (err.code === 'ERR_BAD_REQUEST') {
            setMsg("ID, Password가 비어있습니다.");
            alert('비밀번호나 이메일이 다릅니다.')
          }
        })
    }
    setLoading(true);
  }

  useEffect(() => {
    if (msg) {
      setTimeout(() => {
        setMsg("");
        setLoading(false);
      }, 1500);
    }
  }, [msg])

  return (
    <Container className='login-container'>
      <div className='login-layout'>
        <div className='login-logo'>
          <img src="/logo.png" alt="" width="100px" />
        </div>
        <h3 className='text-center mb-4'>간편하게 로그인하고
          <br /><span>다양한 서비스를 이용하세요</span></h3>
        <Form onSubmit={LoginFunc} className="login-form">
          <EmailCheck handleInputId={handleInputId} />
          <PasswordCheck handleInputPw={handleInputPw} />
          <div className='login-btn'>
            <button type='submit' disabled={loading}>로그인</button>
          </div>
        </Form>
        <GoogleLogin />
        <KakaoLogin />
        <div className='login-menu'>
          <div>아이디 찾기</div>
          <div>비밀번호 찾기</div>
          <Link to='/signup' style={{ textDecoration: 'none', color: 'black' }}>회원가입</Link>
        </div>
      </div>
    </Container>
  )
}


export default Login;
