import axios from "axios";
import { Container, Form } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Topnavbar from "../../../src/components/js/Topnavbar";
import Accordion from "react-bootstrap/Accordion";
import "../css/CommunityDetail.css";
import Card from "react-bootstrap/Card";
import CostomToggle from "../../components/js/CustomArticle";
import Button from "react-bootstrap/Button";
import ContentCheck from "../../components/js/ArticleContent";
import moment from "moment";
import "moment/locale/ko";

var baseURL = process.env.REACT_APP_BASE_URL;

function CommunityDetail() {
  let { id } = useParams();
  const name = new URL(window.location.href).searchParams.get("name");
  const [article, setArticle] = useState();
  const [content, setContent] = useState("");
  const [recommentId, setRecommentId] = useState([]);

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  const getArticle = async () => {
    const res = await axios({
      method: "get",
      url: `${baseURL}/community/${id}/`,
    });
    setArticle(res.data);
    console.log(article);
  };


  const onSubmitReview = async (e) => {
    e.preventDefault();
    const submit = await axios({
      method: "post",
      url: `${baseURL}/community/${id}/comment/`,
      data: {
        content: content,
      },
    });
    console.log(submit);
    console.log(e);
    e.target[0].value = "";
    getArticle();
  };

  const onSubmitRecomment = async (e) => {
    console.log(recommentId);
    e.preventDefault();
    const submit = await axios({
      method: "post",
      url: `${baseURL}/community/${id}/comment/${e.target.dataset.name}/recomment/`,
      data: {
        content: content,
      },
    });
    console.log(submit);
    e.target[0].value = "";
    getArticle();
  };

  const onClick = async (e) => {
    e.target.offsetParent.children[1].firstChild.firstChild[0].value = "";
  };

  useEffect(() => {
    getArticle();
  }, []);

  return (
    <Container>
      <Topnavbar key="res" pagename={name ? name + "번 글" : ""} />
      {article ? (
        <>
          <div className="article-card">
            <p>
              {article.user} {moment(article.created_at).format("MM/D a h:mm")}
            </p>
            <h2>{article.title}</h2>
            <p>{article.content}</p>
          </div>
          <div className="comment-block">
            <div>
              <h4>댓글</h4>
            </div>
            <Accordion onClick={onClick}>
              <Card>
                <Card.Header>
                  <CostomToggle eventKey="0" className="commentBtn">
                    작성하기
                  </CostomToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <Form onSubmit={onSubmitReview}>
                      <ContentCheck handleContent={handleContent} />
                      <Button
                        type="submit"
                        variant="primary"
                        className="commentBtn"
                      >
                        작성
                      </Button>
                    </Form>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
            {article.comments ? (
              <>
                {article.comments.map((data, idx) => {
                  return (
                    <div>
                      <h6>
                        {data.user}
                        {data.content}
                        {data.created_at}
                        <hr></hr>
                      </h6>
                      <Accordion onClick={onClick}>
                        <Card>
                          <Card.Header>
                            <CostomToggle eventKey="0">답글 작성</CostomToggle>
                          </Card.Header>
                          <Accordion.Collapse eventKey="0">
                            <Card.Body>
                              <Form
                                onSubmit={onSubmitRecomment}
                                data-name={data.pk}
                              >
                                <ContentCheck handleContent={handleContent} />
                                <Button
                                  type="submit"
                                  variant="primary"
                                  className="commentBtn"
                                >
                                  작성
                                </Button>
                              </Form>
                            </Card.Body>
                          </Accordion.Collapse>
                        </Card>
                      </Accordion>
                      {data.soncomments.length > 0 ? (
                        <>
                          <Accordion>
                            <Card>
                              <Card.Header>
                                <CostomToggle eventKey="0">
                                  답글 {data.soncomments.length} 개
                                </CostomToggle>
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
                                    );
                                  })}
                                </Card.Body>
                              </Accordion.Collapse>
                            </Card>
                          </Accordion>
                        </>
                      ) : null}
                    </div>
                  );
                })}
              </>
            ) : (
              <p>아직 댓글이 없어요😅</p>
            )}
          </div>
        </>
      ) : null}
    </Container>
  );
}

export default CommunityDetail;
