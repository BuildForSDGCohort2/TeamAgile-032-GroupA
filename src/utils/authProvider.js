// in src/authProvider.js
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from "react-admin";

export default (type, params) => {
  // called when the user attempts to log in
  if (type === AUTH_LOGIN) {
    const { username } = params;
    localStorage.setItem("username", username);
    // accept all username/password combinations
    return Promise.resolve();
  }
  // called when the user clicks on the logout button
  if (type === AUTH_LOGOUT) {
    localStorage.removeItem("username");
    return Promise.resolve();
  }
  // called when the API returns an error
  if (type === AUTH_ERROR) {
    const { status } = params;
    if (status === 401 || status === 403) {
      localStorage.removeItem("username");
      return Promise.reject();
    }
    return Promise.resolve();
  }
  // called when the user navigates to a new location
  if (type === AUTH_CHECK) {
    return localStorage.getItem("username")
      ? Promise.resolve()
      : Promise.reject();
  }
  return Promise.reject("Unknown method");
};

// export default {
// called when the user attempts to log in
// login: (params) => Promise.resolve(),

// login: ({ username }) => {
//   console.log(username);
//   localStorage.setItem("username", username);
// accept all username/password combinations
//   return Promise.resolve();
// },

// login: ({ username, password }) => {
//   console.log("phone: ", username, "password:", password);
//   const phone = username;
//   const request = new Request("https://team-032-a.herokuapp.com/user/login", {
//     method: "POST",
//     body: JSON.stringify({ phone, password }),
//     headers: new Headers({ "Content-Type": "application/json" }),
//   });

//   return fetch(request)
//     .then((response) => {
//       console.log(response);
//       if (response.status < 200 || response.status >= 300) {
//         throw new Error(response.statusText);
//       }
//       return response.json();
//     })
//     .then(({ token }) => {
//       localStorage.setItem("api-token", token);
//     });
// },
// called when the user clicks on the logout button
// logout: () => {
//   localStorage.removeItem("token");
//   return Promise.resolve();
// },
// called when the API returns an error
// checkError: ({ status }) => {
//   if (status === 401 || status === 403) {
//     localStorage.removeItem("token");
//     return Promise.reject();
//   }
//   return Promise.resolve();
// },
// called when the user navigates to a new location, to check for authentication
// checkAuth: () => {
//   return localStorage.getItem("token") ? Promise.resolve() : Promise.reject();
// },
// called when the user navigates to a new location, to check for permissions / roles
//   getPermissions: () => Promise.resolve(),
// };
