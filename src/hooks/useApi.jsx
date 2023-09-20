import { API_BASE_URL } from '../constants.js';
import { parseJwt } from '../utils.js';
import Cookies from 'js-cookie'

export default function useApi({ setLoggedIn }) {

  console.log("API_BASE_URL -> " + API_BASE_URL)
  const checkTokenValidity = async () => {
    let newToken = Cookies.get("token");
    if (!newToken || newToken == "" || newToken == undefined) {
      return "";
    }

    const currentTime = Date.now() / 1000;
    const decodedToken = parseJwt(newToken);
    console.log(currentTime)
    console.log(decodedToken)

    if (decodedToken.exp < currentTime) {
      try {
        const res = await fetch(`${API_BASE_URL}/api/refresh-token`, {
          headers: {
            "Authorization": "Bearer " + newToken
          },
        })

        const data = await res.json();
        console.log(data)

        if (Object.prototype.hasOwnProperty.call(data, "error")) {
          console.log("Error revalidating user token: " + data.error)
        }

        else if (Object.prototype.hasOwnProperty.call(data, 'access_token')) {
          newToken = data.access_token;
          setLoggedIn(true);
        }
      } catch (error) {
        console.error("Error when refreshing token", error);
      }
    }

    if (Cookies.get("loggedIn") === true) {
      setLoggedIn(true);
    }

    return newToken;
  }

  const getApi = async (endpoint, callback = () => { }) => {
    const newToken = await checkTokenValidity();
    console.log("newToken -> " + newToken)
    fetch(`${API_BASE_URL}` + endpoint, { method: "GET", headers: { "Authorization": "Bearer " + newToken } })
      .then(res => res.json())
      .then(callback)
      .catch((error) => {
        console.error("Error fetching api", error);
      })
  }

  const postApi = async (endpoint, body = {}, callback = () => { }) => {
    const newToken = await checkTokenValidity();
    fetch(`${API_BASE_URL}` + endpoint, { method: "POST", body: JSON.stringify(body), headers: { "Authorization": "Bearer " + newToken } })
      .then(res => res.json())
      .then(callback)
      .catch((error) => {
        console.error("Error fetching api", error);
      })
  }

  return {
    getApi,
    postApi,
    checkTokenValidity
  }

}
