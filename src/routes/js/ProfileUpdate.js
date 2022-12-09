import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import '../../components/css/Profileupdate.css';
import { useEffect, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { changeUser } from '../../store/userSlice.js';

function ProfileAdd() {
  let dispatch = useDispatch();
  var baseURL = process.env.REACT_APP_BASE_URL
  const user = useSelector((state) => state.user);
  const [userState, setUserState] = useState({
    email: user.email ? user.email : `kakaoUser${user.pk}@kakao.com`,
    nickname: user.nickname ? user.nickname : null,
    gender: user.gender,
    smoke: user.smoke,
    alcohol: user.alcohol,
    talk: user.talk,
    speed: user.speed
  })

  const ProfileUpdate = (e) => {
    e.preventDefault();
    axios({
      method: 'put',
      url: `${baseURL}/accounts/user/`,
      headers: { 'Content-Type': 'application/json' },
      data: userState
    })
      .then((res) => {
        dispatch(changeUser({...user, ...userState}))
        alert('성공적으로 업데이트 되었습니다')
      })
  }

  const nicknameInput = (e) => {  // 아이디 값 받기
    setUserState({...user, nickname: e.target.value})
  }
  
  return (
    <Container>
      <Form onSubmit={ProfileUpdate}>
        <h3 className="text-center my-5">프로필을 입력하면<br />나와 더 잘 맞는<br /> 밥풀을 만날 수 있어요.</h3>
        <Form.Control type='text' defaultValue={user.nickname} placeholder={'닉네임을 입력해주세요'} onChange={nicknameInput} name="nickname"/>
        <div className="d-flex align-items-center justify-content-between me-5 px-5">
          <h2 className="me-5 my-0">성별</h2>
          <label className="gender-button">
            {user.gender ? 
              <input type="checkbox" defaultChecked onClick={()=>setUserState({...userState, gender: !user.gender})}/> 
              : <input type="checkbox" onClick={()=>setUserState({...userState, gender: !user.gender})}/>}
            <span className="onoff-switch"></span>
          </label>
        </div>
        <div className="d-flex align-items-center justify-content-between me-5 px-5">
          <h2 className="me-5 my-0">흡연</h2>
          <label className="smoke-button">
            {user.smoke ? 
              <input type="checkbox" onClick={()=>setUserState({...userState, smoke: !user.smoke})} /> 
              : <input type="checkbox" defaultChecked onClick={()=>setUserState({...userState, smoke: !user.smoke})} />}
            <span className="onoff-switch"></span>
          </label>
        </div>
        <div className="d-flex align-items-center justify-content-between me-5 px-5">
          <h2 className="me-5 my-0">음주</h2>
          <label className="alcohol-button">
            {
              user.alcohol ? 
                <input type="checkbox" onClick={()=>setUserState({...userState, alcohol: !user.alcohol})}/> 
                : <input type="checkbox" defaultChecked onClick={()=>setUserState({...userState, alcohol: !user.alcohol})}/>
            }
            <span className="onoff-switch"></span>
          </label>
        </div>
        <div className="d-flex align-items-center justify-content-between me-5 px-5">
          <h2 className="me-5 my-0">대화</h2>
          <label className="talk-button">
            {
              user.talk ? 
                <input type="checkbox" onClick={()=>setUserState({...userState, talk: !user.talk})} />
                : <input type="checkbox" defaultChecked onClick={()=>setUserState({...userState, talk: !user.talk})} />
            }
            <span className="onoff-switch"></span>
          </label>
        </div>
        <br />
        <h2>식사 속도</h2>
        <div className="select d-flex justify-content-between">
          {user.speed === 1 ? <input type="radio" id="select1" name="speed" defaultChecked  onClick={()=>setUserState({...userState, speed: 1})}/> : <input type="radio" id="select1" name="speed"  onClick={()=>setUserState({...userState, speed: 1})}/>}<label htmlFor="select1"><img className="speedimg" src="/snail.png" /></label>
          {user.speed === 2 ? <input type="radio" id="select2" name="speed" defaultChecked  onClick={()=>setUserState({...userState, speed: 2})}/> : <input type="radio" id="select2" name="speed"  onClick={()=>setUserState({...userState, speed: 2})}/>}<label htmlFor="select2"><img className="speedimg" src="/turtle.png" /></label>
          {user.speed === 3 ? <input type="radio" id="select3" name="speed" defaultChecked  onClick={()=>setUserState({...userState, speed: 3})}/> : <input type="radio" id="select3" name="speed"  onClick={()=>setUserState({...userState, speed: 3})}/>}<label htmlFor="select3"><img className="speedimg" src="/teddy-bear.png" /></label>
          {user.speed === 4 ? <input type="radio" id="select4" name="speed" defaultChecked  onClick={()=>setUserState({...userState, speed: 4})}/> : <input type="radio" id="select4" name="speed"  onClick={()=>setUserState({...userState, speed: 4})}/>}<label htmlFor="select4"><img className="speedimg" src="/cheetah.png" /></label>
          {user.speed === 5 ? <input type="radio" id="select5" name="speed" defaultChecked  onClick={()=>setUserState({...userState, speed: 5})}/> : <input type="radio" id="select5" name="speed"  onClick={()=>setUserState({...userState, speed: 5})}/>}<label htmlFor="select5"><img className="speedimg" src="/growth.png" /></label>
        </div>
        <div className='login-btn'>
          <button type='submit'>수정</button>
        </div>
      </Form>
    </Container>
  )
}

export default ProfileAdd