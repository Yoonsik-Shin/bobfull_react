import { Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Restaurants from './Restaurants.js';
import styled from '../../components/css/Button.module.css';
import Topnavbar from '../../../src/components/js/Topnavbar';
function Category() {
  return (
    <div>
      <div className={styled.categorynavdiv}>
        <Topnavbar
          key='Category'
          pagename='카테고리'
        />
      </div>
      <Row className={styled.categoryrow}>
        <h2></h2>
        <Col xs={3} className={styled.categorydiv}><Link to="/res_index/?category=1&name=한식" className={styled.categoryName}><img src='./bibimbap.png' className={styled.categoryimg} />한식</Link></Col>
        <Col xs={3} className={styled.categorydiv}><Link to="/res_index/?category=2&name=일식" className={styled.categoryName}><img src='./sushi.png' className={styled.categoryimg} />일식</Link></Col>
        <Col xs={3} className={styled.categorydiv}><Link to="/res_index/?category=3&name=중식" className={styled.categoryName}><img src='./noodles.png' className={styled.categoryimg} />중식</Link></Col>
        <Col xs={3} className={styled.categorydiv}><Link to="/res_index/?category=4&name=양식" className={styled.categoryName}><img src='./spaghetti.png' className={styled.categoryimg} />양식</Link></Col>
        <Col xs={3} className={styled.categorydiv}><Link to="/res_index/?category=5&name=분식" className={styled.categoryName}><img src='./tteokbokki.png' className={styled.categoryimg} />분식</Link></Col>
        <Col xs={3} className={styled.categorydiv}><Link to="/res_index/?category=6&name=피자" className={styled.categoryName}><img src='./pizza.png' className={styled.categoryimg} />피자</Link></Col>
        <Col xs={3} className={styled.categorydiv}><Link to="/res_index/?category=7&name=치킨" className={styled.categoryName}><img src='./chicken.png' className={styled.categoryimg} />치킨</Link></Col>
        <Col xs={3} className={styled.categorydiv}><Link to="/res_index/?category=8&name=고기" className={styled.categoryName}><img src='./meat.png' className={styled.categoryimg} />고기</Link></Col>
        <Col xs={3} className={styled.categorydiv}><Link to="/res_index/?category=9&name=아시안" className={styled.categoryName}><img src='./ricenoodles.png' className={styled.categoryimg} />아시안</Link></Col>
        <Col xs={3} className={styled.categorydiv}><Link to="/res_index/?category=10&name=술집" className={styled.categoryName}><img src='./liquor.png' className={styled.categoryimg} />술집</Link></Col>
        <Col xs={3} className={styled.categorydiv}><Link to="/res_index/?category=11&name=카페·디저트" className={styled.categoryName}><img src='./cake.png' className={styled.categoryimg} />카페·디저트</Link></Col>
        <Col xs={3} className={styled.categorydiv}><Link to="/res_index/?category=12&name=패스트푸드" className={styled.categoryName}><img src='./hamburger.png' className={styled.categoryimg} />패스트푸드</Link></Col>
        <Col xs={10} className={styled.categorydiv}><Link to="/res_index/?category=13&name=기타" className={styled.categoryName}><img src='./more.png' className={styled.categoryimg} />기타</Link></Col>
      </Row>
    </div>
  )
}

export default Category