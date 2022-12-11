import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import '../css/ResDetail.css';
import styled1 from '../../components/css/Button.module.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from 'styled-components';
import Topnavbar from '../../../src/components/js/Topnavbar';
import Star from '../../../src/components/js/Star';

var baseURL = process.env.REACT_APP_BASE_URL

function RestaurantsDetail() {
  let { id } = useParams();
  const [restaurant, setRestaurant] = useState()
  const [reviews, setReviews] = useState()
  const [menus, setMenus] = useState()
  const [score, setScore] = useState(1)
  const [scoreSum, setScoreSum] = useState([])
  const name = new URL(window.location.href).searchParams.get('name')
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
  }
  const handleInput = (e) => {
    setScore(parseInt(e.target.defaultValue))
  };
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
      <Topnavbar
        key='res'
        pagename={name ? name : ''}
      />
      {
        restaurant ?
          <>
            <Slider {...settings}>
              {restaurant.images.map((img, i) => {
                return (
                  <img src={decodeURIComponent(restaurant.images[i].image.replace('https://bobfull.s3.ap-northeast-2.amazonaws.com/', ''))} className='res-detail-img' />
                )
              })}
            </Slider>
            <button className={styled1.category}>{restaurant.category_name}</button>
            <h2 className={styled1.name}>
              {restaurant.name}
            </h2>
            <p style={{ fontSize: '15px' }}>{restaurant.address.slice(0, -8)}</p>
            <h2 className={styled1.name}>인기메뉴</h2>
            {menus.map((menu) =>
              <p className={styled1.menuname}>{menu}</p>
            )}
          </>
          : null
      }
      {
        reviews ?
          <>
            <h2 className={styled1.name}>식당리뷰 {reviews.length ? <span className='review-span'>{reviews.length}개의 리뷰 </span> : <span className='review-span'>아직 리뷰가 없어요 😥</span>}</h2>
            {reviews.map((el, i) => {
              return (
                <div
                >
                  <p className={styled1.review}>{reviews[i].user}
                    <span className='res-date'>
                      {detailDate(new Date(reviews[i].updated_at))}
                    </span>
                    <br />
                    <span className='res-detail-span-p'>
                      {reviews[i].content} {reviews[i].grade}
                    </span>
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
          placeholder='작성할 내용을 입력하세요.'
          className='mb-3'
          required
        />
        <Star handleInput={handleInput} />
        <button className={styled1.resbtn}>리뷰 쓰기</button>

      </Form>
      {
        restaurant ? <Link to={`/matching_room/${restaurant.id}`}>매칭룸 입장하기</Link> : null
      }

    </Container>
  )
}

export default RestaurantsDetail