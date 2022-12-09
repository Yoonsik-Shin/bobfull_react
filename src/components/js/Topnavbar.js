import { Link } from "react-router-dom";
import styled from '../css/Button.module.css'
import { useNavigate } from "react-router-dom";
function Topnavbar({ pagename, color }) {
  let navigate = useNavigate()
  return (
    <div className={styled.topnavbar}>
      <div onClick={() => { navigate(-1) }}>
        <img src="/arrow.png" className={styled.navimg} />
      </div>
      <p className={styled.navtext}>{pagename}</p>
    </div>
  )
}

export default Topnavbar;