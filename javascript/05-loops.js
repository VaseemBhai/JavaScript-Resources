// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                          05 — LOOPS IN JAVASCRIPT                          ║
// ║  Repeating code: for, while, do-while, for...of, for...in, break/continue  ║
// ╚══════════════════════════════════════════════════════════════════════════════╝


// ════════════════════════════════════════════════════════════════════════════════
// 1. THE for LOOP — ANATOMY
// ════════════════════════════════════════════════════════════════════════════════
//
// The for loop has three parts separated by semicolons:
//
//   for (initialization; condition; step) {
//       // body — runs while condition is true
//   }
//
//   1. initialization — runs ONCE before the loop starts
//   2. condition      — checked BEFORE each iteration; if false, loop stops
//   3. step           — runs AFTER each iteration's body
//

// ──── 1.1 Basic counting loop ────────────────────────────────────────────────

// ✅ Print numbers 1 through 5
for (let i = 1; i <= 5; i++) {
    console.log("Count:", i);
}
// Output:
// Count: 1
// Count: 2
// Count: 3
// Count: 4
// Count: 5

// ──── 1.2 Looping through an array ──────────────────────────────────────────

const fruits = ["apple", "banana", "cherry", "date"];

// ✅ Classic for loop to iterate an array
for (let i = 0; i < fruits.length; i++) {
    console.log(`Fruit ${i}: ${fruits[i]}`);
}
// Output:
// Fruit 0: apple
// Fruit 1: banana
// Fruit 2: cherry
// Fruit 3: date

// ──── 1.3 Counting by steps ─────────────────────────────────────────────────

// ✅ Count even numbers from 0 to 10
for (let i = 0; i <= 10; i += 2) {
    console.log("Even:", i);
}
// Output: Even: 0, Even: 2, Even: 4, Even: 6, Even: 8, Even: 10

// ✅ Countdown from 10 to 1
for (let i = 10; i >= 1; i--) {
    console.log("Countdown:", i);
}


// ════════════════════════════════════════════════════════════════════════════════
// 2. THE while LOOP — CONDITION-ONLY
// ════════════════════════════════════════════════════════════════════════════════
//
// Use when:
//   - You don't know the exact number of iterations in advance
//   - The loop depends on an external condition changing
//
//   while (condition) {
//       // body
//   }
//

// ──── 2.1 Basic while loop ──────────────────────────────────────────────────

// ✅ Keep halving a number until it drops below 1
let value = 100;

while (value >= 1) {
    console.log("Value:", value);
    value = value / 2;
}
// Output: 100, 50, 25, 12.5, 6.25, 3.125, 1.5625

// ──── 2.2 Simulating user input (unknown iteration count) ───────────────────

// ✅ Simulate rolling a die until we get a 6
function rollDie() {
    return Math.floor(Math.random() * 6) + 1;   // random 1–6
}

let roll = rollDie();
let attempts = 1;

while (roll !== 6) {
    console.log(`Rolled ${roll}, trying again...`);
    roll = rollDie();
    attempts++;
}
console.log(`Got a 6 after ${attempts} attempts!`);


// ════════════════════════════════════════════════════════════════════════════════
// 3. THE do-while LOOP — GUARANTEED AT LEAST ONE EXECUTION
// ════════════════════════════════════════════════════════════════════════════════
//
//   do {
//       // body — runs at least once
//   } while (condition);
//
// The condition is checked AFTER the body, so the body always runs at least once.
//

// ──── 3.1 Password prompt scenario ─────────────────────────────────────────

// ✅ Simulate: keep asking for a password until correct
const correctPassword = "secret123";
let enteredPassword;
let passwordAttempts = 0;

// Simulated password entries (in real code, you'd use prompt() or readline)
const simulatedInputs = ["wrong", "nope", "secret123"];
let inputIndex = 0;

do {
    enteredPassword = simulatedInputs[inputIndex];  // simulate user input
    inputIndex++;
    passwordAttempts++;

    if (enteredPassword !== correctPassword) {
        console.log(`❌ Wrong password: "${enteredPassword}". Try again.`);
    }
} while (enteredPassword !== correctPassword);

console.log(`✅ Access granted after ${passwordAttempts} attempt(s)!`);
// Output:
// ❌ Wrong password: "wrong". Try again.
// ❌ Wrong password: "nope". Try again.
// ✅ Access granted after 3 attempt(s)!

