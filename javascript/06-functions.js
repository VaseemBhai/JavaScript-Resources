// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                       06 — FUNCTIONS IN JAVASCRIPT                         ║
// ║    Declarations, Expressions, Arrows, Scope, Closures, Hoisting & More     ║
// ╚══════════════════════════════════════════════════════════════════════════════╝


// ════════════════════════════════════════════════════════════════════════════════
// 1. FUNCTION DECLARATION vs FUNCTION EXPRESSION vs ARROW FUNCTION
// ════════════════════════════════════════════════════════════════════════════════

// ──── 1.1 Function Declaration ──────────────────────────────────────────────
//
// Declared with the `function` keyword as a standalone statement.
// These are HOISTED — you can call them before they appear in the code.
//

// ✅ Function Declaration
function greetDeclaration(name) {
    return `Hello, ${name}!`;
}
console.log(greetDeclaration("Alice"));  // "Hello, Alice!"

// ──── 1.2 Function Expression ──────────────────────────────────────────────
//
// A function assigned to a variable. NOT hoisted — must be defined before use.
// The function itself can be named or anonymous.
//

// ✅ Function Expression (anonymous)
const greetExpression = function(name) {
    return `Hi, ${name}!`;
};
console.log(greetExpression("Bob"));  // "Hi, Bob!"

// ✅ Named Function Expression (useful for recursion & stack traces)
const factorial = function fact(n) {
    if (n <= 1) return 1;
    return n * fact(n - 1);   // can reference itself by name `fact`
};
console.log(factorial(5));  // 120

// ──── 1.3 Arrow Function (ES6+) ────────────────────────────────────────────
//
// Concise syntax. Does NOT have its own `this` or `arguments`.
// NOT hoisted (same as function expressions).
//

// ✅ Arrow Function
const greetArrow = (name) => {
    return `Hey, ${name}!`;
};
console.log(greetArrow("Charlie"));  // "Hey, Charlie!"

// ──── 1.4 Comparison table ─────────────────────────────────────────────────
//
// ┌──────────────────────┬────────────┬────────────────────┬───────────────┐
// │ Feature              │ Declaration│ Expression         │ Arrow         │
// ├──────────────────────┼────────────┼────────────────────┼───────────────┤
// │ Hoisted?             │ ✅ Yes     │ ❌ No              │ ❌ No         │
// │ Has own `this`?      │ ✅ Yes     │ ✅ Yes             │ ❌ No         │
// │ Has `arguments`?     │ ✅ Yes     │ ✅ Yes             │ ❌ No         │
// │ Can be a constructor?│ ✅ Yes     │ ✅ Yes             │ ❌ No         │
// │ Syntax brevity       │ Normal     │ Normal             │ Concise       │
// └──────────────────────┴────────────┴────────────────────┴───────────────┘
//


// ════════════════════════════════════════════════════════════════════════════════
// 2. HOISTING — DECLARATIONS ARE HOISTED, EXPRESSIONS ARE NOT
// ════════════════════════════════════════════════════════════════════════════════
//
// JavaScript "hoists" function declarations to the top of their scope.
// This means you can call a declared function BEFORE its definition.
//

// ✅ Function Declaration — works because of hoisting
console.log(sayHello());  // "Hello, World!"

function sayHello() {
    return "Hello, World!";
}
// Internally, JS treats it as if `function sayHello()` was at the top.

// ❌ Function Expression — NOT hoisted → ReferenceError
// console.log(sayGoodbye());  // ❌ ReferenceError: Cannot access 'sayGoodbye' before initialization
// const sayGoodbye = function() {
//     return "Goodbye!";
// };

// ❌ Arrow Function — NOT hoisted → same error
// console.log(sayHi());  // ❌ ReferenceError: Cannot access 'sayHi' before initialization
// const sayHi = () => "Hi there!";

// ──── Why does this matter? ─────────────────────────────────────────────────
//
// With function declarations, you can organize code with the "main logic first,
// helper functions below" pattern. With expressions/arrows, you must define
// helpers before using them.
//


// ════════════════════════════════════════════════════════════════════════════════
// 3. ARROW FUNCTION SYNTAX VARIATIONS
// ════════════════════════════════════════════════════════════════════════════════

// ──── 3.1 Full syntax (with curly braces and explicit return) ───────────────

// ✅ Multiple statements need curly braces AND an explicit `return`
const add = (a, b) => {
    const result = a + b;
    return result;
};
console.log(add(3, 7));  // 10

// ──── 3.2 Implicit return (single expression, no curly braces) ──────────────

