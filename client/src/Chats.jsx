import React, { useEffect, useState } from 'react'

const Chats = ({socket,data}) => {
    const [msg,setMsg]=useState('')
    const [msgStack,setMsgStack]=useState([])
    const sendMsg=async()=>{
        if(msg!==''){
         const msgData={
            room:data.room,
            user:data.name,
            message:msg,
            
         }
         await socket.emit('send_message',msgData)
         setMsgStack((li)=>[...li,msgData])

        }
    }
    useEffect(()=>{
      socket.on("recieve_msg",(data)=>{
        setMsgStack((li)=>[...li,data])
      console.log(data)
      })
    },[socket])
  return (
    <div>
        <h1>chat box</h1>
        <div className='header'></div>
        <div className='body'>
          {
            msgStack.map((val)=>{
              return <li>{val.message}</li>
            })
          }
        </div>
        <div className='footer'>
            <input type="text" placeholder='enter the message....'  onChange={(e)=>setMsg(e.target.value)}/>
            <button onClick={sendMsg}>send</button>
        </div>
    </div>
  )
}

export default Chats