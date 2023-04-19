import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../css/Main.css";
import Topnavbar from "../../../src/components/js/Topnavbar";

const MAIN_LIST = [
  { xs: 4, category: "카테고리별", src: "/proteins.png", to: "/res_category" },
  { xs: 4, category: "음식점별", src: "/store.png", to: "/res_index" },
  { xs: 4, category: "음식룰렛", src: "/roulette2.png", to: "/roulette?" },
  { xs: 4, category: "모든 모임", src: "/random.png", to: "/matching_list" },
];

export default function MainPage() {
  return (
    <Container className="main-container">
      <Topnavbar key="roul" pagename="홈" />
      <h2>어떤 식당을 찾고 계세요?</h2>
      <Row className="main-flex">
        {MAIN_LIST.map((el, index) => (
          <MainCategory
            key={index}
            xs={el.xs}
            category={el.category}
            src={el.src}
            to={el.to}
          />
        ))}
      </Row>
      <Row className="main-flex">
        <h2>수다가 필요하신가요?</h2>
        <Col xs={8} className="choice-community">
          <p>커뮤니티</p>
          <Link to="/community" className="main-choice1">
            <img src={"/group.png"} className="choice-img" />
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

function MainCategory(props) {
  const { xs, category, src, to } = props;

  return (
    <Col xs={xs} className="choice-text">
      <Link to={to} className="main-choice">
        <img src={src} className="choice-img" />
      </Link>
      {category}
    </Col>
  );
}
