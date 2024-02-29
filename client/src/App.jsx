import { useState, useEffect } from "react";
import { BrowserRouter, Routes, ROute } from "react-dom";

import Meetings from "./components/Meetings";
import {SocketState } from './context/SocketContext'
function App() {
  return (
    <>
    {/* <SocketState> */}
    <Meetings/>
    {/* </SocketState> */}
      {/* <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Meetings />} />
        </Routes>
      </BrowserRouter> */}
    </>
  );
}

export default App;
