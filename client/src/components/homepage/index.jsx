import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Button, CardFooter } from "reactstrap";
import {
  
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper.scss';
import './style.scss'
import categoryApi from '../../api/categoryApi';
import productsApi from '../../api/productsApi';

import Skeletoncard from '../Skeletoncard';
import 'swiper/swiper-bundle.css';
import "swiper/swiper.scss";
import "swiper/components/a11y/a11y.scss";
import "swiper/components/controller/controller.scss";
import "swiper/components/effect-fade/effect-fade.scss";
import "swiper/components/effect-cube/effect-cube.scss";
import "swiper/components/effect-flip/effect-flip.scss";
import "swiper/components/lazy/lazy.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import "swiper/components/thumbs/thumbs.scss";
import "swiper/components/zoom/zoom.scss";
import SwiperCore, {
  Virtual,
  Keyboard,
  Mousewheel,
  Navigation,
  Pagination,
  Scrollbar,
  Parallax,
  Zoom,
  Lazy,
  Controller,
  A11y,
  History,
  HashNavigation,
  Autoplay,
  EffectFade,
  EffectCube,
  EffectFlip,
  EffectCoverflow,
  Thumbs,
} from "swiper";
import { Link } from 'react-router-dom';
import Productitem from '../common/productItem';
import { GrClose } from "react-icons/gr";
 import { ToastContainer, toast } from "react-toastify";
SwiperCore.use([
  Virtual,
  Keyboard,
  Mousewheel,
  Navigation,
  Pagination,
  Scrollbar,
  Parallax,
  Zoom,
  Lazy,
  Controller,
  A11y,
  History,
  HashNavigation,
  Autoplay,
  EffectFade,
  EffectCube,
  EffectFlip,
  EffectCoverflow,
  Thumbs,
]);
HomePage.propTypes = {
    
};

function HomePage(props) {
  
  const [category,setCateogy] = useState([])
  const [products,setProducts] = useState([])
  const [loading,setLoading] = useState(true)
  const [loadingProduct,setLoadingProduct] = useState(true)
  const [valueSearch,setValueSearch] = useState('')
  const [result,setResult] = useState(0)
  const [page,setPage] = useState(1)
  const [categoyFlag,setCategoryFlag] = useState('')
  const [navbar,setNavbar] = useState(false)
  useEffect(()=>{
      const getData = async () => {
        try {
          const data = await categoryApi.getAll();
          setCateogy(data);
        } catch (error) {
          throw error;
        }
        setLoading(!loading);
      };
      getData();
    
  },[])
  useEffect(()=>{
//  const socket = io();
//  socket.on("connect", () => {
//    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
//  });
//  return () => {socket.close()}
  },[])
  useEffect(  ()=>{
    const getData = async () =>{
      try {
        const dataproduct = await productsApi.loadMoreProducts(
          categoyFlag || null,
          page
        );
        setProducts(dataproduct.products);
        setResult(dataproduct.result);
      } catch (error) {
        throw error
      }
       setLoadingProduct(!loadingProduct)
    }
    getData()
  },[valueSearch,page,categoyFlag])
  // 
  useEffect(()=>{
     if(navbar){
       disableBodyScroll(document.querySelector('body'))
     }
     else {
       enableBodyScroll(document.querySelector('body'))
     }
  },[navbar])
  const handleChangeProduct = async (e)=>{
     e.stopPropagation();
    
        if (categoyFlag === e.currentTarget.dataset.category)
        {
          return 
        }
         if (document.querySelector(".card.active")) {
           document.querySelector(".card.active").classList.remove("active");
         }
          e.currentTarget.classList.add("active");
        const scategory = e.target.getAttribute("data-category");
        setCategoryFlag(scategory);
        setLoadingProduct(true);
        setNavbar(false);
  }
  const handleLoad= () =>{
    setPage(page+1)
    setLoadingProduct(!loadingProduct);
  }
  const displayNavbarMobile = () =>{
    setNavbar(!navbar)
   
  }
    return (
      <>
       
        <main id="home_page">
          <Container fluid={true}>
            {/* mobie category */}
            <section className="navbar_mobile_category">
              <div onClick={displayNavbarMobile} className="navbar_category">
                <span className="category">CATEGORY</span>
                <RiArrowDropDownLine />
              </div>
            </section>
            <section
              className={
                navbar
                  ? "navbar_section show_mobile"
                  : "navbar_section hide_mobile"
              }
            >
              <div className="navbar_mobile_category nav_mobile">
                <span className="navbar_mobile_title">Category</span>
                <div
                  onClick={displayNavbarMobile}
                  className="navbar_mobile_icon"
                >
                  <GrClose />
                </div>
              </div>
              <div className="navbar_wrapped">
                {loading ? (
                  <Skeletoncard />
                ) : (
                  category.map((item, idx) => {
                    return (
                      <>
                        <Card
                          id={`flag-${idx}`}
                          style={{
                            pointerEvents: loadingProduct ? "none" : "",
                          }}
                          data-category={item._id}
                          onClick={handleChangeProduct}
                          key={item._id}
                        >
                          <CardImg
                            data-category={item._id}
                            top
                            width="100%"
                            src={item.image.url}
                            alt="Card image cap"
                          />
                          <CardBody data-category={item._id}>
                            <CardTitle data-category={item._id} tag="h5">
                              {item.name}
                            </CardTitle>
                          </CardBody>
                        </Card>
                      </>
                    );
                  })
                )}
              </div>
            </section>
            {/* section banner */}
            <section className="main-page">
              <div className="banner_shop">
                <Swiper
                  slidesPerView={3}
                  spaceBetween={10}
                  loop={true}
                  navigation={true}
                  keyboard={true}
                  className="mySwiper"
                >
                  <SwiperSlide>
                    <img
                      src="https://res.cloudinary.com/genji21/image/upload/v1632050518/ecommerce/Artboard-_-1_wu9zdo.png"
                      alt=""
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      src="https://res.cloudinary.com/genji21/image/upload/v1632050518/ecommerce/Artboard-_-2_moalxw.png"
                      alt=""
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      src="https://res.cloudinary.com/genji21/image/upload/v1632050518/ecommerce/Artboard-_-3_gm2tsj.png"
                      alt=""
                    />
                  </SwiperSlide>
                </Swiper>
              </div>

              <div className="product_shop">
                <Container fluid={true}>
                  <Row xs="2" sm="3" md="3" xl="5" lg="4">
                    {loadingProduct ? (
                      <Skeletoncard />
                    ) : (
                      products.map((product) => {
                        return (
                          <Productitem
                            key={product._id}
                            product={product}
                          ></Productitem>
                        );
                      })
                    )}
                  </Row>
                  {result < page * 9 ? (
                    ""
                  ) : (
                    <div className="button_wrap">
                      <Button onClick={handleLoad} className="button_load">
                        Load More
                      </Button>
                    </div>
                  )}
                </Container>
              </div>
            </section>
          </Container>
        </main>
      </>
    );
}

export default HomePage;