// JavaScript has TWO categories of types:
//   1. Primitive Types (7 total) — immutable, stored by value
//   2. Reference Types — objects, arrays, functions (stored by reference)

// ─── 1.1 Number ─────────────────────────────────────────────────────────────
// JavaScript has ONE number type for both integers and floating-point.
// There is no separate "int" or "float" type like in C/Java/Python.

// ✅ All of these are type "number"
let integer = 42;
let negative = -10;
let float = 3.14;
let exponential = 2.5e6;          // 2,500,000
let hex = 0xff;                    // 255
let octal = 0o77;                  // 63
let binary = 0b1010;               // 10

console.log(typeof integer);       // "number"
console.log(typeof float);         // "number"

// ✅ Special numeric values (still type "number")
let inf = Infinity;                // Result of 1/0
let negInf = -Infinity;            // Result of -1/0
let notANumber = NaN;              // Result of invalid math like 0/0

console.log(typeof Infinity);      // "number"
console.log(typeof NaN);           // "number" — yes, "Not a Number" IS a number type!

// ✅ Useful number limits
console.log(Number.MAX_SAFE_INTEGER);   // 9007199254740991 (2^53 - 1)
console.log(Number.MIN_SAFE_INTEGER);   // -9007199254740991
console.log(Number.MAX_VALUE);          // ~1.7976931348623157e+308
console.log(Number.MIN_VALUE);          // ~5e-324 (smallest positive number)
console.log(Number.EPSILON);            // ~2.22e-16 (smallest difference between floats)

// ❌ COMMON ERROR: Floating-point precision
// console.log(0.1 + 0.2);             // 0.30000000000000004, NOT 0.3!
// console.log(0.1 + 0.2 === 0.3);     // false — this surprises EVERYONE
//
// ✅ FIX: Use epsilon comparison or work with integers (cents instead of dollars)
console.log(Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON);  // true


// ─── 1.2 String ────────────────────────────────────────────────────────────
// Strings are sequences of characters. JavaScript has NO separate "char" type.
// A single character is just a string of length 1.

// ✅ Three ways to create strings
let single = 'Hello';              // Single quotes
let double = "World";              // Double quotes — functionally identical
let backtick = `Hello ${double}`;  // Template literal — allows interpolation

console.log(typeof single);        // "string"
console.log(backtick);             // "Hello World"

// ✅ Template literals can span multiple lines
let multiLine = `
  This is line 1.
  This is line 2.
  No need for \\n or concatenation.
`;

// ✅ String properties and methods (strings are immutable)
let greeting = "Hello, World!";
console.log(greeting.length);       // 13
console.log(greeting[0]);           // "H" — zero-indexed access
console.log(greeting.toUpperCase()); // "HELLO, WORLD!"
console.log(greeting.slice(0, 5));   // "Hello"
console.log(greeting.includes("World")); // true

// ❌ COMMON ERROR: Strings are IMMUTABLE — you can't change them in place
// let name = "John";
// name[0] = "j";                   // Silently fails (no error, but no change)
// console.log(name);               // Still "John"
//
// ✅ FIX: Create a new string
let name = "John";
let lowerName = "j" + name.slice(1); // "john"


// ─── 1.3 Boolean ───────────────────────────────────────────────────────────
// Only two possible values: true and false

let isActive = true;
let isDeleted = false;

console.log(typeof isActive);      // "boolean"

// ✅ Booleans are returned by comparison operators
console.log(5 > 3);                // true
console.log(5 === '5');            // false (strict equality)


// ─── 1.4 Undefined ─────────────────────────────────────────────────────────
// A variable that has been DECLARED but NOT ASSIGNED a value is "undefined".
// It means "this variable exists but has no value yet."

let notAssigned;
console.log(notAssigned);          // undefined
console.log(typeof notAssigned);   // "undefined"

// ✅ Functions with no return value return undefined
function doNothing() {
  // no return statement
}
console.log(doNothing());          // undefined

