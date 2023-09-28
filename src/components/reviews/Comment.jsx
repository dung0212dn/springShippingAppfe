import React, { useEffect, useState } from "react";
import moment from "moment/moment";
import cookie from "react-cookies";
import {
  ToastContainer,
  toast,
} from "../../../node_modules/material-react-toastify/dist";
import { useContext } from "react";
import Loading from "../../layouts/Loading";
import { Box, Button, Divider, Rating, Typography } from "@mui/material";
import UserContext from "../../Contexts/UserContext";
import { authApi, endpoints } from "../../configs/APIs";
import { grey } from "@mui/material/colors";
import { Textarea } from "@mui/joy";

const Comment = (props) => {
  const [comments, setComments] = useState(null);
  const [rating, setRating] = useState(0);
  const [commentPost, setCommentPost] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [user, userDispatch] = useContext(UserContext);
  const [page, setPage] = useState(1);

  const nextPage = () => {
    setComments((current) => ({
      ...current,
      results: null,
    }));
    setPage((current) => current + 1);
  };

  const prevPage = () => {
    setComments((current) => ({
      ...current,
      results: null,
    }));

    setPage((current) => current - 1);
  };

  const handlePostReview = (e) => {
    console.log(rating + commentPost);
    e.preventDefault();
    if (commentPost === "") toast.warning("Vui lòng nhập nội dung bình luận");
    else {
      const postComment = async () => {
        try {
          const res = await toast.promise(
            authApi().post(endpoints["add-reviews"](props.shipperID), {
              rating: rating,
              comment: commentPost,
            }),
            {
              pending: "Đang xử lý yêu cầu",
              success: "Đăng bình luận thành công",
            }
          );
          setComments((current) => [res.data, ...current]);
        } catch (error) {
          if (error) {
            console.log(error);
            toast.error("Đăng bình luận thất bại. Có lỗi xảy ra!");
          }
        }
      };
      postComment();
      setShowForm(!showForm);
      setCommentPost("")
      setRating(0)
    }
  };

  const handleShowForm = () => {
    if (user === null) toast.warning("Vui lòng đăng nhập để viết bình luận");
    else {
      setShowForm(!showForm);
    }
  };

  useEffect(() => {
    const loadComment = async () => {
      // let e = `${endpoints["shipper-reviews"](
      //   props.shipperID
      // )}`;
      try {
        const res = await authApi().get(
          endpoints["shipper-reviews"](props.shipperID)
        );
        console.log(res.data);
        setComments(res.data);
      } catch (error) {}
    };

    loadComment();
  }, []);

  if (comments === null) return "Đang tải bình luận...";
  return (
    <>
      <Box
        sx={{ display: "flex" }}
        className="comment-header tw-pb-6 tw-divide-y-2 tw-divide-gray-dark"
      >
        <Box sx={{ width: 1 / 2 }} className="review-header-col-left w-1/2">
          <Box className="comment-header-title">
            <Box
              component="span"
              className=" tw-text-2xl tw-uppercase tw-font-roboto"
            >
              Bình luận của khách hàng
            </Box>
          </Box>
          <Box className="product-rating tw-py-2">
            <Rating value={2} readOnly />
          </Box>
        </Box>
        <Box className="review-header-col-right tw-w-1/2 tw-flex tw-justify-end tw-items-center">
          <Button
            variant="outlined"
            color="error"
            sx={{ borderRadius: 0 }}
            onClick={handleShowForm}
            className="tw-px-4 tw-py-3 tw-font-roboto tw-text-xl tw-h-full"
          >
            Viết bình luận
          </Button>
        </Box>
      </Box>
      <Divider sx={{ borderWidth: 1, height: 2, backgroundColor: grey[200] }} />

      <Box
        className={`review-form-container tw-pb-3 tw-pt-4 ${
          showForm === true ? "" : "tw-hidden"
        }`}
      >
        <Box className="review-form-wrapper">
          <Box className="form-title">
            <span className="tw-uppercase tw-font-roboto">
              Viết bình luận của bạn
            </span>
          </Box>
          <Box className="rating-vote py-2">
            <Rating
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            ></Rating>
          </Box>
          <Box component="form" className="tw-pt-3">
            <Typography className="tw-font-roboto tw-pb-3">
              Nội dung:{" "}
            </Typography>
            <Textarea
              sx={{
                backgroundColor: "white",
                "--Textarea-focusedThickness": "0.1rem",
                "--Textarea-focusedHighlight": "rgba(51,153,255,.8)",
              }}
              className="tw-w-full tw-p-2 tw-font-opensans tw-h-40 tw-rounded-none"
              value={commentPost}
              onChange={(e) => {
                setCommentPost(e.target.value);
              }}
            />
            <Box className="btn-submit-review tw-flex tw-justify-end tw-my-3 tw-w-full">
              <Button
                color="error"
                variant="outlined"
                onClick={handlePostReview}
                className="tw-font-roboto tw-rounded-none tw-py-3 tw-px-4 tw-border"
              >
                Gửi bình luận
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider sx={{ borderWidth: 1, height: 2, backgroundColor: grey[200] }} />
      <Box className="product-reviews-container tw-py-2">
        {comments.map((item, index) => (
          <Box key={index} className="product-review-wrapper tw-py-4">
            <Box className="product-review-header">
              <Box className="product-review-name">
                <span className=" tw-text-xl  tw-font-roboto">
                  {item.userID.name}
                </span>
              </Box>
              <Box className="product-review-time">
                <Box
                  component="span"
                  sx={{ color: grey[600] }}
                  className="  tw-text-sm tw-font-roboto"
                >
                  Đăng vào
                  <Box
                    component="span"
                    sx={{ color: grey[900], px: 1 }}
                    className="text-black px-1"
                  >
                    {moment(item.createdDate).format("DD-MM-YYYY")}
                  </Box>
                  lúc
                  <Box
                    component="span"
                    sx={{ color: grey[900], px: 1 }}
                    className="text-black text-sm font-josefin px-1"
                  >
                    {moment(item.createdDate).format("HH:mm")}
                  </Box>
                </Box>
              </Box>
              <Box className="product-rating">
                <Rating value={item.rating} readOnly></Rating>
              </Box>
              <Box className="product-review-content tw-py-4">
                <span className="tw-font-opensans">{item.comment}</span>
              </Box>
            </Box>
            <Divider
              sx={{ borderWidth: 1, height: 1, backgroundColor: grey[200] }}
            />
          </Box>
        ))}

        {/* <ButtonGroup
            aria-label="paging"
            className="m-1 flex w-full justify-end mt-4"
          >
            {comments.previous === null ? (
              <Button
                onClick={prevPage}
                variant="primary"
                className="hidden mx-4"
              >
                <i class="fa-solid fa-circle-arrow-left text-2xl text-bronze hover:text-heavy-red"></i>
              </Button>
            ) : (
              <Button onClick={prevPage} variant="primary" className="mx-4">
                <i class="fa-solid fa-circle-arrow-left text-2xl text-bronze hover:text-heavy-red"></i>
              </Button>
            )}

            {comments.next === null ? (
              <Button
                onClick={nextPage}
                variant="primary"
                className=" mx-4 hidden"
              >
                <i class="fa-solid fa-circle-arrow-right text-2xl text-bronze hover:text-heavy-red"></i>
              </Button>
            ) : (
              <Button onClick={nextPage} variant="primary" className="mx-4 ">
                <i class="fa-solid fa-circle-arrow-right text-2xl text-bronze hover:text-heavy-red"></i>
              </Button>
            )}
          </ButtonGroup> */}
      </Box>

      <ToastContainer></ToastContainer>
    </>
  );
};

export default Comment;
