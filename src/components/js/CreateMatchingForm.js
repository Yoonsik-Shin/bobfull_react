import axios from "axios"
import { useEffect, useState } from "react";
import { Container, Form } from 'react-bootstrap'
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom'
import RadioButton from '../../components/js/RadioButton.js'
import '../css/CreateMatchingForm.css'
import toast, { Toaster } from "react-hot-toast";

var baseURL = process.env.REACT_APP_BASE_URL

function CreateForm(props) {

  const user = useSelector((state) => state.user);
  let { id } = useParams();
  const [hostInfo, setHostInfo] = useState({
    title: null,
    to_date: null,
    content: null,
    member: [user.id],
    chk_gender: null,
  })


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

  const createMatchingRoom = async (e) => {
    e.preventDefault()
    const createRoom = await axios({
      method: 'post',
      url: `${baseURL}/articles/${id}/matching_room/`,
      data: hostInfo
    })
    setHostInfo({ ...hostInfo, ...createRoom.data })
    for (let i = 0; i < 3; i++) {
      e.target[i].value = null;
    }
    e.target[3].checked = false;
    e.target[4].checked = false;
    toast.success('매칭룸이 생성되었습니다.')
    props.setResponseChat(createRoom.data.id)
    console.log(createRoom.data)
    attendChatting()
  }

  useEffect(() => {
    props.getMatchingRoom()
  }, [hostInfo])

  useEffect(() => {
    axios({
      method: 'post',
      url: `${baseURL}/multichat/${props.responseChat}/create/`
    })
      .then((res) => {
        console.log(res.data.matching_room.id)
        props.setResponseChat(res.data.matching_room.id)
      })
  }, [props.responseChat])

  const attendChatting = async () => {
    const autoIn = await axios({
      method: "get",
      url: `${baseURL}/multichat/${props.responseChat}/join/`
    })
    console.log(autoIn.data)
  }

  return (
    <Container className="abosulte-container">
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Form onSubmit={createMatchingRoom}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control type="text" placeholder="매칭룸명" onChange={titleInput} required />
          <Form.Control type="text" placeholder="매칭룸내용" onChange={contentInput} required as="textarea" rows={3} />
          <Form.Control type="datetime-local" onChange={endTimeInput} name="약속종료시간" required />
          <RadioButton checkGenderInput={checkGenderInput}></RadioButton>
        </Form.Group>
        <button>매칭룸 생성</button>
      </Form>
    </Container>
  )
}

export default CreateForm