// ✅ Accessing a non-existent object property gives undefined
let obj = { name: "Alice" };
console.log(obj.age);              // undefined (property doesn't exist)

// ❌ COMMON ERROR: Explicitly assigning undefined
// let x = undefined;               // Legal, but BAD PRACTICE
//                                   // If you want "no value", use null instead
//                                   // undefined should mean "not yet assigned"


// ─── 1.5 Null ──────────────────────────────────────────────────────────────
// null means "intentionally empty" or "no value ON PURPOSE."
// It's the developer's way of saying "I explicitly set this to nothing."

let emptyValue = null;
console.log(emptyValue);           // null
console.log(typeof emptyValue);    // "object" — ⚠️ THIS IS A BUG! (see Section 2)

// ✅ Use null to indicate intentional absence of a value
let user = {
  name: "Alice",
  email: null,                     // User exists but email is intentionally empty
};


// ─── 1.6 Symbol (ES6+) ────────────────────────────────────────────────────
// Symbols are UNIQUE identifiers. Every Symbol() call creates a completely
// unique value, even if you give them the same description.

let sym1 = Symbol('id');
let sym2 = Symbol('id');

console.log(typeof sym1);          // "symbol"
console.log(sym1 === sym2);        // false — every symbol is unique!
console.log(sym1.toString());      // "Symbol(id)"
console.log(sym1.description);     // "id"

// ✅ Primary use: unique object property keys (no accidental collisions)
const SECRET_KEY = Symbol('secretKey');
let config = {};
config[SECRET_KEY] = 'hidden-value';
console.log(config[SECRET_KEY]);   // "hidden-value"

// ✅ Symbols are NOT enumerable by default (hidden from for...in and Object.keys)
let myObj = {
  name: "test",
  [Symbol('hidden')]: "you can't see me in for...in",
};
console.log(Object.keys(myObj));              // ["name"] — symbol key is hidden
console.log(Object.getOwnPropertySymbols(myObj)); // [Symbol(hidden)]

// ✅ Global symbol registry with Symbol.for()
let globalSym1 = Symbol.for('app.id');
let globalSym2 = Symbol.for('app.id');
console.log(globalSym1 === globalSym2);  // true — same key → same symbol


// ─── 1.7 BigInt (ES2020) ──────────────────────────────────────────────────
// BigInt can represent integers of ARBITRARY size, beyond Number.MAX_SAFE_INTEGER.

let bigNumber = 9007199254740991n;  // Append 'n' to make a BigInt
let anotherBig = BigInt("9007199254740992");

console.log(typeof bigNumber);     // "bigint"
console.log(bigNumber + 1n);       // 9007199254740992n — precise!

// ❌ COMMON ERROR: Mixing BigInt and Number
// console.log(bigNumber + 1);      // TypeError: Cannot mix BigInt and other types
//
// ✅ FIX: Convert explicitly
console.log(bigNumber + BigInt(1)); // 9007199254740992n
console.log(Number(bigNumber) + 1); // 9007199254740992 (may lose precision!)

// ❌ COMMON ERROR: Using BigInt with Math methods
// console.log(Math.max(1n, 2n));   // TypeError: Cannot convert a BigInt value to a number
//
// ✅ BigInt supports standard operators between BigInts
console.log(10n / 3n);             // 3n — integer division, truncates (no decimals)


// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 2: THE typeof OPERATOR AND ITS QUIRKS
// ═══════════════════════════════════════════════════════════════════════════════
//
// typeof returns a STRING describing the type of a value.
// But it has some WELL-KNOWN QUIRKS that trip up even experienced developers.
//

// ─── 2.1 Normal typeof results ─────────────────────────────────────────────

console.log(typeof 42);            // "number"
console.log(typeof "hello");       // "string"
console.log(typeof true);          // "boolean"
console.log(typeof undefined);     // "undefined"
console.log(typeof Symbol());      // "symbol"
console.log(typeof 42n);           // "bigint"
console.log(typeof {});            // "object"

