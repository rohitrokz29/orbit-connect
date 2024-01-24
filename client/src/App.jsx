import { useState, useEffect } from 'react'
import socketIO from 'socket.io-client'


const socket = socketIO.connect('http://localhost:3000/')

function App() {
  const [organiser, setOrganiser] = useState('');
  const [room, setroom] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  useEffect(() => {

    socket.on('room:create', ({ room, password }) => {
      setPassword(password);
      setroom(room);
      console.log({ organiser, room, password, user, error, msg })
    })
    socket.on('room:start', (data) => {
      setMsg(data['message']);

      console.log({ organiser, room, password, user, error, msg })

    })
    socket.on('room:new_user', (data) => {
      setMsg(`${data['user']} joined`)

      console.log({ organiser, room, password, user, error, msg })
    })
    socket.on('room:error', (data) => setError(data['message']))
    socket.on("room:message",({message,user})=>{
      setMsg(message+user);
      console.log({message,user})
    })
    return () => {

      socket.off('room:create', ({ room, password }) => {
        setPassword(password);
        setroom(room);
      })
      socket.off('room:start', (data) => {
        setMsg(data['message']);
      })
      socket.off('room:new_user', (data) => {
        setMsg(`${data['user']} joined`)
      })
    }
  }, [])

  return (
    <>
      {msg}
      <input type="text" name="" id="" value={organiser} placeholder='organiser' onChange={(e) => setOrganiser(e.target.value)} />
      <input type="text" name="" id="" value={room} placeholder='room' onChange={(e) => setroom(e.target.value)} />
      <input type="text" name="" id="" value={password} placeholder='password' onChange={(e) => setPassword(e.target.value)} />
      <input type="text" name="" id="" value={user} placeholder='user' onChange={(e) => setUser(e.target.value)} />
    
      {error && <div>{error}</div>}
      <button
        onClick={() => {
          socket.emit('room:create', { userId: organiser });
          console.log({ organiser, room, password, user, error, msg })

        }}
      >Create Rooom</button>
      <button onClick={() => {
        socket.emit('room:start', { room, organiser, password });
        console.log({ organiser, room, password, user, error, msg })

      }}>Start Meet</button>
      <button onClick={() => {
        socket.emit('room:join', { user, room, password })
        console.log({ organiser, room, password, user, error, msg })

      }}>Join Meet</button>

  <input type="text" name="" id="" value={msg} placeholder='message' onChange={(e) => setMsg(e.target.value)} />
      <button type="button" onClick={()=>{
        socket.emit('room:message',{room,message:msg,user});
      }}>Send Message</button>
    </>
  )
}

export default App