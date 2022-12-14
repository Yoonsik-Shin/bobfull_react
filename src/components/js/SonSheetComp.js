import Sheet from "react-modal-sheet";
import { useRef } from "react";
import { useOverlayTriggerState } from "react-stately";
import styled from "../css/Community.module.css";
import {
  useOverlay,
  useModal,
  OverlayProvider,
  FocusScope,
  useButton,
  useDialog,
} from "react-aria";
import { Container, Form } from "react-bootstrap";
import ContentCheck from "./ArticleContent";
import { useEffect, useState } from "react";
import axios from "axios";
import "../css/SonSheetComp.css";

var baseURL = process.env.REACT_APP_BASE_URL;

const SonSheetComp = ({ sheetState, id, data, origincomment, getArticle2 }) => {
  const [article, setArticle] = useState();
  const [content, setContent] = useState("");
  const handleContent = (e) => {
    setContent(e.target.value);
  };
  const getArticle = async () => {
    const res = await axios({
      method: "get",
      url: `${baseURL}/community/${id}/comment/${data}/recomment/`,
    });
    setArticle(res.data);
  };
  const containerRef = useRef(null);
  const dialog = useDialog({}, containerRef);
  const overlay = useOverlay(
    { onClose: sheetState.close, isOpen: true, isDismissable: true },
    containerRef
  );

  const closeButtonRef = useRef(null);
  const closeButton = useButton(
    { onPress: sheetState.close, "aria-label": "Close sheet" },
    closeButtonRef
  );

  useModal();

  // In real world usage this would be a separate React component
  const customHeader = (
    <div style={{ height: "40px" }} className={styled.comheaderdiv}>
      {article ? (
        <span {...dialog.titleProps}>답글 {article.length}개</span>
      ) : null}
      <img
        src="/close.png"
        className={styled.comclosebtn}
        {...closeButton.buttonProps}
      />
    </div>
  );
  const onSubmitRecomment = async (e) => {
    e.preventDefault();
    const submit = await axios({
      method: "post",
      url: `${baseURL}/community/${id}/comment/${e.target.dataset.name}/recomment/`,
      data: {
        content: content,
      },
    });
    e.target[0].value = "";
    getArticle();
    getArticle2();
  };
  useEffect(() => {
    getArticle();
  }, []);

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
  return (
    <>
      <Sheet.Container
        {...overlay.overlayProps}
        {...dialog.dialogProps}
        ref={containerRef}
      >
        {article ? (
          <Sheet.Header>
            {customHeader}
            <div className={styled.combodydiv}>
              <p className={styled.comcommenttext}>
                {origincomment.user.profile_image ? (
                  <img
                    src={`${origincomment.user.profile_image}`}
                    alt=""
                    className="grandsoncomment-profile-img"
                  />
                ) : (
                  <img
                    src="/basic_profile_img.png"
                    alt=""
                    className="grandsoncomment-profile-img"
                  />
                )}
                {origincomment.user.nickname} ·{" "}
                {detailDate(new Date(origincomment.created_at))}
              </p>
              <p style={{ margin: 0 }}>{origincomment.content}</p>
            </div>
            <Form
              onSubmit={onSubmitRecomment}
              style={{ margin: "10px" }}
              data-name={data}
            >
              <ContentCheck handleContent={handleContent} name="답글" />
              {content ? (
                <input
                  type="image"
                  src="/paper.png"
                  className={styled.soncommentsubmitbtn}
                />
              ) : null}
            </Form>
          </Sheet.Header>
        ) : null}
        {article ? (
          <Sheet.Content>
            <div style={{ height: "310px" }} className={styled.combodydiv}>
              {article.map((data, idx) => {
                return (
                  <div className={styled.comcommentdiv}>
                    <p className={styled.comcommenttext}>
                      {data.user.profile_image ? (
                        <img
                          src={`${data.user.profile_image}`}
                          alt=""
                          className="grandsoncomment-profile-img"
                        />
                      ) : (
                        <img
                          src="/basic_profile_img.png"
                          alt=""
                          className="grandsoncomment-profile-img"
                        />
                      )}
                      {data.user.nickname} ·{" "}
                      {detailDate(new Date(data.created_at))}
                    </p>
                    <p style={{ margin: 0 }}>{data.content}</p>
                  </div>
                );
              })}
            </div>
          </Sheet.Content>
        ) : null}
      </Sheet.Container>
      <Sheet.Backdrop />
    </>
  );
};

export default SonSheetComp;
