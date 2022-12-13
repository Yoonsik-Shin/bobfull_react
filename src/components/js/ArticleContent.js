import { Form } from 'react-bootstrap';
import { useState } from "react";
import styled from '../css/Button.module.css';

function ContentCheck(props) {

  return (
    <>
      {!props.commu ?
        <>
          <Form.Group className={styled.passworddiv} controlId="exampleForm.ControlTextarea1">
            <textarea
              type='text'
              aria-describedby="contentHelpBlock"
              placeholder={props.name + ' 추가...'}
              onChange={props.handleContent}
              className='form-control'
              style={{ height: '38px' }}
            />
          </Form.Group>
        </> :
        <>
          <Form.Group className={styled.passworddiv} controlId="exampleForm.ControlTextarea1">
            <textarea
              type='text'
              aria-describedby="contentHelpBlock"
              placeholder={props.commu}
              onChange={props.handleContent}
              className='form-control'
              style={{ height: '120px' }}
            />
          </Form.Group>
        </>
      }
    </>
  );
}

export default ContentCheck;