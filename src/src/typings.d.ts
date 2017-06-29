/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

declare module 'socket.io-client' {
  var socket: any;
  export = socket;
}
