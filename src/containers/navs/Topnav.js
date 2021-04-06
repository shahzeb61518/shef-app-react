/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from "react";
import { injectIntl } from "react-intl";
import { reactLocalStorage } from "reactjs-localstorage";

import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Input,
  Badge,
} from "reactstrap";

import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import IntlMessages from "../../helpers/IntlMessages";
import {
  setContainerClassnames,
  clickOnMobileMenu,
  logoutUser,
  changeLocale,
} from "../../redux/actions";

import {
  menuHiddenBreakpoint,
  searchPath,
  localeOptions,
  isDarkSwitchActive,
  buyUrl,
  adminRoot,
} from "../../constants/defaultValues";

import { MobileMenuIcon, MenuIcon } from "../../components/svg";
import TopnavEasyAccess from "./Topnav.EasyAccess";
import TopnavNotifications from "./Topnav.Notifications";
import TopnavDarkSwitch from "./Topnav.DarkSwitch";

import { getDirection, setDirection } from "../../helpers/Utils";

const TopNav = ({
  intl,
  history,
  containerClassnames,
  menuClickCount,
  selectedMenuHasSubItems,
  locale,
  setContainerClassnamesAction,
  clickOnMobileMenuAction,
  logoutUserAction,
  changeLocaleAction,
}) => {
  const [isInFullScreen, setIsInFullScreen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");
  const [token, setToken] = useState("");

  const [carItems, setCartItems] = useState(0);

  useEffect(() => {
    check();
  }, []);

  const check = () => {
    let user = reactLocalStorage.get("user_data");
    let token = reactLocalStorage.get("token");

    let arr = reactLocalStorage.get("cart_data");
    if (arr) {
      arr = JSON.parse(arr);
      setCartItems(arr.length);
    } else {
      setCartItems(0);
    }

    if (user) {
      if (token) {
        setToken(token);
      }
      user = JSON.parse(user);
      console.log("user>>>>", user);
      // setUserId(user.userId);
      setUserName(user.namef);
      setUserImage(user.profileImage);
    }
  };

  const search = () => {
    history.push(`${searchPath}?key=${searchKeyword}`);
    setSearchKeyword("");
  };

  const handleChangeLocale = (_locale, direction) => {
    changeLocaleAction(_locale);

    const currentDirection = getDirection().direction;
    if (direction !== currentDirection) {
      setDirection(direction);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  const isInFullScreenFn = () => {
    return (
      (document.fullscreenElement && document.fullscreenElement !== null) ||
      (document.webkitFullscreenElement &&
        document.webkitFullscreenElement !== null) ||
      (document.mozFullScreenElement &&
        document.mozFullScreenElement !== null) ||
      (document.msFullscreenElement && document.msFullscreenElement !== null)
    );
  };

  const handleSearchIconClick = (e) => {
    if (window.innerWidth < menuHiddenBreakpoint) {
      let elem = e.target;
      if (!e.target.classList.contains("search")) {
        if (e.target.parentElement.classList.contains("search")) {
          elem = e.target.parentElement;
        } else if (
          e.target.parentElement.parentElement.classList.contains("search")
        ) {
          elem = e.target.parentElement.parentElement;
        }
      }

      if (elem.classList.contains("mobile-view")) {
        search();
        elem.classList.remove("mobile-view");
        removeEventsSearch();
      } else {
        elem.classList.add("mobile-view");
        addEventsSearch();
      }
    } else {
      search();
    }
    e.stopPropagation();
  };

  const handleDocumentClickSearch = (e) => {
    let isSearchClick = false;
    if (
      e.target &&
      e.target.classList &&
      (e.target.classList.contains("navbar") ||
        e.target.classList.contains("simple-icon-magnifier"))
    ) {
      isSearchClick = true;
      if (e.target.classList.contains("simple-icon-magnifier")) {
        search();
      }
    } else if (
      e.target.parentElement &&
      e.target.parentElement.classList &&
      e.target.parentElement.classList.contains("search")
    ) {
      isSearchClick = true;
    }

    if (!isSearchClick) {
      const input = document.querySelector(".mobile-view");
      if (input && input.classList) input.classList.remove("mobile-view");
      removeEventsSearch();
      setSearchKeyword("");
    }
  };

  const removeEventsSearch = () => {
    document.removeEventListener("click", handleDocumentClickSearch, true);
  };

  const addEventsSearch = () => {
    document.addEventListener("click", handleDocumentClickSearch, true);
  };

  const handleSearchInputKeyPress = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  const toggleFullScreen = () => {
    const isFS = isInFullScreenFn();

    const docElm = document.documentElement;
    if (!isFS) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    setIsInFullScreen(!isFS);
  };

  const handleLogout = () => {
    reactLocalStorage.remove("user");
    reactLocalStorage.remove("user_data");
    reactLocalStorage.remove("token");
    reactLocalStorage.remove("cart_data");
    let url = window.location.href;
    // alert(url);
    if (url === "http://localhost:3000/dashboard") {
      return history.push("/user/login");
    } else {
      return history.push("/user/login");
    }

    // if (url === "http://localhost:3000/dashboard") {
    //   return history.push("/user/login");
    // } else {
    //   return history.push("/dashboard");
    // }
  };

  const menuButtonClick = (e, _clickCount, _conClassnames) => {
    e.preventDefault();

    setTimeout(() => {
      const event = document.createEvent("HTMLEvents");
      event.initEvent("resize", false, false);
      window.dispatchEvent(event);
    }, 350);
    setContainerClassnamesAction(
      _clickCount + 1,
      _conClassnames,
      selectedMenuHasSubItems
    );
  };

  const mobileMenuButtonClick = (e, _containerClassnames) => {
    e.preventDefault();
    clickOnMobileMenuAction(_containerClassnames);
  };

  const { messages } = intl;
  return (
    <nav className='navbar fixed-top'>
      <div className='d-flex align-items-center navbar-left'>
        <NavLink
          to='#'
          location={{}}
          className='menu-button d-none d-md-block'
          onClick={(e) =>
            menuButtonClick(e, menuClickCount, containerClassnames)
          }>
          <MenuIcon />
        </NavLink>

        <NavLink
          to='#'
          location={{}}
          className='menu-button-mobile d-xs-block d-sm-block d-md-none'
          onClick={(e) => mobileMenuButtonClick(e, containerClassnames)}>
          <MobileMenuIcon />
        </NavLink>

        {/* <div className='search'>
          <Input
            name='searchKeyword'
            id='searchKeyword'
            placeholder={messages["menu.search"]}
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyPress={(e) => handleSearchInputKeyPress(e)}
          />
          <span
            className='search-icon'
            onClick={(e) => handleSearchIconClick(e)}>
            <i className='simple-icon-magnifier' />
          </span>
        </div> */}

        {/* <div className="d-inline-block">
          <UncontrolledDropdown className="ml-2">
            <DropdownToggle
              caret
              color="light"
              size="sm"
              className="language-button"
            >
              <span className="name">{locale.toUpperCase()}</span>
            </DropdownToggle>
            <DropdownMenu className="mt-3" right>
              {localeOptions.map((l) => {
                return (
                  <DropdownItem
                    onClick={() => handleChangeLocale(l.id, l.direction)}
                    key={l.id}
                  >
                    {l.name}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div> */}
        {/* <div className="position-relative d-none d-none d-lg-inline-block">
          <a
            className="btn btn-outline-primary btn-sm ml-2"
            target="_top"
            href={buyUrl}
          >
            <IntlMessages id="user.buy" />
          </a>
        </div> */}
      </div>
      <NavLink className='navbar-logo' to={adminRoot}>
        <span className='logo d-none d-xs-block' />
        <span className='logo-mobile d-block d-xs-none' />
      </NavLink>

      <div className='navbar-right'>
        {isDarkSwitchActive && <TopnavDarkSwitch />}
        <div className='header-icons d-inline-block align-middle'>
          {/* <TopnavEasyAccess />
          <TopnavNotifications /> */}
          <button
            className='header-icon btn btn-empty d-none d-sm-inline-block'
            type='button'
            id='fullScreenButton'
            onClick={toggleFullScreen}>
            {isInFullScreen ? (
              <i className='simple-icon-size-actual d-block' />
            ) : (
              <i className='simple-icon-size-fullscreen d-block' />
            )}
          </button>
        </div>
        <div className='user d-inline-block'>
          {!token ? (
            <>
              <button
                className='header-icon btn btn-empty d-none d-sm-inline-block'
                type='button'
                onClick={() => {
                  history.push("/dashboard");
                }}>
                Dashboard
              </button>
              <button
                style={{ color: "green" }}
                className='header-icon btn btn-empty d-none d-sm-inline-block'
                type='button'
                onClick={() => {
                  history.push("/user/register");
                }}>
                Become a CHEF!
              </button>

              <button
                className='header-icon btn btn-empty d-none d-sm-inline-block'
                type='button'
                onClick={() => {
                  history.push("/user/register");
                }}>
                SignUp
              </button>

              <button
                className='header-icon btn btn-empty d-none d-sm-inline-block'
                type='button'
                onClick={() => {
                  history.push("/user/login");
                }}>
                Login
              </button>
            </>
          ) : (
            <>
              <button
                className='header-icon btn  d-sm-inline-block'
                onClick={() => {
                  history.push("/dish/checkout");
                }}>
                <i
                  style={{ fontSize: "20px" }}
                  className='iconsminds-shopping-cart'
                />
                <Badge className='count'>{carItems}</Badge>
              </button>

              <button
                className='header-icon btn btn-empty d-none d-sm-inline-block'
                type='button'
                onClick={() => {
                  handleLogout();
                }}>
                Logout
              </button>
            </>
          )}

          {/* 
          <UncontrolledDropdown className='dropdown-menu-right'>
            <DropdownToggle className='p-0' color='empty'>
              <span className='name mr-1'>{userName}</span>
              <span>
                <img
                  alt='Profile'
                  src={
                    userImage ? userImage : "/assets/img/profiles/profile.png"
                  }
                />
              </span>
            </DropdownToggle>
            <DropdownMenu className='mt-3' right>
              <DropdownItem>Account</DropdownItem>
              <DropdownItem onClick={() => history.push("/profile")}>
                Profile
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={() => handleLogout()}>
                Sign out
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
       */}
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = ({ menu, settings }) => {
  const { containerClassnames, menuClickCount, selectedMenuHasSubItems } = menu;
  const { locale } = settings;
  return {
    containerClassnames,
    menuClickCount,
    selectedMenuHasSubItems,
    locale,
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    setContainerClassnamesAction: setContainerClassnames,
    clickOnMobileMenuAction: clickOnMobileMenu,
    changeLocaleAction: changeLocale,
  })(TopNav)
);
