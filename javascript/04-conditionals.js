// ══════════════════════════════════════════════════════════════════════════════
// 04 — CONDITIONALS IN JAVASCRIPT
// ══════════════════════════════════════════════════════════════════════════════
//
// Conditionals let your code make DECISIONS.
// JavaScript provides several ways to branch: if/else, switch, and ternary.
// This file covers each with correct examples and common pitfalls.
// ══════════════════════════════════════════════════════════════════════════════


// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 1: if / else if / else
// ═══════════════════════════════════════════════════════════════════════════════
//
// The most fundamental control flow structure.
// JavaScript evaluates the condition as a BOOLEAN (truthy/falsy).
//

// ─── 1.1 Basic if statement ────────────────────────────────────────────────

let temperature = 35;

// ✅ Simple if.
if (temperature > 30) {
  console.log("It's hot outside! 🌞");  // Runs
}

// ✅ if with else
if (temperature > 30) {
  console.log("It's hot!");
} else {
  console.log("It's not that hot.");
}

// ─── 1.2 if / else if / else ladder — Grading Example ──────────────────────

// ✅ Classic grading system
let score = 78;
let grade;

if (score >= 90) {
  grade = 'A';
  console.log(`Score: ${score} → Grade: A (Excellent!)`);
} else if (score >= 80) {
  grade = 'B';
  console.log(`Score: ${score} → Grade: B (Good job!)`);
} else if (score >= 70) {
  grade = 'C';                     // ← This block runs for score = 78
  console.log(`Score: ${score} → Grade: C (Average)`);
} else if (score >= 60) {
  grade = 'D';
  console.log(`Score: ${score} → Grade: D (Below average)`);
} else {
  grade = 'F';
  console.log(`Score: ${score} → Grade: F (Failing)`);
}
// Output: "Score: 78 → Grade: C (Average)"

// ⚠️ IMPORTANT: JavaScript evaluates conditions TOP to BOTTOM and stops at
// the FIRST match. Order matters! If you put (score >= 60) first, a score of
// 95 would match (score >= 60) and get grade 'D'!

// ❌ COMMON ERROR: Wrong order in if/else if
// if (score >= 60) {
//   grade = 'D';                   // A score of 95 would match here first!
// } else if (score >= 70) {
//   grade = 'C';                   // This would NEVER be reached for 70+
// } else if (score >= 80) {
//   grade = 'B';                   // This would NEVER be reached for 80+
// } else if (score >= 90) {
//   grade = 'A';                   // This would NEVER be reached for 90+
// }
// ✅ FIX: Always order from most specific (highest threshold) to least specific


// ─── 1.3 COMMON ERROR: "elseif" is NOT valid JavaScript ────────────────────

// ❌ This is WRONG — "elseif" is NOT a keyword in JavaScript
// if (score >= 90) {
//   grade = 'A';
// } elseif (score >= 80) {        // SyntaxError: Unexpected token 'elseif'
//   grade = 'B';
// }
//
// ✅ FIX: It must be TWO words: "else if" (with a space)
// if (score >= 90) {
//   grade = 'A';
// } else if (score >= 80) {       // ← TWO separate words
//   grade = 'B';
// }
//
// Note: "elseif" works in PHP, "elif" works in Python,
// but JavaScript requires "else if" (two words).


// ─── 1.4 Single-line if (without braces) ──────────────────────────────────

// ✅ Legal but discouraged — only the FIRST statement is conditional
let x = 10;
if (x > 5) console.log("x is big"); // Works, but risky

// ❌ COMMON ERROR: Thinking multiple lines are inside the if
// if (x > 5)
//   console.log("This is conditional");    // Only THIS is inside the if
//   console.log("This ALWAYS runs");       // This runs regardless of condition!
//
// ✅ BEST PRACTICE: Always use braces, even for single statements
if (x > 5) {
  console.log("This is conditional");
  console.log("This is also conditional");
}


// ─── 1.5 Truthy/falsy in conditions ────────────────────────────────────────

// JavaScript doesn't require conditions to be boolean.
// Any expression is evaluated as truthy or falsy.

