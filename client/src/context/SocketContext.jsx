import React, { useState, useContext, createContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import socketIO from "socket.io-client";

export const SocketContext = createContext();

export const SocketState = ({ children }) => {
  const [socket, SetSocket] = useState(null);
  const [room, SetRoom] = useState("");
  const [members, SetMembers] = useState([]);
  const { user, isSignedIn } = useContext(UserContext);

  useEffect(() => {
    const newSocket = socketIO.connect(process.env.SOCKET_IO_CONNECTION);
    SetSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [isSignedIn]);
  useEffect(() => {
    console.log(socket);
    if (!socket) return;
    socket.on("room:start", (data) => {});
    socket.on("room:new_user", (data) => {});
    socket.on("room:error", (data) => {});
    socket.on("room:message", ({ message, user }) => {});
    socket.on("room:stream", ({ user, stream }) => {});
    socket.on("room:leave", ({ message }) => {});
    return () => {
      socket.disconnect();
    };
  }, [socket]);
  return (
    <SocketContext.Provider
      value={{
        socket,
        room,
        members,
        SetRoom
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
