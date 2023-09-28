import { useContext, useEffect, useState } from "react";
import { authApi, endpoints } from "../../configs/APIs";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
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

const ListOrders = (props) => {
  const [page, setPage] = useState(1);
  const [user] = useContext(UserContext);

  const handleSetStatus = (status) => {
    // eslint-disable-next-line default-case
    switch (status) {
      case "IS_AUTIONING":
        return "Đang đấu giá";
      case "IS_DELIVERED":
        return "Đã giao";
      case "IS_SHIPPING":
        return "Đang vận chuyển";
      case "IS_CANCEL":
        return "Đã hủy";
    }
  };

  const nextPage = () => {
    if (props.orderList.length < 10) {
      setPage(page - 1);
      props.nextPage(page - 1);
 
    }
    setPage((page) => page + 1);
    props.nextPage((page) => page + 1);
  };

  const prevPage = () => {
    if (page === 1) {
      setPage(1);
      props.prevPage(1);
    } else {
      setPage((page) => page - 1);
      props.prevPage((page) => page - 1);
    }
  };

  if (user === null) return <Error401page />;
  return (
    <>
      <Container component="main" maxWidth="xl">
        <Box
          sx={{
            marginTop: 5,
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            className="tw-uppercase tw-font-roboto"
            sx={{ justifyContent: "center", textAlign: "center", my: 5 }}
          >
            ĐƠN ĐẤU GIÁ
          </Typography>
          <Box>
            <TableContainer component={Paper} elevation={9} sx={{}}>
              <Table sx={{ px: 5, py: 5 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Mã đơn hàng </TableCell>
                    <TableCell align="center">Tiêu đề</TableCell>
                    <TableCell align="center">Tổng tiền</TableCell>
                    <TableCell align="center">Trạng thái</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
                {props.loading === true ? (
                  <TableCell colSpan={5}>
                    <Loading />
                  </TableCell>
                ) : props.orderList !== "" ? (
                  <>
                    <TableBody>
                      {props.orderList.map((item, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell
                            sx={{
                              fontFamily: "Roboto",
                              fontSize: 16,
                              textTransform: "uppercase",
                              maxWidth: 16,
                            }}
                            style={{ maxWidth: 50 }}
                            className="tw-font-roboto"
                          >
                            {item.orderID}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontSize: 16,
                              textTransform: "uppercase",
                            }}
                            className="tw-font-roboto"
                            align="center"
                          >
                            {item.title}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontFamily: "Roboto",
                              fontSize: 16,
                              textTransform: "uppercase",
                            }}
                            className="tw-font-roboto"
                            align="center"
                          >
                            {" "}
                            {formattedNumber(item.orderTotal)}{" "}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontFamily: "Roboto",
                              fontSize: 16,
                              textTransform: "uppercase",
                            }}
                            className="tw-font-roboto tw-text-heavy-red"
                            align="center"
                          >
                            {handleSetStatus(item.status)}
                          </TableCell>
                          <TableCell align="center">
                            <Button
                              variant="text"
                              sx={{ textTransform: "uppercase" }}
                            >
                              <Link
                                className="tw-no-underline tw-font-roboto"
                                to={`/order-list/order/${item.orderID}`}
                              >
                                Chi tiết
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    
                    </TableBody>
                    <TableCell colSpan={5}>
                        <Box
                          sx={{
                            display: "flex",
                            gap: 3,
                            width: "100%",
                            padding: 2,
                            justifyContent:"end",
                          }}
                        >
                          <Button onClick={prevPage} variant="text">
                            Quay lại
                          </Button>

                          <Button onClick={nextPage} variant="text">
                            Tiếp
                          </Button>
                        </Box>
                      </TableCell>
                  </>
                ) : (
                  <TableCell colSpan={5}>
                    {" "}
                    <Typography className="tw-text-center tw-width-full">
                      Bạn chưa đặt đơn nào
                    </Typography>
                  </TableCell>
                )}
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Container>
      <ToastContainer />
    </>
  );
};

export default ListOrders;
