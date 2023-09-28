const OrderReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_ORDER_INFO":
      return {
        ...state,
        orderInfo: {
          ...state.orderInfo,
          ...action.payload,
        },
      };
    case "UPDATE_ORDER_DETAIL":
      // action.payload là một mảng chứa thông tin cập nhật cho các phần tử trong orderDetails
      const updatedOrderDetails = state.orderDetails.map((item, index) => {
        const updatedItem = action.payload[index]; // Lấy thông tin cập nhật tương ứng với phần tử này
        if (updatedItem) {
          return {
            ...item,
            ...updatedItem,
          };
        }
        return item; // Nếu không có thông tin cập nhật, giữ nguyên phần tử
      });
      return {
        ...state,
        orderDetails: updatedOrderDetails,
      };
    case "UPDATE_ORDER_PROMOTION":
      return {
        ...state,
        promotion: action.payload,
      };
    case "RESET_STATE":
      return action.payload
    default:
      return state;
  }
};

export default OrderReducer;