// ──── 3.2 Menu system ───────────────────────────────────────────────────────

// ✅ do-while is perfect for menus — show options at least once
const menuChoices = [3, 1, 4];  // simulated user choices
let menuIndex = 0;

do {
    const choice = menuChoices[menuIndex];
    menuIndex++;

    switch (choice) {
        case 1: console.log("Option 1: View profile"); break;
        case 2: console.log("Option 2: Settings"); break;
        case 3: console.log("Option 3: Help"); break;
        case 4: console.log("Goodbye!"); break;
        default: console.log("Invalid choice");
    }

    if (choice === 4) break;
} while (menuIndex < menuChoices.length);


// ════════════════════════════════════════════════════════════════════════════════
// 4. WHEN TO USE WHICH LOOP — DECISION GUIDE
// ════════════════════════════════════════════════════════════════════════════════
//
// ┌─────────────────────────────────────────────────────────────────────────────┐
// │  Situation                              │  Best Loop                        │
// ├─────────────────────────────────────────┼───────────────────────────────────┤
// │  Known number of iterations             │  for                              │
// │  Iterating an array (index needed)      │  for                              │
// │  Iterating an array (value only)        │  for...of                         │
// │  Iterating object keys                  │  for...in                         │
// │  Unknown iterations, condition first    │  while                            │
// │  Must run at least once                 │  do-while                         │
// │  Need to transform/filter array         │  .map() / .filter() (see arrays)  │
// └─────────────────────────────────────────┴───────────────────────────────────┘
//


// ════════════════════════════════════════════════════════════════════════════════
// 5. LOOPING BACKWARDS
// ════════════════════════════════════════════════════════════════════════════════

const colors = ["red", "green", "blue", "yellow"];

// ✅ Loop backwards through an array
for (let i = colors.length - 1; i >= 0; i--) {
    console.log(`Color ${i}: ${colors[i]}`);
}
// Output:
// Color 3: yellow
// Color 2: blue
// Color 1: green
// Color 0: red

// ✅ Useful when removing items while iterating (backwards avoids index shift)
const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

// Remove all even numbers — iterate backwards so splicing doesn't skip items
for (let i = numbers.length - 1; i >= 0; i--) {
    if (numbers[i] % 2 === 0) {
        numbers.splice(i, 1);
    }
}
console.log("Odds only:", numbers);  // [1, 3, 5, 7]


// ════════════════════════════════════════════════════════════════════════════════
// 6. break — EXIT LOOP ENTIRELY
// ════════════════════════════════════════════════════════════════════════════════
//
// break immediately terminates the innermost loop.
//

// ──── 6.1 Searching for an item ─────────────────────────────────────────────

const users = ["Alice", "Bob", "Charlie", "Diana", "Eve"];
let foundUser = null;

// ✅ Stop as soon as we find what we're looking for
for (let i = 0; i < users.length; i++) {
    console.log(`Checking user: ${users[i]}`);
    if (users[i] === "Charlie") {
        foundUser = users[i];
        console.log(`✅ Found ${foundUser} at index ${i}!`);
        break;  // no need to check remaining users
    }
}
// Output:
// Checking user: Alice
// Checking user: Bob
// Checking user: Charlie
// ✅ Found Charlie at index 2!

// ──── 6.2 Breaking out of a while loop ──────────────────────────────────────

// ✅ Controlled infinite loop with break
let sum = 0;
let num = 1;

while (true) {
    sum += num;
    if (sum > 50) {
        console.log(`Sum exceeded 50 at num=${num}, sum=${sum}`);
        break;
    }
    num++;
}


// ════════════════════════════════════════════════════════════════════════════════
// 7. continue — SKIP CURRENT ITERATION
// ════════════════════════════════════════════════════════════════════════════════
//
// continue skips the rest of the current iteration and jumps to the next one.
//

// ──── 7.1 Skip even numbers ─────────────────────────────────────────────────

// ✅ Print only odd numbers from 1 to 10
for (let i = 1; i <= 10; i++) {
    if (i % 2 === 0) {
        continue;   // skip even numbers
    }
    console.log("Odd:", i);
}
// Output: 1, 3, 5, 7, 9

// ──── 7.2 Skip invalid data ────────────────────────────────────────────────

