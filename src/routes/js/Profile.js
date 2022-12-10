import { useDispatch, useSelector } from "react-redux";
import { clearUser, changeUser } from '../../store/userSlice.js';
import { Container, ListGroup } from 'react-bootstrap'
import '../css/Profile.css'
import axios from "axios";
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react";

var baseURL = process.env.REACT_APP_BASE_URL // 환경변수설정

function Profile() {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [state, setState] = useState([false, false, false, false, false, false])
  const [mannerColor, setMannerColor] = useState('lightblue')

  const mannerColorChange = () => {
    if (user.manner <= 36.4) { return setMannerColor('black') }
    if (user.manner >= 40) { return setMannerColor('green') }
    if (user.manner >= 50) { return setMannerColor('orange') }
    if (user.manner >= 60) { return setMannerColor('salmon') }
    if (user.manner >= 70) { return setMannerColor('red') }
  }
  

  const LogoutFunc = () => {
    console.log('로그아웃');
    axios({
      method: 'post',
      url: `${baseURL}/accounts/logout/`,
      headers: { 'Content-Type': 'application/json' },
      data: { 'refresh': user.refresh_token },
    })
      .then(res => {
        console.log(res)
        alert('성공적으로 로그아웃 되었습니다.')
        dispatch(clearUser());
        localStorage.setItem('Authorization', "")
      })
      .catch((err) => {
        return console.error(err)
      })
  }

  useEffect(()=>{
    let copy = state
    copy[user.speed] = true
    setState(copy)
  }, [])

  useEffect(()=>{
    mannerColorChange()
  }, [mannerColor])
  
  return (
    <Container>
      <h1 className="mb-3">프로필</h1>

      {/* 프로필 이미지, 정보 */}
      <div class="profile-nickname">
        <img src="./basic_profile_img.png" alt="" width='45px' className="profile-img" />
        <div>
          <h4>{user.nickname ? user.nickname : '닉네임을 설정해주세요'}<span>  #{user.id}</span></h4>
        </div>
      </div>
      <button className="profile-btn">
        <Link to='/profile/update'>
          프로필 수정
        </Link>
      </button>

      {/* 매너온도 */}
      <div className="my-5">
        <div>매너온도</div>
        <div className="profile-manner-num">
          <div>{user.manner}도</div>
          <div className="profile-manner-first">첫 온도 36.5℃</div>
        </div>
        <div className="profile-manner">
          <div className="profile-manner-check" style={{ width: `${user.manner}%`, background: `${mannerColor}`}}></div>
        </div>
      </div>

      <div className="my-5">
        <h3>나는 이런사람이에요!</h3>
        {user.gender == false ? <div><span>1. 남자에요</span><img style={{marginLeft: '10px'}} src="/male.png" width='40px'/></div> : <div><span>1. 여자에요</span><img style={{marginLeft: '10px'}} src="/female.png" width='40px'/></div>}
        {user.smoke == false ? <div><span>2. 담배는 싫어요</span><img style={{marginLeft: '10px'}} src="/no-smoking.png" width='40px'/></div> : <div><span>2. 담배 피워요</span><img style={{marginLeft: '10px'}} src="/cigarrete.png" width='40px'/></div>}
        {user.alcohol == false ? <div><span>3. 술안마셔요</span><img style={{marginLeft: '10px'}} src="/no-alcohol.png" width='40px'/></div> : <div><span>3. 술마셔요</span><img style={{marginLeft: '10px'}}src="/soju.png" width='40px'/></div>}
        {user.talk == false ? <div><span>4. 밥만 먹고싶어요</span><img style={{marginLeft: '10px'}} src="/no-communication.png" width='40px'/></div> : <div><span>4. 대화도 하고싶어요</span><img style={{marginLeft: '10px'}} src="/communication.png" width='40px'/></div>}
      </div>
      <h3>식사속도는?</h3>
      <ListGroup horizontal>
        {user.speed == 1 ? <ListGroup.Item className="active list-group-font">엄청<br/>느려요<img width='40px' src="/snail.png" /></ListGroup.Item> : <ListGroup.Item className='list-group-font'>엄청<br/>느려요</ListGroup.Item>}
        {user.speed == 2 ? <ListGroup.Item className="active list-group-font">조금<br/>느려요<img width='40px' src="/turtle.png" /></ListGroup.Item> : <ListGroup.Item className='list-group-font'>조금<br/>느려요</ListGroup.Item>}
        {user.speed == 3 ? <ListGroup.Item className="active list-group-font">보통<br/>이에요<img width='40px' src="/teddy-bear.png" /></ListGroup.Item> : <ListGroup.Item className='list-group-font'>보통<br/>이에요</ListGroup.Item>}
        {user.speed == 4 ? <ListGroup.Item className="active list-group-font">조금<br/>빨라요<img width='40px' src="/cheetah.png" /></ListGroup.Item> : <ListGroup.Item className='list-group-font'>조금<br/>빨라요</ListGroup.Item>}
        {user.speed == 5 ? <ListGroup.Item className="active list-group-font">엄청<br/>빨라요<img width='40px' src="/growth.png" /></ListGroup.Item> : <ListGroup.Item className='list-group-font'>엄청<br/>빨라요</ListGroup.Item>}
      </ListGroup>
      <div className="mt-5">
        <button className="btn btn-secondary" onClick={() => LogoutFunc()}>로그아웃 할게요</button>
      </div>
    </Container>
  )
}

export default Profile