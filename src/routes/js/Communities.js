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
    getArticle();
    handleClose();
  };
  useEffect(() => {
    getArticle();
  }, []);
  return (
    <Container>
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
            <ContentCheck handleContent={handleContent} />
            <div className="modal-btns">
              <Button variant="secondary" onClick={handleClose}>
                Close
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
              <div className="article-card">
                {/* <p>글번호 {data.pk}</p> */}
                <p>{data.user}</p>
                <p>
                  <Link
                    to={`/community/${data.pk}?name=${data.pk}`}
                    className="article-title"
                  >
                    {data.title}
                  </Link>{" "}
                  [{data.comments.length}]
                </p>
                <p>
                  작성시간{" "}
                  {moment(data.created_at).format("YYYY년 MM월 D일 a h시mm분")}
                </p>
              </div>
            );
          })}
        </>
      ) : null}
    </Container>
  );
}

export default Community;
