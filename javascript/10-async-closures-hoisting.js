// ════════════════════════════════════════════════════════════════════════════════
// 10 — HOISTING, CLOSURES, PROMISES, ASYNC/AWAIT & THE EVENT LOOP
// ════════════════════════════════════════════════════════════════════════════════
//
// This file covers JavaScript's most tricky and interview-favorite concepts:
// hoisting, closures (with practical patterns), Promises, async/await,
// and the event loop (microtasks vs macrotasks).
//
// ════════════════════════════════════════════════════════════════════════════════


// ════════════════════════════════════════════════════════════════════════════════
// 1. HOISTING
// ════════════════════════════════════════════════════════════════════════════════
// Hoisting is JavaScript's behavior of moving DECLARATIONS to the top
// of their scope before code executes. Only the DECLARATION is hoisted,
// NOT the initialization/assignment.

// ──── 1a. var is hoisted (initialized with undefined) ────

// ✅ var declarations are hoisted to the top of the function scope
console.log(hoistedVar); // undefined — NOT a ReferenceError!
var hoistedVar = 'I exist now';
console.log(hoistedVar); // "I exist now"

// What JavaScript actually does behind the scenes:
// var hoistedVar;                    ← declaration hoisted to top
// console.log(hoistedVar);           ← undefined (declared but not assigned)
// hoistedVar = 'I exist now';        ← assignment stays in place
// console.log(hoistedVar);           ← "I exist now"

// ──── 1b. let/const — Temporal Dead Zone (TDZ) ────

// ❌ let and const are hoisted but NOT initialized — they sit in the TDZ
// Accessing them before declaration throws ReferenceError

// console.log(hoistedLet);  // ReferenceError: Cannot access 'hoistedLet' before initialization
// let hoistedLet = 'hello';

// console.log(hoistedConst); // ReferenceError: Cannot access 'hoistedConst' before initialization
// const hoistedConst = 'world';

// ✅ The TDZ exists from the start of the block to the declaration
{
  // TDZ for `x` starts here ──────────
  // console.log(x); // ReferenceError ↑
  // console.log(x); // ReferenceError ↑  (Temporal Dead Zone)
  let x = 10;      // TDZ ends here ──
  console.log(x);  // 10 — now it's safe
}

// ──── 1c. Function declarations ARE fully hoisted ────

// ✅ You can call a function declaration BEFORE it appears in the code
console.log(add(2, 3)); // 5 — works!

function add(a, b) {
  return a + b;
}

// The entire function (declaration + body) is hoisted to the top.

// ──── 1d. Function expressions are NOT hoisted ────

// ❌ Function expressions behave like variable declarations
// console.log(subtract(5, 2));
// If declared with var:   TypeError: subtract is not a function
// If declared with let/const: ReferenceError: Cannot access 'subtract' before initialization

// var subtract = function(a, b) { return a - b; };
// What JS sees: var subtract;  → subtract is undefined, calling it → TypeError

// const subtract = function(a, b) { return a - b; };
// What JS sees: const is in TDZ → calling it → ReferenceError

const subtract = function(a, b) { return a - b; };
console.log(subtract(5, 2)); // 3 — works only AFTER the declaration

// ──── 1e. Arrow functions are NOT hoisted (same as function expressions) ────

// ❌ Arrow functions follow the same rules as function expressions
// console.log(multiply(3, 4)); // ReferenceError (with const/let)

const multiply = (a, b) => a * b;
console.log(multiply(3, 4)); // 12 — only works after declaration

// ──── 1f. Class declarations are NOT hoisted ────

// ❌ Classes are in the TDZ just like let/const
// const p = new Person('Alice'); // ReferenceError: Cannot access 'Person' before initialization

class Person {
  constructor(name) {
    this.name = name;
  }
}

const p = new Person('Alice');
console.log(p.name); // "Alice"

// ──── 1g. Hoisting summary ────

