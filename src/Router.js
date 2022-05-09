import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

//Components
import Login from './Login/index';
import Container from './Container/index';
import { createBrowserHistory } from "history";

//import User from "../Pages/Seguridad/User";
import Iva from "./Pages/Iva/index";
import Currency from "./Pages/Moneda/index";
import Usuario from "./Pages/Usuario/index";

import Rol from "./Pages/Rol/index";
import RolMenu from "./Pages/RolMenu/index";
import MenuConfiguracion from "./Pages/Menu/index";

import Archivos from "./Pages/Archivos/index";
import CajaChica from "./Pages/CajaChica/index";
import Compras from "./Pages/Compras/index";
import CostosAdicionales from "./Pages/CostosAdicionales/index";
import CuentaBanco from "./Pages/CuentaBanco/index";
import CuentaPagar from "./Pages/CuentaPagar/index";
import Moneda from "./Pages/Moneda/index";
import CuentasContables from "./Pages/CuentasContables/index";
import DetalleCuentaPagar from "./Pages/DetalleCuentasPagar/index";
import Producto from "./Pages/Producto/index";
import Proveedor from "./Pages/Proveedor/index";
import TipoCredito from "./Pages/TipoCredito/index";
import TipoProveedor from "./Pages/TipoProveedor/index";
import CuentaContables from "./Pages/CuentasContables/index";
import TipoPago from "./Pages/TipoPago/index";
import MenuAplicacion from "./Pages/Menu/index";
import ReporteCompras from "./Pages/ReporteCompras/index";

const history = createBrowserHistory();
//import ProcesoSPI from './Pages/ProcesoSPI/index';

//import Pagina404 from "./Pagina404/Pagina404";

const Router = () => (
  <BrowserRouter history={history}>
    <Switch>
      <Route exact path="/" component={Login} />
      {/*<Route exact path="/container" component={Container} />*/}
      <Container>
        <Route component={({ match }) =>
          <div>
            <Route path="/" />
            <Route path="/Compras" component={Compras} />
            <Route path="/Usuario" component={Usuario} />
            <Route path="/Moneda">
              <Moneda />
            </Route>
            <Route path="/Proveedor">
              <Proveedor />
            </Route>
            <Route path="/CuentasContables">
              <CuentaContables />
            </Route>
            <Route path="/Iva">
              <Iva />
            </Route>
            <Route path="/Rol">
              <Rol />
            </Route>
            <Route path="/RolMenu">
              <RolMenu />
            </Route>
            <Route path="/MenuConfiguracion">
              <MenuConfiguracion />
            </Route>
            <Route path="/TipoProveedor">
              <TipoProveedor />
            </Route>
            <Route path="/TipoPago">
              <TipoPago />
            </Route>
            <Route path="/ReporteCompras">
              <ReporteCompras />
            </Route>
            <Route path="/Menu">
              <MenuAplicacion />
            </Route>
          </div>
        } />
      </Container>

    </Switch>
  </BrowserRouter>
);

export default Router;