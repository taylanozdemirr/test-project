import React, { useState } from "react";
import HomePage from "./HomePage";
import { Image } from "react-bootstrap";
import LoginHeader from "./LoginHeader";
import userList from "../users.json";

function Inputs() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState<any>("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState<any>("");

  //Giriş bilgilerinin belirlendiği yer
  const loginButton = (e: any) => {
    e.preventDefault();
    userList.map((user) => {
      if (user.email !== email && user.password !== password ) {
        setError ('Email veya şifre yanlış')
      } else if (user.email !== email) {
        console.log("Email yanlis");
        setError("Email yanlis");
      } else if (user.password !== password) {
        console.log(user.password, password);
        setError("Şifre yanlış");
      } else {
        setLoggedIn(true);
      }
    });
    // if (email === "admin@admin.com" && password === "123456") {
    //   setLoggedIn(true);
    // } else {
    //   setError(true);
    // }
  };

  //Giriş başarılıysa çalışacak component
  if (loggedIn) {
    return <HomePage />;
  }

  return (
    <div>
      <LoginHeader />
      <div className="container-fluid">
        <div className="row">
          <div className="d-none d-md-block col-6">
            <Image src="./img/login.png" />
          </div>
          <div className="col-md-3 col-sm-12 offset-md-2">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Giriş Yap</h5>
                <div className="card-body">
                  <form onSubmit={loginButton}>
                    <div className="row">
                      <label>
                        <p>Email</p>
                        <div className="input-group mt-2 mb-2">
                          <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                          />
                        </div>
                      </label>
                    </div>
                    <div className="row">
                      <label>
                        <p>Şifre</p>
                        <div className="input-group mt-2 mb-2">
                          <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                          />
                        </div>
                      </label>
                    </div>
                    <p style={{ color: "red" }}>{error}</p>
                    <div className="mt-2 d-grid gap-2">
                      <button type="submit" className="btn btn-primary">
                        Giriş
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Inputs;
