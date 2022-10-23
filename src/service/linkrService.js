import axios from "axios";

/* const BASE_URL = "link-depploy-heroku"; */

const BASE_URL = "http://localhost:4000";

function createHeaders() {
    const auth = JSON.parse(localStorage.getItem("token"));
    
   
    const config = {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    };
  
    return config;
  };

  function postSignUp(body) {
    const promise = axios.post(`${BASE_URL}/auth/sign-up`, body);
    return promise;
  };
  
  function postSignIn(body) {
    const promise = axios.post(`${BASE_URL}/auth/sign-in`, body);
    return promise;
  };
  function postPublication(body){
    const config = createHeaders();
    const promise = axios.post(`${BASE_URL}/timeline`, body,config);
    return promise;
  };
  function getPublications(){
    const config = createHeaders();
    const promise = axios.get(`${BASE_URL}/timeline`,config);
    return promise;
  }
  function getHashtagTrending () {
    const config = createHeaders();
    const promise = axios.get(`${BASE_URL}/trending`, config);
    return promise;
  }

  function getHashtagPosts(hashtagName){
    const config = createHeaders();
    const promise=axios.get(`${BASE_URL}/hashtag/${hashtagName}`,config);
    return promise;
  }

  export { postSignUp, postSignIn, postPublication,getPublications, getHashtagTrending, getHashtagPosts  };
