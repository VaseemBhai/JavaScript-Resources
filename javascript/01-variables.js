
// ────────────────────────────────────────────────────────────
//  1. const — CANNOT be reassigned
// ────────────────────────────────────────────────────────────

const num1 = 10;
// num1 = 20;  // ❌ TypeError: Assignment to constant variable.

// BUT: const objects and arrays CAN be mutated!
const user = { name: "Alice" };
user.name = "Bob";           // ✅ This works — we're changing the CONTENTS, not the variable
console.log(user.name);      // "Bob"

// user = { name: "Carol" };  // ❌ TypeError — cannot reassign the variable itself

const colors = ["red", "green"];
colors.push("blue");         // ✅ Works — mutating the array contents
console.log(colors);          // ["red", "green", "blue"]

// colors = ["yellow"];       // ❌ TypeError — cannot reassign


// ────────────────────────────────────────────────────────────
//  2. let — CAN be reassigned, block-scoped
// ────────────────────────────────────────────────────────────

let num2 = 10;
num2 = 20;                    // ✅ No error — let allows reassignment
console.log(num2);            // 20

// let is BLOCK-SCOPED — only exists inside { }
{
  let blockVar = "I exist only here";
  console.log(blockVar);      // ✅ "I exist only here"
}
// console.log(blockVar);     // ❌ ReferenceError: blockVar is not defined


// ────────────────────────────────────────────────────────────
//  3. var — AVOID! Function-scoped, NOT block-scoped
// ────────────────────────────────────────────────────────────

// var ignores block boundaries — it leaks out!
{
  var leaked = "I escaped the block!";
}
console.log(leaked);           // ✅ "I escaped the block!" — BAD! var ignores { }

// var is function-scoped (only contained by functions)
function testVar() {
  var insideFunc = "I'm trapped in the function";
  console.log(insideFunc);     // ✅ works
}
// console.log(insideFunc);    // ❌ ReferenceError — var IS contained by functions

// var allows redeclaration (let and const do NOT)
var x = 10;
var x = 20;                    // ✅ No error — silent overwrite (dangerous!)
console.log(x);                // 20

// let y = 10;
// let y = 20;                 // ❌ SyntaxError: Identifier 'y' has already been declared


// ────────────────────────────────────────────────────────────
//  4. HOISTING — var vs let/const
// ────────────────────────────────────────────────────────────

// var is HOISTED with value 'undefined'
console.log(num3);             // undefined  (NOT an error — hoisted but no value yet)
var num3 = 10;
console.log(num3);             // 10

// What JavaScript actually does behind the scenes:
// var num3;              <-- declaration is hoisted to the top
// console.log(num3);     <-- undefined
// num3 = 10;             <-- assignment stays in place

// let and const are in the TEMPORAL DEAD ZONE (TDZ)
// console.log(num4);     // ❌ ReferenceError: Cannot access 'num4' before initialization
// const num4 = 10;

// console.log(num5);     // ❌ ReferenceError: Cannot access 'num5' before initialization
// let num5 = 10;

// The TDZ exists from the start of the block until the declaration line.
// The variable EXISTS (it's hoisted) but you CANNOT ACCESS it until declared.


// ────────────────────────────────────────────────────────────
//  5. SCOPE COMPARISON — var vs let in loops
// ────────────────────────────────────────────────────────────

// Classic interview question: var in a for loop
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var i:", i), 100);
}
// Output: "var i: 3", "var i: 3", "var i: 3"
// WHY? var is function-scoped — there's only ONE 'i', and it's 3 after the loop ends.

// Fix: use let (block-scoped — each iteration gets its OWN 'i')
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let j:", j), 200);
}
// Output: "let j: 0", "let j: 1", "let j: 2"


// ────────────────────────────────────────────────────────────
//  6. MUST INITIALIZE const
// ────────────────────────────────────────────────────────────

// const MUST be initialized at declaration
// const uninit;           // ❌ SyntaxError: Missing initializer in const declaration

// let can be declared without initialization
let uninitLet;
console.log(uninitLet);     // undefined (declared but no value assigned)


// ────────────────────────────────────────────────────────────
//  7. BEST PRACTICES
// ────────────────────────────────────────────────────────────

// ✅ Use const by default (prevents accidental reassignment)
// ✅ Use let only when you KNOW the value will change (counters, accumulators)
// ❌ Never use var in modern JavaScript
