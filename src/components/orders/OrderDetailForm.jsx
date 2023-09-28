import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import OrderContext from "../../Contexts/OrderContext";
import { Alert } from "@mui/material";

const OrderDetailForm = ({ handleFormValidity }) => {
  const [order, orderDispatch] = React.useContext(OrderContext);
  const [error, setError] = React.useState("");
  const [orderDetails, setOrderDetails] = React.useState([
    {
      productName: order.orderDetails[0].productName,
      quantity: order.orderDetails[0].quantity,
    },
    {
      productName: order.orderDetails[1].productName,
      quantity: order.orderDetails[1].quantity,
    },
  ]);

  React.useEffect(() => {
    orderDispatch({
      type: "UPDATE_ORDER_DETAIL",
      payload: orderDetails,
    });
  }, [orderDetails]);

  React.useEffect(() => {
    if (
      orderDetails[0].productName === "" ||
      orderDetails[0].quantity === "" ||
      (orderDetails[1].productName !== "" && orderDetails[1].quantity === "0") ||
      (orderDetails[1].productName !== "" && orderDetails[1].quantity === "") ||
      (orderDetails[0].productName === "" && orderDetails[0].quantity !== "") ||
      orderDetails[0].quantity === 0|| orderDetails[0].quantity === "0" ||
      orderDetails[1].quantity === 0 || orderDetails[1].quantity === "0" ||
      (orderDetails[1].productName === "" && orderDetails[1].quantity !== "") ||
      error !== ""
    ) {
      handleFormValidity(false);
    } else {
      handleFormValidity(true);
    }

    const regex = /^[0-9]+$/;
    if (
      !regex.test(orderDetails[0].quantity) ||
      orderDetails[0].quantity < 0 ||
      orderDetails[0].quantity > 3 ||
      orderDetails[1].quantity < 0 ||
      orderDetails[1].quantity > 3 ||
      Number.isInteger(Number(orderDetails[0].quantity)) !== true ||
      Number.isInteger(Number(orderDetails[1].quantity)) !== true
    ) {
      setError("Nhập số lượng hợp lệ! Tối thiểu 1 và tối đa 3");
    } else setError("");
  }, [orderDetails, handleFormValidity]);

  return (
    <>
      {error !== "" ? (
        <Alert severity="error" className="tw-mb-3">
          {error}
        </Alert>
      ) : (
        ""
      )}
      <Typography variant="h5" className="tw-font-roboto tw-py-2" gutterBottom>
        Thông tin đơn hàng
        <p className="tw-text-ssm tw-text-red">
          (*Chỉ có thể thêm tối thiểu 1 món hàng và tối đa 2 món hàng)
        </p>
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Tên hàng 1"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={orderDetails[0].productName}
            onChange={(e) => {
              setOrderDetails((prevState) => {
                const updatedOrderDetails = [...prevState]; // Tạo một bản sao của mảng orderDetails
                updatedOrderDetails[0] = {
                  ...updatedOrderDetails[0],
                  productName: e.target.value,
                };
                return updatedOrderDetails; // Trả về mảng đã cập nhật
              });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            required
            label="Số lượng hàng 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            value={orderDetails[0].quantity}
            onChange={(e) => {
              setOrderDetails((prevState) => {
                const updatedOrderDetails = [...prevState]; // Tạo một bản sao của mảng orderDetails
                updatedOrderDetails[0] = {
                  ...updatedOrderDetails[0],
                  quantity: e.target.value,
                };
                return updatedOrderDetails;
              });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Tên hàng 2"
            fullWidth
            variant="standard"
            value={orderDetails[1].productName}
            onChange={(e) => {
              setOrderDetails((prevState) => {
                const updatedOrderDetails = [...prevState]; // Tạo một bản sao của mảng orderDetails
                updatedOrderDetails[1] = {
                  ...updatedOrderDetails[1],
                  productName: e.target.value,
                };
                return updatedOrderDetails;
              });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Số lượng hàng 2"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            value={orderDetails[1].quantity}
            onChange={(e) => {
              setOrderDetails((prevState) => {
                const updatedOrderDetails = [...prevState]; // Tạo một bản sao của mảng orderDetails
                updatedOrderDetails[1] = {
                  ...updatedOrderDetails[1],
                  quantity: e.target.value,
                };
                return updatedOrderDetails;
              });
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default OrderDetailForm;
