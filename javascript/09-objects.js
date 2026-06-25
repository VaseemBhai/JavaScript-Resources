// ════════════════════════════════════════════════════════════════════════════════
// 09 — OBJECTS IN JAVASCRIPT
// ════════════════════════════════════════════════════════════════════════════════
//
// Objects are collections of KEY-VALUE pairs (properties).
// Keys are always strings (or Symbols). Values can be anything.
// Objects are REFERENCE types — variables hold a reference, not the data itself.
//
// ════════════════════════════════════════════════════════════════════════════════


// ════════════════════════════════════════════════════════════════════════════════
// 1. OBJECT LITERALS
// ════════════════════════════════════════════════════════════════════════════════

// ✅ Creating an object with { key: value } syntax
const user = {
  name: 'Alice',
  age: 28,
  isAdmin: false,
  hobbies: ['reading', 'coding'],
  address: {
    city: 'New York',
    zip: '10001'
  }
};

console.log(user);
// { name: 'Alice', age: 28, isAdmin: false, hobbies: [...], address: {...} }

// ✅ Empty object
const empty = {};
console.log(empty); // {}


// ════════════════════════════════════════════════════════════════════════════════
// 2. ACCESSING PROPERTIES — DOT vs BRACKET NOTATION
// ════════════════════════════════════════════════════════════════════════════════

// ──── 2a. Dot notation — clean and common ────

// ✅ Standard access
console.log(user.name);         // "Alice"
console.log(user.age);          // 28
console.log(user.address.city); // "New York"

// ──── 2b. Bracket notation — flexible and powerful ────

// ✅ Same result as dot notation
console.log(user['name']);       // "Alice"
console.log(user['age']);        // 28

// ✅ REQUIRED for dynamic keys (variables as keys)
const prop = 'name';
console.log(user[prop]);        // "Alice"

// ❌ COMMON ERROR: Dot notation with a variable
// console.log(user.prop);      // undefined!
// This looks for a literal property called "prop", NOT the variable's value.

// ✅ REQUIRED for keys with spaces or special characters
const product = {
  'product name': 'Laptop',
  'price-usd': 999,
  '2nd-choice': 'Tablet'
};
console.log(product['product name']); // "Laptop"
console.log(product['price-usd']);    // 999

// ❌ Dot notation CANNOT access these:
// console.log(product.product name);  // SyntaxError
// console.log(product.price-usd);     // NaN (interpreted as product.price minus usd)

// ✅ REQUIRED for reserved words used as keys (though rare)
const config = { class: 'premium', return: true };
console.log(config['class']);  // "premium"
console.log(config.class);    // "premium" — dot notation works for reserved words in modern JS


// ════════════════════════════════════════════════════════════════════════════════
// 3. ADDING, MODIFYING, AND DELETING PROPERTIES
// ════════════════════════════════════════════════════════════════════════════════

const car = { brand: 'Toyota' };

// ✅ Add new properties
car.model = 'Camry';
car.year = 2024;
car['color'] = 'Blue';
console.log(car);
// { brand: 'Toyota', model: 'Camry', year: 2024, color: 'Blue' }

// ✅ Modify existing properties
car.year = 2025;
console.log(car.year); // 2025

// ✅ Delete a property
delete car.color;
console.log(car.color); // undefined — property no longer exists
console.log(car);
// { brand: 'Toyota', model: 'Camry', year: 2025 }

// ⚠️ delete returns true even if the property doesn't exist
console.log(delete car.nonExistent); // true


// ════════════════════════════════════════════════════════════════════════════════
// 4. ES6 SHORTHAND PROPERTIES
// ════════════════════════════════════════════════════════════════════════════════

const userName = 'Bob';
const userAge = 25;
const role = 'admin';

// ❌ Old verbose way
// const userOld = {
//   userName: userName,
//   userAge: userAge,
//   role: role
// };

// ✅ ES6 shorthand — when variable name matches key name
const userNew = { userName, userAge, role };
console.log(userNew);
// { userName: 'Bob', userAge: 25, role: 'admin' }

