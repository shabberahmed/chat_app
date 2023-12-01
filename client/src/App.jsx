import React, { useState } from 'react'
import io from 'socket.io-client'
import Chats from './Chats'
const App = () => {
  const socket=io.connect('http://localhost:1010')
  socket.emit()
  const [form,setfrom]=useState({name:'',room:''})
  const handlechange=(e)=>{
    setfrom({...form,[e.target.name]:e.target.value})
    console.log(form)
  }

  const joinRoom=()=>{
    if(form.name!=="" && form.room!==""){
      socket.emit('join_room',form.room)
     }
  }
  return (
    <div>
      <h2>join chat</h2>
      <input type="text" placeholder='name' name='name' value={form.name}  onChange={handlechange}/>
      <input type="text" placeholder='room id' name='room'  value={form.room} onChange={handlechange}/>
      <button onClick={joinRoom}>join room</button>
      <Chats socket={socket}  data={form}/>

    </div>
  )
}

export default App