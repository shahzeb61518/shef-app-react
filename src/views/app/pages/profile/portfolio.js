import React, { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import ThumbnailImage from "./../../../../components/cards/ThumbnailImage";
import Switch from "rc-switch";

import {
  Row,
  Col,
  Card,
  CardBody,
  Nav,
  NavItem,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  TabContent,
  Spinner,
  TabPane,
  Badge,
  CardTitle,
  CardSubtitle,
  CardText,
  CardImg,
} from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { NavLink, withRouter } from "react-router-dom";
import AddNewModal from "../../../../containers/pages/AddNewModal";
import classnames from "classnames";
import Breadcrumb from "../../../../containers/navs/Breadcrumb";
import { Colxx } from "../../../../components/common/CustomBootstrap";
import IntlMessages from "../../../../helpers/IntlMessages";
import SingleLightbox from "../../../../components/pages/SingleLightbox";
import recentPostsData from "../../../../data/recentposts";
import RecentPost from "../../../../components/common/RecentPost";
import productData from "../../../../data/products";
import UserCardBasic from "../../../../components/cards/UserCardBasic";
import friendsData from "../../../../data/follow";
import ReactSelect from "../../../../containers/forms/ReactSelectExample";
import ReactSelect2 from "../../../../containers/forms/ReactSelectExample2";
import BlogList from "./../blog/blog-list-profile";
import PlacedOrder from "./../blog/placedOrder";
import ApiManager from "../../../../helpers/ApiManger";
import Chat from "./../../applications/chat";
import moment from "moment";
import "./style.css";
// import img from "../../../../../public/assets/img/profiles/profile.png";

const products = productData.slice(0, 15);
const categories = [
  { label: "Cakes", value: "Cakes", key: 0 },
  { label: "Cupcakes", value: "Cupcakes", key: 1 },
  { label: "Desserts", value: "Desserts", key: 2 },
];

const ProfilePortfolio = (props) => {
  const [activeTab, setActiveTab] = useState("details");
  const [modalOpen, setModalOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [userId, setUserId] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");
  const [image, setImage] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [location, setLocation] = useState("");
  const [creditCard, setCreditCard] = useState(false);
  const [emailVerify, setEmailVerify] = useState(false);

  const [usersData, setUsersData] = useState([]);

  const [followerId, setFollowerId] = useState("");
  const [followerName, setFollowerName] = useState("");
  const [followerImage, setFollowerImage] = useState("");

  const [followingId, setFollowingId] = useState("");
  const [followingName, setFollowingName] = useState("");

  const [followersLength, setFollowersLength] = useState(Number);
  const [followingLength, setFollowingLength] = useState(Number);
  const [newFollowersLength, setNewFollowersLength] = useState(Number);
  const [alreadyFollowerArr, setAlreadyFollowerArr] = useState([]);

  const [followingData, setFollowingData] = useState([]);
  const [followersData, setFollowersData] = useState([]);
  const [newFollowersData, setNewFollowersData] = useState([]);

  const [read, setRead] = useState(Boolean);

  const [chatUsers, setChatUsers] = useState([]);

  const [modal, setModal] = useState(false);
  const [followModal, setFollowModal] = useState(false);

  const [loadingUser, setloadingUser] = useState(true);

  const [checkedSecondary, setCheckedSecondary] = useState(false);
  const [createdDate, setCreatedDate] = useState(new Date());

  useEffect(() => {
    check();
  }, []);

  const check = () => {
    let user = reactLocalStorage.get("user_data");

    if (user) {
      user = JSON.parse(user);
      if (user.role === "chef") {
        let check = reactLocalStorage.get("available");
        check = JSON.parse(check);
        setCheckedSecondary(check);
      }
      console.log("user>>>>", user);
      setUserId(user.userId);
      setUserRole(user.role);
      setUserName(user.namef);
      setUserImage(user.profileImage);
      getUser(user.userId);
    }

    // getChatUsers(user.userId);
  };

  const getUser = (id) => {
    new ApiManager().userById(id).then((result) => {
      if (result.no_result) {
        return;
      }
      if (result.data) {
        if (result.data.error) {
          alert(result.data.error);
          return;
        }
        if (result.data) {
          setUserData(result.data);
          let data = {
            namef: result.data.userName,
            role: result.data.userRole,
            userEmail: result.data.userEmail,
            userId: result.data._id,
            phone: result.data.phone,
            profileImage: result.data.profileImage,
            createdAt: result.data.created_at,
            paypalId: result.data.paypalId,
          };
          let user_data = JSON.stringify(data);
          reactLocalStorage.set("user_data", user_data);

          let created_Date = result.data.created_at;
          var a = moment(new Date()); //now
          var b = moment(created_Date);
          setCreatedDate(a.diff(b, "days"));
          // console.log(a.diff(b, "minutes")); // 44700
          // console.log(a.diff(b, "hours")); // 745
          // console.log(a.diff(b, "days")); // 31
          // console.log(a.diff(b, "weeks")); // 4
        }
        console.log("result user data>>>", result);
      }
    });
  };

  const ModalExample = (props) => {
    const toggle = () => setModal(!modal);
    return (
      <div>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Subscribe</ModalHeader>
          <ModalBody>
            Hi, Click ON Subscribe Button To Follow This Persone...
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={() => {
                setModal(false);
              }}
            >
              Subscribe
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </div>
    );
  };

  const changeAvailability = (secondary) => {
    new ApiManager().updateAvailabal(userId, secondary).then((result) => {
      if (result.no_result) {
        return;
      }
      if (result.data) {
        if (result.data.error) {
          alert(result.data.error);
          return;
        }
        if (result.data) {
          setCheckedSecondary(secondary);
          reactLocalStorage.set("available", secondary);

          // let user_data = JSON.stringify(data);
          // reactLocalStorage.set("user_data", user_data);
        }
        console.log("result user data>>>", result);
      }
    });
  };

  return (
    <>
      <AddNewModal
        modalOpen={modalOpen}
        toggleModal={() => setModalOpen(!modalOpen)}
        categories={categories}
        getUser={getUser}
      />

      {ModalExample()}
      <Row>
        <Colxx xxs="12">
          <div style={{ width: "100%" }}>
            <h1
              style={{
                float: "left",
              }}
            >
              {userData.userName}
            </h1>

            {userRole === "chef" ? (
              <div style={{ float: "right" }}>
                <label>
                  <IntlMessages id="Availabale" />
                </label>
                <Switch
                  className="custom-switch custom-switch-secondary"
                  checked={checkedSecondary}
                  onChange={(secondary) => changeAvailability(secondary)}
                />
              </div>
            ) : undefined}
          </div>
        </Colxx>
        <Colxx xxs="12">
          <div className="text-zero top-right-button-container">
            <UncontrolledDropdown>
              {/* <Button
                outline
                color="primary"
                onClick={() => setModalOpen(!modalOpen)}
              >
                primary
              </Button> */}
            </UncontrolledDropdown>
          </div>

          <Nav tabs className="separator-tabs ml-0 mb-5">
            {userRole === "chef" ? (
              <>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: activeTab === "details",
                      "nav-link": true,
                    })}
                    onClick={() => {
                      setActiveTab("details");
                    }}
                    location={{}}
                    to="#"
                  >
                    Profile
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: activeTab === "order",
                      "nav-link": true,
                    })}
                    onClick={() => {
                      setActiveTab("order");
                    }}
                    location={{}}
                    to="#"
                  >
                    Orders
                  </NavLink>
                </NavItem>
                <div
                  style={{
                    textAlign: "right",
                    marginTop: "10px",
                    width: "88%",
                  }}
                >
                  {createdDate >= 60 ? undefined : (
                    <div style={{}}>
                      <Badge
                        title="New till  to your first 60Days"
                        color="primary"
                      >
                        New{" "}
                      </Badge>
                      <h6>{createdDate} Days</h6>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <NavItem>
                <NavLink
                  className={classnames({
                    active: activeTab === "details",
                    "nav-link": true,
                  })}
                  onClick={() => {
                    setActiveTab("details");
                  }}
                  location={{}}
                  to="#"
                >
                  Profile
                </NavLink>
              </NavItem>
            )}

            {/* {userRole && userRole === "creator" ? (
              <NavItem>
                <NavLink
                  className={classnames({
                    active: activeTab === "followers",
                    "nav-link": true,
                  })}
                  onClick={() => {
                    setActiveTab("followers");
                  }}
                  location={{}}
                  to='#'>
                  Followers
                  <Badge color='outline-secondary mb-1 mr-1' pill>
                    {followersLength}
                  </Badge>
                </NavLink>
              </NavItem>
            ) : (
              <NavItem>
                <NavLink
                  className={classnames({
                    active: activeTab === "following",
                    "nav-link": true,
                  })}
                  onClick={() => {
                    setActiveTab("following");
                  }}
                  location={{}}
                  to='#'>
                  Following
                  <Badge color='outline-secondary mb-1 mr-1' pill>
                    {followingLength}
                  </Badge>
                </NavLink>
              </NavItem>
            )} */}

            {/* <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === "newfollowers",
                  "nav-link": true,
                })}
                onClick={() => {
                  setActiveTab("newfollowers");
                }}
                location={{}}
                to='#'>
                New Followers
                <Badge color='outline-secondary mb-1 mr-1' pill>
                  {newFollowersLength}
                </Badge>
              </NavLink>
            </NavItem> */}
          </Nav>

          <TabContent activeTab={activeTab}>
            <TabPane tabId="details">
              <Row>
                <Colxx xxs="12" lg="4" className="mb-4 col-left">
                  <Card className="mb-4">
                    <div className="position-absolute card-top-buttons">
                      <Button
                        outline
                        color="primary"
                        className="icon-button"
                        onClick={() => setModalOpen(!modalOpen)}
                      >
                        <i className="simple-icon-pencil" />
                      </Button>
                    </div>
                    <SingleLightbox
                      thumb={
                        userData.profileImage
                          ? userData.profileImage
                          : "/assets/img/profiles/profile.png"
                      }
                      large={
                        userData.profileImage
                          ? userData.profileImage
                          : "/assets/img/profiles/prfoile.png"
                      }
                      className="card-img-top"
                    />

                    <CardBody>
                      <p className="text-muted text-small mb-2">About</p>
                      <p className="mb-3">
                        {userData.aboutMe ? userData.aboutMe : undefined}{" "}
                      </p>
                      <p className="text-muted text-small mb-2">Phone</p>
                      <p className="mb-3">
                        {userData.phone ? userData.phone : undefined}{" "}
                      </p>
                      {/* {userRole === "chef" ? ( */}
                      {/* <> */}
                      <p className="text-muted text-small mb-2">Paypal Id</p>
                      <p className="mb-3">
                        {userData.paypalId
                          ? userData.paypalId
                          : "Not Added Yet..."}{" "}
                      </p>
                      {/* </> */}
                      {/* ) : undefined} */}

                      <p className="text-muted text-small mb-2">Location</p>
                      <p className="mb-3">
                        {userData.location ? userData.location : undefined}
                      </p>

                      <br />
                      {/* <p className='text-muted text-small mb-2'>Credit Card</p>
                      <p className='mb-3'>
                        {userData.creditCard
                          ? "Credit Card Verified"
                          : "Credit Card not verified yet"}
                      </p> */}
                      <p className="text-muted text-small mb-2">Email</p>
                      <p className="mb-3">{userData.userEmail}</p>
                      <br />
                      <p className="text-muted text-small mb-2">Contacts</p>
                      <div className="social-icons">
                        <ul className="list-unstyled list-inline">
                          <li className="list-inline-item">
                            <NavLink
                              to={userData.facebook ? userData.facebook : "#"}
                              location={{}}
                            >
                              <i className="simple-icon-social-facebook" />
                            </NavLink>
                          </li>
                          <li className="list-inline-item">
                            <NavLink
                              to={userData.twitter ? userData.twitter : "#"}
                              location={{}}
                            >
                              <i className="simple-icon-social-twitter" />
                            </NavLink>
                          </li>
                          <li className="list-inline-item">
                            <NavLink
                              to={userData.instagram ? userData.instagram : "#"}
                              location={{}}
                            >
                              <i className="simple-icon-social-instagram" />
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </CardBody>
                  </Card>
                </Colxx>

                <Colxx xxs="12" lg="8" className="mb-4 col-right">
                  <Card>
                    <CardBody>
                      <BlogList userId={userId} />
                    </CardBody>
                  </Card>
                </Colxx>
              </Row>
            </TabPane>
          </TabContent>

          <TabContent activeTab={activeTab}>
            <TabPane tabId="order">
              <Row>
                <Colxx xxs="12" lg="12" className="mb-4">
                  <Card>
                    <CardBody>
                      <PlacedOrder userId={userId} />
                    </CardBody>
                  </Card>
                </Colxx>
              </Row>
            </TabPane>
          </TabContent>
        </Colxx>
      </Row>
    </>
  );
};
export default withRouter(ProfilePortfolio);
