import React, { useState, useEffect } from 'react';
import OTPInput, { ResendOTP } from "otp-input-react"; // Import the OTPInput component
import { useLocation } from 'react-router-dom';
import { auth } from '../firebase.config';
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios';
const Otp = () => {
  const [otp, setOtp] = useState('');
  const [ph, setPh] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const submittedData = useLocation().state.submittedData;
  const phoneNumber = submittedData.phone;
  const renderInput = (inputProps) => (
    <input {...inputProps} style={{ width: '3rem', height: '3rem' }} />
  );
  useEffect(() => {
    if (submittedData && submittedData.phone) {
      setPh(submittedData.phone);
    }
  }, [submittedData]);

  function onCaptchaVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container',
        {
          size: 'invisible',
          callback: (response) => {
            onSignup();
          },
          'expired-callback': () => {},
        },
        auth
      );
    }
  }
  
  function onSignup() {
    setLoading(true);
    onCaptchaVerify();
    const appVerifier = window.recaptchaVerifier;
    const formatPh = '+' + ph;
  
    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success('OTP sent successfully!');
      })
      .catch((error) => {
        if (error.code === 'auth/captcha-check-failed') {
          // Handle reCAPTCHA verification failure
          console.error('reCAPTCHA verification failed:', error.message);
        } else {
          // Handle other Firebase authentication errors
          console.error('Firebase authentication error:', error.message);
        }
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
        const jsonData = JSON.stringify(submittedData);
        axios.post('http://localhost:3000/v1/tenants/signup', jsonData,{
          headers:{
            "Content-Type":'application/json',
          },
        })
        .then((response) => {
          console.log('Data sent to API:', response.data);
          // You can perform additional actions based on the API response here.
        })
        .catch((error) => {
          console.error('Error sending data to API:', error.message);
        });
        // You can add code to navigate or perform actions after successful OTP verification here.
      })
      .catch((err) => {
        console.error(err.message);
        setLoading(false);
      });
  }

  return (
    <div>
       <div id="recaptcha-container"></div>
      <Toaster toastOptions={{ duration: 4000 }} />
     
      <h1>OTP VALIDATION</h1>
      <p>Phone Number: {phoneNumber}</p>
      {showOTP ? (
        <>
          <OTPInput value={otp} onChange={setOtp} autoFocus OTPLength={6} otpType="number" disabled={false} />
          <button onClick={onOTPVerify}>Verify OTP</button>
        </>
      ) : (
        <button onClick={onSignup}>Send OTP</button>
      )}
    </div>
  );
};

export default Otp;