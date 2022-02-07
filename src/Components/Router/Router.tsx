import './style.scss';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../Home/Home';
import AboutUs from '../AboutUs/AboutUs';
import Privacy from '../Privacy/Privacy';
import Terms from '../Terms/Terms';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import Footer from '../Footer/Footer';
import CategoryCardItem from '../CategoryCardItem/CategoryCardItem';
import CategoryPage from '../CategoryPage/CategoryPage';
import PhraseItem from '../PhraseItem/PhraseItem';
import PhrasePage from '../PhrasePage/PhrasePage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

const Router: React.FunctionComponent = () => {
  return (
    <BrowserRouter basename="/">
      <Header />
      <Switch>
        <Route exact path="/about-us">
          <AboutUs />
        </Route>
        <Route exact path="/privacy">
          <Privacy />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/terms">
          <Terms />
        </Route>
        <Route exact path="/wordCategory/:categoryName">
          <CategoryCardItem />
        </Route>
        <Route exact path="/wordCategory">
          <CategoryPage />
        </Route>
        <Route exact path="/phraseCategory/:phraseName">
          <PhraseItem />
        </Route>
        <Route exact path="/phraseCategory">
          <PhrasePage />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
