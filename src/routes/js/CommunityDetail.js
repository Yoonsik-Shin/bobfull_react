import axios from 'axios';
import { Container, Form } from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Topnavbar from '../../../src/components/js/Topnavbar';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import CostomToggle from '../../components/js/CustomArticle';
import Button from 'react-bootstrap/Button';
import ContentCheck from "../../components/js/ArticleContent";

var baseURL = process.env.REACT_APP_BASE_URL

function CommunityDetail() {
  let { id } = useParams()
  const name = new URL(window.location.href).searchParams.get('name')
  const [article, setArticle] = useState()
  const [content, setContent] = useState("")
  const [recommentId, setRecommentId] = useState([])

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  const getArticle = async () => {
    const res = await axios({
      method: 'get',
      url: `${baseURL}/community/${id}/`
    })
    setArticle(res.data)
    console.log(article)
  }

  const onSubmitReview = async (e) => {
    e.preventDefault();
    const submit = await axios({
      method: 'post',
      url: `${baseURL}/community/${id}/comment/`,
      data: {
        content: content,
      }
    })
    console.log(submit)
    console.log(e)
    e.target[0].value = ''
    getArticle()
  }

  const onSubmitRecomment = async (e) => {
    console.log(recommentId)
    e.preventDefault();
    const submit = await axios({
      method: 'post',
      url: `${baseURL}/community/${id}/comment/${e.target.dataset.name}/recomment/`,
      data: {
        content: content,
      }
    })
    console.log(submit)
    e.target[0].value = ''
    getArticle()
  }

  const onClick = async (e) => {
    e.target.offsetParent.children[1].firstChild.firstChild[0].value = ''
  }

  useEffect(() => {
    getArticle()
  }, [])

  return (
    <Container>
      <Topnavbar
        key='res'
        pagename={name ? name + '번 글' : ''}
      />
      {article ?
        <>
          <h2>
            글 제목 {article.title}
            글 내용 {article.content}
            글 작성시간 {article.created_at}
            글 작성자 {article.user}
          </h2>
          <h2>
            댓글
            <Accordion onClick={onClick}>
              <Card>
                <Card.Header>
                  <CostomToggle eventKey="0">댓글 작성</CostomToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <Form onSubmit={onSubmitReview}>
                      <ContentCheck handleContent={handleContent} />
                      <Button type='submit' variant="primary">
                        작성
                      </Button>
                    </Form>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
            {article.comments ?
              <>
                {article.comments.map((data, idx) => {
                  return (
                    <div>
                      <h6>
                        {data.user}
                        {data.content}
                        {data.created_at}
                      </h6>
                      <Accordion onClick={onClick}>
                        <Card>
                          <Card.Header>
                            <CostomToggle eventKey="0">답글 작성</CostomToggle>
                          </Card.Header>
                          <Accordion.Collapse eventKey="0">
                            <Card.Body>
                              <Form onSubmit={onSubmitRecomment} data-name={data.pk}>
                                <ContentCheck handleContent={handleContent} />
                                <Button type='submit' variant="primary">
                                  작성
                                </Button>
                              </Form>
                            </Card.Body>
                          </Accordion.Collapse>
                        </Card>
                      </Accordion>
                      {data.soncomments.length > 0 ?
                        <>
                          <Accordion>
                            <Card>
                              <Card.Header>
                                <CostomToggle eventKey="0">답글 {data.soncomments.length} 개</CostomToggle>
                              </Card.Header>
                              <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                  {data.soncomments.map((sondata, sonidx) => {
                                    return (
                                      <h6>
                                        {sondata.user}
                                        {sondata.content}
                                        {sondata.created_at}
                                      </h6>
                                    )
                                  })}
                                </Card.Body>
                              </Accordion.Collapse>
                            </Card>
                          </Accordion>
                        </>
                        : null
                      }
                    </div>
                  )
                })}
              </>
              : <p>아직 댓글이 없어요😅</p>}
          </h2>
        </>
        : null
      }
    </Container>
  )
}

export default CommunityDetail;