// ✅ If the body is a single expression, you can omit {} and `return`
const multiply = (a, b) => a * b;
console.log(multiply(4, 5));  // 20

// ✅ Works with template literals too
const greet = (name) => `Hello, ${name}!`;
console.log(greet("Dana"));  // "Hello, Dana!"

// ✅ Works with ternary
const isEven = (n) => n % 2 === 0 ? "even" : "odd";
console.log(isEven(7));  // "odd"

// ──── 3.3 Single parameter (parentheses optional) ──────────────────────────

// ✅ One parameter — parens are optional
const double = x => x * 2;
console.log(double(21));  // 42

const shout = msg => msg.toUpperCase() + "!!!";
console.log(shout("hello"));  // "HELLO!!!"

// ──── 3.4 No parameters (parentheses required) ─────────────────────────────

// ✅ Zero parameters — must use empty parens ()
const getTimestamp = () => Date.now();
console.log(getTimestamp());  // 1719348000000 (or similar)

const rollDice = () => Math.floor(Math.random() * 6) + 1;
console.log("Dice:", rollDice());

// ──── 3.5 Implicit return of an object literal ─────────────────────────────

// ❌ This FAILS — JS thinks { } is a code block, not an object
// const makeUser = (name) => { name: name, role: "user" };
// SyntaxError: Unexpected token ':'

// ✅ FIX: Wrap the object literal in parentheses
const makeUser = (name) => ({ name: name, role: "user" });
console.log(makeUser("Eve"));  // { name: "Eve", role: "user" }

// ✅ With shorthand property names
const makePoint = (x, y) => ({ x, y });
console.log(makePoint(10, 20));  // { x: 10, y: 20 }


// ════════════════════════════════════════════════════════════════════════════════
// 4. PARAMETERS vs ARGUMENTS
// ════════════════════════════════════════════════════════════════════════════════
//
// Parameters = the variable names in the function definition
// Arguments  = the actual values you pass when calling the function
//

// ✅ `a` and `b` are PARAMETERS (placeholders)
function sum(a, b) {
    return a + b;
}

// ✅ 10 and 20 are ARGUMENTS (actual values)
console.log(sum(10, 20));  // 30

// ✅ Extra arguments are silently ignored
console.log(sum(1, 2, 3, 4));  // 3 (only uses first two)

// ✅ Missing arguments become undefined
console.log(sum(5));  // NaN (5 + undefined = NaN)


// ════════════════════════════════════════════════════════════════════════════════
// 5. DEFAULT PARAMETERS (ES6+)
// ════════════════════════════════════════════════════════════════════════════════

// ✅ Provide fallback values for parameters not passed (or passed as undefined)
function greetUser(name = "Guest", greeting = "Hello") {
    return `${greeting}, ${name}!`;
}

console.log(greetUser());                  // "Hello, Guest!"
console.log(greetUser("Alice"));           // "Hello, Alice!"
console.log(greetUser("Bob", "Welcome"));  // "Welcome, Bob!"
console.log(greetUser(undefined, "Hey"));  // "Hey, Guest!" — undefined triggers default

// ✅ Default can be an expression
function createId(prefix = "ID", num = Math.floor(Math.random() * 10000)) {
    return `${prefix}-${num}`;
}
console.log(createId());         // "ID-7342" (random)
console.log(createId("USER"));   // "USER-1589" (random)

// ✅ Later defaults can reference earlier parameters
function buildUrl(base, path = "/", url = base + path) {
    return url;
}
console.log(buildUrl("https://example.com"));             // "https://example.com/"
console.log(buildUrl("https://example.com", "/api"));     // "https://example.com/api"


// ════════════════════════════════════════════════════════════════════════════════
// 6. REST PARAMETERS (...rest) — COLLECTING ARGUMENTS
// ════════════════════════════════════════════════════════════════════════════════
//
// Rest parameters collect ALL remaining arguments into a real Array.
// Must be the LAST parameter in the function definition.
//

// ✅ Sum any number of arguments
function sumAll(...numbers) {
    let total = 0;
    for (const n of numbers) {
        total += n;
    }
    return total;
}
console.log(sumAll(1, 2, 3));         // 6
console.log(sumAll(10, 20, 30, 40));  // 100

// ✅ First argument separate, rest collected
function introduce(greeting, ...names) {
    return `${greeting}, ${names.join(" and ")}!`;
}
console.log(introduce("Hello", "Alice", "Bob", "Charlie"));
// "Hello, Alice and Bob and Charlie!"

