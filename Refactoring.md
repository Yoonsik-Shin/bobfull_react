# 최종프로젝트 리팩토링

​     

## 1️⃣ 카테고리 페이지

- 중복되는 요소를 하나의 컴포넌트로 묶고 서로 다른 부분은 상수배열과 map을 이용하여 리팩토링함
- 새로운 카테고리 추가가 용이해질 것으로 생각

### Before

```jsx
<Row className={styled.categoryrow}>
  <Col xs={3} className={styled.categorydiv}>
    <Link to="/res_index/?category=1&name=한식" className={styled.categoryName}>
      <img src="./bibimbap.png" className={styled.categoryimg} />
      한식
    </Link>
  </Col>
  <Col xs={3} className={styled.categorydiv}>
    <Link to="/res_index/?category=2&name=일식" className={styled.categoryName}>
      <img src="./sushi.png" className={styled.categoryimg} />
      일식
    </Link>
  </Col>
  <Col xs={3} className={styled.categorydiv}>
    <Link to="/res_index/?category=3&name=중식" className={styled.categoryName}>
      <img src="./noodles.png" className={styled.categoryimg} />
      중식
    </Link>
  </Col>
  <Col xs={3} className={styled.categorydiv}>
    <Link to="/res_index/?category=4&name=양식" className={styled.categoryName}>
      <img src="./spaghetti.png" className={styled.categoryimg} />
      양식
    </Link>
  </Col>
  <Col xs={3} className={styled.categorydiv}>
    <Link to="/res_index/?category=5&name=분식" className={styled.categoryName}>
      <img src="./tteokbokki.png" className={styled.categoryimg} />
      분식
    </Link>
  </Col>
  <Col xs={3} className={styled.categorydiv}>
    <Link to="/res_index/?category=6&name=피자" className={styled.categoryName}>
      <img src="./pizza.png" className={styled.categoryimg} />
      피자
    </Link>
  </Col>
  <Col xs={3} className={styled.categorydiv}>
    <Link to="/res_index/?category=7&name=치킨" className={styled.categoryName}>
      <img src="./chicken.png" className={styled.categoryimg} />
      치킨
    </Link>
  </Col>
  <Col xs={3} className={styled.categorydiv}>
    <Link to="/res_index/?category=8&name=고기" className={styled.categoryName}>
      <img src="./meat.png" className={styled.categoryimg} />
      고기
    </Link>
  </Col>
  <Col xs={3} className={styled.categorydiv}>
    <Link to="/res_index/?category=9&name=아시안" className={styled.categoryName}>
      <img src="./ricenoodles.png" className={styled.categoryimg} />
      아시안
    </Link>
  </Col>
  <Col xs={3} className={styled.categorydiv}>
    <Link to="/res_index/?category=10&name=술집" className={styled.categoryName}>
      <img src="./liquor.png" className={styled.categoryimg} />
      술집
    </Link>
  </Col>
  <Col xs={3} className={styled.categorydiv}>
    <Link to="/res_index/?category=11&name=카페·디저트" className={styled.categoryName}>
      <img src="./cake.png" className={styled.categoryimg} />
      카페·디저트
    </Link>
  </Col>
  <Col xs={3} className={styled.categorydiv}>
    <Link to="/res_index/?category=12&name=패스트푸드" className={styled.categoryName}>
      <img src="./hamburger.png" className={styled.categoryimg} />
      패스트푸드
    </Link>
  </Col>
  <Col xs={10} className={styled.categorydiv}>
    <Link to="/res_index/?category=13&name=기타" className={styled.categoryName}>
      <img src="./more.png" className={styled.categoryimg} />
      기타
    </Link>
  </Col>
</Row>
```

​     

### After

```jsx
const CATEGORY_LIST = [
    { xs: 3, category: "한식", src: "./bibimbap.png" },
    { xs: 3, category: "일식", src: "./sushi.png" },
    { xs: 3, category: "중식", src: "./noodles.png" },
    { xs: 3, category: "양식", src: "./spaghetti.png" },
    { xs: 3, category: "분식", src: "./tteokbokki.png" },
    { xs: 3, category: "피자", src: "./pizza.png" },
    { xs: 3, category: "치킨", src: "./chicken.png" },
    { xs: 3, category: "고기", src: "./meat.png" },
    { xs: 3, category: "아시안", src: "./ricenoodles.png" },
    { xs: 3, category: "술집", src: "./liquor.png" },
    { xs: 3, category: "카페·디저트", src: "./cake.png" },
    { xs: 3, category: "패스트푸드", src: "./hamburger.png" },
    { xs: 10, category: "기타", src: "./more.png" },
];

// 페이지
export default function CategoryPage() {
  return (
    <Row className={styled.categoryrow}>
      {CATEGORY_LIST.map((category, index) => (
          <Category key={index} xs={category.xs} to={category.category} src={category.src} />
      ))}
    </Row>
  );
}

// 컴포넌트 파일로 분리
export default function Category(props) {
  const { xs, category, src } = props;
  
  return (
    <Col xs={xs}>
      <Link to={`/res_index/?category=1&name=${category}`}>
        <img src={src} />
        {category}
      </Link>
    </Col>
  );
}
```

