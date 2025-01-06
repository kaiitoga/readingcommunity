import React, { useEffect, useState } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { auth, db } from '@/app/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp} from 'firebase/firestore';
import { installChat } from '../../Redux/Slice/chatSlice';


const Sidebar = () => {
  const [channels, setChannels] = useState([]);
  const user = useSelector(state => state.auth.user);
  const q = query(collection(db, "Channels"),orderBy("timestamp", "desc"));
  const dispatch = useDispatch();

  const addChannel = async () => {
    let channelName = prompt("新しい本について話す");

    if(channelName) {
      const docRef = await addDoc(collection(db, "Channels"),{
        channel:channelName,
        timestamp: serverTimestamp(), 
      });

      dispatch(installChat({
        channelId: docRef.id,
        channelName:channelName
      }))
    }
  }

  useEffect(() => {


    onSnapshot(q,(querySnapshot) => {
      const channelsResults = [];
      querySnapshot.docs.forEach((doc) => {
        channelsResults.push({
          id: doc.id,
          channelName: doc.data(),
        })
      })
      setChannels(channelsResults);
    })
  }, [])
  
  return (
    <div className='bg-lime-200 p-2 basis-64 lg:basis-80 flex-col justify-between h-full overflow-y-auto hidden md:flex'>

      <div>
        <div className='flex items-center justify-around flex-shrink-0 w-40 cursor-pointer hover:text-gray-400 duration-700' onClick={() => addChannel()}>
          <h1 className='text-base lg:text-lg font-bold '>新規本の追加</h1>
          <AddCircleOutlineIcon/>
        </div>
        
        <div className='mt-3 overflow-y-auto'>
          {channels.map((channeldata) => (
             <div 
              key={channeldata.id}
              className=' bg-stone-50 mt-2 rounded-3xl p-2 inline-block cursor-pointer hover:bg-gray-400 duration-500 w-full' 
              onClick={()=>dispatch(
                installChat({
                  channelId:channeldata.id,
                  channelName:channeldata.channelName.channel})
                )}
                >
                <h1 className='text-base lg:text-lg hover:text-white duration-1000' >{channeldata.channelName.channel}</h1>
            </div>
          ))}
        </div>
      </div>
      <div className='flex items-center'>
        <img src="{user.photo}" alt="test" className='w-11 lg:w-16 h-11 lg:h-16 rounded-full' onClick={() => auth.signOut()}/>
        <h1 className='ml-4 text-base lg:text-xl'>{user.name}</h1>
      </div>
    </div>
  )
}

export default Sidebar



