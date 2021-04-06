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

const RegisterPost = (props) => {
  const [postData, setPostData] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [video, setVideo] = useState("");
  const [image, setImage] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [type, setType] = useState("none");
  const [delivery, setDelivery] = useState("No");

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
        }

        console.log("result>>>", result);
      }
    });
  };

  const registerPost = async () => {
    if (
      title == "" ||
      description == "" ||
      price == "" ||
      image == "" ||
      userId == "" ||
      userName == ""
    ) {
      setErrorMsg("Please Fill The Required Fields!");
      setErrorMsgBoolean(true);
    } else {
      setbtnLoader(true);

      await new ApiManager()
        .registerPost(
          title,
          description,
          price,
          image,
          image1,
          image2,
          image3,
          image4,
          video,
          userId,
          userName,
          userEmail,
          userPhone,
          type,
          delivery
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
              setbtnLoader(false);
              props.history.push("/dishes");
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
              <h4>Register Dish</h4>

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

              <Row>
                <Col>
                  <FormGroup>
                    <Label
                      style={{
                        color:
                          errorMsgBoolean && price === "" ? "red" : "black",
                      }}
                      for='price'>
                      Price
                    </Label>
                    <Input
                      type='text'
                      name='price'
                      value={price}
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                      id='price'
                      placeholder='$ Price'
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for='delivery'>Offer Delivery</Label>
                    <Input
                      type='select'
                      name='delivery'
                      id='delivery'
                      onChange={(e) => {
                        setDelivery(e.target.value);
                      }}>
                      <option selected value='None'>
                        None
                      </option>
                      <option value='Yes'>Yes</option>
                      <option value='PickUp'>PickUp</option>
                    </Input>
                  </FormGroup>
                </Col>{" "}
              </Row>

              <Row>
                <Col>
                  <FormGroup>
                    <Label
                      style={{
                        color:
                          errorMsgBoolean && image === "" ? "red" : "black",
                      }}
                      for='image'>
                      Attach Image
                    </Label>
                    <Input
                      type='file'
                      onChange={(event) => {
                        setImage(event.target.files[0]);
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col></Col>
              </Row>

              {/* <br />
              <Label>Optional Images</Label>

              <Row>
                <Col>
                  <FormGroup>
                    <Label for='image1'>Attach Image 1</Label>
                    <Input
                      type='file'
                      onChange={(event) => {
                        setImage1(event.target.files[0]);
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for='image2'>Attach Image 2</Label>
                    <Input
                      type='file'
                      onChange={(event) => {
                        setImage2(event.target.files[0]);
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for='image3'>Attach Image 3</Label>
                    <Input
                      type='file'
                      onChange={(event) => {
                        setImage3(event.target.files[0]);
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for='image4'>Attach Image 4</Label>
                    <Input
                      type='file'
                      onChange={(event) => {
                        setImage4(event.target.files[0]);
                      }}
                    />
                  </FormGroup>
                </Col>
              </Row>
            */}
              <br />

              <FormGroup>
                <Label for='video'>Video</Label>
                <Input
                  type='file'
                  onChange={(event) => {
                    setVideo(event.target.files[0]);
                  }}
                />
              </FormGroup>

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
                    props.history.push("/dishes");
                  }}>
                  Back
                </Button>
                <Button
                  disabled={btnLoader ? true : undefined}
                  color='primary'
                  style={{
                    marginLeft: "10px",
                    width: "200px",
                  }}
                  onClick={() => {
                    registerPost();
                  }}>
                  Save
                  {btnLoader ? (
                    <Spinner
                      as='span'
                      animation='border'
                      size='sm'
                      role='status'
                      aria-hidden='true'
                    />
                  ) : undefined}
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

export default withRouter(RegisterPost);
