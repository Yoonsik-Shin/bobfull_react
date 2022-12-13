import Sheet from 'react-modal-sheet';
import { useRef } from 'react';
import { useOverlayTriggerState } from 'react-stately';
import {
  useOverlay,
  useModal,
  OverlayProvider,
  FocusScope,
  useButton,
  useDialog,
} from 'react-aria';
import axios from "axios";
import { Container, Form } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Topnavbar from "./Topnavbar";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ContentCheck from "./ArticleContent";
import moment from "moment";
import "moment/locale/ko";
import styled from '../css/Community.module.css';
import CostomToggle from "./CustomArticle";
import SonSheetComp from './SonSheetComp';
import { OverlayTriggerState } from 'react-stately';

var baseURL = process.env.REACT_APP_BASE_URL;

const SheetComp = ({ sheetState, comments, id, getArticle }) => {
  const [content, setContent] = useState("");
  const containerRef = useRef(null);
  console.log(comments)
  const dialog = useDialog({}, containerRef);
  const overlay = useOverlay(
    { onClose: sheetState.close, isOpen: true, isDismissable: true },
    containerRef
  );

  const closeButtonRef = useRef(null);
  const closeButton = useButton(
    { onPress: sheetState.close, 'aria-label': 'Close sheet' },
    closeButtonRef
  );

  useModal();
  const handleContent = (e) => {
    setContent(e.target.value);
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
  const onClick = async (e) => {
    e.target.offsetParent.children[1].firstChild.firstChild[0].value = "";
  };
  // In real world usage this would be a separate React component
  const customHeader = (
    <div style={{ height: '40px' }} className={styled.comheaderdiv}>
      <span {...dialog.titleProps}>댓글 {comments.length}개</span>
      <img src='/close.png' className={styled.comclosebtn} {...closeButton.buttonProps} />
    </div>
  );

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
  const sheetState2 = useOverlayTriggerState({});
  const openButtonRef = useRef(null);
  const openButton = useButton({ onPress: sheetState2.open }, openButtonRef);
  return (
    <>
      <Sheet.Container
        {...overlay.overlayProps}
        {...dialog.dialogProps}
        ref={containerRef}
      >
        <Sheet.Header>{customHeader}
          <Form onSubmit={onSubmitReview} style={{ margin: '10px' }}>
            <ContentCheck handleContent={handleContent} name='댓글' />
            {content ?
              <input type='image' src='/paper.png' className={styled.commentsubmitbtn} />

              : null}
          </Form>
        </Sheet.Header>
        <Sheet.Content>
          <div style={{ height: '360px' }} className={styled.combodydiv}>
            {comments ? (
              <>
                {comments.map((data, idx) => {
                  return (
                    <div className={styled.comcommentdiv}>
                      <p className={styled.comcommenttext}>
                        {data.user} · {detailDate(new Date(data.created_at))}
                      </p>
                      <p style={{ margin: 0 }}>{data.content} <img src='/chat.png' {...openButton.buttonProps} ref={openButtonRef} className={styled.soncomments} /></p>

                      {data.soncomments.length > 0 ?
                        <a {...openButton.buttonProps} ref={openButtonRef} className={styled.sonlength}>
                          답글 {data.soncomments.length + '개'}
                        </a>
                        : null}

                      <Sheet isOpen={sheetState2.isOpen} onClose={sheetState2.close} detent="content-height" aria-label={idx}>
                        <OverlayProvider>
                          <FocusScope contain autoFocus restoreFocus>
                            <SonSheetComp
                              key={data.pk}
                              sheetState={sheetState2}
                              id={id}
                              data={data.pk}
                              origincomment={data}
                            />
                          </FocusScope>
                        </OverlayProvider>
                      </Sheet>
                    </div>

                  )
                }
                )}
              </>
            ) : null}
          </div>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </>
  );
};

export default SheetComp;