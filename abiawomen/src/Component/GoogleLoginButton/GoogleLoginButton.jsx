import React, { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // New (ESM-style)

export default function GoogleLoginButton({ onLoginSuccess }) {
  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: '717837057045-udbsa7ug4btka496a8lb9k214f6m6fqm.apps.googleusercontent.com',
        callback: handleCredentialResponse,
      });
      window.google.accounts.id.renderButton(
        document.getElementById('googleSignInDiv'),
        { theme: 'outline', size: 'large' }
      );
    }
  }, []);

  const handleCredentialResponse = async (response) => {
    const data = jwtDecode(response.credential);

    const profile = {
      google_id: data.sub,
      email: data.email,
      first_name: data.given_name,
      last_name: data.family_name,
    };

    const res = await fetch('http://localhost:9000/auth/google-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile),
    });
    const result = await res.json();

    if (res.ok) {
        if (typeof onLoginSuccess === 'function') {
        onLoginSuccess(result);
        } else {
        console.warn('onLoginSuccess is not a function:', onLoginSuccess);
        }
    } else {
      alert(result.error || 'Google login failed');
    }
  };

  return <div id="googleSignInDiv"></div>;
}