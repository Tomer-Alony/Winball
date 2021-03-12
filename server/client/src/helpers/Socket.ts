import * as io from 'socket.io-client';

const EVENTS = {
    CONNECT: 'connect',
    DISCONNECT: 'disconnect',
    MESSAGE: 'message'
};

export default class Socket {
    private onChange: (isConnected: boolean) => void;
    private onMessage: (message: string) => void;
    private socket: any;

    constructor(onChange: (isConnected: boolean) => void, onMessage: (message: string) => void) {
        this.onChange = onChange;
        this.onMessage = onMessage;
        this.socket = '';
    }

    public connect = () => {
        const host = `localhost:${8000}`; // Running from local network
        this.socket = io.io(host).connect()

        this.socket.on(EVENTS.CONNECT, this.onConnected);
    };

    public onConnected = () => {
        this.socket.on(EVENTS.MESSAGE, this.onMessage);
        this.onChange(true);
    };

    public sendMessage = (message: string ) => {
        if (typeof this.socket.emit === 'function') {
            this.socket.emit(EVENTS.MESSAGE, message)
        } else {
            console.error('Cannot emit socket messages. Socket.io not connected.');
        }
    };

    public disconnect = () => this.socket.close();
}