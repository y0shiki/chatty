import logo from './logo.svg';
import './App.css';
import {useState} from "react";
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator} from "@chatscope/chat-ui-kit-react";

function App() {
  const [messages, setMessages] = useState([
    {
      message: "Hey, I am Chatty!",
      sender: "Chatty"

    }
  ])

  const handelSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing"
    }

    const newMessages = [...messages, newMessage];
    //update the message state
    setMessages(newMessages);

    //process message to ChatGPT 
  }
  return (
    <div className="App">
      <div className='Head'>
        <header>
          <h1>CHATTY</h1>
        </header>
      </div>

      <div style={{height: "100%", width: "100%"}}>
        <MainContainer>
          <ChatContainer>
            <MessageList>
              {messages.map((message, i) => {
                return <Message key={i} model={message} />
              })}

            </MessageList>
            <MessageInput placeholder='Type message here' onSend={handelSend} />
          </ChatContainer>
        </MainContainer>

      </div>

    </div>
  );
}

export default App;
