import {Component, OnInit} from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-websocket',
  templateUrl: './websocket.component.html',
  styleUrls: ['./websocket.component.css']
})
export class WebsocketComponent implements OnInit {
  socket: any;
  host: string;
  port: string;
  connectRes: string;
  msg: string;
  sendRes: string;
  recvRes: string;

  constructor() {
  }

  ngOnInit() {
  }

  connect() {
    let socketUrl = "http://" + this.host + ":" + this.port;

    this.socket = io.connect(socketUrl, {"forceNew": true});

    this.socket.on("connect", function () {
      this.connectRes = socketUrl + " Connected.";
    }.bind(this));

    this.socket.on("disconnect", function () {
      this.connectRes = socketUrl + " disconnected.";
    }.bind(this));

    this.socket.on("message", function (message) {
      this.recvRes = "Message From Server : " + message;
    }.bind(this));
  }

  sendMessage() {
    this.socket.emit("message", this.msg);
    this.sendRes = this.msg + " Send Complete.";
  };
}
