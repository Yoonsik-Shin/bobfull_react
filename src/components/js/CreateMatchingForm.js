import axios from "axios"
import { useEffect, useState } from "react";
import { Container, Form } from 'react-bootstrap'
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom'

var baseURL = process.env.REACT_APP_BASE_URL

function CreateForm(props) {

  const user = useSelector((state) => state.user);
  let { id } = useParams();
  const [hostInfo, setHostInfo] = useState({
    title: null,
    to_date: null,
    content: null,
    member: [user.id]
  })

  const titleInput = (e) => {
    setHostInfo({...hostInfo, title: e.target.value})
  }
  const contentInput = (e) => {
    setHostInfo({...hostInfo, content: e.target.value})
  }
  const endTimeInput = (e) => {
    setHostInfo({...hostInfo, to_date: e.target.value})
  }

  const createMatchingRoom = async (e) => {
    e.preventDefault()
    const createRoom = await axios({
      method: 'post',
      url: `${baseURL}/articles/${id}/matching_room/`,
      data: hostInfo
    })
    setHostInfo({...hostInfo, ...createRoom.data})
    props.setResponseChat(createRoom.data.id)
    console.log(createRoom.data)
    
  }
  
  useEffect(()=>{
    props.getMatchingRoom()
  }, [hostInfo])

  useEffect(() => {
    axios({
      method: 'post',
      url: `${baseURL}/multichat/${props.responseChat}/create/`
    }) 
      .then((res)=>{
        let copy = [...props.responseChat] 
        copy.push(res.data)       
        props.setResponseChat(copy)
      })
  }, [props.responseChat])

  return (
    <Container>
      <Form onSubmit={createMatchingRoom}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control type="text" placeholder="매칭룸명" onChange={titleInput} required/>
          <Form.Control type="text" placeholder="매칭룸내용" onChange={contentInput} required/>
          <Form.Control type="datetime-local" onChange={endTimeInput} name="약속종료시간" required/>
        </Form.Group>
        <button>매칭룸 생성</button>
      </Form>
    </Container>
  )
}

export default CreateForm