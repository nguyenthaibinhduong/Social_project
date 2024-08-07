import { createContext, useContext, useEffect, useRef } from "react";
import io from 'socket.io-client';
const SocketContext = createContext();
export const useSocket = () => {
    return useContext(SocketContext);
}
export const SocketProvider = ({ children }) => {
    const socket = useRef();

    useEffect(() => {
        socket.current = io('http://localhost:8008');

        return () => {
            socket.current.disconnect();
        };
    }, []);
    return (
        <SocketContext.Provider value={socket.current}>
            {children}
        </SocketContext.Provider>
    )
}
