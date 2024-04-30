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
  const [error, setError] = useState({
    uname: "",
    email: "",
    phone: "",
    pass: "",
  });
  const firebase = useContext(FirebaseContext);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (uname == "") {
      setError((prevError)=>({...prevError,uname:'Enter tour Name'}));

    } else {
      setError((prevError)=>({...prevError,uname:''}));

    }
    if (!/^[a-zA-Z0-9_]+@[a-zA-Z]+\.[a-zA-Z]{2,4}$/.test(email)) {
      setError((prevError)=>({...prevError,email:'Enter valid email'}));
     
    } else if (email.trim() == "") {
      setError((prevError)=>({...prevError,email:'Enter valid email'}))
      
    } else {
      setError((prevError)=>({...prevError,email:''}))

    }

    const phonepattern = /\d/;
    if (phone.trim() == "") {
      console.log('phoneerr',error)
      setError((prevError)=>({...prevError,phone:'Enter valid PhoneNumber'}));
      console.log('phoneerrafter',error)

    } else if (
      phone.length > 10 ||
      phone.length < 10 ||
      !phonepattern.test(phone)
    ) {
      setError((prevError)=>({...prevError,phone:'Enter valid PhoneNumber'}));
    } else {
      console.log('invalid')
      setError((prevError)=>({...prevError,phone:''}));
    }
    if (pass === "") {
      console.log('err',error)
      setError((prevError)=>({...prevError,pass:'Enter valid Password'}));

      console.log('errafter',error)
    } else {
      setError((prevError)=>({...prevError,pass:''}));
     
    }

    const auth = getAuth(firebase);
    const db = getFirestore(firebase);
    createUserWithEmailAndPassword(auth, email, pass)
      .then((result) => {
        updateProfile(result.user.auth.currentUser, { displayName: uname });
        console.log(auth.currentUser.uid);
      })
      .then(() => {
        addDoc(collection(db, "users"), {
          id: auth.currentUser.uid,
          username: uname,
          phone: phone,
        });
      })
      .then(() => navigate("/login"))
      .catch((err) => {
        console.error(err.stack);
      });
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

          {error.uname && <div>{error.uname}</div>}

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
          {error.email && <div>{error.email}</div>}

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
          {error.phone && <div>{error.phone}</div>}

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
          {error.pass && <div>{error.pass}</div>}

          <br />
          <br />
          <button>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
