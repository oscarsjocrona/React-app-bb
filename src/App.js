import React, { Component } from 'react';
import Layout from './HOC/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Containers/Checkout/Checkout';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Orders from './Containers/Orders/Orders';
import Auth from './Containers/auth/Auth';

class App extends Component {

  continueToCheckout = () => {
    this.props.history.push({ pathname: '/Checkout' });
  }

  render() {

    return (
      <BrowserRouter>
        <div>
          <Layout>
            <Switch>
              <Route path="/checkout" component={Checkout} />
              <Route path="/orders" component={Orders}/>
              <Route path="/auth" component={Auth}/>
              <Route path="" exact component={BurgerBuilder} />
            </Switch>
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
