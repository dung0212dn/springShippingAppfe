import React, { memo, useState } from "react";

import {
  ToastContainer,
  toast,
} from "../../../node_modules/material-react-toastify/dist";

import { Box, Container, Tab, Tabs } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import UserRegister from "../../components/users/UserRegister";
import ShipperRegister from "../../components/users/ShipperRegister";

const RegisterPage = () => {
  const [key, setKey] = useState("user");

  const handleChange = (event, newValue) => {
    setKey(newValue);
  };

  return (
    <>
      <Container>
        <TabContext value={key}>
          <Box
            className="sss"
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              mt: 4,
            }}
          >
            <TabList
              centered={true}
              sx={{
                width: "100%", // Đảm bảo chiều rộng của TabList là 100%
                justifyContent: "flex-center",
                display: "flex",
              }}
              className="tw-w-full"
              onChange={handleChange}
              aria-label="lab API tabs example"
            >
              <Tab
                sx={{
                  width: "100%",
                  fontFamily: "Open Sans",
                  fontWeight: 600,
                  fontSize: 16,
                }}
                label="Đăng ký người dùng"
                value="user"
              />
              <Tab
                sx={{
                  width: "100%",
                  fontFamily: "Open Sans",
                  fontWeight: 600,
                  fontSize: 16,
                }}
                label="Đăng ký người giao hàng"
                value="bussiness"
              />
            </TabList>
          </Box>
          <TabPanel value="user">
            <UserRegister></UserRegister>
          </TabPanel>
          <TabPanel value="bussiness"><ShipperRegister></ShipperRegister></TabPanel>
        </TabContext>
      </Container>
      <ToastContainer />
    </>
  );
};

export default RegisterPage;
