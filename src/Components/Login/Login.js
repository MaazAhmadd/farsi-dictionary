import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import './style.scss';

export default function Login() {
  let apiUrl = process.env.REACT_APP_BACKEND_BASE_URL;
  let token = localStorage.getItem('token');
  axios.defaults.headers.common['x-auth-token'] = token;
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  function handleInput(e) {
    setUser({
      ...user,
      [e.target.id]: e.target.value,
    });
  }

  async function doLogin(e) {
    e.preventDefault();
    if (user.email !== '' && user.password !== '') {
      await axios
        .post(apiUrl + '/auth', { email: user.email, password: user.password })
        .then((resp) => {
          toast.success('Logged in successfully!');
          if (resp.status === 200) {
            localStorage.setItem('token', resp.data.token);
            window.location.href = './';
          }
        })
        .catch((ex) => {
          toast.error(ex.response.data);
        });
    } else {
      toast.error('Error: Please Fill All Fields');
    }
  }

  return (
    <div className="login-wrapper">
      <form>
        <h3>Sign In</h3>
        <div className="form-group">
          <label>Email address</label>
          <input onChange={handleInput} id="email" type="email" className="form-control" placeholder="Enter email" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            onChange={handleInput}
            id="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>
        {/* <div className="form-group">
          <div className="custom-control custom-checkbox">
            <input type="checkbox" className="custom-control-input" id="customCheck1" />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div> */}
        <button type="button" onClick={doLogin} className="btn btn-primary btn-block">
          Submit
        </button>
        <p className="forgot-password text-right">
          if not registered Already <Link to="/signup">register now?</Link>
        </p>
      </form>
    </div>
  );
}