// ─── 2.2 QUIRK #1: typeof null === 'object' ────────────────────────────────
//
// This is the MOST FAMOUS BUG in JavaScript.
// null is a PRIMITIVE, but typeof says it's an "object".
// This bug exists since JavaScript's creation in 1995 and will NEVER be fixed
// because fixing it would break too many existing websites.

console.log(typeof null);          // "object" ← BUG!
console.log(null === null);        // true (null IS null, just typeof lies)

// ✅ How to properly check for null
let value = null;
console.log(value === null);       // true — use strict equality to check for null

// ❌ COMMON ERROR: Using typeof to check for null
// if (typeof value === 'object') {
//   value.name;                    // TypeError! null has no properties
// }
//
// ✅ FIX: Check for null FIRST, then check typeof
if (value !== null && typeof value === 'object') {
  console.log("It's a real object, not null");
}


// ─── 2.3 QUIRK #2: typeof NaN === 'number' ─────────────────────────────────
//
// NaN stands for "Not a Number", yet typeof says it's a "number".
// This is technically correct: NaN is the IEEE 754 floating-point
// representation of an invalid numeric result. It IS a numeric type.

console.log(typeof NaN);           // "number" — "Not a Number" is a number! 🤯
console.log(NaN);                  // NaN
console.log(0 / 0);               // NaN
console.log(parseInt("hello"));    // NaN
console.log(Math.sqrt(-1));        // NaN


// ─── 2.4 QUIRK #3: typeof function vs typeof array ─────────────────────────
//
// Functions get their own typeof result: "function"
// But arrays are just "object" — there's no "array" typeof result.

console.log(typeof function() {}); // "function" — special case!
console.log(typeof []);            // "object" — arrays are objects in JS
console.log(typeof {});            // "object" — same as arrays!

// ✅ To distinguish arrays from objects, use Array.isArray()
console.log(Array.isArray([]));        // true
console.log(Array.isArray({}));        // false
console.log(Array.isArray("string"));  // false

// ─── 2.5 QUIRK #4: typeof undeclared variables ─────────────────────────────
//
// typeof is the ONLY operator that doesn't throw a ReferenceError
// when used on an undeclared variable. This can be useful for feature detection.

console.log(typeof undeclaredVariable); // "undefined" — no error!

// ❌ Without typeof, accessing an undeclared variable throws an error
// console.log(undeclaredVariable);       // ReferenceError: undeclaredVariable is not defined
//
// ✅ Useful for feature detection (e.g., checking if a global exists)
if (typeof window !== 'undefined') {
  console.log("Running in a browser");
} else {
  console.log("Running in Node.js or another environment");
}


// ─── 2.6 Complete typeof reference table ────────────────────────────────────
//
// Value               │ typeof result   │ Notes
// ────────────────────┼─────────────────┼─────────────────────────────
// 42                  │ "number"        │
// "hello"             │ "string"        │
// true                │ "boolean"       │
// undefined           │ "undefined"     │
// null                │ "object"        │ ⚠️ BUG — null is NOT an object
// Symbol()            │ "symbol"        │
// 42n                 │ "bigint"        │
// {}                  │ "object"        │
// []                  │ "object"        │ ⚠️ Use Array.isArray() instead
// function(){}        │ "function"      │ ⚠️ Functions are technically objects
// NaN                 │ "number"        │ ⚠️ "Not a Number" is a number
// undeclared var      │ "undefined"     │ ⚠️ No ReferenceError thrown


// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 3: TYPE COERCION (Converting Between Types)
// ═══════════════════════════════════════════════════════════════════════════════
//
// Type coercion is the process of converting a value from one type to another.
// JavaScript does this IMPLICITLY in many situations, which causes bugs.
// You can also do it EXPLICITLY using conversion functions.
//

// ─── 3.1 Converting TO Number ──────────────────────────────────────────────

