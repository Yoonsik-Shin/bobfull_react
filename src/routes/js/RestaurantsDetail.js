import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import '../css/ResDetail.css';
import styled1 from '../../components/css/Button.module.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaStar } from "react-icons/fa";
import styled from 'styled-components'

const Stars = styled.div`
display: flex;
padding-top: 5px;

& svg {
  color: gray;
  cursor: pointer;
}

:hover svg {
  color: #fcc419;
}

& svg:hover ~ svg {
  color: gray;
}

.yellowStar {
  color: #fcc419;
}
`;

function RestaurantsDetail() {
  let { id } = useParams();
  var baseURL = process.env.REACT_APP_BASE_URL
  const [restaurant, setRestaurant] = useState()
  const [reviews, setReviews] = useState()
  const [menus, setMenus] = useState()
  const [clicked, setClicked] = useState([true, true, true, false, false]);
  const array = [0, 1, 2, 3, 4]
  const [score, setScore] = useState(1)
  const [scoreSum, setScoreSum] = useState([])
  
  const getRes = async () => {
    const res = await axios.get(`${baseURL}/restaurant/${id}/`, { headers: { 'Content-Type': 'application/json' } })
    setRestaurant(res.data)
    setMenus(res.data.detail.split(', '))
  }
  const getReviews = async () => {
    const review = await axios({
      method: "get",
      url: `${baseURL}/articles/${id}/review/`
    })
    setReviews(review.data)
    review.data.map((el) => {
      let copy = [...scoreSum]
      copy.push(el.grade.length)
      setScoreSum(copy)
    })
  }

  // 랜더링시 레스토랑 정보 받아오기
  useEffect(() => {
    getRes()
    getReviews()
  }, [])

  const handleStarClick = index => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };
  
  const sendReview = () => {
    setScore(clicked.filter(Boolean).length);
  };

  useEffect(() => {
    sendReview();
  }, [clicked]); //컨디마 컨디업

  const onSubmitReview = async (e) => {
    e.preventDefault();
    const submit = await axios({
      method: 'post',
      url: `${baseURL}/articles/${id}/review/`,
      data: {
        content: e.target[0].value,
        grade: '⭐'.repeat(score)
      }
    })
    getReviews()
    e.target[0].value = '';
    setClicked([false, false, false, false, false])
  }

  
  const detailDate = (a) => {
    const milliSeconds = new Date() - a;
    const seconds = milliSeconds / 1000;
    if (seconds < 60) return `방금 전`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;
    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;
    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일 전`;
    const weeks = days / 7;
    if (weeks < 5) return `${Math.floor(weeks)}주 전`;
    const months = days / 30;
    if (months < 12) return `${Math.floor(months)}개월 전`;
    const years = days / 365;
    return `${Math.floor(years)}년 전`;
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 3500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "20px"
  };

  return (
    <Container>
      {
        restaurant ?
          <>
            <Slider {...settings}>
              {restaurant.images.map((img, i) => {
                return (
                  <img src={decodeURIComponent(restaurant.images[i].image.replace('http://127.0.0.1:8000/media/', ''))} className='res-detail-img' />
                )
              })}
            </Slider>
            <button className={styled1.category}>{restaurant.category_name}</button>
            <h3 className={styled1.name}>
              {restaurant.name}
            </h3>
            <p>인기메뉴</p>
            {menus.map((menu) =>
              <p className={styled1.menuname}>{menu}</p>
            )}
          </>
          : null
      }
      {
        reviews ?
          <>
            <h3 className={styled1.review}>식당리뷰 {reviews.length ? <span className='review-span'>{reviews.length}개의 리뷰 </span> : <span className='review-span'>아직 리뷰가 없어요 😥</span>}</h3>
            {reviews.map((el, i) => {
              return (
                <div className='review-p'>
                  <p>{reviews[i].user} 
                    <span className='res-date'>
                      {detailDate(new Date(reviews[i].updated_at))}
                    </span> 
                    <br /> 
                      {reviews[i].content} {reviews[i].grade} {reviews[i].grade.length}
                  </p>
                </div>
              )
            })}
          </>
          : null
      }
      <h3>리뷰작성하기</h3>
      <Form onSubmit={onSubmitReview}>
        <Form.Control
          type="text"
          placeholder='식당리뷰'
          className='mb-3'
          required
        />
        <Stars>
        {
          array.map((el) => (
            <FaStar
              key={el}
              onClick={() => handleStarClick(el)}
              className={clicked[el] && 'yellowStar'}
              size="35"
            />)
          )
        } 
        </Stars>
        <button>작성</button>
        
      </Form>
      {
        restaurant ? <Link to={`/matching_room/${restaurant.id}`}>매칭룸 입장하기</Link> : null
      }
      
    </Container>
  )
}

export default RestaurantsDetail