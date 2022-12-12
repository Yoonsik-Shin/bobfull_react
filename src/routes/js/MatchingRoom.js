import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import "../css/MatchingRoom.css";
import Button from "react-bootstrap/Button";
import moment from "moment";
import "moment/locale/ko";

var baseURL = process.env.REACT_APP_BASE_URL;

function MatchingRoom() {
  let { id } = useParams();
  const [matchList, setMatchList] = useState();
  const [formModal, setFormModal] = useState(false);

  const getMatchingRoom = async () => {
    const matchingRoom = await axios({
      method: "get",
      url: `${baseURL}/articles/${id}/matching_room/`,
    });
    setMatchList(matchingRoom.data);
  };

  useState(() => {
    getMatchingRoom();
  }, [matchList]);

  return (
    <Container>
      <div className="matching-titles">
        <h2 className="matching-title">매칭룸 리스트</h2>
        <Button
          variant="primary"
          className="matchingBtn"
          onClick={() => {
            setFormModal(!formModal);
          }}
        >
          매칭룸 생성하기
        </Button>
      </div>
      {formModal ? <CreateForm getMatchingRoom={getMatchingRoom} /> : null}
      {matchList
        ? matchList.map((el) => {
            return (
              <Card style={{ marginBottom: "10px", marginTop: "10px" }}>
                <Card.Body>
                  <Card.Title>{el.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    by {el.nickname}
                  </Card.Subtitle>
                  <div>음식점 : {el.restaurant_name}</div>
                  <div>내용 : {el.content}</div>
                  <div>
                    생성시간 : {moment(el.to_date).format("MM/D a h:mm")}
                  </div>
                  <div>참여멤버 수 : {el.member.length}명</div>
                  <Link
                    className="matchingLink"
                    to={`/matching_room/${id}/${el.id}`}
                  >
                    자세히보기
                  </Link>
                </Card.Body>
              </Card>
            );
          })
        : null}
    </Container>
  );
}

export default MatchingRoom;

function CreateForm(props) {
  const user = useSelector((state) => state.user);
  let { id } = useParams();
  const [hostInfo, setHostInfo] = useState({
    title: null,
    from_date: null,
    to_date: null,
    content: null,
    member: [user.id],
  });

  const titleInput = (e) => {
    setHostInfo({ ...hostInfo, title: e.target.value });
  };
  const contentInput = (e) => {
    setHostInfo({ ...hostInfo, content: e.target.value });
  };
  const endTimeInput = (e) => {
    setHostInfo({ ...hostInfo, to_date: e.target.value });
  };

  const createMatchingRoom = async (e) => {
    e.preventDefault();
    const createRoom = await axios({
      method: "post",
      url: `${baseURL}/articles/${id}/matching_room/`,
      data: hostInfo,
    });
    setHostInfo({ ...hostInfo, ...createRoom.data });
  };

  useEffect(() => {
    props.getMatchingRoom();
  }, [hostInfo]);

  return (
    <Container className="matching-container">
      <Form onSubmit={createMatchingRoom}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control
            type="text"
            placeholder="매칭룸명"
            onChange={titleInput}
            required
          />
          <Form.Control
            type="text"
            placeholder="매칭룸내용"
            onChange={contentInput}
            required
          />
          <Form.Control
            type="datetime-local"
            onChange={endTimeInput}
            name="약속종료시간"
            required
          />
        </Form.Group>
        <Button variant="primary" className="matchingBtn">
          매칭룸 생성
        </Button>
      </Form>
    </Container>
  );
}
