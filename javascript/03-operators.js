// ══════════════════════════════════════════════════════════════════════════════
// 03 — OPERATORS IN JAVASCRIPT
// ══════════════════════════════════════════════════════════════════════════════
//
// Operators are symbols that perform operations on values and variables.
// JavaScript has some UNIQUE operator behaviors that differ from other languages,
// particularly around equality, short-circuit logic, and bitwise operations.
// ══════════════════════════════════════════════════════════════════════════════


// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 1: STRICT EQUALITY (===) vs LOOSE EQUALITY (==)
// ═══════════════════════════════════════════════════════════════════════════════
//
// === (strict equality)  → compares value AND type. No conversion.
// ==  (loose equality)   → converts types FIRST, then compares. Often surprising.
//
// RULE: ALWAYS use === unless you have a specific reason for ==.
//

// ─── 1.1 Basic comparison: strict vs loose ──────────────────────────────────

// ✅ Strict equality: type must match
console.log(5 === 5);             // true  — same value, same type
console.log(5 === '5');           // false — number vs string, different types!
console.log(1 === true);          // false — number vs boolean
console.log(0 === false);         // false — number vs boolean
console.log('' === false);        // false — string vs boolean
console.log(null === undefined);  // false — different types

// ✅ Loose equality: type coercion happens behind the scenes
console.log(5 == '5');            // true  — '5' is coerced to number 5
console.log(1 == true);           // true  — true is coerced to number 1
console.log(0 == false);          // true  — false is coerced to number 0
console.log('' == false);         // true  — both coerce to 0
console.log(null == undefined);   // true  — special rule: null and undefined are "equal"

// ❌ COMMON ERROR: Relying on == leads to confusing results
// console.log('0' == false);     // true — '0' → 0, false → 0, 0 === 0 ✅
// console.log('' == false);      // true — '' → 0, false → 0, 0 === 0 ✅
// console.log('0' == '');        // false — both strings, compared directly. '0' !== ''
//
// So:  '0' == false → true
//      '' == false  → true
//      '0' == ''    → false     ← If A==B and B==C, you'd expect A==C. NOPE.
// This is why == breaks logical reasoning. Just use ===.


// ─── 1.2 null and undefined equality ────────────────────────────────────────

// ✅ null and undefined are ONLY loosely equal to each other, nothing else
console.log(null == undefined);    // true  — special JS rule
console.log(null == null);         // true
console.log(undefined == undefined); // true
console.log(null == 0);           // false — null does NOT coerce to 0 with ==
console.log(null == '');           // false — null does NOT coerce to '' with ==
console.log(null == false);        // false — null is NOT loosely equal to false!

// ⚠️ This means: null == undefined is true, but null == false is false
// Even though both null and false are falsy, == treats null specially.

// ✅ This is the ONE common use case where == can be useful:
// Checking for null OR undefined in one comparison
let val = null;
if (val == null) {
  console.log("val is null or undefined"); // This catches BOTH
}
// Equivalent strict version requires two checks:
// if (val === null || val === undefined) { ... }


// ─── 1.3 Type coercion traps with == ───────────────────────────────────────

// ✅ String '0' with loose equality
console.log('0' == false);        // true — '0' → 0, false → 0
console.log('' == false);         // true — '' → 0, false → 0
console.log(' ' == false);        // false! — ' ' → 0, false → 0... 
//                                    Wait, ' ' trims to '' → 0. Actually true in ES5+.
//                                    Let's verify:
console.log(' ' == false);        // true in modern JS — space string converts to 0
console.log(' ' == 0);            // true — whitespace string → 0

// But WHITESPACE STRINGS ARE TRUTHY in boolean context:
console.log(Boolean(' '));         // true — non-empty string
console.log(' ' == true);         // false! — ' ' → 0, true → 1, 0 !== 1

// ⚠️ So ' ' is truthy (Boolean(' ') → true), but ' ' == true → false
// This is why == is fundamentally broken for logical reasoning.

// More type coercion traps:
console.log([] == false);          // true  — [] → '' → 0, false → 0
console.log([] == ![]);            // true  — [] → 0, ![] → false → 0  🤯
console.log([1] == 1);             // true  — [1] → '1' → 1
console.log([1,2] == '1,2');       // true  — [1,2].toString() → '1,2'

// ─── 1.4 Strict inequality (!==) vs Loose inequality (!=) ──────────────────

