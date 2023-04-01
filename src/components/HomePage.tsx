import React, { useState } from 'react'
import { Image } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';

function HomePage() {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <div className='container'>
      <div className='row'>
        <div className='text-center mb-5'>
          <h1>Dashboard</h1>
        </div>

      </div>
      <div className='row'>
        <div className="col-md-3">
          <div className='row'>
            <h3>Toplam Post Sayısı</h3>
          </div>
          <div className='row'>
            <h3>En Çok Post Atan Kullanıcı Id</h3>
            <Image src='./img/bow.png' width={70} height={70}></Image>
          </div>
        </div>

        <div className="col-md-9">

          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
              <Button variant="primary" onClick={handleShow}>Yorumları Göster </Button>
            </Card.Body>
          </Card>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Post no:1'in Yorumları</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>

          </Modal>
        </div>

      </div>

    </div>
  )
}
export default HomePage