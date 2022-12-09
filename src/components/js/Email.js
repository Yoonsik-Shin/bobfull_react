import { Form } from 'react-bootstrap';

function EmailCheck(props) {
  return (
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Control type="email" placeholder="이메일주소" onChange={props.handleInputId} />
    </Form.Group>
  );
}

export default EmailCheck