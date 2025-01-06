import React from 'react'
import { auth, provider } from '@/app/firebase'
import { signInWithPopup } from 'firebase/auth'
import { useDispatch } from 'react-redux';
import { login, logout } from '@/app/Redux/Slice/authSlice';

const Login = () => {

  const signIn = () => {
    signInWithPopup(auth, provider).catch((err) => {
      alert(err.message);
    });
  };

  return (
    <div>
      <button onClick={signIn}>ログイン</button>
    </div>
  )
}

export default Login