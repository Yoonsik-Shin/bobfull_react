import { Container, Form } from "react-bootstrap"
import axios from "axios";
import { useParams } from 'react-router-dom'
import { useState } from "react";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query' 

var baseURL = process.env.REACT_APP_BASE_URL

function ChatRoomDetail() {
  
  const { room_id } = useParams()
  const [inputChating, setInputChating] = useState()
  const handleInputChat = (e) => {
    setInputChating(e.target.value)
  }
  const [messages, setMessages] = useState()
  const interval = 2000
  const getMessages = useQuery(['Messages'], ()=>
    axios({
      method: 'get',
      url: `${baseURL}/multichat/${room_id}/`
    })
      .then((res)=>{
        console.log(res.data)
        return res.data
      }),
    {refetchInterval : interval},
    {cacheTime: interval},
    {staleTime: interval}
  )


  return (
    <Container>
      <div>채팅방 디테일</div>
      <div>채팅내용</div>
      { getMessages.isLoading && '로딩중' }
      { getMessages.error && '에러남' }
      { getMessages.data &&getMessages.data.map((el, idx) => {
        return (
          <div key={idx}>
            <div>채팅내용 : {el.content} || 보낸사람 : {el.sender.nickname}</div>
          </div>
        )
      }) }
      <SendChat room_id={room_id} setInputChating={setInputChating} inputChating={inputChating} handleInputChat={handleInputChat}/>
    </Container>
  )
}

export default ChatRoomDetail

function SendChat(props) {

  const sending = async (e) => {
    e.preventDefault();
    const sendingCheck = await axios({
      method: 'post',
      url: `${baseURL}/multichat/${props.room_id}/send/`,
      data: {content : props.inputChating}
    }) 
    console.log(sendingCheck.data)
  } 
  console.log(props.inputChating)
  return(
    <Form onSubmit={sending}>
      <Form.Control type="text" onChange={props.handleInputChat}></Form.Control>
      <button>보내기</button>
    </Form>
  )
}