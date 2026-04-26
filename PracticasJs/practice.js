/*
Best Practices / Variables

Name: Refactor to best-practices
Task: Refactor the code below to follow best practices
(use const/let, avoid mutation when possible, 
clearer naming). Keep behavior identical.

function addToCart(cart, item){
  cart.items = cart.items || [];
  cart.items.push(item);
  return cart;
}

(Return a function that does the same but written more cleanly and immutably.)
*/
//Mi resolucion
function addToCart(item) {
  let cart = {
    items: [],
  };
  cart.items.push(item);
  return cart;
}
/*forma correcta
function addToCart(cart, item) {
  return {
    ...cart,
    items: [...(cart.items ?? []), item],
  };
}
*/

/*2
Name: Predict the output
Task: For each expression below, write what it returns (value and type). 
Then write a single function explain() that returns an array of objects 
{expr: '...', value: <value>, type: '...'} for these expressions:

[] + []
[] + {}
{ } + [] (note: this one can be tricky because of automatic semicolon/interpretation — use a safe expression like ({} + []))
null == undefined
null === undefined
'5' - 2
'5' + 2

(Return the explain function source.)
*/

//Mi resolucion
const explain = () => {
  let array = [];
  let expressions = [
    () => [] + [],
    () => [] + {},
    () => ({}) + [],
    () => null == undefined,
    () => null === undefined,
    () => "5" - 2,
    () => "5" + 2,
  ];
  expressions.forEach((exprss, index) => {
    let obj = {
      expr: `${expressions[index]}`,
      value: `${exprss()}`,
      type: `${typeof exprss()}`,
    };
    array.push(obj);
  });

  return array;
};

let result = console.log(explain());
/*Forma correcta o eficiente
const explain = () => {
  const expressions = [
    ['[] + []', () => [] + []],
    ['[] + {}', () => [] + {}],
    ['({} + [])', () => ({} + [])],
    ['null == undefined', () => null == undefined],
    ['null === undefined', () => null === undefined],
    ["'5' - 2", () => '5' - 2],
    ["'5' + 2", () => '5' + 2],
  ];

  return expressions.map(([expr, fn]) => ({
    expr,
    value: fn(),
    type: typeof fn(),
  }));
};
*/

/*3.
Operators (optional chaining & nullish)

Name: Safe access and defaults
Task: Write a function getUserCity(user) that safely returns 
user.address.city, but if city is null or undefined or absent, 
returns the string "Unknown". Use optional chaining and nullish 
coalescing (?. and ??).
*/
// Mi resolucion
let user1 = {
  name: "Jose",
  age: 25,
  address: {
    city: "Cochabamba",
  },
};

function getUserCity(user) {
  return user.address?.city ?? "unknown";
}

let city = getUserCity(user1);
console.log(city);
/*Manera mas eficiente
function getUserCity(user) {
  return user?.address?.city ?? "Unknown";
}
*/

/*4
trings & Methods

Name: Normalize names
Task: Implement normalizeName(name) that:

Removes leading/trailing whitespace,
Replaces multiple spaces within the name with a single space,
Capitalizes the first letter of each word and lowercases the rest,
Returns the normalized string.

Examples:

" jUAn péREZ " → "Juan Pérez"
*/

//Mi resolucion
function normalizeName(name) {
  name.trim();
  let singleSpace = name.replace(/\s+/g, " ");
  let nameArray = singleSpace.split(" ");
  let charArray = [];
  let normalizeString = "";
  nameArray.forEach((value, index) => {
    charArray = value.split("");
    charArray.forEach((value, index) => {
      if (index == 0 && value.toUpperCase()) {
        charArray[index] = value.toUpperCase();
      } else if (index != 0) {
        charArray[index] = value.toLowerCase();
      }
    });
    nameArray[index] = charArray.join("");
  });
  normalizeString = nameArray.join(" ");
  return normalizeString;
}

const nameFixed = normalizeName("ESTO  ES Una cadena de TeXtO");
console.log(nameFixed);
/*Manera mas eficiente 
function normalizeName(name) {
  return name
    .trim()
    .replace(/\s+/g, " ")
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
*/

/*5
Conditionals (if/else / ternary / switch)

Name: Shipping cost
Task: Implement shippingCost(zip, weight) which returns:

If weight <= 1 kg → $5
If weight > 1 and weight <= 5 → $10
If weight > 5 → $20
But if zip starts with '9', apply a remote-area surcharge +$15.
Return a number (cost in dollars). Use an if/else for weight and 
a ternary or other concise approach for the surcharge.
*/

//Mi resolucion
function shippingcost(zip, weight) {
  let cost;
  if (weight <= 1) {
    cost = 5;
  } else if (weight > 1 && weight <= 5) {
    cost = 10;
  } else {
    cost = 20;
  }
  let surcharge =
    zip == 9
      ? `A surcharge of 15$ is applying to the cost, now the
    final cost is: ${cost + 15}$`
      : `The final cost is: ${cost}$`;

  return surcharge;
}

let shipping = shippingcost(7, 3);
console.log(shipping);
/*Manera mas eficiente
function shippingCost(zip, weight) {
  let cost;

  if (weight <= 1) {
    cost = 5;
  } else if (weight <= 5) {
    cost = 10;
  } else {
    cost = 20;
  }

  return String(zip).startsWith("9") ? cost + 15 : cost;
}
*/


/*6.
Arrays, Sets, Maps

Name: Frequency map & unique list
Task: Given an array of strings words, implement a function analyzeWords(words) 
that returns an object:

{
  unique: Set,            // a Set of unique words
  counts: Map,            // Map where key=word, value=count
  top3: Array             // an array of top 3 words by frequency (ties: any order)
}

Write it in an efficient single-pass style (i.e., loop once to 
produce counts).
 */