console.log(5 !== '5');            // true  — different types (use this one)
console.log(5 != '5');             // false — coercion makes them "equal" (avoid this)


// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 2: FALSY VALUES — THE COMPLETE LIST
// ═══════════════════════════════════════════════════════════════════════════════
//
// There are exactly 8 falsy values in JavaScript. EVERYTHING else is truthy.
//

// ✅ All 8 falsy values:
console.log(Boolean(false));       // false — the literal false
console.log(Boolean(0));           // false — the number zero
console.log(Boolean(-0));          // false — negative zero
console.log(Boolean(0n));          // false — BigInt zero
console.log(Boolean(''));          // false — empty string (no characters at all)
console.log(Boolean(null));        // false — null
console.log(Boolean(undefined));   // false — undefined
console.log(Boolean(NaN));         // false — Not a Number

// ⚠️ EVERYTHING ELSE IS TRUTHY, including these surprises:
console.log(Boolean('0'));         // true — string containing '0'
console.log(Boolean('false'));     // true — string containing 'false'
console.log(Boolean(' '));         // true — string containing a space
console.log(Boolean([]));          // true — empty array
console.log(Boolean({}));          // true — empty object
console.log(Boolean(-1));          // true — negative numbers (except -0)
console.log(Boolean(Infinity));    // true — Infinity
console.log(Boolean(new Boolean(false))); // true — wrapper objects are always truthy!

// ❌ COMMON ERROR: Assuming empty arrays are falsy
// if ([]) {
//   console.log("This RUNS! Empty array is truthy!"); // ← yes, this runs
// }
//
// ✅ To check for empty array, check .length:
// if (myArray.length > 0) { /* array has elements */ }


// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 3: SHORT-CIRCUIT EVALUATION
// ═══════════════════════════════════════════════════════════════════════════════
//
// In JavaScript, || and && don't return true/false — they return one of
// the OPERAND values. This is different from most other languages.
//

// ─── 3.1 Logical OR (||) — returns the FIRST TRUTHY value ──────────────────
//
// || evaluates left to right. It returns the FIRST TRUTHY value it finds.
// If ALL values are falsy, it returns the LAST value.

console.log('hello' || 'world');   // "hello" — first is truthy, return it
console.log(0 || 'default');       // "default" — 0 is falsy, move to next
console.log('' || 'fallback');     // "fallback" — '' is falsy, move to next
console.log(null || undefined || 'last'); // "last" — first two are falsy
console.log(0 || '' || null);      // null — all falsy, returns the last one
console.log(false || 0 || '');     // "" — all falsy, returns the last value

// ✅ Common pattern: default values
let userName = '' || 'Guest';      // "Guest" — empty string is falsy
let port = 0 || 3000;             // 3000 — 0 is falsy!

// ❌ PROBLEM: || treats 0, '', and false as "missing" values
// What if 0 is a VALID value (like a port number or a count)?
// let userPort = 0;
// let port = userPort || 3000;   // 3000 ← WRONG! We wanted 0!
//
// ✅ FIX: Use nullish coalescing (??) instead — see Section 3.3

// ─── 3.2 Logical AND (&&) — returns the FIRST FALSY value ──────────────────
//
// && evaluates left to right. It returns the FIRST FALSY value it finds.
// If ALL values are truthy, it returns the LAST value.

console.log('hello' && 'world');   // "world" — first is truthy, continue, return last
console.log('hello' && 0);        // 0 — first is truthy, second is falsy, return it
console.log(0 && 'hello');         // 0 — first is falsy, return it immediately
console.log(null && 'hello');      // null — first is falsy, return it
console.log(1 && 2 && 3);         // 3 — all truthy, return the last one
console.log(1 && 0 && 3);         // 0 — first falsy encountered

// ✅ Common pattern: conditional execution
let user = { name: 'Alice', isAdmin: true };
user.isAdmin && console.log("Show admin panel"); // Runs because isAdmin is truthy

// ✅ Common pattern: safe property access (before optional chaining existed)
let config = null;
let theme = config && config.theme; // null — config is falsy, returns null
// (Modern alternative: config?.theme)


// ─── 3.3 Nullish Coalescing (??) — ES2020 ──────────────────────────────────
//
// ?? returns the RIGHT side ONLY if the left side is null or undefined.
// Unlike ||, it does NOT treat 0, '', or false as "missing".
// This is the CORRECT way to provide defaults when 0, '', false are valid values.

