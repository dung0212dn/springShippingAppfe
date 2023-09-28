import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import OrderContext from "../../Contexts/OrderContext";
import UserContext from "../../Contexts/UserContext";
import { formattedNumber } from "../../configs/Methods";
import { Box, TextField } from "@mui/material";
import APIs, { authApi, endpoints } from "../../configs/APIs";

const addresses = ["1 MUI Drive", "Reactville", "Anytown", "99999", "USA"];
const payments = [
  { name: "Card type", detail: "Visa" },
  { name: "Card holder", detail: "Mr John Smith" },
  { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
  { name: "Expiry date", detail: "04/2024" },
];

const OrderReview = () => {
  const [order, orderDispatch] = React.useContext(OrderContext);
  const [user, userDispatch] = React.useContext(UserContext);
  const [orderTotal, setOrderTotal] = React.useState(0);
  const [orderTotalPromotions, setOrderTotalPromotions] = React.useState(null);
  const [orderInfo, setOrderInfo] = React.useState(order.orderInfo);
  const [error, setError] = React.useState(null);
  const [promotions, setPromotions] = React.useState(null);

  React.useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 6) + 2;
    setOrderTotal(orderTotal + 10000 + randomNumber * 4000 + 3000 * 2);
    setOrderTotalPromotions(
      orderTotal + 10000 + randomNumber * 4000 + 3000 * 2
    );
  }, []);

  React.useEffect(() => {
    setOrderInfo((prevState) => ({
      ...prevState,
      orderTotal: orderTotalPromotions,
    }));
  }, [orderTotalPromotions]);

  React.useEffect(() => {
    orderDispatch({
      type: "UPDATE_ORDER_PROMOTION",
      payload: promotions,
    });
  }, [promotions]);

  React.useEffect(() => {
    orderDispatch({
      type: "UPDATE_ORDER_INFO",
      payload: orderInfo,
    });
  }, [orderInfo]);

  let process = null;
  const handleAddPromotions = (code) => {
    clearTimeout(process);
    process = setTimeout(async () => {
      let res = await authApi()
        .post(endpoints["promotions"], { code: code })
        .catch((error) => {
          if (error.response.status === 404) {
            setError("Mã khuyến mãi không hợp lệ!");
            setPromotions("");
            setOrderTotalPromotions(orderTotal);
          }
        });

      if (res !== undefined) {
        setError(null);
        setPromotions(res.data.code);
        if (res.data.type === "percentage" && res.data.expirationDate >= Date.now()) {
          setOrderTotalPromotions(
            orderTotal - (orderTotal * res.data.value) / 100
          );
        }else setError("Mã khuyến mãi không hợp lệ!")
      }
    }, 100);
  };

  return (
    <React.Fragment>
      <Typography variant="h5" className="tw-font-roboto tw-py-2" gutterBottom>
        Chi tiết đơn hàng
      </Typography>
      <List disablePadding>
        {order.orderDetails.map((orderDetail, index) => (
          <ListItem key={index} sx={{ pb: 1, px: 0 }}>
            <ListItemText
              sx={{ fontFamily: "Roboto" }}
              primary={"Sản phẩm " + (index + 1)}
              secondary={orderDetail.productName}
            />
            <Typography variant="body2">{orderDetail.quantity}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Tổng tiền" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {formattedNumber(orderTotalPromotions)} VNĐ
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
                {user.name}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>Email:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom className="tw-font-roboto">
                {user.email}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>Số điện thoại:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom className="tw-font-roboto">
                {user.phone}
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
          </Grid>
        </Grid>
        <Grid item container direction="column" xs={12} sm={4}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Mã giảm giá
          </Typography>
          <Box component="form">
            <TextField
              required
              label="Mã giảm giá"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              sx={{ fontFamily: "Roboto" }}
              onInput={(e) => {
                console.log(e.target.value);
                handleAddPromotions(e.target.value);
              }}
            />
            {error != null ? (
              <p className="tw-text-ssm tw-mt-3 tw-text-red">{error}</p>
            ) : (
              ""
            )}
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default OrderReview;
