import { Form } from 'react-bootstrap';

function PasswordCheck(props) {
  return (
    <>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Control
          type="password"
          aria-describedby="passwordHelpBlock"
          placeholder="비밀번호"
          onChange={props.handleInputPw}
        />
      </Form.Group>
    </>
  );
}

export default PasswordCheck