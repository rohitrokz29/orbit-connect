import React, { useRef, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { SocketContext } from "../context/SocketContext.jsx";

const Meetings = () => {
  const { socket, members, room } = useContext(SocketContext);
  const { user } = useContext(UserContext);
  const videoStream = useRef(null);

  useEffect(() => {
    if (!videoStream) return;
    videoStream.muted = true;
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
        facingMode: "user",
      })
      .then((stream) => {
        let video = videoStream.current;
        video.srcObject = stream;
        video.play();
        stream.getAudioTracks().forEach((track) => {
          track.enabled = false;
        });
        socket?.emit("room:stream", { room, user: user?.name, stream });
      })
      .catch((err) => {
        console.error(err);
      });
    return () => {
      videoStream?.current?.srcObject
        ?.getTracks()
        .forEach((track) => track.stop());
    };
  }, [videoStream]);

  return (
    <>
      <h1>MEETINGS</h1>
      <video autoPlay={true} ref={videoStream} preload={"none"}>
        <source />
      </video>
    </>
  );
};


export default  Meetings;