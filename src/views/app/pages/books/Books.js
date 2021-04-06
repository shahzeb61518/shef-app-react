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
  Spinner,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import LinesEllipsis from "react-lines-ellipsis";
import responsiveHOC from "react-lines-ellipsis/lib/responsiveHOC";
import { NavLink, withRouter, Link } from "react-router-dom";
import Breadcrumb from "../../../../containers/navs/Breadcrumb";
import AppLayout from "../../../../layout/AppLayout";
import {
  Separator,
  Colxx,
} from "../../../../components/common/CustomBootstrap";
import { blogData } from "../../../../data/blog";
import ApiManager from "../../../../helpers/ApiManger";
import { reactLocalStorage } from "reactjs-localstorage";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  FormGroup,
  Input,
} from "reactstrap";

import img from "./../img/book.jpg";

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

const Books = (props) => {
  const [booksData, setbooksData] = useState([]);
  const [creatorBlogData, setCreatorBlogData] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [userRole, setUserRole] = useState("");

  const [book, setBook] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");

  const [bookLabel, setBookLabel] = useState("");

  const [modal, setModal] = useState(false);
  const [loader, setLoader] = useState(true);
  const [modalDelete, setModalDelete] = useState(false);
  const [bookId, setBookId] = useState("");

  useEffect(() => {
    check();
    // getPosts();
  }, []);

  const check = async () => {
    let user = await reactLocalStorage.get("user_data");
    if (user) {
      console.log(user);
      user = JSON.parse(user);
      setUserId(user.userId);
      setUserName(user.namef);
      setUserRole(user.role);

      if (user.role === "chef") {
        getBooksByChefId(user.userId);
      } else {
        getBooks();
      }
    }

    // if (user.role === "creator") {
    // getBlogsByCreatorId(user.userId);
    // } else {
    // getPostsByUserId(user.userId);
    // }
  };

  const getBooks = () => {
    new ApiManager().getBooks().then((result) => {
      if (result.no_result) {
        return;
      }
      if (result.data) {
        if (result.data.error) {
          alert(result.data.error);
          return;
        }

        if (result.data) {
          setbooksData(result.data.list);
          setLoader(false);
        }

        console.log("result>>>", result);
      }
    });
  };

  const getBooksByChefId = (id) => {
    new ApiManager().getBooksByChefId(id).then((result) => {
      if (result.no_result) {
        return;
      }
      if (result.data) {
        if (result.data.error) {
          alert(result.data.error);
          return;
        }

        if (result.data) {
          setbooksData(result.data.list);
          setLoader(false);
        }

        console.log("result>>>", result);
      }
    });
  };

  const uploadBook = () => {
    setLoader(true);
    new ApiManager()
      .uploadBook(title, book, userId, userName)
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
            if (userRole === "chef") {
              getBooksByChefId(userId);
            } else {
              getBooks();
            }
            console.log("result>>>", result);
          }
        }
      });
  };

  const deleteBook = () => {
    setLoader(true);
    console.log("fsasdads", bookId);
    new ApiManager().deleteBook(bookId).then((result) => {
      if (result.no_result) {
        return;
      }
      if (result.data) {
        if (result.data.error) {
          alert(result.data.error);
          return;
        }

        if (result.data) {
          getBooks();
          setModalDelete(false);
          setBookId("");
          console.log("result after adding>>>", result);
        }
      }
    });
  };

  const ModalDelete = (props) => {
    const toggle = () => setModalDelete(!modalDelete);
    return (
      <div>
        <Modal isOpen={modalDelete} toggle={toggle}>
          <ModalHeader toggle={toggle}>Confirmation</ModalHeader>
          <ModalBody>
            <h4>Are you sure you want to delete this?</h4>
          </ModalBody>
          <ModalFooter>
            <Button color='secondary' onClick={toggle}>
              No
            </Button>
            <Button
              color='primary'
              onClick={() => {
                deleteBook();
              }}>
              Yes
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </div>
    );
  };

  const ModalExample = (props) => {
    const toggle = () => setModal(!modal);
    return (
      <div>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Upload Book</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for='title'>Title</Label>
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

            <FormGroup>
              <Label for='book'>Upload your book.</Label>

              <Input
                type='file'
                onChange={(event) => {
                  setBook(event.target.files[0]);
                }}
              />
            </FormGroup>
            <Label for='book1' style={{ color: "red" }}>
              {bookLabel}
            </Label>
          </ModalBody>
          <ModalFooter>
            <Button color='secondary' onClick={toggle}>
              Cancel
            </Button>
            <Button
              color='primary'
              onClick={() => {
                if (book === "" || title === "") {
                  return setBookLabel(
                    "Please choose book to upload and then click Upload Button"
                  );
                } else {
                  uploadBook();
                  setBookLabel("");
                  setModal(false);
                }
              }}>
              Upload
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </div>
    );
  };

  return (
    <>
      <AppLayout>
        {ModalExample()}
        {ModalDelete()}

        <Row>
          <Colxx xxs='12'>
            {userRole == "chef" ? (
              <Button
                color='primary'
                style={{
                  marginBottom: "20px",
                  width: "200px",
                }}
                onClick={() => {
                  setModal(true);
                }}>
                Upload Book
              </Button>
            ) : undefined}

            <br />
            <br />
            <br />
            <h1>Books</h1>
            <br />
          </Colxx>

          {!loader ? (
            booksData.length !== 0 ? (
              booksData.map((item, index) => {
                return (
                  <Colxx xxs='12' lg='4' className='mb-5' key={index}>
                    <Card
                      style={{ height: "220px" }}
                      className='flex-row listing-card-container'>
                      <div className='w-40 position-relative'>
                        <img className='card-img-left' src={img} alt='book' />
                      </div>

                      <div className='w-60 d-flex align-items-center'>
                        <CardBody>
                          <ResponsiveEllipsis
                            className='mb-3 listing-heading'
                            text={"Title " + item.title}
                            maxLine='2'
                            trimRight
                            basedOn='words'
                            component='h5'
                          />
                          <p>{"Chef " + item.userName}</p>
                          <br />
                          {item.created_at
                            ? "Uploaded " + moment(item.created_at).fromNow()
                            : undefined}
                          <br />
                          <br />
                          <a
                            href={item.file}
                            target='_blank'
                            rel='noopener noreferrer'
                            download={item.file}>
                            <Button>Download</Button>
                          </a>

                          {item.userId === userId ? (
                            <Button
                              color='primary'
                              onClick={() => {
                                setModalDelete(true);
                                setBookId(item._id);
                              }}>
                              <span className='simple-icon-trash'></span>
                            </Button>
                          ) : undefined}
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
                }}>
                <h5>No Book Uploaded Yet...</h5>
              </div>
            )
          ) : (
            <div
              style={{
                width: "100%",
                textAlign: "center",
                marginTop: "50px",
              }}>
              <Spinner color='primary' animation='border' role='status'>
                <span className='sr-only'>Loading...</span>
              </Spinner>
            </div>
          )}
        </Row>
        {/* <Row>
        <Colxx xxs="12">
          <Pagination listClassName="justify-content-center">
            <PaginationItem>
              <PaginationLink className="prev" href="#">
                <i className="simple-icon-arrow-left" />
              </PaginationLink>
            </PaginationItem>
            <PaginationItem active>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink className="next" href="#">
                <i className="simple-icon-arrow-right" />
              </PaginationLink>
            </PaginationItem>
          </Pagination>
        </Colxx>
      </Row> */}
      </AppLayout>
    </>
  );
};

export default withRouter(Books);
