import OBSWebSocket, { OBSEventTypes, OBSRequestTypes, OBSResponseTypes } from 'obs-websocket-js'

type QueueItem<K extends keyof OBSRequestTypes> = {
  request: K,
  data?: OBSRequestTypes[K],
  callback?: (data: OBSResponseTypes[K]) => void
}
type QueueItems = QueueItem<keyof OBSRequestTypes>[]

export class OBSWebsocket {
  private client: OBSWebSocket
  private connected = false
  private queue = [] as QueueItems // Remember event listeners (allow listening before connection)

  constructor () {
    this.client = new OBSWebSocket()
  }

  connect(host: string = "localhost:4444", password: string = "") {
    this.connected = false
    return this.client.connect(`ws://${host}`, password, {rpcVersion: 1}).then(() => {
      this.connected = true
      for (let item of this.queue) {
        this.send(item.request, item.data, item.callback)
      }
      this.queue = [];
    })
  }

  on<K extends keyof OBSEventTypes>(
    name: K,
    callback: (data: OBSEventTypes[K]) => void
  ): () => void {
    this.client.on(name, callback as any);
    return () => this.client.off(name, callback as any);
  }

  off<K extends keyof OBSEventTypes>(
    name: K,
    callback: (data: OBSEventTypes[K]) => void
  ) {
    return this.client.off(name, callback as any);
  }

  send<K extends keyof OBSRequestTypes>(
    request: K,
    data?: OBSRequestTypes[K],
    callback?: (data: OBSResponseTypes[K]) => void
  ): void {
    if (this.connected) {
      this.client.call(request, data).then(r => {
        if (callback) {
          callback(r)
        }
      })
    } else {
      this.queue.push({request, data, callback: callback as any})
    }
  }

  close() {
    this.client.disconnect()
  }
}
