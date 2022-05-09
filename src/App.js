import React, { useState } from "react";

import logo from './logo.svg';
import './arnuv.css';


import { Layout, Menu, Typography } from 'antd';
import Icon from '@ant-design/icons';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import IndexContainer from "./Container/index";
import Login from "./Login/index";

//const { UserOutlined, LaptopOutlined, NotificationOutlined, MenuUnfoldOutlined, MenuFoldOutlined, VideoCameraOutlined, UploadOutlined } = Icons;
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Title } = Typography;


function App() {

  return (

    <div>
      {/*<IndexContainer></IndexContainer>*/}
      <Login></Login>
    </div>

  );
}

export default App;

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
