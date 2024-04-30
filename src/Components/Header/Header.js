import React,{useContext,useEffect}from 'react';
import { useNavigate } from 'react-router-dom';
import {FirebaseContext,Authcontext} from '../../store/FirebaseContext'
import { getAuth, signOut } from 'firebase/auth'
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';



function Header() {
  const {user}=useContext(Authcontext)
  const firebase = useContext(FirebaseContext)
  const navigate = useNavigate()


  const handleLogout = (e)=>{
    e.preventDefault()
const auth = getAuth(firebase)
signOut(auth).then(() => {
  // console.log(auth)
  // console.log(user,'udser')
  navigate('/login')
 
}).catch((error) => {
//  console.log(error,'err')
});


  }

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span>{user ? user.displayName :'Login'}</span>
          <hr />
        </div>
        {user &&(<span onClick={(e)=>handleLogout(e)}>Logout</span>)}

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
