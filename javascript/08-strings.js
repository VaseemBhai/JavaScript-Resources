// ════════════════════════════════════════════════════════════════════════════════
// 08 — STRINGS IN JAVASCRIPT
// ════════════════════════════════════════════════════════════════════════════════
//
// Strings are PRIMITIVE, IMMUTABLE sequences of characters.
// Every method that "changes" a string actually returns a NEW string.
// The original string is never modified.
//
// ════════════════════════════════════════════════════════════════════════════════


// ════════════════════════════════════════════════════════════════════════════════
// 1. CREATING STRINGS
// ════════════════════════════════════════════════════════════════════════════════

// ──── 1a. Three ways to create string literals ────

// ✅ Single quotes — most common in JS conventions
const greeting = 'Hello, World!';

// ✅ Double quotes — functionally identical to single quotes
const message = "Hello, World!";

// ✅ Backticks (template literals) — allow interpolation and multi-line
const name = 'Alice';
const welcome = `Hello, ${name}!`;
console.log(welcome); // "Hello, Alice!"

// ✅ All three produce the same type
console.log(typeof greeting); // "string"
console.log(typeof message);  // "string"
console.log(typeof welcome);  // "string"

// ──── 1b. Quotes inside strings ────

// ✅ Use the OTHER type of quote to wrap strings containing quotes
const single = "It's a beautiful day";
const double = 'She said "hello"';

// ✅ Escape quotes with backslash
const escaped = 'It\'s a beautiful day';
const escapedDouble = "She said \"hello\"";

// ✅ Backticks can contain both without escaping
const backtick = `It's a "beautiful" day`;


// ════════════════════════════════════════════════════════════════════════════════
// 2. STRING IMMUTABILITY
// ════════════════════════════════════════════════════════════════════════════════
// Strings CANNOT be changed after creation.
// You can READ characters by index, but you CANNOT WRITE to them.

const word = 'hello';

// ✅ Reading characters — works fine
console.log(word[0]); // "h"
console.log(word[4]); // "o"

// ❌ COMMON ERROR: Trying to modify a character — FAILS SILENTLY!
// word[0] = 'J';
// console.log(word); // Still "hello" — the assignment was ignored!
// No error is thrown, no warning — it just silently does nothing.
// In strict mode, this throws a TypeError.

// ✅ To "change" a string, create a NEW one
const newWord = 'J' + word.slice(1);
console.log(newWord); // "Jello"
console.log(word);    // "hello" — original unchanged!


// ════════════════════════════════════════════════════════════════════════════════
// 3. TEMPLATE LITERALS (BACKTICKS)
// ════════════════════════════════════════════════════════════════════════════════

// ──── 3a. String interpolation with ${} ────

const firstName = 'John';
const age = 30;

// ✅ Embed variables and expressions directly
console.log(`Name: ${firstName}, Age: ${age}`);
// "Name: John, Age: 30"

// ✅ Any valid JavaScript EXPRESSION works inside ${}
console.log(`Next year: ${age + 1}`);                     // "Next year: 31"
console.log(`Uppercase: ${firstName.toUpperCase()}`);      // "Uppercase: JOHN"
console.log(`Is adult: ${age >= 18 ? 'Yes' : 'No'}`);     // "Is adult: Yes"
console.log(`Random: ${Math.floor(Math.random() * 10)}`);  // "Random: 7" (varies)

// ❌ COMMON ERROR: Using ${} with regular quotes — it's treated as literal text
// const broken = 'Hello, ${firstName}';
// console.log(broken); // "Hello, ${firstName}" — NOT interpolated!

// ──── 3b. Multi-line strings ────

// ✅ Backticks preserve line breaks naturally
const multiLine = `Line 1
Line 2
Line 3`;
console.log(multiLine);
// Line 1
// Line 2
// Line 3

// ❌ Regular quotes cannot span multiple lines without escaping
// const broken = 'Line 1
// Line 2';  // SyntaxError: Unterminated string literal

// ✅ Old way — concatenation (messy)
const oldWay = 'Line 1\n' +
               'Line 2\n' +
               'Line 3';


