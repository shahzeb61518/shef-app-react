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

const Policies = (props) => {
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
    }
  };

  return (
    <>
      <AppLayout>
        <Row>
          <Col sm={12}>
            <div
              style={{
                padding: "50px",
              }}
            >
              <div style={{ textAlign: "left" }}>
                <h1>Privacy</h1>
                <p>
                  Protecting your private information is our priority. This
                  Statement of Privacy applies to the{" "}
                  <a
                    style={{ color: "lightgray", cursor: "pointer" }}
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://chef-frontend.herokuapp.com"
                  >
                    Https://chef-frontend.herokuapp.com
                  </a>{" "}
                  and governs data collection and usage. For the purposes of
                  this Privacy Policy, unless otherwise noted, all references to
                  Chef include{" "}
                  <a
                    style={{ color: "lightgray", cursor: "pointer" }}
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://chef-frontend.herokuapp.com"
                  >
                    Https://chef-frontend.herokuapp.com
                  </a>{" "}
                  . The
                  <a
                    style={{ color: "lightgray", cursor: "pointer" }}
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://chef-frontend.herokuapp.com"
                  >
                    Https://chef-frontend.herokuapp.com
                  </a>{" "}
                  website is a hire a Chef service site. By using the{" "}
                  <a
                    style={{ color: "lightgray", cursor: "pointer" }}
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://chef-frontend.herokuapp.com"
                  >
                    Https://chef-frontend.herokuapp.com
                  </a>{" "}
                  website, you consent to the data practices described in this
                  statement.
                  <p></p>
                  <p>
                    Web browsers such as Internet Explorer, Firefox and Chrome
                    also display a padlock icon in the address bar to visually
                    indicate that a HTTPS connection is in effect.
                  </p>
                  <p>
                    <a
                      style={{ color: "lightgray", cursor: "pointer" }}
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://chef-frontend.herokuapp.com"
                    >
                      Https://chef-frontend.herokuapp.com
                    </a>{" "}
                    ’s strict policy towards privacy and security are governed
                    by using HTTPS in their linking address (URL) to the
                    website. Hyper Text Transfer Protocol Secure (HTTPS) is the
                    secure version of HTTP, the protocol over which data is sent
                    between your browser and the website that you are connected
                    to. The ‘S’ at the end of HTTPS stands for ‘Secure’. It
                    means all communications between your browser and the
                    website are encrypted. HTTPS is often used to protect highly
                    confidential online transactions like online banking and
                    online shopping order forms.
                  </p>
                </p>
              </div>
              <br />
              <div style={{ textAlign: "left" }}>
                <h1>INFORMATION WE COLLECT AND HOW WE USE IT</h1>
                <p>
                  In order to provide you with the Service, upon booking the
                  Chef Services, you will be asked to provide your first and
                  last name, email address, telephone number, event address,
                  home region and city/ location along with some additional
                  information such as the name of the Chef, the name of the
                  menu, the date of the event (hereinafter, the “Event Date”),
                  number of guests and any other specific requirements, such as
                  dietary requirements.{" "}
                </p>
                <p>
                  If you are a Chef using the Service will ask you for your
                  first and last name, email address, phone number, state and
                  location, date of birth (optional), ABN, and bank account
                  details to proceed your payments. We will also need to know
                  some non-personal information, such as but not limited to the
                  locations you are willing to serve, your Chef menus as well as
                  menu requirements.
                </p>
              </div>
              <br />
              <div style={{ textAlign: "left" }}>
                <h1>DOES Chef SHARE MY PERSONAL INFORMATION?</h1>
                <p>
                  <a
                    style={{ color: "lightgray", cursor: "pointer" }}
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://chef-frontend.herokuapp.com"
                  >
                    Https://chef-frontend.herokuapp.com
                  </a>{" "}
                  does not sell or rent your information. We disclose your
                  Personal Information only when:
                </p>
                <p>
                  <ul>
                    <li>
                      We have your explicit permission to share your Personal
                      Information.
                    </li>
                    <li>
                      We need to share your Personal Information with your Chef
                      or Member to provide the Service.
                    </li>
                    <li>
                      We need to share your Personal Information with
                      third-party service providers who process data on our
                      behalf in order to complete your payment transactions.
                    </li>
                    <li>
                      We employ third-party service providers to facilitate our
                      Service, to provide the Service on our behalf, or to
                      perform Site-related services, and these providers are
                      subject to strict data protection requirements.
                    </li>
                    <li>
                      We believe it is necessary to disclose Personal
                      Information to investigate potential violations of our
                      Terms of Service and/or to enforce our Terms of Service.
                    </li>
                    <li>
                      We believe it is necessary to disclose Personal
                      Information to investigate or prevent potential illegal
                      activities, suspected fraud, or possible threats against
                      persons, property, or the systems on which we operate the
                      Site and the Service.
                    </li>
                    <li>
                      We determine that the access, preservation, or disclosure
                      of Personal Information is required or permitted by law to
                      protect the rights, property, or personal safety of
                      <a
                        style={{ color: "lightgray", cursor: "pointer" }}
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://chef-frontend.herokuapp.com"
                      >
                        Https://chef-frontend.herokuapp.com
                      </a>{" "}
                      and its Users, or is required to comply with applicable
                      laws, including compliance with warrants, court orders, or
                      other legal process.
                    </li>
                    <li>
                      We share your Personal Information in connection with the
                      sale or reorganization of all or part of our business, as
                      permitted by applicable law.
                    </li>
                  </ul>
                </p>
              </div>
              <br />
              <div style={{ textAlign: "left" }}>
                <h1>COOKIES & LOCAL STORAGE</h1>
                <p>
                  When you access or use the Service, Company may use
                  industry-wide technologies such as “cookies” and Flash (or
                  similar technologies), which stores certain information on
                  your computer (“Local Storage”) and which will allow us to
                  enable automatic activation of certain features, and make your
                  Service experience much more convenient and effortless. The
                  cookies used by the Service are created per session, does not
                  include any information about you, other than your session key
                  and are removed as your session ends (usually after 24 hours).
                  It is easy to prohibit the Local Storage. Most browsers will
                  allow you to erase cookies from your computer’s hard drive,
                  block acceptance of cookies, or receive a warning before a
                  cookie is stored. In order to erase or disable the Local
                  Storage option in Flash you should use the settings option of
                  Flash according to the specific instructions provided by the
                  technology provider. However, if you block or erase cookies,
                  or change the settings of Flash, your online experience may be
                  limited.
                </p>
              </div>
              <br />
              <div style={{ textAlign: "left" }}>
                <h1>LINKS TO THIRD PARTY WEBSITE</h1>
                <p>
                  This Web site contains “links” to other sites. We try to link
                  only to sites that share our high standards and respect for
                  privacy. However, we cannot be responsible for the content or
                  privacy practices employed by other sites. We encourage you to
                  review the privacy policies of these Web sites before
                  disclosing any personal information
                </p>
              </div>
              <br />
              <div style={{ textAlign: "left" }}>
                <h1>CHANGES TO THIS PRIVACY POLICY</h1>
                <p>
                  <a
                    style={{ color: "lightgray", cursor: "pointer" }}
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://chef-frontend.herokuapp.com"
                  >
                    Https://chef-frontend.herokuapp.com
                  </a>{" "}
                  will occasionally update this Statement of Privacy to reflect
                  company and customer feedback.
                  <a
                    style={{ color: "lightgray", cursor: "pointer" }}
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://chef-frontend.herokuapp.com"
                  >
                    Https://chef-frontend.herokuapp.com
                  </a>{" "}
                  encourages you to periodically review this Statement to be
                  informed of how{" "}
                  <a
                    style={{ color: "lightgray", cursor: "pointer" }}
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://chef-frontend.herokuapp.com"
                  >
                    Https://chef-frontend.herokuapp.com
                  </a>{" "}
                  is protecting your information
                </p>
              </div>
              <br />
              <div style={{ textAlign: "left" }}>
                <h1>CONTACTING US</h1>
                <p>
                  If you have any queries relating to the processing/usage of
                  information provided by you or Chef’s Privacy Policy, you may
                  email us at info@chef.com/
                </p>
              </div>
              <br />
            </div>
          </Col>
        </Row>
      </AppLayout>
    </>
  );
};

export default withRouter(Policies);
