import './style.scss';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../Home/Home';
import AboutUs from '../AboutUs/AboutUs';
import Privacy from '../Privacy/Privacy';
import Terms from '../Terms/Terms';
import CategoryCardItem from '../CategoryCardItem/CategoryCardItem';

const Router: React.FunctionComponent = () => {
  return (
    <BrowserRouter basename="/">
      <Switch>
        <Route path="/about-us">
          <AboutUs />
        </Route>
        <Route path="/privacy">
          <Privacy />
        </Route>
        <Route path="/terms">
          <Terms />
        </Route>
        <Route path="/category/:categoryName">
          <CategoryCardItem />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
