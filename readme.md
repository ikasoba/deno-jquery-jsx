# deno-jquery-jsx

JQueryをできるかぎり、モダンに書いてみるやつ

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

## プロジェクトの初期化

```
deno run -rA https://raw.githubusercontent.com/ikasoba/deno-jquery-jsx/main/init.ts
```