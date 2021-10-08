import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'reactstrap';
import InputField from '../../form_control/inputField';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from 'react-redux';
import jwt_decode from "jwt-decode";

CommentForm.propTypes = {
    
};
 
function CommentForm(props) {
    // const {rating,socket} = props
     const state = useSelector((state) => state.user.current);
     const { user, userToken } = state;
  
    

    //  
     const schema = yup.object().shape({
       review: yup
         .string()
         .required("Please enter content")
         .min(6)
     });
     const form = useForm({
       defaultValues: {
         review: "",
       },
       resolver: yupResolver(schema),
     });

 


     const handlesubmit = (values) =>{
         const { name } = user;
         console.log(name);
   

        //   
        //  const createAt = new Date().toISOString()
        // socket.emit("createComment", {
        //   username: `${name}`,
        //   product_id: props.product_id,
        //   rating,
        //   values: values.review,
        //   createAt,
        // });
        //  if(values.review === "") {
        //      toast.error("Nội dung phải trên 20 từ ")
        //  }
     }
    


    return (<>
    
      <Form onSubmit={form.handleSubmit(handlesubmit)}>
        <InputField name="review" form={form} />
      </Form>
    
    </>
    );
}

export default CommentForm;