import { Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import '../css/Main.css'


function Main() {
  return (
    <Container className='main-container'>
      <h2>어떤 식당을 찾고 계세요?</h2>
      <Row className="main-flex">
      </Row>
      <h2>이런 음식은 어떠세요?</h2>
      <Row className="main-flex">
        <Col xs={4} className="choice-text"><Link to="/res_category" className="main-choice"><img src={'/proteins.png'} className='choice-img' /></Link>카테고리별</Col>
        <Col xs={4} className="choice-text"><Link to="/res_index" className="main-choice"><img src={'/store.png'} className='choice-img' /></Link>음식점별</Col>
        <Col xs={4} className="choice-text"><Link to="/roulette" className="main-choice"><img src={'/roulette2.png'} className='choice-img' /></Link>음식룰렛</Col>
        <Col xs={4} className="choice-text"><Link to="/" className="main-choice"><img src={'/random.png'} className='choice-img' /></Link>식당추천</Col>
        <Col xs={4} className="choice-text"><Link to="/roulette" className="main-choice"><img src={'/group.png'} className='choice-img' /></Link>커뮤니티</Col>
        <Col xs={4} className="choice-text"><Link to="/" className="main-choice"><img src={'/random.png'} className='choice-img' /></Link>식당추천</Col>
      </Row>
      <h2>수다가 필요하신가요?</h2>
      <Row className="main-flex">
      </Row>
    </Container>
  )
}

export default Main