import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import {Input, NavItem, NavLink} from 'reactstrap'
import './style.scss'
import ModalMenu from '../../../util/modal';

import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";
import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
Header.propTypes = {
    
};

function Header(props) {
  const [menu,setMenu] = useState(false);
  const [count,setCount] = useState(false)
    const isLogged = useSelector((state) => state.user.isLogged);
 const isActive = useSelector((state) => state.user.isActive);

  
  const openMenu = () =>{
    setMenu(!menu)
  }
  const myDivRef = useRef()

  useEffect(()=>{
    const myDiv = myDivRef.current

window.onclick = (e) => {
  if (
    e.target.id !== "test" &&
    count === true &&
    e.target.getAttribute("class") !== "form-control"
  ) {
    myDivRef.current.classList.toggle("show");
    setCount(false);
  }
};
// can't scroll window when open menu 
 const handleNoScroll = () => {
   if (menu) {
     disableBodyScroll(document.querySelector("body"));
   }
   else {
     enableBodyScroll(document.querySelector("body"));
   }
 };
 handleNoScroll();
//  end handle scroll
  },[count,menu])

  // open search box  when click icon search in mobile  
  const handleSearch = (e) => {
    e.stopPropagation()
    myDivRef.current.classList.toggle("show");
    setCount(true)
  };
//  end
    return (
      <header>
        <div className="header">
          <div className="header-logo">
            <div className="header-log_icon">
              <div onClick={openMenu} className="">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            {/*  */}
            <div className="header-logo_image">
              <img
                src="https://res.cloudinary.com/genji21/image/upload/v1631888467/ecommerce/4b9912d808fc40bd8de3c4a06f127b97_syaotz.png"
                alt="LogoShop"
              />
            </div>
          </div>
          <div className="header-search" ref={myDivRef}>
            <FaSearch></FaSearch>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="Search"
            />
          </div>
          {/* header-search-icon for mobile */}
          <div
            onClick={handleSearch}
            id="test"
            className="header-search-mobile"
            style={{ fontSize: "1.7rem", display: "none" }}
          >
            <FaSearch></FaSearch>
          </div>
          <div className="header-account">
            <Link to={isLogged ? "/user/infor" : "/user/auth"}>My Account</Link>
            <FaShoppingCart />
            <span className="header-account_cart">0</span>
          </div>
        </div>
        <ModalMenu menu={menu} toggleMenu={openMenu}></ModalMenu>
      </header>
    );
}

export default Header;