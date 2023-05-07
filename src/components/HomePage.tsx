import React, { useEffect, useState } from 'react'
import { Image } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Header from './Header'
import {Container, Row, Col } from 'react-bootstrap';
import '../App.css'


// Post Cardları için type tanımlama 
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;

}

// Yorumlar için type tanımlama 
interface Comments {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}



function HomePage() {

  // Post Sayısının set edildiği yer
  const [postCount, setPostCount] = useState<number>(0)

  // Modal görüntülenmesi için durum tanımlama
  const [show, setShow] = useState(false)
  const [postId, setPostId] = useState(null)
  const handleClose = () => setShow(false)

  const handleShow = (postId: any) => {
    setPostId(postId)
    setShow(true)
  }

  //Post kartlarının apiden çekildiği yer
  const [posts, setPosts] = useState<Post[]>([])
  const [mostUsedPosts, setMostUsedPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
        setPosts(data); 
        setPostCount(data.length);
        const sortedPosts = data.sort((a: any, b: any) => b.userId - a.userId);
        const mostUsedPosts = sortedPosts.slice(0, 1);
        setMostUsedPosts(mostUsedPosts);
      })
      .catch(error => console.log(error))
  }, [])


  // Yorumların apiden çekildiği yer
  const [comments, setComments] = useState<Comments[]>([])
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then(response => response.json())
      .then(data => setComments(data))
      .catch(error => console.log(error))
  },[])

  return (
    <div>
      <Header />
      <div className='container'>
        <div className='row'>
          <div className='text-center mb-5'>
            <h1>Dashboard</h1>
          </div>

        </div>
        
        <div className='row'>
          <div className="col-sm-12 col-md-3 d-none d-md-block">
            <div className='row mx-5 my-5' style={{ height: "10rem" }}>
              <h5>Toplam Post Sayısı</h5>
              <div className='rounded-circle border border-2 border-warning d-flex align-items-center justify-content-center text-center mx-5' style={{ width: '100px', height: '100px' }}>
                {postCount}
              </div>
            </div>
            <div className='row mx-5 my-5' style={{ height: "10rem" }}>
              <h5>En Çok Post Atan Kullanıcı Id</h5>
              <div className='row'>
                <div className='col-6'>
                  <Image src='./img/bow.png' width={70} height={70}></Image>
                </div>
                {mostUsedPosts.map(post => (
                  <h1 className='col-6' key={post.userId}>{post.userId}</h1>
                ))}
              </div>


            </div>
          </div>
          <div className="col-sm-12 col-md-9">
            <div className="virtical-line"></div>
            <div className="row">
              {/* Apiden gelen verilerin kartlara dönüştüğü yer */}
              {posts.map(post => (
                <div className="col-sm-12 col-md-4 my-2">
                  <div className="card shadow-lg h-100 " key={post.id}>
                    <div className="card-header">
                      <h5 className="card-title">{post.title}</h5>
                    </div>
                    <div className="card-body">
                      <div className="row g-0">
                        <div className="col-4">
                          <Image src="./img/post-img.png" className="card-img-top" alt="..." width={20} height={60} />
                        </div>
                        <div className="col-8">
                          <p className="card-text">{post.body}</p>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer d-grid gap-2">
                      <Button variant="primary" onClick={() => handleShow(post.id)} >Yorumları Göster </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Yorum butonuna basıldığında çalışacak alan */}
        <Modal size="xl" show={show} onHide={handleClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <div className='row'>
              {comments.map(comments => (
                comments.postId === postId &&
                <div className="card-deck col-sm-12 col-md-3 my-2">
                  <div className="card shadow-lg h-100 " key={comments.id}>
                    <div className="card-header">
                      <h5 className="card-title">{comments.name}</h5>
                    </div>
                    <div className="card-body">
                      <div className="row g-0">
                        <h4>Yazar:</h4><p>{comments.email}</p>
                        <div className="row">
                          <p className="card-text">{comments.body}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Modal.Body>
        </Modal>

      </div>
    </div>
  )
}
export default HomePage