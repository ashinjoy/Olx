import React, { Fragment, useState, useContext } from "react";
import { FirebaseContext, Authcontext } from "../../store/FirebaseContext";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, getFirestore } from "firebase/firestore";

import "./Create.css";
import Header from "../Header/Header";

const Create = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState();
  const firebase = useContext(FirebaseContext);
  const {user} = useContext(Authcontext);
  const date = new Date()
  const db = getFirestore(firebase);

  const handleSubmit = (e) => {
    console.log('user',user)
    const storage = getStorage();
    const storageRef = ref(storage, `/images/${image.name}`);
    uploadBytes(storageRef, image).then(({ ref }) => {
      getDownloadURL(ref).then((url) => {
        console.log(url)
        addDoc(collection(db, "products"),{
         name,
         category,
         price,
         url,
         userId:user.uid,
         createdAt:date.toDateString()
        });
      });
    });
  };
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="fname"
            name="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />

          <br />
          <img
            alt="Posts"
            width="200px"
            height="200px"
            src={image ? URL.createObjectURL(image) : ""}
          ></img>

          <br />
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <br />
          <button onClick={(e) => handleSubmit(e)} className="uploadBtn">
            upload and Submit
          </button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
