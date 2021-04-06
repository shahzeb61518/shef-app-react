import React, { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import ThumbnailImage from "./../../../../components/cards/ThumbnailImage";
import Carousel from "./../../../../helpers/carousel/Carousel";

import AppLayout from "../../../../layout/AppLayout";
import VideoPlayer from "./../../../../components/common/VideoPlayer";

import {
  Row,
  Col,
  Card,
  CardBody,
  Input,
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
// import ReactSelect from "../../../../containers/forms/ReactSelectExample";
// import ReactSelect2 from "../../../../containers/forms/ReactSelectExample2";
import BlogList from "./../blog/blog-list-profile";
import ApiManager from "../../../../helpers/ApiManger";
import Chat from "./../../applications/chat";

import property from "./../img/goose-breast-thumb.jpg";
import chinese from "./../../../../helpers/carousel/images/chinese-food.jpg";
import indian from "./../../../../helpers/carousel/images/indian.jpg";
import turkish from "./../../../../helpers/carousel/images/turkish.jpg";
import pakistan from "./../../../../helpers/carousel/images/pakistan.jpg";

import howitworks1 from "./../img/howitworks1.png";
import howitworks2 from "./../img/howitworks2.png";
import howitworks3 from "./../img/howitworks3.png";

import gif1 from "./../img/gif1.gif";
import gif2 from "./../img/gif2.gif";
import gif3 from "./../img/gif3.gif";
import gif4 from "./../img/gif4.gif";
import gif5 from "./../img/gif5.gif";
import gif6 from "./../img/gif6.gif";

import owner from "./../img/tea-loaf.jpg";
import owner1 from "./../img/l-3.jpg";
import owner2 from "./../img/l-4.jpg";
import owner3 from "./../img/2.jpg";
import manager from "./../img/financier-thumb.jpg";
import supervisor from "./../img/fruitcake.jpg";
import reviewimg from "./../img/review.jpg";
import zipback from "./../img/zipback.jpg";
import "./style.css";

const products = productData.slice(0, 15);
const categories = [
  { label: "Cakes", value: "Cakes", key: 0 },
  { label: "Cupcakes", value: "Cupcakes", key: 1 },
  { label: "Desserts", value: "Desserts", key: 2 },
];

const Dashboard = ({ history }) => {
  const [activeTab, setActiveTab] = useState("details");
  const [modalOpen, setModalOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");
  const [image, setImage] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [location, setLocation] = useState("");
  const [creditCard, setCreditCard] = useState(false);
  const [emailVerify, setEmailVerify] = useState(false);

  const [usersData, setUsersData] = useState([]);

  const [read, setRead] = useState(Boolean);

  const [chatUsers, setChatUsers] = useState([]);

  const [modal, setModal] = useState(false);

  const [loadingUser, setloadingUser] = useState(true);

  const [searchByZipCode, setsearchByZipCode] = useState("");

  useEffect(() => {
    check();
    getUsers();
  }, []);

  const check = () => {
    // let user = reactLocalStorage.get('user_data');
    // user = JSON.parse(user);
    // console.log('user>>>>', user);
    // setUserId(user.userId);
    // setUserName(user.namef);
    // setUserImage(user.profileImage);
    // getUser(user.userId);
    // getFollowers(user.userId);
    // getFollowing(user.userId);
    // getAllUsers(user.userId);
    // getChatUsers(user.userId);
  };

  const getUsers = () => {
    new ApiManager().getAllUsers().then((result) => {
      if (result.no_result) {
        return;
      }
      if (result.data) {
        if (result.data.error) {
          alert(result.data.error);
          return;
        }
        if (result.data) {
          setUsersData(result.data.list);
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
            This is dummy text later on will be add real body text...
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={() => {
                setModal(false);
                // followAdd();
              }}
            >
              Subscribe
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </div>
    );
  };

  return (
    <>
      <AppLayout>
        {/* <AddNewModal
          modalOpen={modalOpen}
          toggleModal={() => setModalOpen(!modalOpen)}
          categories={categories}
          // getUser={getUser}
        /> */}

        {ModalExample()}
        <Carousel />
        <br />
        <br />
        <hr />
        <br />
        <br />
        <Row style={{ width: "100%" }}>
          <Col></Col>
          <Colxx xxs="10" style={{ textAlign: "center" }}>
            <div
              style={{
                textAlign: "center",
                width: "100%",
              }}
            >
              <h1 style={{ fontSize: "40px" }}>Welcome</h1>
              <br />

              <br />
              <br />
              <br />
              <Row>
                <Col></Col>
                <Col>
                  {/* <NavLink to='/turkish'> */}
                  <Card
                    style={{ height: "160px", cursor: "pointer" }}
                    className="mb-4"
                    onClick={() => {
                      // getChefs();
                      history.push("/chefs", {
                        zip: "",
                      });
                    }}
                  >
                    <SingleLightbox
                      height="80px"
                      thumb={chinese}
                      large={chinese}
                      className="card-img-top"
                    />
                    <CardBody>
                      <h6 className="text-muted  mb-2">All</h6>
                    </CardBody>
                  </Card>
                  {/* </NavLink> */}
                </Col>
                <Col>
                  {/* <NavLink to='/chinese'> */}
                  <Card
                    style={{ height: "160px", cursor: "pointer" }}
                    className="mb-4"
                    onClick={() => {
                      // handleSearchByZip("45000");
                      history.push("/chefs", {
                        zip: "45000",
                      });
                    }}
                  >
                    <SingleLightbox
                      height="80px"
                      opne={false}
                      thumb={indian}
                      large={indian}
                      className="card-img-top"
                    />
                    <CardBody>
                      <h6 className="text-muted  mb-2">Indian</h6>
                    </CardBody>
                  </Card>
                  {/* </NavLink> */}
                </Col>
                <Col>
                  {/* <NavLink to='/turkish'> */}
                  <Card
                    style={{ height: "160px", cursor: "pointer" }}
                    className="mb-4"
                    onClick={() => {
                      // handleSearchByZip("46000");
                      history.push("/chefs", {
                        zip: "46000",
                      });
                    }}
                  >
                    <SingleLightbox
                      height="80px"
                      opne={false}
                      thumb={turkish}
                      large={turkish}
                      className="card-img-top"
                    />
                    <CardBody>
                      <h6 className="text-muted  mb-2">Chinese</h6>
                    </CardBody>
                  </Card>
                  {/* </NavLink> */}
                </Col>
                <Col>
                  {/* <NavLink to='/chinese'> */}
                  <Card
                    style={{ height: "160px", cursor: "pointer" }}
                    className="mb-4"
                    onClick={() => {
                      // handleSearchByZip("47000");
                      history.push("/chefs", {
                        zip: "47000",
                      });
                    }}
                  >
                    <SingleLightbox
                      height="80px"
                      opne={false}
                      thumb={pakistan}
                      large={pakistan}
                      className="card-img-top"
                    />
                    <CardBody>
                      <h6 className="text-muted  mb-2">Caribbean</h6>
                    </CardBody>
                  </Card>
                  {/* </NavLink> */}
                </Col>
                <Col>
                  {/* <NavLink to='/chinese'> */}
                  <Card
                    style={{ height: "160px", cursor: "pointer" }}
                    className="mb-4"
                    onClick={() => {
                      // handleSearchByZip("49000");
                      history.push("/chefs", {
                        zip: "49000",
                      });
                    }}
                  >
                    <SingleLightbox
                      height="80px"
                      opne={false}
                      thumb={turkish}
                      large={turkish}
                      className="card-img-top"
                    />
                    <CardBody>
                      <h6 className="text-muted  mb-2">Italian</h6>
                    </CardBody>
                  </Card>
                  {/* </NavLink> */}
                </Col>
                <Col>
                  {/* <NavLink to='/chinese'> */}
                  <Card
                    style={{ height: "160px", cursor: "pointer" }}
                    className="mb-4"
                    onClick={() => {
                      // handleSearchByZip("48000");
                      history.push("/chefs", {
                        zip: "48000",
                      });
                    }}
                  >
                    <SingleLightbox
                      height="80px"
                      opne={false}
                      thumb={pakistan}
                      large={pakistan}
                      className="card-img-top"
                    />
                    <CardBody>
                      <h6 className="text-muted  mb-2">Japenese</h6>
                    </CardBody>
                  </Card>
                  {/* </NavLink> */}
                </Col>
                <Col></Col>
              </Row>

              {/* {Carousel()} */}
            </div>
            <TabPane tabId="categories">
              <br />
              <div style={{ textAlign: "left" }}>
                <h1>Recent Dishes</h1>
              </div>
              <Row style={{ width: "100%" }}>
                <Col>
                  {/* <NavLink to='/turkish'> */}
                  <Card style={{ height: "250px" }} className="mb-4">
                    <SingleLightbox
                      height="170px"
                      thumb={turkish}
                      large={turkish}
                      className="card-img-top"
                    />
                    <CardBody>
                      <h2 className="text-muted  mb-2">Pizza</h2>
                    </CardBody>
                  </Card>
                  {/* </NavLink> */}
                </Col>
                <Col>
                  {/* <NavLink to='/chinese'> */}
                  <Card style={{ height: "250px" }} className="mb-4">
                    <SingleLightbox
                      height="170px"
                      thumb={chinese}
                      large={chinese}
                      className="card-img-top"
                    />
                    <CardBody>
                      <h4 className="text-muted  mb-2">Macronies</h4>
                    </CardBody>
                  </Card>
                  {/* </NavLink> */}
                </Col>
                <Col>
                  {/* <NavLink to='/turkish'> */}
                  <Card style={{ height: "250px" }} className="mb-4">
                    <SingleLightbox
                      height="170px"
                      thumb={pakistan}
                      large={pakistan}
                      className="card-img-top"
                    />
                    <CardBody>
                      <h4 className="text-muted  mb-2">Chicken Malai</h4>
                    </CardBody>
                  </Card>
                  {/* </NavLink> */}
                </Col>
                <Col>
                  {/* <NavLink to='/chinese'> */}
                  <Card style={{ height: "250px" }} className="mb-4">
                    <SingleLightbox
                      height="170px"
                      thumb={indian}
                      large={indian}
                      className="card-img-top"
                    />
                    <CardBody>
                      <h4 className="text-muted  mb-2">Rajma Chawal</h4>
                    </CardBody>
                  </Card>
                  {/* </NavLink> */}
                </Col>
              </Row>
            </TabPane>
            <br />
            <hr />
            <br />
            <br />
            <br />
          </Colxx>

          <Col></Col>
        </Row>

        <Row
          style={{
            width: "100%",
            textAlign: "center",
            color: "white",
            backgroundImage: "url(" + zipback + ")",
            height: "500px",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            // background: "hsla(180,0%,50%,0.25)",
            boxShadow: "inset 0px 0px 277px 3px #4c3f37",
            // backgroundColor: "rgba(0,0,0,0.8)",
          }}
        >
          <Col sm={8}>
            <div
              style={{
                textAlign: "left",
                marginLeft: "100px",
                marginTop: "100px",
              }}
            >
              <h1 style={{ fontSize: "50px" }}>
                Traditional recipes.
                <br />
                Homemade.
                <br />
                Delivered.
              </h1>
              <h5>Explore who's cooking in your neighborhood.</h5>
            </div>

            <Row style={{ width: "100%" }}>
              <Col style={{ textAlign: "center" }}>
                <Input
                  style={{
                    marginLeft: "100px",
                    padding: "15px",
                    borderRadius: "30px",
                    paddingLeft: "30px",
                    fontSize: "15px",
                    marginTop: "50px",
                  }}
                  placeholder="Search by zip code..."
                  value={searchByZipCode}
                  onChange={(e) => {
                    setsearchByZipCode(e.target.value);
                  }}
                />
              </Col>
              <Col style={{ textAlign: "left" }}>
                <Button
                  color="primary"
                  style={{
                    width: "100px",
                    padding: "16px",
                    marginTop: "50px",
                  }}
                  onClick={() => {
                    if (searchByZipCode === "") {
                      return;
                    }
                    history.push("/chefs", { zip: searchByZipCode });
                  }}
                >
                  Search
                </Button>
              </Col>
            </Row>
          </Col>
          <Col sm={4}></Col>
        </Row>

        <br />
        <br />
        <br />
        <br />
        <hr />
        <br />
        <br />
        <Row style={{ width: "100%" }}>
          <Col></Col>
          <Colxx xxs="10" style={{ textAlign: "center" }}>
            <br />
            <br />

            <TabPane tabId="howitworks">
              <br />
              <div style={{ textAlign: "left" }}>
                <h1>How It Work</h1>
              </div>
              <Row style={{ width: "100%" }}>
                <Col>
                  <Card
                    className="mb-4"
                    style={{
                      padding: "30px",
                      height: "300px",
                      background: "#f7f7f7",
                    }}
                  >
                    <div
                      style={{
                        textAlign: "center",
                      }}
                    >
                      <img
                        style={{
                          height: "100px",
                          width: "150px",
                        }}
                        src={howitworks1}
                        alt="howitworks1"
                      />
                    </div>

                    <h2>EXPLORE</h2>
                    <CardBody>
                      <h4>
                        Sign up or login and then browse for your dish by
                        location, category, or YummyMakers
                      </h4>
                    </CardBody>
                  </Card>
                </Col>
                <Col>
                  <Card
                    className="mb-4"
                    style={{
                      padding: "30px",
                      height: "300px",
                      background: "#f7f7f7",
                    }}
                  >
                    <div
                      style={{
                        textAlign: "center",
                      }}
                    >
                      <img
                        style={{
                          height: "100px",
                          width: "110px",
                        }}
                        src={howitworks2}
                        alt="howitworks2"
                      />
                    </div>
                    <h2>ORDER & PAY</h2>
                    <CardBody>
                      <h4>Order your dish and pay</h4>
                    </CardBody>
                  </Card>
                </Col>
                <Col>
                  <Card
                    className="mb-4"
                    style={{
                      padding: "30px",
                      height: "300px",
                      background: "#f7f7f7",
                    }}
                  >
                    <div
                      style={{
                        textAlign: "center",
                      }}
                    >
                      <img
                        style={{
                          width: "110px",
                          height: "100px",
                        }}
                        src={howitworks3}
                        alt="howitworks3"
                      />
                    </div>
                    <h2>CONNECT</h2>
                    <CardBody>
                      <h4>
                        Get to know who’s cooking your meal. Meet chef for
                        curbside pickup.
                      </h4>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </TabPane>
            <br />
            <br />
            <hr />
            <br />
            <br />
            <TabPane tabId="categories">
              <br />
              <div style={{ textAlign: "left" }}>
                <h1>Different Dishes</h1>
              </div>

              <Row style={{ width: "100%" }}>
                <Col>
                  <div className="containerr">
                    <img
                      style={{
                        width: "400px",
                        minHeight: "400px",
                      }}
                      src={turkish}
                      alt="turkish"
                      className="card-img-top card-img-left card-img-right card-img-bottom image"
                    />
                    <div class="overlay">
                      <div class="text">
                        <h2 className="">Turkish</h2>
                        <p className="">
                          Pide are a firm favorite among Turks, with some of the
                          tastiest originating in the Black Sea region. Here
                          dough balls are stretched out into an elongated base
                          and loaded with a choice of fillings.
                        </p>
                        <br />
                        <Row style={{ width: "100%" }}>
                          <Col style={{ textAlign: "center" }}>
                            <Input
                              style={{
                                // marginLeft: "100px",
                                borderRadius: "30px",
                                // paddingLeft: "30px",
                                fontSize: "13px",
                                width: "180px",
                              }}
                              placeholder="Enter Zip code"
                              value={searchByZipCode}
                              onChange={(e) => {
                                setsearchByZipCode(e.target.value);
                              }}
                            />
                          </Col>
                          <Col style={{ textAlign: "left" }}>
                            <Button
                              size="sm"
                              color="primary"
                              style={{}}
                              onClick={() => {
                                if (searchByZipCode === "") {
                                  return;
                                }
                                history.push("/chefs", {
                                  zip: searchByZipCode,
                                });
                              }}
                            >
                              Search
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div className="containerr">
                    <img
                      style={{
                        width: "400px",
                        minHeight: "400px",
                      }}
                      src={chinese}
                      alt="chinese"
                      className="card-img-top card-img-left card-img-right card-img-bottom image"
                    />
                    <div class="overlay">
                      <div class="text">
                        <h2 className="">Chinese</h2>
                        <p className="">
                          Vegetable Chowmein | Chowmein Recipe: A Chinese
                          stir-fried noodle dish which is now a popular street
                          food dish across the globe, specifically in Asia.
                          Being a popular dish across countries.
                        </p>
                        <br />
                        <Row style={{ width: "100%" }}>
                          <Col style={{ textAlign: "center" }}>
                            <Input
                              style={{
                                // marginLeft: "100px",
                                borderRadius: "30px",
                                // paddingLeft: "30px",
                                fontSize: "13px",
                                width: "180px",
                              }}
                              placeholder="Enter Zip code"
                              value={searchByZipCode}
                              onChange={(e) => {
                                setsearchByZipCode(e.target.value);
                              }}
                            />
                          </Col>
                          <Col style={{ textAlign: "left" }}>
                            <Button
                              size="sm"
                              color="primary"
                              style={{}}
                              onClick={() => {
                                if (searchByZipCode === "") {
                                  return;
                                }
                                history.push("/chefs", {
                                  zip: searchByZipCode,
                                });
                              }}
                            >
                              Search
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <br />
              <br />
              <br />
              <Row style={{ width: "100%" }}>
                <Col>
                  <div className="containerr">
                    <img
                      style={{
                        width: "400px",
                        minHeight: "400px",
                      }}
                      src={pakistan}
                      alt="pakistani"
                      className="card-img-top card-img-left card-img-right card-img-bottom image"
                    />
                    <div class="overlay">
                      <div class="text">
                        <h2 className="">Pakistani</h2>
                        <p className="">
                          Chicken karahi is a poultry dish that is popular in
                          Pakistan and North India. The word karahi in its name
                          refers to a thick and deep cooking-pot similar to a
                          wok in which the dish is prepared.
                        </p>
                        <br />
                        <Row style={{ width: "100%" }}>
                          <Col style={{ textAlign: "center" }}>
                            <Input
                              style={{
                                // marginLeft: "100px",
                                borderRadius: "30px",
                                // paddingLeft: "30px",
                                fontSize: "13px",
                                width: "180px",
                              }}
                              placeholder="Enter Zip code"
                              value={searchByZipCode}
                              onChange={(e) => {
                                setsearchByZipCode(e.target.value);
                              }}
                            />
                          </Col>
                          <Col style={{ textAlign: "left" }}>
                            <Button
                              size="sm"
                              color="primary"
                              style={{}}
                              onClick={() => {
                                if (searchByZipCode === "") {
                                  return;
                                }
                                history.push("/chefs", {
                                  zip: searchByZipCode,
                                });
                              }}
                            >
                              Search
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div className="containerr">
                    <img
                      style={{
                        width: "400px",
                        minHeight: "400px",
                      }}
                      src={indian}
                      alt="indian"
                      className="card-img-top card-img-left card-img-right card-img-bottom image"
                    />
                    <div class="overlay">
                      <div class="text">
                        <h2 className="">Indian</h2>
                        <p className="">
                          Chicken tikka masala is a delicious grilled chicken
                          dish with a thick, creamy gravy that is unforgettable
                          after the first bite. A tomato-yogurt sauce is spiced
                          with chili, garlic, ginger, and garam masala, the
                          ubiquitous Indian spice blend.
                        </p>
                        <br />
                        <Row style={{ width: "100%" }}>
                          <Col style={{ textAlign: "center" }}>
                            <Input
                              style={{
                                // marginLeft: "100px",
                                borderRadius: "30px",
                                // paddingLeft: "30px",
                                fontSize: "13px",
                                width: "180px",
                              }}
                              placeholder="Enter Zip code"
                              value={searchByZipCode}
                              onChange={(e) => {
                                setsearchByZipCode(e.target.value);
                              }}
                            />
                          </Col>
                          <Col style={{ textAlign: "left" }}>
                            <Button
                              size="sm"
                              color="primary"
                              style={{}}
                              onClick={() => {
                                if (searchByZipCode === "") {
                                  return;
                                }
                                history.push("/chefs", {
                                  zip: searchByZipCode,
                                });
                              }}
                            >
                              Search
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </TabPane>

            <br />
            <br />
            <hr />
            <br />
            <br />
            <TabPane>
              <div style={{ textAlign: "left" }}>
                <h1>Why Tyr Chef?</h1>
              </div>
              <Row style={{ width: "100%" }}>
                <Col>
                  <Card
                    className="mb-4"
                    style={{ padding: "30px", height: "300px" }}
                  >
                    <br />
                    <br />
                    <h4>Supporting local Chef's</h4>
                    <CardBody>
                      <h4>
                        By ordering from YummyMaker you are supporting your
                        local chefs and always know exactly who is cooking your
                        food.
                      </h4>
                    </CardBody>
                  </Card>
                </Col>
                <Col>
                  <Card
                    className="mb-4"
                    style={{ padding: "30px", height: "300px" }}
                  >
                    <br />
                    <br />

                    <h4>Explore your Local food</h4>
                    <CardBody>
                      <h4>
                        Your neighborhood is diverse and so are your Chefs. Let
                        them take your palate on a culinary adventure
                      </h4>
                    </CardBody>
                  </Card>
                </Col>
                <Col>
                  <Card
                    className="mb-4"
                    style={{ padding: "30px", height: "300px" }}
                  >
                    <br />
                    <br />

                    <h4>Affordable dishes</h4>
                    <CardBody>
                      <h4>
                        Our Chefs always use fresh ingredients to create amazing
                        dishes at a very low price point.
                      </h4>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </TabPane>

            <br />
            <br />
            <hr />
            <br />
            <br />
            <TabPane tabId="ourchefs">
              <br />
              <br />
              <div>
                <h1>Our Chefs</h1>
              </div>
              <br />
              <br />

              <Row style={{ width: "100%" }}>
                {usersData.length > 0 ? (
                  usersData &&
                  usersData.map((item, i) => {
                    return (
                      <Col>
                        <div style={{ textAlign: "center" }}>
                          <img
                            style={{
                              width: "200px",
                              height: "200px",
                              borderRadius: "50%",
                            }}
                            alt="chef"
                            src={item.profileImage}
                            className="card-img-top"
                          />
                        </div>
                        <CardBody>
                          <h2 className="text-muted  mb-2">{item.userName}</h2>
                          <p className="text-muted mb-3">
                            {item.aboutMe ? item.aboutMe : "Chef"}{" "}
                          </p>
                        </CardBody>
                      </Col>
                    );
                  })
                ) : (
                  <div style={{ width: "100%", textAlign: "center" }}>
                    <h2 className="text-muted  mb-2">
                      No CHEF Available Yet...
                    </h2>
                  </div>
                )}
              </Row>

              <NavLink to="/chefs">
                <Button
                  color="primary"
                  style={{ width: "200px" }}
                  onClick={() => {}}
                >
                  Visit Our Chefs
                </Button>
              </NavLink>
            </TabPane>
{/* 
            <br />
            <br />
            <hr />
            <br />
            <br /> */}
            {/* <TabPane tabId="categories">
              <Row style={{ width: "100%" }}>
                <Col>
                  <Card className="mb-4">
                    <CardBody className="p-0">
                      <VideoPlayer
                        autoplay={false}
                        controls
                        controlBar={{
                          pictureInPictureToggle: false,
                        }}
                        className="video-js side-bar-video card-img-top"
                        poster="/assets/img/video/poster.jpg"
                        sources={[
                          {
                            src:
                              "http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4",
                            type: "video/mp4",
                          },
                        ]}
                      />
                    </CardBody>
                    <CardBody>
                      <p className="list-item-heading mb-4">Homemade Dishes</p>
                      <footer>
                        <p className="text-muted text-small mb-0 font-weight-light">
                          Learn and must try at home
                        </p>
                      </footer>
                    </CardBody>
                  </Card>
                </Col>
                <Col style={{ textAlign: "left" }}>
                  <h1>Food safety</h1>
                  <br />
                  <br />
                  <h5>
                    At Chef, we are committed to ensuring that your food will
                    always be safe to eat. All Chefs have undergone extensive
                    food safety training and are required to wear masks, gloves
                    and hairnets when preparing your food. In regions that have
                    not yet implemented home cooking laws, chefs are required to
                    cook out of commercial kitchens or other legally permissible
                    facilities.
                  </h5>
                </Col>
              </Row>
            </TabPane>
            <br />
            <br />
            <hr />
            <br />
            <br /> */}
          </Colxx>
          <Col></Col>
        </Row>

        <br />
        <br />
        <hr />
        <br />
        <br />

        <TabPane tabId="review">
          <div
            style={{
              textAlign: "center",
              color: "white",
              backgroundImage: "url(" + reviewimg + ")",
              height: "500px",
              width: "100%",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              // background: 'hsla(180,0%,50%,0.25)'
              boxShadow: "inset 0px 0px 277px 3px #4c3f37",
              // backgroundColor: "rgba(0,0,0,0.8)",
            }}
          >
            <br />
            <br />
            <br />
            <Row style={{ width: "100%" }}>
              <Col></Col>
              <Col
                style={{
                  textAlign: "center",
                }}
              >
                <h1>CUSTOMER REVIEWS</h1>
              </Col>
              <Col></Col>
            </Row>
            <br />
            <br />
            <br />
            <Row style={{ width: "100%" }}>
              <Col>
                <footer style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                  <p
                    style={{ color: "white" }}
                    className=" text-small mb-0 font-weight-light"
                  >
                    I am really picky about my food and any purchase. I am 200%
                    satisfied with Yummyamkers. Food was awesome. Quantity was
                    really good.
                  </p>
                </footer>
                <br />
                <p className="list-item-heading mb-4">Max</p>

                <img
                  style={{
                    width: "90px",
                    height: "90px",
                    borderRadius: "50%",
                  }}
                  alt="customer"
                  src={owner1}
                  className="card-img-top"
                />
              </Col>
              <Col>
                <footer style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                  <p
                    style={{ color: "white" }}
                    className=" text-small mb-0 font-weight-light"
                  >
                    Super traditional dumplings that remind me of my grandma's.
                  </p>
                </footer>
                <br />
                <p className="list-item-heading mb-4">Siara</p>

                <img
                  style={{
                    width: "90px",
                    height: "90px",
                    borderRadius: "50%",
                  }}
                  alt="customer"
                  src={owner2}
                  className="card-img-top"
                />
              </Col>
              <Col>
                <footer style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                  <p
                    style={{ color: "white" }}
                    className=" text-small mb-0 font-weight-light"
                  >
                    I just ate this a few minutes ago and it changed my life.
                    It's as good as going to your Pakistani aunty's house for
                    dinner.
                  </p>
                </footer>
                <br />

                <p className="list-item-heading mb-4">John</p>
                <img
                  style={{
                    width: "90px",
                    height: "90px",
                    borderRadius: "50%",
                  }}
                  alt="customer"
                  src={owner3}
                  className="card-img-top"
                />
              </Col>
            </Row>
          </div>
        </TabPane>
        <Row>
          <Col></Col>
          <Colxx xxs="10">
            <br />
            <br />
            <hr />
            <br />
            <br />
            <TabPane tabId="contact">
              <Row style={{ width: "100%" }}>
                <Col></Col>
                <Col></Col>
                <Col sm={3} style={{ textAlign: "left" }}>
                  <h1>CHEF</h1>
                  <br />
                  <br />
                  <h5> CHEF &#169; 2020</h5>
                  <br />
                  <br />
                  <br />
                </Col>
                <Col sm={3} style={{ textAlign: "left" }}>
                  <h1>About</h1>
                  <br />
                  <br />
                  <div style={{ textAlign: "left" }}>
                    <h5>
                      Traditional recipes.
                      <br />
                      Homemade.
                      <br />
                      Delivered. Explore who's cooking in your neighborhood.
                    </h5>
                  </div>
                  <br />
                  <br />
                  <br />
                </Col>

                <Col sm={3} style={{ textAlign: "left" }}>
                  <h1>Contact</h1>
                  <br />
                  <br />
                  <div className="social-icons" style={{ textAlign: "left" }}>
                    <ul className="list-unstyled list-inline">
                      <li className="list-inline-item">
                        <NavLink
                          to={userData.facebook ? userData.facebook : "#"}
                          location={{}}
                        >
                          <i className="simple-icon-social-facebook">
                            {" "}
                            Facebook
                          </i>
                        </NavLink>
                      </li>
                      <br />
                      <li className="list-inline-item">
                        <NavLink
                          to={userData.twitter ? userData.twitter : "#"}
                          location={{}}
                        >
                          <i className="simple-icon-social-twitter"> Twitter</i>
                        </NavLink>
                      </li>
                      <br />

                      <li className="list-inline-item">
                        <NavLink
                          to={userData.instagram ? userData.instagram : "#"}
                          location={{}}
                        >
                          <i className="simple-icon-social-instagram">
                            {" "}
                            Instagram
                          </i>
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                  <br />

                  <NavLink to="/contact-us" location={{}}>
                    <Button outline color="primary">
                      Contact Us
                    </Button>
                  </NavLink>

                  <br />
                  <br />
                </Col>
                <Col></Col>
              </Row>
              <div style={{ textAlign: "center" }}>
                <NavLink to="/privacy-policies">
                  <h6>Privacy Policy Terms of Service</h6>
                </NavLink>
              </div>
            </TabPane>
          </Colxx>
          <Col></Col>
        </Row>
      </AppLayout>
    </>
  );
};
export default withRouter(Dashboard);
