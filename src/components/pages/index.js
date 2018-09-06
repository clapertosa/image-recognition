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
