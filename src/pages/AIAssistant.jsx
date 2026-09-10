import { GoogleGenAI } from "@google/genai";
import { useState } from "react";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GIMINI_API,
});

function AIAssistant() {
  let [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm your Movie Assistant. Ask me anything about movies and TV shows.",
    },
  ]);

  let [input, setInput] = useState("");
  let [loading, setLoading] = useState(false);

  async function getAnswer(currentMessages) {
    const contents = currentMessages.map(function (message) {
      return {
        role: message.role === "assistant" ? "model" : "user",
        parts: [{ text: message.content }],
      };
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",

      config: {
        systemInstruction: `
        You are an AI movie and TV show assistant.

        You can ONLY answer questions related to movies and TV shows.

        Keep your answers short, simple, and conversational.

        Do not give long explanations unless the user explicitly asks for more details.

        For simple questions, answer with a simple and direct answer.

        Avoid unnecessary background information, disclaimers, repetition, or explanations.

        If the user asks about anything unrelated to movies or TV shows,
        reply exactly:
        "I am an AI movie assistant. I can only help with movies and TV show questions."
      `,
      },

      contents: contents,
    });

    return response.text;
  }

  async function sendMessage() {
    if (input.trim() === "" || loading) {
      return;
    }

    let userMessage = {
      role: "user",
      content: input,
    };

    let updatedMessages = messages.concat(userMessage);

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      let answer = await getAnswer(updatedMessages);

      let aiMessage = {
        role: "assistant",
        content: answer,
      };

      setMessages(function (oldMessages) {
        return oldMessages.concat(aiMessage);
      });
    } catch (error) {
      console.error(error);

      setMessages(function (oldMessages) {
        return oldMessages.concat({
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
        });
      });
    }

    setLoading(false);
  }

  return (
    <div className="ai-assistant">
      <h1>AI Movie Assistant</h1>

      <div className="chat-box">
        {messages.map(function (message, index) {
          return (
            <div
              key={index}
              className={
                message.role === "user"
                  ? "message user-message"
                  : "message ai-message"
              }
            >
              <strong>{message.role === "user" ? "You" : "AI"}</strong>

              <p>{message.content}</p>
            </div>
          );
        })}

        {loading && (
          <div className="message ai-message">
            <strong>AI</strong>
            <p>Thinking...</p>
          </div>
        )}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Ask me about movies or TV shows..."
          value={input}
          onChange={function (event) {
            setInput(event.target.value);
          }}
          onKeyDown={function (event) {
            if (event.key === "Enter") {
              sendMessage();
            }
          }}
        />

        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default AIAssistant;
