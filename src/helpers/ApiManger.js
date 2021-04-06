import axios from "axios";
// import { LocalStorage } from "./LocalStorage";

// let user = new LocalStorage().getUserData();
// user = JSON.parse(user);

export default class ApiManager {
  //   userId = user.userId;
  //   userName = user.name;

  // LocalHost
  // check before deploy
  _BASE_URL = "https://sheh-app-node.herokuapp.com/api/";
  // _BASE_URL = "http://localhost:4003/api/";

  //USERS
  _USER_SIGNUP = "users/create";
  _USER_LOGIN = "users/login";
  _USER_UPDATE = "users/update";
  _USER_GET_BY_ID = "users/get-by-id";
  _USER_GET = "users/get";
  _USER_GET_CHEFS = "users/getchefs";
  _USER_GET_ALL = "users/get-all";
  _USER_UPDATE_AVAIL = "users/updateavail";
  _GET_CHEF_ZIP = "users/get-chef-zip";

  _USER_GET_PRE_CHAT = "chat/get-pre-chat";

  _PAYMENT = "pay/payment";

  _UPLOAD_BOOK = "books/upload";
  _GET_BOOK = "books/get";
  _GET_BOOK_BY_CHEF_ID = "books/get-by-chef-id";
  _DELETE_BOOK = "books/delete";

  // _USER_FOLLOW = "followers/create";
  // _USER_GET_FOLLOWERS = "followers/get-by-follower-id";
  // _USER_GET_FOLLOWing = "followers/get-by-following-id";
  // _USER_GET_CHAT_USERS = "followers/get-chat-users";
  // _USER_UPDATE_FOLLOWER_READ = "followers/update-read";

  // POST
  _ADD_POST = "post/create";
  _GET_POST = "post/get";
  _GET_POST_BY_CHEF_ID = "post/get-by-chef-id";
  _DELETE_POST = "post/delete";
  _OFFER_DISCOUNT_POST = "post/discount";
  // _GET_POST_BY_ID = "post/get";
  _GET_POST_BY_CREATOR_ID = "post/get-dish-by-chef-id";
  _GET_POST_BY_USER_ID = "post/get-by-user-id";

  _ADD_ORDER = "order/create";
  _GET_ORDER = "order/get";
  _DELETE_ORDER = "order/delete";
  _GET_ORDER_BY_ID = "order/get";
  _GET_ORDER_BY_CHEF_ID = "order/get-by-chef-id";
  _UPDATED_ORDER_STATUS = "order/updatestatus";
  _UPDATED_ORDER_PICKUP = "order/updatepickup";

  _UPDATED_ORDER_DELIVER_TIME = "order/updatedelivertime";

  //Videos
  _ADD_VIDEO = "videos/create";
  _GET_VIDEO = "videos/get";
  _GET_VIDEO_BY_CHEF_ID = "videos/get-by-chef-id";
  _DELETE_VIDEO = "videos/delete";
  _GET_VIDEO_BY_ID = "videos/get";

  // Comments
  _ADD_COMMENTS = "comments/create";
  _GET_COMMENTS = "comments/get";
  _DELETE_COMMENTS = "comments/delete";
  _GET_COMMENTS_BY_POST_ID = "comments/get-by-post-id";

  async sendPostRequest(_url, _params, headers) {
    _url = this._BASE_URL + _url;
    console.log("API _url", _url);

    if (!_params) {
      _params = {};
    }
    if (!headers) {
      headers = {
        "Content-Type": "application/json",
      };
    }

    try {
      let response = await axios({
        method: "post",
        url: _url,
        headers: headers,
        data: _params,
        timeout: 50000,
      });
      console.log("API call response", response);
      return response;
    } catch (error) {
      let err = [];
      err.error = error;
      err.no_result = true;
      console.log("catch error on ", _url, " call fail", err);
      setTimeout(() => {
        alert("Unable to connect with server");
      }, 400);
      return err;
    }
  }

  //USER FUNCTIONS
  //SingUp
  singUp(name, email, password, role, type, zip) {
    let url = this._USER_SIGNUP;
    let userData = {
      userName: name,
      userEmail: email,
      userPassword: password,
      userRole: role,
      type: type,
      zip: zip,
    };
    // console.log("data for adding>>>>>", userData);
    return this.sendPostRequest(url, userData, this.headers);
  }

