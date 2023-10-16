import $ from "../deps/jquery.ts";
import { Signal, valueToNode } from "./reactive.ts";

export type Component<P = {}> = (prop: P) => JQuery;

export type ExcludeFirst<T extends string, U extends string | number | bigint> =
  T extends `${U}${infer R}` ? R : T;

export type ToPascal<T extends string> = T extends `${infer X}${infer Y}`
  ? `${Uppercase<X>}${Y}`
  : never;

export type ToCamel<T extends string> = T extends `${infer X}${infer Y}`
  ? `${Lowercase<X>}${Y}`
  : never;

export type Events = {
  [K in `on${ToPascal<keyof HTMLElementEventMap>}`]?: (
    event: HTMLElementEventMap[ToCamel<ExcludeFirst<K, "on">>],
  ) => void;
};

export interface ElementProp extends Events {
  class?: string;
  children?: ComponentChild[];
}

export type ExtractProp<C extends string | Component> =
  | (C extends Component<infer P> ? P : never)
  | (C extends string ? ElementProp
    : never);

export type ComponentChild =
  | JQuery.htmlString
  | JQuery.TypeOrArray<JQuery.Node | JQuery<JQuery.Node>>
  | Signal<any>;

export const startsWith = <T extends string>(
  value: string,
  text: T,
): value is `${T}${string}` => {
  return value.startsWith(text);
};

export const h = <C extends string | Component>(
  name: C,
  _prop: ExtractProp<C>,
) => {
  if (typeof name == "string") {
    const elm = $(document.createElement(name));
    const prop = _prop as ExtractProp<string>;

    for (const _k in prop) {
      const k = _k as keyof ElementProp;

      if (startsWith(k, "on")) {
        const e = k.slice(2).replace(/^./, (x) => x.toLowerCase());

        elm.on(e, prop[k] as unknown as ((E: Event) => void));
      } else if (k == "children") {
        const children = prop[k];
        if (children) {
          elm.append(...children.map((x) => valueToNode(x)));
        }
      } else {
        const value = prop[k];
        if (value != null) elm.attr(k, value);
      }
    }

    return elm;
  } else {
    const prop = _prop as ExtractProp<Component>;

    return name(prop);
  }
};
