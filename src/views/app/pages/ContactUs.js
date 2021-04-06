/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from "react";
import {
  Row,
  Card,
  CardBody,
  Col,
  FormGroup,
  Label,
  Input,
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
import AppLayout from "../../../layout/AppLayout";
import { Separator, Colxx } from "../../../components/common/CustomBootstrap";
// import { blogData } from "../../../../data/blog";
import ApiManager from "../../../helpers/ApiManger";
import { reactLocalStorage } from "reactjs-localstorage";

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

const ContactUs = (props) => {
  const [postData, setPostData] = useState([]);

  const [Name, setName] = useState("");
  const [Message, setMessage] = useState("");
  const [Email, setEmail] = useState("");
  const [video, setVideo] = useState("");
  const [type, setType] = useState("");
  const [Phone, setPhone] = useState("");

  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [errorMsgBoolean, setErrorMsgBoolean] = useState(false);
  const [btnLoader, setbtnLoader] = useState(false);

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
      setUserEmail(user.email);
      setUserPhone(user.phone);
    }
  };

  const registerMessage = async () => {
    if (
      Name == "" ||
      Message == "" ||
      Email == "" ||
      Phone == "" ||
      userName == ""
    ) {
      setErrorMsg("Please Fill The Required Fields!");
      setErrorMsgBoolean(true);
    } else {
      setbtnLoader(true);
      props.history.push("/dashboard");

      //   await new ApiManager()
      //     .registerPost(
      //       Name,
      //       Message,
      //       Email,
      //       video,
      //       userId,
      //       userName,
      //       userEmail,
      //       userPhone,
      //       type,
      //       Phone
      //     )
      //     .then((result) => {
      //       if (result.no_result) {
      //         return;
      //       }
      //       if (result.data) {
      //         if (result.data.error) {
      //           setbtnLoader(false);

      //           alert(result.data.error);
      //           return;
      //         }
      //         if (result.data) {
      //           setbtnLoader(false);
      //           props.history.push("/dishes");
      //           console.log("result after adding>>>", result);
      //         }
      //       }
      //     });
    }
  };

  return (
    <>
      <AppLayout>
        <Row>
          <Col></Col>
          <Col sm={8}>
            <Card
              style={{
                padding: "50px",
                paddingLeft: "100px",
                paddingRight: "100px",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <h4>Contact Us</h4>
              </div>

              <p style={{ color: "red" }}>{errorMsg}</p>
              <br />
              <FormGroup>
                <Label
                  style={{
                    color: errorMsgBoolean && Name === "" ? "red" : "black",
                  }}
                  for="Name"
                >
                  Name
                </Label>
                <Input
                  type="text"
                  name="Name"
                  value={Name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  id="Name"
                  placeholder="Name"
                />
              </FormGroup>

              <Row>
                <Col>
                  <FormGroup>
                    <Label
                      style={{
                        color:
                          errorMsgBoolean && Email === "" ? "red" : "black",
                      }}
                      for="Email"
                    >
                      Email
                    </Label>
                    <Input
                      type="text"
                      name="Email"
                      value={Email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      id="Email"
                      placeholder="Email"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label
                      style={{
                        color:
                          errorMsgBoolean && Phone === "" ? "red" : "black",
                      }}
                      for="Phone"
                    >
                      Phone
                    </Label>

                    <Input
                      type="text"
                      name="Phone"
                      value={Phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                      id="Phone"
                      placeholder="Phone"
                    />
                  </FormGroup>
                </Col>{" "}
              </Row>

              <br />

              <FormGroup>
                <Label
                  style={{
                    color: errorMsgBoolean && Message === "" ? "red" : "black",
                  }}
                  for="Message"
                >
                  Message
                </Label>
                <Input
                  style={{
                    minHeight: "150px",
                  }}
                  type="textarea"
                  name="Message"
                  value={Message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                  id="Message"
                  placeholder="Message"
                />
              </FormGroup>

              <div
                style={{
                  width: "100%",
                  marginTop: "20px",
                  textAlign: "center",
                }}
              >
                <Button
                  disabled={btnLoader ? true : undefined}
                  color="primary"
                  outline
                  style={{
                    marginLeft: "10px",
                    width: "250px",
                  }}
                  onClick={() => {
                    registerMessage();
                  }}
                >
                  Subbmit
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

              <br />
              <br />
              <br />
             
            </Card>
          </Col>
          <Col></Col>
        </Row>
      </AppLayout>
    </>
  );
};

export default withRouter(ContactUs);
