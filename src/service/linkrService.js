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

  function getHashtagTranding () {
    //const config = createHeaders();
    const promise = axios.get(`${BASE_URL}/teste`);
    return promise;
  }

  export { postSignUp, postSignIn,getHashtagTranding  };