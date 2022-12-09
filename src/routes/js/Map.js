import { useEffect, useState } from "react";
import Location from '../../hooks/useWatchLocation.js'
const { kakao } = window

function KakaoMap() {

  return (
    <>
      <Location/>
    </>
  )
}

export default KakaoMap