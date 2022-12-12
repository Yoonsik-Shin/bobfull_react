import { Form } from 'react-bootstrap';
import { useState } from "react";
import styled from '../css/Button.module.css';

function TitleCheck(props) {

  return (
    <>
      <Form.Group className={styled.passworddiv} controlId="exampleForm.ControlTextarea1">
        <Form.Control
          type='text'
          aria-describedby="titleHelpBlock"
          placeholder="제목"
          onChange={props.handleTitle}
        />
      </Form.Group>
    </>
  );
}

export default TitleCheck;