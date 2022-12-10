import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { changeUser } from '../../store/userSlice.js';
import { useNavigate } from 'react-router-dom';

function ProfileImage() {
  return (
    <Form onSubmit={ProfileUpdate}>
      <Form.Control type='file' onChange={imgaeInput} accept="image/*" name='profile_image'/>
    </Form>
  )
}