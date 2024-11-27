export interface ILoginReqBody {
  email: string;
  password: string;
}

export interface ILoginResBody {
  token: string;
  role: string;
}
function loginResponsePromise(
  loginReqData: ILoginReqBody
): Promise<ILoginResBody> {
  return new Promise((resolve, reject) => {
    if (loginReqData.email === "wee" && loginReqData.password === "123") {
      resolve({
        token: "auth_token",
        role: "annotator",
      });
    } else {
      console.log("permission error");
      reject("login error");
    }
  });
}

export default loginResponsePromise;