// ✅ Mix shorthand and regular properties
const profile = {
  userName,          // shorthand
  role,              // shorthand
  isActive: true     // regular
};
console.log(profile);
// { userName: 'Bob', role: 'admin', isActive: true }


// ════════════════════════════════════════════════════════════════════════════════
// 5. COMPUTED PROPERTY NAMES
// ════════════════════════════════════════════════════════════════════════════════

// ✅ Use [expression] as a key when creating objects
const keyName = 'status';
const dynamicObj = {
  [keyName]: 'active',
  [`${keyName}Code`]: 200
};
console.log(dynamicObj);
// { status: 'active', statusCode: 200 }

// ✅ Useful for creating objects from variables dynamically
function createPair(key, value) {
  return { [key]: value };
}
console.log(createPair('color', 'red'));   // { color: 'red' }
console.log(createPair('size', 'large'));  // { size: 'large' }


// ════════════════════════════════════════════════════════════════════════════════
// 6. DESTRUCTURING
// ════════════════════════════════════════════════════════════════════════════════

const student = {
  name: 'Charlie',
  age: 22,
  grade: 'A',
  address: {
    city: 'Boston',
    state: 'MA'
  }
};

// ──── 6a. Basic destructuring ────

// ✅ Extract properties into variables
const { name: studentName, age: studentAge, grade } = student;
console.log(studentName); // "Charlie"
console.log(studentAge);  // 22
console.log(grade);       // "A"

// ──── 6b. Renaming during destructuring ────

// ✅ Use colon to assign to a different variable name
const { name: fullName, age: years } = student;
console.log(fullName); // "Charlie"
console.log(years);    // 22

// ──── 6c. Default values ────

// ✅ Provide defaults for properties that might not exist
const { name: sName, gpa = 3.5, scholarship = false } = student;
console.log(sName);        // "Charlie"
console.log(gpa);          // 3.5 — property doesn't exist, default used
console.log(scholarship);  // false — property doesn't exist, default used

// ✅ Default only applies when value is undefined, NOT null
const data = { value: null };
const { value = 'default' } = data;
console.log(value); // null — NOT "default"! null is a defined value.

// ──── 6d. Nested destructuring ────

// ✅ Destructure nested objects
const { address: { city: studentCity, state } } = student;
console.log(studentCity); // "Boston"
console.log(state);       // "MA"

// ⚠️ After nested destructuring, `address` is NOT defined as a variable
// console.log(address); // ReferenceError — only city and state are extracted

// ✅ If you need both the nested object AND its properties:
const { address: addr, address: { city: c } } = student;
console.log(addr);  // { city: 'Boston', state: 'MA' }
console.log(c);     // "Boston"

// ──── 6e. Destructuring in function parameters ────

// ✅ Clean way to accept object arguments
function greetUser({ name, age, role = 'member' }) {
  console.log(`${name}, ${age} years old, role: ${role}`);
}

greetUser({ name: 'Dana', age: 30 });
// "Dana, 30 years old, role: member"

greetUser({ name: 'Eve', age: 25, role: 'admin' });
// "Eve, 25 years old, role: admin"


// ════════════════════════════════════════════════════════════════════════════════
// 7. SPREAD OPERATOR WITH OBJECTS
// ════════════════════════════════════════════════════════════════════════════════

// ──── 7a. Shallow copy ────

const original = { a: 1, b: 2, c: { deep: true } };

// ✅ Create a shallow copy with spread
const copy = { ...original };
console.log(copy);           // { a: 1, b: 2, c: { deep: true } }
console.log(copy === original); // false — different reference

// ⚠️ SHALLOW copy — nested objects still share the same reference!
copy.c.deep = false;
console.log(original.c.deep); // false — original ALSO changed!
// We'll cover this more in the quirks section.

// ──── 7b. Merging objects ────

const defaults = {
  theme: 'light',
  language: 'en',
  notifications: true
};

const userPrefs = {
  theme: 'dark',
  fontSize: 16
};

// ✅ Merge — later properties WIN (right overwrites left)
const settings = { ...defaults, ...userPrefs };
console.log(settings);
// {
//   theme: 'dark',        ← userPrefs.theme overwrote defaults.theme
//   language: 'en',       ← from defaults
//   notifications: true,  ← from defaults
//   fontSize: 16          ← from userPrefs (new property)
// }

