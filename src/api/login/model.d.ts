declare namespace API {
  type LoginParams = {
    verifyCodeId: string;
    password: string;
    username: string;
    verifyCode: string;
  };
  type loginResult = {
    token: string;
  };
  type verifyCodeStyle = {
    width?: number;
    height?: number;
  };
  type verifyCodeResult = {
    img: string;
    id: string;
  };
}
