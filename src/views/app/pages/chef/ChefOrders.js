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
  Spinner,
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

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

const ChefOrders = (props) => {
  const [postData, setPostData] = useState([]);
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
    // let user = await reactLocalStorage.get("user_data");
    // if (user) {
    //   console.log(user);
    //   user = JSON.parse(user);
    //   setUserId(user.userId);
    //   setUserName(user.namef);
    //   setUserRole(user.role);
    //     getPostsByChefId(user.userId);
    // }
    if (props.location.state) {
      if (props.location.state.userId) {
        setUserName(props.location.state.userName);
        setUserId(props.location.state.userId);
        getPostsByChefId(props.location.state.userId);
      }
    }
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
            {/* {userRole == "chef" ? (
            <Button
              color='primary'
              style={{
                marginBottom: "20px",
                width: "200px",
              }}
              onClick={() => {
                props.history.push("/dish/register");
              }}>
              Add Dish
            </Button>
          ) : undefined} */}
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div
              style={{
                textAlign: "center",
              }}>
              <h3>{userName}</h3>
            </div>
            <br />
            <h5 style={{ paddingLeft: "50px" }}>Dishes</h5>
            <br />
          </Colxx>

          {!loader ? (
            postData.length !== 0 ? (
              postData.map((item, index) => {
                return (
                  <Colxx
                    xxs='12'
                    lg='6'
                    className='mb-5'
                    key={index}
                    style={{ paddingLeft: "50px", paddingRight: "50px" }}>
                    <Card
                      onClick={() => {
                        props.history.push("/dish/detail", {
                          postData: item,
                        });
                      }}
                      className='flex-row listing-card-container'>
                      {item.image ? (
                        <div className='w-40 position-relative'>
                          <img
                            className='card-img-left'
                            src={item.image}
                            alt='Card cap'
                          />
                        </div>
                      ) : undefined}

                      <div className='w-60 d-flex align-items-center'>
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
                          <ResponsiveEllipsis
                            className='listing-desc text-muted'
                            text={item.price + " $"}
                            maxLine='3'
                            trimRight
                            basedOn='words'
                            component='h5'
                          />
                          <p>{item.userName}</p>
                          <br />
                          {item.created_at
                            ? moment(item.created_at).fromNow()
                            : undefined}
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
                <h5>No Dishes Added Yet...</h5>
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

export default withRouter(ChefOrders);