// ✅ Rest params are a real Array — you can use .map(), .filter(), etc.
function doubleAll(...nums) {
    return nums.map(n => n * 2);
}
console.log(doubleAll(1, 2, 3));  // [2, 4, 6]

// ❌ Rest must be the last parameter
// function bad(a, ...rest, b) {}  // SyntaxError: Rest parameter must be last


// ════════════════════════════════════════════════════════════════════════════════
// 7. RETURN VALUES
// ════════════════════════════════════════════════════════════════════════════════

// ──── 7.1 Explicit return ───────────────────────────────────────────────────

// ✅ Return a computed value
function area(width, height) {
    return width * height;
}
console.log(area(5, 10));  // 50

// ✅ Return stops execution — code after return never runs
function checkAge(age) {
    if (age < 0) {
        return "Invalid age";   // function exits here
    }
    return `Age is ${age}`;     // only reached if age >= 0
}

// ──── 7.2 No return → returns undefined ─────────────────────────────────────

// ✅ If no return statement (or bare return), function returns undefined
function logMessage(msg) {
    console.log(msg);
    // no return statement
}

const result = logMessage("test");
console.log(result);  // undefined

// ✅ Bare return (no value) also returns undefined
function earlyExit(x) {
    if (x < 0) return;   // returns undefined, exits function
    console.log("Processing:", x);
}
earlyExit(-1);   // nothing logged
earlyExit(42);   // "Processing: 42"

// ──── 7.3 Early return pattern (guard clauses) ──────────────────────────────
//
// Instead of deeply nested if-else, handle edge cases early with returns.
// This flattens code and improves readability.
//

// ❌ Deeply nested (hard to read)
// function processUser(user) {
//     if (user) {
//         if (user.isActive) {
//             if (user.hasPermission) {
//                 return `Processing ${user.name}`;
//             } else {
//                 return "No permission";
//             }
//         } else {
//             return "User is inactive";
//         }
//     } else {
//         return "No user provided";
//     }
// }

// ✅ Guard clauses — flat, readable, each check is a "gate"
function processUser(user) {
    if (!user) return "No user provided";
    if (!user.isActive) return "User is inactive";
    if (!user.hasPermission) return "No permission";

    // Happy path — all checks passed
    return `Processing ${user.name}`;
}

console.log(processUser(null));                                     // "No user provided"
console.log(processUser({ isActive: false }));                      // "User is inactive"
console.log(processUser({ isActive: true, hasPermission: false })); // "No permission"
console.log(processUser({ isActive: true, hasPermission: true, name: "Alice" }));
// "Processing Alice"


// ════════════════════════════════════════════════════════════════════════════════
// 8. SCOPE — LOCAL vs GLOBAL, VARIABLE SHADOWING
// ════════════════════════════════════════════════════════════════════════════════
//
// Scope = where a variable is accessible.
//
// - Global scope: declared outside any function/block → accessible everywhere
// - Function scope: declared inside a function → accessible only within it
// - Block scope: let/const inside {} → accessible only within that block
//

// ──── 8.1 Local vs Global scope ─────────────────────────────────────────────

const globalVar = "I'm global";

function showScope() {
    const localVar = "I'm local";
    console.log(globalVar);   // ✅ Can access global from inside
    console.log(localVar);    // ✅ Can access local variable
}
showScope();
// console.log(localVar);     // ❌ ReferenceError: localVar is not defined

// ──── 8.2 Variable shadowing ───────────────────────────────────────────────
//
// An inner variable with the same name as an outer one "shadows" the outer.
// The inner variable takes priority within its scope.
//

const color = "blue";     // outer variable

function paintRoom() {
    const color = "red";  // ← shadows the outer `color`
    console.log("Inside:", color);   // "red"
}

paintRoom();
console.log("Outside:", color);  // "blue" ← outer is unchanged

// ──── 8.3 Nested function scope ─────────────────────────────────────────────

function outer() {
    const outerMsg = "I'm in outer";

    function inner() {
        const innerMsg = "I'm in inner";
        console.log(outerMsg);   // ✅ Inner can see outer's variables
        console.log(innerMsg);   // ✅ Inner can see its own variables
    }

    inner();
    // console.log(innerMsg);   // ❌ ReferenceError — outer cannot see inner's variables
}
outer();


// ════════════════════════════════════════════════════════════════════════════════
// 9. IIFE — IMMEDIATELY INVOKED FUNCTION EXPRESSION
// ════════════════════════════════════════════════════════════════════════════════
//
// A function that runs immediately after being defined.
// Syntax: (function() { ... })()  or  (() => { ... })()
//
// Used to:
//   - Create a private scope (avoid polluting global namespace)
//   - Initialize something once
//   - Was critical pre-ES6 for module patterns (less needed with let/const/modules)
//

