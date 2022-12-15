import "./../css/navbar.css";
import Container from 'react-bootstrap/Container';
import { Nav, Navbar } from 'react-bootstrap';
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import '../css/test.css'
function NavbarBottom() {
  let navigate = useNavigate()

  const icon = document.querySelectorAll('.toolbar__icon');
  const smile = document.querySelector('.icon--smile svg');

  for (var i = 0; i < icon.length; i++) {
    icon[i].addEventListener('click', function () {
      for (var i = 0; i < icon.length; i++) {
        icon[i].classList.remove('is-active');
        smile.classList.remove('maj-left');
        smile.classList.remove('maj-right');
        smile.classList.remove('min-left');
        smile.classList.remove('min-right');
      }
      this.classList.add('is-active');
      if (this.classList.contains('icon--home')) {
        smile.classList.add('maj-left');
        document.body.classList = 'bg--yellow';
      } else if (this.classList.contains('icon--chart')) {
        smile.classList.add('min-left');
        document.body.classList = 'bg--green';
      } else if (this.classList.contains('icon--bell')) {
        smile.classList.add('min-right');
        document.body.classList = 'bg--red';
      } else if (this.classList.contains('icon--search')) {
        smile.classList.add('maj-right');
        document.body.classList = 'bg--purple';
      } else {
        document.body.classList = 'bg--blue';
      }
    })
  }
  return (
    <Navbar className="toolbar" bg='light' expand="lg">
      <Nav.Link onClick={() => { navigate('/main') }} className="navtext"><svg class="icon icon--home toolbar__icon bi bi-house-door" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146ZM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5Z" />
      </svg></Nav.Link>
      <Nav.Link onClick={() => { navigate('/multichat/index') }} className="navtext"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="icon icon--chart toolbar__icon bi bi-chat-text" viewBox="0 0 16 16">
        <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
        <path d="M4 5.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8zm0 2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z" />
      </svg></Nav.Link>
      <Nav.Link onClick={() => { navigate('/profile') }} className="navtext"><div class="icon icon--smile toolbar__icon is-active"><svg width="20px" height="17.5px" viewBox="0 0 16 14"
        version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <path class="eyes"
            d="M2,0 L4.94384766,0 L4.94384766,4.95300293 L2,4.95300293 L2,0 Z M11,0 L13.9438477,0 L13.9438477,4.95300293 L11,4.95300293 L11,0 Z M0.22565013,10.9812657 L1.77434987,9.01873435 C4.95970517,11.5324058"
            fill="#1F1B2C"></path>
          <path class="mouth"
            d="M2,0 L4.94384766,0 L11,0 Z M0.22565013,10.9812657 L1.77434987,9.01873435 C4.95970517,11.5324058 10.563769,12.0991976 14.2481226,9.03849361 L15.8456274,10.9615064 C11.1502649,14.8620861 4.26043783,14.1652529 0.22565013,10.9812657 Z"
            fill="#1F1B2C"></path>
        </g>
      </svg></div></Nav.Link>
      <Nav.Link onClick={() => { navigate('/community') }} className="navtext"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="icon icon--bell toolbar__icon bi bi-card-list" viewBox="0 0 16 16">
        <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
        <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
      </svg></Nav.Link>
      <Nav.Link onClick={() => { navigate(-1) }} className="navtext"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-return-left icon icon--search toolbar__icon" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z" />
      </svg></Nav.Link>
    </Navbar>
  );
}

export default NavbarBottom; 