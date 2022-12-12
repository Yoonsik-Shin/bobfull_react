import { Form } from 'react-bootstrap';
import { useState } from "react";
import styled from '../css/Button.module.css';

function ContentCheck(props) {

  return (
    <>
      <Form.Group className={styled.passworddiv} controlId="exampleForm.ControlTextarea1">
        <textarea
          type='text'
          aria-describedby="contentHelpBlock"
          placeholder="내용"
          onChange={props.handleContent}
          className='form-control'
          style={{ height: '10vh' }}
        />
      </Form.Group>
    </>
  );
}

export default ContentCheck;