// ✅ Add/override specific properties
const updated = { ...settings, language: 'es', debug: false };
console.log(updated);
// { theme: 'dark', language: 'es', notifications: true, fontSize: 16, debug: false }


// ════════════════════════════════════════════════════════════════════════════════
// 8. OBJECT STATIC METHODS
// ════════════════════════════════════════════════════════════════════════════════

const laptop = {
  brand: 'Dell',
  model: 'XPS 15',
  price: 1299
};

// ──── 8a. Object.keys() — array of keys ────
console.log(Object.keys(laptop));
// ["brand", "model", "price"]

// ──── 8b. Object.values() — array of values ────
console.log(Object.values(laptop));
// ["Dell", "XPS 15", 1299]

// ──── 8c. Object.entries() — array of [key, value] pairs ────
console.log(Object.entries(laptop));
// [["brand", "Dell"], ["model", "XPS 15"], ["price", 1299]]

// ✅ Iterate with Object.entries() and destructuring
for (const [key, value] of Object.entries(laptop)) {
  console.log(`${key}: ${value}`);
}
// brand: Dell
// model: XPS 15
// price: 1299

// ✅ Convert entries back to object with Object.fromEntries()
const entries = [['a', 1], ['b', 2], ['c', 3]];
const fromEntries = Object.fromEntries(entries);
console.log(fromEntries); // { a: 1, b: 2, c: 3 }


// ════════════════════════════════════════════════════════════════════════════════
// 9. for...in LOOP
// ════════════════════════════════════════════════════════════════════════════════

const animal = {
  species: 'Cat',
  name: 'Whiskers',
  age: 5
};

// ✅ Iterate over all enumerable properties (including inherited ones)
for (const key in animal) {
  console.log(`${key}: ${animal[key]}`);
}
// species: Cat
// name: Whiskers
// age: 5

// ⚠️ for...in also iterates over inherited properties from the prototype chain
// ✅ Use hasOwnProperty to filter
for (const key in animal) {
  if (animal.hasOwnProperty(key)) {
    console.log(`Own property — ${key}: ${animal[key]}`);
  }
}

// ⚠️ Prefer Object.keys() or Object.entries() over for...in for plain objects
// for...in is mainly useful when you need inherited properties too


// ════════════════════════════════════════════════════════════════════════════════
// 10. OPTIONAL CHAINING (?.)
// ════════════════════════════════════════════════════════════════════════════════

const account = {
  name: 'Frank',
  profile: {
    address: {
      city: 'Seattle'
    }
  }
};

// ❌ WITHOUT optional chaining — risky, can throw
// const city = account.profile.address.city;    // "Seattle" — works
// const zip = account.profile.address.zip;      // undefined — works
// const country = account.billing.address.city; // TypeError! billing is undefined

// ✅ WITH optional chaining — returns undefined instead of throwing
console.log(account?.profile?.address?.city);     // "Seattle"
console.log(account?.profile?.address?.zip);      // undefined
console.log(account?.billing?.address?.city);     // undefined — no error!

// ✅ Works with bracket notation too
console.log(account?.profile?.['address']?.city); // "Seattle"

// ✅ Works with method calls
const result = account?.getProfile?.();  // undefined — getProfile doesn't exist
console.log(result);                     // undefined

// ✅ Works with arrays
const users = [{ name: 'A' }, { name: 'B' }];
console.log(users?.[0]?.name);  // "A"
console.log(users?.[5]?.name);  // undefined — index 5 doesn't exist


// ════════════════════════════════════════════════════════════════════════════════
// 11. NULLISH COALESCING (??)
// ════════════════════════════════════════════════════════════════════════════════

const userSettings = {
  name: 'Grace',
  bio: '',         // empty string — a valid value!
  notifications: 0, // zero — a valid value!
  theme: null,
  language: undefined
};

