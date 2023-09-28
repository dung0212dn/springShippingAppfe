import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import UserContext from "../../Contexts/UserContext";

const HomePage = () => {
  const Background = styled(Box)({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    zIndex: -2,
  });

  const sxBackground = {
    backgroundImage: `url("https://media.istockphoto.com/id/1284193248/vi/anh/kho-b%C3%A1n-l%E1%BA%BB-%C4%91%E1%BA%A7y-%C4%91%E1%BB%A7-c%C3%A1c-k%E1%BB%87-cao-v%E1%BB%9Bi-h%C3%A0ng-h%C3%B3a-trong-h%E1%BB%99p-c%C3%A1c-t%C3%B4ng-c%C3%B3-%C4%91%E1%BB%99i-ng%C5%A9-chuy%C3%AAn-gia-qu%C3%A9t-v%C3%A0-s%E1%BA%AFp.jpg?s=612x612&w=0&k=20&c=wk57XSlk4FrUqiRUH0uEOVBi8yPvsqC4enFY5cF9Yjo=")`,
    backgroundColor: "#7fc7d9", // Average color of the background image.
    backgroundPosition: "center",
  };

  const [user, userDispatch] = React.useContext(UserContext);

  return (
    <>
      <Container
        sx={{
          mt: 3,
          mb: 14,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "white",
        }}
      >
        {/* Increase the network loading priority of the background image. */}
        <img
          style={{ display: "none" }}
          src={sxBackground.backgroundImage}
          alt="increase priority"
        />
        <Box sx={{ py: 18 }}>
          <Typography
            color="inherit"
            align="center"
            variant="h2"
            marked="center"
            className="tw-font-opensans tw-uppercase tw-font-extrabold"
          >
            Giao hàng siêu tốc
          </Typography>
          <Typography
            color="inherit"
            align="center"
            variant="h6"
            sx={{ mb: 5, mt: { xs: 4, sm: 5 }, fontFamily: "Roboto Slab" }}
            className="tw-tracking-wider"
          >
            Thay bạn trao những món hàng đến tay người nhận nhanh chóng.
          </Typography>
          {user === null ? (
            <Box
              sx={{ display: "flex", gap: "20px", justifyContent: "center" }}
            >
              <Button
                color="secondary"
                variant="contained"
                sx={{ minWidth: 200, fontFamily: "Roboto Slab" }}
                className="tw-tracking-wider"
              >
                <Link
                  to="/register"
                  className="tw-tracking-wider tw-no-underline tw-text-white tw-w-full tw-block"
                >
                  Đăng kí
                </Link>
              </Button>
              <Button
                color="secondary"
                variant="contained"
                sx={{
                  minWidth: 200,
                  fontFamily: "Roboto Slab",
                  padding: "6px 0px",
                }}
                className="tw-tracking-wider"
              >
                <Link
                  to="/login"
                  className="tw-tracking-wider tw-no-underline tw-text-white tw-w-full tw-block"
                >
                  Đăng nhập
                </Link>
              </Button>
            </Box>
          ) : (
            <Box
              sx={{ display: "flex", gap: "20px", justifyContent: "center" }}
            >
              <Button
                color="secondary"
                variant="contained"
                sx={{
                  minWidth: 200,
                  fontFamily: "Roboto Slab",
                  padding: "6px 0px",
                }}
                className="tw-tracking-wider"
              >
                <Link
                  to="/order"
                  className="tw-tracking-wider tw-no-underline tw-text-white tw-w-full tw-block"
                >
                  Đặt hàng
                </Link>
              </Button>
            </Box>
          )}
        </Box>
        <Box
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: "common.black",
            opacity: 0.5,
            zIndex: -1,
          }}
        />
        <Background sx={sxBackground} />
      </Container>
    </>
  );
};

export default HomePage;
