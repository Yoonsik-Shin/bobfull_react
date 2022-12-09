import axios from "axios"
import { useEffect } from "react";
import { useState } from "react"
import { Container, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from 'react-router-dom'

var baseURL = process.env.REACT_APP_BASE_URL

function MatchingRoom() {

  let { id } = useParams();
  const [matchList, setMatchList] = useState()
  const [formModal, setFormModal] = useState(false)

  const getMatchingRoom = async () => {
    const matchingRoom = await axios({
      method: 'get',
      url: `${baseURL}/articles/${id}/matching_room/`
    })
    setMatchList(matchingRoom.data)
  }

  useState(() => {
    getMatchingRoom()
  }, [matchList])

  return (
    <Container>
      <h2>매칭룸 리스트</h2>
      <button onClick={()=>{setFormModal(!formModal)}}>매칭룸 생성하기</button>
      {formModal ? <CreateForm getMatchingRoom={getMatchingRoom}/> : null}
      {
        matchList ? 
        matchList.map((el) => {
          return (
            <>
              <div>레스토랑명 : {el.restaurant}</div>
              <div>매칭룸명 : {el.title}</div>
              <div>매칭룸 내용 : {el.content}</div>
              <div>매칭룸 호스트 : {el.user}</div>
              <div>생성일자 : {el.from_date}</div>
              <div>참여 멤버수 : {el.member.length}</div>
              <Link to={`/matching_room/${id}/${el.id}`}>자세히보기</Link>
            </>
          )
        })
        : null
      }
      
  </Container>
  )
}

export default MatchingRoom
  


function CreateForm(props) {

  const user = useSelector((state) => state.user);
  let { id } = useParams();
  const [hostInfo, setHostInfo] = useState({
    title: null,
    from_date: null,
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
  const startTimeInput = (e) => {
    setHostInfo({...hostInfo, from_date: e.target.value})
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
  }
  
  useEffect(()=>{
    props.getMatchingRoom()
  }, [hostInfo])

  return (
    <Container>
      <Form onSubmit={createMatchingRoom}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control type="text" placeholder="매칭룸명" onChange={titleInput} required/>
          <Form.Control type="text" placeholder="매칭룸내용" onChange={contentInput} required/>
          <Form.Control type="datetime-local" onChange={startTimeInput} name="약속시작시간" required/>
          <Form.Control type="datetime-local" onChange={endTimeInput} name="약속종료시간" required/>
        </Form.Group>
        <button>매칭룸 생성</button>
      </Form>
    </Container>
  )
}

