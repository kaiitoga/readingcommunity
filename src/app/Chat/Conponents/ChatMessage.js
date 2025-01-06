import { Avatar } from '@mui/material'
import React from 'react'

const ChatMessage = (props) => {
const {message, timestamp, user} = props;
const userName = user ? user.name : 'Unknown User';
const date = timestamp && timestamp.toDate ? timestamp.toDate() : null;
  return (
//     animate([
//   ["ul", { opacity: 1 }],
//   ["li", { x: [-20, 0] }, { delay: stagger(.2) }]
// ])
    <div className='p-2'>
      <div className='flex items-center'>
        <Avatar src={user.photo}/>
        <div className='p-1'>
          <h2>
            {userName}            
            <span className=''>{date ? date.toLocaleString() : 'No timestamp'}</span>
          </h2>
        </div>
      </div>
        <p className='mt-1 text-left w-80 break-words'>{message}</p>
    </div>
  )
}

export default ChatMessage