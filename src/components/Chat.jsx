import React, { useState, useEffect } from "react";
import axios from "axios";
import Message from "./Message";

const Chat = ({ idInstance, apiTokenInstance, phone }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Функция для отправки сообщения
  const sendMessage = async () => {
    try {
      const response = await axios.post(
        `https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`,
        {
          chatId: `${phone}@c.us`,
          message: newMessage,
        }
      );
      
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: newMessage, isMyMessage: true },
      ]);
      setNewMessage("");
    } catch (error) {
      console.error("Ошибка при отправке сообщения:", error);
    }
  };

  // Функция для получения сообщений
  const receiveMessages = async () => {
    try {
      const response = await axios.get(
        `https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`
      );

      if (response.data) {
        const notification = response.data;

        // Проверяем тип уведомления
        if (notification.body.typeWebhook === "outgoingMessageReceived") {
          const messageData = notification.body.messageData;
          // Проверяем, что это текстовое сообщение
          if (messageData && messageData.typeMessage === "textMessage") {
            // Проверяем наличие textMessageData
            if (
              messageData.textMessageData &&
              messageData.textMessageData.textMessage
            ) {
              const text = messageData.textMessageData.textMessage;
            
              // Добавляем сообщение в список
              setMessages((prevMessages) => [
                ...prevMessages,
                { text: text, isMyMessage: false },
              ]);
            } 
          } 
        } 

        // Удаляем уведомление после обработки
        await axios.delete(
          `https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${notification.receiptId}`
        );
      } 
    } catch (error) {
      console.error("Ошибка при получении сообщения:", error);
    }
  };

  // Используем useEffect для периодической проверки новых сообщений
  useEffect(() => {
    const interval = setInterval(receiveMessages, 5000); // Проверка каждые 5 секунд
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div
        style={{
          height: "400px",
          overflowY: "scroll",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        {messages.map((msg, index) => (
          <Message key={index} text={msg.text} isMyMessage={msg.isMyMessage} />
        ))}
      </div>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Введите сообщение"
        />
        <button onClick={sendMessage}>Отправить</button>
      </div>
    </div>
  );
};

export default Chat;
