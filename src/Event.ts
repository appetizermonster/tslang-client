import { Observable } from 'rxjs';

export type EventListener<T> = (arg: T) => void;

class Event<T> {
  private listeners: Array<EventListener<T>> = [];

  public on(listener: EventListener<T>) {
    this.listeners.push(listener);
  }

  public off(listener: EventListener<T>) {
    const idx = this.listeners.indexOf(listener);
    this.listeners.splice(idx, 1);
  }

  public observable() {
    return new Observable<T>((subscriber) => {
      const listener: EventListener<T> = (obj) => subscriber.next(obj);
      this.on(listener);
      return () => this.off(listener);
    });
  }

  public emit(obj: T) {
    for (const listener of this.listeners) {
      listener(obj);
    }
  }
}

export default Event;