// ✅ Truthy values enter the if block
if ("hello") console.log("Non-empty string is truthy");  // Runs
if (42) console.log("Non-zero number is truthy");        // Runs
if ([]) console.log("Empty array is truthy!");           // Runs — surprise!
if ({}) console.log("Empty object is truthy!");          // Runs — surprise!

// ✅ Falsy values skip to else
if (0) {
  console.log("Never runs");
} else {
  console.log("0 is falsy");                             // Runs
}

if ("") {
  console.log("Never runs");
} else {
  console.log("Empty string is falsy");                  // Runs
}

if (null) {
  console.log("Never runs");
} else {
  console.log("null is falsy");                          // Runs
}


// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 2: switch STATEMENT
// ═══════════════════════════════════════════════════════════════════════════════
//
// switch compares a value against multiple cases using STRICT equality (===).
// It's useful when you have many specific values to check against.
//

// ─── 2.1 Basic switch syntax ───────────────────────────────────────────────

let day = 'Wednesday';

// ✅ Standard switch with break
switch (day) {
  case 'Monday':
    console.log("Start of the work week 😩");
    break;                         // ← MUST have break or it falls through!
  case 'Tuesday':
    console.log("Second day 📅");
    break;
  case 'Wednesday':
    console.log("Midweek! Hump day 🐪"); // ← This runs
    break;
  case 'Thursday':
    console.log("Almost there 💪");
    break;
  case 'Friday':
    console.log("TGIF! 🎉");
    break;
  case 'Saturday':
    console.log("Weekend vibes 🎸");
    break;
  case 'Sunday':
    console.log("Rest day 😴");
    break;
  default:
    console.log("Invalid day");
    break;
}
// Output: "Midweek! Hump day 🐪"


// ─── 2.2 What happens WITHOUT break — FALL-THROUGH ────────────────────────
//
// If you forget 'break', execution CONTINUES into the next case.
// This is called "fall-through" and is usually a BUG.

let fruit = 'apple';

// ❌ COMMON ERROR: Missing break statements
switch (fruit) {
  case 'apple':
    console.log("Found apple");       // ← Runs (match)
  // No break! Execution falls through...
  case 'banana':
    console.log("Found banana");      // ← ALSO runs (fall-through!)
  // No break! Continues falling...
  case 'cherry':
    console.log("Found cherry");      // ← ALSO runs (fall-through!)
    break;                             // Finally stops here
  case 'date':
    console.log("Found date");        // Does NOT run (break stopped fall-through)
}
// Output (all three print!):
// "Found apple"
// "Found banana"
// "Found cherry"

// ✅ FIX: Add break after every case
// switch (fruit) {
//   case 'apple':
//     console.log("Found apple");
//     break;                          // ← Stops execution here
//   case 'banana':
//     console.log("Found banana");
//     break;
//   case 'cherry':
//     console.log("Found cherry");
//     break;
// }


// ─── 2.3 INTENTIONAL fall-through — grouping cases ─────────────────────────
//
// Sometimes fall-through is USEFUL for grouping cases that share the same logic.

let today = 'Tuesday';

// ✅ Grouping weekdays and weekends
switch (today) {
  case 'Monday':
  case 'Tuesday':
  case 'Wednesday':
  case 'Thursday':
  case 'Friday':
    console.log(`${today} is a weekday 💼`); // Runs for any weekday
    break;
  case 'Saturday':
  case 'Sunday':
    console.log(`${today} is the weekend! 🎉`);
    break;
  default:
    console.log("Not a valid day");
}
// Output: "Tuesday is a weekday 💼"

// ✅ Another example: Season grouping
let month = 'March';

switch (month) {
  case 'December':
  case 'January':
  case 'February':
    console.log("Winter ❄️");
    break;
  case 'March':
  case 'April':
  case 'May':
    console.log("Spring 🌷");     // ← Runs for month = 'March'
    break;
  case 'June':
  case 'July':
  case 'August':
    console.log("Summer ☀️");
    break;
  case 'September':
  case 'October':
  case 'November':
    console.log("Autumn 🍂");
    break;
  default:
    console.log("Invalid month");
}
// Output: "Spring 🌷"


