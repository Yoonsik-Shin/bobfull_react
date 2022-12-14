import "./App.css";
import { useEffect, useState } from "react";
import Main from './routes/js/Main.js'
import Login from './routes/js/Login.js'
import Restaurants from './routes/js/Restaurants.js'
import RestaurantsDetail from './routes/js/RestaurantsDetail.js'
import Category from './routes/js/Category.js'
import NavbarBottom from './components/js/navbar.js'
import KakaoMap from './components/js/Map.js'
import Community from './routes/js/Communities.js'
import CommunityDetail from "./routes/js/CommunityDetail";
import Signup from './routes/js/Signup.js'
import Profile from './routes/js/Profile.js'
import Roulette from "./routes/js/Roulette";
import Test from "./routes/js/Test"
import KaKaoAuth from './components/js/KakaoAuth.js'
import GoogleAuth from './components/js/GoogleAuth.js'
import ProfileUpdate from './routes/js/ProfileUpdate';
import { Routes, Route, Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MatchingRoom from "./routes/js/MatchingRoom.js"
import MatchingRoomDetail from "./routes/js/MatchingRoomDetail.js"
import MatchingList from "./routes/js/MatchingList";
import ChatRoom from "./routes/js/ChatRoom.js"
import ChatRoomDetail from "./routes/js/ChatRoomDetail.js"
import Evaluation from "./routes/js/Evaluation.js"
import Intro from "./routes/js/Intro";
import { useLocation } from 'react-router-dom';

function App() {
  const user = useSelector((state) => state.user);
  const location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, [location])
  return (
    <div className="App" style={{ paddingBottom: "66px" }}>
      {/* 페이지나누기 */}
      <Routes>
        <Route path="*" element={<div>404페이지</div>} />
        <Route path="/main" element={<Main />} />  {/* 메인페이지 */}
        <Route path="/login" element={user.isLogin ? <Profile /> : <Login />} /> {/* 로그인페이지 */}
        <Route path="/res_index" element={user.isLogin ? <Restaurants /> : <Login />} />
        <Route path="/res_index/:id" element={user.isLogin ? <RestaurantsDetail /> : <Login />} />
        <Route path="/res_category" element={user.isLogin ? <Category /> : <Login />} />
        <Route path="/community" element={user.isLogin ? <Community /> : <Login />} />
        <Route path="/community/:id" element={user.isLogin ? <CommunityDetail /> : <Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={user.isLogin ? <Profile /> : <Login />} />
        <Route path="/profile/update" element={user.isLogin ? <ProfileUpdate /> : <Login />} />
        <Route path="/roulette" element={<Roulette />} />
        <Route path="/map" element={user.isLogin ? <KakaoMap /> : <Login />} />
        <Route path="/" element={<Test />} />
        <Route path="/oauth/callback/kakao" element={<KaKaoAuth />} />
        <Route path="/accounts/google/callback/" element={<GoogleAuth />} />
        <Route path="/matching_room/:id" element={user.isLogin ? <MatchingRoom /> : <Login />} />
        <Route path="/matching_room/:id/:detail" element={user.isLogin ? <MatchingRoomDetail /> : <Login />} />
        <Route path="/matching_room/review/:id/:detail" element={user.isLogin ? <Evaluation /> : <Login />} />
        <Route path="/matching_list" element={user.isLogin ? <MatchingList /> : <Login />} />
        <Route path="/multichat/index" element={user.isLogin ? <ChatRoom /> : <Login />} />
        <Route path="/multichat/:room_id" element={user.isLogin ? <ChatRoomDetail /> : <Login />} />
        <Route path="/intro" element={<Intro />} />
      </Routes>
      {location.pathname !== '/intro' && location.pathname !== "/" ? <NavbarBottom /> : null}
    </div>
  );
}



export default App;
