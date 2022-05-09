import axios from 'axios';
import React, { Component } from 'react';
//import '../Container/index.css';
import logo from '../Resources/transparente.png';
import {
  Link
} from "react-router-dom";

import { Route } from "react-router";
import User from "../Pages/Seguridad/User";
import Iva from "../Pages/Iva/index";
import Currency from "../Pages/Moneda/index";
import Usuario from "../Pages/Usuario/index";

import Rol from "../Pages/Rol/index";
import RolMenu from "../Pages/RolMenu/index";
import MenuConfiguracion from "../Pages/Menu/index";
import Contenedor from "../Container/index";
import Almacenes from "../Pages/Almacenes/index";
import Archivos from "../Pages/Archivos/index";
import CajaChica from "../Pages/CajaChica/index";
import Compras from "../Pages/Compras/index";
import CostosAdicionales from "../Pages/CostosAdicionales/index";
import CuentaBanco from "../Pages/CuentaBanco/index";
import CuentaPagar from "../Pages/CuentaPagar/index";
import Moneda from "../Pages/Moneda/index";
import CuentasContables from "../Pages/CuentasContables/index";
import DetalleCuentaPagar from "../Pages/DetalleCuentasPagar/index";
import Producto from "../Pages/Producto/index";
import Proveedor from "../Pages/Proveedor/index";
import TipoCredito from "../Pages/TipoCredito/index";
import TipoProveedor from "../Pages/TipoProveedor/index";
import CuentaContables from "../Pages/CuentasContables/index";
import TipoPago from "../Pages/TipoPago/index";
import MenuAplicacion from "../Pages/Menu/index";
import ReporteCompras from "../Pages/ReporteCompras/index";
import { useHistory } from "react-router-dom";
import history from '../Container/history';

//import classes from '../Container/index.css';

import 'antd/dist/antd.css';
import './index.css';

import { Menu, Button, Layout, Avatar, Dropdown, Tag, Row, Col, Breadcrumb, Typography } from 'antd';
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined, UserOutlined
} from '@ant-design/icons';
import * as icont from '@ant-design/icons';
//import { useHistory } from "react-router";

const { Header, Footer, Sider, Content } = Layout;

const { SubMenu } = Menu;

const { Title } = Typography;


/*const routes = [
  {
    path: "/container",
    exact: true,
    sidebar: () => <Contenedor/>,
    main: () => <Contenedor/>
  },
  {
    path: "/Compras",
    sidebar: () => <div>bubblegum!</div>,
    main: () => <h2>Bubblegum</h2>
  },
  {
    path: "/Usuario",
    sidebar: () => <div>shoelaces!</div>,
    main: () => <h2>Shoelaces</h2>
  }
];*/