// ════════════════════════════════════════════════════════════════════════════════
// 4. ESSENTIAL STRING METHODS
// ════════════════════════════════════════════════════════════════════════════════
// ⚠️ REMEMBER: All methods return NEW strings. They NEVER modify the original.

// ──── 4a. slice(start, end) — extract a portion ────
// - start: inclusive (index where extraction begins)
// - end: exclusive (index where extraction stops, character NOT included)
// - Supports NEGATIVE indexes (count from end)

const text = 'Hello, World!';

// ✅ Basic slicing
console.log(text.slice(0, 5));   // "Hello"    — chars at index 0,1,2,3,4
console.log(text.slice(7));      // "World!"   — from index 7 to end
console.log(text.slice(7, 12));  // "World"    — index 7 to 11

// ✅ Negative indexes — count from the end
console.log(text.slice(-6));      // "World!"  — last 6 characters
console.log(text.slice(-6, -1));  // "World"   — last 6, excluding last 1

// ✅ Create a copy of the entire string
console.log(text.slice());        // "Hello, World!"

// ──── 4b. substring(start, end) — similar but NO negative indexes ────
// - If start > end, substring SWAPS them (slice returns empty string)
// - Treats negative values as 0

console.log(text.substring(0, 5));  // "Hello"
console.log(text.substring(7));     // "World!"

// ✅ substring swaps if start > end
console.log(text.substring(5, 0));  // "Hello"  — same as substring(0, 5)

// ⚠️ slice does NOT swap — returns empty string instead
console.log(text.slice(5, 0));      // ""

// ⚠️ substring treats negatives as 0
console.log(text.substring(-3));    // "Hello, World!" — same as substring(0)

// ──── 4c. replace() vs replaceAll() ────

const sentence = 'the cat sat on the mat';

// ✅ replace() — replaces only the FIRST match
console.log(sentence.replace('the', 'a'));
// "a cat sat on the mat" — only first "the" replaced!

// ✅ replaceAll() — replaces ALL matches
console.log(sentence.replaceAll('the', 'a'));
// "a cat sat on a mat" — both "the" replaced!

// ✅ replace() with regex /g flag — also replaces all
console.log(sentence.replace(/the/g, 'a'));
// "a cat sat on a mat"

// ✅ Case-insensitive replace with regex
const mixed = 'Hello hello HELLO';
console.log(mixed.replace(/hello/gi, 'hi'));
// "hi hi hi"

// ❌ COMMON ERROR: replace() only replaces the FIRST match
// const result = 'aaa'.replace('a', 'b');
// console.log(result); // "baa" — NOT "bbb"!
// Use replaceAll('a', 'b') for "bbb"

// ──── 4d. toUpperCase() / toLowerCase() ────

const sample = 'Hello World';

// ✅ Convert case
console.log(sample.toUpperCase()); // "HELLO WORLD"
console.log(sample.toLowerCase()); // "hello world"

// ❌ COMMON ERROR: Forgetting to reassign — the original is unchanged!
// let str = 'hello';
// str.toUpperCase();
// console.log(str); // "hello" — still lowercase!
// Fix: str = str.toUpperCase();

// ──── 4e. trim(), trimStart(), trimEnd() ────

const padded = '   Hello, World!   ';

// ✅ Remove whitespace from both ends
console.log(padded.trim());      // "Hello, World!"

// ✅ Remove whitespace from start only
console.log(padded.trimStart()); // "Hello, World!   "

// ✅ Remove whitespace from end only
console.log(padded.trimEnd());   // "   Hello, World!"

// ✅ Useful for cleaning user input
const userInput = '   john@email.com   ';
const cleanEmail = userInput.trim();
console.log(cleanEmail); // "john@email.com"

// ──── 4f. split(separator) — string → array ────

const csv = 'apple,banana,cherry';

// ✅ Split by comma
console.log(csv.split(','));
// ["apple", "banana", "cherry"]

// ✅ Split by space
const words = 'Hello World Foo'.split(' ');
console.log(words); // ["Hello", "World", "Foo"]

