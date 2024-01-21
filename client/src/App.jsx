import { useState,useEffect } from 'react'
import socketIO from 'socket.io-client'


const socket = socketIO.connect('http://localhost:3000')

function App() {
  const [count, setCount] = useState(0)
  const [heading, setHeading] = useState("Vite")
  useEffect(() => {
    socket.on('io:recieved_message',(data)=>{
      setHeading(data['msg'])
    })
  }, [])

  return (
    <>
     
      <h1>{heading}</h1>
      <div className="card">
        <button onClick={() => {
          setCount((count) => count + 1)
          socket.emit('io:send_message', { msg: "hello Its rohit" })
        }
        }>
        </button>
      </div>
    </>
  )
}

export default App
