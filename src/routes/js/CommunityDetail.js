import axios from 'axios';
import { Container } from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Topnavbar from '../../../src/components/js/Topnavbar';

var baseURL = process.env.REACT_APP_BASE_URL

function CommunityDetail() {
  let { id } = useParams()
  const name = new URL(window.location.href).searchParams.get('name')
  const [article, setArticle] = useState()

  const getArticle = async () => {
    const res = await axios({
      method: 'get',
      url: `${baseURL}/community/${id}/`
    })
    setArticle(res.data)
    console.log(article)
  }

  useEffect(() => {
    getArticle()
  }, [])

  return (
    <Container>
      <Topnavbar
        key='res'
        pagename={name ? name + '번 글' : ''}
      />
      {article ?
        <>
          <h2>
            글 제목 {article.title}
            글 내용 {article.content}
            글 작성시간 {article.created_at}
            글 작성자 {article.user}
          </h2>
          <h2>
            댓글
            {article.comments ?
              <>
                {article.comments.map((data, idx) => {
                  return (
                    <div>
                      <h6>
                        {data.user}
                        {data.content}
                      </h6>
                    </div>
                  )
                })}
              </>
              : <p>아직 댓글이 없어요😅</p>}
          </h2>
        </>
        : null
      }
    </Container>
  )
}

export default CommunityDetail;