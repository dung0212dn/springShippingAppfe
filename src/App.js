import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import cookie from "react-cookies";
import { useReducer } from "react";

import LoginPage from "./views/pages/LoginPage";
import MainPage from "./layouts/base/MainPage";
import { Container } from "@mui/material";
import UserContext from "./Contexts/UserContext";
import UserReducer from "./Reducers/UserReducer";
import HomePage from "./views/pages/HomePage";
import OrderPage from "./views/pages/OrderPage";
import RegisterPage from "./views/pages/RegisterPage";
import Error404page from "./layouts/errors/Error404page";
import Error403page from "./layouts/errors/Error403page";
import Error401page from "./layouts/errors/Error401page";
import ListOrderPage from "./views/pages/ListOrderPage";
import OrderDetailPage from "./views/pages/OrderDetailPage";
import ShipperDetails from "./views/pages/ShipperDetails";
import RoleAccess from "./layouts/auth/RoleAccess";
import OrderBidsPage from "./views/pages/OrderBidsPage";

function App() {
  let currentuser = cookie.load("current-user");
  if (currentuser === undefined) currentuser = null;

  const [user, userDispatch] = useReducer(UserReducer, currentuser);

  return (
    <>
      <UserContext.Provider value={[user, userDispatch]}>
        {/* <CartContext.Provider value={[cart, cartDispatch]}> */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />}>
              <Route path="" element={<HomePage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route element={<RoleAccess roles={["ROLE_USER", "ROLE_SHIPPER"]} />}>
                <Route path="order" element={<OrderPage />} />
                <Route path="order-list" element={<ListOrderPage />} />
              </Route>
              <Route
                path="order-bids-list"
                element={<OrderBidsPage />}
              />

              <Route
                path="order-list/order/:orderId"
                element={<OrderDetailPage />}
              />
              <Route path="shipper/:shipperID" element={<ShipperDetails />} />
            </Route>
            <Route path="error/">
              <Route path="404" element={<Error404page />} />
              <Route path="403" element={<Error403page />} />
              <Route path="401" element={<Error401page />} />
            </Route>
          </Routes>
        </BrowserRouter>
        {/* </CartContext.Provider> */}
      </UserContext.Provider>
    </>
  );
}

export default App;
