import { useEffect, useState } from "react";
const { kakao } = window

function KakaoMap() {
  const [map, setMap] = useState()

  useEffect(() => {
    const container = document.getElementById('map')
    const options  = {center: new kakao.maps.LatLng(33.450701, 126.570667)}
    const kakaoMap =  new kakao.maps.Map(container, options);
    setMap(kakaoMap)
  }, [])

  return (
    <>
      <div id="map" style={{width: '100%', height: '350px'}} />
    </>
  )
}

export default KakaoMap