import "../../components/css/Roulette.css";
import Topnavbar from "../../../src/components/js/Topnavbar";
import { useState } from "react";
import { rRandom } from "../../commons/getRandomCount";

export default function Roulette() {
  const [transform, setTransform] = useState();
  const [disabled, setDisabled] = useState(false);
  const [pointerEvents, setPointerEvents] = useState();
  const [comment, setComment] = useState("");
  const ROLL_LENGTH = 8; // 해당 룰렛 콘텐츠 갯수
  let setNum; // 랜덤숫자 담을 변수

  const rRotate = () => {
    const deg = [];
    // 룰렛 각도 설정(ROLL_LENGTH = 6)
    for (let i = 1, len = ROLL_LENGTH; i <= len; i++) {
      deg.push((360 / len) * i);
    }

    // 랜덤 생성된 숫자
    let num = 0;
    setNum = rRandom(ROLL_LENGTH);

    // 애니설정
    const ani = setInterval(() => {
      num++;
      setTransform("rotate(" + 360 * num + "deg)");
      setDisabled(true);
      setPointerEvents("none");

      // 총 50에 다달했을때, 즉 마지막 바퀴를 돌고나서
      if (num === 30) {
        clearInterval(ani);
        setTransform(`rotate(${deg[setNum]}deg)`);
      }
    }, 30);
  };

  // 정해진 alert띄우기, custom modal등
  const rLayerPopup = () => {
    switch (setNum) {
      case 0:
        setComment("오늘 메뉴는 한식!");
        break;
      case 1:
        setComment("오늘 메뉴는 치킨!");
        break;
      case 2:
        setComment("오늘 메뉴는 일식!");
        break;
      case 3:
        setComment("오늘 메뉴는 분식!");
        break;
      case 4:
        setComment("오늘 메뉴는 양식!");
        break;
      case 5:
        setComment("오늘 메뉴는 카페!");
        break;
      case 6:
        setComment("오늘 메뉴는 중식!");
        break;
      case 7:
        setComment("오늘 메뉴는 피자!");
        break;
    }
  };

  // reset
  const rReset = () => {
    setTimeout(() => {
      setDisabled(false);
      setPointerEvents("auto");
      rLayerPopup(setNum);
    }, 3000);
  };

  // 룰렛 이벤트 클릭 버튼
  const onClickStart = (e) => {
    if (e.target.tagName === "BUTTON") {
      rRotate();
      rReset(e.target);
    }
  };

  return (
    <div>
      <div style={{ backgroundColor: "white", paddingLeft: "3%" }}>
        <Topnavbar key="roul" pagename="룰렛" />
      </div>

      <div className="rouletter">
        <h1 className="text-center">음식 랜덤 추천</h1>
        <p className="result">{comment}</p>
        <div className="rouletter-bg">
          <div className="rouletter-wacu" style={{ transform }}></div>
          <div className="rouletter-arrow"></div>
        </div>
        <button
          onClick={onClickStart}
          className="rouletter-btn"
          disabled={disabled}
          style={{ pointerEvents }}
        >
          start
        </button>
      </div>
    </div>
  );
}
