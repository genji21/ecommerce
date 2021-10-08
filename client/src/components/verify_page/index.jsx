import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userApi from "../../api/userApi";
import { useHistory,useLocation, useParams } from "react-router";
import ContainerLoading from "../../util/loading";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import "./style.scss";
VerifyPage.propTypes = {};

function VerifyPage(props) {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  
  const state = useSelector((state) => state.user.current);
  const { name, confirmationCode } = state.user;
    useEffect(()=>{
        
    },[loading])
  const handleVerify = async (e) => {
    e.stopPropagation();
        setLoading(true);

    try {
     const data = await userApi.verify({ activation_token: confirmationCode })
        let timerInterval;
      Swal.fire({

        title: `${data.msg}`,
        icon: "error",
        imageUrl:
          "https://media1.giphy.com/media/5Oyaa78rzRaixvweQe/giphy.gif?cid=ecf05e47xbsv9m9z12tn7qlnh180dabag6aikc6uykpfskcp&rid=giphy.gif&ct=g",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
        timer: 10000,
        timerProgressBar: true,
        html: "Go to home page after <b></b> second",
        didOpen: () => {
          Swal.showLoading();
          const b = Swal.getHtmlContainer().querySelector("b");
          timerInterval = setInterval(() => {
            b.textContent = Math.ceil(Swal.getTimerLeft() / 1000);
          }, 1000);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        /* Read more about handling dismissals below */
        setLoading(false);
        if (result.dismiss === Swal.DismissReason.timer) {
          history.push("/home");
        }
      });
  
    } catch (error) {
        let timerInterval;

        Swal.fire({
          title: `${error.message}`,
          icon: "error",
          imageUrl:
            "https://media1.giphy.com/media/5Oyaa78rzRaixvweQe/giphy.gif?cid=ecf05e47xbsv9m9z12tn7qlnh180dabag6aikc6uykpfskcp&rid=giphy.gif&ct=g",
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
          timer: 10000,
          timerProgressBar: true,
          html: "Go to home page after <b></b> second",

          didOpen: () => {
            Swal.showLoading();
            const b = Swal.getHtmlContainer().querySelector("b");
            timerInterval = setInterval(() => {
              b.textContent = Math.ceil(Swal.getTimerLeft() / 1000);
            }, 1000);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          /* Read more about handling dismissals below */
          setLoading(false);
          if (result.dismiss === Swal.DismissReason.timer) {
            history.push("/home");
          }
        });
    
    }
  };
  return (
    <>
      {loading ? <ContainerLoading /> : ""}
      <main id="verify_account_page">
        <div className="verify_account-wrap">
          <div className="verify_account">
            <img
              src="https://res.cloudinary.com/genji21/image/upload/v1633314021/ecommerce/checking-letter-see-whats-inside-600w-1967797288_alg0wk.webp"
              alt=""
            />
            <h1>Verify your email address</h1>
            <div className="button_verify">
              <p>
                Hi {name.toUpperCase()} , Please click below button to verify your account
              </p>
              <button onClick={handleVerify}>Verify Email</button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default VerifyPage;
