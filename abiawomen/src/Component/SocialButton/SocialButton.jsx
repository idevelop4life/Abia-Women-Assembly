import { useState } from 'react';
import { FaGoogle, FaFacebookF, FaApple } from 'react-icons/fa';
import GoogleLoginButton from '../GoogleLoginButton/GoogleLoginButton';
import FacebookLogin from 'react-facebook-login';

export default function SocialButtons() {
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState('');

   const handleFacebookCallback = (response) => {
  if (response?.status === "unknown") {
    console.error('Sorry!', 'Something went wrong with facebook Login.');
    return;
  }
  console.log(response);

  /*
  Sample response object you will get:
  {
    "name": "Syed M Ahmad",
    "email": "ssgcommando90@yahoo.com",
    "picture": {
      "data": {
        "height": 50,
        "is_silhouette": false,
        "url": "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=7138203302951151&height=50&width=50&ext=1714730459&hash=AfplSQ-UxV9LeHd5wYnaKbeKEIfUjMN-pHFGZJaWwC-00g",
        "width": 50
      }
    },
    "id": "7138203302951151",
    "userID": "7138203302951151",
    "expiresIn": 7142,
    "accessToken": "EAANdCvUejTUBO3C5uZCp0n6i9H31bCdW6bZBUcOET2aTbWlZCJA7kQoQ1jxDCsnFctxZBAQPl2kSUSqb4N6KDLM8wROXn4fZCBj1Pmgq5peKkmPv7YJWHKXLb9mOIwcBbJJGj5EaXwLURktOGSv7HeNsiGxZBPBr1jewzZAL7FxbITljSsBq6LYnhKO6xT9D5FbFZB1JWdjii63xAeU36wZDZD",
    "signedRequest": "...",
    "graphDomain": "facebook",
    "data_access_expiration_time": 1719914458
  }
  */
}

  // const responseFacebook = (response) => {
  //   console.log(response);
  //   if (response.accessToken) {
  //     setData(response);
  //     setPicture(response.picture?.data?.url || '');
  //     setLogin(true);
  //   } else {
  //     setLogin(false);
  //     setData({});
  //     setPicture('');
  //   }
  // };

  const handleGoogleLogin = (userData) => {
    console.log('User logged in via Google', userData);
    localStorage.setItem('token', userData.token);
    window.location.href = '/'; // Change this to user profile route
  };

  return (
    <div className="bottom-4 left-0 right-0 flex flex-col items-center space-y-4">
      <div className="flex space-x-6">
        <GoogleLoginButton onLoginSuccess={handleGoogleLogin} />

        {/* Using react-facebook-login component */}
        {/* <FacebookLogin
          appId="YOUR_FACEBOOK_APP_ID" // replace with your Facebook app ID
          autoLoad={false}
          fields="name,email,picture"
          callback={responseFacebook}
          render={(renderProps) => (
            <button
              aria-label="Sign in with Facebook"
              onClick={renderProps.onClick}
              className="bg-white w-12 h-12 rounded-full flex items-center justify-center shadow hover:shadow-lg transition"
            >
              <FaFacebookF size={24} className="text-blue-700" />
            </button>
          )}
        /> */}

        <FacebookLogin 
      buttonStyle={{padding:"6px"}}  
      appId="579499218551312"  // nós need to get this from facebook developer console by setting the app.
      autoLoad={false}  
      fields="name,email,picture"  
      callback={handleFacebookCallback}/>

        <button
          aria-label="Sign in with Apple"
          className="bg-white w-12 h-12 rounded-full flex items-center justify-center shadow hover:shadow-lg transition"
        >
          <FaApple size={24} className="text-black" />
        </button>
      </div>

      {/* Show user info after login */}
      {login && (
        <div className="mt-4 text-center">
          {picture && <img src={picture} alt="Profile" className="mx-auto rounded-full w-16 h-16" />}
          <p>{data.name}</p>
          <p>{data.email}</p>
        </div>
      )}
    </div>
  );
}