console.log(null ?? 'default');        // "default" — null triggers ??
console.log(undefined ?? 'default');   // "default" — undefined triggers ??
console.log(0 ?? 'default');           // 0 — 0 is NOT null/undefined, kept!
console.log('' ?? 'default');          // "" — '' is NOT null/undefined, kept!
console.log(false ?? 'default');       // false — false is NOT null/undefined, kept!

// ✅ Comparison: || vs ??
let count = 0;
console.log(count || 10);             // 10 ← WRONG if 0 is valid
console.log(count ?? 10);             // 0  ← CORRECT, 0 is not null/undefined

let text = '';
console.log(text || 'default');        // "default" ← WRONG if '' is valid
console.log(text ?? 'default');        // ""  ← CORRECT, '' is not null/undefined

// ❌ COMMON ERROR: Mixing ?? with || or && without parentheses
// let result = null || undefined ?? 'default'; // SyntaxError!
// JavaScript requires explicit parentheses to avoid ambiguity.
//
// ✅ FIX:
let result = (null || undefined) ?? 'default'; // "default"


// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 4: BITWISE OPERATORS
// ═══════════════════════════════════════════════════════════════════════════════
//
// Bitwise operators work on the BINARY (base-2) representation of numbers.
// JavaScript converts numbers to 32-bit signed integers for bitwise operations,
// then converts back. These are rarely used in everyday JS but are powerful
// for specific tasks like flags, permissions, and performance tricks.
//

// ─── 4.1 Bitwise AND (&) ───────────────────────────────────────────────────
//
// Each bit in the result is 1 only if BOTH corresponding bits are 1.

//   5 = 0101
//   3 = 0011
// & ────────
//   1 = 0001
console.log(5 & 3);               // 1

// ✅ Practical use: Check if a number is odd or even
// Any odd number has bit 0 set to 1. num & 1 extracts that bit.
console.log(7 & 1);               // 1 — odd  (0111 & 0001 = 0001)
console.log(4 & 1);               // 0 — even (0100 & 0001 = 0000)

function isOdd(num) {
  return (num & 1) === 1;          // Faster than num % 2 !== 0
}
console.log(isOdd(7));             // true
console.log(isOdd(4));             // false


// ─── 4.2 Bitwise OR (|) ────────────────────────────────────────────────────
//
// Each bit in the result is 1 if EITHER corresponding bit is 1.

//   5 = 0101
//   3 = 0011
// | ────────
//   7 = 0111
console.log(5 | 3);               // 7

// ✅ Practical use: Permission flags
// Each permission is a power of 2 (one bit position)
const READ    = 0b0001;           // 1
const WRITE   = 0b0010;           // 2
const EXECUTE = 0b0100;           // 4
const DELETE  = 0b1000;           // 8

// Combine permissions with OR
let adminPermissions = READ | WRITE | EXECUTE | DELETE; // 0b1111 = 15
let userPermissions  = READ | WRITE;                    // 0b0011 = 3

// Check permissions with AND
console.log((userPermissions & WRITE) !== 0);   // true — user can write
console.log((userPermissions & EXECUTE) !== 0); // false — user can't execute
console.log((userPermissions & DELETE) !== 0);  // false — user can't delete

// Add a permission with OR
userPermissions = userPermissions | EXECUTE;     // 0b0111 = 7
console.log((userPermissions & EXECUTE) !== 0); // true — now user can execute

// Remove a permission with AND + NOT
userPermissions = userPermissions & ~EXECUTE;    // 0b0011 = 3
console.log((userPermissions & EXECUTE) !== 0); // false — execute removed


// ─── 4.3 Bitwise NOT (~) ───────────────────────────────────────────────────
//
// Flips ALL bits. For a number n, ~n = -(n + 1)

console.log(~5);                   // -6 — flips all 32 bits of 5
console.log(~-1);                  // 0
console.log(~0);                   // -1

// The formula: ~n = -(n + 1)
// ~5  = -(5 + 1)  = -6
// ~-1 = -(-1 + 1) = 0
// ~0  = -(0 + 1)  = -1

// ✅ Classic trick: indexOf check (before .includes() existed)
// indexOf returns -1 if not found. ~(-1) === 0 (falsy), ~(anything else) is truthy.
let str = "Hello, World!";

