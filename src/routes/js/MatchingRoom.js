import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import "../css/MatchingRoom.css";
import CreateForm from '../../components/js/CreateMatchingForm'
import Button from "react-bootstrap/Button";
import moment from "moment";
import "moment/locale/ko";

var baseURL = process.env.REACT_APP_BASE_URL;

function MatchingRoom() {
  
  const user = useSelector((state) => state.user);
  let { id } = useParams();
  const [matchList, setMatchList] = useState()
  const [formModal, setFormModal] = useState(false)
  const [responseChat, setResponseChat] = useState([])
  const [resId, setResId] = useState()
  const [resName, setResName] = useState()

  const getMatchingRoom = async () => {
    const matchingRoom = await axios({
      method: 'get',
      url: `${baseURL}/articles/${id}/matching_room/`
    })
    console.log(matchingRoom.data) 
    setMatchList(matchingRoom.data)
    setResId(matchingRoom.data[0].restaurant_id)
    setResName(matchingRoom.data[0].restaurant_name)
  }
  useState(() => {
    getMatchingRoom();
  }, [matchList]);


  return (
    <Container>
      <h2>매칭룸 리스트</h2>
      { matchList ? <div>{resId} {resName}</div> : null}
      <button onClick={()=>{setFormModal(!formModal)}}>매칭룸 생성하기</button>
      {formModal ? <CreateForm getMatchingRoom={getMatchingRoom} responseChat={responseChat} setResponseChat={setResponseChat} /> : null}
      {
        matchList ? 
        matchList.map((el, idx) => {
          return (
            <Card style={{marginBottom: '10px', marginTop: '10px'}} key={idx}>
              <Card.Body>
                <Card.Title>#{el.id} {el.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">매칭룸 호스트 : {
                  el.user.profile_image ?
                  <img src={el.user.profile_image} alt="" width='30px' className="profile-img" />
                  : <img src="./basic_profile_img.png" width="45px"className="profile-img"/>
                }
                {el.user.nickname}
                </Card.Subtitle>
                <div>레스토랑명 : {el.restaurant_name}</div>
                <div>매칭룸 내용 : {el.content}</div>
                <div>약속날자/시간 : {el.to_date}</div>
                <div>참여 멤버수 : {el.member.length}</div>
                <div>채팅룸 번호 : {el.chatroom}</div>
                <button><Link to={`/matching_room/${id}/${el.id}`}>자세히보기</Link></button>
                <button><Link to={`/multichat/${el.id}`}>채팅룸</Link></button>
              </Card.Body>
            </Card>
          )
        })
        : null
      }
      
  </Container>
  )
}

export default MatchingRoom