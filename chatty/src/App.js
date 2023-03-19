import logo from './logo.svg';
import './App.css';
import {useState} from "react";
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator} from "@chatscope/chat-ui-kit-react";
import { API_KEY } from './ApiKey';


function App() {
  const [typing, setTyping] = useState(false);
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

    //typing indicator 
    setTyping(true);


    //process message to ChatGPT 
    await askingGPT(newMessages);
  }

  async function askingGPT(chatMessages){
    let apiMessage = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "Chatty") {
        role = "assistant"
      } else {
        role = "user"
      }
      return { role: role, content: messageObject.message }
      
      });

      const systemMessage = {
        role: "system",
        content: "Explain all concepts like I am an undergraduate student majoring in computer science."
      }

      const apiRequestBody = {
          "model": "gpt-3.5-turbo",
          "messages": [...apiMessage]
      }

      await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + API_KEY,
          "Content-Type": "Application/json"
        },
        body: JSON.stringify(apiRequestBody)
      }).then((data) =>{
        return data.json();
      }).then((data) => {
        console.log(data)
      });
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
            <MessageList
            typingIndicator={typing ? <TypingIndicator content="Chatty is typing"/>: null}
            >
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
