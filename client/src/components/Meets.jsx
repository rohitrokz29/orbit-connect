import React, { useContext, useRef } from "react";
import { SocketContext } from "../context/SocketContext";
import { UserContext } from "../context/UserContext";
import History from "./History";
const Meets = () => {
  const { socket, SetRoom } = useContext(SocketContext);
  const { user } = useContext(UserContext);
  const roomDateRef = useRef(null);

  const createRoom = () => {};

  const joinRoom = () => {};

  return (
    <>
      <main className="main-box">
        <div className="meet-box">
          <div className="box-1">
            <div className="buttons">
              <button className="button">Join A Meeting</button>
              <button className="button">Organise A Meeting</button>
            </div>
          </div>
          <JoinMeet />
          <OrganiseMeet />
        </div>
        <div className="history-box">
          <History />
        </div>
      </main>
    </>
  );
};

export default Meets;

const JoinMeet = () => {
  const { socket, SetRoom } = useContext(SocketContext);
  const { user } = useContext(UserContext);
  const roomIdRef = useRef(null);
  const roomPasswordRef = useRef(null);
  return (
    <div className="box-2 join-meet">
      <input
        className="roomCred"
        id="room_id"
        type="text"
        ref={roomIdRef}
        autoComplete="off"
        placeholder="Meeting ID"
      />
      <input
        className="roomCred"
        id="room_pass"
        type="password"
        ref={roomPasswordRef}
        autoComplete="off"
        placeholder="Meet Password"
      />
      <button className="button"> Join Meet</button>
    </div>
  );
};

const OrganiseMeet = () => {
  const { socket, SetRoom } = useContext(SocketContext);
  const { user } = useContext(UserContext);
  const roomDateRef = useRef(null);
  return (
    <div className="box-3 organise-meet">
      <input className="roomCred" type="date" ref={roomDateRef} />
      <button className="button">Organise Meet</button>
    </div>
  );
};
