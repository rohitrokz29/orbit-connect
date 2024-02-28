import React, { createContext, useEffect, useContext, useState } from "react"
import { io } from 'socket.io-client';
import { UserContext } from "./UserContext";

export const SocketContxt = createContext();
export const socket = io(process.env.SOCKET_IO_CONNECTION.toString());

//FILL UP THE COMMENTED CODE AND CHECK VIDEO
export const SocketState = ({ children }) => {
    const [room, setRoom] = useState("");
    const { user, error } = useContext(UserContext)
    const [members, setMembers] = useState([]);
    const userStream = useRef(null)

    useEffect(() => {
        socket.on('room:start', (data) => {
            console.log(data)
            // setMsg(data['message']);
            // console.log({ organiserId:organiser, room, password, user, error, msg })
        })
        socket.on('room:new_user', (data) => {
            // setMsg(`${data['user']} joined`)
            console.log(data)
        })
        socket.on('room:error', (data) => {
            // console.log('error')
            setError(data['message'])
        })
        socket.on("room:message", ({ message, user }) => {
            // setMsg(message + user);
            console.log({ message, user })
        })
        socket.on("room:stream", ({ user, stream }) => {
            setMembers([...members, stream]);
        })
        socket.on("room:leave",({message})=>{
            //TODO
        })
        return () => {
            socket.disconnect();
        }
    }, [socket])

    useEffect(() => {
        userStream.muted = true;
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then(stream => {
            let video = userStream.current;
            video.srcObject = stream;
            video.play();
            socket.emit("room:stream", { room, 'user': user.name, stream });
        })
        .catch(err=>{
            console.error(err);
        })
    }, [userStream])

    return (
        <SocketContxt.Provider>
            {children}
        </SocketContxt.Provider>
    )
}