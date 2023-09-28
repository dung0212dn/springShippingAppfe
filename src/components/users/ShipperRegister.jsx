import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ToastContainer,
  toast,
} from "../../../node_modules/material-react-toastify/dist";
import API, { endpoints } from "../../configs/APIs";
import Loading from "../../layouts/Loading";

import { memo } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { PulseLoader } from "react-spinners";
import { Input } from "@mui/icons-material";
import { MuiFileInput } from "mui-file-input";

const ShipperRegister = () => {
  const [user, setUser] = useState({
    name: "",
    username: "",
    password: "",
    email: "",
    phone: "",
    confirmPassword: "",
    cmnd: "",
  });

  const avatar = useRef();
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const [avatarImg, setAvatarImg] = useState(null);

  const setValue = (value, key) => {
    setUser({ ...user, [key]: value });
  };

  const handleImportImage = (img) => {
    setAvatarImg(img);
  };

  const setErr = (err) => {
    return toast.error(err);
  };

  const register = (evt) => {
    evt.preventDefault();
    console.log(avatar);

    const process = async () => {
      let form = new FormData();
      form.append("name", user.name);
      form.append("username", user.username);
      form.append("password", user.password);
      form.append("email", user.email);
      form.append("phone", user.phone);
      form.append("avatar", avatarImg);
      form.append("active", 1);
      form.append("CMND", user.cmnd);
      try {
        let res = await API.post(endpoints["shipper-register"], form, {
          headers: {
            "Content-Type": "multiple/form-data",
          },
        });

        if (res.status === 201) {
          toast.success(
            "Đăng kí thành công! Bạn sẽ được chuyển về trang đăng nhập trong 5s..."
          );
          setTimeout(() => {
            nav("/login");
          }, 5000);
        }
      } catch (ex) {
        let e = "";
        for (let d of Object.values(ex.response.data)) e += `${d}`;
        setErr(e);
      } finally {
        setLoading(false);
      }
    };

    if (user.username === "" || user.password === "")
      setErr("Username và password bắt buộc nhập!");
    else if (
      user.email === "" ||
      user.name === "" ||
      user.phone === "" ||
      user.cmnd === ""
    ) {
      setErr("Vui lòng điền đầy đủ thông tin");
    } else if (user.password !== user.confirmPassword)
      setErr("Mật khẩu không khớp!");
    else {
      setLoading(true);
      process();
    }
  };
  return (
    <>
      <Container component="main" maxWidth="md">
        <Box
          sx={{
            marginTop: 5,
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
            Đăng kí người giao hàng
          </Typography>
          <Typography
            component="h6"
            
            className="tw-text-heavy-red tw-text-center tw-text-sm tw-font-roboto"
          >
           (*Sau khi đăng kí phải đợi cần hệ thống kích hoạt. Chúng tôi sẽ gửi mail thông báo sau khi kích hoạt đến cho bạn)
          </Typography>
          <Box component="form" onSubmit={register} noValidate sx={{ mt: 1 }}>
            <TextField
              fullWidth
              margin="normal"
              required
              label="Tên đăng nhập"
              value={user.username}
              type="text"
              onInput={(e) => setValue(e.target.value, "username")}
            />

            <TextField
              fullWidth
              required
              margin="normal"
              label="Mật khẩu"
              value={user.password}
              type="password"
              onInput={(e) => setValue(e.target.value, "password")}
            />

            <TextField
              fullWidth
              required
              margin="normal"
              label="Xác nhận mật khẩu"
              value={user.confirmPassword}
              type="password"
              onInput={(e) => setValue(e.target.value, "confirmPassword")}
            />

            <TextField
              label="Tên người dùng"
              required
              margin="normal"
              fullWidth
              value={user.name}
              type="text"
              placeholder="Họ và Tên người dùng"
              onInput={(e) => setValue(e.target.value, "name")}
            />

            <TextField
              fullWidth
              required
              margin="normal"
              label="Email"
              value={user.email}
              type="email"
              onInput={(e) => setValue(e.target.value, "email")}
            />

            <TextField
              fullWidth
              required
              margin="normal"
              label="Số điện thoại"
              value={user.phone}
              onInput={(e) => setValue(e.target.value, "phone")}
            />

            <TextField
              fullWidth
              required
              margin="normal"
              label="Chứng minh nhân dân"
              value={user.cmnd}
              onInput={(e) => setValue(e.target.value, "cmnd")}
            />

            <MuiFileInput
              label="Ảnh đại diện"
              value={avatarImg}
              onChange={handleImportImage}
              margin="normal"
              fullWidth
              ref={avatar}
            />

            {/* <Form.Group className="mb-3" controlId="avatar">
          <Form.Label>Ảnh đại diện</Form.Label>
          <Form.Control className="block mt-1" type="file" ref={avatar} />
        </Form.Group> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={register}
              className="tw-mt-5 tw-py-3 tw-mb-2 tw-font-roboto tw-text-base"
            >
              {loading === true ? (
                <PulseLoader color="white" size={10} />
              ) : (
                "Đăng kí người dùng"
              )}
            </Button>
          </Box>
        </Box>
      </Container>
      <ToastContainer></ToastContainer>
    </>
  );
};

// const InputItem = memo(({ label, value, setValue, type }) => {
//   return (
//     <>

//         <Form.Label className="">{label}</Form.Label>
//         <Form.Control
//           type={type}
//           value={value}
//           onChange={setValue}
//           placeholder={label}
//           className="block border w-full h-10 px-2 outline-none border-gray-light mt-1 focus:border-black rounded"
//         />

//     </>
//   );
// });

export default ShipperRegister;
