import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {  DropdownItem,  Modal, ModalBody} from 'reactstrap';
import { Link } from "react-router-dom";
import { MdClose, MdKeyboardArrowRight } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
ModalMenu.propTypes = {
    
};

function ModalMenu(props) {
    const {toggleMenu,menu} = props
    const [submenu,setSubmenu] = useState(false)
    const handleClick = () =>{
     toggleMenu();
    }
    const handleSubmenu = () =>{
      setSubmenu(!submenu)
    }
    return (
      <Modal
        toggle={handleClick}
        isOpen={menu}
        
        className={menu ? "showMenu" : "hideMenu"}
        zIndex="9999"
      >
        <div className="modal_wrap">
          <div className="modal_logo">
            <Link>
              <img
                src="https://res.cloudinary.com/genji21/image/upload/v1631888467/ecommerce/4b9912d808fc40bd8de3c4a06f127b97_syaotz.png"
                alt=""
              />
            </Link>
          </div>

          {/*  */}
          <div onClick={handleClick} className="modal_icon-close">
            <MdClose></MdClose>
          </div>
        </div>
        <ModalBody>
          <div className="modal_navbar">
            <ul className="modal_navbar-list">
              <li className="modal_navbar-item">
                <a href="/home" className="modal_navbar-link">
                  Shop
                </a>
                {submenu ? (
                  <IoIosArrowDown onClick={handleSubmenu}></IoIosArrowDown>
                ) : (
                  <MdKeyboardArrowRight onClick={handleSubmenu}  />
                )}
                <ul
                  className={
                    submenu
                      ? "modal_navbar-submenu is-active"
                      : "modal_navbar-submenu"
                  }
                >
                  <li className="modal_navbar_submenu-item">
                    <a href="#" className="modal_navbar_submenu-link">
                      My account
                    </a>
                  </li>
                  <li className="modal_navbar_submenu-item">
                    <a href="#" className="modal_navbar_submenu-link">
                      Cart
                    </a>
                  </li>
                  <li className="modal_navbar_submenu-item">
                    <a href="#" className="modal_navbar_submenu-link">
                      Checkout
                    </a>
                  </li>
                </ul>
              </li>
              <li className="modal_navbar-item">
                <a href="#" className="modal_navbar-link">
                  Blog
                </a>
              </li>
              <li className="modal_navbar-item">
                <a href="#" className="modal_navbar-link">
                  Faqs
                </a>
              </li>
              <li className="modal_navbar-item">
                <a href="#" className="modal_navbar-link">
                  Term & Conditions
                </a>
              </li>
              <li className="modal_navbar-item">
                <a href="#" className="modal_navbar-link">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </ModalBody>
      </Modal>
    );
}

export default ModalMenu;