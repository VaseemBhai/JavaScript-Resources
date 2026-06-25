// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                        07 — ARRAYS IN JAVASCRIPT                           ║
// ║   Creating, Mutating, Iterating, Map/Filter/Reduce, Spread, Destructuring  ║
// ╚══════════════════════════════════════════════════════════════════════════════╝


// ════════════════════════════════════════════════════════════════════════════════
// 1. CREATING ARRAYS
// ════════════════════════════════════════════════════════════════════════════════

// ──── 1.1 Array literal (most common) ───────────────────────────────────────

// ✅ Create arrays with square brackets
const fruits = ["apple", "banana", "cherry"];
const numbers = [10, 20, 30, 40, 50];
const mixed = ["hello", 42, true, null, { key: "value" }, [1, 2]];
const empty = [];

// ──── 1.2 Array constructor ─────────────────────────────────────────────────

// ✅ new Array() with elements
const colors = new Array("red", "green", "blue");
console.log(colors);  // ["red", "green", "blue"]

// ⚠️ new Array() with a single NUMBER creates empty slots, NOT an array with that number
const fiveSlots = new Array(5);
console.log(fiveSlots);         // [empty × 5]  ← 5 empty slots, NOT [5]
console.log(fiveSlots.length);  // 5

// ❌ new Array(-1) throws a RangeError
// const bad = new Array(-1);  // RangeError: Invalid array length

// ──── 1.3 Array.from() — create from array-like or iterable ─────────────────

// ✅ Create from a string (iterable)
const chars = Array.from("Hello");
console.log(chars);  // ["H", "e", "l", "l", "o"]

// ✅ Create from a Set
const unique = Array.from(new Set([1, 2, 2, 3, 3, 3]));
console.log(unique);  // [1, 2, 3]

// ✅ With a mapping function (second argument)
const squares = Array.from({ length: 5 }, (_, i) => (i + 1) ** 2);
console.log(squares);  // [1, 4, 9, 16, 25]

// ✅ Generate a range of numbers
const range = Array.from({ length: 10 }, (_, i) => i);
console.log(range);  // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

// ──── 1.4 Array.of() — create from arguments ───────────────────────────────

// ✅ Array.of() always creates an array with the given arguments as elements
const single = Array.of(5);
console.log(single);  // [5]  ← contrast with new Array(5) which gives empty slots!

const multi = Array.of(1, 2, 3);
console.log(multi);  // [1, 2, 3]


// ════════════════════════════════════════════════════════════════════════════════
// 2. INDEXING — ZERO-BASED ACCESS
// ════════════════════════════════════════════════════════════════════════════════

const animals = ["cat", "dog", "bird", "fish", "turtle"];

// ✅ Access with [index] — zero-based
console.log(animals[0]);   // "cat"     ← first element
console.log(animals[2]);   // "bird"    ← third element
console.log(animals[4]);   // "turtle"  ← last element

// ✅ Access last element dynamically
console.log(animals[animals.length - 1]);  // "turtle"

// ✅ .at() method (ES2022) — supports negative indices!
console.log(animals.at(0));    // "cat"
console.log(animals.at(-1));   // "turtle"  ← last element
console.log(animals.at(-2));   // "fish"    ← second to last

// ✅ Out-of-bounds access returns undefined (no error)
console.log(animals[100]);  // undefined
console.log(animals[-1]);   // undefined (use .at(-1) instead)

// ✅ .length — number of elements
console.log(animals.length);  // 5

// ✅ Modify an element by index
animals[1] = "wolf";
console.log(animals);  // ["cat", "wolf", "bird", "fish", "turtle"]


// ════════════════════════════════════════════════════════════════════════════════
// 3. MUTATION METHODS — MODIFY THE ORIGINAL ARRAY
// ════════════════════════════════════════════════════════════════════════════════

// ──── 3.1 push / pop — add/remove at the END ───────────────────────────────

const stack = [1, 2, 3];

// ✅ push() — adds to the end, returns new length
const newLength = stack.push(4, 5);
console.log(stack);       // [1, 2, 3, 4, 5]
console.log(newLength);   // 5

