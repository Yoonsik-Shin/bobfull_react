import { useDispatch, useSelector } from "react-redux";
import { clearUser } from '../../store/userSlice.js';
import { Container } from 'react-bootstrap'
import '../css/Profile.css'
import axios from "axios";
import { useParams, Link } from 'react-router-dom'
import styled from "../../../src/components/css/Button.module.css"

function Profile() {
  const user = useSelector((state) => state.user);
  var baseURL = process.env.REACT_APP_BASE_URL // 환경변수설정
  console.log(user.refresh_token)
  const dispatch = useDispatch();
  let { id } = useParams()
  console.log(id)
  console.log(user)
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
  return (
    <Container>
      <h1>프로필</h1>

      {/* 프로필 이미지, 정보 */}
      <div class="profile-nickname">
        <img src="http://placeimg.com/75/75/people" alt="" className="profile-img" />
        <div>
          <h4>{user.nickname ? user.nickname : '닉네임을 설정해주세요'}<span>  #{user.id}</span></h4>
        </div>
      </div>
      <button className={styled.btn}><Link to='/profile/update' style={{ textDecoration: 'none', color: 'white' }}>
        프로필 수정
      </Link></button>

      {/* 매너온도 */}
      <div>
        <div>매너온도</div>
        <div className="profile-manner-num">
          <div>{user.manner}도</div>
          <div className="profile-manner-first">첫 온도 36.5℃</div>
        </div>
        <div className="profile-manner">
          <div className="profile-manner-check" style={{ width: `${user.manner}%` }}></div>
        </div>
      </div>
      <button onClick={() => LogoutFunc()}>로그아웃</button>
    </Container>
  )
}

export default Profile