// ─── 2.4 The default clause ────────────────────────────────────────────────
//
// 'default' runs when NO case matches. It's like 'else' in if/else.
// It's optional, but BEST PRACTICE to always include it.

let color = 'purple';

switch (color) {
  case 'red':
    console.log("Stop 🛑");
    break;
  case 'yellow':
    console.log("Caution ⚠️");
    break;
  case 'green':
    console.log("Go ✅");
    break;
  default:
    console.log(`Unknown color: ${color}`); // ← Runs because 'purple' matches no case
}
// Output: "Unknown color: purple"

// ⚠️ 'default' doesn't HAVE to be last (but it almost always should be)
// If it's not last and has no break, it will fall through to the next case!


// ─── 2.5 switch uses STRICT EQUALITY (===) ────────────────────────────────
//
// switch compares using ===, not ==.
// This means type matters! 1 !== '1' in a switch.

let input = '1';  // String '1', not number 1

// ❌ This will NOT match — switch uses ===
switch (input) {
  case 1:                          // Number 1
    console.log("Matched number 1");
    break;
  case 2:
    console.log("Matched number 2");
    break;
  default:
    console.log("No match found");  // ← This runs! '1' !== 1
}
// Output: "No match found"

// ✅ FIX: Make sure types match
switch (Number(input)) {            // Convert to number first
  case 1:
    console.log("Matched number 1"); // ← Now this runs
    break;
  case 2:
    console.log("Matched number 2");
    break;
  default:
    console.log("No match found");
}
// Output: "Matched number 1"

// ✅ Or match against strings
switch (input) {
  case '1':                        // String '1'
    console.log("Matched string '1'"); // ← This runs
    break;
  case '2':
    console.log("Matched string '2'");
    break;
}
// Output: "Matched string '1'"


// ─── 2.6 switch(true) pattern — range checking ─────────────────────────────
//
// An advanced pattern: switch(true) lets you use EXPRESSIONS in case clauses.
// Each case is evaluated as a boolean, and the first one that's true wins.
// This effectively turns switch into an if/else if chain.

let studentScore = 85;

// ✅ Using switch(true) for range checking
switch (true) {
  case studentScore >= 90:
    console.log("Grade: A — Excellent! 🌟");
    break;
  case studentScore >= 80:
    console.log("Grade: B — Good job! 👍");   // ← Runs for 85
    break;
  case studentScore >= 70:
    console.log("Grade: C — Average 📊");
    break;
  case studentScore >= 60:
    console.log("Grade: D — Below average ⚠️");
    break;
  default:
    console.log("Grade: F — Failing ❌");
}
// Output: "Grade: B — Good job! 👍"

// ✅ Another example: Categorizing a value
let amount = 250;

switch (true) {
  case amount <= 0:
    console.log("Invalid amount");
    break;
  case amount <= 10:
    console.log("Micro purchase");
    break;
  case amount <= 100:
    console.log("Small purchase");
    break;
  case amount <= 500:
    console.log("Medium purchase");   // ← Runs for 250
    break;
  case amount <= 1000:
    console.log("Large purchase");
    break;
  default:
    console.log("Premium purchase");
}
// Output: "Medium purchase"

// ⚠️ NOTE: The switch(true) pattern works but many developers prefer if/else if
// for range checking. Use whichever is clearer for your team.


// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 3: TERNARY OPERATOR IN CONDITIONALS
// ═══════════════════════════════════════════════════════════════════════════════

// ─── 3.1 Simple ternary — great for one-line decisions ──────────────────────

let age = 16;

// ✅ Simple, readable ternary
let canVote = age >= 18 ? 'Yes' : 'No';
console.log(`Can vote: ${canVote}`);   // "Can vote: No"

// ✅ Ternary in template literals
console.log(`Status: ${age >= 18 ? '🟢 Adult' : '🔴 Minor'}`);
// Output: "Status: 🔴 Minor"

// ✅ Ternary for function arguments
let items = ['a', 'b', 'c'];
console.log(`You have ${items.length} item${items.length === 1 ? '' : 's'}`);
// Output: "You have 3 items"


// ─── 3.2 Nested ternary — and why it's BAD ─────────────────────────────────

let speed = 75;