// ✅ ?? returns right side ONLY if left side is null or undefined
console.log(userSettings.name ?? 'Anonymous');           // "Grace"
console.log(userSettings.bio ?? 'No bio');               // "" — empty string is NOT null
console.log(userSettings.notifications ?? 10);           // 0 — zero is NOT null
console.log(userSettings.theme ?? 'light');              // "light" — null triggers default
console.log(userSettings.language ?? 'en');              // "en" — undefined triggers default

// ⚠️ Compare with || (logical OR) — || treats 0, '', false as falsy!
console.log(userSettings.bio || 'No bio');               // "No bio" — || treats '' as falsy!
console.log(userSettings.notifications || 10);           // 10 — || treats 0 as falsy!

// ✅ Combined with optional chaining — powerful pattern
const displayCity = account?.profile?.address?.city ?? 'Unknown City';
console.log(displayCity); // "Seattle"

const displayZip = account?.profile?.address?.zip ?? 'N/A';
console.log(displayZip); // "N/A"


// ════════════════════════════════════════════════════════════════════════════════
// 12. Object.freeze() AND Object.seal()
// ════════════════════════════════════════════════════════════════════════════════

// ──── 12a. Object.freeze() — completely immutable (shallow) ────

const frozen = Object.freeze({
  name: 'Frozen',
  age: 30,
  nested: { mutable: true }
});

// ❌ Cannot modify existing properties
// frozen.name = 'Changed';
// console.log(frozen.name); // "Frozen" — modification silently ignored!

// ❌ Cannot add new properties
// frozen.newProp = 'test';
// console.log(frozen.newProp); // undefined — addition silently ignored!

// ❌ Cannot delete properties
// delete frozen.age;
// console.log(frozen.age); // 30 — deletion silently ignored!

// ⚠️ GOTCHA: freeze is SHALLOW — nested objects CAN still be modified!
frozen.nested.mutable = false;
console.log(frozen.nested.mutable); // false — the nested object changed!

// ✅ Check if an object is frozen
console.log(Object.isFrozen(frozen)); // true

// ──── 12b. Object.seal() — can modify, but can't add or delete ────

const sealed = Object.seal({
  name: 'Sealed',
  age: 25
});

// ✅ CAN modify existing properties
sealed.name = 'Modified';
console.log(sealed.name); // "Modified" — allowed!

// ❌ Cannot ADD new properties
// sealed.email = 'test@test.com';
// console.log(sealed.email); // undefined — addition silently ignored!

// ❌ Cannot DELETE properties
// delete sealed.age;
// console.log(sealed.age); // 25 — deletion silently ignored!

// ✅ Check if an object is sealed
console.log(Object.isSealed(sealed)); // true

// Summary:
// | Feature          | Object.freeze() | Object.seal() | Regular {} |
// |------------------|-----------------|---------------|------------|
// | Modify values    | ❌ No           | ✅ Yes        | ✅ Yes     |
// | Add properties   | ❌ No           | ❌ No         | ✅ Yes     |
// | Delete properties| ❌ No           | ❌ No         | ✅ Yes     |


// ════════════════════════════════════════════════════════════════════════════════
// 13. QUIRKS AND COMMON ERRORS
// ════════════════════════════════════════════════════════════════════════════════

// ──── 13a. Pass by REFERENCE — objects are shared, not copied ────

const objA = { id: 1, name: 'Original' };
const objB = objA; // Both variables point to the SAME object!

// ❌ Modifying objB ALSO modifies objA
objB.id = 2;
objB.name = 'Changed';
console.log(objA.id);   // 2 — objA was changed too!
console.log(objA.name); // "Changed" — same object in memory!

// ✅ To create an independent copy, use spread
const objC = { ...objA };
objC.id = 99;
console.log(objA.id); // 2 — objA NOT affected

// ──── 13b. Object equality — compares REFERENCES, not content ────

// ❌ Two objects with identical content are NOT equal
const x = { id: 1 };
const y = { id: 1 };
console.log(x === y); // false — different references!
console.log(x == y);  // false — still different references!

// ✅ Same reference IS equal
const z = x;
console.log(x === z); // true — same reference

