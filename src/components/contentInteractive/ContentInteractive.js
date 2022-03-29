import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Offcanvas from 'react-bootstrap/Offcanvas'
import Button from 'react-bootstrap/Button';

import './contentInteractive.scss';

const ContentInteractive = ({ name, ...props }) => {
  const [show, setShow] = useState(false);
  const res768px = useMediaQuery({ query: '(max-width: 768px)' })

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  if (res768px) return (
    <>
      <Button className={`content__interactive_${props.placement}`} variant="light" onClick={handleShow}>
        {name}
      </Button>

      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton />
        <Offcanvas.Body>
            {props.children}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )

  return (
    <div className="content__interactive ">
      {props.children}
    </div>
)

}

export default ContentInteractive