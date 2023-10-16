# deno-jquery-jsx

JQueryをできるかぎり、モダンに書いてみるやつ

遊びで作ったのであまり出来が良くない

## よくあるカウンターの例

```tsx
import { Signal } from "jquery-jsx/mod.ts";

export function Counter() {
  const count = new Signal(0);

  return (
    <button onClick={() => count.value++}>
      count: {count}
    </button>
  );
}
```

```tsx
import { $ } from "jquery-jsx/mod.ts";
import { Counter } from "./counter.tsx";

window.addEventListener("load", () => {
  $("body").append(<Counter />);
});
```

## とりあえず適当に遊べるようにするスクリプト

```
deno run -rA https://raw.githubusercontent.com/ikasoba/deno-jquery-jsx/main/init.ts
```