import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { authApi, endpoints } from "../../configs/APIs";
import { useParams } from "react-router-dom";
import { toast } from "../../../node_modules/material-react-toastify/dist";
import Comment from "../../components/reviews/Comment";

const ShipperDetails = () => {
  const [shipper, setShipper] = useState(null);
  const [Loading, setLoading] = useState(false);

  const { shipperID } = useParams();

  useEffect(() => {
    console.log(shipperID);
    const loadOrderDetail = async () => {
      try {
        setLoading(true);
        let res = await authApi().get(endpoints["shipper-info"](shipperID));
        setShipper(res.data);
        console.log(res.data);
      } catch (error) {
        toast.error("Có lỗi xảy ra!");
      } finally {
        setLoading(false);
      }
    };
    loadOrderDetail();
  }, []);

  if(shipper === null) return ""
  return (
    <>
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography
            variant="h5"
            className="tw-font-roboto tw-py-2"
            gutterBottom
          >
            Thông tin shipper
          </Typography>
          <Grid container spacing={2}>
            <Grid item sm={4}>
              <Box sx={{width: 30}}>
                <img className="tw-object-cover" alt="" width="200" src={shipper.avatar} />
              </Box>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography
                variant="h6"
                className="tw-font-roboto"
                gutterBottom
                sx={{ mt: 2 }}
              >
                Thông tin cá nhân
              </Typography>
              <Grid container>
                <Grid item xs={6}>
                  <Typography gutterBottom>Họ và Tên:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom className="tw-font-roboto">
                    {shipper.name}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>Email:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom className="tw-font-roboto">
                    {shipper.email}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>Số điện thoại:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom className="tw-font-roboto">
                    {shipper.phone}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        <Paper  variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Comment shipperID={shipper.userID}></Comment>
        </Paper>
      </Container>
    </>
  );
};

export default ShipperDetails;
