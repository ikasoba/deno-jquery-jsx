import $ from "../deps/jquery.ts";

export type Subscriber = () => void;

export class Signal<T> {
  private subscribers = new Set<Subscriber>();

  constructor(private _value: T) {}

  get value() {
    return this._value;
  }

  set value(newValue: T) {
    if (this._value == newValue) return;

    this._value = newValue;

    for (const fn of this.subscribers) {
      fn();
    }
  }

  subscribe(fn: Subscriber) {
    this.subscribers.add(fn);
  }
}

export const useEffect = (fn: () => void, deps?: Signal<any>[]) => {
  for (const s of deps ?? []) {
    s.subscribe(fn);
  }

  requestAnimationFrame(() => fn());
};

export const valueToNode = (
  value: Element | JQuery | { toString(): string } | Signal<any>,
): Element | Text | JQuery => {
  if (value instanceof Element) {
    return value;
  } else if (value instanceof $) {
    return value as JQuery;
  } else if (value instanceof Signal) {
    return signalToNode(value);
  } else {
    return document.createTextNode(value.toString());
  }
};

export const signalToNode = (signal: Signal<any>) => {
  let prevNode = $(valueToNode(signal.value));

  signal.subscribe(() => {
    const node = valueToNode(signal.value);

    prevNode.replaceWith(node);

    prevNode = $(node);
  });

  return prevNode;
};
