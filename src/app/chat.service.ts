import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import {GlobalConst} from "./globalconst";

@Injectable()
export class ChatService {
  private url = GlobalConst.NODE_ENDPOINT;
  private socket;

  sendMsg(msg) {
    this.socket.emit('add-msg', msg);
    console.log("msg SENT");
  }

  getMsgs() {
    let obsable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('new-msg', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      }
    })
    return obsable;
  }

}
