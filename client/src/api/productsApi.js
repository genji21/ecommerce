import axiosClient from "./axiosClient";

const productsApi = {
    getProducts(categoryId='',valueSearch="",page = 1,sort='') {
        const url = `/api/products?limit=${9}&page=${page}&${ categoryId ? "category=" +categoryId  : ""}&${sort ? "sort=" +sort :""}&${valueSearch ? "title[regex]=" + valueSearch : ""}`;
        return axiosClient.get(url,{})
    },
    getAllProducts(){
        const url = `/api/products/all`
        return axiosClient.get(url,{})
    },
    // for home
    loadMoreProducts(categoryId = '' , page = 1){
        const url = `/api/products?limit=${page*9}&${categoryId ? "category=" +categoryId : ""}`
        return axiosClient.get(url,{})
    }
}
export default productsApi