// ✅ Method 1: Number() — strict conversion, entire string must be a valid number
console.log(Number('5'));          // 5
console.log(Number('3.14'));       // 3.14
console.log(Number(''));           // 0 — empty string becomes 0
console.log(Number(' '));          // 0 — whitespace-only string becomes 0
console.log(Number(true));         // 1
console.log(Number(false));        // 0
console.log(Number(null));         // 0
console.log(Number(undefined));    // NaN ← different from null!
console.log(Number('5px'));        // NaN — entire string must be numeric

// ✅ Method 2: parseInt() — parses until it hits a non-numeric character
console.log(parseInt('5px'));      // 5 — stops at 'p', returns 5
console.log(parseInt('3.99'));     // 3 — stops at '.', returns integer
console.log(parseInt('abc'));      // NaN — no leading digits
console.log(parseInt('0xff', 16)); // 255 — can specify radix (base)

// ❌ COMMON ERROR: parseInt without radix can give unexpected results
// console.log(parseInt('08'));     // 8 in modern JS, but USED TO be 0 in old browsers
//                                  // (old browsers treated leading 0 as octal)
// ✅ BEST PRACTICE: Always pass radix
console.log(parseInt('08', 10));   // 8 — explicitly base-10

// ✅ Method 3: parseFloat() — like parseInt but handles decimals
console.log(parseFloat('3.14px'));  // 3.14

// ✅ Method 4: Unary plus (+) — shorthand for Number()
console.log(+'5');                 // 5
console.log(+'');                  // 0
console.log(+'hello');             // NaN
console.log(+true);               // 1
console.log(+false);              // 0
console.log(+null);               // 0

// Summary: Number('5px') → NaN, parseInt('5px') → 5, +'5' → 5


// ─── 3.2 Converting TO String ──────────────────────────────────────────────

// ✅ Method 1: String() — works on everything, even null and undefined
console.log(String(123));         // "123"
console.log(String(true));        // "true"
console.log(String(null));        // "null"
console.log(String(undefined));   // "undefined"
console.log(String(NaN));         // "NaN"

// ✅ Method 2: .toString() — method on the value
console.log((123).toString());     // "123"
console.log(true.toString());     // "true"
console.log((255).toString(16));   // "ff" — can specify base!
console.log((10).toString(2));     // "1010" — binary representation

// ❌ COMMON ERROR: .toString() on null or undefined
// null.toString();                  // TypeError: Cannot read properties of null
// undefined.toString();             // TypeError: Cannot read properties of undefined
//
// ✅ FIX: Use String() which handles null and undefined safely

// ✅ Method 3: Template literals — auto-converts to string
let num = 42;
console.log(`The answer is ${num}`); // "The answer is 42"

// ✅ Method 4: Concatenation with empty string
console.log(42 + '');              // "42"
console.log(true + '');            // "true"


// ─── 3.3 Converting TO Boolean (Truthy vs Falsy) ───────────────────────────
//
// JavaScript has exactly 8 FALSY values. Everything else is TRUTHY.
//
// THE COMPLETE LIST OF FALSY VALUES:
//   1. false           — the boolean false
//   2. 0               — the number zero
//   3. -0              — negative zero (yes, it exists)
//   4. 0n              — BigInt zero
//   5. ''              — empty string (no spaces)
//   6. null            — no value
//   7. undefined       — not assigned
//   8. NaN             — not a number
//
// EVERYTHING ELSE IS TRUTHY, including some surprises:

// ✅ Explicit Boolean conversion
console.log(Boolean(0));           // false — falsy
console.log(Boolean(''));          // false — falsy
console.log(Boolean(null));        // false — falsy
console.log(Boolean(undefined));   // false — falsy
console.log(Boolean(NaN));         // false — falsy