// ✅ pop() — removes from the end, returns removed element
const removed = stack.pop();
console.log(removed);  // 5
console.log(stack);    // [1, 2, 3, 4]

// ──── 3.2 shift / unshift — add/remove at the BEGINNING ────────────────────

const queue = [1, 2, 3];

// ✅ unshift() — adds to the beginning, returns new length
queue.unshift(0);
console.log(queue);  // [0, 1, 2, 3]

// ✅ shift() — removes from the beginning, returns removed element
const first = queue.shift();
console.log(first);  // 0
console.log(queue);  // [1, 2, 3]

// ⚠️ Performance note: shift/unshift are slower than push/pop on large arrays
// because every element must be re-indexed.

// ──── 3.3 splice() — add, remove, or replace ANYWHERE ──────────────────────
//
// Syntax: array.splice(startIndex, deleteCount, ...itemsToInsert)
//   - startIndex:  where to begin changes
//   - deleteCount: how many elements to remove (0 = none)
//   - items:       elements to insert at startIndex
//   - Returns:     array of removed elements
//

const months = ["Jan", "Feb", "Apr", "May"];

// ✅ INSERT: Add "Mar" at index 2, remove 0 elements
months.splice(2, 0, "Mar");
console.log(months);  // ["Jan", "Feb", "Mar", "Apr", "May"]

// ✅ REMOVE: Remove 1 element at index 3
const removedMonth = months.splice(3, 1);
console.log(removedMonth);  // ["Apr"]
console.log(months);        // ["Jan", "Feb", "Mar", "May"]

// ✅ REPLACE: At index 3, remove 1 element and insert 2
months.splice(3, 1, "Jun", "Jul");
console.log(months);  // ["Jan", "Feb", "Mar", "Jun", "Jul"]

// ✅ Remove multiple elements
const removed2 = months.splice(1, 2);
console.log(removed2);  // ["Feb", "Mar"]
console.log(months);    // ["Jan", "Jun", "Jul"]


// ════════════════════════════════════════════════════════════════════════════════
// 4. STACK AND QUEUE PATTERNS
// ════════════════════════════════════════════════════════════════════════════════

// ──── 4.1 Stack (LIFO — Last In, First Out) ─────────────────────────────────
//
// Use push() to add and pop() to remove.
// Think of a stack of plates — you add and remove from the top.
//

const browserHistory = [];

browserHistory.push("google.com");      // navigate to google
browserHistory.push("github.com");      // navigate to github
browserHistory.push("stackoverflow.com"); // navigate to stackoverflow

console.log("Current page:", browserHistory[browserHistory.length - 1]);
// "stackoverflow.com"

browserHistory.pop();  // press "back" → removes stackoverflow
console.log("Current page:", browserHistory[browserHistory.length - 1]);
// "github.com"

// ──── 4.2 Queue (FIFO — First In, First Out) ───────────────────────────────
//
// Use push() to add (enqueue) and shift() to remove (dequeue).
// Think of a line at a store — first person in line is served first.
//

const printQueue = [];

printQueue.push("Document A");  // add to end of queue
printQueue.push("Document B");
printQueue.push("Document C");

console.log("Printing:", printQueue.shift());  // "Document A" — first in, first out
console.log("Printing:", printQueue.shift());  // "Document B"
console.log("Remaining:", printQueue);         // ["Document C"]


// ════════════════════════════════════════════════════════════════════════════════
// 5. THE BIG THREE — NON-MUTATING ARRAY METHODS
// ════════════════════════════════════════════════════════════════════════════════
//
// map(), filter(), and reduce() are the most important array methods.
// They do NOT modify the original array — they return new values.
//

// ──── 5.1 map() — transform every element ──────────────────────────────────
//
// Creates a NEW array by applying a function to every element.
// Original array is unchanged.
//

// ✅ Convert Celsius to Fahrenheit
const celsius = [0, 20, 30, 100];
const fahrenheit = celsius.map(c => c * 9/5 + 32);
console.log(fahrenheit);  // [32, 68, 86, 212]
console.log(celsius);     // [0, 20, 30, 100]  ← unchanged!

