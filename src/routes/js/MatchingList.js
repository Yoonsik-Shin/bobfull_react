import axios from 'axios';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'
var baseURL = process.env.REACT_APP_BASE_URL

function MatchingList() {

  const [matching, setMatching] = useState([])
  const getroom = async () => {
    const res = await axios({
      method: 'get',
      url: `${baseURL}/articles/matching_list/`
    })
    setMatching(res.data)
    console.log(res)
  }
  useEffect(() => {
    getroom()
  }, [])
  return (
    <Container>
      {
        matching ?
          <div>
            {matching.map((data, idx) => {
              return (
                <div>
                  {data.id}<br />
                  {data.title}<br />
                  {data.content}<br />
                  {data.from_date}<br />
                  {data.to_date}<br />
                  {data.member.length}명<br />
                  {data.restaurant_name}<br />
                  <Link to={`/matching_room/${data.restaurant_id}/${data.id}`}>자세히보기</Link>
                </div>
              )
            })}
          </div>
          : null
      }
    </Container>
  )
}
export default MatchingList;