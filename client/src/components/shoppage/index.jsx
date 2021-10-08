import React, { memo, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import { Container, Pagination, PaginationItem, PaginationLink, Row } from 'reactstrap';
import Select from "react-select";
import Productitem from '../common/productItem';
import productsApi from "../../api/productsApi";
import Skeletoncard from '../Skeletoncard';
import queryString from 'query-string'
import { useLocation,useHistory } from 'react-router';
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
ShopPages.propTypes = {
    
};

function ShopPages(props) {
    const options = [
      { value: "price", label: "Sort By Price : low to high" },
      { value: "-price", label: "Sort By Price : high to low " },
      { value: "-sold", label: "Sort by Popurlarity" },
      { value: "oldest", label: "Sort by latest" },
      { value: "", label: "Sort by newst" },
    ];
    const [products,setProducts] = useState([])
    const [loadingProduct,setLoadingProduct] = useState(true)
    const history = useHistory();
    const location = useLocation();
    const [filter,setFilter] = useState('')
    const [page,setPage] = useState(0)
    const paramUrl =  useMemo(()=>{
      setLoadingProduct(true)
      setFilter(queryString.parse(location.search))
        return queryString.parse(location.search);
    },[location.search])
useEffect(()=>{
   const getData = async () => {
     try {
       const dataPagination = await productsApi.getAllProducts(
         
       );
       setPage(dataPagination.products.length)
        
     } catch (error) {}
   };
   getData();

},[])

    useEffect(() => {
        if(location.search === '')
        {
          setFilter({page:1,sort:"newst",limit:9})
          history.push({
            pathname: history.location.pathname,
            search : queryString.stringify({page:1,limit:9,sort:'-sold'})
          })
        }
        const getData = async () => {
          try {
           
           
            const dataProducts = await productsApi.getProducts(null,null,filter.page,filter.sort);
            setProducts(dataProducts.products);
          } catch (error) {}
          setLoadingProduct(false);
        };
        getData();

    
    }, [paramUrl]);   
    // 
      

    const handleChange = (e) =>{
        let newFilter = {page:1,sort:e.value,limit:9}
        history.push({
            pathname:history.location.pathname,
            search:queryString.stringify(newFilter)
        });
    }
    const handlePagination = (e) => {
      const newFilter = {...filter,page:Number(e.target.innerHTML)}
      history.push({
        pathname: history.location.pathname,
        search: queryString.stringify(newFilter),
      });
    }
   const showPagination = () => { 
     const limit_page = Math.ceil(page / filter.limit);
     const newArrayPage = Array.from({ length: limit_page }, (v, i) => i + 1);
      return newArrayPage.map((item,idx)=>{
        return (
          <PaginationItem active={Number(filter.page) === item ? true : false }  data-page = {item} key={idx} onClick={handlePagination}>
            <PaginationLink href="#" > {item} </PaginationLink>
          </PaginationItem>
        );
      });


  }
    return (
      <main id="shop_page">
        <section className="shop_banner">
          <div className="shop_banner-image">
            <div className="banner_detail">
              <span className="banner_title">explore</span>
              <h1 className="banner_breadcump">Shop</h1>
            </div>
          </div>
        </section>
        {/*  shop*/}
        <section className="shop_product">
          <Container fluid>
            <div className="shop_filter">
              <div className="shop_filter-box">
                <div className="shop_filter-detail">
                  <span className="shop_filter-text">
                    Showing  {(Number(filter.page) - 1 ) * Number(filter.limit) + 1    }  - {(Number(filter.page) - 1 ) * Number(filter.limit) + products.length } of {page} result
                  </span>
                </div>
                <div className="shop_filter-wrap">
                  <Select
                    onChange={handleChange}
                    defaultValue={options[2]}
                    options={options}
                  />
                </div>
              </div>
            </div>

            <Row
              style={{ marginTop: "5rem" }}
              xs="2"
              sm="3"
              md="3"
              xl="5"
              lg="4"
            >
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
            {/* pagination */}
            <div
              className="pagination"
              style={{ justifyContent: "center", marginTop: "3rem" }}
            >
              <Pagination size="lg">
                <PaginationItem
                  style={{ display: filter.page === "1" ? "none" : "block" }}
                  onClick={() => {
                    let newFilter = {
                      ...filter,
                      page: Number(filter.page) - 1,
                    };
                    history.push({
                      pathname: history.location.pathname,
                      search: queryString.stringify(newFilter),
                    });
                  }}
                >
                  <button className="page-link">
                    <BsArrowLeft />
                  </button>
                </PaginationItem>
                {showPagination()}
                <PaginationItem
                  style={{
                    display:
                      Number(filter.page) === Math.ceil(page / filter.limit)
                        ? "none"
                        : "block",
                  }}
                  onClick={() => {
                    let newFilter = {
                      ...filter,
                      page: Number(filter.page) + 1,
                    };
                    history.push({
                      pathname: history.location.pathname,
                      search: queryString.stringify(newFilter),
                    });
                  }}
                >
                  <button className="page-link">
                    <BsArrowRight />
                  </button>
                </PaginationItem>
              </Pagination>
            </div>
          </Container>
        </section>
      </main>
    );
}

export default ShopPages;