import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useContext, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { authApi, endpoints } from "../../configs/APIs";
import {
  ToastContainer,
  toast,
} from "../../../node_modules/material-react-toastify/dist";
import Loading from "../../layouts/Loading";
import { formattedNumber } from "../../configs/Methods";
import { Close } from "@mui/icons-material";
import UserContext from "../../Contexts/UserContext";
import Error403page from "../../layouts/errors/Error403page";

const OrderDetailPage = () => {
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [orderBid, setOrderBids] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [choosenShipper, setChoosenShipper] = useState(null);
  const [user] = useContext(UserContext);
  const [priceBid, setPriceBid] = useState(0);
  const [bidShipper, setBidShipper] = useState(null);

  const handleOpenModal = (shipperID) => {
    setChoosenShipper(shipperID);
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    const loadOrderDetail = async () => {
      try {
        setLoading(true);
        let res = await authApi().get(endpoints["order-detail"](orderId));
        setOrder(res.data);
        console.log(res.data);
      } catch (error) {
        toast.error("Có lỗi xảy ra!");
      } finally {
        setLoading(false);
      }
    };
    loadOrderDetail();
  }, []);

  useEffect(() => {
    const loadOrderBids = async () => {
      try {
        let e = `${endpoints["order-bids"](orderId)}?page=${page}`;
        setLoading(true);
        let res = await authApi().get(e);
        setOrderBids(res.data);
      } catch (error) {
        toast.error("Có lỗi xảy ra!");
      } finally {
        setLoading(false);
      }
    };
    loadOrderBids();
  }, [page]);

  useEffect(() => {
    const loadShipperBids = async () => {
      try {
        setLoading(true);
        let res = await authApi().get(
          endpoints["bid-shipper"](orderId, user.userID)
        );
        setBidShipper(res.data);
        console.log(res.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    if (user.role === "ROLE_SHIPPER") {
      loadShipperBids();
    }
  }, []);

  const handleChoosenShipper = () => {
    const chooseShipper = async () => {
      try {
        setLoading(true);
        let res = await toast.promise(
          authApi().post(endpoints["choose-shipper"](orderId, choosenShipper)),
          {
            pending: "Đang xử lý",
            success: "Chọn shipper thành công",
          }
        );
      } catch (error) {
        toast.error("Có lỗi xảy ra!");
      }
    };
    chooseShipper();
    setOpenModal(false);
  };

  const handleConfirmDelivered = () => {
    const confirmedDelivered = async () => {
      try {
        let res = await toast.promise(
          authApi().post(endpoints["order-update-status"](orderId), {
            status: "IS_DELIVERED",
          }),
          {
            pending:"Đang xử lý yêu cầu. Vui lòng đợi trong giây lát...",
            success: "Cập nhật thành công!",
          }
        );
        setOrder(res.data);
      } catch (error) {
        console.log(error);
        toast.error("Có lỗi xảy ra!");
      }
    };
    confirmedDelivered();
  };

  const handleSubmitBid = (e) => {
    console.log(priceBid);
    e.preventDefault();
    const submitBid = async () => {
      try {
        let res = await toast.promise(
          authApi().post(endpoints["bids-create"](orderId), {
            price: priceBid,
          }),
          {
            success: "Đấu giá thành công!",
          }
        );
        setBidShipper(res.data);
      } catch (error) {
        console.log(error);
        toast.error("Có lỗi xảy ra!");
      }
    };
    submitBid();
  };

  const nextPage = () => {
    if (orderBid.length < 10) setPage(page - 1);
    console.log(page);
    setPage((page) => page + 1);
  };

  const prevPage = () => {
    if (page === 1) setPage(1);
    else setPage((page) => page - 1);
  };

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

  if (order === null)
    return (
      <>
        <Loading></Loading>
      </>
    );
  if (
    user.role === "ROLE_USER" &&
    order.orderInfo.userID.userID !== user.userID
  )
    return <Error403page />;

  return (
    <>
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography
            variant="h5"
            className="tw-font-roboto tw-py-2"
            gutterBottom
          >
            Chi tiết đơn hàng
          </Typography>
          <List disablePadding>
            {order.orderDetails.map((orderDetail, index) => (
              <ListItem key={index} sx={{ pb: 1, px: 0 }}>
                <ListItemText
                  sx={{ fontFamily: "Roboto" }}
                  secondary={"Sản phẩm " + (index + 1)}
                  primary={orderDetail.productName}
                />
                <Typography variant="subtitle1">
                  x {orderDetail.quantity}
                </Typography>
              </ListItem>
            ))}
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Tổng tiền" />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {formattedNumber(order.orderInfo.orderTotal)} VNĐ
              </Typography>
            </ListItem>
          </List>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    className="tw-font-roboto"
                    gutterBottom
                    sx={{ mt: 2 }}
                  >
                    Thông tin người tạo đơn
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>Người tạo đơn:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom className="tw-font-roboto">
                    {order.orderInfo.userID.name}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>Email:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom className="tw-font-roboto">
                    {order.orderInfo.userID.email}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>Số điện thoại:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom className="tw-font-roboto">
                    {order.orderInfo.userID.phone}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>Địa chỉ lấy hàng:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom className="tw-font-roboto">
                    {order.orderInfo.billingAddress}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    className="tw-font-roboto"
                    gutterBottom
                    sx={{ mt: 2 }}
                  >
                    Thông tin người nhận
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>Họ và Tên:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom className="tw-font-roboto">
                    {order.orderInfo.receiverName}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>Email:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom className="tw-font-roboto">
                    {order.orderInfo.receiverEmail}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>Số điện thoại:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom className="tw-font-roboto">
                    {order.orderInfo.receiverPhone}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>Địa chỉ giao hàng:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom className="tw-font-roboto">
                    {order.orderInfo.shippingAddress}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>Trạng thái:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    gutterBottom
                    className="tw-font-roboto tw-text-heavy-red"
                  >
                    {handleSetStatus(order.orderInfo.status)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container direction="column" xs={12} sm={4}>
              <Typography
                variant="h6"
                className="tw-font-roboto"
                gutterBottom
                sx={{ mt: 2 }}
              >
                Thông tin giao nhận
              </Typography>
              <Grid container>
                <Grid item xs={4}>
                  <Typography gutterBottom>Tiêu đề:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography gutterBottom className="tw-font-roboto">
                    {order.orderInfo.title}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography gutterBottom>Nội dung:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography gutterBottom className="tw-font-roboto">
                    {order.orderInfo.content}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            {user.role === "ROLE_SHIPPER" ? (
              bidShipper === null ? (
                <Box
                  component="form"
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "end",
                    gap: 5,
                  }}
                  onSubmit={handleSubmitBid}
                >
                  <TextField
                    margin="normal"
                    required
                    sx={{}}
                    label="Giá đấu giá"
                    autoFocus
                    onChange={(e) => setPriceBid(e.target.value)}
                  />
                  <Button
                    type="submit"
                    sx={{ width: "20%" }}
                    variant="contained"
                  >
                    Đấu giá
                  </Button>
                </Box>
              ) : bidShipper.isChosen === true &&
                user.role === "ROLE_SHIPPER" ? (
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    pt: 2,
                  }}
                >
                  <Button
                    type="button"
                    onClick={handleConfirmDelivered}
                    sx={{ width: "50%", py: 1 }}
                    variant="outlined"
                    color="success"
                    disabled={order.orderInfo.status === "IS_DELIVERED"}
                  >
                    Giao hàng thành công
                  </Button>
                </Box>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </Grid>
        </Paper>
        {user.role !== "ROLE_SHIPPER" ? (
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 3 }, p: { xs: 2, md: 3 } }}
          >
            <Typography
              variant="h5"
              className="tw-font-roboto tw-py-2"
              gutterBottom
            >
              Danh sách các shipper đấu giá
            </Typography>
            <Box>
              <TableContainer component={Paper} elevation={9} sx={{}}>
                <Table sx={{ px: 5, py: 5 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell># </TableCell>
                      <TableCell align="center">Tên người đấu giá</TableCell>
                      <TableCell align="center">Số tiền</TableCell>
                      <TableCell align="center">Trạng thái</TableCell>
                      <TableCell align="center">
                        Thông tin người đấu giá
                      </TableCell>
                      <TableCell align="center">Chọn người giao</TableCell>
                    </TableRow>
                  </TableHead>

                  {orderBid !== null ? (
                    <>
                      <TableBody>
                        {orderBid.map((item, index) => (
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
                              {index + 1}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: 16,
                                textTransform: "uppercase",
                              }}
                              className="tw-font-roboto"
                              align="center"
                            >
                              {item.shipperID.name}
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
                              {formattedNumber(item.price)}
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
                              {item.isChosen ? (
                                <Typography
                                  className="tw-font-roboto"
                                  sx={{ color: "green" }}
                                >
                                  Đã chọn
                                </Typography>
                              ) : (
                                <Typography
                                  className="tw-font-roboto"
                                  sx={{ color: "red" }}
                                >
                                  Chưa chọn
                                </Typography>
                              )}
                            </TableCell>
                            <TableCell align="center">
                              <Button
                                variant="text"
                                sx={{ textTransform: "uppercase" }}
                              >
                                <Link
                                  className="tw-no-underline tw-font-roboto"
                                  to={`/shipper/${item.shipperID.userID}`}
                                >
                                  Chi tiết
                                </Link>
                              </Button>
                            </TableCell>
                            <TableCell align="center">
                              <Button
                                variant="text"
                                sx={{ textTransform: "uppercase" }}
                                className="tw-font-roboto"
                                disabled={
                                  !(order.orderInfo.status === "IS_AUTIONING")
                                }
                                onClick={() =>
                                  handleOpenModal(item.shipperID.userID)
                                }
                              >
                                Chọn
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                      <TableCell colSpan={6}>
                        <Box
                          sx={{
                            display: "flex",
                            gap: 3,
                            width: "100%",
                            padding: 1,
                            justifyContent: "end",
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
                    <TableCell colSpan={6}>
              
                      Chưa có shipper đấu giá!!
                    </TableCell>
                  )}
                  {/* <Box sx={{display:"flex", gap:3, width:"100%", padding: 2}}>
                    <Button
                      onClick={prevPage}
                      variant="contained"
                    >
                      Quay lại
                    </Button>
                
                    <Button
                      onClick={nextPage}
                      variant="contained"
                    >
                     Tiếp
                    </Button>
                </Box> */}
                </Table>
              </TableContainer>
            </Box>
          </Paper>
        ) : (
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 3 }, p: { xs: 2, md: 3 } }}
          >
            <Typography
              variant="h5"
              className="tw-font-roboto tw-py-2"
              gutterBottom
            >
              Thông tin đấu giá
            </Typography>
            <Box>
              <TableContainer component={Paper} elevation={9} sx={{}}>
                <Table sx={{ px: 5, py: 5 }}>
                  <TableHead>
                    <TableRow>
                      
                      <TableCell align="left">Tên người đấu giá</TableCell>
                      <TableCell align="center">Số tiền</TableCell>
                      <TableCell align="center">Trạng thái</TableCell>
                    </TableRow>
                  </TableHead>

                  {bidShipper !== null ? (
                    <>
                      <TableBody>
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          
                          <TableCell
                            sx={{
                              fontSize: 16,
                              textTransform: "uppercase",
                            }}
                            className="tw-font-roboto"
                            align="left"
                          >
                            {bidShipper.shipperID.name}
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
                            {formattedNumber(bidShipper.price)}
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
                            {bidShipper.isChosen ? (
                              <Typography
                                className="tw-font-roboto"
                                sx={{ color: "green" }}
                              >
                                Đã chọn
                              </Typography>
                            ) : (
                              <Typography
                                className="tw-font-roboto"
                                sx={{ color: "red" }}
                              >
                                Chưa chọn
                              </Typography>
                            )}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </>
                  ) : (
                    <TableCell colSpan={4}>
                      Bạn chưa đấu giá đơn hàng này!
                    </TableCell>
                  )}
                </Table>
              </TableContainer>
            </Box>
          </Paper>
        )}
      </Container>
      <BootstrapDialog
        onClose={handleCloseModal}
        aria-labelledby="customized-dialog-title"
        open={openModal}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Chọn người giao hàng
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseModal}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>Bạn có chắc muốn chọn người này?</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="text" color="error" onClick={handleCloseModal}>
            Hủy
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleChoosenShipper}
          >
            Chọn
          </Button>
        </DialogActions>
      </BootstrapDialog>
      <ToastContainer />
    </>
  );
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default OrderDetailPage;
