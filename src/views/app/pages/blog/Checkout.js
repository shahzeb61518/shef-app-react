import React, { useState, useEffect, useRef } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import moment from "moment";
import VideoPlayer from "../../../../components/common/VideoPlayer";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import StripeCheckout from "react-stripe-checkout";

import { Separator } from "../../../../components/common/CustomBootstrap";

import {
  Row,
  Card,
  FormGroup,
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
  Label,
  TabPane,
  Badge,
  CardTitle,
  Table,
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
// import PayPal from "./Paypal";

const friendsData = whotoFollowData.slice();
const followData = whotoFollowData.slice(0, 5);

const Checkout = (props) => {
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
  const [quantity, setQuantity] = useState(1);
  const [quantity2, setQuantity2] = useState(Number);
  const [quantity3, setQuantity3] = useState(Number);
  const [discountCode, setdiscountCode] = useState("");

  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("Pending");

  const [modal, setModal] = useState(false);

  const [paymentModal, setPaymentModal] = useState(true);
  const [paypalModal, setPaypalModal] = useState(false);

  const [total, setTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [shipping, setShipping] = useState("Islamabad");

  const [itemArray, setItemsArray] = useState([]);
  const [itemArray2, setItemsArray2] = useState([]);

  const [errorMsgBoolean, setErrorMsgBoolean] = useState(false);
  const [btnLoader, setbtnLoader] = useState(false);
  // const arr = [
  //   {
  //     product: "abc",
  //     price: 20,
  //     quantity: 1,
  //   },
  //   {
  //     product: "xyz",
  //     price: 50,
  //     quantity: 2,
  //   },
  //   {
  //     product: "ghi",
  //     price: 10,
  //     quantity: 5,
  //   },
  // ];
  const [checkout, setCheckOut] = useState(false);
  const [createdDate, setCreatedDate] = useState(new Date());

  useEffect(() => {
    check();
  }, []);

  const fixThingsInArray = (arr, arr2) => {
    if (arr2) {
      if (arr2.length == 0) {
        reactLocalStorage.remove("cart_data");
        return props.history.push("/dishes");
      }
      let array = JSON.stringify(arr2);
      reactLocalStorage.set("cart_data", array);
    }
    setItemsArray(arr);
    setItemsArray2(arr);

    let total1 = 0;
    arr.forEach((el) => {
      let val = el.price * el.quantity;
      total1 = total1 + val;
    });
    setTotal(total1);
  };

  const check = () => {
    let user = reactLocalStorage.get("user_data");
    let arr = reactLocalStorage.get("cart_data");
    if (arr && arr.length !== 0) {
      arr = JSON.parse(arr);
      fixThingsInArray(arr);
    } else {
      props.history.push("/dishes");
    }
    if (user) {
      user = JSON.parse(user);
      setUserId(user.userId);
      setUserName(user.namef);
      console.log("user>>>>", user);
    }
  };

  const placeOrder = () => {
    // itemArray.find((item)=>{
    //   if(item.availabale)
    // })
    setbtnLoader(true);

    // let date = itemArray[0].userId.created_at;
    // var a = moment(new Date()); //now
    // var b = moment(date);
    // let days = a.diff(b, "days");

    // if(days >= 60){
    //   let price = total;
    //   var r = parseFloat(25) / 100.0;
    //   let salePrice = price - r * price;
    // }

    new ApiManager()
      .registerOrder(
        itemArray,
        userId,
        userName,
        email,
        contact,
        address,
        status,
        total
      )
      .then((result) => {
        if (result.no_result) {
          return;
        }
        if (result.data) {
          if (result.data.error) {
            setbtnLoader(false);
            alert(result.data.error);
            return;
          }
          if (result.data) {
            reactLocalStorage.remove("cart_data");
            setbtnLoader(false);
            props.history.push("/profile");
            console.log("result after adding>>>", result);
          }
        }
      });
  };

  const TablesUi = () => {
    return (
      <>
        <Row className="mb-5">
          <div style={{ width: "100%" }}>
            <Button
              style={{
                marginBottom: "10px",
                float: "right",
              }}
              outline
              onClick={() => {
                props.history.push("/dishes");
              }}
            >
              Back
            </Button>
          </div>

          <Colxx xxs="12">
            <Card className="mb-4">
              <CardBody>
                <CardTitle>
                  <IntlMessages id="Cart" />
                </CardTitle>
                <Table hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Product</th>
                      <th>Price</th>
                      <th style={{ width: "100px" }}>Quantity</th>
                      <th>Phone</th>
                      <th>Delivery</th>
                      <th>Subtotal</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemArray.map((item, i) => {
                      let qty = item.quantity;

                      return (
                        <tr>
                          <th scope="row">1</th>
                          <td>{item.title}</td>
                          <td>{item.price}</td>
                          <td>
                            <Input
                              style={{ width: "90px" }}
                              placeholder="Quantity"
                              value={qty}
                              type="number"
                              onChange={(e) => {
                                let val = e.target.value;
                                if (val < 1) {
                                  return (val = 1);
                                }
                                itemArray.find(
                                  (el) =>
                                    el._id === item._id &&
                                    ((el.quantity = val), true)
                                );

                                console.log(
                                  "hi",
                                  JSON.stringify(itemArray, undefined, 2)
                                );

                                setQuantity(val);
                              }}
                            />
                          </td>
                          <td>{item.userPhone}</td>
                          <td>{item.delivery}</td>

                          <td>{item.price * qty}$</td>
                          <td>
                            <Button
                              outline
                              color="danger"
                              size="xs"
                              className="mb-2"
                              onClick={() => {
                                let arr = itemArray;
                                arr.splice(i, 1);
                                console.log("itemArray>", arr);
                                fixThingsInArray(arr, arr);
                                // setItemsArray(arr);
                              }}
                            >
                              <span className="simple-icon-trash"></span>
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
                <br />
                <hr />
                <br />
                <div style={{ width: "100%" }}>
                  <Row>
                    <Col>
                      {/* <Input
                        disabled
                        placeholder="Discount Code"
                        value={discountCode}
                        type="text"
                        onChange={(e) => {
                          setdiscountCode(e.target.value);
                        }}
                      /> */}
                    </Col>
                    <Col>
                      {/* <Button disabled outline color="primary">
                        Apply
                      </Button> */}
                    </Col>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col>
                      <Button
                        outline
                        color="primary"
                        onClick={() => {
                          let total1 = 0;
                          itemArray.forEach((el) => {
                            let val = el.price * el.quantity;
                            total1 = total1 + val;
                          });
                          setTotal(total1);
                        }}
                      >
                        Update Cart
                      </Button>
                    </Col>
                  </Row>
                </div>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </>
    );
  };

  // const [product, setProduct] = useState({
  //   name: 'Purchase Subscription',
  //   price: 10,
  //   productBy: 'Blog',
  // });

  const onToken = (token) => {
    let total1 = 0;
    itemArray.forEach((el) => {
      let val = el.price * el.quantity;
      total1 = total1 + val;
    });
    // let product = {
    //   name: "dishes",
    //   price: total1,
    //   orderBy: userName,
    // };
    new ApiManager()
      .payment(token, itemArray, userName, userId, total1)
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
          }
        }
        if (result.status === 200) {
          console.log("onToken>>>", result);
          alert(
            "You paid for your order please wait while we placed your order thank you!"
          );
          // placeOrder();
          // return setPaymentModal(false);
          // updateUserCreditCard();
        } else {
          return alert("Please check your card data and try again...");
        }
      });
  };

  const PaymentModal = (props) => {
    const toggle3 = () => setPaymentModal(!paymentModal);
    return (
      <div>
        <Modal isOpen={paymentModal} toggle={toggle3}>
          <ModalHeader toggle={toggle3}>Message</ModalHeader>
          <ModalBody>
            <h1>
              Please pay for the order and then wait while we will place your
              order.
            </h1>
            <br />
            Thank you
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggle3}>
              Cancel
            </Button>
            {/* <Button
              color='primary'
              onClick={() => {
                // placeOrder();
              }}>
              Pay
            </Button>{" "} */}
            <StripeCheckout
              token={(token) => onToken(token)}
              stripeKey="pk_test_51HM7HFEUwirnzbs9oEN3dsV2le0duHYRtV7YnOOSjyx688DQcTdHLUt2z9RBluEd2oJZV4UdPadTaPhOHYSKbkYA00PoSduSGB"
            >
              <Button color="primary" className="btn-large blue">
                Pay
              </Button>
            </StripeCheckout>
          </ModalFooter>
        </Modal>
      </div>
    );
  };

  const PaypalModal = (props) => {
    const toggle4 = () => setPaypalModal(!paypalModal);
    return (
      <div>
        <Modal isOpen={paypalModal} toggle={toggle4}>
          <ModalHeader toggle={toggle4}>Payment</ModalHeader>
          <ModalBody>
            <Paypal
              userName={"By " + userName}
              total={total}
              placeOrder={placeOrder}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggle4}>
              Cancel
            </Button>
            {/* <Button
              color='primary'
              onClick={() => {
                // placeOrder();
              }}>
              Pay
            </Button>{" "} */}
          </ModalFooter>
        </Modal>
      </div>
    );
  };
  return (
    <>
      <AppLayout>
        <Row>
          <Colxx xxs="12">
            {paymentModal ? PaymentModal() : undefined}
            {paypalModal ? PaypalModal() : undefined}
            <TabContent activeTab={activeTab}>
              <TabPane tabId="profile">
                <Row>
                  <>
                    <Col sm={1}></Col>
                    <Col sm={10} className="">
                      {TablesUi()}

                      <Colxx xxs="12">
                        <Card className="mb-4">
                          <br />
                          <br />
                          <br />
                          <Row style={{ textAlign: "" }}>
                            <Col sm={1}></Col>

                            <Col>
                              {/* <Label>Subtotal</Label>
                              <p
                                style={{
                                  background: "#eee",
                                  padding: "10px",
                                  borderRadius: "5px",
                                }}>
                                {total}
                              </p>{" "} */}
                              <FormGroup>
                                <Label
                                  style={{
                                    color:
                                      errorMsgBoolean && contact === ""
                                        ? "red"
                                        : "black",
                                  }}
                                  for="contact"
                                >
                                  Contact
                                </Label>
                                <Input
                                  type="text"
                                  name="contact"
                                  value={contact}
                                  onChange={(e) => {
                                    setContact(e.target.value);
                                  }}
                                  id="contact"
                                  placeholder="Phone"
                                />
                              </FormGroup>
                            </Col>
                            <Col>
                              {/* <Label>Shipping</Label>
                              <p
                                style={{
                                  background: "#eee",
                                  padding: "10px",
                                  borderRadius: "5px",
                                }}>
                                {shipping}
                              </p>{" "} */}
                              <FormGroup>
                                <Label
                                  style={{
                                    color:
                                      errorMsgBoolean && email === ""
                                        ? "red"
                                        : "black",
                                  }}
                                  for="email"
                                >
                                  Email
                                </Label>
                                <Input
                                  type="text"
                                  name="email"
                                  value={email}
                                  onChange={(e) => {
                                    setEmail(e.target.value);
                                  }}
                                  id="email"
                                  placeholder="Email"
                                />
                              </FormGroup>
                            </Col>
                            <Col>
                              <Label>Total</Label>
                              <p
                                style={{
                                  background: "#eee",
                                  padding: "10px",
                                  borderRadius: "5px",
                                }}
                              >
                                {total}$ Non refundable
                              </p>{" "}
                            </Col>
                            <Col sm={1}></Col>
                          </Row>

                          <br />
                          <Row style={{ textAlign: "" }}>
                            <Col sm={1}></Col>
                            <Col>
                              <FormGroup>
                                <Label
                                  style={{
                                    color:
                                      errorMsgBoolean && address === ""
                                        ? "red"
                                        : "black",
                                  }}
                                  for="address"
                                >
                                  Address
                                </Label>
                                <Input
                                  type="textarea"
                                  name="address"
                                  value={address}
                                  onChange={(e) => {
                                    setAddress(e.target.value);
                                  }}
                                  id="address"
                                  placeholder="Address"
                                />
                              </FormGroup>
                            </Col>
                            <Col sm={1}></Col>
                          </Row>

                          <CardBody>
                            <br />
                            <br />
                            <br />
                            <div
                              style={{
                                width: "100%",
                                textAlign: "center",
                              }}
                            >
                              {/* <Button
                                color='primary'
                                style={{ width: "", marginRight: "10px" }}
                                onClick={() => {
                                  props.history.push("/dishes");
                                }}>
                                Back
                              </Button> */}
                              <Button
                                disabled={btnLoader ? true : undefined}
                                color="primary"
                                style={{ width: "200px" }}
                                onClick={() => {
                                  // placeOrder();

                                  if (
                                    email === "" ||
                                    contact === "" ||
                                    address === ""
                                  ) {
                                    return setErrorMsgBoolean(true);
                                  } else {
                                    // placeOrder();
                                    setPaypalModal(true);

                                    // setPaymentModal(true);
                                  }
                                }}
                              >
                                Place Order
                                {btnLoader ? (
                                  <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                  />
                                ) : undefined}
                              </Button>
                            </div>
                          </CardBody>
                        </Card>
                      </Colxx>
                    </Col>
                    <Col sm={1}></Col>
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

function Paypal({ userName, total, placeOrder }) {
  const paypal = useRef();
  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: userName,
                amount: {
                  currency_code: "CAD",
                  value: total,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          console.log("actions>>>>>>>>>>>>>>>>" + actions);

          const order = await actions.order.capture();
          placeOrder();
          console.log("order>>>>>>>>>>>>>>>>" + order);
        },
        onError: (err) => {
          alert("Error:" + err);
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}

export default withRouter(Checkout);
