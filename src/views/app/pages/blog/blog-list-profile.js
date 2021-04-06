/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from "react";
import moment from "moment";

import {
  Row,
  Card,
  CardBody,
  Badge,
  Col,
  Input,
  Pagination,
  FormGroup,
  Button,
  Label,
  PaginationItem,
  PaginationLink,
  Spinner,
  Nav,
  TabContent,
  TabPane,
  NavItem,
} from "reactstrap";
import classnames from "classnames";

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
import "./style.css";
const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

const BlogList = (props) => {
  const [activeTab, setActiveTab] = useState("neworder");

  const [postData, setPostData] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  const [order, setOrder] = useState([]);
  const [neworder, setNewOrder] = useState([]);
  const [delivered, setDeliveredOrder] = useState([]);
  const [pickup, setPickUp] = useState("No Yet");

  const [loader, setLoader] = useState(true);
  const [loaderUpdate, setloaderUpdate] = useState(false);

  useEffect(() => {
    check();
  }, []);

  const check = async () => {
    let user = await reactLocalStorage.get("user_data");
    if (user) {
      user = JSON.parse(user);
      console.log("user><>", user);
      // console.log("blog-list-profile propssss<", props)
      setUserId(user.userId);
      setUserName(user.namef);
      setRole(user.role);
      getPosts(user.userId);
      getOrders(user.userId);
    }
  };

  const getPosts = async (id) => {
    await new ApiManager().getPostsByCreatorId(id).then((result) => {
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
          setLoader(false);
        }

        console.log("result>>>", result);
      }
    });
  };

  const getOrders = (id) => {
    new ApiManager().getOrder(id).then((result) => {
      if (result.no_result) {
        return;
      }
      if (result.data) {
        if (result.data.error) {
          alert(result.data.error);
          return;
        }
        if (result.data) {
          let arr = result.data.list;
          arr = arr.filter((el) => el.status === "Pending");
          setNewOrder(arr.reverse());

          let arr2 = result.data.list;
          arr2 = arr2.filter(
            (el) => el.status !== "Pending" && el.status !== "Delivered"
          );
          setOrder(arr2.reverse());

          let arr3 = result.data.list;
          arr3 = arr3.filter((el) => el.status === "Delivered");
          setDeliveredOrder(arr3.reverse());

          setLoader(false);
        }
        console.log("result orders data>>>", result);
      }
    });
  };

  const updateOrderStatus = (id) => {
    setloaderUpdate(true);
    new ApiManager().updateOrderPickup(id, pickup).then((result) => {
      if (result.no_result) {
        return;
      }
      if (result.data) {
        if (result.data.error) {
          alert(result.data.error);
          return;
        }
        if (result.data) {
          getOrders(userId);
          setloaderUpdate(false);
          // setPostData(result.data.list);
        }
        console.log("status updated result>>>", result);
      }
    });
  };

  return (
    <>
      <Row>
        <Colxx xxs="12">
          {/* <Button
            color="primary"
            style={{
              marginBottom: '20px',
              width: '200px'
            }}
            onClick={() => {
              props.history.push('/blog/register')
            }}>
            Add Blog
            </Button> */}
        </Colxx>

        {role === "chef" ? (
          <div>
            <h3>My Dishes</h3>
            <br />

            {!loader ? (
              postData.length > 0 ? (
                postData &&
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
                            <p>{item.userName}</p>
                          </CardBody>
                        </div>
                      </Card>
                    </Colxx>
                  );
                })
              ) : (
                <div style={{ textAlign: "center", marginLeft: "15px" }}>
                  <h6>No Dish Added Yet...</h6>
                </div>
              )
            ) : (
              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <Spinner color="primary" animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </div>
            )}
          </div>
        ) : (
          <Colxx xxs="12">
            <div>
              <h3>My Orders</h3>
              <br />
              <Nav tabs className="separator-tabs ml-0 mb-5">
                <>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: activeTab === "neworder",
                        "nav-link": true,
                      })}
                      onClick={() => {
                        setActiveTab("neworder");
                      }}
                      location={{}}
                      to="#"
                    >
                      Pending
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

                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: activeTab === "delivered",
                        "nav-link": true,
                      })}
                      onClick={() => {
                        setActiveTab("delivered");
                      }}
                      location={{}}
                      to="#"
                    >
                      Delivered
                    </NavLink>
                  </NavItem>
                </>
              </Nav>

              <TabContent activeTab={activeTab}>
                <TabPane tabId="neworder">
                  {!loader ? (
                    neworder.length > 0 ? (
                      neworder &&
                      neworder.map((item, index) => {
                        return (
                          <Colxx xxs="12" className="mb-5" key={index}>
                            <Label style={{ marginBottom: "0px" }}>
                              Order # {index + 1}
                            </Label>
                            <Label
                              style={{ marginBottom: "0px", float: "right" }}
                            >
                              Total {item.total + " $"}
                            </Label>
                            <hr style={{ marginTop: "0px" }} />
                            <Card
                              style={{
                                paddingLeft: "30px",
                              }}
                              // onClick={() => {
                              //   props.history.push("/dish/detail", {
                              //     postData: item,
                              //   });
                              // }}
                              className="flex-row listing-card-container"
                            >
                              <Row>
                                {item.itemArray.map((item1, i) => {
                                  return (
                                    <Col>
                                      <Card
                                        style={{
                                          marginTop: "20px",
                                          marginBottom: "20px",
                                          cursor: "pointer",
                                        }}
                                        onClick={() => {
                                          props.history.push("/dish/detail", {
                                            postData: item1,
                                          });
                                        }}
                                      >
                                        <div className="w-40 position-relative">
                                          <img
                                            style={{
                                              width: "110px",
                                            }}
                                            className="card-img-top"
                                            src={item1.image}
                                            alt="Card cap"
                                          />
                                        </div>
                                        <div
                                          style={{
                                            padding: "10px",
                                          }}
                                        >
                                          <p>{item1.title}</p>
                                          <p className="text-muted mb-0 text-small">
                                            Price
                                            <p style={{ color: "black" }}>
                                              {item1.price + " $"}
                                            </p>
                                          </p>
                                          <p className="text-muted mb-0 text-small">
                                            Qty
                                            <p style={{ color: "black" }}>
                                              {item1.quantity}
                                            </p>
                                          </p>
                                          <p className="text-muted mb-0 text-small">
                                            Name
                                            <p style={{ color: "black" }}>
                                              {item1.userName}
                                            </p>
                                          </p>
                                          <p className="text-muted mb-0 text-small">
                                            Phone
                                            <p style={{ color: "black" }}>
                                              {item1.userPhone}
                                            </p>
                                          </p>
                                        </div>
                                      </Card>
                                    </Col>
                                  );
                                })}
                                <br />
                                <br />
                                <br />
                              </Row>
                            </Card>
                            <div>
                              <p
                                style={{ marginTop: "5px", float: "left" }}
                                className="text-muted mb-0 text-small"
                              >
                                Ordered At{" "}
                                <p style={{ color: "black" }}>
                                  {" "}
                                  {item.created_at
                                    ? moment(item.created_at).format("lll")
                                    : undefined}
                                </p>
                              </p>

                              <p
                                style={{ marginTop: "5px", float: "right" }}
                                className="text-muted"
                              >
                                Status: {item.status}
                              </p>
                            </div>
                            <p
                              style={{ marginTop: "5px", float: "center" }}
                              className="text-muted mb-0 text-small"
                            >
                              {" "}
                              - Deliver At{" "}
                              <p style={{ color: "black" }}>
                                {item.deliverTime
                                  ? item.deliverDate + " " + item.deliverTime
                                  : undefined}
                              </p>
                            </p>
                            <br />
                            <br />
                            <br />
                          </Colxx>
                        );
                      })
                    ) : (
                      <div style={{ textAlign: "center", marginLeft: "15px" }}>
                        <h6>No Order in Pending...</h6>
                      </div>
                    )
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        textAlign: "center",
                      }}
                    >
                      <Spinner color="primary" animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                      </Spinner>
                    </div>
                  )}
                </TabPane>
              </TabContent>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="order">
                  {!loader ? (
                    order.length > 0 ? (
                      order &&
                      order.map((item, index) => {
                        return (
                          <Colxx xxs="12" className="mb-5" key={index}>
                            <Label style={{ marginBottom: "0px" }}>
                              Order # {index + 1}
                            </Label>
                            <Label
                              style={{ marginBottom: "0px", float: "right" }}
                            >
                              Total {item.total + " $"}
                            </Label>
                            <hr style={{ marginTop: "0px" }} />
                            <Card
                              style={{
                                paddingLeft: "30px",
                              }}
                              // onClick={() => {
                              //   props.history.push("/dish/detail", {
                              //     postData: item,
                              //   });
                              // }}
                              className="flex-row listing-card-container"
                            >
                              <Row>
                                {item.itemArray.map((item1, i) => {
                                  return (
                                    <Col>
                                      <Card
                                        style={{
                                          marginTop: "20px",
                                          marginBottom: "20px",
                                          cursor: "pointer",
                                        }}
                                        onClick={() => {
                                          props.history.push("/dish/detail", {
                                            postData: item1,
                                          });
                                        }}
                                      >
                                        <div className="w-40 position-relative">
                                          <img
                                            style={{
                                              width: "110px",
                                            }}
                                            className="card-img-top"
                                            src={item1.image}
                                            alt="Card cap"
                                          />
                                        </div>
                                        <div
                                          style={{
                                            padding: "10px",
                                          }}
                                        >
                                          <p>{item1.title}</p>
                                          <p className="text-muted mb-0 text-small">
                                            Price
                                            <p style={{ color: "black" }}>
                                              {item1.price + " $"}
                                            </p>
                                          </p>
                                          <p className="text-muted mb-0 text-small">
                                            Qty
                                            <p style={{ color: "black" }}>
                                              {item1.quantity}
                                            </p>
                                          </p>
                                          <p className="text-muted mb-0 text-small">
                                            Name
                                            <p style={{ color: "black" }}>
                                              {item1.userName}
                                            </p>
                                          </p>
                                          <p className="text-muted mb-0 text-small">
                                            Phone
                                            <p style={{ color: "black" }}>
                                              {item1.userPhone}
                                            </p>
                                          </p>
                                        </div>
                                      </Card>
                                    </Col>
                                  );
                                })}
                                <br />
                                <br />
                                <br />
                              </Row>
                            </Card>
                            <div>
                              <p
                                style={{ marginTop: "5px", float: "left" }}
                                className="text-muted mb-0 text-small"
                              >
                                Ordered At{" "}
                                <p style={{ color: "black" }}>
                                  {" "}
                                  {item.created_at
                                    ? moment(item.created_at).format("lll")
                                    : undefined}
                                </p>
                              </p>

                              <p
                                style={{ marginTop: "5px", float: "right" }}
                                className="text-muted"
                              >
                                Status: {item.status}
                              </p>
                            </div>
                            <p
                              style={{ marginTop: "5px", float: "center" }}
                              className="text-muted mb-0 text-small"
                            >
                              {" "}
                              - Deliver At{" "}
                              <p style={{ color: "black" }}>
                                {item.deliverTime
                                  ? item.deliverDate + " " + item.deliverTime
                                  : undefined}
                              </p>
                            </p>
                            <br />
                            <br />
                            <br />
                          </Colxx>
                        );
                      })
                    ) : (
                      <div style={{ textAlign: "center", marginLeft: "15px" }}>
                        <h6>No Order placed yet...</h6>
                      </div>
                    )
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        textAlign: "center",
                      }}
                    >
                      <Spinner color="primary" animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                      </Spinner>
                    </div>
                  )}
                </TabPane>
              </TabContent>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="delivered">
                  {!loader ? (
                    delivered.length > 0 ? (
                      delivered &&
                      delivered.map((item, index) => {
                        return (
                          <Colxx xxs="12" className="mb-5" key={index}>
                            <Label style={{ marginBottom: "0px" }}>
                              Order # {index + 1}
                            </Label>
                            <Label
                              style={{ marginBottom: "0px", float: "right" }}
                            >
                              Total {item.total + " $"}
                            </Label>
                            <hr style={{ marginTop: "0px" }} />
                            <Card
                              style={{
                                paddingLeft: "30px",
                              }}
                              // onClick={() => {
                              //   props.history.push("/dish/detail", {
                              //     postData: item,
                              //   });
                              // }}
                              className="flex-row listing-card-container"
                            >
                              <Row>
                                {item.itemArray.map((item1, i) => {
                                  return (
                                    <Col>
                                      <Card
                                        style={{
                                          marginTop: "20px",
                                          marginBottom: "20px",
                                          cursor: "pointer",
                                        }}
                                        onClick={() => {
                                          props.history.push("/dish/detail", {
                                            postData: item1,
                                          });
                                        }}
                                      >
                                        <div className="w-40 position-relative">
                                          <img
                                            style={{
                                              width: "110px",
                                            }}
                                            className="card-img-top"
                                            src={item1.image}
                                            alt="Card cap"
                                          />
                                        </div>
                                        <div
                                          style={{
                                            padding: "10px",
                                          }}
                                        >
                                          <p>{item1.title}</p>
                                          <p className="text-muted mb-0 text-small">
                                            Price
                                            <p style={{ color: "black" }}>
                                              {item1.price + " $"}
                                            </p>
                                          </p>
                                          <p className="text-muted mb-0 text-small">
                                            Qty
                                            <p style={{ color: "black" }}>
                                              {item1.quantity}
                                            </p>
                                          </p>

                                          <p className="text-muted mb-0 text-small">
                                            Name
                                            <p style={{ color: "black" }}>
                                              {item1.userName}
                                            </p>
                                          </p>
                                          <p className="text-muted mb-0 text-small">
                                            Phone
                                            <p style={{ color: "black" }}>
                                              {item1.userPhone}
                                            </p>
                                          </p>
                                        </div>
                                      </Card>
                                    </Col>
                                  );
                                })}
                                <br />
                                <br />
                                <br />
                                {item.pickup !== "Yes" ? (
                                  <div style={{ float: "right" }}>
                                    <FormGroup>
                                      <Label
                                        style={{
                                          marginTop: "10px",
                                          marginBottom: "0px",
                                        }}
                                        for="pickup"
                                      >
                                        Received
                                      </Label>
                                      <Input
                                        type="select"
                                        name="pickup"
                                        id="pickup"
                                        onChange={(e) => {
                                          setPickUp(e.target.value);
                                        }}
                                      >
                                        <option selected value="Not Yet">
                                          No Yet
                                        </option>
                                        <option value="Yes">Yes</option>
                                      </Input>
                                    </FormGroup>
                                    <Button
                                      outline
                                      disabled={loaderUpdate ? true : false}
                                      color="primary"
                                      onClick={() => {
                                        updateOrderStatus(item._id);
                                      }}
                                    >
                                      Update
                                      {loaderUpdate ? (
                                        <Spinner size="sm" color="success" />
                                      ) : undefined}
                                    </Button>
                                  </div>
                                ) : undefined}
                              </Row>
                            </Card>
                            <div>
                              <p
                                style={{ marginTop: "5px", float: "left" }}
                                className="text-muted mb-0 text-small"
                              >
                                Ordered At{" "}
                                <p style={{ color: "black" }}>
                                  {" "}
                                  {item.created_at
                                    ? moment(item.created_at).format("lll")
                                    : undefined}
                                </p>
                              </p>

                              {/* <Button
                                  style={{ float: "right", marginLeft: "5px" }}
                                  outline
                                  size='sm'
                                  color='primary'
                                  onClick={() => {
                                    props.history.push("/dish/detail", {
                                      postData: item.itemArray,
                                    });
                                  }}>
                                  Leave Comment
                                </Button> */}

                              <div style={{ marginTop: "5px", float: "right" }}>
                                <p className="text-muted">
                                  Status: {item.status}
                                </p>
                              </div>
                            </div>
                            <p
                              style={{ marginTop: "5px", float: "center" }}
                              className="text-muted mb-0 text-small"
                            >
                              {" "}
                              - Deliver At{" "}
                              <p style={{ color: "black" }}>
                                {item.deliverTime
                                  ? item.deliverDate + " " + item.deliverTime
                                  : undefined}
                              </p>
                            </p>
                            <br />
                            <br />
                            <br />
                          </Colxx>
                        );
                      })
                    ) : (
                      <div style={{ textAlign: "center", marginLeft: "15px" }}>
                        <h6>No Order Delivered yet...</h6>
                      </div>
                    )
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        textAlign: "center",
                      }}
                    >
                      <Spinner color="primary" animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                      </Spinner>
                    </div>
                  )}
                </TabPane>
              </TabContent>
            </div>
          </Colxx>
        )}
      </Row>
    </>
  );
};

export default withRouter(BlogList);
