import axios from "axios"
import { useEffect, useState } from "react";
import { Container, Form, Modal, Button } from 'react-bootstrap'
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom'
import RadioButton from '../../components/js/RadioButton.js'
import '../css/CreateMatchingForm.css'
import toast, { Toaster } from "react-hot-toast";

var baseURL = process.env.REACT_APP_BASE_URL

function CreateForm(props) {

  const user = useSelector((state) => state.user);
  const [hostInfo, setHostInfo] = useState({
    title: null,
    to_date: null,
    content: null,
    member: [user.id],
    chk_gender: null,
  })
  const [success, setSuccess] = useState()

  const titleInput = (e) => {
    setHostInfo({ ...hostInfo, title: e.target.value })
  }
  const contentInput = (e) => {
    setHostInfo({ ...hostInfo, content: e.target.value })
  }
  const endTimeInput = (e) => {
    setHostInfo({ ...hostInfo, to_date: e.target.value })
  }
  const checkGenderInput = (e) => {
    setHostInfo({ ...hostInfo, chk_gender: Boolean(e.target.value) })
  }

  // 폼 제출시 매칭룸 생성
  const createMatchingRoom = async (e) => {
    e.preventDefault()
    const createRoom = await axios({
      method: 'post',
      url: `${baseURL}/articles/${props.id}/matching_room/`,
      data: hostInfo
    })
    // 채팅룸 번호 생성성
    props.setResponseChat(createRoom.data.id)
    toast.success('매칭룸이 생성되었습니다.')
    for (let i = 0; i < 3; i++) {
      e.target[i].value = null;
    }
    e.target[3].checked = false;
    e.target[4].checked = false;
    props.setFormModal(false)
  }

  // 채팅룸 번호 받은 후 방생성 실행
  useEffect(() => {
    createChatRoom()
  }, [props.responseChat])

  // 매칭룸 생성후 id값 받아 채팅룸 생성하는 함수
  const createChatRoom = async () => {
    const autoCreate = await axios({
      method: 'post',
      url: `${baseURL}/multichat/${props.responseChat}/create/`
    })
    setSuccess(autoCreate.data)
  }

  // 채팅방 생성 후 매칭룸 불러오기
  useState(() => {
    props.getMatchingRoom();
  }, [success]);
  

  const closeModal = () => {
    props.setFormModal(false)
  }

  return (
    <Container className="abosulte-container">
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      { props.matchList ? <h5>{props.resName} 매칭룸 생성</h5> : null} 
      <Form onSubmit={createMatchingRoom}>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Control type="text" placeholder="매칭룸명" onChange={titleInput} required />
          <Form.Control type="text" placeholder="약속내용" onChange={contentInput} required as="textarea" rows={3} />
          <Form.Control type="datetime-local" onChange={endTimeInput} name="약속종료시간" required />
          <RadioButton checkGenderInput={checkGenderInput}></RadioButton>
        </Form.Group>
          <button type='submit'>생성</button>
      </Form>
          <button onClick={closeModal}>취소</button>
      
    </Container>
  )
}

export default CreateForm
