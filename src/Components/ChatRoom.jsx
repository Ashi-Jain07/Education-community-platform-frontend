import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("https://education-community-platform-backend.onrender.com");

function ChatRoom() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const name = localStorage.getItem("firstName")

    // Use sockets for real time chat
    useEffect(() => {
        socket.on("receiveMessage", (newMessage) => {
            setMessages((prev) => [...prev, newMessage]);
        });

        return () => socket.off("receiveMessage");
    }, []);

    const sendMessage = () => {
        socket.emit("sendMessage", message);
        setMessages((prev) => [...prev, message]);
        setMessage("");
    };

    return (
        <div>
            <h1 className="text-4xl font-bold text-center p-2">Chat Room</h1>
            <div className=" flex justify-center">
                <div className="text-xl mt-20 w-1/2">
                    {messages.map((msg, index) => (
                        <div key={index}>
                            <h1 className="font-bold text-right">{name}</h1>
                            <p className="text-right">{msg}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="fixed bottom-5 left-1/3 w-full">
                <input
                    type="text"
                    value={message}
                    placeholder="Type a message"
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-1/3 h-10 rounded-md p-1 text-xl"
                />
                <button onClick={sendMessage} className="font-bold ml-2 text-lg">Send</button>
            </div>
        </div>
    );
};

export default ChatRoom;