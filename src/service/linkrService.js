import axios from "axios";

//const BASE_URL = "https://project-linkr-back.herokuapp.com";

const BASE_URL = "http://localhost:4000";

function createHeaders() {
  const auth = JSON.parse(localStorage.getItem("token"));

  const config = {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  };

  return config;
}

function postSignUp(body) {
  const promise = axios.post(`${BASE_URL}/auth/sign-up`, body);
  return promise;
}

function postSignIn(body) {
  const promise = axios.post(`${BASE_URL}/auth/sign-in`, body);
  return promise;
}
function postPublication(body) {
  const config = createHeaders();
  const promise = axios.post(`${BASE_URL}/timeline`, body, config);
  return promise;
}
function getPublications() {
  const config = createHeaders();
  const promise = axios.get(`${BASE_URL}/timeline`, config);
  return promise;
}
function getHashtagTrending() {
  const config = createHeaders();
  const promise = axios.get(`${BASE_URL}/trending`, config);
  return promise;
}

function deletePost(postId) {
  const config = createHeaders();
  config.headers.data = postId.postId;
  const promise = axios.delete(`${BASE_URL}/timeline/${postId.postId}`, config);
  return promise;
}

function likePost(postId) {
  const config = createHeaders();
  const promise = axios.post(
    `${BASE_URL}/like/${postId.postId}`,
    postId,
    config
  );
  return promise;
}

function unlikePost(postId) {
  const config = createHeaders();
  config.headers.data = postId.postId;
  const promise = axios.delete(`${BASE_URL}/like/${postId.postId}`, config);
  return promise;
}

function getLikes(postId) {
  const promise = axios.get(`${BASE_URL}/like/${postId.postId}`);
  return promise;
}
function getUserLikes(postId, userId) {
  const promise = axios.get(`${BASE_URL}/like/${postId.postId}/${userId}`);
  return promise;
}

function getLikesInfo(postId) {
  const promise = axios.get(`${BASE_URL}/likes/${postId.postId}`);
  return promise;
}

function getHashtagPosts(hashtagName) {
  const config = createHeaders();
  const promise = axios.get(`${BASE_URL}/hashtag/${hashtagName}`, config);
  return promise;
}

function editPost(postId, body) {
  const config = createHeaders();
  const promise = axios.put(`${BASE_URL}/timeline/${postId}`, body, config);
  return promise;
}

function getComments(postId){
  const config = createHeaders();
  const promise = axios.get(`${BASE_URL}/comments/${postId}`,config);
  return promise;
}
function getCounting(postId){
  const config = createHeaders();
  const promise = axios.get(`${BASE_URL}/comments/count/${postId}`,config);
  return promise;
}

function postComments(postId,body){
  const config = createHeaders();
  const promise = axios.post(`${BASE_URL}/comments/${postId}`,body, config);
  return promise;
}

function getTimeline(id) {
  const promise = axios.post(`${BASE_URL}/user/${id}`, {});
  return promise;
}

function searchUser(value) {
  const userid = localStorage.getItem("userId");
  const promise = axios.get(
    `${BASE_URL}/users?filter=${value}&&userId=${userid}`
  );
  return promise;
}

function getFollowers() {
  const config = createHeaders();
  const promise = axios.get(`${BASE_URL}/followers`, config);
  return promise;
}

function getFollower(id) {
  const config = createHeaders();
  const promise = axios.get(`${BASE_URL}/follower/${id}`, config);
  return promise;
}

function followUser(id) {
  const config = createHeaders();
  const promise = axios.post(`${BASE_URL}/follow/${id}`, {}, config);
  return promise;
}

function unfollowUser(id) {
  const config = createHeaders();
  const promise = axios.delete(`${BASE_URL}/unfollow/${id}`, config);
  return promise;
}
function repostPost(postId) {
  const config = createHeaders();
  const promise = axios.post(
    `${BASE_URL}/repost/${postId.postId}`,
    postId,
    config
  );
  return promise;
}

function getReposts() {
  const promise = axios.get(`${BASE_URL}/reposts`);
  return promise;
}

function getRepostInfo(postId) {
  const promise = axios.get(`${BASE_URL}/reposts/${postId.postId}`);
  return promise;
}

function getFollowStatus(followerId, followedId){
  const config = createHeaders();
  const promise = axios.get(`${BASE_URL}/comments/follows/${followerId}/${followedId}`,config);
  return promise;
}

export {
  postSignUp,
  postSignIn,
  postPublication,
  getPublications,
  getHashtagTrending,
  deletePost,
  likePost,
  unlikePost,
  getLikes,
  getUserLikes,
  getLikesInfo,
  getHashtagPosts,
  editPost,
  getTimeline,
  searchUser,
  getFollowers,
  getFollower,
  followUser,
  unfollowUser,
  repostPost,
  getReposts,
  getRepostInfo,
  getComments,
  postComments,
  getCounting,
  getFollowStatus
};
