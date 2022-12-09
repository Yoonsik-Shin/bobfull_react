import axios from 'axios';
import { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styled from '../../components/css/Button.module.css';

function Signup() {
  var baseURL = process.env.REACT_APP_BASE_URL
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
  const onSubmit = (e) => {
    if (password1 !== password2) {
      return alert('비밀번호가 서로 다릅니다.')
    }
    e.preventDefault();
    axios({
      method: 'post',
      url: `${baseURL}/accounts/registration/`,
      headers: {
        'Content-Type': 'application/json'
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
          alert('성공적으로 회원가입 되었습니다.')
          return navigate('/login') // 회원가입 성공시 로그인페이지로
        }
      })
      .catch((err) => {
        console.log(err)
        if (err.code === 'ERR_BAD_REQUEST') {
          return alert('잘못된 이메일을 입력하셨습니다')
        }
      })
  }
  return (
    <Container style={{marginTop: '150px'}}>
      <h3>밥풀의 멤버가 되어 <br/>
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
            <Form.Control
              onChange={passwordInput1}
              value={password1}
              type="password"
              placeholder='비밀번호'
              className='mb-3'
            />
            <Form.Control
              onChange={passwordInput2}
              value={password2}
              type="password"
              placeholder='비밀번호 확인'
            />
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

