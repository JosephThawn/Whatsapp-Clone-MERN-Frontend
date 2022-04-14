import './App.css';
import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Pusher from 'pusher-js';
import axios from "./axios";

function App() {
  const [messages, setMessages] = useState([]);


  //fecting the messages
  useEffect(() => {
    axios.get('/messages/sync')
    .then((response) => {
      setMessages(response.data);
    })

  }, []);

  useEffect(() => {
    const pusher = new Pusher('880b0a553e52bf96b7b4', {
      cluster: 'eu'
    });

    //this sets  for listenr for pusher
    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      // alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage]);
    });

    //cleanup function
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }

  }, [messages]);

  console.log(messages);


  return (
    <div className="app">
      <div className="app__body">
        <Sidebar/>
        <Chat messages={messages}/>
      </div>
    

    
    </div>
  );
}

export default App;
