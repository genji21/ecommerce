import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./components/common/header";
import { Route, Switch ,Redirect } from "react-router-dom";
import HomePage from "./components/homepage";
import ShopPages from "./components/shoppage";
import Notfound from "./components/common/notfound";
import { Provider } from "react-redux";
import store from "./app/store";
import UserPage from './components/user_page';
import PrivateRoute from "./util/privateRoute";
import AuthPage from "./components/user";
import VerifyPage from "./components/verify_page";
import 'aos/dist/aos.css';
import "animate.css"
  import 'react-toastify/dist/ReactToastify.css';
 import { ToastContainer } from "react-toastify";
import './App.css'
import ProducDetail from "./components/detail_product";
 import io from 'socket.io-client'
    const socket = io();


function App() {


  useEffect(()=>{
    socket.on('connect',(id)=>{
      console.log(id)
    })
    return(()=>{
      socket.close();
    })
  },[])
  
  return (
    <Provider store={store}>
<ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover={false}
/>
{/* Same as */}
    <div className="App">
      <Header/>
      <Switch>
      <Redirect exact path="/" from="/" to="/home" />

        <Route exact path='/home' component={HomePage} />
        <Route exact path='/shop' component={ShopPages}/>
        <Route exact path="/user/auth" component={AuthPage}/>
        <Route exact path='/product/:id' component={ProducDetail}/>
        {/* <PrivateRoute component={AuthPage} path="/user/auth" exact /> */}
        <PrivateRoute component={UserPage} path="/user/infor" exact />
        {/* <PrivateRoute path="/user/auth/verify/:activation_token" exact component={VerifyPage}/> */}

        <PrivateRoute component={VerifyPage} path="/user/auth/verify/:activation_token" exact />

        <Route component={Notfound} />
      </Switch>
      </div>
    </Provider>
  );
}

export default App;
