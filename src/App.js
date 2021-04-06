import React, { Suspense } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";

import { IntlProvider } from "react-intl";
import AppLocale from "./lang";
import ColorSwitcher from "./components/common/ColorSwitcher";
import { NotificationContainer } from "./components/common/react-notifications";
import { isMultiColorActive, adminRoot } from "./constants/defaultValues";
import { getDirection } from "./helpers/Utils";

const ViewApp = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./views/app")
);

const Pages = React.lazy(() =>
  import(/* webpackChunkName: "pages" */ "./views/app/pages/product")
);

const Profile = React.lazy(() =>
  import(/* webpackChunkName: "pages" */ "./views/app/pages/profile")
);
const Dishes = React.lazy(() =>
  import(/* webpackChunkName: "pages" */ "./views/app/pages/blog")
);
const RegisterPost = React.lazy(() =>
  import(/* webpackChunkName: "pages" */ "./views/app/pages/blog/RegisterPost")
);
const PostDetail = React.lazy(() =>
  import(/* webpackChunkName: "pages" */ "./views/app/pages/blog/blog-detail")
);

const Checkout = React.lazy(() =>
  import(/* webpackChunkName: "pages" */ "./views/app/pages/blog/Checkout")
);

const Social = React.lazy(() =>
  import(/* webpackChunkName: "pages" */ "./views/app/pages/profile/social")
);
// const BlogDetail = React.lazy(() =>
//   import(/* webpackChunkName: "pages" */ './views/app/pages/blog/blog-detail')
// );
const Creator = React.lazy(() =>
  import(/* webpackChunkName: "pages" */ "./views/app/pages/profile/thumb-list")
);

const ViewError = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ "./views/error")
);

const ViewUser = React.lazy(() =>
  import(/* webpackChunkName: "views-user" */ "./views/user")
);

const Chat = React.lazy(() =>
  import(/* webpackChunkName: "views-user" */ "./views/app/applications/index")
);

const Login = React.lazy(() =>
  import(/* webpackChunkName: "user-login" */ "./views/user/login")
);
const Register = React.lazy(() =>
  import(/* webpackChunkName: "user-register" */ "./views/user/register")
);
const Dashboard = React.lazy(() =>
  import(
    /* webpackChunkName: "user-register" */ "./views/app/pages/dashboard/dashboard"
  )
);

const Books = React.lazy(() =>
  import(
    /* webpackChunkName: "user-register" */ "./views/app/pages/books/Books"
  )
);

const Chefs = React.lazy(() =>
  import(/* webpackChunkName: "user-register" */ "./views/app/pages/chef/Chefs")
);

const ChefDishes = React.lazy(() =>
  import(
    /* webpackChunkName: "user-register" */ "./views/app/pages/chef/ChefOrders"
  )
);

const Videos = React.lazy(() =>
  import(
    /* webpackChunkName: "user-register" */ "./views/app/pages/videos/Videos"
  )
);
const RegisterVideo = React.lazy(() =>
  import(
    /* webpackChunkName: "user-register" */ "./views/app/pages/videos/RegisterVideo"
  )
);
const VideoDetail = React.lazy(() =>
  import(
    /* webpackChunkName: "user-register" */ "./views/app/pages/videos/Detail"
  )
);

const ContactUs = React.lazy(() =>
  import(
    /* webpackChunkName: "user-register" */ "./views/app/pages/ContactUs"
  )
);

const Policies = React.lazy(() =>
  import(
    /* webpackChunkName: "user-register" */ "./views/app/pages/Policies"
  )
);

const Faq = React.lazy(() =>
  import(
    /* webpackChunkName: "user-register" */ "./views/app/pages/Faq"
  )
);

class App extends React.Component {
  constructor(props) {
    super(props);

    const direction = getDirection();
    if (direction.isRtl) {
      document.body.classList.add("rtl");
      document.body.classList.remove("ltr");
    } else {
      document.body.classList.add("ltr");
      document.body.classList.remove("rtl");
    }
  }

