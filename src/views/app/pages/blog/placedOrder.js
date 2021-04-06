/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect, useRef} from "react";
import moment from "moment";
import DatePicker from "reactstrap-date-picker";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import {
  Row,
  Card,
  CardBody,
  Badge,
  Input,
  FormGroup,
  Col,
  Pagination,
  Button,
  Label,
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

const BlogList = (props) => {
  const [postData, setPostData] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  const [order, setOrder] = useState([]);
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [orderId, setOrderId] = useState("");

  const [modal, setModal] = useState(false);
  const [totalOrdersAmount, settotalOrdersAmount] = useState(Number);

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
      // getPosts(user.userId);
      getOrdersByChef(user.userId);
    }
  };

  const getOrdersByChef = (id) => {
    new ApiManager().getOrdersByChefId(id).then((result) => {
      if (result.no_result) {
        return;
      }
      if (result.data) {
        if (result.data.error) {
          alert(result.data.error);
          return;
        }
        if (result.data) {
          // let arr = result.data.list;
          // let arr2 = arr.filter((el) => {
          //   return el.itemArray.filter((ele) => ele.userId === userId);
          // });
          // console.log("finding chef order that placed>>>", arr2);
          // let arr2
          // let arr = result.data.list.filter((obj) => {
          //   return  arr2 = obj.itemArray.filter((el) => {
          //     console.log("itemArray data?", obj.itemArray)
          //   });
          // });
          // console.log("finding chef order that placed>>>", arr2)

          // setting total amount for chef
          let total = 0;
          let newArr = [];
          result.data.list.map((item, i) => {
            newArr = item.itemArray.filter((el) => el.userId._id === id);

            console.log("item.newArr", newArr);

            newArr.forEach((ele) => {
              let nm = Number(ele.price);
              total = nm + total;
            });
            settotalOrdersAmount(total);
            console.log("total>>>>>>>>>", total);
          });

          if (role === "chef") {
            result.data.list.forEach((item) => {
              let date = item.delivered_at;
              var a = moment(new Date()); //now
              var b = moment(date);
              let days = a.diff(b, "days");
              if (days > 15) {
                // paypalFunction()
                // updateOrder()
                // alert("call paypal");
                // paypal('test', total)
              }
            });
          }

          setOrder(result.data.list.reverse());

          // const filteredResult = result.data.list.filter((item) => {
          //   return item.itemArray.filter((el) => el.userId === userId);
          // });
          // console.log("finding chef order that placed>>>", filteredResult);
        }
        console.log("result orders data>>>", result.data.list);
      }
    });
  };



  const updateOrderStatus = (id) => {
    new ApiManager().updateOrderStatus(id, status).then((result) => {
      if (result.no_result) {
        return;
      }
      if (result.data) {
        if (result.data.error) {
          alert(result.data.error);
          return;
        }
        if (result.data) {
          getOrdersByChef(userId);
          // setPostData(result.data.list);
        }
        console.log("status updated result>>>", result);
      }
    });
  };

  const updateOrderDeliverTiming = (id) => {
    new ApiManager()
      .updateOrderDeliverTime(orderId, date, time)
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
            getOrdersByChef(userId);
            setModal(false);

            // setPostData(result.data.list);
          }
          console.log("status updated result>>>", result);
        }
      });
  };

  const ModalExample = (props) => {
    const toggle2 = () => setModal(!modal);
    return (
      <div>
        <Modal isOpen={modal} toggle={toggle2}>
          <ModalHeader toggle={toggle2}>Delivery Date & Time</ModalHeader>
          <ModalBody>
            {/* <Label
              style={{ marginBottom: "0px", marginTop: "8px" }}
              for='datentime'>
              Date & Time
            </Label> */}
            {/* <DatePicker
              dateFormat='MM/DD/YYYY mm:hh'
              id='example-datentime'
              value={datenTime}
              onChange={(v) => setdatenTime(v)}
            /> */}
            <FormGroup>
              <Label for="exampleDate">Date</Label>
              <Input
                type="date"
                name="date"
                id="exampleDate"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
                placeholder="date placeholder"
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleTime">Time</Label>
              <Input
                type="time"
                name="time"
                id="exampleTime"
                value={time}
                onChange={(e) => {
                  setTime(e.target.value);
                }}
                placeholder="time placeholder"
              />
            </FormGroup>
            <br />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggle2}>
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={() => {
                updateOrderDeliverTiming(orderId);
              }}
            >
              Update Date&Time
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </div>
    );
  };



  return (
    <>
      <Row>
        <Colxx xxs="12">
          <div>
            <h3>Placed Order</h3>
            <br />
            <h3>Total: {totalOrdersAmount}$</h3>
          </div>
        </Colxx>
        {ModalExample()}

        {order.length > 0 ? (
          order &&
          order.map((item, index) => {
            let newArr = item.itemArray.filter(
              (el) => el.userId._id === userId
            );
            // console.log("item.itemArray", item.itemArray);

            // settotalOrdersAmount(total);
            let timing = item.datenTime;

            // check for payment 15 days

            let date = item.delivered_at;
            var a = moment(new Date()); //now
            var b = moment(date);
            let days = a.diff(b, "days");

            if (newArr.length > 0) {
              return (
                <Colxx xxs="12" lg="4" className="mb-5" key={index}>
                  <Card
                    // onClick={() => {
                    //   props.history.push("/dish/detail", {
                    //     order: item,
                    //   });
                    // }}
                    className=""
                  >
                    <div className="">
                      <CardBody>
                        {newArr &&
                          newArr.map((obj, i) => {
                            return (
                              <>
                                <div style={{ textAlign: "center" }}>
                                  {obj.image ? (
                                    <img
                                      style={{
                                        width: "100px",
                                        height: "100px",
                                      }}
                                      className="card-img-top"
                                      src={obj.image}
                                      alt="Card cap"
                                    />
                                  ) : undefined}
                                  <ResponsiveEllipsis
                                    className="mb-3 listing-heading"
                                    text={obj.title}
                                    maxLine="2"
                                    trimRight
                                    basedOn="words"
                                    component="h5"
                                  />
                                </div>
                              </>
                            );
                          })}
                        {/* <ResponsiveEllipsis
                              className='listing-desc text-muted'
                              text={item.description}
                              maxLine='3'
                              trimRight
                              basedOn='words'
                              component='p'
                            /> */}
                        {item.pickup === "Yes" && days > 15 ? (
                          <p className="listing-desc text-muted">
                            <span style={{ color: "black" }}>Amount Paid</span>{" "}
                            {item.total}$
                          </p>
                        ) : undefined}
                        <p className="listing-desc text-muted">
                          <span style={{ color: "black" }}>
                            Ordered Placed by
                          </span>{" "}
                          {item.userName}
                        </p>
                        <p className="listing-desc text-muted">
                          <span style={{ color: "black" }}>Email</span>{" "}
                          {item.email}
                        </p>
                        <p className="listing-desc text-muted">
                          <span style={{ color: "black" }}>Contact</span>{" "}
                          {item.contact}
                        </p>

                        <p className="listing-desc text-muted">
                          <span style={{ color: "black" }}>Address</span>{" "}
                          {item.address}
                        </p>
                        <p className="listing-desc text-muted">
                          <span style={{ color: "black" }}>Total</span>{" "}
                          {item.total}$
                        </p>
                        <p
                          style={{ float: "left" }}
                          className="listing-desc text-muted"
                        >
                          <span style={{ color: "black" }}>Status</span>{" "}
                          {item.status}
                        </p>
                        <h6
                          style={{
                            float: "right",
                            fontSize: "11px",
                            color: "grey",
                          }}
                        >
                          {item.created_at
                            ? moment(item.created_at).fromNow()
                            : undefined}
                        </h6>
                      </CardBody>
                    </div>
                    <Row
                      style={{
                        paddingLeft: "30px",
                      }}
                    >
                      <Col>
                        <FormGroup>
                          <Label
                            style={{ marginBottom: "0px", marginTop: "8px" }}
                            for="status"
                          >
                            Status
                          </Label>
                          <Input
                            type="select"
                            name="select"
                            // value={item.status}
                            id="status"
                            onChange={(e) => {
                              setStatus(e.target.value);
                            }}
                          >
                            <option selected value={item.status}>
                              {item.status}
                            </option>
                            <option value="Under Process">Under Process</option>
                            <option value="Completed">Completed</option>
                            <option value="Delivered">Delivered</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col>
                        <Button
                          disabled={
                            item.status === status || status === ""
                              ? true
                              : false
                          }
                          style={{
                            marginTop: "28px",
                          }}
                          size="sm"
                          outline
                          color="primary"
                          onClick={() => {
                            updateOrderStatus(item._id);
                          }}
                        >
                          Update Status
                        </Button>
                      </Col>
                    </Row>

                    <Button
                      style={{
                        marginTop: "28px",
                        marginLeft: "20px",
                        marginRight: "20px",
                      }}
                      size="sm"
                      outline
                      color="primary"
                      onClick={() => {
                        setModal(true);
                        setOrderId(item._id);
                      }}
                    >
                      Add Delivery Time
                    </Button>
                    <br />
                    {item.status === "Delivered" ? (
                      <h6
                        className="listing-desc text-muted"
                        style={{
                          marginLeft: "20px",
                          marginRight: "20px",
                        }}
                      >
                        {" "}
                        Received Customer: {item.pickup}
                      </h6>
                    ) : undefined}

                    {/* <Row
                      style={{
                        paddingLeft: "30px",
                      }}>
                      <Col>
                        <Label
                          style={{ marginBottom: "0px", marginTop: "8px" }}
                          for='datentime'>
                          Date & Time
                        </Label>
                        <DatePicker
                          id='example-datentime'
                          value={datenTime}
                          onChange={(v) => setdatenTime(v)}
                        />
                      </Col>
                      <Col>
                        <Button
                          style={{
                            marginTop: "28px",
                          }}
                          size='sm'
                          outline
                          color='primary'
                          onClick={() => {
                            updateOrderDeliverTiming(item._id);
                          }}>
                          Delivery Time
                        </Button>
                      </Col>
                    </Row>
                    */}
                    <br />
                    <br />
                    <br />
                  </Card>
                </Colxx>
              );
            }
          })
        ) : (
          <div style={{ textAlign: "center", marginLeft: "15px" }}>
            <h6>No Order Placed Yet...</h6>
          </div>
        )}
      </Row>
    </>
  );
};

export default withRouter(BlogList);