// ✅ These are ALL TRUTHY (even though they look "empty")
console.log(Boolean('0'));         // true  — non-empty string (contains '0')
console.log(Boolean(' '));         // true  — non-empty string (contains space)
console.log(Boolean('false'));     // true  — the STRING "false" is truthy!
console.log(Boolean([]));          // true  — empty array is truthy!
console.log(Boolean({}));          // true  — empty object is truthy!
console.log(Boolean(-1));          // true  — any non-zero number is truthy
console.log(Boolean(Infinity));    // true  — Infinity is truthy

// ❌ COMMON ERROR: Thinking '0' or 'false' are falsy
// if ('false') {
//   console.log("This RUNS! The string 'false' is truthy!");
// }
// if ('0') {
//   console.log("This RUNS too! The string '0' is truthy!");
// }

// ✅ Double-bang (!!) shorthand for Boolean()
console.log(!!"hello");           // true
console.log(!!0);                  // false
console.log(!!"");                 // false
console.log(!!null);               // false


// ─── 3.4 IMPLICIT Coercion (The Dangerous Stuff) ──────────────────────────
//
// JavaScript automatically converts types when using operators.
// This is the source of MANY subtle bugs.

// ✅ The + operator with strings: CONCATENATION wins over addition
console.log('5' + 3);             // "53" — string + number = string concatenation
console.log('5' + true);          // "5true"
console.log('5' + null);          // "5null"
console.log('5' + undefined);     // "5undefined"
console.log(5 + 3);               // 8 — number + number = addition

// ✅ The -, *, / operators: ALWAYS convert to number
console.log('5' - 3);             // 2 — string is converted to number
console.log('5' * 3);             // 15
console.log('5' / 2);             // 2.5
console.log('5' - '3');           // 2

// ⚠️ This is WHY '5' + 3 = '53' but '5' - 3 = 2
// The + operator is OVERLOADED: it does both addition AND concatenation.
// If EITHER operand is a string, + does concatenation.
// The - operator ONLY does subtraction, so it converts strings to numbers.

// ❌ COMMON ERROR: Accidental string concatenation from form inputs
// let userAge = document.getElementById('age').value; // This is always a STRING
// let nextYear = userAge + 1;                         // "251" instead of 26!
//
// ✅ FIX: Convert to number first
// let nextYear = Number(userAge) + 1;                 // 26

// More weird implicit coercion examples:
console.log(true + true);         // 2 (true → 1, so 1 + 1)
console.log(true + false);        // 1 (true → 1, false → 0)
console.log([] + []);             // "" (both arrays convert to empty strings)
console.log([] + {});             // "[object Object]"
console.log({} + []);             // "[object Object]" (in an expression context)


// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 4: NaN (Not a Number) — THE WEIRDEST VALUE IN JAVASCRIPT
// ═══════════════════════════════════════════════════════════════════════════════

// ─── 4.1 NaN is NEVER equal to anything, not even itself ────────────────────

console.log(NaN === NaN);          // false — the ONLY value in JS not equal to itself
console.log(NaN == NaN);           // false — even loose equality doesn't help
console.log(NaN !== NaN);          // true — the only way to "detect" NaN via comparison

// ─── 4.2 isNaN() vs Number.isNaN() ─────────────────────────────────────────
//
// There are TWO ways to check for NaN, and they behave DIFFERENTLY.

// ❌ Global isNaN() — COERCES the argument to a number first (unreliable)
console.log(isNaN(NaN));           // true ✅
console.log(isNaN('hello'));       // true ⚠️ — 'hello' → NaN → true (misleading!)
console.log(isNaN(undefined));     // true ⚠️ — undefined → NaN → true
console.log(isNaN({}));            // true ⚠️ — {} → NaN → true
console.log(isNaN(''));            // false — '' → 0 → not NaN
console.log(isNaN('123'));         // false — '123' → 123 → not NaN

