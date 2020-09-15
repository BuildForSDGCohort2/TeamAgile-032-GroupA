import { fetchUtils } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";

// import { stringify } from "query-string";

// const apiUrl = "http://localhost:3001/";
// const httpClient = fetchUtils.fetchJson;

// export default {
//   getList: (resource, params) => {
//     const { page, perPage } = params.pagination;
//     const { field, order } = params.sort;
//     const query = {
//       sort: JSON.stringify([field, order]),
//       range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
//       filter: JSON.stringify(params.filter),
//     };
//     const url = `${apiUrl}/${resource}?${stringify(query)}`;

//     return httpClient(url).then(({ headers, json }) => ({
//       data: json,
//       total: parseInt(headers.get("content-range").split("/").pop(), 10),
//     }));
//   },

//   getOne: (resource, params) =>
//     httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
//       data: json,
//     })),

//   getMany: (resource, params) => {
//     const query = {
//       filter: JSON.stringify({ id: params.ids }),
//     };
//     const url = `${apiUrl}/${resource}?${stringify(query)}`;
//     return httpClient(url).then(({ json }) => ({ data: json }));
//   },

//   getManyReference: (resource, params) => {
//     const { page, perPage } = params.pagination;
//     const { field, order } = params.sort;
//     const query = {
//       sort: JSON.stringify([field, order]),
//       range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
//       filter: JSON.stringify({
//         ...params.filter,
//         [params.target]: params.id,
//       }),
//     };
//     const url = `${apiUrl}/${resource}?${stringify(query)}`;

//     return httpClient(url).then(({ headers, json }) => ({
//       data: json,
//       total: parseInt(headers.get("content-range").split("/").pop(), 10),
//     }));
//   },

//   update: (resource, params) =>
//     httpClient(`${apiUrl}/${resource}/${params.id}`, {
//       method: "PUT",
//       body: JSON.stringify(params.data),
//     }).then(({ json }) => ({ data: json })),

//   updateMany: (resource, params) => {
//     const query = {
//       filter: JSON.stringify({ id: params.ids }),
//     };
//     return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
//       method: "PUT",
//       body: JSON.stringify(params.data),
//     }).then(({ json }) => ({ data: json }));
//   },

//   create: (resource, params) =>
//     httpClient(`${apiUrl}/${resource}`, {
//       method: "POST",
//       body: JSON.stringify(params.data),
//     }).then(({ json }) => ({
//       data: { ...params.data, id: json.id },
//     })),

//   delete: (resource, params) =>
//     httpClient(`${apiUrl}/${resource}/${params.id}`, {
//       method: "DELETE",
//     }).then(({ json }) => ({ data: json })),

//   deleteMany: (resource, params) => {
//     const query = {
//       filter: JSON.stringify({ id: params.ids }),
//     };
//     return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
//       method: "DELETE",
//       body: JSON.stringify(params.data),
//     }).then(({ json }) => ({ data: json }));
//   },
// };

const api_token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZV9udW1iZXIiOiIyMzQ4MTExMzEyMjc3Iiwicm9sZSI6InN1cGVyX2FkbWluIiwiaWF0IjoxNjAwMTM3MzYxLCJleHAiOjE2MDAyMjM3NjF9.-w5HDJEAB8WEpVIDPmqqjYCIZghsM0Ver3qeOC4Nn8I";

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  console.log(api_token);
  // const token = localStorage.getItem("token");
  options.headers.set("Authorization", `Bearer ${api_token}`);
  return fetchUtils.fetchJson(url, options);
};

const dataProvider = simpleRestProvider(
  "https://team-032-a.herokuapp.com/user",
  httpClient
);

export default dataProvider;
