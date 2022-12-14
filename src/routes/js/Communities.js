import { Container, Form } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Topnavbar from "../../../src/components/js/Topnavbar";
import CustomToggle from "../../../src/components/js/CustomArticle";
import "../css/Community.css";
import ContentCheck from "../../components/js/ArticleContent";
import TitleCheck from "../../components/js/ArticleTitle";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
import "moment/locale/ko";
import toast, { Toaster } from "react-hot-toast";

var baseURL = process.env.REACT_APP_BASE_URL;

function Community() {
  const [articles, setArticles] = useState();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleContent = (e) => {
    setContent(e.target.value);
  };
  const getArticle = async () => {
    const res = await axios({
      method: "get",
      url: `${baseURL}/community/`,
    });
    setArticles(res.data);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const submit = await axios({
      method: "post",
      url: `${baseURL}/community/`,
      data: {
        title: title,
        content: content,
      },
    });
    toast.success("글 작성 완료.");
    getArticle();
    handleClose();
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

  useEffect(() => {
    getArticle();
  }, []);
  return (
    <Container>
      <Toaster position="top-center" reverseOrder={false} />
      <Topnavbar key="res" pagename="커뮤니티" />
      <div className="d-flex justify-content-between community-titles">
        <h2 className="article-list">글 목록</h2>
        <Button variant="primary" className="articlebtn" onClick={handleShow}>
          글 작성
        </Button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>작성하기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <TitleCheck handleTitle={handleTitle} />
            <ContentCheck handleContent={handleContent} commu="내용" />
            <div className="modal-btns">
              <Button variant="secondary" onClick={handleClose}>
                취소
              </Button>
              <Button type="submit" variant="primary" className="articlebtn">
                작성
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      {articles ? (
        <>
          {articles.map((data, idx) => {
            return (
              <Link
                to={`/community/${data.pk}?name=${data.title}`}
                className="article-title"
              >
                <div className="article-card">
                  <p className="card-title">
                    <span style={{ color: "lightsalmon" }}>{data.title}</span> [
                    {data.comments.length}]
                  </p>
                  <p style={{ marginTop: "10px", marginBottom: "0px" }}>
                    {data.user.profile_image ? (
                      <img
                        src={`${data.user.profile_image}`}
                        alt=""
                        width="30px"
                        className="commu-profile-img"
                      />
                    ) : (
                      <img
                        src="./basic_profile_img.png"
                        alt=""
                        width="30px"
                        className="commu-profile-img"
                      />
                    )}
                    {data.user.nickname} /
                    <span> {detailDate(new Date(data.created_at))}</span>
                  </p>
                </div>
              </Link>
            );
          })}
        </>
      ) : null}
    </Container>
  );
}

export default Community;