// ✅ Split into individual characters
console.log('hello'.split(''));
// ["h", "e", "l", "l", "o"]

// ✅ Split with limit
console.log('a-b-c-d'.split('-', 2));
// ["a", "b"] — only first 2 results

// ──── 4g. join() — array → string (used with split for transformations) ────

// ✅ join() is an ARRAY method, often paired with split()
const arr = ['Hello', 'World'];
console.log(arr.join(' '));  // "Hello World"
console.log(arr.join('-'));  // "Hello-World"
console.log(arr.join(''));   // "HelloWorld"

// ✅ Split + transform + join pattern
const titleCase = 'hello world'
  .split(' ')
  .map(w => w[0].toUpperCase() + w.slice(1))
  .join(' ');
console.log(titleCase); // "Hello World"

// ──── 4h. includes(), startsWith(), endsWith() — boolean checks ────

const url = 'https://www.example.com/page';

// ✅ Check if string CONTAINS a substring
console.log(url.includes('example'));  // true
console.log(url.includes('Example'));  // false — case-sensitive!

// ✅ Check if string STARTS WITH a prefix
console.log(url.startsWith('https'));  // true
console.log(url.startsWith('http'));   // true (https starts with http)

// ✅ Check if string ENDS WITH a suffix
console.log(url.endsWith('.com/page')); // true
console.log(url.endsWith('.com'));       // false

// ✅ Case-insensitive check — convert first
console.log('Hello'.toLowerCase().includes('hello')); // true

// ──── 4i. indexOf() — returns position or -1 ────

const phrase = 'the quick brown fox jumps over the lazy dog';

// ✅ Find position of first occurrence
console.log(phrase.indexOf('quick')); // 4
console.log(phrase.indexOf('the'));   // 0  — first occurrence

// ✅ Returns -1 if NOT found
console.log(phrase.indexOf('cat'));   // -1

// ✅ Search from a specific position (second argument)
console.log(phrase.indexOf('the', 1)); // 31 — skips the first "the"

// ✅ Classic pattern: check if substring exists
if (phrase.indexOf('fox') !== -1) {
  console.log('Found "fox"!');
}
// Modern alternative: use .includes() instead

// ──── 4j. padStart() and padEnd() — padding strings ────

const num = '5';

// ✅ Pad from the start (useful for formatting numbers)
console.log(num.padStart(3, '0')); // "005"
console.log(num.padStart(5, '0')); // "00005"

// ✅ Pad from the end
console.log('hi'.padEnd(10, '.')); // "hi........"

// ✅ If the string is already long enough, no padding is added
console.log('hello'.padStart(3, '0')); // "hello" — already 5 chars

// ✅ Practical: format prices
const price = '9.99';
console.log('$' + price.padStart(8)); // "$   9.99" — padded with spaces

// ✅ Practical: format time
const hours = '3';
const mins = '7';
console.log(`${hours.padStart(2, '0')}:${mins.padStart(2, '0')}`);
// "03:07"

// ──── 4k. repeat() — repeat a string N times ────

// ✅ Basic repetition
console.log('ha'.repeat(3));   // "hahaha"
console.log('-'.repeat(20));   // "--------------------"
console.log('abc'.repeat(0));  // "" — empty string

// ✅ Practical: simple progress bar
const progress = 75;
const total = 100;
const filled = Math.round(progress / 10);
const empty = 10 - filled;
console.log(`[${'█'.repeat(filled)}${'░'.repeat(empty)}] ${progress}%`);
// "[████████░░] 75%"

// ❌ Negative or Infinity throws RangeError
// 'x'.repeat(-1);       // RangeError
// 'x'.repeat(Infinity); // RangeError

// ──── 4l. charAt() vs bracket notation ────

const str = 'Hello';

// ✅ charAt(index) — returns character at position
console.log(str.charAt(0)); // "H"
console.log(str.charAt(4)); // "o"

// ✅ Bracket notation — modern, cleaner syntax
console.log(str[0]); // "H"
console.log(str[4]); // "o"

