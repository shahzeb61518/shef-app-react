import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";

import TopNav from "../containers/navs/Topnav";
import Sidebar from "../containers/navs/Sidebar";
import Footer from "../containers/navs/Footer";

const AppLayout = ({ containerClassnames, children, history }) => {
  let user = reactLocalStorage.get("user");
  let token = reactLocalStorage.get("token");
  if (user && token) {
    return (
      <div id='app-container' className={containerClassnames}>
        <TopNav history={history} />
        <Sidebar />
        <main>
          <div className='container-fluid'>{children}</div>
        </main>
        <Footer />
      </div>
    );
  } else {
    return (
      <div>
        <TopNav history={history} />
        {/* <Sidebar /> */}
        <div>{children}</div>
        <Footer />
      </div>
    );
  }
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};
const mapActionToProps = {};

export default withRouter(
  connect(mapStateToProps, mapActionToProps)(AppLayout)
);
