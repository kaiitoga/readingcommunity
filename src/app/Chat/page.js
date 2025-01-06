"use client";
import React, { useEffect } from 'react';
import Sidebar from './Conponents/Sidebar';
import Chat from './Conponents/Chat';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import Login from './Conponents/Login';
import { auth } from '../firebase';
import { login, logout } from '../Redux/Slice/authSlice';


const page = () => {
  const userAuth = useSelector(state => state.auth.user); 
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user) {
        dispatch(
          login({
            id: user.uid,
            photo: user.photoURL,
            email: user.email,
            name: user.displayName,
          })
        )
      } else {
        dispatch(logout());
      }
    })
  }, [dispatch]);
  
  return (    
    <div className='w-full'>
      {userAuth ? 
          <div className='flex w-full h-[calc(100vh-36px)] overflow-auto'>
            <Sidebar/>
            <Chat/>
          </div>
        :
        <div>
          <Login />
        </div>
      }
    </div>    
  )
}

export default page






