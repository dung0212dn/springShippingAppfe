import { useContext, useEffect, useState } from "react";
import { authApi, endpoints } from "../../configs/APIs";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

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

// const columns = [
//   { field: 'orderID', headerName: 'Mã đơn hàng', width: 90 },
//   {
//     field: 'title',
//     headerName: 'Tiêu đề',
//     width: 150,
//     editable: true,
//   },
//   {
//     field: 'orderTotal',
//     headerName: 'Tổng tiền',
//     width: 150,
//     editable: true,
//   },
//   {
//     field: 'status',
//     headerName: 'Trạng thái',
//     type: 'number',
//     width: 110,
//     editable: true,
//   },
// //   {
// //     field: 'fullName',
// //     headerName: 'Full name',
// //     description: 'This column has a value getter and is not sortable.',
// //     sortable: false,
// //     width: 160,
// //     valueGetter: (params) =>
// //       `${params.row.firstName || ''} ${params.row.lastName || ''}`,
// //   },
// ];

const ListOrderPage = () => {
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [user] = useContext(UserContext);
  const [sortFilter, setSortFilter] = useState("createdDateAsc");

  useEffect(() => {
    const loadOrderListUser = async () => {
      let e = `${endpoints["order-list-user"]}?page=${page}`;
      try {
        setLoading(true);
        let res = await authApi().get(e);
        setOrderList(res.data);
      } catch (error) {
        if (error.response.status === 404) setOrderList("");
        else toast.error("Có lỗi xảy ra!");
      } finally {
        setLoading(false);
      }
    };

    const loadOrderListShipper = async () => {
      let e = `${endpoints["order-list-shippers"]}?page=${page}?sort=${sortFilter}`;
      try {
        setLoading(true);
        let res = await authApi().get(e);
        setOrderList(res.data);
      } catch (error) {
        if (error.response.status === 404) setOrderList("");
        else toast.error("Có lỗi xảy ra!");
      } finally {
        setLoading(false);
      }
    };
    if (user !== null) {
      if (user.role === "ROLE_USER") loadOrderListUser();
      else {
        loadOrderListShipper();
      }
    }
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
        {/* <Box sx={{ width: "100%", display:"flex", justifyContent:"end", my: 2}}>
          <select
            id="demo-simple-select"
            value={sortFilter}
            label="Sắp xếp"
            onChange={(e) => {setSortFilter(e.target.value); console.log(sortFilter)}}
            className="tw-py-3 tw-px-1"
          >
            <option value="createdDateAsc">Sắp xếp tăng dần ngày tạo</option>
            <option value="createdDateDesc">Sắp xếp giảm dần ngày tạo</option>
          </select>
        </Box> */}
        <ListOrders
          orderList={orderList}
          nextPage={nextPage}
          prevPage={prevPage}
        ></ListOrders>
      </Container>
      <ToastContainer />
    </>
  );
};

export default ListOrderPage;
