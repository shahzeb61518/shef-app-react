import React, { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import moment from "moment";
import VideoPlayer from "./../../../../components/common/VideoPlayer";
import { Modal, ModalHeader, ModalBody, ModalFooter, Label } from "reactstrap";

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
import img from "./../img/profile.png";
const friendsData = whotoFollowData.slice();
const followData = whotoFollowData.slice(0, 5);

const VideoDetail = ({ location, history }) => {
  let imagesArr = [];

  const [data, setData] = useState({});
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

  const [activeTab, setActiveTab] = useState("profile");
  const [activeTab2, setActiveTab2] = useState("details");

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
    // console.log("propspropspropsprops>>>>", props);

    if (location.state) {
      if (location.state.data) {
        console.log("location.state.data>>>>", location.state.data);
        setData(location.state.data);
        setPostId(location.state.data._id);
        getComments(location.state.data._id);
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
      .registerComment(comment, data._id, userId, userName)
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

  const deleteVideo = () => {
    setLoader(true);
    new ApiManager().deleteVideo(data._id).then((result) => {
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
          history.push("/videos");
          console.log("result after adding>>>", result);
        }
      }
    });
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
            <Button color='secondary' onClick={toggle}>
              No
            </Button>
            <Button
              color='primary'
              onClick={() => {
                deleteVideo();
              }}>
              Yes
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </div>
    );
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
            <Button
              color='primary'
              onClick={() => {
                // setModal(false);
              }}>
              Order
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </div>
    );
  };

  return (
    <>
      <AppLayout>
        {/* {ModalExample()} */}
        {ModalDelete()}
        <Row>
          <Colxx xxs='12'>
            <Row>
              <>
                <Col sm={1}></Col>
                <Col sm={10} className='col-right'>
                  <h1>Recipies Tutorial</h1>
                  <div
                    style={{
                      textAlign: "right",
                      width: "100%",
                    }}>
                    {userId === data.userId ? (
                      <Button
                        style={{
                          marginBottom: "10px",
                        }}
                        color='primary'
                        onClick={() => {
                          setModalDelete(true);
                        }}>
                        Delete
                      </Button>
                    ) : undefined}
                  </div>
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
                        Posted By: {data.userName}
                      </h6>
                      <h6
                        style={{
                          float: "right",
                          fontSize: "11px",
                          color: "grey",
                        }}>
                        {data.created_at
                          ? moment(data.created_at).fromNow()
                          : undefined}
                      </h6>
                    </div>
                    {data.video ? (
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
                            src: data.video,
                            type: "video/mp4",
                          },
                        ]}
                      />
                    ) : undefined}
                    <br />

                    <CardBody>
                      <Label>Title</Label>
                      <h4>{data.title}</h4>
                      <br />
                      <br />

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
                        <NavLink
                          className={classnames({
                            active: activeTab2 === "comments",
                            "nav-link": true,
                          })}
                          onClick={() => {
                            setActiveTab2("comments");
                          }}
                          location={{}}
                          to='#'>
                          Comments
                        </NavLink>
                      </Nav>

                      {/* Details tab */}
                      <TabContent activeTab={activeTab2}>
                        <TabPane tabId='details'>
                          <h5>Description</h5>
                          <div className='pl-3 flex-grow-1'>
                            <p
                              style={{
                                fontSize: "14px",
                              }}
                              className='text-muted mb-0 text-small'>
                              {data.description}
                            </p>
                            <br />
                          </div>
                        </TabPane>
                      </TabContent>

                      {/* commetns tab */}
                      <TabContent activeTab={activeTab2}>
                        <TabPane tabId='comments'>
                          <div className='pl-3 flex-grow-1'>
                            {isLoading ? (
                              <div
                                style={{
                                  textAlign: "center",
                                }}>
                                <Spinner
                                  color='primary'
                                  animation='border'
                                  role='status'>
                                  <span className='sr-only'>Loading...</span>
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
                                    }}>
                                    <Col sm={1} style={{}}>
                                      <img
                                        style={{
                                          width: "40px",
                                          height: "40px",
                                          borderRadius: "50%",
                                        }}
                                        src={img}
                                        alt='profile'
                                        className=''
                                      />
                                    </Col>
                                    <Col sm={10} style={{}}>
                                      <p className='font-weight-medium mb-0'>
                                        {item.commentUserName}
                                      </p>
                                      <p className='text-muted mb-0 text-small'>
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
                          <InputGroup className='comment-container'>
                            <Input
                              value={comment}
                              onChange={(e) => {
                                setComment(e.target.value);
                              }}
                              placeholder='add a comment...'
                            />
                            <InputGroupAddon addonType='append'>
                              <Button
                                disabled={loader}
                                onClick={() => {
                                  setComment("");
                                  registerComment();
                                }}
                                color='primary'>
                                {loader ? (
                                  <Spinner
                                    style={{
                                      width: "15px",
                                      height: "15px",
                                    }}
                                    color='defualt'
                                    role='status'></Spinner>
                                ) : undefined}
                                <span className='d-inline-block'>Add</span>{" "}
                                <i className='simple-icon-arrow-right ml-2' />
                              </Button>
                            </InputGroupAddon>
                          </InputGroup>
                        </TabPane>
                      </TabContent>
                    </CardBody>
                  </Card>
                  <br />
                </Col>
                <Col sm={1}></Col>
              </>
            </Row>
          </Colxx>
        </Row>
      </AppLayout>
    </>
  );
};
export default withRouter(VideoDetail);
