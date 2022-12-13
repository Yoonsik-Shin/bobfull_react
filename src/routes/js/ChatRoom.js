import { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import axios from "axios";
import { useParams, Link } from 'react-router-dom'

var baseURL = process.env.REACT_APP_BASE_URL

function ChatRoom() {
  const { room_id } = useParams()
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
      {
        chatRoomList ?
        chatRoomList.map((el, idx)=> {
          return(
            <div key={idx}>
              <div>{el.id}번째 채팅방</div>
              <div>마지막 채팅시간 : {el.updated_at}</div>
              <div>호스트 정보 : <img src={el.host.profile_image} alt="" width='30px' className="profile-img" /> {el.host.nickname}</div>
              <div>호스트 매너온도 : {el.host.manner}도</div>
              <div>약속 음식점명 : {el.matching_room.restaurant.name} </div>
              <div>약속 시간 : {el.matching_room.to_date} </div>
              <Link to={`/multichat/${el.id}`}>입장하기</Link>
            </div>
          )
        })
        : null
      }
    </Container>
  )
}

export default ChatRoom

