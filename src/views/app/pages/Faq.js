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
import { Collapse, Button } from "reactstrap";

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

const Faq = (props) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [errorMsgBoolean, setErrorMsgBoolean] = useState(false);
  const [btnLoader, setbtnLoader] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const [isOpen1, setIsOpen1] = useState(false);
  const toggle1 = () => setIsOpen1(!isOpen1);

  const [isOpen2, setIsOpen2] = useState(false);
  const toggle2 = () => setIsOpen2(!isOpen2);

  const [isOpen3, setIsOpen3] = useState(false);
  const toggle3 = () => setIsOpen3(!isOpen3);

  const [isOpen4, setIsOpen4] = useState(false);
  const toggle4 = () => setIsOpen4(!isOpen4);

  const [isOpen5, setIsOpen5] = useState(false);
  const toggle5 = () => setIsOpen5(!isOpen5);

  const [isOpen6, setIsOpen6] = useState(false);
  const toggle6 = () => setIsOpen6(!isOpen6);

  const [isOpen7, setIsOpen7] = useState(false);
  const toggle7 = () => setIsOpen7(!isOpen7);

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
              <div style={{ textAlign: "center" }}>
                <h1>Frequently Asked Questions</h1>
              </div>
              <br />
              <div style={{ textAlign: "left" }}>
                <br />
                <br />
                <div>
                  <h1 onClick={toggle} style={{ marginBottom: "" }}>
                    What Makes Chef Unique?
                  </h1>
                  <Collapse isOpen={isOpen}>
                    <Card>
                      <CardBody>
                        Chef is unique because it was created by the people and
                        for the people. Chef provides a vast network of
                        independent chefs with a way to leverage their talents
                        into income. It also gives millions of people across the
                        globe the tools they need to connect with their food and
                        the people cooking it.
                      </CardBody>
                    </Card>
                  </Collapse>
                </div>

                <br />
                <div>
                  <h1 onClick={toggle1} style={{ marginBottom: "" }}>
                    How can i be successful with Chef?
                  </h1>
                  <Collapse isOpen={isOpen1}>
                    <Card>
                      <CardBody>
                        Becoming a successful Chef and growing your following is
                        as easy as signing up, configuring your profile, and
                        creating a solid offering of culture-rich dishes.
                      </CardBody>
                    </Card>
                  </Collapse>
                </div>

                <br />
                <div>
                  <h1 onClick={toggle7} style={{ marginBottom: "" }}>
                    What are the benefits of using Chef?
                  </h1>
                  <Collapse isOpen={isOpen7}>
                    <Card>
                      <CardBody>
                        Chef is a specialized platform that allows you to grow
                        your following based on the merit of your cooking skills
                        and the service that you provide. Visitors that come to
                        Chef know what they are looking for and can find you and
                        hire you for your talents.
                      </CardBody>
                    </Card>
                  </Collapse>
                </div>

                <br />
                <div>
                  <h1 onClick={toggle2} style={{ marginBottom: "" }}>
                    How Chef assists in making me successful?
                  </h1>
                  <Collapse isOpen={isOpen2}>
                    <Card>
                      <CardBody>
                        When you’re successful, we’re successful. That is why we
                        give our Chefs all the tools to succeed. We know what’s
                        happening in the culinary world, and we provide our
                        Chefs with as much guidance as possible.
                      </CardBody>
                    </Card>
                  </Collapse>
                </div>

                <br />
                <div>
                  <h1 onClick={toggle3} style={{ marginBottom: "" }}>
                    What is the neighborhood feature?
                  </h1>
                  <Collapse isOpen={isOpen3}>
                    <Card>
                      <CardBody>
                        The neighborhood feature of Chefs is one of the best
                        features that make Chefs unique from all the rest. Use
                        the neighborhood feature to connect with others in your
                        location, learn about local cuisine, and organize
                        culinary events.
                      </CardBody>
                    </Card>
                  </Collapse>
                </div>

                <br />
                <div>
                  <h1 onClick={toggle4} style={{ marginBottom: "" }}>
                    How i do connect with my Chef?
                  </h1>
                  <Collapse isOpen={isOpen4}>
                    <Card>
                      <CardBody>
                        Unlike the impersonality of food delivery services and
                        takeout, Chef allows individuals to connect with the
                        people that cook their food, known as Chefs. You can
                        talk to your Chef about your dish and connect with your
                        food as it was meant to be.
                      </CardBody>
                    </Card>
                  </Collapse>
                </div>

                <br />
                <div>
                  <h1 onClick={toggle5} style={{ marginBottom: "" }}>
                    What do i do if i have questions or concerns?
                  </h1>
                  <Collapse isOpen={isOpen5}>
                    <Card>
                      <CardBody>
                        We have a helpful and accessible support team that can
                        address any questions or concerns that you might have.
                        We love hearing feedback from the Chefs community
                      </CardBody>
                    </Card>
                  </Collapse>
                </div>
              </div>
              <br />
            </div>
          </Col>
        </Row>
      </AppLayout>
    </>
  );
};

export default withRouter(Faq);
