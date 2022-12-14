import "./App.css";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import JewelryOrdersTable from "./Components/JewelryOrders/JewelryOrdersTable";
import UploadJewelrySalesCsv from "./Components/JewelryOrders/UploadJewelrySalesCsv";
import UpdateOrderInfo from "./Components/Forms/UpdateOrderInfo";
import Test from "./Components/Test";
import AlertAcrossApplication from "./Components/Utilities/AlertAcrossApplication";
import AlertAcrossApplicatioProvider from "./Context/AlertAcrossApplicationContext";
import Header from "./Header";
import SalesInfoContextNetProvider from "./Context/JewelryOrdersContext";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <AlertAcrossApplicatioProvider>
        <AlertAcrossApplication />
        <Switch>
          <Route exact path="/">
            <Redirect to="/jewelry_orders" />
          </Route>
          <Route path="/upload_csv">
            <UploadJewelrySalesCsv />
          </Route>

          <SalesInfoContextNetProvider>
            <Route path="/jewelry_orders">
              <JewelryOrdersTable />
            </Route>
          </SalesInfoContextNetProvider>

          <Route path="/update_order_info">
            <UpdateOrderInfo />
          </Route>

          <Route path="/test">
            <Test />
          </Route>
        </Switch>
      </AlertAcrossApplicatioProvider>
    </BrowserRouter>
  );
}

export default App;
