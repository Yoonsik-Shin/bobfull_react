import {Container} from 'react-bootstrap'
import axios from 'axios';

function Community() {
  let baseURL = process.env.REACT_APP_BASE_URL
  let articles = axios.post(`${baseURL}articles/review/`, {
    title: 'title_test1',
    content: 'title_test1',
    grade: "⭐",
  })
  return (
    <>
      <Container>
        <header>현재위치</header>
        <div>캐러셀</div>
        <div>검색</div>
      </Container>
    </>
  )
}

export default Community