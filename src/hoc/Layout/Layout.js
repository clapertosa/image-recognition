import React, { Component } from "react";
import {
  Logo,
  NavBar,
  DrawerToggle,
  SideDrawer,
  Backdrop
} from "../../components";

import styles from "./Layout.scss";

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  showSideDrawerToggleHandler = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <React.Fragment>
        <header className={styles.header}>
          <Logo closeSideDrawer={this.sideDrawerCloseHandler} />
          <NavBar isAuthenticated={this.props.isAuthenticated} />
          <DrawerToggle
            drawerToggleClicked={this.showSideDrawerToggleHandler}
          />
          <SideDrawer
            closeSideDrawer={this.sideDrawerCloseHandler}
            showSideDrawer={this.state.showSideDrawer}
          />
        </header>
        <Backdrop
          showBackdrop={this.state.showSideDrawer}
          closeSideDrawer={this.sideDrawerCloseHandler}
        />
        <main className={styles["main-content"]}>{this.props.children}</main>
      </React.Fragment>
    );
  }
}

export default Layout;
