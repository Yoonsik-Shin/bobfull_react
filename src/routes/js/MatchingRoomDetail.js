import { useParams, Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "../css/MatchingRoomDetail.css";
import moment from "moment";
import "moment/locale/ko";
import Topnavbar from "../../../src/components/js/Topnavbar";
import toast, { Toaster } from "react-hot-toast";

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
    toast.success(attend.data);
    getDetail();
    participation.includes(user.id) ? setState("참가") : setState("취소");
  };

  const attendChatting = async () => {
    const autoIn = await axios({
      method: "get",
      url: `${baseURL}/multichat/${useParam.detail}/join/`,
    });
    console.log(autoIn.data);
  };

  const leaveChatting = async () => {
    const autoOut = await axios({
      method: "get",
      url: `${baseURL}/multichat/${useParam.detail}/leave/`,
    });
    console.log(autoOut.data);
  };

  return (
    <Container>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      {info ? <Topnavbar key="roul" pagename={`${info.id}번 매칭룸`} /> : null}
      <div className="detail-card">
        {info ? (
          <>
            <div className="matching-detail-info">
              <h5 className="matching-detail-h5">모임정보</h5>
              <div>음식점명 : {info.restaurant_name}</div>
              <div>
                약속시간 : {moment(info.from_date).format("MM/D a h:mm")}
              </div>
              <div>약속내용 : {info.content}</div>
              <div>참가제한 : {info.chk_gender ? "같은 성별이 편해요" : "성별 상관없어요"} </div>
              <div>
                참여멤버 :{" "}
                {info.member.map((member) => {
                  return `${member}번 `;
                })}
              </div>
            </div>
            <div>
              <h5 className="matching-detail-h5">호스트 정보</h5>
              <div>
                {info.user.nickname} #{info.user.pk}{" "}
              </div>
              <div>{info.user.gender ? "여성" : "남성"}</div>
              <div>매너온도 : {info.user.manner}도</div>
              <div>식사속도 : {info.user.speed}</div>
              <div>대화여부 : {info.user.talk ? "O" : "X"} </div>
              <div>음주여부 : {info.user.alcohol ? "O" : "X"} </div>
              <div>흡연여부 : {info.user.smoke ? "O" : "X"} </div>
            </div>
          </>
        ) : null}
        {info && state == "참가" ? (
          <button
            onClick={() => {
              attendRoom();
              setTimeout(() => attendChatting(), 500);
            }}
            className="matchingDetailBtn"
          >
            매칭 {state}하기
          </button>
        ) : (
          <>
            <div>매칭참가중</div>

          </>
        )}
        {info && participation.includes(user.id) ? (
          <div className="Btns">
            <button
              onClick={() => {
                attendRoom();
                leaveChatting();
              }}
              className="matchingDetailBtn"
            >
              매칭 {state}하기
            </button>
            <button className="chattingRoomBtn">
              <Link to={`/multichat/${useParam.detail}`}>채팅하기</Link>
            </button>
            <button className="evaluateRoomBtn">
              <Link to={`/matching_room/review/${useParam.id}/${useParam.detail}`}>매칭룸 평가하기</Link>
            </button>
          </div>
        ) : null}
      </div>
      {/* <button onClick={leaveChatting}>싱크맞추기 : 채팅룸나가기</button>
      <button onClick={attendChatting}>싱크맞추기 : 채팅룸들어가기</button> */}
    </Container>
  );
}

export default MatchingRoomDetail;
