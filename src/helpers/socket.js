import SocketIo from "socket.io-client";


export const Socket = () => {
   console.log('INIT SOCKET')
   return SocketIo.connect(process.env.REACT_APP_BASE_SOCKET)
}
