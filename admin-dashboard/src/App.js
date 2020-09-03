import React from "react";
import "./App.css";

// Resource
import jsonServerProvider from "ra-data-json-server";
import { Admin, Resource, EditGuesser } from "react-admin";

// utils
import authProvider from "./utils/authProvider";

// Resources
import PostIcon from "@material-ui/icons/Book";
import UserIcon from "@material-ui/icons/Group";

// Pages
import Dashboard from "./pages/Dashboard";
import { UserList } from "./pages/users";
import { PostList, PostEdit, PostCreate } from "./pages/posts";

// dataProvider
// const dataProvider = jsonServerProvider("http://localhost:5000");
const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

// Components

const App = () => (
  <Admin
    dashboard={Dashboard}
    dataProvider={dataProvider}
    authProvider={authProvider}
  >
    <Resource
      name="posts"
      list={PostList}
      edit={PostEdit}
      create={PostCreate}
      icon={PostIcon}
    />
    <Resource name="users" list={UserList} icon={UserIcon} />
  </Admin>
);
export default App;