// ⚠️ Key difference: out-of-bounds behavior
console.log(str.charAt(99)); // "" — returns empty string
console.log(str[99]);        // undefined — returns undefined

// ✅ Both are read-only — neither can modify the string
// str.charAt(0) = 'J'; // SyntaxError
// str[0] = 'J';        // Fails silently (or TypeError in strict mode)


// ════════════════════════════════════════════════════════════════════════════════
// 5. PRACTICAL PATTERNS
// ════════════════════════════════════════════════════════════════════════════════

// ──── 5a. Palindrome check ────

function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  const reversed = cleaned.split('').reverse().join('');
  return cleaned === reversed;
}

// ✅ Testing palindromes
console.log(isPalindrome('racecar'));           // true
console.log(isPalindrome('A man a plan a canal Panama'));  // true
console.log(isPalindrome('hello'));             // false

// How it works step by step:
// 'racecar'
//   .split('')  → ['r','a','c','e','c','a','r']
//   .reverse()  → ['r','a','c','e','c','a','r']
//   .join('')   → 'racecar'
// 'racecar' === 'racecar' → true

// ──── 5b. Capitalize first letter ────

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

// ✅ Testing capitalization
console.log(capitalize('hello'));  // "Hello"
console.log(capitalize('jOHN'));   // "John"
console.log(capitalize('WORLD'));  // "World"

