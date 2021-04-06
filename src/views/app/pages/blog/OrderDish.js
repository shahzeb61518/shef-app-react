import React, { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import moment from "moment";
import VideoPlayer from "../../../../components/common/VideoPlayer";
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
// import { detailImages, detailThumbs } from "../../../../data/carouselItems";

const friendsData = whotoFollowData.slice();
const followData = whotoFollowData.slice(0, 5);

const ProfileSocial = (props) => {
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
    }

    if (props.location.state) {
      if (props.location.state.postData) {
        setPostData(props.location.state.postData);

        let img = props.location.state.postData.image;
        let img1 = props.location.state.postData.image1;
        let img2 = props.location.state.postData.image2;
        let img3 = props.location.state.postData.image3;
        let img4 = props.location.state.postData.image4;

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

        setPostId(props.location.state.postData._id);
        getComments(props.location.state.postData._id);
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

  const ModalExample = (props) => {
    const toggle = () => setModal(!modal);
    return (
      <div>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Confirmation</ModalHeader>
          <ModalBody>
            <h1>Hi, click Order to move on and order this dish!</h1>
            <br />
            Thank you
          </ModalBody>
          <ModalFooter>
            <Button color='secondary' onClick={toggle}>
              Cancel
            </Button>

            <NavLink to='/dish/order'>
              <Button
                color='primary'
                onClick={() => {
                  // setModal(false);
                }}>
                Order
              </Button>{" "}
            </NavLink>
          </ModalFooter>
        </Modal>
      </div>
    );
  };

  return (
    <>
      <AppLayout>
        <Row>
          <Colxx xxs='12'>
            <TabContent activeTab={activeTab}>
              <TabPane tabId='profile'>
                <Row>
                  <>
                    <Col sm={1}></Col>
                    <Col sm={postData.video ? 8 : 10} className='col-right'>
                      {postData.image &&
                      postData.image1 &&
                      postData.image2 &&
                      postData.image3 &&
                      postData.image4 ? (
                        <div className='d-flex flex-row mb-3'>
                          <Card className='mb-4'>
                            <div
                              style={{
                                marginTop: "30px",
                                paddingLeft: "30px",
                                paddingRight: "30px",
                              }}>
                              <h6
                                style={{
                                  float: "left",
                                  fontSize: "11px",
                                  color: "grey",
                                }}>
                                Posted By: {postData.userName}
                              </h6>
                              <h6
                                style={{
                                  float: "right",
                                  fontSize: "11px",
                                  color: "grey",
                                }}>
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
                              <div className=''>
                                <Row>
                                  <Col sm={10}>
                                    <NavLink to='#' location={{}}>
                                      <h1 className='font-weight-medium mb-0 '>
                                        {postData.title}
                                      </h1>
                                    </NavLink>
                                  </Col>
                                  <Col sm={2}>
                                    <Button
                                      style={{ width: "100px" }}
                                      onClick={() => {
                                        setModal(true);
                                      }}
                                      color='primary'>
                                      Order
                                    </Button>
                                  </Col>
                                </Row>
                              </div>
                            </CardBody>
                          </Card>
                        </div>
                      ) : (
                        <Card className='mb-4'>
                          <div
                            style={{
                              marginTop: "30px",
                              paddingLeft: "30px",
                              paddingRight: "30px",
                            }}>
                            <h6
                              style={{
                                float: "left",
                                fontSize: "11px",
                                color: "grey",
                              }}>
                              Dish By: {postData.userName}
                            </h6>
                            <h6
                              style={{
                                float: "right",
                                fontSize: "11px",
                                color: "grey",
                              }}>
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
                              alt='thumbnail'
                              className='img-fluid border-0 border-radius mb-3'
                            />
                            <div className=''>
                              <Row>
                                <NavLink to='#' location={{}}>
                                  <h1 className='font-weight-medium mb-0 '>
                                    {postData.title}
                                  </h1>
                                </NavLink>
                              </Row>

                              <br />
                              <Button
                                style={{ width: "200px" }}
                                onClick={() => {
                                  setModal(true);
                                }}
                                color='primary'>
                                Place Order
                              </Button>
                            </div>
                          </CardBody>
                        </Card>
                      )}
                      <br />
                      <Card>
                        <CardBody>
                          <Nav tabs className='separator-tabs ml-0 mb-5'>
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
                                to='#'>
                                Details
                              </NavLink>
                            </NavItem>
                          </Nav>

                          {/* details tab */}
                          <TabContent activeTab={activeTab2}>
                            <TabPane tabId='details'>
                              <h5>Description</h5>
                              <div className='pl-3 flex-grow-1'>
                                <p
                                  style={{
                                    fontSize: "14px",
                                  }}
                                  className='text-muted mb-0 text-small'>
                                  {postData.description}
                                </p>
                                <br />
                              </div>
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
                    {/* {postData.video ? (
                      <Col sm={3}>
                        <Card className='mb-4'>
                          <CardBody className='p-0'>
                            <VideoPlayer
                              autoplay={false}
                              controls
                              controlBar={{
                                pictureInPictureToggle: false,
                              }}
                              className='video-js side-bar-video card-img-top'
                              poster='/assets/img/video/poster.jpg'
                              sources={[
                                {
                                  src: postData.video,
                                  type: "video/mp4",
                                },
                              ]}
                            />
                          </CardBody>
                          <CardBody>
                            <p className='list-item-heading mb-4'>
                              {postData.title}
                            </p>
                          </CardBody>
                        </Card>
                      </Col>
                    ) : (
                      <Col sm={1}></Col>
                    )} */}
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
