import React, { useContext, useReducer, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import OrderForm from "../../components/orders/OrderForm";
import OrderDetailForm from "../../components/orders/OrderDetailForm";
import OrderReview from "../../components/orders/OrderReview";
import OrderReducer from "../../Reducers/OrderReducer";
import OrderContext from "../../Contexts/OrderContext";
import UserContext from "../../Contexts/UserContext";
import { authApi, endpoints } from "../../configs/APIs";
import { ToastContainer, toast } from "../../../node_modules/material-react-toastify/dist";
import Error401page from "../../layouts/errors/Error401page";
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
  const steps = [
    "Thông tin giao nhận",
    "Thông tin đơn hàng",
    "Tổng kết đơn hàng",
  ];

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <OrderForm handleFormValidity={handleFormValidity} />;
      case 1:
        return <OrderDetailForm handleFormValidity={handleFormValidity} />;
      case 2:
        return <OrderReview handleFormValidity={handleFormValidity} />;
      default:
        throw new Error("Unknown step");
    }
  };

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const [nextAllow, setNextAllow] = useState(false);

  const handleFormValidity = (nextAllow) => {
    setNextAllow(nextAllow);
  };
  const orderInit = {
    orderInfo: {
      title: "",
      content: "",
      billingAddress: "",
      shippingAddress: "",
      receiverName : "",
      receiverPhone: "",
      receiverEmail: "",
    },
    orderDetails: [
      {
        productName: "",
        quantity: 0,
      },
      {
        productName: "",
        quantity: 0,
      },
    ],
  };
  const [user, userDispatch] = useContext(UserContext);

  const [order, orderDispatch] = useReducer(OrderReducer, orderInit);
  const navigate = useNavigate();

  const handleCreateOrder = () => {
    const createOrder = async () => {
      console.log(order)
      try {
        const res = await toast.promise( authApi().post(endpoints["order-create"], order), 
        {success: "Tạo đơn hàng thành công"});
        
        orderDispatch({
          type: "RESET_STATE",
          payload:res.data,
        })
        setActiveStep(activeStep + 1);
        clearTimeout();
        setTimeout(() => {
          navigate(`/order-list/order/${res.data.orderInfo.orderID}`)
        }, 5000)
        
      } catch (error) {
        toast.error("Có lỗi xảy ra!!!");
      }
  
    };
    createOrder();

  };

  if (user === null) return (<><Error401page/></>);

  return (
    <OrderContext.Provider value={[order, orderDispatch]}>
      <React.Fragment>
        <CssBaseline />
        <Container component="main" maxWidth="xl" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Typography component="h1" variant="h4" align="center">
              Tạo đơn hàng
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Cảm ơn bạn vì đã tin tưởng chúng tôi.
                </Typography>
                <Typography variant="subtitle1">
                Chúng tôi sẽ chuyển bạn về trang chi tiết đơn hàng trong vài giây nữa.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Quay lại
                    </Button>
                  )}
                  {activeStep === steps.length - 1 ? (
                    <Button  onClick={handleCreateOrder} variant="contained" sx={{ mt: 3, ml: 1 }}>
                      Tạo đơn
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 3, ml: 1 }}
                      disabled={!nextAllow}
                    >
                      Tiếp
                    </Button>
                  )}
                </Box>
              </React.Fragment>
            )}
          </Paper>
        </Container>
        <ToastContainer
        position="top-right"
        theme="colored"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      </React.Fragment>
     
    </OrderContext.Provider>
  );
};

export default OrderPage;
