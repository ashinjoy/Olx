import { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "../src/Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Components/Login/Login";
import { Authcontext } from "./store/FirebaseContext";
import firebase from "./Firebase/config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Create from "./Components/Create/Create";
import ViewPost from './Pages/ViewPost'
import Post from './store/Post'

function App() {
  const { user, setUser } = useContext(Authcontext);
  useEffect(() => {
    const auth = getAuth(firebase);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        // console.log("sett complete");
      } else {
      }
    });
    // console.log("unciuni", user);
  });

  return (
    <div className="App">
     
     <Post>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="sell"  element={<Create/>} />
        <Route path ='view' element={<ViewPost/>}/>
      </Routes>
      </Post>
    </div>
  );
}

export default App;
