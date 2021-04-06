import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import TopNav from "../containers/navs/Topnav";
import Sidebar from "../containers/navs/Sidebar";
import Footer from "../containers/navs/Footer";

const AppLayout = ({ containerClassnames, children, history }) => {
  return (
    <div>
      <TopNav history={history} />
      {/* <Sidebar /> */}
      <div>{children}</div>
      <Footer />
    </div>
  );
};
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};
const mapActionToProps = {};

export default withRouter(
  connect(mapStateToProps, mapActionToProps)(AppLayout)
);
