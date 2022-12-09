import { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import axios from "axios";

var baseURL = process.env.REACT_APP_BASE_URL

function ChatRoom() {

  const [chatRoomList, setChatRoomList] = useState()

  const getChatRoomList = async () => {
    const list = await axios({
      method: 'get',
      url: `${baseURL}/multichat/`
    })
    setChatRoomList(list.data)
  }

  useEffect(()=>{
    getChatRoomList()
  }, [])

  return (
    <Container>
      <div>채팅방</div>
    </Container>
  )
}

export default ChatRoom