// | Declaration          | Hoisted? | Initialized? | Usable before declaration? |
// |----------------------|----------|-------------- |--------------------------- |
// | var                  | ✅ Yes   | undefined     | ✅ Yes (value is undefined)|
// | let                  | ✅ Yes   | ❌ No (TDZ)   | ❌ No (ReferenceError)     |
// | const                | ✅ Yes   | ❌ No (TDZ)   | ❌ No (ReferenceError)     |
// | function declaration | ✅ Yes   | ✅ Full body  | ✅ Yes (fully usable)      |
// | function expression  | Depends  | ❌ No         | ❌ No                      |
// | arrow function       | Depends  | ❌ No         | ❌ No                      |
// | class                | ✅ Yes   | ❌ No (TDZ)   | ❌ No (ReferenceError)     |


// ════════════════════════════════════════════════════════════════════════════════
// 2. CLOSURES
// ════════════════════════════════════════════════════════════════════════════════
// A CLOSURE is a function that "remembers" the variables from its
// lexical scope even after the outer function has returned.
// The inner function retains access to the outer function's variables.

// ──── 2a. Basic closure — function remembers its birth environment ────

function outerFunction() {
  const outerVar = 'I am from outer!';

  function innerFunction() {
    // ✅ innerFunction has access to outerVar even after outerFunction returns
    console.log(outerVar);
  }

  return innerFunction;
}

const closureFn = outerFunction(); // outerFunction runs and returns innerFunction
closureFn(); // "I am from outer!" — outerVar is still accessible!
// outerFunction has already finished executing, but innerFunction
// "closes over" outerVar and keeps it alive.

// ──── 2b. Counter factory pattern — data privacy with closures ────

function createCounter() {
  let count = 0; // Private variable — cannot be accessed from outside

  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count,
    reset: () => { count = 0; }
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.increment()); // 3
console.log(counter.decrement()); // 2
console.log(counter.getCount());  // 2
counter.reset();
console.log(counter.getCount());  // 0

// ✅ The `count` variable is truly private
// console.log(counter.count);    // undefined — can't access directly!
// counter.count = 100;           // This creates a NEW property, doesn't affect the internal count
// console.log(counter.getCount()); // 0 — still 0!

// ✅ Each call to createCounter creates an independent closure
const counterA = createCounter();
const counterB = createCounter();
counterA.increment();
counterA.increment();
console.log(counterA.getCount()); // 2
console.log(counterB.getCount()); // 0 — independent!

// ──── 2c. The classic closure TRAP — var + setTimeout ────

// ❌ PROBLEM: var is function-scoped, so all callbacks share the SAME `i`
console.log('--- var + setTimeout (BROKEN) ---');
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log('var i:', i); // Prints 3, 3, 3 — NOT 0, 1, 2!
  }, 100);
}
// By the time setTimeout callbacks run, the loop has finished and i === 3.
// All three callbacks "close over" the same variable `i`, which is now 3.

// ✅ FIX 1: Use `let` — each iteration gets its OWN scope
console.log('--- let + setTimeout (FIXED) ---');
for (let j = 0; j < 3; j++) {
  setTimeout(() => {
    console.log('let j:', j); // Prints 0, 1, 2 ✅
  }, 200);
}
// `let` creates a new binding for each iteration of the loop.
// Each callback closes over its own copy of `j`.

// ✅ FIX 2: Use IIFE (Immediately Invoked Function Expression) — old pattern
console.log('--- IIFE fix (old pattern) ---');
for (var k = 0; k < 3; k++) {
  (function(captured) {
    setTimeout(() => {
      console.log('IIFE k:', captured); // Prints 0, 1, 2 ✅
    }, 300);
  })(k); // `k` is passed as argument, creating a new scope
}

// ──── 2d. Practical closure uses ────

// ✅ Data privacy — encapsulate internal state
function createBankAccount(initialBalance) {
  let balance = initialBalance;

  return {
    deposit(amount) {
      if (amount > 0) balance += amount;
      return balance;
    },
    withdraw(amount) {
      if (amount > 0 && amount <= balance) balance -= amount;
      return balance;
    },
    getBalance() {
      return balance;
    }
  };
}

