import React, { useRef,useEffect,useContext } from "react";
import {SocketContext} from '../context/SocketContext';
const Meetings = () => {
    // const {userStream,members}=useContext(SocketContext)
    const videoStream=useRef(null)
    
    useEffect(() => {
        if(!videoStream) return
        videoStream.muted = true;
        navigator.mediaDevices
          .getUserMedia({
            video: true,
            audio: true,
            facingMode:'user'
          })
          .then((stream) => {
            let video = videoStream.current;
            video.srcObject = stream;
            video.play();
            // socket.emit("room:stream", { room, user: user.name, stream });
          })
          .catch((err) => {
            console.error(err);
          });
      }, [videoStream]);
    
  return (
    <>
      <h1>MEETINGS</h1>
      <video autoPlay={true} ref={videoStream}>
        <source />
      </video>
    </>
  );
};

export default Meetings;