// ✅ Extract property from objects
const users = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35 }
];
const names = users.map(user => user.name);
console.log(names);  // ["Alice", "Bob", "Charlie"]

// ✅ map() callback receives (element, index, array)
const indexed = ["a", "b", "c"].map((item, index) => `${index}: ${item}`);
console.log(indexed);  // ["0: a", "1: b", "2: c"]

// ──── 5.2 filter() — keep elements passing a test ──────────────────────────
//
// Creates a NEW array with only elements where the callback returns true.
//

// ✅ Keep scores >= 80
const scores = [45, 92, 73, 88, 60, 95, 81];
const passing = scores.filter(score => score >= 80);
console.log(passing);  // [92, 88, 95, 81]
console.log(scores);   // unchanged

// ✅ Filter objects
const activeUsers = users.filter(user => user.age >= 30);
console.log(activeUsers);
// [{ name: "Alice", age: 30 }, { name: "Charlie", age: 35 }]

// ✅ Remove falsy values (null, undefined, 0, "", false, NaN)
const messy = [0, "hello", "", null, 42, undefined, false, "world"];
const clean = messy.filter(Boolean);
console.log(clean);  // ["hello", 42, "world"]

// ──── 5.3 reduce() — accumulate to a single value ──────────────────────────
//
// Syntax: array.reduce((accumulator, currentElement) => { ... }, initialValue)
//
// Processes each element, carrying forward an "accumulator" value.
// The most versatile array method — can implement map, filter, and more.
//

// ✅ Sum all numbers
const nums = [10, 20, 30, 40];
const total = nums.reduce((acc, curr) => acc + curr, 0);
//                                                    ^
//                                         initial value of accumulator
console.log(total);  // 100

// Step by step:
// acc=0,  curr=10 → return 10
// acc=10, curr=20 → return 30
// acc=30, curr=30 → return 60
// acc=60, curr=40 → return 100

// ✅ Find the maximum value
const maxScore = scores.reduce((max, score) => score > max ? score : max, scores[0]);
console.log(maxScore);  // 95

// ✅ Count occurrences of each word
const words = ["apple", "banana", "apple", "cherry", "banana", "apple"];
const wordCount = words.reduce((counts, word) => {
    counts[word] = (counts[word] || 0) + 1;
    return counts;
}, {});
console.log(wordCount);  // { apple: 3, banana: 2, cherry: 1 }

// ✅ Flatten an array of arrays
const nested = [[1, 2], [3, 4], [5, 6]];
const flat = nested.reduce((acc, arr) => [...acc, ...arr], []);
console.log(flat);  // [1, 2, 3, 4, 5, 6]

// ✅ Chaining map + filter + reduce (the power trio!)
const transactions = [
    { type: "sale", amount: 100 },
    { type: "refund", amount: 30 },
    { type: "sale", amount: 200 },
    { type: "sale", amount: 50 },
    { type: "refund", amount: 20 }
];

const totalSales = transactions
    .filter(t => t.type === "sale")       // keep only sales
    .map(t => t.amount)                   // extract amounts
    .reduce((sum, amt) => sum + amt, 0);  // sum them up

console.log("Total sales:", totalSales);  // 350


// ════════════════════════════════════════════════════════════════════════════════
// 6. OTHER USEFUL METHODS
// ════════════════════════════════════════════════════════════════════════════════

// ──── 6.1 find() — first element matching a condition ───────────────────────

// ✅ Returns the first match, or undefined if none found
const people = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35 }
];

const found = people.find(p => p.age > 28);
console.log(found);  // { name: "Alice", age: 30 }  ← first match only

const notFound = people.find(p => p.age > 100);
console.log(notFound);  // undefined

// ──── 6.2 findIndex() — index of first matching element ─────────────────────

// ✅ Returns the index, or -1 if not found
const idx = people.findIndex(p => p.name === "Bob");
console.log(idx);  // 1

const noIdx = people.findIndex(p => p.name === "Zoe");
console.log(noIdx);  // -1

// ──── 6.3 some() — does at least ONE element pass the test? ─────────────────

// ✅ Returns true if ANY callback returns true (short-circuits)
const hasAdult = people.some(p => p.age >= 18);
console.log(hasAdult);  // true

