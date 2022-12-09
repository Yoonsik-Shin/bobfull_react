import axios from 'axios'
import React, { useState, useEffect, useCallback } from 'react';
import '../css/Restaurants.css'
import { Container } from 'react-bootstrap'
import { Link } from "react-router-dom";
import Location from '../../hooks/useWatchLocation.js'
import { useInView } from "react-intersection-observer"
import styled from '../../components/css/Button.module.css';

function Restaurants() {
  var baseURL = process.env.REACT_APP_BASE_URL
  const [restaurants, setRestaurants] = useState([])
  const [number, setNumber] = useState(0)
  const [loading, setLoading] = useState(false)
  const [ref, inView] = useInView()

  const getItems = useCallback(async () => {
    setLoading(true)
    await axios({
      method: 'get',
      url: `${baseURL}/restaurant/`,
      headers: { 'Content-Type': 'application/json' },
      params: {
        limit: 10,
        offset: number,
      },
    })
      .then((res) => {
        console.log(res)
        setRestaurants(prevState => [...prevState, ...res.data.results])
      })
    setLoading(false)
    console.log(restaurants)
  }, [number])

  useEffect(() => {
    getItems()
  }, [getItems])

  useEffect(() => {
    if (inView && !loading && number < 980) {
      setNumber(prevState => prevState + 10)
    }
  }, [inView, loading])
  return (
    <Container>
      <h6>현재위치</h6>
      <Location />
      <form action="">
        <input type="text" />
        <input type="submit" value="검색" />
      </form>
      <Link to='/map'>지도로보기</Link>
      <div>
        <div>필터</div>
      </div>
      <div className="list">
        {restaurants.map((data, idx) => (
          <React.Fragment key={idx}>
            {restaurants.length - 1 == idx ? (
              <div className='res-img-wrapper' ref={ref}>
                {data.images.map((img, i) => {
                  return (
                    <img src={decodeURIComponent(data.images[i].image.replace('http://127.0.0.1:8000/media/', ''))} className='res-img' />
                  )
                })}
              </div>
            ) : (
              <div className='res-img-wrapper'>
                {data.images.map((img, i) => {
                  return (
                    <img src={decodeURIComponent(data.images[i].image.replace('http://127.0.0.1:8000/media/', ''))} className='res-img' />
                  )
                })}
              </div>
            )}
            <Link to={`/res_index/${data.id}`} className="res-index-name"><button className={styled.numberbtn}><p style={{ margin: '0' }}>{data.id}</p></button><button className={styled.categorynomargin}>{data.category_name}</button>
              <h3 className='res-index-h3'>{data.name}</h3>
            </Link>
            <div className='res-detail'>
              <div>별점</div><br />
              <div>거리</div>
            </div>
          </React.Fragment>
        ))};
      </div>

    </Container>
  );
}

export default Restaurants