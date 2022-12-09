import "../../components/css/Roulette.css";
function Roulette() {
  var rolLength = 8; // 해당 룰렛 콘텐츠 갯수
  var setNum; // 랜덤숫자 담을 변수
  var hiddenInput = document.createElement("input");
  hiddenInput.className = "hidden-input";

  //랜덤숫자부여
  const rRandom = () => {
    var min = Math.ceil(0);
    var max = Math.floor(rolLength - 1);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const rRotate = () => {
    var panel = document.querySelector(".rouletter-wacu");
    var btn = document.querySelector(".rouletter-btn");
    var deg = [];
    // 룰렛 각도 설정(rolLength = 6)
    for (var i = 1, len = rolLength; i <= len; i++) {
      deg.push((360 / len) * i);
    }

    // 랜덤 생성된 숫자를 히든 인풋에 넣기
    var num = 0;
    document.body.append(hiddenInput);
    setNum = hiddenInput.value = rRandom();

    // 애니설정
    var ani = setInterval(() => {
      num++;
      panel.style.transform = "rotate(" + 360 * num + "deg)";
      btn.disabled = true; //button,input
      btn.style.pointerEvents = "none"; //a 태그

      // 총 50에 다달했을때, 즉 마지막 바퀴를 돌고나서
      if (num === 30) {
        clearInterval(ani);
        panel.style.transform = `rotate(${deg[setNum]}deg)`;
      }
    }, 30);
  };
  // 정해진 alert띄우기, custom modal등
  const rLayerPopup = () => {
    const p = document.querySelector('.result')

    if (setNum === 0) {
      p.innerText = '오늘 메뉴는 한식!'
    }
    else if (setNum === 1) {
      p.innerText = '오늘 메뉴는 치킨!'
    }
    else if (setNum === 2) {
      p.innerText = '오늘 메뉴는 일식!'
    }
    else if (setNum === 3) {
      p.innerText = '오늘 메뉴는 분식!'
    }
    else if (setNum === 4) {
      p.innerText = '오늘 메뉴는 양식!'
    }
    else if (setNum === 5) {
      p.innerText = '오늘 메뉴는 카페!'
    }
    else if (setNum === 6) {
      p.innerText = '오늘 메뉴는 중식!'
    }
    else if (setNum === 7) {
      p.innerText = '오늘 메뉴는 피자!'
    }
  }

  // reset
  const rReset = (ele) => {
    setTimeout(() => {
      ele.disabled = false;
      ele.style.pointerEvents = "auto";
      rLayerPopup(setNum);
      hiddenInput.remove();
    }, 3000);
  };

  // 룰렛 이벤트 클릭 버튼
  document.addEventListener("click", function (e) {
    var target = e.target;
    if (target.tagName === "BUTTON") {
      rRotate();
      rReset(target);
    }
  });

  return (
    <div className="rouletter">
      <h1 className="text-center">룰렛!</h1>
      <p className="result"></p>
      <div className="rouletter-bg">
        <div className="rouletter-wacu"></div>
        <div className="rouletter-arrow"></div>
      </div>
      <button className="rouletter-btn">start</button>
    </div>
  );
}
export default Roulette;