// ❌ Nested ternary — technically works but TERRIBLE readability
let speedCategory = speed > 100 ? 'dangerous'
                  : speed > 80 ? 'fast'
                  : speed > 60 ? 'normal'
                  : speed > 30 ? 'slow'
                  : 'very slow';
console.log(speedCategory);       // "normal"

// ❌ Even worse without formatting
// let sc = speed > 100 ? 'dangerous' : speed > 80 ? 'fast' : speed > 60 ? 'normal' : speed > 30 ? 'slow' : 'very slow';
// Good luck debugging THAT.

// ✅ BETTER: Use a function with early returns
function getSpeedCategory(s) {
  if (s > 100) return 'dangerous';
  if (s > 80) return 'fast';
  if (s > 60) return 'normal';
  if (s > 30) return 'slow';
  return 'very slow';
}
console.log(getSpeedCategory(75)); // "normal" — much clearer!

// ✅ RULE OF THUMB: If you're nesting more than ONE ternary, switch to if/else.


// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 4: COMBINING CONDITIONS WITH && AND ||
// ═══════════════════════════════════════════════════════════════════════════════

// ─── 4.1 Using && (AND) — ALL conditions must be true ──────────────────────

let userAge = 25;
let hasLicense = true;
let hasInsurance = true;

// ✅ All conditions must be true
if (userAge >= 18 && hasLicense && hasInsurance) {
  console.log("You can rent a car! 🚗");     // Runs
}

// ✅ Practical: Form validation
let username = 'alice';
let password = 'secret123';

if (username.length >= 3 && password.length >= 8) {
  console.log("Valid credentials ✅");        // Runs
} else {
  console.log("Invalid credentials ❌");
}


// ─── 4.2 Using || (OR) — ANY condition can be true ─────────────────────────

let isWeekend = false;
let isHoliday = true;

// ✅ At least one condition must be true
if (isWeekend || isHoliday) {
  console.log("Day off! 🎉");                // Runs (isHoliday is true)
} else {
  console.log("Work day 💼");
}

// ─── 4.3 Combining && and || ───────────────────────────────────────────────

// ⚠️ && has HIGHER precedence than ||
// This means: a || b && c is evaluated as: a || (b && c)

let isAdmin = false;
let isEditor = true;
let isPublished = true;

// ✅ Use parentheses to make your intent CLEAR
if (isAdmin || (isEditor && isPublished)) {
  console.log("Can view this content");       // Runs
}

// ❌ COMMON ERROR: Misunderstanding precedence without parentheses
// if (isAdmin || isEditor && isPublished) {
//   // This is actually: isAdmin || (isEditor && isPublished)
//   // NOT: (isAdmin || isEditor) && isPublished
//   // They may give different results!
// }

// ✅ Complex condition with grouping
let hasPermission = true;
let isVerified = true;
let isBanned = false;

if ((hasPermission && isVerified) && !isBanned) {
  console.log("Access granted ✅");           // Runs
}


// ─── 4.4 Negation with ! ──────────────────────────────────────────────────

let isLoggedIn = false;

// ✅ Negate a condition
if (!isLoggedIn) {
  console.log("Please log in");              // Runs
}

// ✅ Negate a complex condition
let isBlocked = false;
let isExpired = false;

if (!(isBlocked || isExpired)) {
  console.log("Account is active");           // Runs
}


// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 5: OPTIONAL CHAINING IN CONDITIONS (?.)
// ═══════════════════════════════════════════════════════════════════════════════
//
// Optional chaining (?.) safely accesses deeply nested properties.
// If any part of the chain is null or undefined, it short-circuits to undefined
// instead of throwing a TypeError.
//

// ─── 5.1 The problem: accessing nested properties ──────────────────────────

let user = {
  name: 'Alice',
  profile: {
    email: 'alice@example.com',
    address: {
      city: 'Wonderland',
    },
  },
};

// ✅ This works fine when all properties exist
console.log(user.profile.email);        // "alice@example.com"
console.log(user.profile.address.city); // "Wonderland"

// ❌ COMMON ERROR: Accessing properties on null/undefined
let guest = { name: 'Guest' };           // No 'profile' property

