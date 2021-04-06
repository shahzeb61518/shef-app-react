import React, { useState, useEffect } from "react";
import {
  Row,
  Card,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Button,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import { NotificationManager } from "../../components/common/react-notifications";
import { connect } from "react-redux";
import { registerUser } from "../../redux/actions";
import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";

import IntlMessages from "../../helpers/IntlMessages";
import { Colxx } from "../../components/common/CustomBootstrap";
import { adminRoot } from "../../constants/defaultValues";

import ApiManager from "../../helpers/ApiManger";

const Register = ({ history, error }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("chef");
  const [loading1, setLoading] = useState(false);
  const [type, setType] = useState("none");
  const [zip, setZip] = useState("");

  useEffect(() => {
    check();
  });

  const check = async () => {
    let user = await reactLocalStorage.get("user");

    if (user === "true") {
      console.log("uusserr :: ", user);
      return history.push("/profile");
    }
  };

  const onUserRegister = async () => {
    console.log("data :: ", password);
    setLoading(true);

    await new ApiManager()
      .singUp(name, email, password, role, type, zip)
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
            history.push("/user/login");
          }

          console.log("result after adding>>>", result);
        }
      });
    // await axios
    //   .post('https://marrage-backend.herokuapp.com/api/v1/auth/register', {
    //     name: name,
    //     email: email,
    //     password: password,
    //   })
    //   .then(async (res) => {
    //     history.push('/user/verify');
    //   })
    //   .catch((e) => {
    //     setLoading(false);
    //     NotificationManager.warning(
    //       null,
    //       'Email already exist',
    //       3000,
    //       null,
    //       null,
    //       ''
    //     );
    //   });
  };

  return (
    <Row className='h-100'>
      <Colxx xxs='12' md='10' className='mx-auto my-auto'>
        <Card className='auth-card'>
          <div className='position-relative image-side '>
            <p className='text-white h2'>CHEF</p>
            <p className='white mb-0'>
              Please use this form to register. <br />
              If you are a member, please{" "}
              <NavLink to='/user/login' className='white'>
                login
              </NavLink>
              .
            </p>
          </div>
          <div className='form-side'>
            <NavLink to='/dashboard'>
              <h4>Dashboard</h4>
            </NavLink>
            <br />
            <br />
            <br />
            <br />
            <br />

            <CardTitle className='mb-4'>SignUp</CardTitle>
            <Form>
              <FormGroup className='form-group has-float-label  mb-4'>
                <Label>
                  <IntlMessages id='user.fullname' />
                </Label>
                <Input
                  type='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label for='roleselect'>Role</Label>
                <Input
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                  type='select'
                  name='select'
                  id='roleselect'>
                  <option selected value='chef'>
                    Chef
                  </option>
                  <option value='user'>User</option>
                </Input>
              </FormGroup>

              {role === "chef" ? (
                <FormGroup className='form-group has-float-label  mb-4'>
                  <Label>
                    <IntlMessages id='Zip Code' />
                  </Label>
                  <Input
                    style={{ marginTop: "27px" }}
                    placeholder='Zip Code'
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                  />
                </FormGroup>
              ) : undefined}
              {/* <FormGroup>
                      <Label for='exampleSelect'>Type</Label>
                      <Input
                        type='select'
                        name='select'
                        id='exampleSelect'
                        onChange={(e) => {
                          setType(e.target.value);
                        }}>
                        <option selected value='none'>
                          None
                        </option>
                        <option value='indian'>Indian</option>
                        <option value='chinese'>Chinese</option>
                        <option value='japenese'>Japenese</option>
                        <option value='italian'>Italian</option>
                        <option value='caribbean'>Caribbean</option>
                      </Input>
                    </FormGroup> */}
              {/* <Input
                      style={{ marginTop: "27px" }}
                      placeholder='Zip Code'
                      disabled
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                    /> */}

              <FormGroup
                style={{ marginTop: "30px" }}
                className='form-group has-float-label  mb-4'>
                <Label>
                  <IntlMessages id='user.email' />
                </Label>
                <Input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>

              <FormGroup className='form-group has-float-label  mb-4'>
                <Label>
                  <IntlMessages id='user.password' />
                </Label>
                <Input
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>

              <div className='d-flex justify-content-between align-items-center'>
                <NavLink to='/user/login'>
                  <IntlMessages id='Login' />
                </NavLink>
                <Button
                  color='primary'
                  disabled={loading1}
                  className={"btn-shadow btn-multiple-state"}
                  size='lg'
                  onClick={() => onUserRegister()}>
                  SignUp
                </Button>
              </div>
            </Form>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};

export default Register;