const hasBaby = people.some(p => p.age < 1);
console.log(hasBaby);  // false

// ──── 6.4 every() — do ALL elements pass the test? ─────────────────────────

// ✅ Returns true only if ALL callbacks return true
const allAdults = people.every(p => p.age >= 18);
console.log(allAdults);  // true

const allSeniors = people.every(p => p.age >= 60);
console.log(allSeniors);  // false

// ──── 6.5 flat() — flatten nested arrays ────────────────────────────────────

const deepNested = [1, [2, 3], [4, [5, 6]], [[7]]];

console.log(deepNested.flat());      // [1, 2, 3, 4, [5, 6], [7]]  ← one level deep
console.log(deepNested.flat(2));     // [1, 2, 3, 4, 5, 6, 7]       ← two levels deep
console.log(deepNested.flat(Infinity));  // [1, 2, 3, 4, 5, 6, 7]   ← all levels

// ──── 6.6 includes() — check if a value exists ─────────────────────────────

const pets = ["cat", "dog", "fish"];

console.log(pets.includes("dog"));    // true
console.log(pets.includes("snake"));  // false

// ✅ Better than indexOf for readability and handles NaN correctly
console.log([1, 2, NaN].includes(NaN));    // true
console.log([1, 2, NaN].indexOf(NaN));     // -1  ← indexOf can't find NaN!


// ════════════════════════════════════════════════════════════════════════════════
// 7. forEach vs map
// ════════════════════════════════════════════════════════════════════════════════
//
// Both iterate over every element, but they serve different purposes.
//

const prices = [10, 20, 30];

// ✅ map() returns a NEW array of transformed values
const doubled = prices.map(p => p * 2);
console.log(doubled);  // [20, 40, 60]

// ✅ forEach() returns undefined — used for side effects (logging, DOM updates)
const forEachResult = prices.forEach(p => console.log("Price:", p));
console.log(forEachResult);  // undefined

// ❌ Common mistake: trying to use forEach like map
// const wrong = prices.forEach(p => p * 2);
// console.log(wrong);  // undefined  ← forEach doesn't return anything!

// Summary:
// map()     → "I want to transform data and get a new array"
// forEach() → "I want to DO something with each element (side effects)"


// ════════════════════════════════════════════════════════════════════════════════
// 8. SPREAD OPERATOR WITH ARRAYS
// ════════════════════════════════════════════════════════════════════════════════
//
// The spread operator (...) expands an array into individual elements.
//

// ──── 8.1 Copying an array ──────────────────────────────────────────────────

const original = [1, 2, 3];

// ✅ Create a shallow copy
const copy = [...original];
console.log(copy);               // [1, 2, 3]
console.log(copy === original);  // false ← different reference

copy.push(4);
console.log(original);  // [1, 2, 3]  ← unaffected
console.log(copy);      // [1, 2, 3, 4]

// ──── 8.2 Merging arrays ───────────────────────────────────────────────────

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// ✅ Merge into a new array
const merged = [...arr1, ...arr2];
console.log(merged);  // [1, 2, 3, 4, 5, 6]

// ✅ Merge with extra elements
const withExtras = [0, ...arr1, 3.5, ...arr2, 7];
console.log(withExtras);  // [0, 1, 2, 3, 3.5, 4, 5, 6, 7]

// ──── 8.3 Spread with function arguments ────────────────────────────────────

const coordinates = [10, 20, 30];

// ✅ Spread as function arguments
function sum3(a, b, c) {
    return a + b + c;
}
console.log(sum3(...coordinates));  // 60

// ✅ Finding min/max with Math
const temps = [72, 68, 85, 90, 55];
console.log(Math.max(...temps));  // 90
console.log(Math.min(...temps));  // 55


// ════════════════════════════════════════════════════════════════════════════════
// 9. ARRAY DESTRUCTURING
// ════════════════════════════════════════════════════════════════════════════════

// ──── 9.1 Basic destructuring ───────────────────────────────────────────────

const rgb = [255, 128, 0];

