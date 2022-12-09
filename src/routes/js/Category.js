import { Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Restaurants from './Restaurants.js';
import styled from '../../components/css/Button.module.css';
function Category() {
  return (
    <Row className={styled.categoryrow}>
      <h2></h2>
      <Col xs={3} className={styled.categorydiv}><Link to="/res_index/?category=1" className={styled.categoryName}><img src='./bibimbap.png' className={styled.categoryimg} />한식</Link></Col>
      <Col xs={3} className={styled.categorydiv}><Link to="/res_index/?category=2" className={styled.categoryName}><img src='./sushi.png' className={styled.categoryimg} />일식</Link></Col>
      <Col xs={3} className={styled.categorydiv}><Link to="/res_index/?category=3" className={styled.categoryName}><img src='./noodles.png' className={styled.categoryimg} />중식</Link></Col>
      <Col xs={3} className={styled.categorydiv}><Link to="/res_index/?category=4" className={styled.categoryName}><img src='./spaghetti.png' className={styled.categoryimg} />양식</Link></Col>
      <Col xs={3} className={styled.categorydiv}><Link to="/res_index/?category=5" className={styled.categoryName}><img src='./tteokbokki.png' className={styled.categoryimg} />분식</Link></Col>
      <Col xs={3} className={styled.categorydiv}><Link to="/res_index/?category=6" className={styled.categoryName}><img src='./pizza.png' className={styled.categoryimg} />피자</Link></Col>
      <Col xs={3} className={styled.categorydiv}><Link to="/res_index/?category=7" className={styled.categoryName}><img src='./chicken.png' className={styled.categoryimg} />치킨</Link></Col>
      <Col xs={3} className={styled.categorydiv}><Link to="/res_index/?category=8" className={styled.categoryName}><img src='./meat.png' className={styled.categoryimg} />고기</Link></Col>
      <Col xs={3} className={styled.categorydiv}><Link to="/res_index/?category=9" className={styled.categoryName}><img src='./ricenoodles.png' className={styled.categoryimg} />아시안</Link></Col>
      <Col xs={3} className={styled.categorydiv}><Link to="/res_index/?category=10" className={styled.categoryName}><img src='./liquor.png' className={styled.categoryimg} />술집</Link></Col>
      <Col xs={3} className={styled.categorydiv}><Link to="/res_index/?category=11" className={styled.categoryName}><img src='./cake.png' className={styled.categoryimg} />카페·디저트</Link></Col>
      <Col xs={3} className={styled.categorydiv}><Link to="/res_index/?category=12" className={styled.categoryName}><img src='./hamburger.png' className={styled.categoryimg} />패스트푸드</Link></Col>
      <Col xs={10} className={styled.categorydiv}><Link to="/res_index/?category=13" className={styled.categoryName}><img src='./more.png' className={styled.categoryimg} />기타</Link></Col>
    </Row>
  )
}

export default Category