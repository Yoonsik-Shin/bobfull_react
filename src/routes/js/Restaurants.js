import axios from "axios";
import React, { useState, useEffect } from "react";
import "../css/Restaurants.css";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import styled from "../../components/css/Button.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Topnavbar from "../../../src/components/js/Topnavbar";
import PositionCalculation from "../../commons/positionCalculation";
import SearchBar from "../../components/js/Search";
import { useGetData } from "../../hooks/useGetData";
import { useSearch } from "../../hooks/useSearch";

function Restaurants() {
  const { kakao } = window;
  const code = new URL(window.location.href).searchParams.get("category");
  const name = new URL(window.location.href).searchParams.get("name");
  const [restaurants, setRestaurants] = useState([]);
  const [count, setCount] = useState(0);
  const [example, setExample] = useState([
    "./meat.png",
    "./meat.png",
    "./meat.png",
  ]);

  // 검색
  const [search, setSearch] = useState("");
  const handleSearch = (e) => setSearch(e.target.value);
  const onSubmitSearch = useSearch({ code, search, setRestaurants });

  // 데이터 받아오기
  const [number, setNumber] = useState(0);
  useGetData({ number, code, setRestaurants, setCount });

  // 무한스크롤
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView && number < count) {
      setNumber((prevState) => prevState + 10);
    }
  }, [inView]);

  return (
    <Container>
      <Topnavbar key="res" pagename={name ? name : "모든 목록"} />
      {
        <div style={{ paddingLeft: "10px" }}>
          현재검색어 : {search || "검색어를 입력해주세요"}
        </div>
      }
      <SearchBar onSubmitSearch={onSubmitSearch} handleSearch={handleSearch} />
      <div className="list">
        {restaurants.map(
          (data, idx) =>
            (
              <React.Fragment key={idx}>
                <div className="my-3">
                  {/* 이미지 */}
                  {search ? (
                    <div>{/* <SliderImage images={example} /> */}</div>
                  ) : (
                    <div ref={ref}>
                      {/* <SliderImage images={example} /> */}
                    </div>
                  )}

                  {/* 정보 */}
                  <div style={{ paddingLeft: "10px" }}>
                    <Link
                      to={`/res_index/${data.id}?name=${data.name}`}
                      className="res-index-name"
                    >
                      <button className={styled.numberbtn}>
                        <p style={{ margin: "0" }}>{data.id}</p>
                      </button>
                      <button className={styled.categorynomargin}>
                        {data.category_name}
                      </button>
                      <h3 className="res-index-h3">{data.name}</h3>
                    </Link>
                  </div>

                  {/* 거리 */}
                  <PositionCalculation
                    e={data.address}
                    idx={idx}
                    kakao={kakao}
                    className="res-detail"
                  />
                </div>
                <hr />
              </React.Fragment>
            ) ?? []
        )}
      </div>
    </Container>
  );
}

export default Restaurants;
