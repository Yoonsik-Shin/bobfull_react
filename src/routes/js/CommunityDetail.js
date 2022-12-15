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
import styled from "../../components/css/Community.module.css";
import { useSelector } from "react-redux";
import Sheet from "react-modal-sheet";
import { useRef } from "react";
import { useOverlayTriggerState } from "react-stately";
import {
  useOverlay,
  useModal,
  OverlayProvider,
  FocusScope,
  useButton,
  useDialog,
} from "react-aria";
import SheetComp from "../../components/js/SheetComp";
import toast, { Toaster } from "react-hot-toast";

var baseURL = process.env.REACT_APP_BASE_URL;

function CommunityDetail() {
  const [isOpen, setOpen] = useState(false);
  let { id } = useParams();
  const name = new URL(window.location.href).searchParams.get("name");
  const [article, setArticle] = useState();
  const [content, setContent] = useState("");
  const [recommentId, setRecommentId] = useState([]);
  const user = useSelector((state) => state.user);
  const sheetState = useOverlayTriggerState({});
  const openButtonRef = useRef(null);
  const openButton = useButton({ onPress: sheetState.open }, openButtonRef);
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

  useEffect(() => {
    getArticle();
  }, []);

  return (
    <Container>
      <Toaster position="top-center" reverseOrder={false} />
      <Topnavbar key="res" pagename={name ? name : ""} />
      {article ? (
        <>
          <div className={styled.comdetailcard}>
            <p className={styled.comdetailtext} style={{ marginLeft: "5px" }}>
              {article.user.profile_image ? (
                <img
                  src={`${article.user.profile_image}`}
                  alt=""
                  className="commu-detail-profile-img"
                />
              ) : (
                <img
                  src="/basic_profile_img.png"
                  alt=""
                  className="commu-detail-profile-img"
                />
              )}
              {article.user.nickname} |{" "}
              {moment(article.created_at).format("MM/D a h:mm")}
            </p>
            <h2 className={styled.comdetailtext}>{article.title}</h2>
            <p className={styled.comdetailtext}>{article.content}</p>
            <div>
              <p className={styled.comdetailp}>
                댓글{" "}
                <span className={styled.comdetailspan}>
                  {article.comments.length}
                </span>
              </p>
              <div className={styled.comcomdiv}>
                {article.user.profile_image ? (
                  <img
                    src={`${article.user.profile_image}`}
                    alt=""
                    className="commu-detail-profile-img"
                  />
                ) : (
                  <img
                    src="/basic_profile_img.png"
                    alt=""
                    className="commu-detail-profile-img"
                  />
                )}
                <button
                  {...openButton.buttonProps}
                  ref={openButtonRef}
                  className={styled.comcomments}
                >
                  댓글 추가...
                </button>

                <Sheet
                  isOpen={sheetState.isOpen}
                  onClose={sheetState.close}
                  detent="content-height"
                >
                  <OverlayProvider>
                    <FocusScope contain autoFocus restoreFocus>
                      <SheetComp
                        key="1"
                        sheetState={sheetState}
                        comments={article.comments}
                        id={id}
                        getArticle={getArticle}
                      />
                    </FocusScope>
                  </OverlayProvider>
                </Sheet>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </Container>
  );
}

export default CommunityDetail;