  updateUser(
    id,
    profileImage,
    userName,
    userEmail,
    phone,
    aboutMe,
    location,
    creditCard,
    emailVerify,
    facebook,
    twitter,
    instagram,
    paypalId
  ) {
    let url = this._USER_UPDATE;

    const formData = new FormData();
    formData.append("id", id);
    formData.append("userEmail", userEmail);
    formData.append("phone", phone);
    formData.append("userName", userName);
    formData.append("profileImage", profileImage);
    formData.append("aboutMe", aboutMe);
    formData.append("location", location);
    formData.append("creditCard", creditCard);
    formData.append("emailVerify", emailVerify);
    formData.append("facebook", facebook);
    formData.append("twitter", twitter);
    formData.append("instagram", instagram);
    formData.append("paypalId", paypalId);

    // let data = {
    //   id: id,
    //   userEmail: userEmail,
    //   userName: userName,
    //   profileImage: profileImage,
    //   aboutMe: aboutMe,
    //   location: location,
    //   creditCard: creditCard,
    //   emailVerify: emailVerify,
    //   userPassword: userPassword,
    // }
    return this.sendPostRequest(url, formData, this.headers);
  }

  //SignIn
  signIn(email, password) {
    let url = this._USER_LOGIN;

    let userData = {
      userEmail: email,
      userPassword: password,
    };
    return this.sendPostRequest(url, userData, this.headers);
  }

  payment(token, products, username, userid, total) {
    let url = this._PAYMENT;
    let data = {
      token: token,
      products: products,
      userName: username,
      userId: userid,
      total: total,
    };
    return this.sendPostRequest(url, data, this.headers);
  }

  updateAvailabal(id, available) {
    let url = this._USER_UPDATE_AVAIL;
    let data = {
      id: id,
      available: available,
    };
    // console.log("getting user by id>>>>", id)
    return this.sendPostRequest(url, data, this.headers);
  }

  getUsers(id) {
    let url = this._USER_GET;
    let data = {
      id: id,
    };
    // console.log("getting user by id>>>>", id)
    return this.sendPostRequest(url, data, this.headers);
  }

  getAllUsers() {
    let url = this._USER_GET_ALL;
    // console.log("getting user by id>>>>", id)
    return this.sendPostRequest(url, "", this.headers);
  }

  getChefs() {
    let url = this._USER_GET_CHEFS;
    // console.log("getting user by id>>>>", id)
    return this.sendPostRequest(url, "", this.headers);
  }

  //User by ID
  userById(id) {
    let url = this._USER_GET_BY_ID;
    let userId = { id: id };
    // console.log("getting user by id>>>>", id)
    return this.sendPostRequest(url, userId, this.headers);
  }

  follow(
    followerId,
    followerName,
    followerImage,
    followingId,
    followingName,
    followingImage
  ) {
    let url = this._USER_FOLLOW;
    let data = {
      followerId: followerId,
      followerName: followerName,
      followerImage: followerImage,
      followingId: followingId,
      followingName: followingName,
      followingImage: followingImage,
    };
    console.log("adading data>>>>", data);

    return this.sendPostRequest(url, data, this.headers);
  }

  updateFollowerRead(id, read) {
    let url = this._USER_UPDATE_FOLLOWER_READ;
    let data = {
      id: id,
      read: true,
    };
    return this.sendPostRequest(url, data, this.headers);
  }

  getFollowers(id) {
    let url = this._USER_GET_FOLLOWERS;
    let userId = { followerId: id };
    // console.log("getting foloower by id>>>>", id);
    return this.sendPostRequest(url, userId, this.headers);
  }
  getFollowing(id) {
    let url = this._USER_GET_FOLLOWing;
    let data = { followingId: id };
    // console.log("getting folowing by id>>>>", id);
    return this.sendPostRequest(url, data, this.headers);
  }
  getChatUsers(id) {
    let url = this._USER_GET_CHAT_USERS;
    let data = { followingId: id };
    // console.log("getting chat users by id>>>>", id);
    return this.sendPostRequest(url, data, this.headers);
  }
  getPreChat(fromId, toId) {
    let url = this._USER_GET_PRE_CHAT;
    let data = { fromId: fromId, toId: toId };
    console.log("getting pre chat >>>", data);
    return this.sendPostRequest(url, data, this.headers);
  }

  uploadBook(title, book, userId, userName) {
    let url = this._UPLOAD_BOOK;
    let formData = new FormData();
    formData.append("file", book);
    formData.append("title", title);
    formData.append("userId", userId);
    formData.append("userName", userName);
    return this.sendPostRequest(url, formData, this.headers);
  }

  getBooks() {
    let url = this._GET_BOOK;
    return this.sendPostRequest(url, "", this.headers);
  }

  getBooksByChefId(id) {
    let url = this._GET_BOOK_BY_CHEF_ID;
    let data = { id: id };
    return this.sendPostRequest(url, data, this.headers);
  }