// ✅ Extract elements into named variables
const [red, green, blue2] = rgb;
console.log(red);    // 255
console.log(green);  // 128
console.log(blue2);  // 0

// ──── 9.2 Skipping elements ─────────────────────────────────────────────────

const data = ["Alice", "alice@email.com", 30, "Engineer"];

// ✅ Skip elements with commas
const [userName, , , userJob] = data;
console.log(userName);  // "Alice"
console.log(userJob);   // "Engineer"

// ──── 9.3 Rest pattern ─────────────────────────────────────────────────────

const scores2 = [95, 88, 76, 92, 85];

// ✅ Get first two, collect the rest
const [highest, secondHighest, ...remaining] = scores2;
console.log(highest);        // 95
console.log(secondHighest);  // 88
console.log(remaining);      // [76, 92, 85]

// ──── 9.4 Default values ───────────────────────────────────────────────────

// ✅ Defaults if the array doesn't have enough elements
const [a = 0, b = 0, c = 0] = [10, 20];
console.log(a, b, c);  // 10 20 0

// ──── 9.5 Swapping variables ───────────────────────────────────────────────

let x = 1;
let y = 2;

// ✅ Swap without a temp variable
[x, y] = [y, x];
console.log(x, y);  // 2 1


// ════════════════════════════════════════════════════════════════════════════════
// 10. QUIRKS AND ERRORS
// ════════════════════════════════════════════════════════════════════════════════

// ──── 10.1 typeof [] is 'object' — use Array.isArray() ─────────────────────

console.log(typeof []);         // "object"  ← NOT "array"!
console.log(typeof {});         // "object"  ← same!
console.log(typeof null);       // "object"  ← also same! (JS quirk)

// ✅ Use Array.isArray() to check if something is an array
console.log(Array.isArray([]));            // true
console.log(Array.isArray({}));            // false
console.log(Array.isArray("hello"));       // false
console.log(Array.isArray(new Array()));   // true

// ──── 10.2 const arrays CAN be mutated ──────────────────────────────────────

// ✅ const prevents reassignment of the variable, NOT mutation of the value
const myArr = [1, 2, 3];

myArr.push(4);          // ✅ This works! Mutation is allowed.
myArr[0] = 99;          // ✅ This works too!
console.log(myArr);     // [99, 2, 3, 4]

// ❌ But you CANNOT reassign the variable itself
// myArr = [5, 6, 7];   // TypeError: Assignment to constant variable

// ✅ If you need a truly immutable array, use Object.freeze()
const frozen = Object.freeze([1, 2, 3]);
// frozen.push(4);      // ❌ TypeError: Cannot add property 3
// frozen[0] = 99;      // Silently fails (or TypeError in strict mode)
console.log(frozen);    // [1, 2, 3]

// ──── 10.3 Sparse arrays ───────────────────────────────────────────────────

// ❌ Assigning to a far-off index creates "empty slots" (holes)
const sparse = [];
sparse[100] = "x";
console.log(sparse.length);   // 101  ← has 101 entries, but 100 are empty!
console.log(sparse[50]);      // undefined (empty slot)

// ⚠️ Empty slots behave inconsistently across methods:
// forEach/map SKIP empty slots, but for loops access them as undefined
const holey = [1, , 3];       // hole at index 1
holey.forEach(v => console.log("forEach:", v));  // 1, 3 (skips hole)

for (let i = 0; i < holey.length; i++) {
    console.log("for:", holey[i]);  // 1, undefined, 3 (sees hole as undefined)
}

// ──── 10.4 .length is writable — can empty an array! ────────────────────────

const items = [1, 2, 3, 4, 5];

// ✅ Truncate array by setting length
items.length = 3;
console.log(items);  // [1, 2, 3]  ← elements 4 and 5 are gone!

// ✅ Empty array by setting length to 0
items.length = 0;
console.log(items);  // []

// ⚠️ Increasing length adds empty slots
items.length = 3;
console.log(items);  // [empty × 3]

// ──── 10.5 new Array(5) creates empty slots, NOT [5] ───────────────────────

const fiveElements = new Array(5);
console.log(fiveElements);         // [empty × 5]
console.log(fiveElements.length);  // 5
console.log(fiveElements[0]);      // undefined