// ✅ Number.isNaN() — NO coercion, checks if value is LITERALLY NaN (ES6+)
console.log(Number.isNaN(NaN));        // true ✅
console.log(Number.isNaN('hello'));    // false ✅ — 'hello' is a string, not NaN
console.log(Number.isNaN(undefined));  // false ✅ — undefined is not NaN
console.log(Number.isNaN({}));         // false ✅ — {} is not NaN

// ✅ BEST PRACTICE: Always use Number.isNaN() instead of isNaN()

// ─── 4.3 Operations that produce NaN ───────────────────────────────────────

console.log(0 / 0);               // NaN
console.log(Infinity - Infinity);  // NaN
console.log(Math.sqrt(-1));        // NaN
console.log(parseInt("abc"));     // NaN
console.log(undefined + 1);       // NaN

// ⚠️ NaN is "contagious" — any operation involving NaN returns NaN
console.log(NaN + 5);             // NaN
console.log(NaN * 100);           // NaN
console.log(NaN > 0);             // false
console.log(NaN < 0);             // false
console.log(NaN === 0);           // false
// NaN is not greater than, less than, or equal to ANYTHING (including itself)


// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 5: null VS undefined
// ═══════════════════════════════════════════════════════════════════════════════
//
// Both mean "no value", but they have DIFFERENT purposes:
//
//   undefined = "value was never set" (JavaScript's default)
//   null      = "value was intentionally set to nothing" (programmer's choice)
//

// ─── 5.1 When you get undefined ─────────────────────────────────────────────

let notSet;                          // Variable declared but not assigned
console.log(notSet);                 // undefined

function noReturn() {}               // Function with no return statement
console.log(noReturn());             // undefined

let person = { name: "Alice" };
console.log(person.age);             // undefined — property doesn't exist

function greet(personName) {
  console.log(personName);           // undefined — if called without argument
}
greet();

// ─── 5.2 When you use null ─────────────────────────────────────────────────

let selectedUser = null;             // Explicitly "no user selected"
let cachedData = null;               // Cache is empty on purpose

// ─── 5.3 Comparing null and undefined ───────────────────────────────────────

console.log(null == undefined);      // true  — loose equality says they're "equal"
console.log(null === undefined);     // false — strict equality says they're different
console.log(typeof null);            // "object" — the famous bug
console.log(typeof undefined);       // "undefined"

// ✅ Both are falsy
console.log(Boolean(null));          // false
console.log(Boolean(undefined));     // false

// ✅ But they convert to numbers differently
console.log(Number(null));           // 0
console.log(Number(undefined));      // NaN

// ✅ Quick summary:
//   null == undefined  → true  (they're "similar" in loose comparison)
//   null === undefined → false (they're different types)
//   typeof null        → "object" (bug)
//   typeof undefined   → "undefined"
//   Number(null)       → 0
//   Number(undefined)  → NaN


// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 6: CHECKING TYPES SAFELY
// ═══════════════════════════════════════════════════════════════════════════════

// ─── 6.1 typeof — good for primitives, bad for objects ──────────────────────

console.log(typeof 42);               // "number" ✅
console.log(typeof "hello");          // "string" ✅
console.log(typeof true);             // "boolean" ✅
console.log(typeof undefined);        // "undefined" ✅
console.log(typeof Symbol());         // "symbol" ✅
console.log(typeof 42n);              // "bigint" ✅
console.log(typeof null);             // "object" ❌ (use === null instead)
console.log(typeof []);               // "object" ❌ (use Array.isArray())
console.log(typeof {});               // "object" ✅

// ─── 6.2 Array.isArray() — the ONLY reliable array check ───────────────────

console.log(Array.isArray([]));        // true
console.log(Array.isArray([1, 2, 3])); // true
console.log(Array.isArray('hello'));   // false
console.log(Array.isArray({ length: 3 })); // false — array-like objects are NOT arrays

// ❌ COMMON ERROR: Using typeof to check for arrays
// if (typeof myVar === 'array') {}   // WRONG — 'array' is never a typeof result
// if (typeof myVar === 'object') {}  // WRONG — null and {} also pass this check