// Old style with ~
if (~str.indexOf('World')) {
  console.log("Found 'World'!");   // Runs — indexOf returns 7, ~7 = -8 (truthy)
}
if (~str.indexOf('xyz')) {
  console.log("Found 'xyz'!");     // Does NOT run — indexOf returns -1, ~(-1) = 0 (falsy)
}

// ✅ Modern alternative (much clearer):
if (str.includes('World')) {
  console.log("Found 'World'!");   // Use this instead
}

// ✅ Double NOT (~~) for truncating decimals (faster Math.floor for positives)
console.log(~~3.7);                // 3 (truncates toward zero)
console.log(~~-3.7);              // -3 (truncates toward zero, NOT floor!)
console.log(Math.floor(-3.7));    // -4 (floor goes DOWN)
// ⚠️ ~~ truncates, Math.floor rounds down — different for negatives!


// ─── 4.4 Left Shift (<<) ───────────────────────────────────────────────────
//
// Shifts bits to the LEFT by n positions. Each shift multiplies by 2.

//   5 = 00000101
//   5 << 1 = 00001010 = 10
console.log(5 << 1);              // 10 — 5 * 2 = 10
console.log(5 << 2);              // 20 — 5 * 4 = 20
console.log(5 << 3);              // 40 — 5 * 8 = 40
console.log(1 << 0);              // 1  — 2^0
console.log(1 << 1);              // 2  — 2^1
console.log(1 << 2);              // 4  — 2^2
console.log(1 << 3);              // 8  — 2^3
console.log(1 << 10);             // 1024 — 2^10

// ✅ General formula: n << k = n * (2^k)


// ─── 4.5 Right Shift (>>) ──────────────────────────────────────────────────
//
// Shifts bits to the RIGHT by n positions. Each shift divides by 2 (integer division).

//   10 = 00001010
//   10 >> 1 = 00000101 = 5
console.log(10 >> 1);             // 5 — 10 / 2 = 5
console.log(10 >> 2);             // 2 — 10 / 4 = 2.5, floored to 2
console.log(100 >> 1);            // 50 — 100 / 2 = 50
console.log(7 >> 1);              // 3 — 7 / 2 = 3.5, floored to 3

// ✅ General formula: n >> k = Math.floor(n / 2^k)

// ✅ Unsigned right shift (>>>) — fills with zeros (treats as unsigned)
console.log(-1 >>> 0);            // 4294967295 — converts to unsigned 32-bit

// ─── 4.6 Bitwise XOR (^) ───────────────────────────────────────────────────
//
// Each bit is 1 if the corresponding bits are DIFFERENT.

//   5 = 0101
//   3 = 0011
// ^ ────────
//   6 = 0110
console.log(5 ^ 3);               // 6

// ✅ XOR tricks
console.log(5 ^ 5);               // 0 — any number XOR itself = 0
console.log(5 ^ 0);               // 5 — any number XOR 0 = itself

// ✅ Toggle a bit
let flags = 0b1010;
flags = flags ^ 0b0010;           // Toggle bit 1: 0b1010 → 0b1000 (10 → 8)
console.log(flags);                // 8
flags = flags ^ 0b0010;           // Toggle again: 0b1000 → 0b1010 (8 → 10)
console.log(flags);                // 10

// ─── 4.7 Binary representation helper ──────────────────────────────────────

// ✅ View any number as binary string
function toBinary(num) {
  return (num >>> 0).toString(2).padStart(8, '0');
}
console.log(toBinary(5));         // "00000101"
console.log(toBinary(3));         // "00000011"
console.log(toBinary(5 & 3));     // "00000001" (AND)
console.log(toBinary(5 | 3));     // "00000111" (OR)
console.log(toBinary(5 ^ 3));     // "00000110" (XOR)
console.log(toBinary(~5));        // "11111111111111111111111111111010" (NOT, 32-bit)


// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 5: TERNARY OPERATOR
// ═══════════════════════════════════════════════════════════════════════════════
//
// Syntax: condition ? valueIfTrue : valueIfFalse
// It's an EXPRESSION (returns a value), not a statement.
//

// ─── 5.1 Basic usage ───────────────────────────────────────────────────────

let age = 20;

// ✅ Simple ternary — clear and readable
let status = age >= 18 ? 'adult' : 'minor';
console.log(status);               // "adult"

