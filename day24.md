Great set of questions—this looks like solid prep for a frontend role. Here's a breakdown of the answers:

---

### **1. Performance-Based Questions (SSR, Bundling, etc.)**

- **SSR (Server Side Rendering)** improves SEO and initial page load by pre-rendering HTML on the server.
- **Bundling** combines your JS, CSS, etc. into fewer files to reduce HTTP requests.
- **Tree shaking** removes unused code.
- **Code splitting** breaks the bundle into smaller pieces to load pages/components lazily.
- **Image optimization, lazy loading, memoization**, and **caching** also play key roles.

---

### **2. BreadCrum Output**

```js
const breadCrum = [
  { id: 3, parentId: 12, title: "Headphones" },
  { id: 19, parentId: 28, title: "True wireless" },
  { id: 28, parentId: 3, title: "Wired" },
  { id: 12, parentId: null, title: "Audio" },
  { id: null, parentId: 19, title: "Bluetooth" },
];

const idMap = new Map(breadCrum.map((item) => [item.id, item]));
let result = [];
let node = breadCrum.find((item) => item.id === null); // Start from Bluetooth

while (node) {
  result.unshift(node.title);
  node = idMap.get(node.parentId);
}

console.log(result.join(" >> ")); // Output: Audio >> Headphones >> Wired >> True wireless >> Bluetooth
```

---

### **3. setTimeout vs setInterval**

```js
setTimeout(() => console.log("One-time"), 1000); // Executes once after 1s
setInterval(() => console.log("Repeats"), 1000); // Executes every 1s

// Edge Case:
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0); // Logs 3, 3, 3 (because of var & event loop)
}
```

---

### **4. useMemo vs useCallback**

- `useMemo`: Caches **computed value**
- `useCallback`: Caches **function instance**
- Use `useCallback` when passing a stable function to children.
- Use `useMemo` when expensive calculation is involved.

---

### **5. Add Event Listener Programmatically**

```js
const btn = document.getElementById("myBtn");
btn.addEventListener("click", () => alert("Clicked!"));
```

---

### **6. useRef() and Use Cases**

- Holds **mutable value** that doesn't trigger re-render.
- Use cases:
  - DOM references (`ref.current`)
  - Store interval IDs or previous props/state
  - Focus input fields

---

## **Round 2: Machine Coding**

### **1. Controlled ProgressBar (Max 3 at a time)**

> Would you like the full React code for this? It's a bit long—I'll give you the logic here:

- Use an array of progress bars in state.
- Track how many are currently “running”.
- Start only if running bars < 3.
- Use `setInterval` to update progress by 10% every second.

---

### **2. React Optimization Techniques**

**SSR:**

- Static Generation (SSG) where possible
- Avoid fetching unnecessary data
- Cache SSR responses

**Client:**

- Memoization (`useMemo`, `React.memo`)
- Lazy loading (`React.lazy`)
- Code splitting (via `dynamic import`)
- Avoid unnecessary re-renders (PureComponent/useCallback)

---

### **3. Portals in React**

- Allows rendering children into a DOM node outside the parent DOM hierarchy.
- Usage: Tooltips, modals, popups.

```jsx
ReactDOM.createPortal(<MyModal />, document.getElementById("modal-root"));
```

---

### **4. Repaint vs Reflow (Rework)**

- **Repaint**: A visual update (e.g., color change)
- **Reflow**: Layout changes (e.g., resizing, adding elements). Heavier than repaint.

---

### **5. Parallel API Calls using `Promise.allSettled()`**

```js
Promise.allSettled([fetch(url1), fetch(url2)]).then((results) =>
  results.forEach((r) => console.log(r.status))
);
```

- Internally, runs all promises simultaneously and waits for all to settle (resolved or rejected).

---

### **6. `Array.sort()` Algorithm + Weird Case**

- Uses **Timsort** (combination of merge sort and insertion sort).

```js
[1, null, 5, 2, undefined].sort();
// Output: [1, 2, 5, null, undefined]
```

- `null` becomes 0, `undefined` is pushed to the end.

---

### **7. Prevent Multiple API Calls on Button Click**

- Use **debounce**, **throttle**, or **disable the button** after click.

```js
let isLoading = false;

const handleClick = () => {
  if (isLoading) return;
  isLoading = true;
  fetch("/api").finally(() => (isLoading = false));
};
```

---

### **8. Cancel Old API Calls and Keep Latest**

- Use **AbortController**:

```js
let controller = new AbortController();

function fetchData() {
  controller.abort(); // cancel old
  controller = new AbortController();
  fetch("/api", { signal: controller.signal });
}
```

---

### **9. Infinite Scroll in React**

- Add `scroll` event listener to window or container.
- Trigger API call when user reaches near bottom.

```js
useEffect(() => {
  const onScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 100
    ) {
      loadMore();
    }
  };
  window.addEventListener("scroll", onScroll);
  return () => window.removeEventListener("scroll", onScroll);
}, []);
```

---

### **10. HOC (Higher-Order Component)**

- A function that takes a component and returns a new component.

```js
const withAuth = (Component) => (props) =>
  isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />;
```

---

Let me know if you want the code for the progress bar or mock questions to practice.
