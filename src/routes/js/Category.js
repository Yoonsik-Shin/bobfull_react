import { Container, Row, Col } from 'react-bootstrap'

function Category() {
  return (
      <Container>
        <Row xs={5}>
          <Col>족발/보쌈</Col>
          <Col>찜/탕/찌개</Col>
          <Col>일식</Col>
          <Col>피자</Col>
          <Col>고기</Col>
      </Row>
      </Container>
  )
}

export default Category