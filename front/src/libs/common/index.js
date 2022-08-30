// 정규식으로 변경하기!!
// 핸드폰 번호 규격에 맞는 값인지 확인.
export const checkPhoneNumber = (phone) => {
  if (phone !== "") {
    const isNumber = phone
      .split("-")
      .every((num) => String(Number(num)) !== "NaN");
    if (!isNumber) {
      return {
        status: false,
        message: "핸드폰 번호는 숫자만 입력할 수 있습니다.",
      };
    }
    if (phone.length !== 0 && phone.length !== 13) {
      return { status: false, message: "핸드폰 번호를 전부 입력해주세요." };
    }
    return { status: true, message: "올바른 핸드폰 번호 입니다." };
  } else {
    return { status: true, message: "핸드폰 번호가 입력되지 않았습니다." };
  }
};
