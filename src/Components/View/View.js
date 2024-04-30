import React,{useEffect,useContext,useState}from 'react';
import {PostContext} from '../../store/Post'
import {FirebaseContext} from '../../store/FirebaseContext'
import {collection, query, where, getDocs,getFirestore} from 'firebase/firestore'
import './View.css';
function View() {
const {post} = useContext(PostContext)
const firbase = useContext(FirebaseContext)
const [user,setUser] = useState()
useEffect(()=>{
const db = getFirestore(firbase)
  const q = query(collection(db, 'users'), where("id", "==", post.userId));

  getDocs(q).then((querySnapshot)=>{
    querySnapshot.forEach((doc) => {
      console.log('datadatadat',doc.data())
      setUser(doc.data())
      console.log('user',user)
    })
  })

},[])
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={post.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9;{post.price}</p>
          <span>{post.name}</span>
          <p>{post.category}</p>
          <span>{post.createdAt}</span>
        </div>
        {user && <div className="contactDetails">
          <p>Seller details</p>
          <p>{user.username}</p>
          <p>{user.phone}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;
