import React, { useEffect, useState } from 'react'
import ChatMessage from './ChatMessage'
import { useSelector } from 'react-redux'
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { db } from '@/app/firebase';

const Chat = () => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const bookTitle = useSelector((state) => state.chat.channelName);
  const channelId = useSelector((state) => state.chat.channelId);
  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    if (!channelId) return;
    let collectionRef = collection(
      db,
      "Channels",
      channelId,
      "messages"
    );

    const  collectionRefOrder = query(collectionRef, orderBy("timestamp", "desc"))

    onSnapshot(collectionRefOrder, (snapshot) => {
      let results = [];
      snapshot.docs.forEach((doc) => {
        results.push({
          timestamp: doc.data().timestamp,
          message: doc.data().message,
          user: doc.data().user,
        });
      });
      setMessages(results);
    });
  }, [channelId])

  const sendMessage = async (e) => {
    e.preventDefault();
    const collectionRef = collection(db, "Channels", channelId, "messages");
    const docRef = await addDoc(collectionRef, {
      message: inputText,
      timestamp: serverTimestamp(),
      user: user,
    });
    setInputText("");
  }
  return (
    <div className='bg-lime-300 text-center p-2 flex flex-col justify-between flex-grow h-full'>
      {!channelId ? (
        <div className="flex justify-center items-center h-full">
          <h1 className="text-lg font-bold md:hidden">メニューから本を選んでください</h1>
          <h1 className="text-lg font-bold hidden md:block">サイドバーから本を選んでください</h1>
        </div>
      ) : (
        <>
          <div className='overflow-y-auto'>
            <h1 className='text-sm sm:text-base lg:text-lg font-bold'>{bookTitle}</h1>
            <div className='flex-grow overflow-y-auto px-2'   style={{maxHeight: 'calc(100vh - 130px)'}}>
            {messages.map((message, index) => {
            
              return (
                <ChatMessage
                  key={index}
                  message={message.message}
                  timestamp={message.timestamp}
                  user={message.user}
                />
              )
            })} 
            </div>
          </div>
          <form className="flex items-cente mx-auto mb-2" 
                style={{position: 'sticky', bottom: 0, zIndex: 10,}}
                >
            <input type="text" placeholder='メッセージを入力' className=' text-sm sm:text-base lg:text-lg font-bold bg-transparent border-2 border-neutral-400 rounded-lg p-2 w-72' onChange={(e) => setInputText(e.target.value)} value={inputText}/>
            <button
              type='submit'
              className='bg-neutral-400 text-white m-1 p-1 rounded-md'
              onClick={(e) => sendMessage(e)}
              >送信
            </button>
          </form>
        </>
      )}
    </div>
  )
}

export default Chat



