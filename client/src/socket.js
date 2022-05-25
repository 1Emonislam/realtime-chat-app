import io from 'socket.io-client';
import store from './store/store'
// const sockets = io('http://localhost:3001', { autoConnect: true, forceNew: true });
const sockets = io('http://localhost:5000',{
    auth: {
        data: store.getState()?.auth?.user
      },
      query: store.getState()?.auth?.user?.user?._id
});
export default sockets;
