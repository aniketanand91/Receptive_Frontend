import React from 'react';
import { GoogleLogin } from 'react-google-login';

const GoogleAuthButton = ({ onSuccess, onFailure, buttonText }) => {
  return (
    <GoogleLogin
     style={{borderRadius:'50px'}}
      clientId="295744727460-12t1vbiuaefho381ta0bfpotlp2mbrrn.apps.googleusercontent.com"
      buttonText={buttonText}
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
      redirectUri="http://localhost:3001"
    />
  );
};

export default GoogleAuthButton;