  //POST  FUNCTIONS
  registerPost(
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
  ) {
    let url = this._ADD_POST;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image", image);
    formData.append("image1", image1);
    formData.append("image2", image2);
    formData.append("image3", image3);
    formData.append("image4", image4);
    formData.append("video", video);
    formData.append("userId", userId);
    formData.append("userName", userName);
    formData.append("userEmail", userEmail);
    formData.append("userPhone", userPhone);
    formData.append("type", type);
    formData.append("delivery", delivery);
    // console.log("formDataformData>>>>>", formData);
    return this.sendPostRequest(url, formData, this.headers);
  }
  // Get post List
  getPosts() {
    let url = this._GET_POST;
    return this.sendPostRequest(url, this.headers);
  }

  getPostsByChefId(id) {
    let url = this._GET_POST_BY_CHEF_ID;
    let data = {
      id: id,
    };
    return this.sendPostRequest(url, data, this.headers);
  }
  getChefZip(zip) {
    let url = this._GET_CHEF_ZIP;
    let data = {
      zip: zip,
    };
    return this.sendPostRequest(url, data, this.headers);
  }

  getPostsByUserId(id) {
    let data = {
      id: id,
    };
    let url = this._GET_POST_BY_USER_ID;
    return this.sendPostRequest(url, data, this.headers);
  }

  getPostsByCreatorId(id) {
    let url = this._GET_POST_BY_CREATOR_ID;
    let data = { userId: id };
    // console.log("get data by>>>>", id);
    return this.sendPostRequest(url, data, this.headers);
  }

  offerDiscount(id, val) {
    let url = this._OFFER_DISCOUNT_POST;
    let data = { id: id, price: val };
    // console.log("get data by>>>>", id);
    return this.sendPostRequest(url, data, this.headers);
  }

  registerComment(comment, commentPostId, commentUserId, commentUserName) {
    let url = this._ADD_COMMENTS;
    let data = {
      comment: comment,
      commentPostId: commentPostId,
      commentUserId: commentUserId,
      commentUserName: commentUserName,
    };
    // console.log("adding data>>>>", data);
    return this.sendPostRequest(url, data, this.headers);
  }
  // Get Comments List
  getCommentsByPostId(id) {
    let url = this._GET_COMMENTS_BY_POST_ID;
    let data = { commentPostId: id };
    // console.log("getting by id>>>>", id);
    return this.sendPostRequest(url, data, this.headers);
  }

  //Videos  FUNCTIONS
  registerVideo(title, description, video, userId, userName) {
    let url = this._ADD_VIDEO;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("video", video);
    formData.append("userId", userId);
    formData.append("userName", userName);
    return this.sendPostRequest(url, formData, this.headers);
  }
  // Get Video List
  getVideos() {
    let url = this._GET_VIDEO;
    return this.sendPostRequest(url, this.headers);
  }

  getVideosByChefId(id) {
    let url = this._GET_VIDEO_BY_CHEF_ID;
    let data = {
      id: id,
    };
    return this.sendPostRequest(url, data, this.headers);
  }

  deleteDish(id) {
    let url = this._DELETE_POST;
    let data = { id: id };
    return this.sendPostRequest(url, data, this.headers);
  }
  deleteVideo(id) {
    let url = this._DELETE_VIDEO;
    let data = { id: id };
    return this.sendPostRequest(url, data, this.headers);
  }
  deleteBook(id) {
    let url = this._DELETE_BOOK;
    let data = { id: id };
    console.log("-----", id);
    return this.sendPostRequest(url, data, this.headers);
  }

  registerOrder(
    itemArray,
    userId,
    userName,
    email,
    contact,
    address,
    status,
    total
  ) {
    let url = this._ADD_ORDER;
    let data = {
      itemArray: itemArray,
      userId: userId,
      userName: userName,
      email: email,
      contact: contact,
      address: address,
      status: status,
      total: total,
    };
    console.log("-----", data);
    return this.sendPostRequest(url, data, this.headers);
  }
  getOrder(id) {
    let url = this._GET_ORDER;
    let data = { userId: id };
    return this.sendPostRequest(url, data, this.headers);
  }

  getOrdersByChefId(id) {
    let url = this._GET_ORDER_BY_CHEF_ID;
    let data = { id: id };
    return this.sendPostRequest(url, data, this.headers);
  }

  updateOrderStatus(id, status) {
    let url = this._UPDATED_ORDER_STATUS;
    let data = { id: id, status: status };
    return this.sendPostRequest(url, data, this.headers);
  }

  updateOrderPickup(id, pickup) {
    let url = this._UPDATED_ORDER_PICKUP;
    let data = { id: id, pickup: pickup };
    return this.sendPostRequest(url, data, this.headers);
  }

  updateOrderDeliverTime(id, date, time) {
    let url = this._UPDATED_ORDER_DELIVER_TIME;
    let data = { id: id, deliverTime: time, deliverDate: date };
    return this.sendPostRequest(url, data, this.headers);
  }
}
