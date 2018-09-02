import React from "react";
import logo from "../../../assets/images/logo.svg";

import styles from "./Logo.scss";

const Logo = () => {
  return (
    <div className={styles.logo}>
      <img src={logo} alt="Eye logo" />
    </div>
  );
};

export default Logo;

//<div>Icons made by <a href="https://www.flaticon.com/authors/ddara" title="dDara">dDara</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
