import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Header from "./Header";
import "../App.css";

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
  const [postCount, setPostCount] = useState<number>(0);

  // Modal görüntülenmesi için durum tanımlama
  const [show, setShow] = useState(false);
  const [postId, setPostId] = useState(null);
  const [mostRepeatedUserId, setMostRepeatedUserId] = useState(null);
  const handleClose = () => setShow(false);

  const handleShow = (postId: any) => {
    getCommentByPostId(postId);
    setPostId(postId);
    setShow(true);
  };

  //Post kartlarının apiden çekildiği yer
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setPostCount(data.length);
        setMostRepeatedUserId(findMostRepeatedUserId(data));
      })
      .catch((error) => console.log(error));
  }, []);

  const findMostRepeatedUserId = (posts: any) => {
    const userIdCounts: { [userId: number]: number } = {};

    for (const post of posts) {
      const userId = post.userId;

      if (userIdCounts[userId]) {
        userIdCounts[userId]++;
      } else {
        userIdCounts[userId] = 1;
      }
    }

    let mostRepeatedUserId: any = null;
    let highestCount = 0;

    for (const userId in userIdCounts) {
      if (userIdCounts[userId] > highestCount) {
        highestCount = userIdCounts[userId];
        mostRepeatedUserId = Number(userId);
      }
    }

    return mostRepeatedUserId;
  };

  // Yorumların apiden çekildiği yer
  const [comments, setComments] = useState<Comments[]>([]);

  const getCommentByPostId = (postId: string) => {
    fetch(
      "https://jsonplaceholder.typicode.com/comments?" +
        new URLSearchParams({
          postId: postId,
        })
    )
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="text-center mb-5">
            <h1>Dashboard</h1>
          </div>
        </div>

        <div
          className="row"
          style={{ height: "calc(100vh - 180px)", overflow: "hidden" }}
        >
          <div className="col-sm-12 col-md-3 d-none d-md-block">
            <div className="row mx-5 my-5" style={{ height: "10rem" }}>
              <h5>Toplam Post Sayısı</h5>
              <div
                className="rounded-circle border border-2 border-warning d-flex align-items-center justify-content-center text-center mx-5"
                style={{ width: "100px", height: "100px" }}
              >
                {postCount}
              </div>
            </div>
            <div className="row mx-5 my-5" style={{ height: "10rem" }}>
              <h5>En Çok Post Atan Kullanıcı Id</h5>
              <div className="row">
                <div className="col-6">
                  <Image src="./img/bow.png" width={70} height={70}></Image>
                  
                </div>
                <h1 style={{fontSize:'30px'}} className="col-6">
                {mostRepeatedUserId}
                </h1>
                
                <div className="card-footer d-grid gap-2">
                  <Button
                    variant="primary"
                    onClick={() => handleShow(mostRepeatedUserId)}
                  >
                    Yorumları Göster{" "}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-sm-12 col-md-9"
            style={{ height: "100%", overflow: "scroll" }}
          >
            <div className="virtical-line"></div>
            <div className="row">
              {/* Apiden gelen verilerin kartlara dönüştüğü yer */}
              {posts.map((post) => (
                <div className="col-sm-12 col-md-4 my-2" key={post.id}>
                  <div className="card shadow-lg h-100">
                    <div className="card-header">
                      <h5 className="card-title">{post.title}</h5>
                    </div>
                    <div className="card-body">
                      <div className="row g-0">
                        <div className="col-4">
                          <Image
                            src="./img/post-img.png"
                            className="card-img-top"
                            alt="..."
                            width={20}
                            height={60}
                          />
                        </div>
                        <div className="col-8">
                          <p className="card-text">{post.body}</p>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer d-grid gap-2">
                      <Button
                        variant="primary"
                        onClick={() => handleShow(post.id)}
                      >
                        Yorumları Göster{" "}
                      </Button>
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
            <div className="d-flex justify-content-center flex-wrap gap-2">
              {comments.map(
                (comments) =>
                  comments.postId === postId && (
                    <div className="card-deck col-sm-12 col-md-3 my-2">
                      <div className="card shadow-lg h-100 " key={comments.id}>
                        <div className="card-header">
                          <h5 className="card-title">{comments.name}</h5>
                        </div>
                        <div className="card-body">
                          <div className="row g-0">
                            <h4>Yazar:</h4>
                            <p>{comments.email}</p>
                            <div className="row">
                              <p className="card-text">{comments.body}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
              )}
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}
export default HomePage;
