import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useHistory, useLocation, useParams } from "react-router";
import CommentItem from './commemtItem';
import CommentForm from './commentForm';
import './style.scss'
import { useSelector } from 'react-redux';

ProducDetail.propTypes = {
    
};

function ProducDetail(props) {
    const user = useSelector((state) => state);
    const params =useParams()
    const [rating,setRating] = useState('')
    // useEffect(()=>{
    //     const socket = io();

    //   socket.on("connect", () => {
    //     console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    //   });
    //     // const getData = async () =>{
    //     //     const data = await axios.get(`/api/products/${params.id}`);
    //     // }

    //     // const getComment = async () =>{
    //     //     const data = await axios.get(`/api/comments/${params.id}`)
    //     //     setComment(data.data.comments)
    //     // }
            


    //     // getData();
    //     // getComment();
    //     return ()=>socket.close()
    // },[])
    // realtime
    // useEffect(()=>{
    //      if (socket) {
    //        socket.emit("joinRoom",id);
    //      }


    // },[socket,id])

    // useEffect(() => {
    //   if (socket) {
    //     socket.on("sendCommentToClient", (msg) => {
    //       console.log(msg);
    //     });
    //     socket.off("sendCommentToClient");
    //   }
    // }, [socket, comment]);








  const handeSubmit =() =>{

  }
    return (
      <div>
        <button> TEST </button>
        <div className="dsa">chi tiet san pham</div>
        <div className="list - form">
          {/* review list user */}

          {/* rating */}
          {/* <div className="reviews">
            <div id="rating_bar">
              <span id="rate_1"></span>
              <span id="rate_2"></span>
              <span id="rate_3"></span>
              <span id="rate_4"></span>
              <span id="rate_5"></span>
            </div>
          </div> */}
          <div className="reviews">
            <input
              type="radio"
              name="rate"
              id="rd-5"
              onChange={() => setRating(5)}
            />
            <label htmlFor="rd-5" className="fas fa-star"></label>

            <input
              type="radio"
              name="rate"
              id="rd-4"
              onChange={() => setRating(4)}
            />
            <label htmlFor="rd-4" className="fas fa-star"></label>

            <input
              type="radio"
              name="rate"
              id="rd-3"
              onChange={() => setRating(3)}
            />
            <label htmlFor="rd-3" className="fas fa-star"></label>

            <input
              type="radio"
              name="rate"
              id="rd-2"
              onChange={() => setRating(2)}
            />
            <label htmlFor="rd-2" className="fas fa-star"></label>

            <input
              type="radio"
              name="rate"
              id="rd-1"
              onChange={() => setRating(1)}
            />
            <label htmlFor="rd-1" className="fas fa-star"></label>
          </div>

          {/* list comment */}
          <div className="comment_list">
           
          </div>

          {/* comment */}
          <CommentForm
            product_id={params.id}
            rating={rating}
          />
        </div>
      </div>
    );
}

export default ProducDetail;