​    

---

  ## 2️⃣ 레스토랑 페이지

- 4가지의 기능이 하나의 페이지 컴포넌트에 모두 작성됨
- 무한스크롤, 현재위치 설정 및 음식점과의 거리 계산, slick-slider, 검색
- 기능별로 각각 파일을 분할함
  - 현재위치를 받아오는 Hook (`useWatchLocation`)
  - 거리 계산해주는 함수 (`getDistanceFromLatLonInKm`)
  - 계산된 거리를 보여주는 컴포넌트 (`PositionCalculation`)
  - 이미지를 보여주는 컴포넌트 (`slickSilderImage.js`)
- 삼항연산자로 중복된 구조를 보여주는 jsx요소 리팩토링
- 검색 컴포넌트로 분리

​    

### 1. 이미지 슬라이더

#### Before

- 의미를 알 수 없는 삼항연산자

```jsx
{restaurants.length - 1 == idx ? (
  <div ref={ref}>
    <Slider {...settings}>
      {data.images.map((img, i) => {
        return (
          <img
            src={decodeURIComponent(
              data.images[i].image.replace(
                "https://bobfull.s3.ap-northeast-2.amazonaws.com/https%3A/",
                "https://"
              )
            )}
            className="res-img"
          />
        );
      })}
    </Slider>
  </div>
) : (
  <div>
    <Slider {...settings}>
      {data.images.map((img, i) => {
        return (
          <img
            src={decodeURIComponent(
              data.images[i].image.replace(
                "https://bobfull.s3.ap-northeast-2.amazonaws.com/https%3A/",
                "https://"
              )
            )}
            className="res-img"
          />
        );
      })}
    </Slider>
  </div>
)}
```

​    

#### After

```jsx
// 삼항연산자 제거 및 컴포넌트 활용
<div ref={ref}>
  <SliderImage images={data.images} />
</div>


// slickSilderImage 컴포넌트로 분리
import Slider from "react-slick";

export default function SliderImage(props) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: false,
    autoplaySpeed: 90000,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: false,
    centerPadding: "20px",
  };

  return (
    <Slider {...settings}>
      {props.images.map((src, idx) => (
        <img key={idx} src={src} className="res-img" />
      ))}
    </Slider>
  );
}
```

​    

### 2. 현재위치, 거리계산

#### Before

```jsx
function Restaurants() {
  // ...
   const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });
  
  // ...
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            isLoading: false,
          }));
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }));
    }
  }, []);
	
  // ...
  const PositionCalculation = (e, idx) => {
    var geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(e.slice(0, -8), function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const cnt = getDistanceFromLatLonInKm(
          state.center.lat,
          state.center.lng,
          parseFloat(result[0].y),
          parseFloat(result[0].x)
        );
        const res_idx = document.getElementById(idx);
        let conversion = Math.round(cnt * 100) / 100;
        let conversionM = conversion * 1000;
        if (conversion < 1) {
          res_idx.innerText = `거리 ${conversionM}m`;
        } else {
          res_idx.innerText = `거리 ${conversion}km`;
        }
      } else {
        const res_idx = document.getElementById(idx);
        res_idx.innerText = "";
      }
    });
  };
  
  function getDistanceFromLatLonInKm(lat1, lng1, lat2, lng2) {
    function deg2rad(deg) {
      return deg * (Math.PI / 180);
    }
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lng2 - lng1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }
  // ...
  
  return (
    <div id={idx}>
      거리{PositionCalculation(data.address, idx)}
    </div>
  )
} 
```



#### After

```jsx
// 레스토랑 페이지
<PositionCalculation
  e={data.address}
  idx={idx}
  kakao={kakao}
  className="res-detail"
/>
```

