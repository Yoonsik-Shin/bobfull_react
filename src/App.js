import "./App.css";
import Main from "./routes/js/Main.js";
import Login from "./routes/js/Login.js";
import Restaurants from "./routes/js/Restaurants.js";
import RestaurantsDetail from "./routes/js/RestaurantsDetail.js";
import NavbarBottom from "./components/js/navbar.js";
import KakaoMap from "./components/js/Map.js";
import Community from "./routes/js/Communities.js";
import CommunityDetail from "./routes/js/CommunityDetail";
import Signup from "./routes/js/Signup.js";
import Profile from "./routes/js/Profile.js";
import Roulette from "./routes/js/Roulette";
import Test from "./routes/js/Test";
import KaKaoAuth from "./components/js/KakaoAuth.js";
import GoogleAuth from "./components/js/GoogleAuth.js";
import ProfileUpdate from "./routes/js/ProfileUpdate";
import { Routes, Route } from "react-router-dom";
import MatchingRoom from "./routes/js/MatchingRoom.js";
import MatchingRoomDetail from "./routes/js/MatchingRoomDetail.js";
import MatchingList from "./routes/js/MatchingList";
import ChatRoom from "./routes/js/ChatRoom.js";
import ChatRoomDetail from "./routes/js/ChatRoomDetail.js";
import Evaluation from "./routes/js/Evaluation.js";
import Intro from "./routes/js/Intro";
import { useLocation } from "react-router-dom";
import CategoryPage from "./routes/js/Category.js";

function App() {
  const location = useLocation();

  return (
    <div className="App" style={{ paddingBottom: "66px" }}>
      {/* 페이지나누기 */}
      <Routes>
        <Route path="*" element={<div>404페이지</div>} />
        <Route path="/main" element={<Main />} /> {/* 메인페이지 */}
        <Route path="/login" element={<Profile />} /> {/* 로그인페이지 */}
        <Route path="/res_index" element={<Restaurants />} />
        <Route path="/res_index/:id" element={<RestaurantsDetail />} />
        <Route path="/res_category" element={<CategoryPage />} />
        <Route path="/community" element={<Community />} />
        <Route path="/community/:id" element={<CommunityDetail />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/update" element={<ProfileUpdate />} />
        <Route path="/roulette" element={<Roulette />} />
        <Route path="/map" element={<KakaoMap />} />
        <Route path="/" element={<Test />} />
        <Route path="/oauth/callback/kakao" element={<KaKaoAuth />} />
        <Route path="/accounts/google/callback/" element={<GoogleAuth />} />
        <Route path="/matching_room/:id" element={<MatchingRoom />} />
        <Route
          path="/matching_room/:id/:detail"
          element={<MatchingRoomDetail />}
        />
        <Route
          path="/matching_room/review/:id/:detail"
          element={<Evaluation />}
        />
        <Route path="/matching_list" element={<MatchingList />} />
        <Route path="/multichat/index" element={<ChatRoom />} />
        <Route path="/multichat/:room_id" element={<ChatRoomDetail />} />
        <Route path="/intro" element={<Intro />} />
      </Routes>
      {location.pathname !== "/intro" && location.pathname !== "/" ? (
        <NavbarBottom />
      ) : null}
    </div>
  );
}

export default App;
