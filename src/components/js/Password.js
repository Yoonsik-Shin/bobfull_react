import { Form } from 'react-bootstrap';
import { useState } from "react";
import styled from '../css/Button.module.css';

function PasswordCheck(props) {
  const [passwordType, setPasswordType] = useState({
    type: 'password',
    visible: false
  });

  //password type 변경하는 함수
  const handlePasswordType = e => {
    setPasswordType(() => {
      if (!passwordType.visible) {
        return { type: 'text', visible: true };
      }
      return { type: 'password', visible: false };
    })
  }
  return (
    <>
      <Form.Group className={styled.passworddiv} controlId="exampleForm.ControlTextarea1">
        <Form.Control
          type={passwordType.type}
          aria-describedby="passwordHelpBlock"
          placeholder="비밀번호"
          onChange={props.handleInputPw}
        />
        <span onClick={handlePasswordType}>
          {passwordType.visible ? <img className={styled.passwordbtn} src='/hide.png' /> : <img className={styled.passwordbtn} src='/view.png' />}
        </span>
      </Form.Group>
    </>
  );
}

export default PasswordCheck