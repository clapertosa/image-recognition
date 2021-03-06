import asyncComponent from "../../hoc/asyncComponent/asyncComponent";

export { default as Home } from "./Home/Home";

const asyncLogin = asyncComponent(() => {
  return import("./Login/Login");
});
export { asyncLogin as Login };

const asyncSignup = asyncComponent(() => {
  return import("./Signup/Signup");
});
export { asyncSignup as Signup };

const asyncUser = asyncComponent(() => {
  return import("./User/User");
});
export { asyncUser as User };

const asyncLogout = asyncComponent(() => {
  return import("./Logout/Logout");
});
export { asyncLogout as Logout };

const asyncValidate = asyncComponent(() => {
  return import("./Signup/Validate");
});
export { asyncValidate as Validate };
