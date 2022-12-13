import axios from "axios";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../css/MatchingList.css";
import moment from "moment";
import "moment/locale/ko";

var baseURL = process.env.REACT_APP_BASE_URL;

function MatchingList() {
  const [matching, setMatching] = useState([]);
  const getroom = async () => {
    const res = await axios({
      method: "get",
      url: `${baseURL}/articles/matching_list/`,
    });
    setMatching(res.data);
    console.log(res);
  };
  useEffect(() => {
    getroom();
  }, []);
  return (
    <Container>
      <h1 className="matching-title">모임 리스트</h1>
      {matching ? (
        <div>
          {matching.map((data, idx) => {
            return (
              <div className="matching-card">
                {idx + 1} | {data.restaurant_name} |{" "}
                {moment(data.to_date).format("MM/D a h:mm")}
                <br />
                {data.title}
                <br />
                {data.content}
                {data.from_date}
                <br />
                {data.member.length}명<br />
                {data.member.length > 4 ? (
                  "4/4"
                ) : (
                  <Link
                    className="matchingLink"
                    to={`/matching_room/${data.restaurant_id}/${data.id}`}
                  >
                    자세히보기
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      ) : null}
    </Container>
  );
}
export default MatchingList;
