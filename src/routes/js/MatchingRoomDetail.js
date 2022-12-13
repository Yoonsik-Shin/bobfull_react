import { useParams, Link } from "react-router-dom";
import { Container, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "../css/MatchingRoomDetail.css";
import Button from "react-bootstrap/Button";
import moment from "moment";
import "moment/locale/ko";

var baseURL = process.env.REACT_APP_BASE_URL;

function MatchingRoomDetail() {
  const user = useSelector((state) => state.user);
  let useParam = useParams();
  const [info, setInfo] = useState();
  const [participation, setParticipation] = useState();
  const [state, setState] = useState();

  const getDetail = async () => {
    const detail = await axios({
      method: "get",
      url: `${baseURL}/articles/${useParam.id}/matching_room/${useParam.detail}`,
    });
    setInfo(detail.data);
    setParticipation(detail.data.member);
    detail.data.member.includes(user.id) ? setState("취소") : setState("참가");
  };

  useEffect(() => {
    getDetail();
  }, []);

  const attendRoom = async () => {
    const attend = await axios({
      method: "post",
      url: `${baseURL}/articles/${useParam.id}/matching_room/${useParam.detail}/add/`,
    });
    alert(attend.data);
    getDetail();
    participation.includes(user.id) ? setState("참가") : setState("취소");
  };

  return (
    <Container style={{ padding: "0" }}>
      <h2 className="detail-title">상세 정보</h2>
      <div className="detail-card">
        {info ? (
          <>
            <div>
              <div>음식점 : {info.restaurant_name}</div>
              <div>내용 : {info.content}</div>
              <div>
                약속시간 : {moment(info.from_date).format("MM/D a h:mm")}
              </div>
              <div>
                참여멤버 :{" "}
                {info.member.map((member) => {
                  return `${member}번 `;
                })}
              </div>
            </div>
          </>
        ) : null}
        { state == '참가' ? null : <div>매칭참가중</div> }
        <button onClick={attendRoom} className="matchingBtn">매칭 {state}하기</button>
        {
          info && participation.includes(user.id) ? 
          <div className="Btns"><Button className="chattingBtn"><Link to={`/multichat/${useParam.detail}`}>채팅하기</Link></Button></div> 
          : null
        }
      </div>
    </Container>
  );
}

export default MatchingRoomDetail;