const account = createBankAccount(100);
console.log(account.deposit(50));    // 150
console.log(account.withdraw(30));   // 120
console.log(account.getBalance());   // 120
// console.log(account.balance);     // undefined — truly private!

// ✅ Stateful functions — remember previous calls
function createLogger(prefix) {
  let logCount = 0;
  return function(message) {
    logCount++;
    console.log(`[${prefix} #${logCount}] ${message}`);
  };
}

const appLog = createLogger('APP');
appLog('Started');   // [APP #1] Started
appLog('Loading');   // [APP #2] Loading
appLog('Ready');     // [APP #3] Ready

const dbLog = createLogger('DB');
dbLog('Connected');  // [DB #1] Connected — independent counter!

// ──── 2e. Currying with closures ────

// Currying = transforming a function with multiple arguments into
// a sequence of functions, each taking a single argument.

// ✅ Simple currying
const multiplyBy = (a) => (b) => a * b;

const double = multiplyBy(2);
const triple = multiplyBy(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15
console.log(multiplyBy(4)(6)); // 24

// ✅ More practical currying — reusable formatters
const formatCurrency = (symbol) => (amount) => `${symbol}${amount.toFixed(2)}`;

const usd = formatCurrency('$');
const eur = formatCurrency('€');
const gbp = formatCurrency('£');

console.log(usd(42.5));  // "$42.50"
console.log(eur(100));    // "€100.00"
console.log(gbp(9.99));   // "£9.99"

// ✅ Curried filter — reusable predicates
const filterBy = (key) => (value) => (arr) =>
  arr.filter(item => item[key] === value);

const filterByRole = filterBy('role');
const getAdmins = filterByRole('admin');
const getUsers = filterByRole('user');

const people = [
  { name: 'Alice', role: 'admin' },
  { name: 'Bob', role: 'user' },
  { name: 'Charlie', role: 'admin' },
  { name: 'Dana', role: 'user' }
];

console.log(getAdmins(people));
// [{ name: 'Alice', role: 'admin' }, { name: 'Charlie', role: 'admin' }]
console.log(getUsers(people));
// [{ name: 'Bob', role: 'user' }, { name: 'Dana', role: 'user' }]


// ════════════════════════════════════════════════════════════════════════════════
// 3. PROMISES
// ════════════════════════════════════════════════════════════════════════════════
// A Promise represents the eventual completion (or failure) of an
// asynchronous operation and its resulting value.
// States: PENDING → FULFILLED (resolved) or REJECTED

// ──── 3a. Creating a Promise ────

// ✅ Basic Promise construction
const myPromise = new Promise((resolve, reject) => {
  // Simulate async work
  const success = true;

  if (success) {
    resolve('Operation completed!'); // Fulfills the promise
  } else {
    reject('Operation failed!');     // Rejects the promise
  }
});

// ⚠️ The executor function (inside new Promise) runs SYNCHRONOUSLY!
console.log('Before promise');
const syncPromise = new Promise((resolve) => {
  console.log('Inside promise executor — this runs SYNCHRONOUSLY');
  resolve('done');
});
console.log('After promise');
// Output:
// "Before promise"
// "Inside promise executor — this runs SYNCHRONOUSLY"
// "After promise"

// ──── 3b. Consuming Promises: .then(), .catch(), .finally() ────

// ✅ .then() for success
myPromise.then(result => {
  console.log('Success:', result); // "Success: Operation completed!"
});

// ✅ .catch() for errors
const failingPromise = new Promise((resolve, reject) => {
  reject('Something went wrong!');
});

failingPromise.catch(error => {
  console.log('Error caught:', error); // "Error caught: Something went wrong!"
});

// ✅ .finally() runs regardless of success or failure
const cleanupPromise = new Promise((resolve) => resolve('done'));
cleanupPromise
  .then(result => console.log('Result:', result))
  .catch(error => console.log('Error:', error))
  .finally(() => console.log('Cleanup: closing connections...'));
// "Result: done"
// "Cleanup: closing connections..."

// ──── 3c. Promise chaining ────

// ✅ Each .then() returns a NEW promise, enabling chaining
function fetchUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, name: 'Alice' }), 100);
  });
}

