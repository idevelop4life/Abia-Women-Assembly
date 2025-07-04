import { useEffect } from 'react';
import { FaGoogle, FaFacebookF, FaApple } from 'react-icons/fa';
import GoogleLoginButton from '../GoogleLoginButton/GoogleLoginButton';

export default function SocialButtons() {
  // Load Facebook SDK once when component mounts
  useEffect(() => {
    if (window.FB) return;

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: process.env.REACT_APP_FACEBOOK_APP_ID, // Make sure this is set in your .env file
        cookie: true,
        xfbml: false,
        version: 'v16.0',
      });
    };

    // Inject Facebook SDK script
    (function (d, s, id) {
      if (d.getElementById(id)) return;
      const js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      const fjs = d.getElementsByTagName(s)[0];
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }, []);

  const handleGoogleLogin = (userData) => {
    console.log('User logged in via Google', userData);
    localStorage.setItem('token', userData.token);
    window.location.href = '/'; // Change this to user profile route
  };

  const handleFacebookLogin = () => {
    if (!window.FB) {
      alert('Facebook SDK not loaded yet. Please try again in a moment.');
      return;
    }

    window.FB.login(
      (response) => {
        if (response.authResponse) {
          // User logged in, fetch minimal user info
          window.FB.api(
            '/me',
            { fields: 'id,name,email' }, 
            async (userInfo) => {
              console.log('Facebook user info:', userInfo);
              try {
                const res = await fetch('http://localhost:5000/api/auth/facebook', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ accessToken: response.authResponse.accessToken }),
                });

                const data = await res.json();
                console.log('Backend response:', data);

                alert(`Welcome, ${data.member?.first_name || userInfo.name}!`);
                // TODO: Save token, update UI, or redirect
              } catch (err) {
                console.error('Facebook login failed', err);
                alert('Facebook login failed');
              }
            }
          );
        } else {
          console.log('User cancelled login or did not authorize.');
        }
      },
      { scope: 'email' } // request email optionally, public_profile is default
    );
  };

  return (
    <div className="bottom-4 left-0 right-0 flex justify-center space-x-6">
      <GoogleLoginButton onLoginSuccess={handleGoogleLogin} />

      <button
        aria-label="Sign in with Facebook"
        onClick={handleFacebookLogin}
        className="bg-white w-12 h-12 rounded-full flex items-center justify-center shadow hover:shadow-lg transition"
      >
        <FaFacebookF size={24} className="text-blue-700" />
      </button>

      <button
        aria-label="Sign in with Apple"
        className="bg-white w-12 h-12 rounded-full flex items-center justify-center shadow hover:shadow-lg transition"
      >
        <FaApple size={24} className="text-black" />
      </button>
    </div>
  );
}