//Mi resolucion
let words = [
  "Pajaro",
  "Brasil",
  "Vaso",
  "Ventana",
  "Pajaro",
  "Momia",
  "Vaso",
  "Pajaro",
  "Pelicula",
  "Lapiz",
  "Vaso",
  "Momia",
  "Momia",
  "Futbol",
  "Basket",
];

const analyzeWords = function (words) {
  let set = new Set();
  let frequencyMap = new Map();
  let newArray = [];
  for (let word of words) {
    frequencyMap.set(word, (frequencyMap.get(word) || 0) + 1);
  }
  let currentVal = 0;
  for (let key of frequencyMap.keys()) {
    currentVal = frequencyMap.get(key);
    if (currentVal == 1) {
      set.add(key);
    } else {
      newArray.push(key);
    }
  }
  let object = {
    unique: set,
    counts: frequencyMap,
    top3: newArray,
  };

  return object;
};

const finalResult = analyzeWords(words);
console.log(finalResult);
/*Resolucion correcta o efectiva 
function analyzeWords(words) {
  const unique = new Set();
  const counts = new Map();

  for (const word of words) {
    unique.add(word);
    counts.set(word, (counts.get(word) ?? 0) + 1);
  }

  const top3 = [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([word]) => word);

  return { unique, counts, top3 };
}
*/

/*7.
Loops

Name: Sum variants
Task: Implement two functions that compute the sum of numeric values in an array:

sumForOf(numbers) — use for...of.
sumWhile(numbers) — use while loop.
Both should validate elements: if any element is not a finite number, throw 
an Error withmessage "Invalid number at index X" where X is the index.
*/
//Mi resolucion
let numArray = [3, 5, 2, "1", 2, 4, 5, 21, Infinity, 3254, 2, 12, 3, 532];
function sumForOf(numbers) {
  let cont = 0;
  for (let num of numbers) {
    try {
      if (Number.isFinite(num) && (typeof num == "number")) {
        cont += num;
      } else {
        throw new TypeError(`This value: ${num} isn't a number, count is not applying`);
      }
    } catch (error) {
      console.log(error)
    }
  }
  return cont;
}

function sumWhile(numbers) {
  let cont = 0;
  let i = 0;
  while (i <= numbers.length - 1) {
    try {
      if (Number.isFinite(numbers[i]) && (typeof numbers[i] == "number")) {
        cont += numbers[i];
      } else {
        throw new TypeError(`This value: ${numbers[i]} isn't a number, count is not applying`);
      }
    } catch (error) {
      console.log(error)
    }
    i++;
  }
  return cont
}

try {
  let totalFor = sumForOf(numArray);
  let totalWhile = sumWhile(numArray);
  console.log("Results are: " + totalFor + " and " + totalWhile)
} catch (error) {
  console.log("An error happened: ", error);
}
/*Resolucion correcta o eficiente
function sumForOf(numbers) {
  let total = 0;

  for (const [index, num] of numbers.entries()) {
    if (!Number.isFinite(num)) {
      throw new Error(`Invalid number at index ${index}`);
    }
    total += num;
  }

  return total;
}

function sumWhile(numbers) {
  let total = 0;
  let i = 0;

  while (i < numbers.length) {
    if (!Number.isFinite(numbers[i])) {
      throw new Error(`Invalid number at index ${i}`);
    }
    total += numbers[i];
    i++;
  }

  return total;
}
*/


 /*8.
 Functions (higher-order & arrow)

Name: Map with
Task: Implement a higher-order function mapWith(arr, fn) that behaves 
like arr.map(fn). Provide:

An implementation using a normal named function.
An implementation assigned to a const arrow function.
Include a short example showing mapWith([1,2,3], x => x * 2) 
returns [2,4,6].
 */

//Mi Resolucion
const mapWith = (arr, fn) => {
  let newArray = []
  for (let val of arr){
    newArray.push(fn(val))
  }
  return newArray
}

let mapNamFunc = mapWith([1,2,3], multiply)
let mapArrFunc = mapWith([1,2,3], x => x * 2)
console.log(mapNamFunc, mapArrFunc)

function multiply(arr){
  return arr *= 2
}
/*Respuesta correcta o Eficiente 
function mapWith(arr, fn) {
  const result = [];

  for (const [index, value] of arr.entries()) {
    result.push(fn(value, index, arr));
  }

  return result;
}

const mapWithArrow = (arr, fn) => {
  const result = [];

  for (const [index, value] of arr.entries()) {
    result.push(fn(value, index, arr));
  }

  return result;
};
*/

/*9. 
Objects, Classes, Destructuring, Error handling, console, modules

Name: Person module
Task (split into two files)

    1. person.js — Export a default class Person that:
        * Constructor takes { firstName, lastName, age } (use destructuring).
        * Validates that firstName and lastName are non-empty strings; otherwise throw TypeError.
        * Has a method fullName() returning "First Last".
        * Has a static fromObject(obj) factory that returns a Person.
    2. index.js — Import Person, create an instance from { firstName: 'ana', lastName: 'lopez', age: 28 }.
        * Use object spread to create a modified copy with age: 29.
        * Use console.group / console.log to print the original and modified person's full names and ages in a grouped way.
        * Wrap the creation in try/catch and log a friendly message on error.

Return both module snippets (two code blocks), using ES module syntax (export default, import ... from '...').
*/

// mi resolucion Archivos personfrom and index from