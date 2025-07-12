'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaGoogle, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';

const SocialAuth = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState('');
  useEffect(() => {
    // Handle Facebook callback token
    const token = searchParams.get('token');
    const error = searchParams.get('error');
    if (token) {
      handleFacebookToken(token);
    } else if (error) {
      setError(decodeURIComponent(error));
    }
  }, [searchParams]);
  const handleFacebookToken = async (accessToken) => {
    try {
      // Get user info from Facebook
      const userInfoResponse = await fetch(
        `https://graph.facebook.com/v19.0/me?fields=id,name,email&access_token=${accessToken}`
      );
      const userInfo = await userInfoResponse.json();

      if (!userInfo.email) {
        throw new Error('Email permission not granted');
      }
      // Send to backend
      const backendResponse = await fetch('http://localhost:5000/api/auth/facebook-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userInfo.email,
          name: userInfo.name,
          facebookId: userInfo.id
        })
      });
      const data = await backendResponse.json();
      if (data.success) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        router.push('/dashboard');
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const handleGoogleClick = async () => {
    try {
      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        scope: 'email profile',
        callback: async (response) => {
          if (response.access_token) {
            try {
              const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${response.access_token}` }
              });
              const userInfo = await userInfoResponse.json();

              const backendResponse = await fetch('http://localhost:5000/api/auth/google-login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  email: userInfo.email,
                  name: userInfo.name,
                  picture: userInfo.picture
                })
              });

              const data = await backendResponse.json();
              if (data.success) {
                localStorage.setItem('token', data.data.token);
                localStorage.setItem('user', JSON.stringify(data.data.user));
                router.push('/dashboard');
              } else {
                throw new Error(data.message);
              }
            } catch (error) {
              setError(error.message);
            }
          }
        }
      });
      client.requestAccessToken();
    } catch (error) {
      setError(error.message);
    }
  };
  const handleFacebookClick = () => {
    const width = 600;
    const height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    const popup = window.open(
      `https://www.facebook.com/v19.0/dialog/oauth?client_id=${process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}&redirect_uri=${encodeURIComponent('http://localhost:3000/api/auth/facebook/callback')}&scope=email,public_profile&response_type=token&auth_type=rerequest&display=popup`,
      'facebook-login',
      `width=${width},height=${height},left=${left},top=${top}`
    );
    // Listen for messages from the popup
    const messageHandler = async (event) => {
      if (event.origin !== 'http://localhost:3000') return;
      if (event.data.type === 'facebook-login-success') {
        window.removeEventListener('message', messageHandler);
        await handleFacebookToken(event.data.accessToken);
      } else if (event.data.type === 'facebook-login-error') {
        window.removeEventListener('message', messageHandler);
        setError(event.data.error);
      }
    };
    window.addEventListener('message', messageHandler);
  };
  const handleLinkedInClick = () => {
    const clientId = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID;
    const redirectUri = 'http://localhost:3000/linkedin-callback';
    const state = Math.random().toString(36).substring(7);
    const scope = 'r_liteprofile r_emailaddress';
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&state=${state}&scope=${encodeURIComponent(scope)}`;
    window.location.href = authUrl;
  };
  return (
    <div className="flex justify-center h-screen items-center">
      <div className="w-full bg-gray-800 bg-opacity-60 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-gray-700 border-opacity-30 p-10 max-w-md mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-white">Sign in to Your Account</h2>
          <p className="text-sm text-white">Choose your preferred method</p>
        </div>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 bg-gray-800 bg-opacity-60 backdrop-blur-lg text-sm text-white">
              OR CONTINUE WITH
            </span>
          </div>
        </div>
        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoogleClick}
            className="w-full flex items-center gap-3 justify-center px-4 py-2 border rounded-lg bg-white shadow hover:bg-gray-100 text-gray-700"
          >
            <FaGoogle className="text-red-500 text-lg" />
            Continue with Google
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleFacebookClick}
            className="w-full flex items-center gap-3 justify-center px-4 py-2 border rounded-lg bg-white shadow hover:bg-gray-100 text-gray-700"
          >
            <FaFacebookF className="text-blue-600 text-lg" />
            Continue with Facebook
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLinkedInClick}
            className="w-full flex items-center gap-3 justify-center px-4 py-2 border rounded-lg bg-white shadow hover:bg-gray-100 text-gray-700"
          >
            <FaLinkedinIn className="text-blue-800 text-lg" />
            Continue with LinkedIn
          </motion.button>
        </div>
        <p className="mt-6 text-xs text-center text-gray-500">
          By continuing, you agree to our{' '}
          <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and{' '}
          <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default SocialAuth;