// ✅ Equivalent if/else (ternary is more concise for simple cases)
// let status;
// if (age >= 18) {
//   status = 'adult';
// } else {
//   status = 'minor';
// }

// ✅ Inline usage
console.log(`You are ${age >= 18 ? 'an adult' : 'a minor'}`);

// ✅ Assigning with conditions
let greeting2 = user.name ? `Hello, ${user.name}!` : 'Hello, stranger!';
console.log(greeting2);            // "Hello, Alice!"


// ─── 5.2 Nested ternaries (AVOID when possible) ────────────────────────────

let score = 75;

// ❌ Nested ternary — hard to read and maintain
let grade = score >= 90 ? 'A'
          : score >= 80 ? 'B'
          : score >= 70 ? 'C'
          : score >= 60 ? 'D'
          : 'F';
console.log(grade);                // "C"

// ✅ BETTER: Use if/else or a function for complex conditions
function getGrade(s) {
  if (s >= 90) return 'A';
  if (s >= 80) return 'B';
  if (s >= 70) return 'C';
  if (s >= 60) return 'D';
  return 'F';
}
console.log(getGrade(75));         // "C" — much more readable!


// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 6: LOGICAL ASSIGNMENT OPERATORS (ES2021)
// ═══════════════════════════════════════════════════════════════════════════════
//
// These combine logical operators with assignment.
// They assign ONLY if the condition is met.
//

// ─── 6.1 Logical OR Assignment (||=) ───────────────────────────────────────
//
// x ||= y → assigns y to x ONLY if x is falsy
// Equivalent to: x = x || y (but doesn't re-assign if x is truthy)

let a = '';
a ||= 'default';                   // '' is falsy, so a becomes 'default'
console.log(a);                    // "default"

let b = 'existing';
b ||= 'default';                   // 'existing' is truthy, no assignment
console.log(b);                    // "existing"

// ✅ Use case: Setting default values for options
let options = { color: '', size: 'large' };
options.color ||= 'blue';          // '' is falsy → assigned 'blue'
options.size ||= 'medium';         // 'large' is truthy → not assigned
console.log(options);              // { color: 'blue', size: 'large' }


// ─── 6.2 Logical AND Assignment (&&=) ──────────────────────────────────────
//
// x &&= y → assigns y to x ONLY if x is truthy
// Equivalent to: x = x && y (but doesn't re-assign if x is falsy)

let c = 'hello';
c &&= 'world';                    // 'hello' is truthy, so c becomes 'world'
console.log(c);                    // "world"

let d = '';
d &&= 'world';                    // '' is falsy, no assignment
console.log(d);                    // ""

// ✅ Use case: Update only if value exists
let userSettings = { theme: 'dark', language: null };
userSettings.theme &&= userSettings.theme.toUpperCase();
console.log(userSettings.theme);   // "DARK" — theme existed, so it was transformed

userSettings.language &&= userSettings.language.toUpperCase();
console.log(userSettings.language); // null — language was null, no assignment


// ─── 6.3 Nullish Coalescing Assignment (??=) ───────────────────────────────
//
// x ??= y → assigns y to x ONLY if x is null or undefined
// This is the BEST assignment operator for defaults, because it respects
// valid falsy values like 0, '', and false.

let e = null;
e ??= 'default';                   // null triggers ??=, assigned 'default'
console.log(e);                    // "default"

let f = 0;
f ??= 42;                         // 0 is NOT null/undefined, no assignment
console.log(f);                    // 0 ← preserved!

let g = '';
g ??= 'fallback';                 // '' is NOT null/undefined, no assignment
console.log(g);                    // "" ← preserved!

let h = false;
h ??= true;                       // false is NOT null/undefined, no assignment
console.log(h);                    // false ← preserved!

// ✅ Use case: Initialize only if property is missing
let defaults = { port: undefined, host: 'localhost', debug: false };
defaults.port ??= 3000;           // undefined → assigned 3000
defaults.host ??= '0.0.0.0';     // 'localhost' → not assigned
defaults.debug ??= true;          // false → not assigned (false is not null/undefined!)
console.log(defaults);
// { port: 3000, host: 'localhost', debug: false }

// ─── 6.4 Comparison of all three ──────────────────────────────────────────
//
// Operator │ Assigns when...          │ Treats as "empty"
// ─────────┼──────────────────────────┼───────────────────────
// ||=      │ left side is FALSY       │ false, 0, '', null, undefined, NaN
// &&=      │ left side is TRUTHY      │ (assigns when it's NOT empty)
// ??=      │ left side is null/undef  │ null, undefined ONLY
//
// ✅ BEST PRACTICE: Use ??= for defaults, as it preserves valid falsy values.


// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 7: ARITHMETIC OPERATORS — QUICK REFERENCE
// ═══════════════════════════════════════════════════════════════════════════════

// ─── 7.1 Standard arithmetic ───────────────────────────────────────────────

console.log(10 + 3);              // 13 — addition
console.log(10 - 3);              // 7  — subtraction
console.log(10 * 3);              // 30 — multiplication
console.log(10 / 3);              // 3.3333... — division (always float)
console.log(10 % 3);              // 1  — modulo (remainder)
console.log(10 ** 3);             // 1000 — exponentiation (ES2016)

// ─── 7.2 Increment / Decrement ─────────────────────────────────────────────

let counter = 5;

// PREFIX: changes value BEFORE returning it
console.log(++counter);            // 6 — increments, then returns 6
console.log(--counter);            // 5 — decrements, then returns 5

// POSTFIX: returns value BEFORE changing it
console.log(counter++);            // 5 — returns 5, then increments to 6
console.log(counter);              // 6 — now it's 6
console.log(counter--);            // 6 — returns 6, then decrements to 5
console.log(counter);              // 5 — now it's 5

// ❌ COMMON ERROR: Confusing prefix and postfix
// let i = 0;
// console.log(i++);               // 0 (NOT 1!) — returns THEN increments
// console.log(i);                  // 1 — now it's 1

// ─── 7.3 Compound assignment ───────────────────────────────────────────────

let n = 10;
n += 5;    console.log(n);        // 15 — same as n = n + 5
n -= 3;    console.log(n);        // 12 — same as n = n - 3
n *= 2;    console.log(n);        // 24 — same as n = n * 2
n /= 4;    console.log(n);        // 6  — same as n = n / 4
n %= 4;    console.log(n);        // 2  — same as n = n % 4
n **= 3;   console.log(n);        // 8  — same as n = n ** 3


// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 8: COMPARISON AND RELATIONAL OPERATORS
// ═══════════════════════════════════════════════════════════════════════════════

console.log(5 > 3);                // true
console.log(5 < 3);                // false
console.log(5 >= 5);               // true
console.log(5 <= 4);               // false

// ⚠️ String comparison is LEXICOGRAPHIC (alphabetical by character code)
console.log('apple' < 'banana');   // true — 'a' (97) < 'b' (98)
console.log('Zebra' < 'apple');    // true — uppercase letters have lower char codes!
console.log('10' < '9');           // true — '1' (49) < '9' (57) — string comparison!
console.log(10 < 9);              // false — numeric comparison

// ❌ COMMON ERROR: Comparing strings when you meant numbers
// let userInput = '100';
// if (userInput < '9') {          // true! String comparison, not numeric
//   console.log("Less than 9");   // This runs — WRONG!
// }
//
// ✅ FIX: Convert to number first
// if (Number(userInput) < 9) { ... }


// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 9: OPERATOR PRECEDENCE — QUICK OVERVIEW
// ═══════════════════════════════════════════════════════════════════════════════
//
// Higher precedence = evaluated FIRST (like math class: * before +)
//
//  Precedence │ Operator       │ Example
//  ───────────┼────────────────┼────────────────────────
//  Highest    │ ()             │ Grouping: (a + b) * c
//             │ **             │ 2 ** 3 = 8
//             │ *, /, %        │ 5 * 2 = 10
//             │ +, -           │ 5 + 2 = 7
//             │ <, >, <=, >=   │ 5 > 3 = true
//             │ ==, ===, !=    │ 5 === 5 = true
//             │ &&             │ true && false = false
//             │ ||             │ true || false = true
//             │ ??             │ null ?? 'def' = 'def'
//             │ ? :            │ x ? a : b
//  Lowest     │ =, +=, etc.    │ x = 5
//
// ✅ When in doubt, use parentheses to make precedence explicit!

console.log(2 + 3 * 4);           // 14, not 20 — * before +
console.log((2 + 3) * 4);         // 20 — parentheses override
console.log(true || false && false); // true — && has higher precedence than ||
console.log((true || false) && false); // false — parentheses change evaluation


// ══════════════════════════════════════════════════════════════════════════════
