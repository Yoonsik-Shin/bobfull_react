import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import styled from '../css/Button.module.css'

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log('totally custom!'),
  );

  return (
    <button
      onClick={decoratedOnClick}
      className={styled.createBtn}
    >
      {children}
    </button>
  );
}

export default CustomToggle; 