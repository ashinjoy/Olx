import React, { useState, useContext } from "react";
// import { useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import FirebaseContext from "../../store/FirebaseContext";
import { useNavigate } from "react-router-dom";
import Logo from "../../olx-logo.png";
import "./Signup.css";

export default function Signup() {
  const [uname, setUname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pass, setPass] = useState("");
  const firebase = useContext(FirebaseContext);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth(firebase);
    const db = getFirestore(firebase);
    createUserWithEmailAndPassword(auth, email, pass)
      .then((result) => {
        updateProfile(result.user.auth.currentUser, { displayName: uname });
        console.log(auth.currentUser.uid);
      })
      .then(() =>{
        addDoc(collection(db, "users"), {
          id: auth.currentUser.uid,
          username: uname,
          phone: phone,
        })
      } 
      )
      .then(() => navigate("/login"))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={uname}
            onChange={(e) => {
              setUname(e.target.value);
            }}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
