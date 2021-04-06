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
  Spinner,
  Pagination,
  Button,
  Input,
  PaginationItem,
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

import SingleLightbox from "../../../../components/pages/SingleLightbox";

import chinese from "./../../../../helpers/carousel/images/chinese-food.jpg";
import indian from "./../../../../helpers/carousel/images/indian.jpg";
import turkish from "./../../../../helpers/carousel/images/turkish.jpg";
import pakistan from "./../../../../helpers/carousel/images/pakistan.jpg";

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

const Chefs = (props) => {
  const [postData, setPostData] = useState([]);
  const [postData2, setPostData2] = useState([]);

  const [chefData, setChefData] = useState([]);
  const [chefData2, setChefData2] = useState([]);
  const [creatorBlogData, setCreatorBlogData] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [loader, setLoader] = useState(true);

  const [search, setSearch] = useState("");
  const [searchType, setsearchType] = useState("");

  const [zipCode, setZipCode] = useState("");

  useEffect(() => {
    check();
    // getChefs();
  }, []);

  const check = async () => {
    let user = await reactLocalStorage.get("user_data");
    if (user) {
      console.log(user);
      user = JSON.parse(user);
      setUserId(user.userId);
      setUserName(user.namef);
      setUserRole(user.role);
      // getPostsByChefId();
    }
    if (props.location.state) {
      console.log("zip", props.location.state);
      if (props.location.state.zip) {
        getChefZip(props.location.state.zip);
      } else {
        getChefs();
      }
    } else {
      getChefs();
    }
  };

  const getChefs = async () => {
    await new ApiManager().getChefs().then((result) => {
      if (result.no_result) {
        return;
      }
      if (result.data) {
        if (result.data.error) {
          alert(result.data.error);
          return;
        }

        if (result.data) {
          setLoader(false);
          setChefData(result.data.list);
          setChefData2(result.data.list);
        }

        console.log("result>>>", result);
      }
    });
  };

  const getChefZip = (zip) => {
    new ApiManager().getChefZip(zip).then((result) => {
      if (result.no_result) {
        return;
      }
      if (result.data) {
        if (result.data.error) {
          alert(result.data.error);
          return;
        }

        if (result.data) {
          setLoader(false);
          setChefData(result.data.list);
          setChefData2(result.data.list);
        }

        console.log("result>>>", result);
      }
    });
  };

  const getPostsByChefId = async (id) => {
    await new ApiManager().getPostsByChefId(id).then((result) => {
      if (result.no_result) {
        return;
      }
      if (result.data) {
        if (result.data.error) {
          alert(result.data.error);
          return;
        }

        if (result.data) {
          setLoader(false);
          setPostData(result.data.list);
          setPostData2(result.data.list);
        }

        console.log("result>>>", result);
      }
    });
  };

  const handleSearch = (e) => {
    let search = e.target.value.toLowerCase();
    setSearch(search);
    let arr = chefData2.filter(
      (el) =>
        el.userName &&
        el.userName.toLowerCase().indexOf(search.toLowerCase()) > -1
    );
    setChefData(arr);
  };

  const handleSearchByZip = (e) => {
    // setLoading(true);
    setLoader(true);
    let search = e;
    let arr = chefData2.filter(
      (el) => el.zip && el.zip.toLowerCase().indexOf(search.toLowerCase()) > -1
    );
    setTimeout(() => {
      setLoader(false);
    }, 1000);
    setChefData(arr);
  };

  return (
    <>
      <AppLayout>
        <Row
          style={{
            marginTop: "50px",
            padding: "50px",
          }}>
          <Colxx xxs='12'>
            <br />
            <h1>Chefs</h1>
            <br />
            <br />
            <Input
              style={{
                width: "50%",
                padding: "10px",
                paddingLeft: "20px",
                borderRadius: "30px",
              }}
              type='text'
              placeholder='Search...'
              value={search}
              onChange={(e) => {
                handleSearch(e);
              }}
            />
            <br />
            <br />
            <br />
            <Row>
              <Col></Col>
              <Col>
                {/* <NavLink to='/turkish'> */}
                <Card
                  style={{ height: "160px", cursor: "pointer" }}
                  className='mb-4'
                  onClick={() => {
                    getChefs();
                  }}>
                  <SingleLightbox
                    height='100px'
                    thumb={turkish}
                    large={turkish}
                    className='card-img-top'
                  />
                  <CardBody>
                    <h6 className='text-muted  mb-2'>All</h6>
                  </CardBody>
                </Card>
                {/* </NavLink> */}
              </Col>
              <Col>
                {/* <NavLink to='/chinese'> */}
                <Card
                  style={{ height: "160px", cursor: "pointer" }}
                  className='mb-4'
                  onClick={() => {
                    handleSearchByZip("45000");
                  }}>
                  <SingleLightbox
                    opne={false}
                    height='100px'
                    thumb={chinese}
                    large={chinese}
                    className='card-img-top'
                  />
                  <CardBody>
                    <h6 className='text-muted  mb-2'>Indian</h6>
                  </CardBody>
                </Card>
                {/* </NavLink> */}
              </Col>
              <Col>
                {/* <NavLink to='/turkish'> */}
                <Card
                  style={{ height: "160px", cursor: "pointer" }}
                  className='mb-4'
                  onClick={() => {
                    handleSearchByZip("46000");
                  }}>
                  <SingleLightbox
                    opne={false}
                    height='100px'
                    thumb={pakistan}
                    large={pakistan}
                    className='card-img-top'
                  />
                  <CardBody>
                    <h6 className='text-muted  mb-2'>Chinese</h6>
                  </CardBody>
                </Card>
                {/* </NavLink> */}
              </Col>
              <Col>
                {/* <NavLink to='/chinese'> */}
                <Card
                  style={{ height: "160px", cursor: "pointer" }}
                  className='mb-4'
                  onClick={() => {
                    handleSearchByZip("47000");
                  }}>
                  <SingleLightbox
                    opne={false}
                    height='100px'
                    thumb={indian}
                    large={indian}
                    className='card-img-top'
                  />
                  <CardBody>
                    <h6 className='text-muted  mb-2'>Caribbean</h6>
                  </CardBody>
                </Card>
                {/* </NavLink> */}
              </Col>
              <Col>
                {/* <NavLink to='/chinese'> */}
                <Card
                  style={{ height: "160px", cursor: "pointer" }}
                  className='mb-4'
                  onClick={() => {
                    handleSearchByZip("49000");
                  }}>
                  <SingleLightbox
                    opne={false}
                    height='100px'
                    thumb={indian}
                    large={indian}
                    className='card-img-top'
                  />
                  <CardBody>
                    <h6 className='text-muted  mb-2'>Italian</h6>
                  </CardBody>
                </Card>
                {/* </NavLink> */}
              </Col>
              <Col>
                {/* <NavLink to='/chinese'> */}
                <Card
                  style={{ height: "160px", cursor: "pointer" }}
                  className='mb-4'
                  onClick={() => {
                    handleSearchByZip("48000");
                  }}>
                  <SingleLightbox
                    opne={false}
                    height='100px'
                    thumb={indian}
                    large={indian}
                    className='card-img-top'
                  />
                  <CardBody>
                    <h6 className='text-muted  mb-2'>Japenese</h6>
                  </CardBody>
                </Card>
                {/* </NavLink> */}
              </Col>
              <Col></Col>
            </Row>
          </Colxx>

          {!loader ? (
            chefData.length !== 0 ? (
              chefData.map((item, index) => {
                return (
                  <Colxx xxs='12' lg='4' className='mb-5' key={index}>
                    <Card
                      onClick={() => {
                        props.history.push("/chef/dishes", {
                          userId: item._id,
                          userName: item.userName,
                        });
                      }}
                      className='flex-row listing-card-container'>
                      {item.profileImage ? (
                        <div className='w-40 position-relative'>
                          <img
                            className='card-img-left'
                            src={item.profileImage}
                            alt='Card cap'
                          />
                        </div>
                      ) : undefined}

                      <div className='w-60 d-flex align-items-center'>
                        <CardBody>
                          <ResponsiveEllipsis
                            className='mb-3 listing-heading'
                            text={"Name " + item.userName}
                            maxLine='2'
                            trimRight
                            basedOn='words'
                            component='h5'
                          />
                          <ResponsiveEllipsis
                            className='listing-desc text-muted'
                            text={"Email " + item.userEmail}
                            maxLine='3'
                            trimRight
                            basedOn='words'
                            component='p'
                          />

                          <p className='listing-desc text-muted'>
                            About {item.aboutMe ? item.aboutMe : "none"}
                          </p>
                          <p className='listing-desc text-muted'>
                            Address {item.location ? item.location : "none"}
                          </p>

                          <p className='listing-desc text-muted'>
                            Available
                            {item.available ? (
                              <Badge style={{ marginLeft: "5px" }}> Yes</Badge>
                            ) : (
                              <Badge style={{ marginLeft: "5px" }}> No</Badge>
                            )}
                          </p>
                          <br />
                        </CardBody>
                      </div>
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
                <h5>No Chefs Available Yet...</h5>
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

export default withRouter(Chefs);