function fetchPosts(user) {
  return new Promise((resolve) => {
    setTimeout(() => resolve([
      { title: 'Post 1', author: user.name },
      { title: 'Post 2', author: user.name }
    ]), 100);
  });
}

fetchUser(1)
  .then(user => {
    console.log('User:', user.name);
    return fetchPosts(user); // Return a promise → next .then() waits for it
  })
  .then(posts => {
    console.log('Posts:', posts.length); // 2
  })
  .catch(error => {
    console.log('Error in chain:', error); // Catches errors from ANY step above
  });

// ❌ COMMON MISTAKE: Not returning the promise in the chain
// fetchUser(1)
//   .then(user => {
//     fetchPosts(user);   // Missing return! Next .then() gets undefined
//   })
//   .then(posts => {
//     console.log(posts); // undefined — NOT the posts array!
//   });

// ──── 3d. Promise.all() — run in parallel, fail-fast ────

// ✅ Waits for ALL promises to resolve. Fails if ANY rejects.
const promise1 = Promise.resolve('First');
const promise2 = new Promise(resolve => setTimeout(() => resolve('Second'), 100));
const promise3 = Promise.resolve('Third');

Promise.all([promise1, promise2, promise3])
  .then(results => {
    console.log(results); // ["First", "Second", "Third"]
  })
  .catch(error => {
    console.log('One failed:', error);
  });

// ❌ If ANY promise rejects, the entire Promise.all() rejects
const willFail = Promise.all([
  Promise.resolve('OK'),
  Promise.reject('BOOM'),  // This one fails
  Promise.resolve('OK too')
]);

willFail.catch(error => {
  console.log('Promise.all failed:', error); // "BOOM"
  // The other results are lost!
});

// ──── 3e. Promise.allSettled() — never fails, reports all results ────

// ✅ Waits for ALL promises to settle (resolve or reject), reports each
Promise.allSettled([
  Promise.resolve('Success!'),
  Promise.reject('Failed!'),
  Promise.resolve('Also success!')
]).then(results => {
  console.log(results);
  // [
  //   { status: 'fulfilled', value: 'Success!' },
  //   { status: 'rejected', reason: 'Failed!' },
  //   { status: 'fulfilled', value: 'Also success!' }
  // ]
});

// ✅ Useful for batch operations where you want ALL results
// Promise.allSettled is NEVER rejected — it always resolves with the array.

// ──── 3f. Promise.race() — first to finish wins ────

// ✅ Resolves/rejects with the FIRST promise to settle
const fast = new Promise(resolve => setTimeout(() => resolve('Fast!'), 50));
const slow = new Promise(resolve => setTimeout(() => resolve('Slow...'), 200));

Promise.race([fast, slow])
  .then(winner => {
    console.log('Winner:', winner); // "Winner: Fast!"
  });

// ✅ Practical: timeout pattern
function fetchWithTimeout(fetchPromise, timeoutMs) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Request timed out!')), timeoutMs)
  );
  return Promise.race([fetchPromise, timeout]);
}


// ════════════════════════════════════════════════════════════════════════════════
// 4. ASYNC / AWAIT
// ════════════════════════════════════════════════════════════════════════════════
// async/await is syntactic sugar over Promises.
// It makes asynchronous code look and behave like synchronous code.

// ──── 4a. async function — always returns a Promise ────

// ✅ async function wraps its return value in a Promise
async function greet() {
  return 'Hello!';
}

// These are equivalent:
// async function greet() { return 'Hello!'; }
// function greet() { return Promise.resolve('Hello!'); }

greet().then(msg => console.log(msg)); // "Hello!"

// ──── 4b. await — pauses until Promise resolves ────

// ✅ await "unwraps" a Promise — pauses execution until it resolves
function simulateFetch(data, ms) {
  return new Promise(resolve => setTimeout(() => resolve(data), ms));
}

