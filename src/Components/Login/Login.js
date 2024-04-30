import React,{useState,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import firebaseContext from '../../store/FirebaseContext'
import Logo from '../../olx-logo.png';
import './Login.css';

function Login() {

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()
  const firebase = useContext(firebaseContext)
  const auth = getAuth(firebase)
  


const handleLogin = (e)=>{
  e.preventDefault()
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    alert('login sucess')
    navigate('/')

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
    
  });

}
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={(e)=>handleLogin(e)}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value ={email}
            onChange={(e)=>setEmail(e.target.value)}
            
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
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
