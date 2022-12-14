import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Container, ListGroup, Form } from "react-bootstrap";
import Topnavbar from "../../../src/components/js/Topnavbar";
import { useState } from "react";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

var baseURL = process.env.REACT_APP_BASE_URL;

function Evaluation() {

  let navigate = useNavigate();
  let useParam = useParams(); 
  const user = useSelector((state) => state.user);
  const [evaluations, setValuations] = useState({
    evaluation: null,
    user: user.id
  })

  const evaluateRoom = async (e) => {
    e.preventDefault();
    const evaluate = await axios({
      method: "post",
      url: `${baseURL}/articles/${useParam.id}/matching_room/${useParam.detail}/review/`,
      data: evaluations
    });
    console.log(evaluate.data);
    setTimeout(() => toast.success("성공적으로 반영 되었습니다."), 200);
    navigate(`/matching_room/${useParam.id}/${useParam.detail}`);
  };

  console.log(evaluations)
  return (
    <Container>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Topnavbar key="roul" pagename={`#${useParam.detail} 매칭룸 평가`} />
      <h3>매칭룸에 대한 평가를 남겨주세요!</h3>
      <FlushExample evaluations={evaluations} setValuations={setValuations} />
      { evaluations.evaluation ? 
        <div className="my-3">"{evaluations.evaluation}"를 선택하셨습니다.</div>
        : null  
      }
      <div></div>
      <Form onSubmit={evaluateRoom}>
        <button type="submit" className="matching-detail-btn">평가하기</button>
      </Form>
    </Container>
  )
}

export default Evaluation

function FlushExample(props) {
  return (
    <ListGroup variant="flush">
      <ListGroup.Item onClick={(e)=>{props.setValuations({...props.evaluations, 'evaluation': e.target.innerText})}}>매너가 좋았어요.</ListGroup.Item>
      <ListGroup.Item onClick={(e)=>{props.setValuations({...props.evaluations, 'evaluation': e.target.innerText})}}>제 시간에 맞춰 왔어요.</ListGroup.Item>
      <ListGroup.Item onClick={(e)=>{props.setValuations({...props.evaluations, 'evaluation': e.target.innerText})}}>약속시간에 늦었어요.</ListGroup.Item>
      <ListGroup.Item onClick={(e)=>{props.setValuations({...props.evaluations, 'evaluation': e.target.innerText})}}>다시 만나기 싫어요.</ListGroup.Item>
    </ListGroup>
  );
}