async function getUserData() {
  console.log('Fetching user...');
  const user = await simulateFetch({ name: 'Alice', id: 1 }, 100);
  console.log('User:', user.name);

  console.log('Fetching posts...');
  const posts = await simulateFetch(['Post 1', 'Post 2'], 100);
  console.log('Posts:', posts);

  return { user, posts };
}

getUserData().then(data => console.log('All data:', data));

// ──── 4c. Error handling with try/catch ────

// ✅ Use try/catch with async/await instead of .catch()
async function fetchUserSafely() {
  try {
    const response = await simulateFetch({ name: 'Bob' }, 100);
    console.log('Got user:', response.name);

    // Simulate an error
    // throw new Error('Something went wrong!');

    return response;
  } catch (error) {
    console.error('Error:', error.message);
    return null; // Return a fallback value
  } finally {
    console.log('Fetch attempt complete — cleanup here');
  }
}

fetchUserSafely();

// ──── 4d. Fetching data — fetch() API (real-world pattern) ────

// ✅ Standard pattern for HTTP requests
async function fetchPokemon(name) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

    // ⚠️ fetch() does NOT throw on HTTP errors (404, 500, etc.)
    // You must check response.ok manually!
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json(); // Parse JSON body
    console.log(`${data.name}: ${data.height} decimeters tall`);
    return data;
  } catch (error) {
    console.error('Fetch failed:', error.message);
    // Network errors, JSON parse errors, and our manual throw all end up here
  }
}

// fetchPokemon('pikachu');  // Uncomment to run (requires network)

// ✅ Fetching multiple resources in parallel
async function fetchMultiple() {
  try {
    const [users, posts] = await Promise.all([
      simulateFetch([{ name: 'Alice' }], 100),
      simulateFetch([{ title: 'Post 1' }], 150)
    ]);
    console.log('Users:', users);
    console.log('Posts:', posts);
  } catch (error) {
    console.error('One of the fetches failed:', error);
  }
}

fetchMultiple();


// ════════════════════════════════════════════════════════════════════════════════
// 5. THE EVENT LOOP
// ════════════════════════════════════════════════════════════════════════════════
// JavaScript is SINGLE-THREADED. It uses an event loop to handle
// asynchronous operations. Understanding the event loop is critical
// for predicting execution order.

// ──── 5a. How it works ────

// The event loop processes tasks in this order:
//
// 1. CALL STACK      — Executes synchronous code line by line
//                       (functions pushed/popped from the stack)
//
// 2. WEB APIs        — Browser/Node handles async operations:
//                       setTimeout, fetch, DOM events, etc.
//                       These are NOT on the call stack.
//
// 3. MICROTASK QUEUE — Promises (.then, .catch, .finally),
//                       queueMicrotask(), MutationObserver
//                       ⚡ ALWAYS processed BEFORE macrotasks
//
// 4. MACROTASK QUEUE — setTimeout, setInterval, setImmediate (Node),
//    (Task Queue)      I/O callbacks, UI rendering events
//
// After each macrotask, ALL microtasks are drained before the next macrotask.

// ──── 5b. The classic event loop puzzle ────

// ✅ Predict the output BEFORE running:
console.log('1');                                    // Sync → runs immediately

setTimeout(() => console.log('2'), 0);               // Macrotask → queued

Promise.resolve().then(() => console.log('3'));       // Microtask → queued

console.log('4');                                    // Sync → runs immediately

// OUTPUT: 1, 4, 3, 2
//
// Explanation:
// Step 1: console.log('1')      → Call stack → prints "1"
// Step 2: setTimeout(cb, 0)     → Registers callback in macrotask queue
// Step 3: Promise.then(cb)      → Registers callback in microtask queue
// Step 4: console.log('4')      → Call stack → prints "4"
// Step 5: Call stack is empty → drain microtask queue → prints "3"
// Step 6: Microtask queue empty → process macrotask queue → prints "2"

// ──── 5c. More complex event loop examples ────

// ✅ Nested microtasks run BEFORE macrotasks
console.log('A');

