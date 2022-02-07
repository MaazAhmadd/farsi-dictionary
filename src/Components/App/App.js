import React, { useState } from 'react';
import './style.scss';
import Router from '../Router/Router';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const [status, setStatus] = useState(false);

  let setWordCategories = new Promise(async function (resolve, reject) {
    if (!sessionStorage.getItem('wordCategories')) {
      let response = await axios.get('/data/wordsbytopics.json');
      sessionStorage.setItem('wordCategories', JSON.stringify(response.data));
    }
    resolve();
  });

  let setphrasesCategories = new Promise(async function (resolve, reject) {
    if (!sessionStorage.getItem('phrasesCategories')) {
      let response = await axios.get('/data/phrasesbytopics.json');
      sessionStorage.setItem('phrasesCategories', JSON.stringify(response.data));
    }
    resolve();
  });

  Promise.all([setWordCategories, setphrasesCategories]).then(function () {
    setStatus(true);
  });

  return status ? (
    <div className="">
      <Toaster position="top-center" reverseOrder={false} />
      <Router />
    </div>
  ) : (
    <div className="loading">
      <div class="container">
        <div class="spinner">
          <div class="spinner-item"></div>
          <div class="spinner-item"></div>
          <div class="spinner-item"></div>
        </div>
      </div>
    </div>
  );
};

export default App;
