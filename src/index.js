import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './Components/App/App';
import { Auth0Provider } from '@auth0/auth0-react';
import { UserProvider } from './Components/contexts/user_context';

ReactDOM.render(
  <Auth0Provider
    domain="dev-yc0ifi7i.us.auth0.com"
    clientId="haclJIXt4CqO2aYyBt4wVZJI91dDppCl"
    redirectUri={window.location.origin}
    cacheLocation="localstorage"
  >
    <UserProvider>
      <App />
    </UserProvider>
  </Auth0Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
