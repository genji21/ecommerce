import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Label } from 'reactstrap';
// import { Link } from 'react-router-dom';
import {useForm} from 'react-hook-form'
import InputField from '../../form_control/inputField';
import PasswordField from '../../form_control/passwordField';
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from "yup"
import ContainerLoading from '../../../util/loading';
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
// import { unwrapResult } from "@reduxjs/toolkit";
import { loginGoogle, loginFacebook } from "../../../slice/userSlice";
import GoogleButton from "react-google-button";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
 import { toast } from "react-toastify";

import { FaFacebookF } from "react-icons/fa";
LoginForm.propTypes = {
    
};

function LoginForm(props) {
   const dispath = useDispatch();
  const history = useHistory();
  const {loading} = props
    const schema = yup.object().shape({
      email: yup
        .string()
        .required("Please enter email")
        .email("Please enter valid email"),
      password: yup
        .string()
        .required("Please enter password")
        .min(6)
        .max(10)
    });

   const form = useForm({
    defaultValues: {
      email: "",
      password:""
    },
    resolver:yupResolver(schema)
  });
  const handlesubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
    form.reset();
    
  };
   const responseGoogle = async (response) => {
     try {
       const action = loginGoogle({ tokenId: response.tokenId });
       const resultAction = await dispath(action);
      //  const data = unwrapResult(resultAction);
       history.push({
         pathname: "/home",
       });
       toast.success("Đăng Nhập Thành Công . ");

     } catch (error) {
       toast.error("Đăng Nhập Thất Bại ")
     }
   };
   const responseFacebook = async (response) => { 
     console.log(response)
     const {accessToken,userID} = response
     try {
       const action = loginFacebook({accessToken,userID});
       const resultAction = await dispath(action)
      //  const data = unwrapResult(resultAction)
       toast.success("Đăng Nhập Thành Công . ")
      history.push({ pathname: "/home" });

      //  const data = await axios.post('/user/facebook_login',{accessToken,userID})
      //  console.log(data)
     } catch (error) {
       toast.error("Đăng Nhập Thất Bại")
     }
   }
  const { isSubmitting } = form.formState;
  return (
    <>
      {isSubmitting || loading ? <ContainerLoading /> : ""}
      <Form
        onSubmit={form.handleSubmit(handlesubmit)}
        className="form form_login"
      >
        <FormGroup>
          <Label for="email" className="login_label">
            Email Address
          </Label>
          <InputField id="email" form={form} name="email" label="email" />
        </FormGroup>

        <FormGroup>
          <Label for="password" className="login_label">
            Email Address
          </Label>
          <PasswordField
            id="password"
            form={form}
            name="password"
            label="password"
          />
        </FormGroup>

        <Button type="submit">Test</Button>
        <hr />
        <FormGroup className="login_google">
          <GoogleLogin
            clientId="825078141828-48pc4nic3sf5pugk790ejijdlv9vvi53.apps.googleusercontent.com"
            onSuccess={responseGoogle}
            disabled={false}
            cookiePolicy={"single_host_origin"}
            render={(renderProps) => (
              <GoogleButton
                className="google-button"
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  display: "flex",
                  justifyContent: "center",
                }}
                type="dark"
                label="Đăng Nhập Với Google"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              ></GoogleButton>
            )}
          ></GoogleLogin>
        </FormGroup>

        {/* facebook login */}
        <FormGroup className="login_facebook" style={{ background: "white" }}>
          <FacebookLogin
            appId="405344431158247"
            autoLoad={false}
            fields="name,email,picture"
            icon="fa-facebook"
            callback={responseFacebook}
            render={(renderProps) => (
              <div className="facebook-button" onClick={renderProps.onClick}>
                <div
                  className=""
                  style={{
                    marginLeft: "3rem",
                    fontSize: "2rem",
                    color: "hsl(217, 89%, 61%)",
                  }}
                  onClick={renderProps.onClick}
                >
                  <FaFacebookF />
                </div>
                <span style={{ marginLeft: "1.6rem" }} className="">
                  Đăng Nhập Với Facebook
                </span>
              </div>
            )}
          />
        </FormGroup>
      </Form>
    </>
  );
      //   <Form
      //     onSubmit={form.handleSubmit(handleSubmit)}
      //     className="form form_login"
      //   >
      //     <FormGroup>
      //       <Label for="exampleEmail" className="login_label">
      //         Email Address
      //       </Label>
      //       <InputField name="email" form={form} label="Email" />
      //     </FormGroup>
      //     {/* <FormGroup>
      //       <Label for="exampleEmail" className="login_label">
      //         Password
      //         <Input type="password" />
      //       </Label>
      //     </FormGroup>
      //     <FormGroup>
      //       <Button> Login</Button>
      //     </FormGroup>
      //     <FormGroup>
      //       <Link className="link-lostPassword" to="/my-account/lost-password">
      //         Lost your password ?
      //       </Link>
      //     </FormGroup> */}
      //   </Form>
    // );
}

export default LoginForm;