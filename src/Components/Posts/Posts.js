import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../../store/FirebaseContext";
import { getFirestore, doc, collection, getDocs } from "firebase/firestore";
 import {PostContext} from '../../store/Post'
 import { useNavigate } from "react-router-dom";

import Heart from "../../assets/Heart";
import "./Post.css";

function Posts() {
  const [products, setProducts] = useState([]);
  const firebase = useContext(FirebaseContext);
  const {post,setPost}= useContext(PostContext)
  const navigate = useNavigate()
  const db = getFirestore(firebase)


  useEffect(() => {
    // console.log("hellofukyjk");
    getDocs(collection(db, "products")).then((Snapshot) => {
      const allProducts = Snapshot.docs.map((doc) => {
        console.log(doc.id, " => ", doc.data());
        return { ...doc.data(), id: doc.id };
      });
      // console.log('allpro',allProducts);
      setProducts(allProducts);
      // console.log('product',products);
    });
  }, []);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((obj) => {
            return (
              <div className="card" onClick={()=>{
                setPost(obj) 
                // console.log('posr',post)
                navigate('/view')
              }}>
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={obj.url} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {obj.price}</p>
                  <span className="kilometer">{obj.category}</span>
                  <p className="name">{obj.name}</p>
                </div>
                <div className="date">
                  <span>{obj.createdAt}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {products.map((obj) => {
            return (
              <div className="card">
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={obj.url} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {obj.price}</p>
                  <span className="kilometer">{obj.category}</span>
                  <p className="name">{obj.name}</p>
                </div>
                <div className="date">
                  <span>{obj.createdAt}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Posts;
