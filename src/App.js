import React from "react";
import "./App.css";
import { Settings as SettingsIcon, User as UserIcon } from "react-feather";
import { Admin, Resource, Layout } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import TreeMenu from "@bb-tech/ra-treemenu";

// utils
import authProvider from "./utils/authProvider";

// Resources
import PostIcon from "@material-ui/icons/Book";
import { DirectionsRun, LocalHospital, HighlightOff } from "@material-ui/icons";

// Pages
import Dashboard from "./views/reports/DashboardView";
import AccountView from "./views/account/AccountView";
import SettingsView from "./views/settings/SettingsView";

import { UserList } from "./pages/users";
import { PostList, PostEdit, PostCreate } from "./pages/posts";
import {
  FirstResponderList,
  FirstResponderEdit,
  FirstResponderCreate,
} from "./pages/firstResponders";

import { CrimeList, CrimeEdit, CrimeCreate } from "./pages/crimes";

import { MailDispatchedList, MailDispatchCreate } from "./pages/mailDispatched";

import {
  EmergencyList,
  EmergencyEdit,
  EmergencyCreate,
} from "./pages/emergencies";

// Component
import MyLayout from "./components/MyLayout";

import NotFound from "./NotFound";
import Routes from "./customRoutes";
// import dataProvider from "./dataProvider";

// dataProvider
const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

const App = () => (
  <Admin
    // dashboard={Dashboard}
    // customRoutes={Routes}
    layout={(props) => <Layout {...props} menu={TreeMenu} />}
    // layout={MyLayout}
    dashboard={Dashboard}
    dataProvider={dataProvider}
    authProvider={authProvider}
    catchAll={NotFound}
  >
    <Resource
      name="user"
      options={{ label: "Users", isMenuParent: true }}
      icon={UserIcon}
    />

    <Resource
      name="users"
      list={UserList}
      options={{ label: "Users", menuParent: "user" }}
    />

    <Resource
      name="posts"
      list={PostList}
      edit={PostEdit}
      create={PostCreate}
      icon={PostIcon}
      options={{ label: "Post", menuParent: "user" }}
    />

    <Resource
      name="trafficking"
      icon={DirectionsRun}
      options={{ label: "Trafficking", isMenuParent: true }}
    />

    <Resource
      name="emergency"
      list={UserList}
      options={{ label: "Emergency", menuParent: "trafficking" }}
      list={EmergencyList}
      create={EmergencyCreate}
      edit={EmergencyEdit}
    />

    <Resource
      name="Crime"
      list={UserList}
      options={{ label: "Crime", menuParent: "trafficking" }}
      list={CrimeList}
      create={CrimeCreate}
      edit={CrimeEdit}
    />

    <Resource
      name="first-responders"
      icon={LocalHospital}
      options={{ label: "First Responders" }}
      list={FirstResponderList}
      create={FirstResponderCreate}
      edit={FirstResponderEdit}
    />

    <Resource
      name="miscellenous"
      icon={HighlightOff}
      options={{ label: "Miscellenous", isMenuParent: true }}
    />
    <Resource
      name="mail-dispatched"
      options={{ label: "Mail Dispatched", menuParent: "miscellenous" }}
      list={MailDispatchedList}
      create={MailDispatchCreate}
    />

    <Resource
      name="account"
      options={{ label: "Account" }}
      icon={UserIcon}
      list={AccountView}
    />
    <Resource
      name="settings"
      options={{ label: "Settings" }}
      icon={SettingsIcon}
      list={SettingsView}
    />
  </Admin>
);

export default App;