setTimeout(() => {
  console.log('B');
}, 0);

Promise.resolve()
  .then(() => {
    console.log('C');
    // ✅ This microtask spawns ANOTHER microtask
    return Promise.resolve();
  })
  .then(() => {
    console.log('D');
  });

console.log('E');

// OUTPUT: A, E, C, D, B
//
// A, E: synchronous
// C, D: microtasks (ALL microtasks drain before ANY macrotask)
// B: macrotask (runs after all microtasks)

// ──── 5d. setTimeout(fn, 0) does NOT mean "run immediately" ────

// ⚠️ setTimeout(fn, 0) means "run after current synchronous code
//    AND after all microtasks"

console.log('Start');

setTimeout(() => {
  console.log('Timeout');  // Macrotask — runs last
}, 0);

Promise.resolve().then(() => {
  console.log('Promise');  // Microtask — runs before setTimeout
});

console.log('End');

// OUTPUT: Start, End, Promise, Timeout


// ════════════════════════════════════════════════════════════════════════════════
// 6. QUIRKS AND COMMON ERRORS
// ════════════════════════════════════════════════════════════════════════════════

// ──── 6a. Promise executor runs SYNCHRONOUSLY ────

// ⚠️ Code inside new Promise() runs immediately — NOT asynchronously
console.log('Before');

const myP = new Promise((resolve) => {
  console.log('Inside executor');  // This runs synchronously!
  resolve('resolved');
});

console.log('After');
myP.then(val => console.log('Then:', val));

// OUTPUT: Before, Inside executor, After, Then: resolved
//
// The executor is synchronous. Only the .then() callback is async (microtask).

// ──── 6b. Unhandled Promise rejection ────

// ❌ A rejected promise without .catch() causes an UnhandledPromiseRejection warning
// const dangerous = new Promise((_, reject) => {
//   reject('Unhandled!');
// });
// In Node.js: UnhandledPromiseRejectionWarning
// In browsers: Unhandled promise rejection (appears in console)

// ✅ ALWAYS handle rejections
const safe = new Promise((_, reject) => {
  reject('Handled!');
});
safe.catch(error => console.log('Caught:', error)); // "Caught: Handled!"

// ✅ Global handler (Node.js)
// process.on('unhandledRejection', (reason) => {
//   console.error('Unhandled rejection:', reason);
// });

// ──── 6c. await only works inside async functions ────

// ❌ Using await at the top level in a regular script
// const data = await fetch('https://api.example.com/data');
// SyntaxError: await is only valid in async functions and the top level bodies of modules

// ✅ Wrap in an async function
async function main() {
  const data = await simulateFetch('result', 100);
  console.log(data);
}
main();

// ✅ Top-level await works in ES modules (.mjs files or type: "module")
// In a .mjs file:
// const response = await fetch('...');  // This is valid!

// ✅ Immediately Invoked Async Function Expression (IIAFE)
(async () => {
  const data = await simulateFetch('IIAFE result', 100);
  console.log(data); // "IIAFE result"
})();

// ──── 6d. async function without await ────

// ⚠️ An async function WITHOUT await still wraps return value in a Promise
async function noAwait() {
  return 42; // Still returns Promise<42>, not 42
}

const result2 = noAwait();
console.log(result2);           // Promise { 42 } — it's a Promise, not 42!
console.log(result2 === 42);    // false — it's a Promise object
result2.then(val => console.log(val)); // 42 — must use .then() or await

// ──── 6e. Forgetting to await — operating on a Promise instead of its value ────

// ❌ COMMON MISTAKE: Forgetting await
async function brokenExample() {
  const promise = simulateFetch({ name: 'Alice' }, 100);
  // console.log(promise.name); // undefined — `promise` is a Promise, not the data!

  // ✅ FIX: use await
  const data = await simulateFetch({ name: 'Alice' }, 100);
  console.log(data.name); // "Alice" — now we have the actual data
}
brokenExample();

// ──── 6f. Sequential vs Parallel async execution ────