```jsx
// 거리계산 결과 컴포넌트
import { useEffect, useState } from "react";
import { useWatchLocation } from "../hooks/useWatchLocation";
import { getDistanceFromLatLonInKm } from "./getDistanceFromLatLonInKm";

export default function PositionCalculation({ e, idx, kakao }) {
  const [info, setInfo] = useState("");
  const { curLocation } = useWatchLocation();
  const geocoder = new kakao.maps.services.Geocoder();

  useEffect(() => {
    geocoder.addressSearch(e.slice(0, -8), (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const cnt = getDistanceFromLatLonInKm(
          curLocation.center.lat,
          curLocation.center.lng,
          parseFloat(result[0].y),
          parseFloat(result[0].x)
        );

        let conversion = Math.round(cnt * 100) / 100;
        let conversionM = conversion * 1000;

        if (conversion < 1) setInfo(`${conversionM}m`);
        else setInfo(`${conversion}km`);
      } else setInfo(`거리정보가 없습니다.`);
    });
  }, [curLocation]);

  return <div id={idx}>거리{info}</div>;
}
```

```js
// 현재위치 알아오는 CustomHook
import { useEffect, useMemo, useState } from "react";

export const useWatchLocation = () => {
  const DEFAULT_LOCATION = {
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  };

  const [curLocation, setCurLocation] = useState(DEFAULT_LOCATION);

  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurLocation((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }));
        },
        (err) => {
          setCurLocation((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setCurLocation((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }));
    }
  }, []);

  return {
    curLocation,
  };
};
```

```js
// 위도,경도로 거리 계산하는 함수
export function getDistanceFromLatLonInKm(lat1, lng1, lat2, lng2) {
  const deg2rad = (deg) => deg * (Math.PI / 180);
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}
```

​    

---

## 3️⃣ 룰렛페이지

- 인터넷에서 복사붙여넣기를 한 것이라 바닐라 자바스크립트의 요소들이 많았음
- `var`, `document.querySelector`, `p.innerText`등등
- 리액트에 맞게 리팩토링 진행

​     

### Before

```jsx
function Roulette() {
  var rolLength = 8; // 해당 룰렛 콘텐츠 갯수
  var setNum; // 랜덤숫자 담을 변수
  var hiddenInput = document.createElement("input");
  hiddenInput.className = "hidden-input";
  const [transform, settransform] = useState()
  //랜덤숫자부여
  const rRandom = () => {
    var min = Math.ceil(0);
    var max = Math.floor(rolLength - 1);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const rRotate = () => {
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
      settransform("rotate(" + 360 * num + "deg)");
      const qw = btn ? btn.disabled = true : null; //button,input
      const qe = btn ? btn.style.pointerEvents = "none" : null; //a 태그

      // 총 50에 다달했을때, 즉 마지막 바퀴를 돌고나서
      if (num === 30) {
        clearInterval(ani);
        settransform(`rotate(${deg[setNum]}deg)`);
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
        <h1 className="text-center">음식 랜덤 추천</h1>
        <p className="result"></p>
        <div className="rouletter-bg">
          <div className="rouletter-wacu" style={{ transform: transform }}></div>
          <div className="rouletter-arrow"></div>
        </div>
        <button className="rouletter-btn">start</button>
      </div>
    </div>
  );
}
export default Roulette;
```

​     

### After

```jsx
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
```

​    

- 랜덤수를 생성해주는 함수 분리 (`getRandomCount.js`)

```jsx
const ROLL_LENGTH = 8; // 해당 룰렛 콘텐츠 갯수

const rRandom = () => {
  var min = Math.ceil(0);
  var max = Math.floor(rolLength - 1);  // 한 변수에 종속됨
  return Math.floor(Math.random() * (max - min)) + min;
}
```

```jsx
export const rRandom = (range) => {
  const min = Math.ceil(0);
  const max = Math.floor(range - 1);
  return Math.floor(Math.random() * (max - min)) + min;
}
```

​    

## 4️⃣ 시간 함수 분리

```js
export const detailDate = (serverTime) => {
  const milliSeconds = new Date() - new Date(serverTime);
  console.log(milliSeconds);
  const seconds = milliSeconds / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const weeks = days / 7;
  const months = days / 30;
  const years = days / 365;

  if (seconds < 60) return `방금 전`;
  if (minutes < 60) return `${Math.floor(minutes)}분 전`;
  if (hours < 24) return `${Math.floor(hours)}시간 전`;
  if (days < 7) return `${Math.floor(days)}일 전`;
  if (weeks < 5) return `${Math.floor(weeks)}주 전`;
  if (months < 12) return `${Math.floor(months)}개월 전`;
  return `${Math.floor(years)}년 전`;
};
```

