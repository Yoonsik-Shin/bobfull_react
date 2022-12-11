import axios from 'axios'
import React, { useState, useEffect, useCallback } from 'react';
import '../css/Restaurants.css'
import { Container } from 'react-bootstrap'
import { Link } from "react-router-dom";
import Location from '../../hooks/useWatchLocation.js'
import { useInView } from "react-intersection-observer"
import styled from '../../components/css/Button.module.css';
import { } from 'react-kakao-maps-sdk'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Topnavbar from '../../../src/components/js/Topnavbar';

function Restaurants() {
  const code = new URL(window.location.href).searchParams.get('category')
  const name = new URL(window.location.href).searchParams.get('name')
  var baseURL = process.env.REACT_APP_BASE_URL
  const [restaurants, setRestaurants] = useState([])
  const [number, setNumber] = useState(0)
  const [loading, setLoading] = useState(false)
  const [ref, inView] = useInView()
  const { kakao } = window;
  const [count, setCount] = useState(0)
  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  })

  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }))
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }))
        }
      )
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }))
    }
  }, [])

  const getItems = useCallback(async () => {
    setLoading(true)
    await axios({
      method: 'get',
      url: `${baseURL}/restaurant/`,
      headers: { 
        'Content-Type': 'application/json', 
      },
      params: {
        category: code ? code : '',
        limit: 10,
        offset: number,
      },
    })
      .then((res) => {
        setRestaurants(prevState => [...prevState, ...res.data.results])
        setCount(res.data.count)
      })
    setLoading(false)
  }, [number])

  useEffect(() => {
    getItems()
  }, [getItems])

  useEffect(() => {
    if (inView && !loading && number < 980 && number < count) {
      setNumber(prevState => prevState + 10)
    }
  }, [inView, loading])

  const PositionCalculation = (e, idx) => {
    var geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(e.slice(0, -8), function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const cnt = getDistanceFromLatLonInKm(state.center.lat, state.center.lng, parseFloat(result[0].y), parseFloat(result[0].x));
        const res_idx = document.getElementById(idx)
        let conversion = Math.round(cnt * 100) / 100;
        let conversionM = conversion * 1000
        if (conversion < 1) {
          res_idx.innerText = `거리 ${conversionM}m`
        }
        else {
          res_idx.innerText = `거리 ${conversion}km`
        }
      }
      else {
        const res_idx = document.getElementById(idx)
        res_idx.innerText = ''
      }
    })
  }

  function getDistanceFromLatLonInKm(lat1, lng1, lat2, lng2) {
    function deg2rad(deg) {
      return deg * (Math.PI / 180)
    }
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lng2 - lng1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: false,
    autoplaySpeed: 90000,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: false,
    centerPadding: "20px"
  };

  return (
    <Container>
      <Topnavbar
        key='res'
        pagename={name ? name : '모든 목록'}
      />
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
      <hr />
      <div className="list">
        {restaurants.map((data, idx) => (
          <React.Fragment key={idx}>
            <div className='my-3'>
              {restaurants.length - 1 == idx ? (
                <div ref={ref}>
                  <Slider {...settings}>
                    {data.images.map((img, i) => {
                      return (
                        <img src={decodeURIComponent(data.images[i].image.replace('https://bobfull.s3.ap-northeast-2.amazonaws.com/https%3A/', 'https://'))} className='res-img' />
                      )
                    })}
                  </Slider>
                </div>
              ) : (
                <div>
                  <Slider {...settings}>
                    {data.images.map((img, i) => {
                      return (
                        <img src={decodeURIComponent(data.images[i].image.replace('https://bobfull.s3.ap-northeast-2.amazonaws.com/https%3A/', 'https://'))} className='res-img' />
                      )
                    })}
                  </Slider>
                </div>
              )}
              <div style={{ paddingLeft: '10px' }}>
                <Link to={`/res_index/${data.id}?name=${data.name}`} className="res-index-name">
                  <button className={styled.numberbtn}>
                    <p style={{ margin: '0' }}>{data.id}</p>
                  </button>
                  <button className={styled.categorynomargin}>
                    {data.category_name}
                  </button>
                  <h3 className='res-index-h3'>{data.name}</h3>
                </Link>
                <div className='res-detail'>
                  <div>별점</div>
                  <div id={idx}>거리{PositionCalculation(data.address, idx)}</div>
                </div>
              </div>
            </div>
            <hr />
          </React.Fragment>
        ))}
      </div>

    </Container>
  );
}

export default Restaurants;