// ✅ Capitalize every word (title case)
function titleCase(str) {
  return str
    .split(' ')
    .map(word => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
console.log(titleCase('hello world foo bar')); // "Hello World Foo Bar"

// ──── 5c. Word counter ────

function countWords(str) {
  return str.trim().split(/\s+/).length;
}

// ✅ Handles extra whitespace correctly
console.log(countWords('Hello World'));              // 2
console.log(countWords('  Hello   World  '));        // 2
console.log(countWords('one'));                       // 1

// How it works:
// '  Hello   World  '
//   .trim()      → 'Hello   World'
//   .split(/\s+/) → ['Hello', 'World']  — \s+ matches one or more whitespace chars
//   .length       → 2

// ⚠️ Edge case: empty string
// ''.trim().split(/\s+/).length → 1 (splits empty string into [''])
// Fix for empty strings:
function countWordsFixed(str) {
  const trimmed = str.trim();
  if (trimmed === '') return 0;
  return trimmed.split(/\s+/).length;
}
console.log(countWordsFixed('')); // 0

// ──── 5d. Censoring words ────

function censor(text, badWord) {
  const replacement = '*'.repeat(badWord.length);
  return text.replaceAll(badWord, replacement);
}

// ✅ Censor specific words
console.log(censor('oh damn, what the damn', 'damn'));
// "oh ****, what the ****"

// ✅ Censor multiple words
function censorMultiple(text, badWords) {
  let censored = text;
  for (const word of badWords) {
    censored = censored.replaceAll(word, '*'.repeat(word.length));
  }
  return censored;
}
console.log(censorMultiple('what the heck and darn', ['heck', 'darn']));
// "what the **** and ****"


// ════════════════════════════════════════════════════════════════════════════════
// 6. QUIRKS AND COMMON ERRORS
// ════════════════════════════════════════════════════════════════════════════════

// ──── 6a. Strings are immutable ────

// ❌ FAILS SILENTLY — cannot change characters in place
// let s = 'hello';
// s[0] = 'H';
// console.log(s); // "hello" — still lowercase!

// ✅ Create a new string instead
let s = 'hello';
s = 'H' + s.slice(1);
console.log(s); // "Hello"

// ──── 6b. Methods return new strings — original is unchanged ────

// ❌ COMMON MISTAKE: Not saving the result
// let city = 'london';
// city.toUpperCase();        // Returns "LONDON" but result is thrown away!
// console.log(city);         // "london" — original unchanged!

// ✅ FIX: Reassign the result
let city = 'london';
city = city.toUpperCase();
console.log(city);             // "LONDON"

// ──── 6c. new String() vs string literal ────

// ❌ new String() creates an OBJECT, not a primitive
// const objStr = new String('hello');
// const primStr = 'hello';
//
// console.log(typeof objStr);   // "object"  ← NOT "string"!
// console.log(typeof primStr);  // "string"
//
// console.log(objStr == primStr);  // true  — loose equality (coercion)
// console.log(objStr === primStr); // false — strict equality (different types!)
//
// ⚠️ NEVER use new String(). Always use string literals.

// ──── 6d. String .length is read-only ────

const hello = 'Hello';
console.log(hello.length); // 5

// ❌ Cannot set .length on a string (unlike arrays)
// hello.length = 3;
// console.log(hello.length); // 5 — still 5, assignment ignored!
// console.log(hello);        // "Hello" — unchanged!

// ──── 6e. Calling methods on null / undefined ────

// ❌ TypeError — cannot call methods on null or undefined
// let nothing = null;
// nothing.toUpperCase(); // TypeError: Cannot read properties of null

// let notDefined = undefined;
// notDefined.trim(); // TypeError: Cannot read properties of undefined

// ✅ Guard against null/undefined
function safeTrim(str) {
  return str ? str.trim() : '';
}
console.log(safeTrim('  hello  ')); // "hello"
console.log(safeTrim(null));         // ""
console.log(safeTrim(undefined));    // ""

// ──── 6f. replace() only replaces the FIRST match ────

// ❌ SURPRISE: only the first match is replaced
// const result = 'banana'.replace('a', 'o');
// console.log(result); // "bonana" — NOT "bonono"!

// ✅ Use replaceAll() for all occurrences
console.log('banana'.replaceAll('a', 'o')); // "bonono"

// ✅ Or use regex with /g flag
console.log('banana'.replace(/a/g, 'o'));   // "bonono"

// ──── 6g. slice vs substring differences ────

const example = 'Hello, World!';

// slice: negative indexes count from the end
console.log(example.slice(-6));    // "orld!"
console.log(example.slice(5, 0));  // "" — returns empty if start > end

// substring: treats negatives as 0, swaps if start > end
console.log(example.substring(-6));   // "Hello, World!" — same as substring(0)
console.log(example.substring(5, 0)); // "Hello" — swaps to substring(0, 5)

// ⚠️ Summary:
// | Feature        | slice()         | substring()     |
// |--------------- |-----------------|-----------------|
// | Negatives      | Counts from end | Treats as 0     |
// | start > end    | Returns ""      | Swaps arguments |

// ──── 6h. String comparison — lexicographic (ASCII-based) ────

// ✅ Strings compare character by character using Unicode/ASCII values
console.log('a' < 'b');   // true   — 'a' (97) < 'b' (98)
console.log('abc' < 'abd'); // true — differs at 3rd char: 'c' (99) < 'd' (100)

// ⚠️ GOTCHA: Uppercase letters have LOWER ASCII values than lowercase!
console.log('B' < 'a');   // true! — 'B' (66) < 'a' (97)
console.log('Z' < 'a');   // true! — 'Z' (90) < 'a' (97)

// ASCII reference:
// A-Z: 65-90
// a-z: 97-122
// 0-9: 48-57

// ✅ Case-insensitive comparison
function caseInsensitiveCompare(a, b) {
  return a.toLowerCase() === b.toLowerCase();
}
console.log(caseInsensitiveCompare('Hello', 'hello')); // true

// ✅ Locale-aware sorting
const names = ['Ötzi', 'Oscar', 'Özil'];
console.log(names.sort((a, b) => a.localeCompare(b)));
// Locale-aware: respects language-specific ordering

// ──── 6i. Number + String coercion ────

// ⚠️ The + operator concatenates if either operand is a string
console.log('5' + 3);     // "53" — string concatenation, NOT addition!
console.log(5 + '3');     // "53" — same thing
console.log('5' - 3);     // 2   — subtraction DOES convert to number
console.log('5' * 3);     // 15  — multiplication converts to number

// ✅ Explicit conversion to avoid surprises
console.log(Number('5') + 3);   // 8
console.log(parseInt('5') + 3); // 8


// ════════════════════════════════════════════════════════════════════════════════
// END OF FILE
// ════════════════════════════════════════════════════════════════════════════════