const rawScores = [85, -1, 92, null, 78, undefined, 95, "N/A"];

// ✅ Only process valid numeric scores
for (let i = 0; i < rawScores.length; i++) {
    const score = rawScores[i];
    if (typeof score !== "number" || score < 0) {
        console.log(`Skipping invalid score at index ${i}: ${score}`);
        continue;
    }
    console.log(`Valid score: ${score}`);
}
// Output:
// Valid score: 85
// Skipping invalid score at index 1: -1
// Valid score: 92
// Skipping invalid score at index 3: null
// Valid score: 78
// Skipping invalid score at index 5: undefined
// Valid score: 95
// Skipping invalid score at index 7: N/A


// ════════════════════════════════════════════════════════════════════════════════
// 8. NESTED LOOPS
// ════════════════════════════════════════════════════════════════════════════════

// ──── 8.1 Multiplication table ──────────────────────────────────────────────

// ✅ Generate a 5×5 multiplication table
console.log("Multiplication Table (1–5):");
console.log("───────────────────────────");

for (let row = 1; row <= 5; row++) {
    let line = "";
    for (let col = 1; col <= 5; col++) {
        const product = (row * col).toString().padStart(4);
        line += product;
    }
    console.log(line);
}
// Output:
//    1   2   3   4   5
//    2   4   6   8  10
//    3   6   9  12  15
//    4   8  12  16  20
//    5  10  15  20  25

// ──── 8.2 Finding pairs that sum to a target ────────────────────────────────

const nums = [2, 7, 11, 15, 3];
const target = 9;

// ✅ Find all pairs that sum to target
console.log(`Pairs that sum to ${target}:`);
for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
        if (nums[i] + nums[j] === target) {
            console.log(`  ✅ ${nums[i]} + ${nums[j]} = ${target}`);
        }
    }
}
// Output:
//   ✅ 2 + 7 = 9

// ──── 8.3 Breaking out of nested loops with labels ──────────────────────────

// ✅ Labels let you break/continue an outer loop from an inner one
outerLoop: for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        if (i === 1 && j === 1) {
            console.log(`Breaking outer loop at i=${i}, j=${j}`);
            break outerLoop;    // breaks the OUTER loop, not just inner
        }
        console.log(`  i=${i}, j=${j}`);
    }
}
// Output:
//   i=0, j=0
//   i=0, j=1
//   i=0, j=2
//   i=1, j=0
// Breaking outer loop at i=1, j=1


// ════════════════════════════════════════════════════════════════════════════════
// 9. for...of — ITERATING ARRAYS (MODERN SYNTAX, ES6+)
// ════════════════════════════════════════════════════════════════════════════════
//
// for...of iterates over the VALUES of an iterable (arrays, strings, maps, sets).
// It does NOT give you the index (use for loop or .entries() if you need it).
//

// ──── 9.1 Iterating array values ────────────────────────────────────────────

const languages = ["JavaScript", "Python", "Rust", "Go"];

// ✅ Clean syntax when you only need values
for (const lang of languages) {
    console.log(`Language: ${lang}`);
}

// ──── 9.2 Getting index + value with .entries() ─────────────────────────────

// ✅ If you need the index too, use array destructuring with .entries()
for (const [index, lang] of languages.entries()) {
    console.log(`${index}: ${lang}`);
}
// Output:
// 0: JavaScript
// 1: Python
// 2: Rust
// 3: Go

// ──── 9.3 Iterating a string ────────────────────────────────────────────────

// ✅ Strings are iterable — for...of gives you each character
for (const char of "Hello") {
    console.log(char);  // H, e, l, l, o
}


// ════════════════════════════════════════════════════════════════════════════════
// 10. for...in — ITERATING OBJECT KEYS
// ════════════════════════════════════════════════════════════════════════════════
//
// for...in iterates over the ENUMERABLE PROPERTY NAMES (keys) of an object.
//
// ⚠️  for...in is designed for objects. Avoid using it on arrays (see quirks below).
//

// ──── 10.1 Iterating object properties ──────────────────────────────────────

const person = {
    name: "Alice",
    age: 30,
    city: "Paris",
    job: "Engineer"
};

// ✅ Loop through all keys of an object
for (const key in person) {
    console.log(`${key}: ${person[key]}`);
}
// Output:
// name: Alice
// age: 30
// city: Paris
// job: Engineer

