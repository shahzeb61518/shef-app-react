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
// import { blogData } from "../../../../data/blog";
import ApiManager from "../../../../helpers/ApiManger";
import { reactLocalStorage } from "reactjs-localstorage";

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

const RegisterVideo = (props) => {
  const [postData, setPostData] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [errorMsgBoolean, setErrorMsgBoolean] = useState(false);

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
  };

  const registerVideo = async () => {
    if (
      title == "" ||
      description == "" ||
      video == "" ||
      userId == "" ||
      userName == ""
    ) {
      setErrorMsg("Please Fill The Required Fields!");
      setErrorMsgBoolean(true);
    } else {
      await new ApiManager()
        .registerVideo(title, description, video, userId, userName)
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
              props.history.push("/videos");
              console.log("result after adding>>>", result);
            }
          }
        });
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
              }}>
              <h4>Register Video</h4>
              <p style={{ color: "red" }}>{errorMsg}</p>
              <br />
              <FormGroup>
                <Label
                  style={{
                    color: errorMsgBoolean && title === "" ? "red" : "black",
                  }}
                  for='title'>
                  Title
                </Label>
                <Input
                  type='text'
                  name='title'
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  id='title'
                  placeholder='Title'
                />
              </FormGroup>

              <br />
              <Row>
                <Col>
                  <FormGroup>
                    <Label
                      style={{
                        color:
                          errorMsgBoolean && video === "" ? "red" : "black",
                      }}
                      for='video'>
                      Attach Video
                    </Label>

                    <Input
                      type='file'
                      onChange={(event) => {
                        setVideo(event.target.files[0]);
                      }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <br />

              <FormGroup>
                <Label
                  style={{
                    color:
                      errorMsgBoolean && description === "" ? "red" : "black",
                  }}
                  for='description'>
                  Description
                </Label>
                <Input
                  style={{
                    minHeight: "150px",
                  }}
                  type='textarea'
                  name='description'
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  id='description'
                  placeholder='description'
                />
              </FormGroup>

              <div
                style={{
                  width: "100%",
                  marginTop: "20px",
                  textAlign: "center",
                }}>
                <Button
                  color='primary'
                  style={{
                    width: "100px",
                  }}
                  onClick={() => {
                    props.history.push("/videos");
                  }}>
                  Back
                </Button>
                <Button
                  color='primary'
                  style={{
                    marginLeft: "10px",
                    width: "200px",
                  }}
                  onClick={() => {
                    registerVideo();
                  }}>
                  Save
                </Button>
              </div>
            </Card>
          </Col>
          <Col></Col>
        </Row>
      </AppLayout>
    </>
  );
};

export default withRouter(RegisterVideo);