// ❌ SLOW: Sequential — each await waits for the previous one
async function sequential() {
  const start = Date.now();
  const a = await simulateFetch('A', 1000); // Wait 1 second
  const b = await simulateFetch('B', 1000); // Wait another 1 second
  console.log(`Sequential: ${Date.now() - start}ms`); // ~2000ms total
}

// ✅ FAST: Parallel — start all at once, await together
async function parallel() {
  const start = Date.now();
  const [a, b] = await Promise.all([
    simulateFetch('A', 1000),
    simulateFetch('B', 1000)
  ]);
  console.log(`Parallel: ${Date.now() - start}ms`); // ~1000ms total
}

// ──── 6g. Mixing callbacks and Promises (don't do this) ────

// ❌ Anti-pattern: Wrapping a Promise in unnecessary callbacks
// function getData(callback) {
//   fetch('/api/data')
//     .then(res => res.json())
//     .then(data => callback(null, data))
//     .catch(err => callback(err));
// }

// ✅ Just return the Promise — don't mix paradigms
async function getData() {
  const response = await fetch('/api/data');
  return response.json();
}

// ──── 6h. Event loop: microtasks can starve macrotasks ────

// ⚠️ If microtasks keep spawning more microtasks, macrotasks NEVER run
// This is called "microtask starvation"

// ❌ DANGEROUS: Infinite microtask loop (DO NOT RUN)
// function infiniteMicrotasks() {
//   Promise.resolve().then(() => {
//     console.log('Microtask');
//     infiniteMicrotasks();  // Spawns another microtask forever!
//   });
// }
// infiniteMicrotasks();
// setTimeout would NEVER execute because microtasks always have priority

// ✅ Use setTimeout for deferral if you need to yield to the event loop
function yieldToEventLoop() {
  return new Promise(resolve => setTimeout(resolve, 0));
}


// ════════════════════════════════════════════════════════════════════════════════
// 7. PRACTICAL ASYNC PATTERNS
// ════════════════════════════════════════════════════════════════════════════════

// ──── 7a. Retry pattern ────

async function fetchWithRetry(fn, retries = 3, delay = 1000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      console.log(`Attempt ${attempt} failed: ${error.message}`);
      if (attempt === retries) throw error;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// ✅ Usage:
// await fetchWithRetry(() => fetch('/api/unreliable'), 3, 2000);

// ──── 7b. Debounce with Promises ────

function debounce(fn, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    return new Promise(resolve => {
      timeoutId = setTimeout(() => {
        resolve(fn.apply(this, args));
      }, delay);
    });
  };
}

// ✅ Usage: debounce search input
const debouncedSearch = debounce((query) => {
  console.log('Searching for:', query);
  return `Results for "${query}"`;
}, 300);

// ──── 7c. Async iteration — processing items one at a time ────

async function processItems(items) {
  const results = [];
  for (const item of items) {
    const result = await simulateFetch(`Processed: ${item}`, 100);
    results.push(result);
    console.log(result);
  }
  return results;
}

// processItems(['apple', 'banana', 'cherry']);
// Processes sequentially: apple → banana → cherry

// ──── 7d. Promise.any() — first SUCCESS wins (ignores rejections) ────

// ✅ Resolves with the first promise that fulfills (ignores rejections)
const anyPromise = Promise.any([
  Promise.reject('Error 1'),
  new Promise(resolve => setTimeout(() => resolve('Second!'), 100)),
  new Promise(resolve => setTimeout(() => resolve('Third!'), 200))
]);

anyPromise.then(first => {
  console.log('First success:', first); // "First success: Second!"
});

// ❌ If ALL promises reject, Promise.any throws AggregateError
// Promise.any([
//   Promise.reject('Fail 1'),
//   Promise.reject('Fail 2')
// ]).catch(error => {
//   console.log(error);         // AggregateError: All promises were rejected
//   console.log(error.errors);  // ['Fail 1', 'Fail 2']
// });


// ════════════════════════════════════════════════════════════════════════════════
// END OF FILE
// ════════════════════════════════════════════════════════════════════════════════
