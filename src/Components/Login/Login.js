import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import firebaseContext from "../../store/FirebaseContext";
import Logo from "../../olx-logo.png";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errLogin, setErr] = useState({
    email: "",
    pass: "",
  });
  const navigate = useNavigate();
  const firebase = useContext(firebaseContext);
  const auth = getAuth(firebase);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!/^[a-zA-Z0-9_]+@[a-zA-Z]+\.[a-zA-Z]{2,4}$/.test(email)) {
      setErr((prevError) => ({ ...prevError, email: "Enter valid email" }));
    } else if (email == "") {
      console.log('login',errLogin);
      setErr((prevError) => ({ ...prevError, email: "Enter valid email" }));
    } else {
      setErr((prevError) => ({ ...prevError, email: "" }));
    }
    if (password.trim() === "") {
      setErr((prevError) => ({ ...prevError, pass: "Enter valid Password" }));
      console.log('login',errLogin);

    } else {
      setErr((prevError) => ({ ...prevError, pass: "" }));
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert("login sucess");
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={(e) => handleLogin(e)}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errLogin.email && <div>{errLogin.email}</div>}

          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errLogin.pass && <div>{errLogin.pass}</div>}

          <br />
          <br />
          <button>Login</button>
        </form>
        <a>Signup</a>
      </div>
    </div>
  );
}

export default Login;
