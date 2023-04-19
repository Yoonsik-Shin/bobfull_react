import { useEffect, useState } from "react";
import { useWatchLocation } from "../hooks/useWatchLocation";
import { getDistanceFromLatLonInKm } from "./getDistanceFromLatLonInKm";

export default function PositionCalculation({ e, idx, kakao }) {
  const [info, setInfo] = useState("");
  const { curLocation } = useWatchLocation();
  const geocoder = new kakao.maps.services.Geocoder();

  useEffect(() => {
    geocoder.addressSearch(e.slice(0, -8), (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const cnt = getDistanceFromLatLonInKm(
          curLocation.center.lat,
          curLocation.center.lng,
          parseFloat(result[0].y),
          parseFloat(result[0].x)
        );

        let conversion = Math.round(cnt * 100) / 100;
        let conversionM = conversion * 1000;

        if (conversion < 1) setInfo(`${conversionM}m`);
        else setInfo(`${conversion}km`);
      } else setInfo(`거리정보가 없습니다.`);
    });
  }, [curLocation]);

  return (
    <div id={idx} style={{ paddingLeft: "10px" }}>
      {info}
    </div>
  );
}
