import { Container, Form } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../css/ChatRoomDetail.css";
import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { useEffect } from "react";

var baseURL = process.env.REACT_APP_BASE_URL;

function ChatRoomDetail() {
  let navigate = useNavigate();
  const { room_id } = useParams();
  const user = useSelector((state) => state.user);
  const [inputChating, setInputChating] = useState();
  const handleInputChat = (e) => {
    setInputChating(e.target.value);
  };
  const interval = 2000;
  const getMessages = useQuery(
    ["Messages"],
    () =>
      axios({
        method: "get",
        url: `${baseURL}/multichat/${room_id}/`,
      }).then((res) => {
        console.log(res.data);
        return res.data;
      }),
    { refetchInterval: interval },
    { cacheTime: interval },
    { staleTime: interval }
  );

  return (
    <Container className="sending-fix">
      <div className="sending-area-top"></div>
      <div className="sending-topnav">
        <div
          onClick={() => {
            navigate(-1);
          }}
        >
          <img src="/arrow.png" className="sending-img" />
        </div>
        <p className="sending-navtext">{`#${room_id} 채팅방`}</p>
      </div>
      {getMessages.isLoading && "로딩중"}
      {getMessages.error && "에러남"}
      <div className="sending-top-padding">
      {getMessages.data &&
        getMessages.data.map((el, idx) => {
          return (
            <>
              {user.id == el.sender.id ? (
                <div className="chat-box-me">
                  <div key={`unread-${idx}`} className="chat-unread-me">{el.unread}</div>
                  <div key={idx} className="chat-textarea-me">
                    <div className="chat-username">{el.sender.nickname}</div>
                    <div className="chat-text-me">{el.content}</div>
                  </div>
                  <div key={idx}>
                    {el.sender.profile_image ? (
                      <img
                        src={`${el.sender.profile_image}`}
                        width="45px"
                        className="profile-img"
                      />
                    ) : (
                      <img
                        src="/basic_profile_img.png"
                        width="45px"
                        className="profile-img"
                      />
                    )}
                  </div>
                </div>
              ) : (
                <div className="chat-box">
                  <div key={idx}>
                    {el.sender.profile_image ? (
                      <img
                        src={`${el.sender.profile_image}`}
                        width="45px"
                        className="profile-img"
                      />
                    ) : (
                      <img
                        src="/basic_profile_img.png"
                        width="45px"
                        className="profile-img"
                      />
                    )}
                  </div>
                  <div key={idx} className="chat-textarea">
                    <div className="chat-username">{el.sender.nickname}</div>
                    <div className="chat-text">{el.content}</div>
                  </div>
                  <div key={`unread-${idx}`} className="chat-unread">{el.unread}</div>
                </div>
              )}
            </>
          );
        })}
      </div>
      <div className="sendchat">
      <SendChat
        room_id={room_id}
        setInputChating={setInputChating}
        inputChating={inputChating}
        handleInputChat={handleInputChat}
      />
      </div>
    </Container>
  );
}

export default ChatRoomDetail;

function SendChat(props) {
  const sending = async (e) => {
    e.preventDefault();
    const sendingCheck = await axios({
      method: "post",
      url: `${baseURL}/multichat/${props.room_id}/send/`,
      data: { content: props.inputChating },
    });
    console.log(sendingCheck.data);
    e.target[0].value = null;
  };
  console.log(props.inputChating);
  return (
    <>
      <Form onSubmit={sending} className="send-form">
        <Form.Control
          type="text"
          onChange={props.handleInputChat}
        ></Form.Control>
        <button className="sendbtn">보내기</button>
      </Form>
      <div className="sending-area"></div>
    </>
  );
}
