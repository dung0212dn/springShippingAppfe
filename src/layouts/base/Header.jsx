import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link, useActionData, useNavigate } from "react-router-dom";
import UserContext from "../../Contexts/UserContext";

// import API, { endpoints } from "../../configs/API";

const Header = () => {
  // //  const [cart, cartDispatch] = useContext(CartContext)
  const [user, userDispatch] = useContext(UserContext);
  // //  const [cartCount, setCartCount] = useState(null)
  // const cartCount = useSelector((state) => state.cartCount);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const link = [
    { role: "ANY", linkRole: { name: "Trang chủ", link: "/" } },
    { role: "ROLE_USER", linkRole: [{ name: "Đặt hàng", link: "/order" }, {name: "Đơn hàng của tôi", link: "/order-list"}] },
    { role: "ROLE_SHIPPER", linkRole: [{ name: "Đấu giá", link: "/order-bids-list" }, {name: "Đơn hàng đấu giá của tôi", link: "/order-list"}] },
  ];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    userDispatch({
      type: "logout",
    });
    navigate("/login");
  };

  return (
    <>
      <AppBar position="relative">
        <Container maxWidth="" className="tw-flex tw-w-full">
          <Toolbar sx={{ width: "100%" }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
       
           
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                fontSize: "20px",
                width: 3 / 5,
                justifyContent: "start",
                gap: "20px",
              }}
            >
              <Link
                  className="
                  tw-text-base
                  tw-font-semibold 
                  tw-tracking-wider
                tw-text-white
                  tw-no-underline 
                  tw-uppercase
                  tw-font-opensans"
                  to="/order"
                >
                  Đặt hàng
                </Link>
                <Link
                  className="
                  tw-text-base
                  tw-font-semibold 
                  tw-tracking-wider
                tw-text-white
                  tw-no-underline 
                  tw-uppercase
                  tw-font-opensans"
                  to="/order-list"
                >
                  Đơn hàng của tôi
                </Link>
            </Box> <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                fontSize: "20px",
                width: 3 / 5,
                justifyContent: "start",
                gap: "20px",
              }}
            >
              <Link
                  className="
                  tw-text-base
                  tw-font-semibold 
                  tw-tracking-wider
                tw-text-white
                  tw-no-underline 
                  tw-uppercase
                  tw-font-opensans"
                  to="/order-bids-list"
                >
                  Đấu giá
                </Link>
                <Link
                  className="
                  tw-text-base
                  tw-font-semibold 
                  tw-tracking-wider
                tw-text-white
                  tw-no-underline 
                  tw-uppercase
                  tw-font-opensans"
                  to="/order-list"
                >
                  Đơn đấu giá của tôi
                </Link>
            </Box>)
           }

            {user === null ? (
              <>
                <Box sx={{ display: "flex", gap: 3 }}>
                  <Link
                    className="tw-text-base tw-font-semibold tw-tracking-wider tw-text-white tw-no-underline tw-uppercase tw-font-opensans"
                    to="/login"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    className="tw-text-base tw-font-semibold tw-tracking-wider tw-text-white tw-no-underline tw-uppercase tw-font-opensans"
                    to="/register"
                  >
                    Đăng kí
                  </Link>
                </Box>
              </>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: 1 / 5,
                }}
              >
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src={user.avatar} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {user.role === "ROLE_USER" ? (
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link
                        to="/order-list"
                        className="tw-no-underline"
                        style={{ textDecoration: "none" }}
                      >
                        Đơn hàng của tôi
                      </Link>
                    </MenuItem>
                  ) : (
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link
                        to="/order-list"
                        className="tw-no-underline"
                        style={{ textDecoration: "none" }}
                      >
                        Đơn hàng đấu giá của tôi
                      </Link>
                    </MenuItem>
                  )}
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" onClick={handleLogout}>
                      Đăng xuất
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Header;
