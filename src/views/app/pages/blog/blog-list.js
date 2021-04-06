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
  Input,
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
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import SingleLightbox from "../../../../components/pages/SingleLightbox";

import chinese from "./../../../../helpers/carousel/images/chinese-food.jpg";
import indian from "./../../../../helpers/carousel/images/indian.jpg";
import turkish from "./../../../../helpers/carousel/images/turkish.jpg";
import pakistan from "./../../../../helpers/carousel/images/pakistan.jpg";

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

const DishList = (props) => {
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
  const [loading, setLoading] = useState(false);
  const [searchType, setsearchType] = useState("");
  const [paypalId, setPaypalId] = useState("");
  const [modal, setModal] = useState(false);

  useEffect(() => {
    check();
    getChefs();
  }, []);

  const check = async () => {
    let user = await reactLocalStorage.get("user_data");
    if (user) {
      console.log(user);
      user = JSON.parse(user);
      setUserId(user.userId);
      setUserName(user.namef);
      setUserRole(user.role);
      setPaypalId(user.paypalId);

      if (user.role === "chef") {
        getPostsByChefId(user.userId);
      } else {
        getPosts();
      }
    }
  };

  const getPosts = async () => {
    await new ApiManager().getPosts().then((result) => {
      if (result.no_result) {
        return;
      }
      if (result.data) {
        if (result.data.error) {
          alert(result.data.error);
          return;
        }

        if (result.data) {
          setPostData(result.data.list);
          setPostData2(result.data.list);
          setLoader(false);
        }

        console.log("result>>>", result);
      }
    });
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
    let arr = postData2.filter(
      (el) =>
        el.title && el.title.toLowerCase().indexOf(search.toLowerCase()) > -1
    );
    setPostData(arr);
  };

  // const handleSearchByType = (e) => {
  //   // setLoading(true);
  //   setLoader(true);
  //   let search = e;
  //   let arr = chefData2.filter(
  //     (el) =>
  //       el.type && el.type.toLowerCase().indexOf(search.toLowerCase()) > -1
  //   );
  //   setTimeout(() => {
  //     setLoader(false);
  //   }, 1000);
  //   setChefData(arr);
  // };

  const paypalModal = (props) => {
    const toggle = () => setModal(!modal);
    return (
      <div>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Message</ModalHeader>
          <ModalBody>
            <h3>
              Please Update Your Paypal ID And Then You Will Be Able To Register Your Dishes...
            </h3>
            <br />
            Thank you
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggle}>
              OK
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  };

  return (
    <>
      <Row>
        <Colxx xxs="12">
          {paypalModal()}

          {userRole == "chef" ? (
            <Button
              color="primary"
              style={{
                marginBottom: "20px",
                width: "200px",
              }}
              onClick={() => {
                if (paypalId === "") {
                  setModal(true);
                } else {
                  props.history.push("/dish/register");
                }
              }}
            >
              Add Dish
            </Button>
          ) : undefined}
          <br />

          <h1>Dishes</h1>
          <br />
          <br />
          <Input
            style={{
              width: "50%",
              padding: "10px",
              paddingLeft: "20px",
              borderRadius: "30px",
            }}
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              handleSearch(e);
            }}
          />
          <br />
          <br />
        </Colxx>

        {!loader ? (
          postData.length !== 0 ? (
            postData.map((item, index) => {
              return (
                <Colxx xxs="12" lg="6" className="mb-5" key={index}>
                  <Card
                    onClick={() => {
                      props.history.push("/dish/detail", {
                        postData: item,
                      });
                    }}
                    className="flex-row listing-card-container"
                  >
                    {item.image ? (
                      <div className="w-40 position-relative">
                        <img
                          className="card-img-left"
                          src={item.image}
                          alt="Card cap"
                        />
                      </div>
                    ) : undefined}

                    <div className="w-60 d-flex align-items-center">
                      <CardBody>
                        <ResponsiveEllipsis
                          className="mb-3 listing-heading"
                          text={item.title}
                          maxLine="2"
                          trimRight
                          basedOn="words"
                          component="h5"
                        />
                        <ResponsiveEllipsis
                          className="listing-desc text-muted"
                          text={item.description}
                          maxLine="3"
                          trimRight
                          basedOn="words"
                          component="p"
                        />
                        <ResponsiveEllipsis
                          className="listing-desc text-muted"
                          text={item.price + " $"}
                          maxLine="3"
                          trimRight
                          basedOn="words"
                          component="h5"
                        />

                        <p>{item.userName}</p>
                        <br />

                        {item.created_at
                          ? moment(item.created_at).fromNow()
                          : undefined}
                        <p
                          style={{ float: "right" }}
                          className="listing-desc text-muted"
                        >
                          {"Offer Delivery " + item.delivery}
                        </p>
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
              }}
            >
              <h5>No Post Added Yet...</h5>
            </div>
          )
        ) : (
          <div
            style={{
              width: "100%",
              textAlign: "center",
              marginTop: "50px",
            }}
          >
            <Spinner color="primary" animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        )}
      </Row>
    </>
  );
};

export default withRouter(DishList);
