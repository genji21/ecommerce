import React, { useEffect } from 'react';
import { Card, CardBody, CardImg, CardTitle, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import { useHistory } from "react-router";
import AOS from "aos";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';

Productitem.propTypes = {
    
};

function Productitem(props) {
  const isLogged = useSelector((state) => state.user.isLogged);
  const isActive = useSelector((state) => state.user.isActive);
   const history = useHistory();
   const handleClick = (e) => {
     e.preventDefault();

     if(!isLogged) return toast.error("Cần Đăng Nhập Đẻ Mua Sản Phẩm")
    if (!isActive) return toast.error("Tài Khoản Của Bạn Cần Kích Hoạt Để Mua ")
   };
   useEffect(()=>{
  AOS.init({
    duration: 500,
  });
   },[])
    const {title,price,image,key,_id} = props.product
    return (
      <>
        <Col key={key} data-aos="zoom-in" className="card_item">
          <Link to = {`/product/${_id}`} >
            <Card>
              <CardBody>
                {/*  */}
                <span className="card_price">{"$" + price}</span>

                <CardTitle tag="h5">{title} </CardTitle>

                {/*  */}
              </CardBody>
              <CardImg top width="100%" src={image.url} alt="Card image cap" />
              <div className="card_icon" onClick={handleClick}>
                <AiOutlinePlus />
              </div>
            </Card>
          </Link>
        </Col>
      </>
    );
}

export default  React.memo(Productitem);