// ──── 10.2 Filtering inherited properties ───────────────────────────────────

// ✅ Use hasOwnProperty to skip inherited keys (good practice)
for (const key in person) {
    if (person.hasOwnProperty(key)) {
        console.log(`Own property → ${key}: ${person[key]}`);
    }
}

// ──── 10.3 Why NOT to use for...in on arrays ────────────────────────────────

// ❌ for...in on arrays gives string indices and includes inherited properties
// const arr = ["a", "b", "c"];
// for (const i in arr) {
//     console.log(typeof i);   // "string" ← not a number!
//     console.log(i, arr[i]);  // "0" "a", "1" "b", "2" "c"
// }
// It works, but:
//   - Indices are strings, not numbers
//   - It may include non-index properties added to Array.prototype
//   - Order is NOT guaranteed in older engines
// ✅ Use for...of for arrays instead!


// ════════════════════════════════════════════════════════════════════════════════
// 11. ERRORS AND QUIRKS
// ════════════════════════════════════════════════════════════════════════════════

// ──── 11.1 Infinite loop — forgetting to increment ──────────────────────────

// ❌ DANGER: This will freeze your program / crash your browser tab!
// let x = 0;
// while (x < 10) {
//     console.log(x);
//     // Forgot x++; → x stays 0 forever → INFINITE LOOP!
// }

// ❌ DANGER: while(true) without a break condition
// while (true) {
//     console.log("I will run forever!");
//     // No break → INFINITE LOOP!
// }

// ✅ FIX: Always ensure the condition will eventually become false
// let x = 0;
// while (x < 10) {
//     console.log(x);
//     x++;           // ← this is what makes the loop terminate
// }

// ──── 11.2 Off-by-one errors: < vs <= ───────────────────────────────────────

const items = ["a", "b", "c"];  // length = 3, indices: 0, 1, 2

// ✅ Correct: < length gives indices 0, 1, 2
for (let i = 0; i < items.length; i++) {
    console.log(items[i]);  // "a", "b", "c"
}

// ❌ Bug: <= length goes one past the end!
// for (let i = 0; i <= items.length; i++) {
//     console.log(items[i]);  // "a", "b", "c", undefined ← oops!
// }
// items[3] doesn't exist, so you get undefined.
// This can cause subtle bugs in calculations or function calls.

// ──── 11.3 Classic interview trap: var + setTimeout in a for loop ───────────

// ❌ With var, all callbacks share the SAME variable i
// for (var i = 0; i < 3; i++) {
//     setTimeout(() => {
//         console.log(i);
//     }, 100);
// }
// Expected: 0, 1, 2
// Actual:   3, 3, 3
//
// WHY? var is function-scoped, not block-scoped.
// By the time setTimeout callbacks run (after 100ms), the loop has finished
// and i is already 3. All three callbacks reference the SAME variable i.

// ✅ FIX: Use let — each iteration gets its OWN copy of i
for (let i = 0; i < 3; i++) {
    setTimeout(() => {
        console.log("let fix:", i);
    }, 100);
}
// Output (after 100ms): 0, 1, 2
// let is block-scoped, so each iteration creates a NEW binding for i.

// ✅ Alternative fix with IIFE (pre-ES6 technique):
// for (var i = 0; i < 3; i++) {
//     (function(capturedI) {
//         setTimeout(() => {
//             console.log("IIFE fix:", capturedI);
//         }, 100);
//     })(i);  // pass i by value into the IIFE
// }

// ──── 11.4 Modifying an array while iterating (DANGEROUS!) ──────────────────

// ❌ Adding elements during iteration → infinite loop risk!
// const data = [1, 2, 3];
// for (let i = 0; i < data.length; i++) {
//     data.push(data[i] * 2);  // keeps adding items → length grows → never ends!
// }

// ❌ Removing elements during forward iteration → skips items!
// const vals = [1, 2, 3, 4, 5];
// for (let i = 0; i < vals.length; i++) {
//     if (vals[i] % 2 === 0) {
//         vals.splice(i, 1);
//         // After removing index 1 (value 2), value 3 shifts to index 1
//         // But i increments to 2, so 3 is SKIPPED!
//     }
// }
// console.log(vals);  // [1, 3, 5]  ← looks correct by coincidence!
// But if data were [2, 4, 6], result would be [4] ← WRONG