// guest.profile.email;                  // TypeError: Cannot read properties of undefined
//                                        // Because guest.profile is undefined,
//                                        // and you can't access .email on undefined


// ─── 5.2 Old way: manual checks (verbose and ugly) ─────────────────────────

// ✅ The old, safe-but-verbose way
if (guest.profile && guest.profile.email) {
  console.log(guest.profile.email);
} else {
  console.log("No email available");     // Runs
}

// Even worse for deeply nested properties:
if (guest.profile && guest.profile.address && guest.profile.address.city) {
  console.log(guest.profile.address.city);
}


// ─── 5.3 Optional chaining (?.) — the modern way ──────────────────────────

// ✅ Clean and safe
console.log(user?.profile?.email);       // "alice@example.com"
console.log(guest?.profile?.email);      // undefined — no error!
console.log(guest?.profile?.address?.city); // undefined — no error!

// ✅ Using optional chaining in conditions
if (user?.profile?.email) {
  console.log(`Contact: ${user.profile.email}`); // Runs for user
}

if (guest?.profile?.email) {
  console.log(`Contact: ${guest.profile.email}`);
} else {
  console.log("Guest has no email on file");     // Runs for guest
}

// ─── 5.4 Optional chaining with methods ────────────────────────────────────

// ✅ Safely call methods that may not exist
let response = {
  data: {
    users: ['Alice', 'Bob'],
  },
};

// ✅ Optional chaining with method calls
console.log(response?.data?.users?.map(u => u.toUpperCase()));
// ["ALICE", "BOB"]

let emptyResponse = null;
console.log(emptyResponse?.data?.users?.map(u => u.toUpperCase()));
// undefined — no error, no crash

// ─── 5.5 Optional chaining with bracket notation and function calls ────────

// ✅ With bracket notation (for dynamic property names)
let propName = 'email';
console.log(user?.profile?.[propName]);  // "alice@example.com"

// ✅ With function calls
let calculator = {
  add: (a, b) => a + b,
};

console.log(calculator.add?.(5, 3));     // 8
console.log(calculator.subtract?.(5, 3)); // undefined — method doesn't exist, no error

// ─── 5.6 Combining optional chaining with nullish coalescing ───────────────

// ✅ The ultimate safe pattern: ?. + ??
let userCity = guest?.profile?.address?.city ?? 'Unknown City';
console.log(userCity);                    // "Unknown City"

let userEmail = user?.profile?.email ?? 'no-reply@example.com';
console.log(userEmail);                   // "alice@example.com"

// ✅ Practical example: Displaying user info
function displayUserInfo(u) {
  let displayName = u?.name ?? 'Anonymous';
  let displayEmail = u?.profile?.email ?? 'Not provided';
  let displayCity = u?.profile?.address?.city ?? 'Unknown';

  console.log(`Name: ${displayName}`);
  console.log(`Email: ${displayEmail}`);
  console.log(`City: ${displayCity}`);
}

displayUserInfo(user);
// Name: Alice
// Email: alice@example.com
// City: Wonderland

displayUserInfo(null);
// Name: Anonymous
// Email: Not provided
// City: Unknown


// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 6: PRACTICAL CONDITIONAL PATTERNS
// ═══════════════════════════════════════════════════════════════════════════════

// ─── 6.1 Guard clauses (early returns) ─────────────────────────────────────
//
// Instead of deeply nested if/else, use early returns to handle edge cases
// first. This is called the "guard clause" pattern.

// ❌ Deeply nested — hard to read
function processOrderNested(order) {
  if (order) {
    if (order.items) {
      if (order.items.length > 0) {
        if (order.payment) {
          console.log("Processing order...");
          // ... actual logic buried deep inside
        } else {
          console.log("No payment info");
        }
      } else {
        console.log("Cart is empty");
      }
    } else {
      console.log("No items");
    }
  } else {
    console.log("No order");
  }
}

// ✅ Guard clauses — clean and flat
function processOrder(order) {
  if (!order) {
    console.log("No order");
    return;
  }
  if (!order.items || order.items.length === 0) {
    console.log("Cart is empty");
    return;
  }
  if (!order.payment) {
    console.log("No payment info");
    return;
  }

  // Happy path — all checks passed
  console.log("Processing order...");
}

