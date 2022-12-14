import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "../css/ChatRoom.css";
import moment from "moment";
import "moment/locale/ko";
import Topnavbar from "../../../src/components/js/Topnavbar";

var baseURL = process.env.REACT_APP_BASE_URL;

function ChatRoom() {
  const { room_id } = useParams();
  const [chatRoomList, setChatRoomList] = useState();
  const getChatRoomList = async () => {
    const list = await axios({
      method: "get",
      url: `${baseURL}/multichat/`,
    });
    setChatRoomList(list.data);
  };

  useEffect(() => {
    getChatRoomList();
  }, []);

  const detailDate = (a) => {
    const milliSeconds = new Date() - a;
    const seconds = milliSeconds / 1000;
    if (seconds < 60) return `방금 전`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;
    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;
    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일 전`;
    const weeks = days / 7;
    if (weeks < 5) return `${Math.floor(weeks)}주 전`;
    const months = days / 30;
    if (months < 12) return `${Math.floor(months)}개월 전`;
    const years = days / 365;
    return `${Math.floor(years)}년 전`;
  };

  return (
    <Container>
      <Topnavbar key="res" pagename={"채팅방 리스트"} />
      {chatRoomList
        ? chatRoomList.map((el, idx) => {
            return (
              <div key={idx} className="chatroom-card">
                <div>
                  #{el.id} 채팅방 | {detailDate(new Date(el.updated_at))}
                </div>
                <div>
                  호스트 정보 :{" "}
                  {el.host.profile_image ? (
                    <img
                      src={el.host.profile_image}
                      alt=""
                      width="20px"
                      className="chatting-profile-img"
                    />
                  ) : (
                    <img
                      src="/basic_profile_img.png"
                      width="20px"
                      className="chatting-profile-img"
                    />
                  )}
                  {el.host.nickname}
                </div>
                <div>호스트 매너온도 : {el.host.manner}도</div>
                <div>상호명 : {el.matching_room.restaurant.name} </div>
                <div>
                  약속시간 :{" "}
                  {moment(el.matching_room.to_date).format("MM/D a h:mm")}{" "}
                </div>
                <Link className="chatting-link" to={`/multichat/${el.id}`}>
                  입장하기
                </Link>
              </div>
            );
          })
        : null}
    </Container>
  );
}

export default ChatRoom;