// ✅ Classic IIFE with function keyword
(function() {
    const secret = "hidden";
    console.log("IIFE ran! Secret:", secret);
})();
// console.log(secret);  // ❌ ReferenceError — secret is scoped to the IIFE

// ✅ IIFE with arrow function
(() => {
    const config = { debug: true, version: "1.0.0" };
    console.log("Arrow IIFE:", config);
})();

// ✅ IIFE that takes arguments
const result2 = (function(x, y) {
    return x + y;
})(10, 20);
console.log("IIFE result:", result2);  // 30

// ✅ Named IIFE (appears in stack traces — helpful for debugging)
(function initApp() {
    console.log("App initialized via named IIFE");
})();

// ✅ IIFE for creating a private counter (module pattern)
const counter = (function() {
    let count = 0;              // private variable
    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count
    };
})();

console.log(counter.increment());  // 1
console.log(counter.increment());  // 2
console.log(counter.decrement());  // 1
console.log(counter.getCount());   // 1
// console.log(count);             // ❌ ReferenceError — count is private


// ════════════════════════════════════════════════════════════════════════════════
// 10. QUIRKS AND ERRORS
// ════════════════════════════════════════════════════════════════════════════════

// ──── 10.1 Arrow functions do NOT have 'arguments' object ───────────────────

// ✅ Regular functions have a special `arguments` array-like object
function regularFunc() {
    console.log("arguments:", arguments);      // Arguments(3) [1, 2, 3]
    console.log("arguments[0]:", arguments[0]); // 1
}
regularFunc(1, 2, 3);

// ❌ Arrow functions do NOT have `arguments`
// const arrowFunc = () => {
//     console.log(arguments);  // ❌ ReferenceError: arguments is not defined
// };
// arrowFunc(1, 2, 3);

// ✅ FIX: Use rest parameters with arrow functions
const arrowFunc = (...args) => {
    console.log("Arrow args:", args);  // [1, 2, 3] — a real array!
};
arrowFunc(1, 2, 3);

// ──── 10.2 Arrow functions do NOT have their own 'this' ─────────────────────
//
// Arrow functions inherit `this` from their surrounding (lexical) scope.
// Regular functions get their own `this` based on HOW they're called.
//
// This matters most in:
//   - Object methods (arrow loses the object as `this`)
//   - Event handlers (arrow loses the DOM element as `this`)
//   - Constructors (arrows can't be used as constructors)
//

const personObj = {
    name: "Alice",

    // ✅ Regular method — `this` refers to the object
    greetRegular: function() {
        return `Hi, I'm ${this.name}`;
    },

    // ❌ Arrow method — `this` does NOT refer to the object
    greetArrow: () => {
        return `Hi, I'm ${this.name}`;  // `this` is the outer scope (window/undefined)
    }
};

console.log(personObj.greetRegular());  // "Hi, I'm Alice"
console.log(personObj.greetArrow());    // "Hi, I'm undefined" (or error in strict mode)

// ──── 10.3 Forgetting return in multi-line arrow function ───────────────────

// ❌ Curly braces WITHOUT return → returns undefined!
const buggySquare = (x) => {
    x * x;   // computed but never returned
};
console.log(buggySquare(5));  // undefined ← oops!

// ✅ FIX: Add explicit return
const fixedSquare = (x) => {
    return x * x;
};
console.log(fixedSquare(5));  // 25

// ✅ Or use implicit return (no braces)
const conciseSquare = (x) => x * x;
console.log(conciseSquare(5));  // 25

// ──── 10.4 Returning an object literal from arrow (needs parens) ────────────

// ❌ Without parens, JS thinks { } is a code block
// const makeObj = (id) => { id: id, active: true };
// SyntaxError or returns undefined

// ✅ FIX: Wrap object literal in parentheses
const makeObj = (id) => ({ id: id, active: true });
console.log(makeObj(42));  // { id: 42, active: true }

// ──── 10.5 Calling before declaration with const/let (TDZ) ──────────────────
//
// TDZ = Temporal Dead Zone
// Variables declared with let/const exist from the start of their scope,
// but cannot be accessed until the declaration line.
//

// ❌ Accessing a const/let function before its declaration
// console.log(square(5));
// const square = (x) => x * x;
// ReferenceError: Cannot access 'square' before initialization

// This is different from `var`, which would be `undefined` instead of an error:
// console.log(myVar);  // undefined (not an error, but not useful)
// var myVar = 42;