processOrder({ items: ['book'], payment: 'card' }); // "Processing order..."
processOrder(null);                                   // "No order"
processOrder({ items: [] });                          // "Cart is empty"


// ─── 6.2 Object lookup instead of long if/else or switch ────────────────────
//
// When mapping values to values, an object lookup is often cleaner.

// ❌ Long if/else chain
function getDayNameIfElse(num) {
  if (num === 0) return 'Sunday';
  else if (num === 1) return 'Monday';
  else if (num === 2) return 'Tuesday';
  else if (num === 3) return 'Wednesday';
  else if (num === 4) return 'Thursday';
  else if (num === 5) return 'Friday';
  else if (num === 6) return 'Saturday';
  else return 'Invalid';
}

// ✅ Object lookup — cleaner and more scalable
function getDayName(num) {
  const days = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
  };
  return days[num] ?? 'Invalid';
}

console.log(getDayName(3));       // "Wednesday"
console.log(getDayName(9));       // "Invalid"


// ─── 6.3 Conditional (ternary) in assignments and returns ──────────────────

// ✅ Great for simple conditional assignments
let theme = true;
let backgroundColor = theme ? '#1a1a2e' : '#ffffff';
let textColor = theme ? '#e0e0e0' : '#333333';

// ✅ Great for conditional returns
function getDiscount(isMember) {
  return isMember ? 0.2 : 0.05;   // 20% for members, 5% for non-members
}
console.log(getDiscount(true));    // 0.2
console.log(getDiscount(false));   // 0.05


// ─── 6.4 Avoiding common conditional mistakes ──────────────────────────────

// ❌ MISTAKE 1: Assignment (=) instead of comparison (===) in condition
let isActive = false;
// if (isActive = true) {           // This ASSIGNS true to isActive, then evaluates true
//   console.log("This always runs!"); // Bug! You meant ===
// }
//
// ✅ FIX: Use === for comparison
if (isActive === true) {
  console.log("Active");
}
// Or simply:
if (isActive) {
  console.log("Active");
}

// ❌ MISTAKE 2: Comparing with multiple values incorrectly
let status = 'active';
// if (status === 'active' || 'pending') {  // WRONG! 'pending' is always truthy!
//   console.log("This always runs!");       // Bug!
// }
//
// ✅ FIX: Compare each value separately
if (status === 'active' || status === 'pending') {
  console.log("User is active or pending"); // Correct
}
//
// ✅ Or use .includes() for multiple values
if (['active', 'pending', 'trial'].includes(status)) {
  console.log("User has access");           // Even cleaner for many values
}


// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 7: QUICK REFERENCE — CONDITIONAL CHEAT SHEET
// ═══════════════════════════════════════════════════════════════════════════════
//
//  Structure        │ Use When...
//  ─────────────────┼──────────────────────────────────────────────
//  if/else          │ 2-3 branches, complex conditions
//  else if          │ Multiple mutually exclusive conditions
//  switch           │ Many exact value matches (uses ===)
//  switch(true)     │ Range checking with switch syntax
//  ternary ? :      │ Simple inline conditional (ONE level only)
//  && short-circuit │ "Execute if truthy" (e.g., isAdmin && doAdminStuff())
//  || short-circuit │ Default values (but prefer ?? for null/undefined)
//  ?? nullish coal  │ Default only for null/undefined (preserves 0, '', false)
//  ?.               │ Safe access to deeply nested properties
//  guard clause     │ Early return to avoid deep nesting
//  object lookup    │ Mapping values to values (replaces long switch/if-else)
//
//  ❌ Common Mistakes:
//  ──────────────────────────────────────────────────────────────
//  elseif           │ Not valid JS — use "else if" (two words)
//  = in conditions  │ Assigns, doesn't compare — use === 
//  Missing break    │ Switch fall-through — add break to every case
//  x === 'a' || 'b' │ 'b' is always truthy — use x === 'a' || x === 'b'
//  Nested ternary   │ Unreadable — use if/else or a function instead
//
// ══════════════════════════════════════════════════════════════════════════════
