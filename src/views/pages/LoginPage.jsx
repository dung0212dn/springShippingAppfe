import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";

import cookie from "react-cookies";

// import { ToastContainer, toast } from "material-react-toastify";
import UserContext from "../../Contexts/UserContext";
import APIs, { authApi, endpoints } from "../../configs/APIs";

import "material-react-toastify/dist/ReactToastify.css";
import {
  ToastContainer,
  toast,
} from "../../../node_modules/material-react-toastify/dist";
import { PulseLoader } from "react-spinners";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, dispatch] = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const data = {
    username: username,
    password: password,
  };

  const setErr = (err) => {
    return toast.error(err);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const process = async () => {
      setLoading(true);
      try {
        let res = await APIs.post(endpoints["login"], data).catch((error) => {
          if (error.response.status === 400) {
            toast.error(error.response.data);
          } else if (error) {
            toast.error("Đăng nhập thất bại!");
          }
        });
        cookie.save("access_token", res.data);

        // console.log(cartItem)

        let user = await authApi().get(endpoints["current-user"]);

        // if (user.data.groups[0] === 1) {
        //   let business = await API.get(endpoints["current-business"], {
        //     headers: {
        //       Authorization: `Bearer ${cookie.load("access_token")}`,
        //     },
        //   });
        //   console.log(business)
        //   cookie.save("current-user", business.data);

        //   dispatch({
        //     type: "login",
        //     payload: business.data,
        //   });
        // } else {
        console.log(user.data);
        cookie.save("current-user", user.data);

        dispatch({
          type: "login",
          payload: user.data,
        });
        // }

        if (user.data.role === "ROLE_USER") navigate("/");
        else if (user.data.role === "ROLE_SHIPPER") navigate("/order-bids-list");
        else navigate("/");
      } catch (ex) {
       
      } finally {
        setLoading(false);
      }
    };

    process();
  };
  if (user !== null) {
    setTimeout(() => {
      navigate("/")
    }, 5000)
      return <>Bạn đã đăng nhập! Chúng tôi sẽ chuyển bạn về trang chủ sau 5 giây!</>;
  } else
    return (
      <>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 15,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "",
            }}
          >
            <Typography
              component="h1"
              variant="h4"
              className="tw-uppercase tw-font-roboto"
            >
              Đăng nhập
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Tên đăng nhập"
                autoFocus
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mật khẩu"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="tw-mt-5 tw-py-3 tw-mb-2 tw-font-roboto tw-text-base"
              >
                {loading === true ? (
                  <PulseLoader color="white" size={10} />
                ) : (
                  "Đăng nhập"
                )}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/login" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  Don't have an account?
                  <Link to="/register" className="tw-px-1" variant="body2">
                    Sign Up
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
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
      </>
    );
};

export default LoginPage;
