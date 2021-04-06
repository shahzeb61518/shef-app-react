/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from "react";
import VideoPlayer from "./../../../../components/common/VideoPlayer";
import moment from "moment";

import {
  Col,
  Row,
  Card,
  CardBody,
  Badge,
  Pagination,
  Button,
  PaginationItem,
  Spinner,
  PaginationLink,
} from "reactstrap";
import LinesEllipsis from "react-lines-ellipsis";
import responsiveHOC from "react-lines-ellipsis/lib/responsiveHOC";
import { NavLink, withRouter } from "react-router-dom";
import Breadcrumb from "../../../../containers/navs/Breadcrumb";
import AppLayout from "../../../../layout/AppLayout";
import {
  Separator,
  Colxx,
} from "../../../../components/common/CustomBootstrap";
import { blogData } from "../../../../data/blog";
import ApiManager from "../../../../helpers/ApiManger";
import { reactLocalStorage } from "reactjs-localstorage";

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

const BlogList = (props) => {
  const [data, setData] = useState([]);
  const [creatorBlogData, setCreatorBlogData] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    check();
  }, []);

  const check = async () => {
    let user = await reactLocalStorage.get("user_data");
    if (user) {
      console.log(user);
      user = JSON.parse(user);
      setUserId(user.userId);
      setUserName(user.namef);
      setUserRole(user.role);

      if (user.role === "chef") {
        getVideosByChefId(user.userId);
      } else {
        getVideos();
      }
    }

    // if (user.role === "creator") {
    // getBlogsByCreatorId(user.userId);
    // } else {
    // getPostsByUserId(user.userId);
    // }
  };

  const getVideos = async (id) => {
    await new ApiManager().getVideos().then((result) => {
      if (result.no_result) {
        return;
      }
      if (result.data) {
        if (result.data.error) {
          alert(result.data.error);
          return;
        }

        if (result.data) {
          setData(result.data.list);
          setLoader(false);
        }

        console.log("result>>>", result);
      }
    });
  };

  const getVideosByChefId = async (id) => {
    await new ApiManager().getVideosByChefId(id).then((result) => {
      if (result.no_result) {
        return;
      }
      if (result.data) {
        if (result.data.error) {
          alert(result.data.error);
          return;
        }

        if (result.data) {
          setData(result.data.list);
          setLoader(false);
        }

        console.log("result>>>", result);
      }
    });
  };

  return (
    <>
      <AppLayout>
        <Row>
          <Colxx xxs='12'>
            {userRole == "chef" ? (
              <Button
                color='primary'
                style={{
                  marginBottom: "20px",
                  width: "200px",
                }}
                onClick={() => {
                  props.history.push("/video/register");
                }}>
                Add Video
              </Button>
            ) : undefined}

            <br />
            <h1>Recipies Tutorial</h1>
            <br />
          </Colxx>
          {/* <Row>
            <Col>
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
                        src:
                          "http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4",
                        type: "video/mp4",
                      },
                    ]}
                  />
                </CardBody>
                <CardBody>
                  <p className='list-item-heading mb-4'>Homemade Dishes</p>
                  <footer>
                    <p className='text-muted text-small mb-0 font-weight-light'>
                      Learn and must try at home
                    </p>
                  </footer>
                </CardBody>
              </Card>
            </Col>
          </Row> */}

          {!loader ? (
            data.length !== 0 ? (
              data.map((item, index) => {
                return (
                  <Colxx xxs='12' lg='4' className='mb-5' key={index}>
                    <Card
                      style={{ height: "" }}
                      className='mb-4'
                      onClick={() => {
                        props.history.push("/video/detail", {
                          data: item,
                        });
                      }}>
                      {item.video ? (
                        <VideoPlayer
                          autoplay={false}
                          controls
                          controlBar={{
                            pictureInPictureToggle: false,
                          }}
                          className='video-js side-bar-video card-img-top'
                          poster={item.video}
                          sources={[
                            {
                              src: item.video,
                              type: "video/mp4",
                            },
                          ]}
                        />
                      ) : undefined}
                      <CardBody>
                        <ResponsiveEllipsis
                          className='mb-3 listing-heading'
                          text={item.title}
                          maxLine='2'
                          trimRight
                          basedOn='words'
                          component='h5'
                        />
                        <ResponsiveEllipsis
                          className='listing-desc text-muted'
                          text={item.description}
                          maxLine='3'
                          trimRight
                          basedOn='words'
                          component='p'
                        />
                        <p>{item.userName}</p>
                        <br />
                        {item.created_at
                          ? moment(item.created_at).fromNow()
                          : undefined}
                      </CardBody>
                    </Card>
                  </Colxx>
                );
              })
            ) : (
              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                }}>
                <h5>No Video Added Yet...</h5>
              </div>
            )
          ) : (
            <div
              style={{
                width: "100%",
                textAlign: "center",
                marginTop: "50px",
              }}>
              <Spinner color='primary' animation='border' role='status'>
                <span className='sr-only'>Loading...</span>
              </Spinner>
            </div>
          )}
        </Row>
      </AppLayout>
    </>
  );
};

export default withRouter(BlogList);
