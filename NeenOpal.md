Great — you're diving into JavaScript **type coercion** and **operator weirdness**, especially with `+`, `{}`, and `[]`. Here's a curated list of such quirky expressions and their outputs, with brief explanations:

---

## 🧠 JavaScript Weird Coercion Examples

| Expression      | Output                           | Explanation                                          |
| --------------- | -------------------------------- | ---------------------------------------------------- |
| `[] + {}`       | `"[object Object]"`              | `[] → ""`, `{}` → `"[object Object]"`                |
| `{}` + `[]`     | `0`                              | `{}` is parsed as block, `+[]` → `0`                 |
| `({} + [])`     | `"[object Object]"`              | Object coerces to `"[object Object]"`, `+[]` is `""` |
| `[] + []`       | `""`                             | Both arrays become empty strings                     |
| `[] + 1`        | `"1"`                            | `[] → ""`, `"" + 1 = "1"`                            |
| `1 + []`        | `"1"`                            | Same as above                                        |
| `[] - 1`        | `-1`                             | `[] → 0`, `0 - 1 = -1`                               |
| `[] + false`    | `"false"`                        | `[] → ""`, `"false"`                                 |
| `false + []`    | `"false"`                        | `false → "false"`, `[] → ""`                         |
| `[] * []`       | `0`                              | `[] → 0`, `0 * 0 = 0`                                |
| `{} + {}`       | `[object Object][object Object]` | If wrapped like `({} + {})`                          |
| `[] == false`   | `true`                           | `[] → false`, `false == false`                       |
| `[] == ![]`     | `true`                           | `![] → false`, `[] == false → true`                  |
| `null + 1`      | `1`                              | `null → 0`, `0 + 1 = 1`                              |
| `undefined + 1` | `NaN`                            | `undefined → NaN`, `NaN + 1 = NaN`                   |
| `true + true`   | `2`                              | `true → 1`, `1 + 1 = 2`                              |
| `true - false`  | `1`                              | `1 - 0 = 1`                                          |
| `NaN === NaN`   | `false`                          | `NaN` is never equal to `NaN`                        |
| `'5' - 1`       | `4`                              | `'5' → 5`, `5 - 1 = 4`                               |
| `'5' + 1`       | `"51"`                           | `'5' + 1 → string concat`                            |
| `typeof null`   | `"object"`                       | Legacy bug in JS                                     |
| `typeof NaN`    | `"number"`                       | NaN is a special number                              |

---

### 🔄 Bonus: Array + Object Coercion Variants

```js
console.log([] + {}); // "[object Object]"
console.log({} + []); // 0 (as a block + array)
console.log({} + []); // "[object Object]"
console.log([] + []); // ""
console.log({} + {}); // NaN or "[object Object][object Object]" depending on context
```

---

### 🔧 Tips:

- Always use **parentheses** to avoid ambiguity: `({} + [])`
- Use **strict mode** (`===`) to avoid coercion surprises
- Coercion often involves converting things to **strings**, **numbers**, or **booleans**

---

Want me to generate an interactive playground or table you can test yourself in the browser?

Here's a curated list of **JavaScript polyfills** that are commonly **asked or referenced in interviews**, especially for roles involving frontend, browser compatibility, or understanding of the JS runtime.

---

## ✅ **Most Common Polyfills Asked in JS Interviews**

| Feature                       | Native Support From | Common Polyfill Use / Asked In         |
| ----------------------------- | ------------------- | -------------------------------------- |
| `Array.prototype.includes()`  | ES2016 (ES7)        | Replace with `indexOf`                 |
| `Array.prototype.flat()`      | ES2019              | Replace with recursion + reduce        |
| `Object.assign()`             | ES2015 (ES6)        | Use manual key copy                    |
| `Promise`                     | ES2015 (ES6)        | Use `es6-promise` or polyfill manually |
| `fetch()`                     | Modern Browsers     | Use `XMLHttpRequest` or `whatwg-fetch` |
| `Array.prototype.forEach()`   | ES5                 | Can be polyfilled via `for` loop       |
| `Array.prototype.map()`       | ES5                 | Polyfilled with loop                   |
| `Function.prototype.bind()`   | ES5                 | Commonly asked to write manually       |
| `Object.entries()`            | ES2017              | Polyfill using `for...in` loop         |
| `Object.values()`             | ES2017              | Same as above                          |
| `Array.isArray()`             | ES5                 | Use `Object.prototype.toString.call()` |
| `String.prototype.includes()` | ES2015              | Replace with `indexOf`                 |
| `Number.isNaN()`              | ES2015              | Use `typeof` + `isNaN` combo           |
| `Array.prototype.reduce()`    | ES5                 | Often asked to write from scratch      |
| `Element.prototype.closest()` | DOM4                | Polyfill via `parentElement` loop      |
| `classList`                   | HTML5               | Often polyfilled in old DOM APIs       |
| `requestAnimationFrame()`     | HTML5               | Fallback using `setTimeout()`          |

---

## 🧪 Polyfill Examples Interviewers May Ask You to Implement

1. **Polyfill for `Array.prototype.includes()`**

```js
if (!Array.prototype.includes) {
  Array.prototype.includes = function (value) {
    return this.indexOf(value) !== -1;
  };
}
```

2. **Polyfill for `Function.prototype.bind()`**

```js
if (!Function.prototype.bind) {
  Function.prototype.bind = function (context, ...args1) {
    const fn = this;
    return function (...args2) {
      return fn.apply(context, args1.concat(args2));
    };
  };
}
```

3. **Polyfill for `Object.assign()`**

```js
if (!Object.assign) {
  Object.assign = function (target, ...sources) {
    sources.forEach((src) => {
      for (let key in src) {
        if (Object.prototype.hasOwnProperty.call(src, key)) {
          target[key] = src[key];
        }
      }
    });
    return target;
  };
}
```

4. **Polyfill for `Promise` (simplified)**

> Interviewers may ask conceptually or ask for a **simple Promise implementation**.

```js
function MyPromise(executor) {
  let onResolve, onReject;
  let resolved = false,
    rejected = false,
    value;

  this.then = function (callback) {
    onResolve = callback;
    if (resolved) onResolve(value);
    return this;
  };

  this.catch = function (callback) {
    onReject = callback;
    if (rejected) onReject(value);
    return this;
  };

  function resolve(val) {
    resolved = true;
    value = val;
    if (onResolve) onResolve(val);
  }

  function reject(val) {
    rejected = true;
    value = val;
    if (onReject) onReject(val);
  }

  executor(resolve, reject);
}
```

---

## 🔍 Interview Tips

- Be ready to **write simple polyfills from scratch**.
- Focus on understanding how **methods like `bind`, `map`, `reduce`** work internally.
- Learn about **feature detection** using `if (!Array.prototype.includes)` etc.
- Study **how Babel handles polyfills** using `core-js`.

---

Would you like a PDF cheat sheet of polyfills + implementations for interview prep?
