import React, { Component } from "react";
import Header from "./components/Header/Header";
import { Route, Switch, Redirect } from "react-router-dom";
import TradeSummary from './containers/Trades/TradeSummary/TradeSummary';
import AddTrade from './containers/Trades/AddTrade/AddTrade';
import TradeDetail from './containers/Trades/TradeDetail/TradeDetail';

class App extends Component {

  render() {

    let routes = (
      <Switch>
        <Route path="/addTrade" component={AddTrade}/>
        <Route path="/detail/:symbol" component={TradeDetail}/>
        <Route path="/" exact component={TradeSummary}/>
        <Redirect to="/" />
      </Switch>
    );
    
    return (
      <div>
        <Header />
        {routes}        
      </div>
    );
  }

}

export default App;
