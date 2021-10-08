import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col, Container, FormGroup, Row } from 'reactstrap';
import RegisterForm from './auth/registerForm';
import LoginForm from './auth/loginForm';
import './style.scss'
import {useDispatch} from 'react-redux'
import { register ,login,loginGoogle} from '../../slice/userSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import Swal from "sweetalert2";
import { useHistory } from 'react-router';
 import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

AuthPage.propTypes = {
    
};

function AuthPage(props) {
  let toastId = null;
  toast.configure();
  const history = useHistory();
  const dispath = useDispatch()

  const state = useSelector((state) => state.user.current);
  const loading = useSelector((state)=> state.user.loading)
  const { user, userToken  } = state;
  const checkisLogg = () => {
    if (userToken) {
      const userParse = jwt_decode(userToken).user;
      const isLogged = user._id === userParse._id;
     if(isLogged) {
       history.push("/home")
     }
    }
  };

checkisLogg();




  const handleSubmit = async (values) =>{
    try {
       const action = register(values);
       const resultAction = await dispath(action);
       const data = unwrapResult(resultAction);
       toast.success("Đăng Kí Thành Công , Vui Lòng Kiểm Tra Email Để Kích Hoạt Tài Khoản ");
    } catch (error) {
    toast.error(`${error.message}`);
 
    }
  }
  
  // submit login
  const handleSubmitLogin = async (values)=>{
    try {
       const action = login(values);
       const resultAction = await dispath(action);
       const data = unwrapResult(resultAction);
       toast.success("Đăng Nhập Thành Công")
  history.push({ pathname: "/home" });
 
       
    } catch (error) {
    toast.error(`${error.message}`)
    }
  }
  
//   
 
  return (
    <>
    
      <main id="user_page">
        <section className="user">
          <div className="user-image">
            <div className="user_detail">
              <span className="user_title">explore</span>
              <h1 className="user_breadcump">My-Account</h1>
            </div>
          </div>
        </section>
        <Container fluid>
          <Row xs="1" lg="2">
            <Col>
              <h1>Login</h1>
              <LoginForm loading={loading} onSubmit={handleSubmitLogin}></LoginForm>

          
            </Col>

            <Col>
              <h1>Register </h1>
              <RegisterForm onSubmit={handleSubmit}></RegisterForm>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
}

export default AuthPage;