// ✅ FIX 1: Loop backwards when removing (shown in section 5 above)
// ✅ FIX 2: Use filter() to create a new array instead
const safeResult = [1, 2, 3, 4, 5].filter(n => n % 2 !== 0);
console.log("Filtered odds:", safeResult);  // [1, 3, 5]

// ──── 11.5 for...of on non-iterables ────────────────────────────────────────

// ❌ Objects are NOT iterable — for...of throws a TypeError
// const obj = { a: 1, b: 2 };
// for (const val of obj) {  // TypeError: obj is not iterable
//     console.log(val);
// }

// ✅ FIX: Use Object.keys(), Object.values(), or Object.entries()
const obj = { a: 1, b: 2, c: 3 };
for (const [key, val] of Object.entries(obj)) {
    console.log(`${key} = ${val}`);
}
// Output: a = 1, b = 2, c = 3

// ──── 11.6 Empty loop body (accidental semicolon) ───────────────────────────

// ❌ Semicolon after for() makes the loop body EMPTY
// for (let i = 0; i < 5; i++); {
//     console.log(i);  // This block runs only ONCE, after the loop
// }                     // And i is not in scope if using let → ReferenceError

// ✅ Never put a semicolon between for() and {
for (let i = 0; i < 5; i++) {
    console.log("Correct:", i);
}


// ════════════════════════════════════════════════════════════════════════════════
// 12. PRACTICAL EXAMPLES
// ════════════════════════════════════════════════════════════════════════════════

// ──── 12.1 FizzBuzz (classic interview question) ────────────────────────────

console.log("\n--- FizzBuzz ---");
for (let i = 1; i <= 20; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
        console.log(i, "FizzBuzz");
    } else if (i % 3 === 0) {
        console.log(i, "Fizz");
    } else if (i % 5 === 0) {
        console.log(i, "Buzz");
    } else {
        console.log(i);
    }
}

// ──── 12.2 Sum of array elements ────────────────────────────────────────────

const scores = [88, 92, 75, 100, 67];
let totalScore = 0;

for (const score of scores) {
    totalScore += score;
}

const average = totalScore / scores.length;
console.log(`Total: ${totalScore}, Average: ${average}`);
// Total: 422, Average: 84.4

// ──── 12.3 Finding min and max ──────────────────────────────────────────────

const temps = [72, 68, 85, 90, 55, 77];
let min = temps[0];
let max = temps[0];

for (const temp of temps) {
    if (temp < min) min = temp;
    if (temp > max) max = temp;
}
console.log(`Min temp: ${min}, Max temp: ${max}`);
// Min temp: 55, Max temp: 90

// ──── 12.4 Building a string with a loop ────────────────────────────────────

// ✅ Create a simple progress bar
function progressBar(percent) {
    const filled = Math.round(percent / 5);    // 20 chars total
    const empty = 20 - filled;
    let bar = "[";
    for (let i = 0; i < filled; i++) bar += "█";
    for (let i = 0; i < empty; i++) bar += "░";
    bar += `] ${percent}%`;
    return bar;
}

console.log(progressBar(0));    // [░░░░░░░░░░░░░░░░░░░░] 0%
console.log(progressBar(45));   // [█████████░░░░░░░░░░░] 45%
console.log(progressBar(100));  // [████████████████████] 100%


// ════════════════════════════════════════════════════════════════════════════════
// SUMMARY CHEAT SHEET
// ════════════════════════════════════════════════════════════════════════════════
//
// for (let i = 0; i < n; i++)      → known count, need index
// while (condition)                 → unknown count, check before
// do { } while (condition)          → unknown count, run at least once
// for (const item of array)         → iterate values (arrays, strings, maps)
// for (const key in object)         → iterate keys (objects only!)
// break                             → exit loop immediately
// continue                          → skip to next iteration
//
// GOLDEN RULES:
// ✅ Use let (not var) in for loops
// ✅ Use for...of for arrays, for...in for objects
// ✅ Always ensure while loops have a way to terminate
// ✅ Loop backwards when removing items from arrays
// ❌ Don't modify arrays while iterating forward
// ❌ Don't use for...in on arrays
// ❌ Don't forget the increment in while loops
//
