interface Listeners {
  [eventName: string]: Function[];
}

export class EventEmitter {
  private listeners: Listeners = {};

  public on(name: string, callback: Function) {
    const listeners = this.listeners[name] || [];
    this.listeners[name] = [...listeners, callback];
  }

  public off(name: string, callback: Function) {
    const listeners = this.listeners[name] || [];
    this.listeners[name] = listeners.filter((l) => l !== callback);
  }

  public emit(name: string, data: any) {
    const listeners = this.listeners[name] || [];
    listeners.forEach((l) => l(data));
  }

  public destroy() {
    this.listeners = {};
  }
}
