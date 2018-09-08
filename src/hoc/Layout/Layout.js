import React, { Component } from "react";
import {
  Logo,
  NavBar,
  DrawerToggle,
  SideDrawer,
  Backdrop
} from "../../components";
import { connect } from "react-redux";

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
          <Logo />
          <NavBar isAuthenticated={this.props.isAuthenticated} />
          <DrawerToggle
            drawerToggleClicked={this.showSideDrawerToggleHandler}
          />
          <SideDrawer showSideDrawer={this.state.showSideDrawer} />
        </header>
        <Backdrop
          showBackdrop={this.state.showSideDrawer}
          backdropClicked={this.sideDrawerCloseHandler}
        />
        <main className={styles["main-content"]}>{this.props.children}</main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps)(Layout);
