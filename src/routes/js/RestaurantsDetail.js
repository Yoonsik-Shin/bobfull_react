import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import "../css/ResDetail.css";
import styled1 from "../../components/css/Button.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import Topnavbar from "../../../src/components/js/Topnavbar";
import Star from "../../../src/components/js/Star";
import { current } from "@reduxjs/toolkit";
import toast, { Toaster } from "react-hot-toast";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

var baseURL = process.env.REACT_APP_BASE_URL;

function RestaurantsDetail() {
  let { id } = useParams();
  const [restaurant, setRestaurant] = useState();
  const [reviews, setReviews] = useState();
  const [menus, setMenus] = useState();
  const [score, setScore] = useState(1);
  const [scoreSum, setScoreSum] = useState([]);
  const name = new URL(window.location.href).searchParams.get("name");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getRes = async () => {
    const res = await axios.get(`${baseURL}/restaurant/${id}/`, {
      headers: { "Content-Type": "application/json" },
    });
    setRestaurant(res.data);
    setMenus(res.data.detail.split(", "));
  };
  const getReviews = async () => {
    const review = await axios({
      method: "get",
      url: `${baseURL}/articles/${id}/review/`,
    });
    setReviews(review.data);
    let copy = [];
    review.data.map((el, idx) => {
      copy.push(el.grade.length);
      setScoreSum(copy);
    });
  };

  // 랜더링시 레스토랑 정보 받아오기
  useEffect(() => {
    getRes();
    getReviews();
  }, []);

  const onSubmitReview = async (e) => {
    e.preventDefault();
    const submit = await axios({
      method: "post",
      url: `${baseURL}/articles/${id}/review/`,
      data: {
        content: e.target[0].value,
        grade: "⭐".repeat(score),
      },
    });
    toast.success("리뷰 작성 완료.");
    getReviews();
    e.target[0].value = "";
  };

  const handleInput = (e) => {
    setScore(parseInt(e.target.defaultValue));
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
    centerPadding: "20px",
  };

  return (
    <Container>
      <Toaster position="top-center" reverseOrder={false} />
      <Topnavbar key="res" pagename={name ? name : ""} />
      {restaurant ? (
        <>
          <Slider {...settings}>
            {restaurant.images.map((img, i) => {
              return (
                <img
                  src={decodeURIComponent(
                    restaurant.images[i].image.replace(
                      "https://bobfull.s3.ap-northeast-2.amazonaws.com/https%3A/",
                      "https://"
                    )
                  )}
                  className="res-detail-img"
                />
              );
            })}
          </Slider>
          <button className={styled1.category}>
            {restaurant.category_name}
          </button>
          <div className="res-title">
            <h2 className={styled1.name} style={{ marginBottom: "0px" }}>
              {restaurant.name}
            </h2>
            <button className="res-chat-button">
              {restaurant ? (
                <Link to={`/matching_room/${restaurant.id}`}>
                  매칭룸 입장하기
                </Link>
              ) : null}
            </button>
          </div>
          <p style={{ fontSize: "15px" }}>{restaurant.address.slice(0, -8)}</p>
          <h2 className={styled1.name} style={{ marginTop: "40px" }}>
            인기메뉴
          </h2>
          {menus.map((menu) => (
            <p className={styled1.menuname}>{menu}</p>
          ))}
        </>
      ) : null}
      {reviews ? (
        <>
          <div className="review-title">
            <h2 className={styled1.name} style={{ marginBottom: "0px" }}>
              식당리뷰
            </h2>
            <ReviewModal
              handleInput={handleInput}
              onSubmitReview={onSubmitReview}
            />
          </div>
          {reviews.length ? (
            <span className="review-span">
              {" "}
              {reviews.length}개의 리뷰{" "}
              {scoreSum.length != 0 ? (
                <span>
                  {" "}
                  | 평점 :{" "}
                  {(
                    scoreSum.reduce((acc, cur) => {
                      return acc + cur;
                    }) / scoreSum.length
                  ).toFixed(2)}
                  /5
                </span>
              ) : null}
            </span>
          ) : (
            <span className="review-span">아직 리뷰가 없어요 😥</span>
          )}
          <div className="res-detail-review-create"></div>
          {reviews.map((el, i) => {
            return (
              <div className="review-card">
                {reviews[i].user.profile_image ? (
                  <img
                    src={`${reviews[i].user.profile_image}`}
                    alt=""
                    width="45px"
                    className="res-profile-img"
                  />
                ) : (
                  <img
                    src="/basic_profile_img.png"
                    alt=""
                    width="45px"
                    className="res-profile-img"
                  />
                )}
                {reviews[i].user.nickname}
                <span className="res-date">
                  {detailDate(new Date(reviews[i].updated_at))}
                </span>
                <br />
                <span className="res-detail-span-p">
                  {reviews[i].content} {reviews[i].grade}
                </span>
              </div>
            );
          })}
        </>
      ) : null}
    </Container>
  );
}

export default RestaurantsDetail;

function ReviewModal(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="res-chat-button" onClick={handleShow}>
        리뷰쓰기
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>리뷰 작성</Modal.Title>
        </Modal.Header>
        <Form onSubmit={props.onSubmitReview}>
          <Modal.Body>
            <Form.Control
              as="textarea"
              placeholder="작성할 내용을 입력하세요."
              className="mb-3"
              required
            />
            <Star handleInput={props.handleInput} />
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              onClick={handleClose}
              className={styled1.resbtn}
            >
              작성
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
