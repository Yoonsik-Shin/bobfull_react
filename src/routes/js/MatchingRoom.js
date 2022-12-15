import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import "../css/MatchingRoom.css";
import CreateForm from "../../components/js/CreateMatchingForm";
import "moment/locale/ko";
import Topnavbar from "../../../src/components/js/Topnavbar";
import moment from "moment";
import "moment/locale/ko";

var baseURL = process.env.REACT_APP_BASE_URL;

function MatchingRoom() {
  const user = useSelector((state) => state.user);
  let { id } = useParams();
  const [matchList, setMatchList] = useState();
  const [formModal, setFormModal] = useState(false);
  const [responseChat, setResponseChat] = useState([]);
  const [resId, setResId] = useState();
  const [resName, setResName] = useState();
  const [success, setSuccess] = useState();

  const getMatchingRoom = async () => {
    const matchingRoom = await axios({
      method: "get",
      url: `${baseURL}/articles/${id}/matching_room/`,
    });
    console.log(matchingRoom.data);
    setMatchList(matchingRoom.data);
  };

  const getRes = async () => {
    const res = await axios.get(`${baseURL}/restaurant/${id}/`, {
      headers: { "Content-Type": "application/json" },
    });
    setResName(res.data.name);
    setResId(res.data.id);
  };

  useState(() => {
    getRes();
    getMatchingRoom();
  }, []);

  // 채팅룸 번호 받은 후 방생성 실행
  useEffect(() => {
    createChatRoom();
    getMatchingRoom();
  }, [responseChat]);

  // 매칭룸 생성후 id값 받아 채팅룸 생성하는 함수
  const createChatRoom = async () => {
    const autoCreate = await axios({
      method: "post",
      url: `${baseURL}/multichat/${responseChat}/create/`,
    });
    setSuccess(autoCreate.data);
  };

  // 채팅방 생성 후 매칭룸 불러오기
  useState(() => {
    getMatchingRoom();
  }, [success]);

  return (
    <>
      {formModal ? (
        <div className="bga-black">
          <Container>
            <div class="bg-white">
              <CreateForm
                getMatchingRoom={getMatchingRoom}
                responseChat={responseChat}
                setResponseChat={setResponseChat}
                id={id}
                matchList={matchList}
                resName={resName}
                setFormModal={setFormModal}
              />
            </div>
          </Container>
        </div>
      ) : null}
      <Container style={{ position: "relative" }}>
        {matchList ? (
          <Topnavbar
            key="roul"
            pagename={`매칭룸 리스트 : ${resName} #${resId}  `}
          />
        ) : null}
        <div class="form-btn-position">
          <button
            onClick={() => {
              setFormModal(!formModal);
            }}
            className="matching-create-btn"
          >
            매칭룸 생성하기
          </button>
        </div>
        {matchList
          ? matchList.map((el, idx) => {
              return (
                <Card style={{ marginBottom: "10px" }} key={idx}>
                  <Card.Body>
                    <Card.Title style={{ marginBottom: "15px" }}>
                      #{el.id} {el.title}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      호스트 :{" "}
                      {el.user.profile_image ? (
                        <img src={el.user.profile_image} alt="" width="20px" />
                      ) : (
                        <img src="/basic_profile_img.png" width="20px" />
                      )}
                      {el.user.nickname}
                    </Card.Subtitle>
                    <div>음식점명 : {el.restaurant_name}</div>
                    <div>매칭룸 내용 : {el.content}</div>
                    <div>
                      약속시간 : {moment(el.to_date).format("MM/D a h:mm")}
                    </div>
                    <div>현재 멤버수 : {el.member.length}</div>
                    {el.member.length >= 4 ? (
                      <div>
                        4/4 인원초과<br></br>
                      {
                        el.member.includes(user.id) ? <Link className="matching-detail-btn-tt" to={`/matching_room/${id}/${el.id}`}>자세히보기 (참여중)</Link> : null 
                      }
                        </div>
                    ) : (
                      <div>
                      {
                        el.member.includes(user.id) ?
                        <Link className="matching-link" to={`/matching_room/${id}/${el.id}`}>자세히보기 (참여중)</Link>
                        : <Link className="matching-link"to={`/matching_room/${id}/${el.id}`}>자세히보기</Link>
                      }
                      </div>
                    )}

                  </Card.Body>
                </Card>
              );
            })
          : null}
      </Container>
    </>
  );
}

export default MatchingRoom;
