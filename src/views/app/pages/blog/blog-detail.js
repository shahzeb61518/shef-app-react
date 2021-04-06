import React, { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import moment from "moment";
import VideoPlayer from "./../../../../components/common/VideoPlayer";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import {
  Row,
  Card,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  Spinner,
  CardBody,
  Button,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  TabContent,
  TabPane,
  Badge,
  CardTitle,
} from "reactstrap";
import { NavLink, withRouter } from "react-router-dom";
import classnames from "classnames";
import GalleryDetail from "../../../../containers/pages/GalleryDetail";
import GalleryProfile from "../../../../containers/pages/GalleryProfile";
import Breadcrumb from "../../../../containers/navs/Breadcrumb";
import { Colxx } from "../../../../components/common/CustomBootstrap";
import IntlMessages from "../../../../helpers/IntlMessages";
import SingleLightbox from "../../../../components/pages/SingleLightbox";
import whotoFollowData from "../../../../data/follow";
import UserFollow from "../../../../components/common/UserFollow";
import UserCardBasic from "../../../../components/cards/UserCardBasic";
import recentPostsData from "../../../../data/recentposts";
import RecentPost from "../../../../components/common/RecentPost";

import CommentWithLikes from "../../../../components/pages/CommentWithLikes";

import AppLayout from "../../../../layout/AppLayout";

import posts from "../../../../data/posts";
import Post from "../../../../components/cards/Post";
import ApiManager from "../../../../helpers/ApiManger";

import GlideComponentThumbs from "../../../../components/carousel/GlideComponentThumbs";
import { UserRole } from "../../../../helpers/authHelper";
// import { detailImages, detailThumbs } from "../../../../data/carouselItems";

const friendsData = whotoFollowData.slice();
const followData = whotoFollowData.slice(0, 5);

const ProfileSocial = ({ location, history }) => {
  let imagesArr = [];
  const [activeTab, setActiveTab] = useState("profile");
  const [activeTab2, setActiveTab2] = useState("details");

  const [postData, setPostData] = useState({});
  const [postId, setPostId] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [comment, setComment] = useState("");
  const [commentsArr, setCommentsArr] = useState([]);
  const [loader, setLoader] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [detailImages, setdetailImages] = useState([]);
  const [detailThumbs, setdetailThumbs] = useState([]);

  const [modal, setModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalDiscount, setModalDiscount] = useState(false);

  const [role, setRole] = useState("");

  const [chefModal, setChefModal] = useState(false);
  const [chefAvailable, setChefAvailable] = useState(false);
  const [discount, setDiscount] = useState(Number);
  const [modalText, setModalText] = useState(
    " Hi, you want to order this dish, add to cart and then checkout to confirm."
  );

  useEffect(() => {
    check();
  }, []);

  const check = () => {
    let user = reactLocalStorage.get("user_data");
    if (user) {
      user = JSON.parse(user);
      console.log("user>>>>", user);
      setUserId(user.userId);
      setUserName(user.namef);
      setRole(user.role);
    }
    // console.log("propspropspropsprops>>>>", props);

    if (location.state) {
      if (location.state.postData) {
        setPostData(location.state.postData);

        if (location.state.postData.userId) {
          if (location.state.postData.userId) {
            setChefAvailable(location.state.postData.userId.available);
            console.log("location.state.postData>>>>", location.state.postData);
          }
        }

        let img = location.state.postData.image;
        let img1 = location.state.postData.image1;
        let img2 = location.state.postData.image2;
        let img3 = location.state.postData.image3;
        let img4 = location.state.postData.image4;

        if (img && img1 && img2 && img3 && img4) {
          let images = [
            {
              id: "1",
              img: img,
            },
            {
              id: "2",
              img: img1,
            },
            {
              id: "3",
              img: img2,
            },
            {
              id: "4",
              img: img3,
            },
            {
              id: "5",
              img: img4,
            },
          ];
          let thumbs = [
            {
              id: "1",
              img: img,
            },
            {
              id: "2",
              img: img1,
            },
            {
              id: "3",
              img: img2,
            },
            {
              id: "4",
              img: img3,
            },
            {
              id: "5",
              img: img4,
            },
          ];

          setdetailThumbs(images);
          setdetailImages(images);
        }

        console.log("detailthumbs", detailThumbs);
        console.log("detailImages", detailImages);

        setPostId(location.state.postData._id);
        getComments(location.state.postData._id);
      }
    }
  };

  const getComments = async (id) => {
    await new ApiManager().getCommentsByPostId(id).then((result) => {
      if (result.no_result) {
        return;
      }
      if (result.data) {
        if (result.data.error) {
          alert(result.data.error);
          return;
        }

        if (result.data) {
          setCommentsArr(result.data.list);
          setIsLoading(false);
          setLoader(false);
          console.log("result after adding>>>", result);
        }
      }
    });
  };

  const registerComment = () => {
    setLoader(true);
    new ApiManager()
      .registerComment(comment, postData._id, userId, userName)
      .then((result) => {
        if (result.no_result) {
          return;
        }
        if (result.data) {
          if (result.data.error) {
            alert(result.data.error);
            return;
          }

          if (result.data) {
            getComments(postId);
            console.log("result after adding>>>", result);
          }
        }
      });
  };

  const deleteDish = () => {
    setLoader(true);
    new ApiManager().deleteDish(postData._id).then((result) => {
      if (result.no_result) {
        return;
      }
      if (result.data) {
        if (result.data.error) {
          alert(result.data.error);
          return;
        }

        if (result.data) {
          setModalDelete(false);
          history.push("/dishes");
          console.log("result after adding>>>", result);
        }
      }
    });
  };

  const addToCart = () => {
    console.log("objectData", postData);
    let arr = reactLocalStorage.get("cart_data");

    if (arr) {
      let sameChef = true;
      arr = JSON.parse(arr);

      arr.forEach((ele) => {
        if (ele.userId._id !== postData.userId._id) {
          return (sameChef = false);
        }
      });

      if (sameChef) {
        postData.quantity = 1;
        arr.push(postData);
        let array = JSON.stringify(arr);
        reactLocalStorage.set("cart_data", array);
        history.push("/dish/checkout");
      } else {
        return setModalText(
          "Please Place First Chef Order And Then Add New One..."
        );
      }
    } else {
      let arr = [];
      postData.quantity = 1;
      arr.push(postData);
      let array = JSON.stringify(arr);
      reactLocalStorage.set("cart_data", array);
      history.push("/dish/checkout");
    }
    setModal(false);
  };

  const ModalDelete = (props) => {
    const toggle = () => setModalDelete(!modalDelete);
    return (
      <div>
        <Modal isOpen={modalDelete} toggle={toggle}>
          <ModalHeader toggle={toggle}>Confirmation</ModalHeader>
          <ModalBody>
            <h4>Are you sure you want to delete this?</h4>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggle}>
              No
            </Button>
            <Button
              color="primary"
              onClick={() => {
                deleteDish();
              }}
            >
              Yes
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </div>
    );
  };

  const ModalDiscount = (props) => {
    const toggle = () => setModalDiscount(!modalDiscount);
    return (
      <div>
        <Modal isOpen={modalDiscount} toggle={toggle}>
          <ModalHeader toggle={toggle}>Offer Discount</ModalHeader>
          <ModalBody>
            <h4>Offer Discount in %</h4>
            <Input
              placeholder="Enter Discount in %..."
              value={discount}
              type="number"
              onChange={(e) => {
                let a = e.target.value;
                if (a <= 100 && a >= 1) {
                  return setDiscount(e.target.value);
                } else {
                  return (a = 1);
                }
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={() => {
                offerDiscount();
              }}
            >
              Offer
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </div>
    );
  };

  const offerDiscount = () => {
    let price = postData.price;
    var r = parseFloat(discount) / 100.0;
    let salePrice = price - r * price;

    new ApiManager().offerDiscount(postData._id, salePrice).then((result) => {
      if (result.no_result) {
        return;
      }
      if (result.data) {
        if (result.data.error) {
          alert(result.data.error);
          return;
        }

        if (result.data) {
          setModalDiscount(false);
          history.push("/dishes");
          console.log("result after adding>>>", result);
        }
      }
    });
  };

  const ModalExample = (props) => {
    const toggle2 = () => setModal(!modal);
    return (
      <div>
        <Modal isOpen={modal} toggle={toggle2}>
          <ModalHeader toggle={toggle2}>Confirmation</ModalHeader>
          <ModalBody>
            <h1>{modalText}</h1>
            <br />
            Thank you
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggle2}>
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={() => {
                addToCart();
              }}
            >
              Add To Cart
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </div>
    );
  };

  const ChefModal = (props) => {
    const toggle3 = () => setChefModal(!chefModal);
    return (
      <div>
        <Modal isOpen={chefModal} toggle={toggle3}>
          <ModalHeader toggle={toggle3}>Message</ModalHeader>
          <ModalBody>
            <h1>
              Chef is not available please try later or order something else...
            </h1>
            <br />
            Thank you
          </ModalBody>
          <ModalFooter>
            {/* <Button color='secondary' onClick={toggle3}>
              Cancel
            </Button> */}
            <Button color="primary" onClick={toggle3}>
              Ok
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </div>
    );
  };

  return (
    <>
      <AppLayout>
        {chefModal ? ChefModal() : undefined}
        {modal ? ModalExample() : undefined}
        {modalDelete ? ModalDelete() : undefined}
        {modalDiscount ? ModalDiscount() : undefined}
        <Row>
          <Colxx xxs="12">
            <TabContent activeTab={activeTab}>
              <TabPane tabId="profile">
                <Row>
                  <>
                    <Col sm={1}></Col>
                    <Col sm={postData.video ? 8 : 10} className="col-right">
                      <div
                        style={{
                          textAlign: "right",
                          width: "100%",
                        }}
                      >
                        <Button
                          style={{
                            marginBottom: "10px",
                            marginRight: "10px",
                          }}
                          outline
                          onClick={() => {
                            history.push("/dishes");
                          }}
                        >
                          Back
                        </Button>

                        {userId === postData.userId ? (
                          <>
                            <Button
                              style={{
                                marginRight: "10px",
                                marginBottom: "10px",
                              }}
                              color="warning"
                              onClick={() => {
                                setModalDelete(true);
                              }}
                            >
                              Delete
                            </Button>
                            <Button
                              outline
                              style={{
                                marginBottom: "10px",
                              }}
                              color="primary"
                              onClick={() => {
                                setModalDiscount(true);
                              }}
                            >
                              Offer Discount
                            </Button>
                          </>
                        ) : undefined}
                      </div>

                      {postData.image &&
                      postData.image1 &&
                      postData.image2 &&
                      postData.image3 &&
                      postData.image4 ? (
                        <div className="d-flex flex-row mb-3">
                          <Card className="mb-4">
                            <div
                              style={{
                                marginTop: "30px",
                                paddingLeft: "30px",
                                paddingRight: "30px",
                              }}
                            >
                              <h6
                                style={{
                                  float: "left",
                                  fontSize: "11px",
                                  color: "grey",
                                }}
                              >
                                Posted By: {postData.userName}
                              </h6>
                              <h6
                                style={{
                                  float: "right",
                                  fontSize: "11px",
                                  color: "grey",
                                }}
                              >
                                {postData.created_at
                                  ? moment(postData.created_at).fromNow()
                                  : undefined}
                              </h6>
                            </div>
                            <CardBody>
                              <GlideComponentThumbs
                                settingsImages={{
                                  bound: true,
                                  rewind: false,
                                  focusAt: 0,
                                  startAt: 0,
                                  gap: 5,
                                  perView: 1,
                                  data: detailImages,
                                }}
                                settingsThumbs={{
                                  bound: true,
                                  rewind: false,
                                  focusAt: 0,
                                  startAt: 0,
                                  gap: 10,
                                  perView: 5,
                                  data: detailThumbs,
                                  breakpoints: {
                                    576: {
                                      perView: 4,
                                    },
                                    420: {
                                      perView: 3,
                                    },
                                  },
                                }}
                              />
                              <br />
                              <br />
                              <br />
                              <div className="">
                                <Row>
                                  <Col sm={10}>
                                    <NavLink to="#" location={{}}>
                                      <h1 className="font-weight-medium mb-0 ">
                                        {postData.title}
                                      </h1>
                                    </NavLink>
                                  </Col>
                                  <Col sm={2}>
                                    {role === "user" ? (
                                      <Button
                                        style={{ width: "100px" }}
                                        onClick={() => {
                                          if (chefAvailable) {
                                            console.log(
                                              "chefAvailable>",
                                              chefAvailable
                                            );
                                            return setModal(true);
                                          } else {
                                            console.log(
                                              "chefAvailable else>",
                                              chefAvailable
                                            );
                                            return setChefModal(true);
                                          }
                                        }}
                                        color="primary"
                                      >
                                        Order
                                      </Button>
                                    ) : undefined}
                                  </Col>
                                </Row>
                              </div>
                            </CardBody>
                          </Card>
                        </div>
                      ) : (
                        <Card className="mb-4">
                          <div
                            style={{
                              marginTop: "30px",
                              paddingLeft: "30px",
                              paddingRight: "30px",
                            }}
                          >
                            <h6
                              style={{
                                float: "left",
                                fontSize: "11px",
                                color: "grey",
                              }}
                            >
                              Posted By: {postData.userName}
                            </h6>
                            <h6
                              style={{
                                float: "right",
                                fontSize: "11px",
                                color: "grey",
                              }}
                            >
                              {postData.created_at
                                ? moment(postData.created_at).fromNow()
                                : undefined}
                            </h6>
                          </div>
                          <CardBody>
                            <img
                              style={{
                                width: "100%",
                              }}
                              src={postData.image}
                              alt="thumbnail"
                              className="img-fluid border-0 border-radius mb-3"
                            />
                            <div className="">
                              <Row>
                                <Col sm={10}>
                                  <NavLink to="#" location={{}}>
                                    <h1 className="font-weight-medium mb-0 ">
                                      {postData.title}
                                    </h1>
                                  </NavLink>
                                </Col>
                                <Col sm={2}>
                                  {role === "user" ? (
                                    <Button
                                      style={{ width: "100px" }}
                                      onClick={() => {
                                        if (chefAvailable) {
                                          console.log(
                                            "chefAvailable>",
                                            chefAvailable
                                          );
                                          return setModal(true);
                                        } else {
                                          console.log(
                                            "chefAvailable else>",
                                            chefAvailable
                                          );
                                          return setChefModal(true);
                                        }
                                      }}
                                      color="primary"
                                    >
                                      Order
                                    </Button>
                                  ) : undefined}
                                </Col>
                              </Row>
                            </div>
                          </CardBody>
                        </Card>
                      )}
                      <br />
                      <Card>
                        <CardBody>
                          <Nav tabs className="separator-tabs ml-0 mb-5">
                            <NavItem>
                              <NavLink
                                className={classnames({
                                  active: activeTab2 === "details",
                                  "nav-link": true,
                                })}
                                onClick={() => {
                                  setActiveTab2("details");
                                }}
                                location={{}}
                                to="#"
                              >
                                Details
                              </NavLink>
                            </NavItem>
                            {role === "user" || role === "chef" ? (
                              <NavLink
                                className={classnames({
                                  active: activeTab2 === "comments",
                                  "nav-link": true,
                                })}
                                onClick={() => {
                                  setActiveTab2("comments");
                                }}
                                location={{}}
                                to="#"
                              >
                                Comments
                              </NavLink>
                            ) : undefined}
                          </Nav>

                          {/* details tab */}
                          <TabContent activeTab={activeTab2}>
                            <TabPane tabId="details">
                              <div className="pl-3 flex-grow-1">
                                <h5>Description</h5>

                                <p
                                  style={{
                                    fontSize: "14px",
                                  }}
                                  className="text-muted mb-0 text-small"
                                >
                                  {postData.description}
                                </p>
                                <br />
                                <br />
                                <h5>Price</h5>
                                <p
                                  style={{
                                    fontSize: "14px",
                                  }}
                                  className="text-muted mb-0 text-small"
                                >
                                  {postData.price + " $"}
                                </p>
                                <br />
                                <h5>Offer Delivery</h5>
                                <p
                                  style={{
                                    fontSize: "14px",
                                  }}
                                  className="text-muted mb-0 text-small"
                                >
                                  {postData.delivery}
                                </p>
                                <br />
                              </div>
                            </TabPane>
                          </TabContent>

                          {/* commetns tab */}
                          <TabContent activeTab={activeTab2}>
                            <TabPane tabId="comments">
                              <div className="pl-3 flex-grow-1">
                                {isLoading ? (
                                  <div
                                    style={{
                                      textAlign: "center",
                                    }}
                                  >
                                    <Spinner
                                      color="primary"
                                      animation="border"
                                      role="status"
                                    >
                                      <span className="sr-only">
                                        Loading...
                                      </span>
                                    </Spinner>
                                  </div>
                                ) : (
                                  commentsArr &&
                                  commentsArr.map((item, k) => {
                                    return (
                                      <Row
                                        key={k}
                                        style={{
                                          padding: "10px",
                                        }}
                                      >
                                        <Col sm={1} style={{}}>
                                          <img
                                            style={{
                                              width: "40px",
                                              height: "40px",
                                              borderRadius: "50%",
                                            }}
                                            src={
                                              postData.image
                                                ? postData.image
                                                : "./assets/img/profiles/profile.png"
                                            }
                                            alt="profile"
                                            className=""
                                          />
                                        </Col>
                                        <Col sm={10} style={{}}>
                                          <p className="font-weight-medium mb-0">
                                            {item.commentUserName}
                                          </p>
                                          <p className="text-muted mb-0 text-small">
                                            {item.comment}
                                          </p>
                                        </Col>
                                        <Col sm={1}></Col>
                                      </Row>
                                    );
                                  })
                                )}
                              </div>
                              <br />
                              <InputGroup className="comment-container">
                                <Input
                                  value={comment}
                                  onChange={(e) => {
                                    setComment(e.target.value);
                                  }}
                                  placeholder="add a comment..."
                                />
                                <InputGroupAddon addonType="append">
                                  <Button
                                    disabled={loader}
                                    onClick={() => {
                                      setComment("");
                                      registerComment();
                                    }}
                                    color="primary"
                                  >
                                    {loader ? (
                                      <Spinner
                                        style={{
                                          width: "15px",
                                          height: "15px",
                                        }}
                                        color="defualt"
                                        role="status"
                                      ></Spinner>
                                    ) : undefined}
                                    <span className="d-inline-block">Add</span>{" "}
                                    <i className="simple-icon-arrow-right ml-2" />
                                  </Button>
                                </InputGroupAddon>
                              </InputGroup>
                            </TabPane>
                          </TabContent>
                        </CardBody>
                      </Card>
                      {/* {posts.map((itemData) => {
                      return (
                        <Post
                          data={itemData}
                          key={`post_${itemData.key}`}
                          className="mb-4"
                        />
                      );
                    })} */}
                    </Col>
                    {postData.video ? (
                      <Col sm={3}>
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
                                  src: postData.video,
                                  type: "video/mp4",
                                },
                              ]}
                            />
                          </CardBody>
                          <CardBody>
                            <p className="list-item-heading mb-4">
                              {postData.title}
                            </p>
                          </CardBody>
                        </Card>
                      </Col>
                    ) : (
                      <Col sm={1}></Col>
                    )}
                  </>
                </Row>
              </TabPane>
            </TabContent>
          </Colxx>
        </Row>
      </AppLayout>
    </>
  );
};
export default withRouter(ProfileSocial);
