const isValidPhoneNumber = (phoneNumber) => {
  // Sử dụng biểu thức chính quy để kiểm tra
  const phonePattern = /^[0-9]{10}$/; // Số điện thoại có 10 chữ số

  return phonePattern.test(phoneNumber);
}


const isValidEmail = (email) => {
  // Sử dụng biểu thức chính quy để kiểm tra
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailPattern.test(email);
}



export {isValidPhoneNumber, isValidEmail}