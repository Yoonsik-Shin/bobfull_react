import axios from 'axios';
import { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import styled from '../../components/css/Button.module.css';

var baseURL = process.env.REACT_APP_BASE_URL

function Signup() {
  let navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const emailInput = (e) => {
    setEmail(e.target.value)
  }
  const passwordInput1 = (e) => {
    setPassword1(e.target.value)
  }
  const passwordInput2 = (e) => {
    setPassword2(e.target.value)
  }
  const [passwordType1, setPasswordType1] = useState({
    type: 'password',
    visible: false
  });
  const [passwordType2, setPasswordType2] = useState({
    type: 'password',
    visible: false
  });

  //password type 변경하는 함수
  const handlePasswordType1 = e => {
    setPasswordType1(() => {
      if (!passwordType1.visible) {
        return { type: 'text', visible: true };
      }
      return { type: 'password', visible: false };
    })
  }
  const handlePasswordType2 = e => {
    setPasswordType2(() => {
      if (!passwordType2.visible) {
        return { type: 'text', visible: true };
      }
      return { type: 'password', visible: false };
    })
  }
  const onSubmit = (e) => {
    if (password1 !== password2) {
      return toast.error('비밀번호가 서로 다릅니다.')
    }
    e.preventDefault();
    axios({
      method: 'post',
      url: `${baseURL}/accounts/registration/`,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
        Pragma: 'no-store',
        Expires: '0',
      },
      data: {
        email: email,
        password1: password1,
        password2: password2,
      }
    })
      .then(res => {
        console.log(res)
        if (res.status === 201) {
          setTimeout(() => toast.success("성공적으로 회원가입이 되었습니다."), 200);
          return navigate('/login') // 회원가입 성공시 로그인페이지로
        }
      })
      .catch((err) => {
        console.log(err)
        return toast.error('잘못된 이메일을 입력하셨습니다')

      })
  }
  return (
    <Container style={{ marginTop: '150px' }}>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <h3>밥풀의 멤버가 되어 <br />
        다양한 서비스를 이용해보세요</h3>
      <div className=''>
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Control
              onChange={emailInput}
              value={email}
              type="email"
              placeholder='이메일'
              className='mb-3'
            />
            <div className={styled.passworddiv}>
              <Form.Control
                onChange={passwordInput1}
                value={password1}
                type={passwordType1.type}
                placeholder='비밀번호'
                className='mb-3'
              />
              <span onClick={handlePasswordType1}>
                {passwordType1.visible ? <img className={styled.passwordbtn} src='/hide.png' /> : <img className={styled.passwordbtn} src='/view.png' />}
              </span>
            </div>
            <div className={styled.passworddiv}>
              <Form.Control
                onChange={passwordInput2}
                value={password2}
                type={passwordType2.type}
                placeholder='비밀번호 확인'
              />
              <span onClick={handlePasswordType2}>
                {passwordType2.visible ? <img className={styled.passwordbtn} src='/hide.png' /> : <img className={styled.passwordbtn} src='/view.png' />}
              </span>
            </div>
            <div className='mx-1 mt-2'>
              <Form.Text muted>
                비밀번호는 반드시 8-20 글자 사이여야 합니다.<br />
                문자와 숫자로만 이루어져야 합니다.<br />
                공백이나 특수문자, 이모지등은 불가능합니다.</Form.Text>
            </div>
          </Form.Group>
          <button className={styled.btn} formAction=''>회원가입</button>
        </Form>
      </div>
    </Container>
  );
}
export default Signup;

