import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "../../components/css/Profileupdate.css";
import { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { changeUser } from "../../store/userSlice.js";
import { useNavigate } from "react-router-dom";
import Topnavbar from "../../../src/components/js/Topnavbar";
import toast, { Toaster } from "react-hot-toast";

var baseURL = process.env.REACT_APP_BASE_URL;

function ProfileAdd() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const [imgData, setImgData] = useState()
  const user = useSelector((state) => state.user);
  const formData = new FormData();
  const [userState, setUserState] = useState({
    email: user.email ? user.email : `kakaoUser${user.id}@kakao.com`,
    nickname: user.nickname ? user.nickname : null,
    gender: user.gender,
    smoke: user.smoke,
    alcohol: user.alcohol,
    talk: user.talk,
    speed: user.speed,
  });
  const ProfileUpdate = async (e) => {
    e.preventDefault();
    let copy = { ...userState };
    Object.entries(copy).map(([key, value]) => {
      formData.append(`${key}`, value);
    });
    formData.append('profile_image', imgData)

    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]);
    }

    await axios({
      method: "put",
      url: `${baseURL}/accounts/user/`,
      processData: false,
      data: formData,
    }).then((res) => {
      console.log(res.data)
      dispatch(changeUser({ ...res.data }));
      setTimeout(() => toast.success("성공적으로 업데이트 되었습니다."), 200);
      navigate("/profile");
    });
  };
  const nicknameInput = (e) => {
    // 아이디 값 받기
    setUserState({ ...userState, nickname: e.target.value });
  };
  const [url, setUrl] = useState(user.profile_image ? user.profile_image : '')
  const imageInput = (file) => {
    formData.append("profile_image", file.target.files[0]);
    setImgData(file.target.files[0])
    console.log(file.target.files[0]);
    setUrl(URL.createObjectURL(file.target.files[0]))
  };
  return (
    <Container>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Topnavbar key="roul" pagename="프로필 업데이트" />
      <Form onSubmit={ProfileUpdate}>
        <h3 className="text-center mb-4">
          프로필을 입력하면
          <br />
          나와 더 잘 맞는
          <br /> 밥풀을 만날 수 있어요.
        </h3>
        <div>
          <div className="mt-3 mx-2">
            <h2 className="me-5 mt-4">닉네임</h2>
            <Form.Control
              type="text"
              defaultValue={user.nickname}
              placeholder={"닉네임을 입력해주세요"}
              onChange={nicknameInput}
              name="nickname"
              className="mt-3"
            />
          </div>
          <hr className="my-4" />
          <h2 className="ms-2 mb-4">이미지 </h2>
          <div className='d-flex justify-content-evenly align-items-center'>
            <div className="text-center" >
              {
                url ?
                  <img src={url} alt=""
                    className="profileimg" id="profile_img_load" />
                  : <> 
                    {
                      user.profile_image ?
                      <img src={user.profile_image} className="profileimg" id="profile_img_load"/>
                      : <img src="/basic_profile_img.png" className="profileimg" id="profile_img_load"/>
                    }</>
              }
            </div>
            <Form.Control
              className="file-form"
              type="file"
              onChange={imageInput}
              accept="image/*"
              name="profile_image"
              id='profile_img_upload'
            />
            <label for='profile_img_upload'><i class="far fa-file-image" />파일 선택</label>
          </div>
        </div>
        <hr className="my-4" />
        <h2 className="ms-2">성별 및 식사 성향</h2>
        <div className="d-flex align-items-center justify-content-between me-5 px-5">
          <h2 className="me-5 my-0">성별</h2>
          <label className="gender-button">
            {user.gender ? (
              <input
                type="checkbox"
                defaultChecked
                onClick={() =>
                  setUserState({ ...userState, gender: !user.gender })
                }
              />
            ) : (
              <input
                type="checkbox"
                onClick={() =>
                  setUserState({ ...userState, gender: !user.gender })
                }
              />
            )}
            <span className="onoff-switch"></span>
          </label>
        </div>
        <div className="d-flex align-items-center justify-content-between me-5 px-5">
          <h2 className="me-5 my-0">흡연</h2>
          <label className="smoke-button">
            {user.smoke ? (
              <input
                type="checkbox"
                onClick={() =>
                  setUserState({ ...userState, smoke: !user.smoke })
                }
              />
            ) : (
              <input
                type="checkbox"
                defaultChecked
                onClick={() =>
                  setUserState({ ...userState, smoke: !user.smoke })
                }
              />
            )}
            <span className="onoff-switch"></span>
          </label>
        </div>
        <div className="d-flex align-items-center justify-content-between me-5 px-5">
          <h2 className="me-5 my-0">음주</h2>
          <label className="alcohol-button">
            {user.alcohol ? (
              <input
                type="checkbox"
                onClick={() =>
                  setUserState({ ...userState, alcohol: !user.alcohol })
                }
              />
            ) : (
              <input
                type="checkbox"
                defaultChecked
                onClick={() =>
                  setUserState({ ...userState, alcohol: !user.alcohol })
                }
              />
            )}
            <span className="onoff-switch"></span>
          </label>
        </div>
        <div className="d-flex align-items-center justify-content-between me-5 px-5">
          <h2 className="me-5 my-0">대화</h2>
          <label className="talk-button">
            {user.talk ? (
              <input
                type="checkbox"
                onClick={() => setUserState({ ...userState, talk: !user.talk })}
              />
            ) : (
              <input
                type="checkbox"
                defaultChecked
                onClick={() => setUserState({ ...userState, talk: !user.talk })}
              />
            )}
            <span className="onoff-switch"></span>
          </label>
        </div>
        <hr className="my-4" />
        <h2>식사 속도</h2>
        <div className="select d-flex justify-content-between">
          {user.speed === 1 ? (
            <input
              type="radio"
              id="select1"
              name="speed"
              defaultChecked
              onClick={() => setUserState({ ...userState, speed: 1 })}
            />
          ) : (
            <input
              type="radio"
              id="select1"
              name="speed"
              onClick={() => setUserState({ ...userState, speed: 1 })}
            />
          )}
          <label htmlFor="select1">
            <img className="speedimg" src="/snail.png" />
          </label>
          {user.speed === 2 ? (
            <input
              type="radio"
              id="select2"
              name="speed"
              defaultChecked
              onClick={() => setUserState({ ...userState, speed: 2 })}
            />
          ) : (
            <input
              type="radio"
              id="select2"
              name="speed"
              onClick={() => setUserState({ ...userState, speed: 2 })}
            />
          )}
          <label htmlFor="select2">
            <img className="speedimg" src="/turtle.png" />
          </label>
          {user.speed === 3 ? (
            <input
              type="radio"
              id="select3"
              name="speed"
              defaultChecked
              onClick={() => setUserState({ ...userState, speed: 3 })}
            />
          ) : (
            <input
              type="radio"
              id="select3"
              name="speed"
              onClick={() => setUserState({ ...userState, speed: 3 })}
            />
          )}
          <label htmlFor="select3">
            <img className="speedimg" src="/teddy-bear.png" />
          </label>
          {user.speed === 4 ? (
            <input
              type="radio"
              id="select4"
              name="speed"
              defaultChecked
              onClick={() => setUserState({ ...userState, speed: 4 })}
            />
          ) : (
            <input
              type="radio"
              id="select4"
              name="speed"
              onClick={() => setUserState({ ...userState, speed: 4 })}
            />
          )}
          <label htmlFor="select4">
            <img className="speedimg" src="/cheetah.png" />
          </label>
          {user.speed === 5 ? (
            <input
              type="radio"
              id="select5"
              name="speed"
              defaultChecked
              onClick={() => setUserState({ ...userState, speed: 5 })}
            />
          ) : (
            <input
              type="radio"
              id="select5"
              name="speed"
              onClick={() => setUserState({ ...userState, speed: 5 })}
            />
          )}
          <label htmlFor="select5">
            <img className="speedimg" src="/growth.png" />
          </label>
        </div>
        <div className="login-btn">
          <button type="submit">수정</button>
        </div>
      </Form>
    </Container >
  );
}

export default ProfileAdd;
