import { useContext, useEffect, useState } from "react";
import { authApi, endpoints } from "../../configs/APIs";
import { Container } from "@mui/material";

import {
  ToastContainer,
  toast,
} from "../../../node_modules/material-react-toastify/dist";
import Loading from "../../layouts/Loading";
import { formattedNumber } from "../../configs/Methods";
import { Link } from "react-router-dom";
import UserContext from "../../Contexts/UserContext";
import Error401page from "../../layouts/errors/Error401page";
import ListOrders from "../../components/orders/ListOrders";


const OrderBidsPage = () => {
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [user] = useContext(UserContext);

  useEffect(() => {
    const loadOrderBidsList = async () => {
      let e = `${endpoints["order-bids-list"]}?page=${page}&type=IS_AUTIONING`;
      try {
        setLoading(true);
        let res = await authApi().get(e);
        console.log(res.data)
        setOrderList(res.data);
      } catch (error) {
        if (error.response.status === 404) setOrderList("");
        else toast.error("Có lỗi xảy ra!");
      } finally {
        setLoading(false);
      }
    };
    loadOrderBidsList()
  }, [page]);

  const nextPage = (page) => {
    setPage(page);
  };

  const prevPage = (page) => {
    setPage(page);
  };

  if (user === null) return <Error401page />;
  return (
    <>
      <Container component="main" maxWidth="xl">
        <ListOrders
          orderList={orderList}
          nextPage={nextPage}
          prevPage={prevPage}
          loading={loading}
        ></ListOrders>
        
      </Container>
      <ToastContainer />
    </>
  );
};

export default OrderBidsPage;
