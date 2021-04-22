import {
  OBSWebsocketRequests,
  OBSWebsocketResponses,
  OBSWebsocketStatuses,
} from "./types";
import { sha256 } from "../utils/crypto";
import { EventEmitter } from "../utils/EventEmitter";

let messageId = 1;

function generateMessageId() {
  return messageId++;
}

export class OBSWebsocket extends EventEmitter {
  private ws!: WebSocket;
  private messageCallbacks: { [key: string]: Function } = {};

  connect(host: string = "localhost:4444", password: string = "") {
    const self = this;
    return new Promise<void>(function (resolve, reject) {
      self.ws = new WebSocket(`ws://${host}`);
      self.ws.onopen = () => {
        self.send("GetAuthRequired", {}, async function (data) {
          const secretString = password + data.salt;
          const secret = btoa(await sha256(secretString));
          const auth = btoa(await sha256(secret + data.challenge));
          self.send("Authenticate", { auth }, (data) => {
            if (data.status === OBSWebsocketStatuses.ERROR) {
              reject(data.error);
            }
            resolve();
          });
        });
      };
      self.ws.onerror = (evt) => {
        reject(evt);
      };
      self.ws.onmessage = (evt) => {
        const data = JSON.parse(evt.data);
        const callback = self.messageCallbacks[data["message-id"]];
        if (callback) {
          callback(data);
        }
        if (data["update-type"]) {
          self.emit(data["update-type"], data);
        }
      };
    });
  }

  on<K extends keyof OBSWebsocketResponses>(
    name: K,
    callback: (data: OBSWebsocketResponses[K]) => void
  ) {
    super.on(name, callback);
  }

  send<K extends keyof OBSWebsocketRequests>(
    request: K,
    data?: OBSWebsocketRequests[K],
    callback?: (data: OBSWebsocketResponses[K]) => void
  ): void {
    const messageId = generateMessageId();
    if (callback) {
      this.messageCallbacks[messageId] = callback;
    }
    this.ws.send(
      JSON.stringify({
        "request-type": request,
        "message-id": messageId.toString(),
        ...data,
      })
    );
  }
}