// ✅ Use Array.of(5) if you want [5]
const justFive = Array.of(5);
console.log(justFive);  // [5]

// ❌ new Array(-1) throws RangeError
// const negative = new Array(-1);  // RangeError: Invalid array length

// ──── 10.6 Calling .map() on null/undefined throws TypeError ────────────────

// ❌ Cannot call array methods on null or undefined
// const data = null;
// data.map(x => x);  // TypeError: Cannot read properties of null (reading 'map')

// const data2 = undefined;
// data2.filter(x => x);  // TypeError: Cannot read properties of undefined

// ✅ FIX: Use optional chaining or provide a fallback
const maybeData = null;
const safeResult = maybeData?.map(x => x) ?? [];
console.log(safeResult);  // []

// ✅ Or use a default value
const safeResult2 = (maybeData || []).map(x => x * 2);
console.log(safeResult2);  // []

// ──── 10.7 sort() without comparator sorts as STRINGS ───────────────────────

// ❌ Default sort converts elements to strings, then sorts alphabetically
const unsorted = [10, 2, 1, 20, 3];
const badSort = [...unsorted].sort();      // spread to avoid mutating
console.log(badSort);  // [1, 10, 2, 20, 3]  ← WRONG! "10" < "2" alphabetically

// ✅ FIX: Pass a comparator function
const goodSort = [...unsorted].sort((a, b) => a - b);
console.log(goodSort);  // [1, 2, 3, 10, 20]  ← correct ascending order

// ✅ Descending order
const descSort = [...unsorted].sort((a, b) => b - a);
console.log(descSort);  // [20, 10, 3, 2, 1]

// ✅ Sort objects by a property
const students = [
    { name: "Charlie", gpa: 3.2 },
    { name: "Alice", gpa: 3.9 },
    { name: "Bob", gpa: 3.5 }
];
const byGpa = [...students].sort((a, b) => b.gpa - a.gpa);
console.log(byGpa.map(s => `${s.name}: ${s.gpa}`));
// ["Alice: 3.9", "Bob: 3.5", "Charlie: 3.2"]

// ──── 10.8 sort() MUTATES the original array! ───────────────────────────────

const original2 = [3, 1, 2];
original2.sort((a, b) => a - b);
console.log(original2);  // [1, 2, 3]  ← original IS modified!

// ✅ FIX: Use spread to sort a copy, or use .toSorted() (ES2023)
const original3 = [3, 1, 2];
const sorted = [...original3].sort((a, b) => a - b);
console.log(original3);  // [3, 1, 2]  ← preserved
console.log(sorted);     // [1, 2, 3]  ← new sorted array

// ✅ .toSorted() — non-mutating sort (ES2023)
// const sorted2 = original3.toSorted((a, b) => a - b);

// ──── 10.9 Shallow copy vs deep copy ────────────────────────────────────────

// ✅ Spread creates a SHALLOW copy — nested objects/arrays are still shared
const originalNested = [
    { name: "Alice", scores: [90, 85] },
    { name: "Bob", scores: [80, 75] }
];

const shallowCopy = [...originalNested];

// Modifying a nested object affects BOTH arrays (shared reference)
shallowCopy[0].scores.push(95);
console.log(originalNested[0].scores);  // [90, 85, 95]  ← ALSO modified!

// ✅ FIX: Deep copy with structuredClone() (modern) or JSON trick
const deepCopy = structuredClone(originalNested);
deepCopy[1].scores.push(100);
console.log(originalNested[1].scores);  // [80, 75, 95] ← NOT modified
console.log(deepCopy[1].scores);        // [80, 75, 95, 100]

// ✅ JSON trick (older approach — doesn't work with functions, Dates, undefined, etc.)
// const deepCopy2 = JSON.parse(JSON.stringify(originalNested));

// ──── 10.10 Comparing arrays ───────────────────────────────────────────────

// ❌ === compares references, NOT contents
console.log([1, 2, 3] === [1, 2, 3]);   // false ← different objects!
console.log([1, 2, 3] == [1, 2, 3]);    // false ← still different objects!

