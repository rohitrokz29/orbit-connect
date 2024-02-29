import React, {
  createContext,
  useEffect,
  useContext,
  useState,
  useRef,
} from "react";
import socketIO from "socket.io-client";
import { UserContext } from "./UserContext";
export const SocketContext = createContext();

//FILL UP THE COMMENTED CODE AND CHECK VIDEO
export const SocketState = ({ children }) => {
  const socket = socketIO.connect(process.env.SOCKET_IO_CONNECTION.toString());

  const [room, setRoom] = useState("");
  const { user, error } = useContext(UserContext);
  const [members, setMembers] = useState([]);
  const [userStream, setUserStream] = useState(null);
  useEffect(() => {
    socket.on("room:start", (data) => {
      console.log(data);
      // setMsg(data['message']);
      // console.log({ organiserId:organiser, room, password, user, error, msg })
    });
    socket.on("room:new_user", (data) => {
      // setMsg(`${data['user']} joined`)
      console.log(data);
    });
    socket.on("room:error", (data) => {
      // console.log('error')
      setError(data["message"]);
    });
    socket.on("room:message", ({ message, user }) => {
      // setMsg(message + user);
      console.log({ message, user });
    });
    socket.on("room:stream", ({ user, stream }) => {
      setMembers([...members, stream]);
    });
    socket.on("room:leave", ({ message }) => {
      //TODO
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return
  (  <SocketContext.Provider
    value={{
      room,
      members,
      userStream,
    }}
  >
    {children}
  </SocketContext.Provider>);
};