// ─── 6.3 instanceof — checks the prototype chain ───────────────────────────

console.log([] instanceof Array);      // true
console.log({} instanceof Object);     // true
console.log("hello" instanceof String); // false — primitives are NOT instances
console.log(new String("hello") instanceof String); // true — wrapped object IS

// ─── 6.4 A robust type-checking function ───────────────────────────────────

function getType(value) {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  return typeof value;
}

console.log(getType(42));             // "number"
console.log(getType("hello"));        // "string"
console.log(getType(null));           // "null" ✅ (not "object")
console.log(getType([1, 2]));         // "array" ✅ (not "object")
console.log(getType({}));             // "object"
console.log(getType(undefined));      // "undefined"


// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 7: DYNAMIC TYPING
// ═══════════════════════════════════════════════════════════════════════════════
//
// JavaScript is DYNAMICALLY typed. Variables don't have types — VALUES do.
// A variable can hold any type and change types at any time.
//

// ✅ This is perfectly legal in JavaScript (but questionable practice)
let x = 5;                // x holds a number
console.log(typeof x);     // "number"

x = 'hello';              // x now holds a string — no error!
console.log(typeof x);     // "string"

x = true;                 // x now holds a boolean
console.log(typeof x);     // "boolean"

x = null;                 // x now holds null
console.log(typeof x);     // "object" (the typeof null bug again)

x = [1, 2, 3];            // x now holds an array
console.log(typeof x);     // "object"

// ❌ In STATICALLY typed languages (Java, C++, TypeScript), this would be an error:
// int x = 5;
// x = "hello";            // ERROR: cannot assign string to int variable
//
// ✅ JavaScript doesn't care — this is both its flexibility and its danger.
// TypeScript was created specifically to add static typing to JavaScript.

// ⚠️ WHY DYNAMIC TYPING CAN BE DANGEROUS:
// You might accidentally change a variable's type and break later code

function calculateTotal(price, quantity) {
  // If someone passes strings (e.g., from HTML form inputs):
  return price * quantity;
}
console.log(calculateTotal(10, 5));       // 50 ✅
console.log(calculateTotal('10', '5'));   // 50 ✅ (happens to work because * coerces)
console.log(calculateTotal('10', '5a')); // NaN ❌ (silent failure)

// ✅ BEST PRACTICE: Validate types at function boundaries
function safeCalculateTotal(price, quantity) {
  price = Number(price);
  quantity = Number(quantity);
  if (Number.isNaN(price) || Number.isNaN(quantity)) {
    throw new Error('Invalid numeric input');
  }
  return price * quantity;
}


// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 8: QUICK REFERENCE — TYPE CONVERSION CHEAT SHEET
// ═══════════════════════════════════════════════════════════════════════════════
//
//  To Number:
//  ──────────────────────────────────────────────────────────────
//  Number('5')       → 5        Number('')        → 0
//  Number('5px')     → NaN      Number(' ')       → 0
//  Number(true)      → 1        Number(false)     → 0
//  Number(null)      → 0        Number(undefined) → NaN
//  parseInt('5px')   → 5        parseFloat('3.14px') → 3.14
//  +'5'              → 5        +true             → 1
//
//  To String:
//  ──────────────────────────────────────────────────────────────
//  String(123)       → "123"    (123).toString()  → "123"
//  String(true)      → "true"   String(null)      → "null"
//  String(undefined) → "undefined"
//  123 + ''          → "123"    `${123}`           → "123"
//
//  To Boolean (falsy values):
//  ──────────────────────────────────────────────────────────────
//  Boolean(0)        → false    Boolean('')        → false
//  Boolean(null)     → false    Boolean(undefined) → false
//  Boolean(NaN)      → false    Boolean(false)     → false
//  Boolean(-0)       → false    Boolean(0n)        → false
//  Everything else   → true     (including [], {}, '0', 'false')
//
// ══════════════════════════════════════════════════════════════════════════════
