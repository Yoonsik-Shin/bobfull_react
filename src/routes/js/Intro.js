import { Animator, ScrollContainer, ScrollPage, batch, Fade, FadeIn, FadeOut, Move, MoveIn, MoveOut, Sticky, StickyIn, StickyOut, Zoom, ZoomIn, ZoomOut } from "react-scroll-motion";
import styled from '../../components/css/Intro.module.css'
import '../../components/css/Button.css'

function Intro() {
  const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn());
  const FadeUp = batch(Fade(), Move(), Sticky());
  const Spin = (cycle) =>
  ({
    in: {
      style: {
        transform: (p) => `rotate(${p * 360 * cycle}deg)`,
      },
    },
    out: {
      style: {
        transform: (p) => `rotate(${p * 360 * cycle}deg)`,
      },
    },
  });
  return (
    <ScrollContainer>
      <ScrollPage className={styled.intro}>
        <Animator animation={batch(Fade(), Sticky(), MoveOut(0, -200))} className={styled.introdiv}>
          <img src="/winter.jpg" className={styled.introimg} />
          <h1 className={styled.introtext}>
            안녕하세요 😀<br />
            <br />
            새로운 길을 좋아하는<br />
            5명이 3주간 함께만든<br />
            프로젝트 입니다.
          </h1>
        </Animator>
      </ScrollPage>
      <ScrollPage className={styled.intro}>
        <Animator animation={batch(Fade(), Sticky(), MoveOut(0, -200))} className={styled.introdiv}>
          <img src="/meeting.jpg" className={styled.introimg} />
          <h1 className={styled.introtext}>
            먼저 팀원부터 소개하자면<br />
            <span style={{ fontSize: 20 }}>문경님은 팀장으로서, <br />맡은 일을 어떻게든 끝내며, 팀의 방향을 이끌어줬고,
              <br />윤식님과 태극님은 <br />프론트와 백의 길잡이처럼 모든 길을 뚫어주셨어요.
              <br />주용님은 <br />크롤링과 채팅을 맡아서 깔끔하게 구현 완성해주셨고,
              <br />발표자인 저는, <br />프론트를 정말 안해봐서 너무 못하지만 최대한 열심히 디자인했습니다.</span>
          </h1>
        </Animator>
      </ScrollPage>
      <ScrollPage className={styled.intro}>
        <Animator animation={batch(Fade(), Sticky(), MoveOut(0, -200))} className={styled.introdiv2}>
          <img src="/phone.jpg" className={styled.introimg2} />
          <h1 className={styled.introtext}>밥-풀
            <br /><span style={{ fontSize: 20 }}>명사 <br />
              1.가려는 식당이 같거나 비슷한
              <br />혼밥러들이 함께 밥을 먹는 일</span></h1>
        </Animator>
      </ScrollPage>
      <ScrollPage className={styled.intro}>
      </ScrollPage>
      <ScrollPage className={styled.intro}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} >
          <h1 className={styled.introtext}>
            <Animator animation={MoveIn(-1000, 0)}>판교에서 만나요 👋🏻 - 용환</Animator>
            <Animator animation={MoveIn(1000, 0)}>다들 취뽀해요~ 🍔 - 윤식</Animator>
            3주동안 고생많으셨고 런칭합시다~<img src="/monkyong.png" style={{ width: 45 }} />- 문경
            <Animator animation={MoveOut(1000, 0)}>막판을 불태운 우리들의 라스트 댄스 <img src="/tae.png" style={{ width: 50 }} /> - 태극</Animator>
            <Animator animation={MoveOut(-1000, 0)}>야옹😹 - 주용</Animator>
          </h1>
        </div>
      </ScrollPage>
      <ScrollPage className={styled.intro}>
        <div className={styled.introone}>
          <Animator animation={batch(Sticky(), Fade(), Spin(3))}>
            <h1>Loading......</h1>
          </Animator>
        </div>
      </ScrollPage>
      <ScrollPage className={styled.intro}>
        <Animator animation={batch(Fade(), Sticky())}>
          <div className={styled.introlastdiv}>
            <h1 className={styled.introtext} style={{ marginBottom: 50 }}>아래의 링크로 접속 가능합니다.</h1>
            <a href="https://master.d3n2xysrd0lvj9.amplifyapp.com/"><button id="introbutton" class="learn-more">
              <span class="circle" aria-hidden="true">
                <span class="icon arrow"></span>
              </span>
              <span class="button-text">Learn More</span>
            </button></a>
          </div>
        </Animator>
      </ScrollPage>

    </ScrollContainer>
  )
}

export default Intro;