class Container extends React.Component {
  state = {
    collapsed: false,
    userName: '',
    role: 0,
    menu: []
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  menu = (
    <Menu>
      <Menu.Item
        onClick={() => this.cerrarSesion()}
      >
        <h4>
          Salir
        </h4>

      </Menu.Item>
    </Menu>
  );

  componentDidMount() {
    var datauser = localStorage.getItem('myData');
    var role = localStorage.getItem('role');
    this.setState({ userName: datauser });
    this.setState({ role: role });
    //console.log('data', datauser);
    this.getMenuRol(role);
    console.log('rol:', role)
    

  }
  cerrarSesion = () => {

    console.log('Cerrando Sesion');
    localStorage.removeItem('myData');
    this.setState({ userName: null });
    this.props.history.push("/");

  }
  getMenuRol = async (idRole) => {
    await axios.get('https://localhost:44315/api/Menu/getMenu?idRole=' + idRole)
      .then(response => {
        var options = response.data.map(function (row) {
          return {
            "iconmenu": row.iconmenu,
            "isavailablemenu": row.isavailablemenu,
            "namemenu": row.namemenu,
            "pagemenu": row.pagemenu,
            "idmenu": row.idmenu,
            "parentnodemenu": row.parentnodemenu,
            "childnodemenu": row.childnodemenu,
            "menuChild": row.menuChild

          }
        })
        this.setState({ menu: options });
        console.log('menu', options);
      }
      )
  };

  handleClick = (path) => {
    console.log('path',path)
    //this.props.history.push(path);
    this.props.history.push("/container");
  };

  render() {
    //const { collapsed } = this.state;
    return (

        <Layout>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="logo" >
              <img src={logo} alt="Logo" height="50px" />

            </div>
            <Menu mode="inline"
              theme="dark" defaultSelectedKeys={['1']}
            >
              {this.state.menu && this.state.menu.map(item =>
                <SubMenu key={item.idmenu} title={item.namemenu} icon={React.createElement(icont[item.iconmenu])} >
                  {item.menuChild.map((itemC) =>
                    <Menu.Item key={itemC.idmenu} icon={React.createElement(icont[itemC.iconmenu])} >
                      <Link to={itemC.pagemenu}  >{itemC.namemenu}</Link>
                    </Menu.Item>
                  )}
                </SubMenu>
              )}
            </Menu>
            {/*<Switch>
            {routes.map((route, index) => (
              // You can render a <Route> in as many places
              // as you want in your app. It will render along
              // with any other <Route>s that also match the URL.
              // So, a sidebar or breadcrumbs or anything else
              // that requires you to render multiple things
              // in multiple places at the same URL is nothing
              // more than multiple <Route>s.
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.sidebar />}
              />
            ))}
            </Switch>*/}
          </Sider>
          <Layout className="site-layout">
            <div>
              <Header className="site-layout-background" style={{ padding: 0 }}>
                <Row>
                  <Col span={2}>
                    {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                      className: 'trigger',
                      onClick: this.toggle,
                    })}
                  </Col>
                  <Col span={6}>
                    <Title level={3}>Fundación ARNUV</Title>
                  </Col>
                  <Col span={3} offset={12}>
                    <Row>

                      <Col span={8}>
                        <Tag color="#55acee">
                          {this.state.userName}
                        </Tag>
                      </Col>
                      <Col>
                        <Dropdown.Button overlay={this.menu} placement="bottomCenter" icon={<UserOutlined />}>
                        </Dropdown.Button>
                      </Col>
                    </Row>

                  </Col>
                </Row>
              </Header>
            </div>
            <Content
              className="site-layout-background"
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 780,
              }}
            >
              
              {/*<Switch>
             <Redirect exact path='/' to="/container" />*/}
                <Route  path="/" >
                </Route>
                <Route  path="/Compras" component={Compras}>
           
                </Route>
                <Route  path="/container/Usuario" component={Usuario}>
                  
                </Route>
                <Route  path="/Moneda">
                  <Moneda />
                </Route>
                <Route  path="/Proveedor">
                  <Proveedor />
                </Route>
                <Route  path="/CuentasContables">
                  <CuentaContables />
                </Route>
                <Route  path="/Iva">
                  <Iva />
                </Route>
                <Route  path="/Rol">
                  <Rol />
                </Route>
                <Route  path="/RolMenu">
                  <RolMenu />
                </Route>
                <Route  path="/MenuConfiguracion">
                  <MenuConfiguracion />
                </Route>
                <Route  path="/TipoProveedor">
                  <TipoProveedor />
                </Route>
                <Route  path="/TipoPago">
                  <TipoPago />
                </Route>
                <Route  path="/ReporteCompras">
                  <ReporteCompras />
                </Route>
                <Route  path="/Menu">
                  <MenuAplicacion />
                </Route>
              {/*</Switch>*/}
              {/*<Switch>
            {routes.map((route, index) => (
              // Render more <Route>s with the same paths as
              // above, but different components this time.
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.main />}
              />
            ))}
            </Switch>*/}
              
            </Content>
          </Layout>
        </Layout>


    );
  }
}

export default Container;



