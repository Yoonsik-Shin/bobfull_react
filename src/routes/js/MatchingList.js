import axios from "axios";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../css/MatchingList.css";
import moment from "moment";
import "moment/locale/ko";
import Topnavbar from "../../../src/components/js/Topnavbar";
import { useSelector } from "react-redux";

var baseURL = process.env.REACT_APP_BASE_URL;

function MatchingList() {
  const user = useSelector((state) => state.user);
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
      <Topnavbar key="res" pagename={"모임 리스트"} />
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
                {data.member.length >= 4 ? (
                  <div>
                  4/4 인원초과<br/>
                  {
                    data.member.includes(user.id) ? <Link className="matching-link" to={`/matching_room/${data.restaurant_id}/${data.id}`}>자세히보기 (참여중)</Link> : null 
                  }
                  </div>
                ) : (
                  <div>
                    {
                      data.member.includes(user.id) ?
                      <Link className="matching-link" to={`/matching_room/${data.restaurant_id}/${data.id}`}>자세히보기 (참여중)</Link>
                      : <Link className="matching-link" to={`/matching_room/${data.restaurant_id}/${data.id}`}>자세히보기</Link>
                    }
                  </div>
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
