import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import userApi from '../api/userApi';
 import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";

export const register = createAsyncThunk(
'user/register',
async (payload) =>{
//call Api to register 
const data = await userApi.register(payload)
return data
}
)
export const login = createAsyncThunk('user/login'
,  async (payload,thunkAPI) => { 
        const data = await  userApi.login(payload)
    const {accesstoken} = data
const config = {
    headers: { Authorization: ` ${accesstoken}` }
};
    const response = await axios.get('/user/infor',config)
    localStorage.setItem('user',JSON.stringify(response.data))
    return response.data
})


// 
export const loginGoogle = createAsyncThunk('/LoginGoogle',async (payload,thunkAPI)=>{
    const response = await userApi.loginGoogle(payload)
    localStorage.setItem('user',JSON.stringify(response))
    return response
})


// 
export const loginFacebook = createAsyncThunk('/LoginFacebook',async (payload,thunkAPI)=>{
    const response = await userApi.loginFacebook(payload)
    localStorage.setItem('user',JSON.stringify(response))

    return response
})

const CheckIsLog = () =>{
    const data = JSON.parse(localStorage.getItem('user'))
    if(data){
    const{user,userToken} = data
    const userParse = jwt_decode(userToken).user
     const isLogged = user._id === userParse._id;
      return isLogged;
    }
  
}
const checkIsValidAccount =() =>{
       const data = JSON.parse(localStorage.getItem('user'))
    if(data){
    const{user,userToken} = data
    const userParse = jwt_decode(userToken)?.user

     const isValidAccount = userParse.status === "Active";
      return isValidAccount;
    }
}



const userSlice = createSlice({
 name: 'user',
 initialState: {
     current: JSON.parse(localStorage.getItem('user')) ||  {} , 
     loading: false,
     isLogged : CheckIsLog() || false,
     isActive: checkIsValidAccount() || false
 },
 reducers:  {
  
 } ,
 extraReducers :{
     [register.fulfilled] : (state,action)=>{
        state.current = action.payload;

     },
     
      [login.fulfilled] : (state,action)=>{
        state.current = action.payload;
        state.isLogged = CheckIsLog();
        state.isActive =checkIsValidAccount();
     },
     [login.rejected] : (state,action) =>{

     }
     ,
     [loginGoogle.pending] : (state,action) =>{
        state.loading = true
     },

     [loginGoogle.fulfilled] : (state,action) =>{
         state.current = action.payload
         state.loading = false
         state.isLogged = CheckIsLog()
         state.isActive = checkIsValidAccount()
     },
     [loginFacebook.pending] : (state,action) =>{

         state.loading = true
        },
     [loginFacebook.fulfilled] : (state,action) =>{
         state.loading = false
         
        state.current = action.payload
     }
    
 }
});
const {reducer,actions} =  userSlice;
export default  reducer;
export const {addUser} = actions

