import React, { useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import OrderContext from "../../Contexts/OrderContext";
import { Alert, Box } from "@mui/material";
import { isValidEmail, isValidPhoneNumber } from "../../configs/Validator";

const OrderForm = ({ handleFormValidity }) => {
  const [order, orderDispatch] = React.useContext(OrderContext);
  const [error, setError] = useState("");
  const [orderInfo, setOrderInfo] = useState({
    title: order.orderInfo.title,
    content: order.orderInfo.content,
    billingAddress: order.orderInfo.billingAddress,
    shippingAddress: order.orderInfo.shippingAddress,
    receiverName: order.orderInfo.receiverName,
    receiverPhone: order.orderInfo.receiverPhone,
    receiverEmail: order.orderInfo.receiverEmail,
  });

  useEffect(() => {
    orderDispatch({
      type: "UPDATE_ORDER_INFO",
      payload: orderInfo,
    });
  }, [orderInfo]);

  useEffect(() => {
    if (
      orderInfo.receiverPhone !== "" &&
      isValidPhoneNumber(orderInfo.receiverPhone) === false
    ) {
      setError("Số điện thoại không hợp lệ!");
    } else if (
      orderInfo.receiverPhone.length >= 1 &&
      orderInfo.receiverPhone.length < 10
    )
      setError("Số điện thoại phải có 10 số");
    else if (
      orderInfo.receiverEmail !== "" &&
      isValidEmail(orderInfo.receiverEmail) === false
    ) {
      setError("Email không hợp lệ!");
    } else setError("");

    if (
      orderInfo.title === "" ||
      orderInfo.content === "" ||
      orderInfo.billingAddress === "" ||
      orderInfo.shippingAddress === "" ||
      order.orderInfo.receiverName === "" ||
      order.orderInfo.receiverPhone === "" ||
      order.orderInfo.receiverEmail === "" ||
      error !== ""
    ) {
      handleFormValidity(false);
    } else {
      handleFormValidity(true);
    }
  }, [orderInfo, handleFormValidity]);

  return (
    <>
      <Typography variant="h5" className="tw-font-roboto tw-py-2" gutterBottom>
        Thông tin giao nhận
      </Typography>
      <Grid container spacing={3}>
        {error !== "" ? (
          <Grid item xs={12} sm={12}>
            <Alert severity="error">{error}</Alert>
          </Grid>
        ) : (
          ""
        )}
        <Grid item xs={12} sm={12}>
          <TextField
            required
            label="Tiêu đề"
            fullWidth
            autoComplete="given-name"
            value={order.orderInfo.title}
            variant="standard"
            onInput={(e) => {
              setOrderInfo((prevState) => ({
                ...prevState,
                title: e.target.value,
              }));
            }}
            sx={{ fontFamily: "Roboto" }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            label="Mô tả"
            value={order.orderInfo.content}
            fullWidth
            multiline
            variant="standard"
            onChange={(e) => {
              setOrderInfo((prevState) => ({
                ...prevState,
                content: e.target.value,
              }));
            }}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            required
            label="Họ và Tên người nhận hàng"
            value={order.orderInfo.receiverName}
            fullWidth
            multiline
            variant="standard"
            onChange={(e) => {
              setOrderInfo((prevState) => ({
                ...prevState,
                receiverName: e.target.value,
              }));
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            label="Số điện thoại người nhận hàng"
            value={order.orderInfo.receiverPhone}
            fullWidth
            multiline
            variant="standard"
            onChange={(e) => {
              setOrderInfo((prevState) => ({
                ...prevState,
                receiverPhone: e.target.value,
              }));
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            label="Email người nhận đơn"
            value={order.orderInfo.receiverEmail}
            fullWidth
            multiline
            variant="standard"
            onChange={(e) => {
              setOrderInfo((prevState) => ({
                ...prevState,
                receiverEmail: e.target.value,
              }));
            }}
          />
        </Grid>

        <Grid item md={12}>
          <TextField
            required
            label="Địa chỉ nhận hàng"
            fullWidth
            value={order.orderInfo.billingAddress}
            variant="standard"
            placeholder="Địa chỉ shipper đến nhận đơn giao. Vui lòng ghi rõ số nhà, tên đường, xã/phường, quận/huyện, tỉnh/thành phố."
            onChange={(e) => {
              setOrderInfo((prevState) => ({
                ...prevState,
                billingAddress: e.target.value,
              }));
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Địa chỉ giao hàng"
            fullWidth
            value={order.orderInfo.shippingAddress}
            variant="standard"
            placeholder="Địa chỉ nơi hàng hóa được giao đến. Vui lòng ghi rõ số nhà, tên đường, xã/phường, quận/huyện, tỉnh/thành phố."
            onChange={(e) => {
              setOrderInfo((prevState) => ({
                ...prevState,
                shippingAddress: e.target.value,
              }));
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default OrderForm;