// ✅ FIX: Define function expressions/arrows BEFORE you call them
const cube = (x) => x * x * x;
console.log(cube(3));  // 27

// Or use function declarations which ARE hoisted:
console.log(square(4));   // 16  ← works because of hoisting
function square(x) {
    return x * x;
}

// ──── 10.6 Variable shadowing — inner param hides outer variable ────────────

const message = "Global message";

function showMessage(message) {
    // The parameter `message` shadows the outer `message`
    console.log("Inside:", message);
}

showMessage("Local message");      // "Inside: Local message"
console.log("Outside:", message);  // "Outside: Global message"

// ⚠️ This is NOT an error, but it can cause confusion.
// If you INTENDED to use the outer variable, the parameter name blocks it.

// ✅ Tip: Use distinct names to avoid accidental shadowing
const globalMessage = "Global";

function displayMessage(localMessage) {
    console.log("Global:", globalMessage);   // accessible
    console.log("Local:", localMessage);     // distinct name, no confusion
}
displayMessage("Local");

// ──── 10.7 Accidentally creating global variables ───────────────────────────

// ❌ Forgetting `let`/`const` inside a function creates a global variable
function leaky() {
    // oopsGlobal = "I'm accidentally global!";  // ← no let/const/var!
    // In non-strict mode, this creates a global variable. In strict mode, it throws.
}

// ✅ FIX: Always use let or const
function notLeaky() {
    const safeVar = "I'm properly scoped";
    console.log(safeVar);
}
notLeaky();
// console.log(safeVar);  // ❌ ReferenceError — properly scoped


// ════════════════════════════════════════════════════════════════════════════════
// 11. PRACTICAL EXAMPLES
// ════════════════════════════════════════════════════════════════════════════════

// ──── 11.1 Higher-order function (function that takes/returns a function) ────

// ✅ A function that creates a multiplier function
function createMultiplier(factor) {
    return (number) => number * factor;   // returns a function (closure)
}

const triple = createMultiplier(3);
const tenTimes = createMultiplier(10);

console.log(triple(7));     // 21
console.log(tenTimes(7));   // 70

// ──── 11.2 Callback function ────────────────────────────────────────────────

// ✅ A function that processes an array using a callback
function processArray(arr, callback) {
    const results = [];
    for (const item of arr) {
        results.push(callback(item));
    }
    return results;
}

const nums = [1, 2, 3, 4, 5];
const squared = processArray(nums, (n) => n * n);
const stringified = processArray(nums, (n) => `Number: ${n}`);

console.log(squared);       // [1, 4, 9, 16, 25]
console.log(stringified);   // ["Number: 1", "Number: 2", ...]

// ──── 11.3 Function composition ─────────────────────────────────────────────

// ✅ Composing small functions into a pipeline
const trim = (str) => str.trim();
const lowercase = (str) => str.toLowerCase();
const addExclamation = (str) => str + "!";

function compose(...fns) {
    return (input) => fns.reduce((acc, fn) => fn(acc), input);
}

const cleanAndShout = compose(trim, lowercase, addExclamation);
console.log(cleanAndShout("  Hello World  "));  // "hello world!"


// ════════════════════════════════════════════════════════════════════════════════
// SUMMARY CHEAT SHEET
// ════════════════════════════════════════════════════════════════════════════════
//
// DECLARATION:      function name() {}        → hoisted, has own `this`
// EXPRESSION:       const fn = function() {}  → NOT hoisted, has own `this`
// ARROW:            const fn = () => {}       → NOT hoisted, NO own `this`
//
// ARROW SHORTCUTS:
//   (a, b) => { return a + b; }    → full syntax
//   (a, b) => a + b                → implicit return (single expression)
//   x => x * 2                     → single param (no parens needed)
//   () => 'hello'                  → no params (parens required)
//   x => ({ key: 'value' })        → return object literal (parens required!)
//
// PARAMETERS:
//   function(a = 1)       → default parameter
//   function(...args)     → rest parameters (collects into array)
//
// SCOPE:
//   let/const → block-scoped
//   var       → function-scoped (avoid)
//   No keyword → accidental global (never do this)
//
// GOLDEN RULES:
//   ✅ Use const for functions you assign to variables
//   ✅ Use arrow functions for callbacks and short functions
//   ✅ Use function declarations for top-level/named functions
//   ✅ Use guard clauses (early returns) for cleaner code
//   ❌ Don't use arrow functions as object methods (loses `this`)
//   ❌ Don't forget `return` in multi-line arrow functions
//   ❌ Don't access const/let functions before declaration (TDZ)
//