// ✅ To compare content, use JSON.stringify (simple cases)
console.log(JSON.stringify(x) === JSON.stringify(y)); // true
// ⚠️ JSON.stringify doesn't work for functions, undefined, circular refs, etc.

// ──── 13c. Spread is SHALLOW — nested objects share references ────

const original2 = {
  name: 'Test',
  tags: ['a', 'b'],
  meta: { created: '2024-01-01' }
};

const shallow = { ...original2 };

// ✅ Top-level properties are independent
shallow.name = 'Copy';
console.log(original2.name); // "Test" — unaffected

// ❌ Nested objects/arrays still share references!
shallow.tags.push('c');
console.log(original2.tags); // ["a", "b", "c"] — original ALSO changed!

shallow.meta.created = '2025-01-01';
console.log(original2.meta.created); // "2025-01-01" — original ALSO changed!

// ✅ Deep copy solution: structuredClone() (modern) or JSON trick
const deep = structuredClone(original2);
deep.tags.push('d');
console.log(original2.tags.includes('d')); // false — truly independent

// ──── 13d. Dot notation with a variable — looks for literal property name ────

const obj = { key: 'literal', name: 'Alice' };
const key = 'name';

// ❌ Dot notation does NOT use the variable
console.log(obj.key);   // "literal" — looks for property literally named "key"

// ✅ Bracket notation uses the variable's VALUE
console.log(obj[key]);  // "Alice" — evaluates key → "name", then obj["name"]

// ──── 13e. typeof null === 'object' — historic JavaScript bug ────

// ❌ This is a well-known bug in JavaScript — it can NEVER be fixed
//    because fixing it would break billions of websites
console.log(typeof null);      // "object" ← WRONG! null is NOT an object!
console.log(typeof undefined); // "undefined"
console.log(typeof {});        // "object"

// ✅ To properly check for null:
console.log(null === null);    // true — use strict equality

// ✅ To check if something is a real object (not null):
function isObject(val) {
  return val !== null && typeof val === 'object';
}
console.log(isObject({}));   // true
console.log(isObject(null)); // false
console.log(isObject(42));   // false

// ──── 13f. Object.freeze() is SHALLOW ────

const shallowFrozen = Object.freeze({
  name: 'Frozen',
  config: { debug: true }
});

// ❌ Nested objects can STILL be modified
shallowFrozen.config.debug = false;
console.log(shallowFrozen.config.debug); // false — changed!

// ✅ Deep freeze — recursively freeze all nested objects
function deepFreeze(obj) {
  Object.freeze(obj);
  Object.values(obj).forEach(val => {
    if (typeof val === 'object' && val !== null && !Object.isFrozen(val)) {
      deepFreeze(val);
    }
  });
  return obj;
}

const deepFrozen = deepFreeze({ name: 'Deep', config: { debug: true } });
deepFrozen.config.debug = false;
console.log(deepFrozen.config.debug); // true — nested object is frozen too!

// ──── 13g. Accessing non-existent properties ────

const person = { name: 'Helen' };

// ✅ Non-existent property returns undefined (no error)
console.log(person.email);    // undefined — no error
console.log(person.address);  // undefined — no error

// ❌ Accessing a property OF undefined DOES throw!
// console.log(person.address.city);
// TypeError: Cannot read properties of undefined (reading 'city')

// ✅ Guard with optional chaining
console.log(person?.address?.city); // undefined — no error

// ✅ Guard with && (older pattern)
console.log(person.address && person.address.city); // undefined

// ──── 13h. for...in includes inherited properties ────

function Animal(name) {
  this.name = name;
}
Animal.prototype.type = 'animal';

const dog = new Animal('Rex');

// ⚠️ for...in includes prototype properties
for (const key in dog) {
  console.log(key); // "name", then "type" (from prototype!)
}

// ✅ Filter with hasOwnProperty
for (const key in dog) {
  if (dog.hasOwnProperty(key)) {
    console.log(key); // only "name"
  }
}

// ✅ Or use Object.keys() which only returns OWN properties
console.log(Object.keys(dog)); // ["name"]


// ════════════════════════════════════════════════════════════════════════════════
// END OF FILE
// ════════════════════════════════════════════════════════════════════════════════
