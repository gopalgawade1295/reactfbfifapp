import './App.css';
import MessageScreen from './components/MessageScreen';
import React, { useState } from 'react';

function App() {
  const [messageScreen, setMessageScreen] = useState(false)
  const [postMessage, setPostMessage] = useState([])

  return (
    <div className='App'>
      <nav className='navbar navbar-light' style={{ background: '#4267B2' }}>
        <h3>Facebook</h3>
      </nav>
      <br />
      <br />
      <button className='btn btn-primary btn-sm' style={{ background: '#4267B2', color: 'white' }} onClick={() => setMessageScreen(true)}>Post</button>
      <br />
      <br />
      {messageScreen ? <MessageScreen setMessageScreen={setMessageScreen} postMessage={postMessage} setPostMessage={setPostMessage} /> : null}
      {
        postMessage.map(msg =>
          <div key={msg.id} className='Post'>
            <p className='P' style={{ background: msg.color, color: msg.font }}>{msg.message}</p>
            <img src={msg.selectGiphy.images.fixed_height.url} />
          </div>)
      }
    </div>
  );
}

export default App;
