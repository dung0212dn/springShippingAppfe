const OrderListReducer = (state, action) => {
      switch (action.type) {
        case "SET_ORDER_LIST":
          return action.payload;
      
        default:
          return state;
      }
    };
    
    export default OrderListReducer;
    