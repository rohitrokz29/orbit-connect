import React from 'react'
import { SocketContxt } from '../context/SocketContext'

const Meetings = () => {
    const { userStream, members } = useContext(SocketContxt);
    return (
        <>
            <video ref={userStream} />
        </>
    )
}

export default Meetings