import { ComponentChild, ExtractProp, h } from "./h.ts";

export declare namespace JSX {
  type Element = JQuery<HTMLElement>;

  interface IntrinsicElements {
    [k: string]: ExtractProp<string>;
  }

  interface ElementChildrenAttribute {
    children: ComponentChild[];
  }
}

export const jsx = h;
export const jsxs = h;
