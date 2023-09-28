import axios from "axios";
import cookie from "react-cookies";

const SERVER_CONTEXT = "/ShippingApp";
const SERVER = "http://localhost:8080";

export const endpoints = {
    "login": `${SERVER_CONTEXT}/api/login/`,
    "current-user": `${SERVER_CONTEXT}/api/current-user/`,
    "user-register": `${SERVER_CONTEXT}/api/user-register/`,
    "shipper-register": `${SERVER_CONTEXT}/api/shipper-register/`,

    "shipper-reviews": (shipperID) => `${SERVER_CONTEXT}/api/shippers/${shipperID}/reviews/`,
    "add-reviews": (shipperID) => `${SERVER_CONTEXT}/api/shippers/${shipperID}/reviews/create/`,
    "promotions":`${SERVER_CONTEXT}/api/promotions/`,
    "order-create": `${SERVER_CONTEXT}/api/orders/create/`,
    "order-bids-list": `${SERVER_CONTEXT}/api/orders/`,
    "order-update-status": (orderId) => `${SERVER_CONTEXT}/api/orders/${orderId}/update-status/`,
    "order-list-user": `${SERVER_CONTEXT}/api/orders/user/`,
    "order-list-shippers": `${SERVER_CONTEXT}/api/orders/shippers/`,
    "order-detail":(orderId) => `${SERVER_CONTEXT}/api/orders/${orderId}/`,
    "order-bids":(orderId) => `${SERVER_CONTEXT}/api/orders/${orderId}/bids/`,
    "choose-shipper":(orderId, shipperID) => `${SERVER_CONTEXT}/api/orders/${orderId}/choose-shipper/${shipperID}/`, 
    "bids-create":(orderId) => `${SERVER_CONTEXT}/api/orders/${orderId}/bids/create/`,
    "bid-shipper":(orderId, shipperID) => `${SERVER_CONTEXT}/api/orders/${orderId}/bids/${shipperID}/`,
    "shipper-info":(userID) => `${SERVER_CONTEXT}/api/shippers/${userID}/`,

}

export const authApi = () => {
    return axios.create({
        baseURL: SERVER,
        headers: {
            "Authorization":  cookie.load("access_token")
        }
    })
}

export default axios.create({
    baseURL: SERVER
})