// ✅ FIX: Compare element-by-element
function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    return a.every((val, i) => val === b[i]);
}
console.log(arraysEqual([1, 2, 3], [1, 2, 3]));  // true
console.log(arraysEqual([1, 2], [1, 2, 3]));      // false

// ✅ For simple cases, JSON stringify works:
console.log(JSON.stringify([1, 2, 3]) === JSON.stringify([1, 2, 3]));  // true


// ════════════════════════════════════════════════════════════════════════════════
// 11. PRACTICAL EXAMPLES
// ════════════════════════════════════════════════════════════════════════════════

// ──── 11.1 Remove duplicates ────────────────────────────────────────────────

const withDupes = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4];
const uniqueVals = [...new Set(withDupes)];
console.log(uniqueVals);  // [1, 2, 3, 4]

// ──── 11.2 Group items by category ──────────────────────────────────────────

const products = [
    { name: "Laptop", category: "Electronics" },
    { name: "Shirt", category: "Clothing" },
    { name: "Phone", category: "Electronics" },
    { name: "Pants", category: "Clothing" },
    { name: "Tablet", category: "Electronics" }
];

const grouped = products.reduce((groups, product) => {
    const category = product.category;
    if (!groups[category]) {
        groups[category] = [];
    }
    groups[category].push(product.name);
    return groups;
}, {});

console.log(grouped);
// {
//   Electronics: ["Laptop", "Phone", "Tablet"],
//   Clothing: ["Shirt", "Pants"]
// }

// ──── 11.3 Chunk an array into smaller arrays ──────────────────────────────

function chunk(arr, size) {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
    }
    return chunks;
}

console.log(chunk([1, 2, 3, 4, 5, 6, 7], 3));
// [[1, 2, 3], [4, 5, 6], [7]]

// ──── 11.4 Pipeline: clean, transform, aggregate ────────────────────────────

const rawInput = ["  Alice  ", "bob", "  CHARLIE", "", "  diana  ", null, "Eve"];

const processed = rawInput
    .filter(name => name != null && name.trim() !== "")  // remove nulls and empty
    .map(name => name.trim())                             // remove whitespace
    .map(name => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase())  // capitalize
    .sort();                                              // sort alphabetically

console.log(processed);  // ["Alice", "Bob", "Charlie", "Diana", "Eve"]


// ════════════════════════════════════════════════════════════════════════════════
// SUMMARY CHEAT SHEET
// ════════════════════════════════════════════════════════════════════════════════
//
// CREATING:
//   [1, 2, 3]                 → literal (preferred)
//   Array.from(iterable)      → from iterable/array-like
//   Array.of(1, 2, 3)         → from arguments (safe with single number)
//
// MUTATING (modifies original):
//   push/pop                  → add/remove from END
//   shift/unshift             → add/remove from BEGINNING
//   splice(i, count, ...new)  → add/remove/replace ANYWHERE
//   sort(), reverse()         → re-order in place
//
// NON-MUTATING (returns new):
//   map(fn)                   → transform each element
//   filter(fn)                → keep elements passing test
//   reduce(fn, init)          → accumulate to single value
//   slice(start, end)         → extract a portion
//   concat(arr)               → merge arrays
//   flat(depth)               → flatten nested arrays
//
// SEARCHING:
//   find(fn)                  → first matching element
//   findIndex(fn)             → index of first match
//   includes(val)             → boolean: does it contain val?
//   some(fn)                  → boolean: does ANY pass?
//   every(fn)                 → boolean: do ALL pass?
//
// SPREAD & DESTRUCTURING:
//   [...arr]                  → shallow copy
//   [...a, ...b]              → merge arrays
//   const [x, y, ...rest] = arr → destructure
//
// GOLDEN RULES:
//   ✅ Use Array.isArray() to check arrays (not typeof)
//   ✅ Always pass a comparator to sort() for numbers
//   ✅ Use spread [...arr] to avoid mutating original
//   ✅ Use structuredClone() for deep copies
//   ❌ Don't use new Array(n) when you mean Array.of(n)
//   ❌ Don't assume spread creates deep copies
//   ❌ Don't compare arrays with === (compares references)
//
