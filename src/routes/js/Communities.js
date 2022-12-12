import { Container, Form } from 'react-bootstrap'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Topnavbar from '../../../src/components/js/Topnavbar';
import CustomToggle from '../../../src/components/js/CustomArticle';
import '../css/Community.css'
import ContentCheck from "../../components/js/ArticleContent";
import TitleCheck from "../../components/js/ArticleTitle";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


var baseURL = process.env.REACT_APP_BASE_URL

function Community() {
  const [articles, setArticles] = useState()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
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
      method: 'get',
      url: `${baseURL}/community/`
    })
    setArticles(res.data)
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    const submit = await axios({
      method: 'post',
      url: `${baseURL}/community/`,
      data: {
        title: title,
        content: content,
      }
    })
    getArticle()
    handleClose()
  }
  useEffect(() => {
    getArticle()
  }, [])
  return (
    <Container>
      <Topnavbar
        key='res'
        pagename='커뮤니티'
      />
      {
        articles ?
          <>
            <h2>글 목록</h2>
            <Button variant="primary" onClick={handleShow}>
              Launch demo modal
            </Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={onSubmit}>
                  <TitleCheck handleTitle={handleTitle} />
                  <ContentCheck handleContent={handleContent} />
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button type='submit' variant="primary">
                    작성
                  </Button>
                </Form>
              </Modal.Body>
            </Modal>
            {articles.map((data, idx) => {
              return (
                <div>
                  <h6>
                    글번호 {data.pk}
                    글제목 <Link to={`/community/${data.pk}?name=${data.pk}`}>
                      {data.title}
                    </Link>
                    작성시간 {data.created_at}
                    작성자 {data.user}
                    댓글수 {data.comments.length}
                  </h6>
                </div>
              )
            })}
          </>
          : null
      }
    </Container>
  )
}

export default Community;