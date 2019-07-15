import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import * as axios from 'axios';
import JSONPretty from 'react-json-pretty';
import './App.css';
import 'react-json-pretty/themes/monikai.css';

function App() {
  const [token, setToken] = useState({});

  const responseFacebook = (response) => {
    console.log("responseFacebook", response);
    setToken(response);

    axios.post('http://localhost:3000/api/v1/user/auth/provider/facebook', response)
      .then(data => {
        console.log("rails", data)
      }, err => {
        console.log("rais err", err)
      })


  }

  const componentClicked = (response) => {
    console.log("componentClicked", response);
  }



  return (
    <div>
      <div className="App">
        <header className="App-header">
          <div className='container'>
            <FacebookLogin
              version="3.3"
              appId="372579823236596"
              autoLoad={false}
              fields="name,email,picture"
              scope="public_profile,email,user_birthday,pages_show_list,publish_pages,manage_pages"
              onClick={componentClicked}
              callback={responseFacebook}
            />
            <div className="fb-login-button" data-width="" data-size="large" data-button-type="continue_with" data-auto-logout-link="false" data-use-continue-as="false"></div>
          </div>

        </header>

      </div>
      <div className='container'>
        <JSONPretty data={token}></JSONPretty>
      </div>
    </div>


  );
}

export default App;
