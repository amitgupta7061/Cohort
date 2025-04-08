import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [socket, setSocket] = useState();
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if(!socket) return;
    // @ts-ignore
    socket.send(message);
  }

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000')
    //@ts-ignore
    setSocket(ws);
    ws.onmessage = (e) => {
      alert(e.data);
    }
  }, [])

  return (
    <div>
      <input onChange={(e)=> setMessage(e.target.value)} type="text" placeholder='Enter Here'/>
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}

export default App