  render() {
    let user = reactLocalStorage.get("user");
    let token = reactLocalStorage.get("token");

    const { locale } = this.props;
    const currentAppLocale = AppLocale[locale];

    // if (user && token) {
    return (
      <div className="h-100">
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}
        >
          <>
            <NotificationContainer />
            {isMultiColorActive && <ColorSwitcher />}
            <Suspense fallback={<div className="loading" />}>
              <Router>
                <Switch>
                  {/* <Route
                      path='/'
                      exact={true}
                      render={(props) => <ViewApp {...props} />}
                    /> */}
                  <Route
                    path="/"
                    exact={true}
                    render={(props) => <Dashboard {...props} />}
                  />
                  <Route
                    path="/pages"
                    exact={true}
                    render={(props) => <Pages {...props} />}
                  />
                  <Route
                    path="/dashboard"
                    exact={true}
                    render={(props) => <Dashboard {...props} />}
                  />

                  <Route
                    path="/profile"
                    exact={true}
                    render={(props) => <Profile {...props} />}
                  />
                  <Route
                    path="/dishes"
                    exact={true}
                    render={(props) => <Dishes {...props} />}
                  />
                  <Route
                    path="/dish/register"
                    exact={true}
                    render={(props) => <RegisterPost {...props} />}
                  />
                  <Route
                    path="/dish/detail"
                    exact={true}
                    render={(props) => <PostDetail {...props} />}
                  />

                  <Route
                    path="/dish/checkout"
                    exact={true}
                    render={(props) => <Checkout {...props} />}
                  />

                  <Route
                    path="/blog/social"
                    exact={true}
                    render={(props) => <Social {...props} />}
                  />

                  <Route
                    path="/creator"
                    exact={true}
                    render={(props) => <Creator {...props} />}
                  />

                  <Route
                    path="/user"
                    render={(props) => <ViewUser {...props} />}
                  />

                  <Route
                    path="/profile/chat"
                    render={(props) => <Chat {...props} />}
                  />

                  <Route
                    path="/chefs"
                    render={(props) => <Chefs {...props} />}
                  />
                  <Route
                    path="/chef/dishes"
                    render={(props) => <ChefDishes {...props} />}
                  />

                  <Route
                    path="/books"
                    render={(props) => <Books {...props} />}
                  />

                  <Route
                    path="/videos"
                    render={(props) => <Videos {...props} />}
                  />

                  <Route
                    path="/video/register"
                    render={(props) => <RegisterVideo {...props} />}
                  />
                  <Route
                    path="/video/detail"
                    render={(props) => <VideoDetail {...props} />}
                  />

                  <Route
                    path="/error"
                    render={(props) => <ViewError {...props} />}
                  />

                  <Route
                    path="/contact-us"
                    render={(props) => <ContactUs {...props} />}
                  />
                  <Route
                    path="/privacy-policies"
                    render={(props) => <Policies {...props} />}
                  />
                  <Route
                    path="/faq"
                    render={(props) => <Faq {...props} />}
                  />
                  {/*
                    <Redirect exact from="/" to={adminRoot} />
                    */}
                  {/* <Redirect to="/error" /> */}
                </Switch>
              </Router>
            </Suspense>
          </>
        </IntlProvider>
      </div>
    );
    // } else {
    //   return (
    //     <div className='h-100'>
    //       <IntlProvider
    //         locale={currentAppLocale.locale}
    //         messages={currentAppLocale.messages}>
    //         <>
    //           <NotificationContainer />
    //           {isMultiColorActive && <ColorSwitcher />}
    //           <Suspense fallback={<div className='loading' />}>
    //             <Router>
    //               <Switch>
    //                 <Route
    //                   path='/user/login'
    //                   render={(props) => <Login {...props} />}
    //                 />

    //                 <Route
    //                   path='/user/register'
    //                   render={(props) => <Register {...props} />}
    //                 />

    //                 <Route
    //                   path='/user/verify'
    //                   render={(props) => <Verify {...props} />}
    //                 />
    //               </Switch>
    //             </Router>
    //           </Suspense>
    //         </>
    //       </IntlProvider>
    //     </div>
    //   );
    // }
  }
}

const mapStateToProps = ({ settings }) => {
  const { locale } = settings;
  return { locale };
};
const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(App);
