export const courses = [
  {
    id: 'javascript',
    title: 'JavaScript',
    description: 'Master JavaScript from fundamentals to advanced concepts',
    topics: [
      {
        id: 'foundation',
        title: 'Foundation: First Code',
        subtopics: [
          {
            id: 'first-program',
            title: 'Your first program (console.log)',
            notes: `## What is console.log?
\`console.log()\` displays output in the terminal/console. It's how you see what your code is doing.

## Basic Syntax
\`\`\`javascript
console.log("Hello, World!");  // Prints text
console.log(42);               // Prints a number
console.log(3.14);             // Prints a decimal
\`\`\`

## Printing Different Types
\`\`\`javascript
// Strings - text in quotes (single or double)
console.log("Hello");
console.log('Hello');

// Numbers - no quotes needed
console.log(100);
console.log(-50);
console.log(3.14159);
\`\`\`

## Multiple Values
\`\`\`javascript
console.log("Result:", 100);   // Outputs: Result: 100
console.log("Sum:", 5 + 3);    // Outputs: Sum: 8
\`\`\`

## Math Expressions
\`\`\`javascript
console.log(5 + 3);    // 8 (addition)
console.log(10 - 4);   // 6 (subtraction)
console.log(8 * 5);    // 40 (multiplication)
console.log(20 / 4);   // 5 (division)
\`\`\`

## Key Points
- Parentheses \`()\` are required
- Strings need quotes, numbers don't
- Expressions are calculated before printing`,
            outcomes: [
              'what_is_console_log',       // Displays output in the browser console or terminal
              'basic_syntax',              // console.log() with parentheses containing what to display
              'printing_strings',          // Text in quotes (single or double)
              'printing_numbers',          // Numbers directly without quotes
              'printing_multiple_values',  // Multiple items separated, outputs with space between
              'math_expressions'           // Calculations are evaluated and result is printed
            ],
            tasks: [
              {
                description: 'Print the text: Hello, World!',
                testCases: [{ input: null, expectedOutput: 'Hello, World!' }]
              },
              {
                description: 'Print the number 42',
                testCases: [{ input: null, expectedOutput: '42' }]
              },
              {
                description: 'Print the decimal number 3.14159',
                testCases: [{ input: null, expectedOutput: '3.14159' }]
              },
              {
                description: 'Print the negative number -50',
                testCases: [{ input: null, expectedOutput: '-50' }]
              },
              {
                description: 'Print "Result:" and 100 together, separated by a space',
                testCases: [{ input: null, expectedOutput: 'Result: 100' }]
              },
              {
                description: 'Print the result of 8 multiplied by 5',
                testCases: [{ input: null, expectedOutput: '40' }]
              }
            ]
          }
        ]
      },
      {
        id: 'variables',
        title: 'Variables & Constants',
        subtopics: [
          {
            id: 'variables-and-constants',
            title: 'Variables and Constants',
            notes: `## What are Variables and Constants?
Containers that store values for reuse throughout your code.

## const - Constants (Cannot Change)
\`\`\`javascript
const PI = 3.14159;
const name = "JavaScript";
const age = 25;

// PI = 3.14;  // ❌ Error! Cannot reassign const
\`\`\`

## let - Variables (Can Change)
\`\`\`javascript
let score = 0;
score = 100;        // ✅ Can reassign
score = score + 50; // ✅ Can update

let count = 1;
count = count * 2;  // Now count is 2
\`\`\`

## When to Use Which
\`\`\`javascript
const TAX_RATE = 0.08;  // Never changes - use const
let total = 0;          // Will change - use let
\`\`\`

## Naming Conventions
\`\`\`javascript
// ✅ Good names (camelCase, descriptive)
const userName = "Alice";
let currentScore = 0;
const maxAttempts = 3;

// ❌ Bad names
const x = "Alice";     // Not descriptive
const USERNAME = "A";  // Reserved for true constants
\`\`\`

## Using Variables
\`\`\`javascript
const price = 100;
const quantity = 3;
const total = price * quantity;  // 300
console.log(total);
\`\`\`

## Key Rules
- Use \`const\` by default
- Use \`let\` only when value will change
- Never use \`var\` (outdated)
- Names are case-sensitive`,
            outcomes: [
              'what_are_variables_constants',  // Containers that store values for reuse
              'const_declaration',             // const name = value; for values that never change
              'let_declaration',               // let name = value; for values that will change
              'using_variables',               // Use variable name to access stored value
              'reassignment',                  // Change let value with name = newValue
              'const_cannot_reassign',         // const throws error if you try to reassign
              'naming_conventions'             // camelCase, descriptive names, no single letters
            ],
            tasks: [
              {
                description: 'Store the number 100 in a constant and print it',
                testCases: [{ input: null, expectedOutput: '100' }]
              },
              {
                description: 'Store the text "JavaScript" in a constant and print it',
                testCases: [{ input: null, expectedOutput: 'JavaScript' }]
              },
              {
                description: 'Store 15 and 27 in two constants, then print their sum',
                testCases: [{ input: null, expectedOutput: '42' }]
              },
              {
                description: 'Create a variable with value 10, add 5 to it, then print the result',
                testCases: [{ input: null, expectedOutput: '15' }]
              },
              {
                description: 'Create a variable with value 2, double it 3 times, then print the final value',
                testCases: [{ input: null, expectedOutput: '16' }]
              },
              {
                description: 'Create a constant with value 100 and a variable starting at 0. Add the constant to the variable twice, then print the variable',
                testCases: [{ input: null, expectedOutput: '200' }]
              }
            ]
          }
        ]
      },
      {
        id: 'data-types',
        title: 'Data Types',
        subtopics: [
          {
            id: 'numbers-arithmetic',
            title: 'Numbers and basic arithmetic',
            notes: `## Number Types
JavaScript has one number type for both integers and decimals.

\`\`\`javascript
const integer = 42;
const decimal = 3.14;
const negative = -100;
\`\`\`

## Basic Operators
\`\`\`javascript
console.log(10 + 5);   // 15 (addition)
console.log(10 - 5);   // 5 (subtraction)
console.log(10 * 5);   // 50 (multiplication)
console.log(10 / 5);   // 2 (division)
\`\`\`

## Modulo (Remainder)
\`\`\`javascript
console.log(10 % 3);   // 1 (remainder of 10 ÷ 3)
console.log(15 % 5);   // 0 (evenly divisible)
console.log(7 % 2);    // 1 (odd number check)
\`\`\`

## Operator Precedence
Like math class: \`* / %\` happen before \`+ -\`

\`\`\`javascript
console.log(2 + 3 * 4);    // 14 (not 20)
console.log((2 + 3) * 4);  // 20 (parentheses first)
\`\`\`

## Practical Examples
\`\`\`javascript
// Rectangle area and perimeter
const length = 10;
const width = 5;
const area = length * width;           // 50
const perimeter = 2 * (length + width); // 30

// Time conversion
const totalMinutes = 185;
const hours = Math.floor(totalMinutes / 60);  // 3
const minutes = totalMinutes % 60;             // 5

// Average
const sum = 78 + 85 + 92;
const average = sum / 3;  // 85

// Percentage
const price = 1250;
const discount = price * 0.20;  // 250 (20%)
const final = price - discount; // 1000
\`\`\``,
            outcomes: [
              'number_types',              // JavaScript has one number type for both integers and decimals
              'addition_subtraction',      // + for adding, - for subtracting
              'multiplication_division',   // * for multiplying, / for dividing
              'modulo_operator',           // % gives the remainder after division
              'operator_precedence',       // * / % happen before + - (like math class)
              'using_parentheses',         // Parentheses force operations to happen first
              'multi_step_calculations'    // Combine multiple operations to solve problems
            ],
            tasks: [
              {
                description: 'A rectangle has length 24 and width 15. Print its area on the first line and perimeter on the second line',
                testCases: [{ input: null, expectedOutput: '360\n78' }]
              },
              {
                description: 'Convert 185 minutes to hours and remaining minutes. Print hours on the first line, remaining minutes on the second line',
                testCases: [{ input: null, expectedOutput: '3\n5' }]
              },
              {
                description: 'Three test scores are 78, 85, and 92. Print their average',
                testCases: [{ input: null, expectedOutput: '85' }]
              },
              {
                description: 'An item costs 1250 with a 20% discount. Print the discount amount on the first line, final price on the second line',
                testCases: [{ input: null, expectedOutput: '250\n1000' }]
              },
              {
                description: 'Given the number 9472, print its last digit on the first line, and the number without the last digit on the second line',
                testCases: [{ input: null, expectedOutput: '2\n947' }]
              },
              {
                description: 'Convert 25 Celsius to Fahrenheit. Formula: (celsius × 9 / 5) + 32. Print the result',
                testCases: [{ input: null, expectedOutput: '77' }]
              },
              {
                description: 'Given two numbers 37 and 58, print their sum, difference, product, and quotient on separate lines (use larger minus smaller for difference, larger divided by smaller for quotient)',
                testCases: [{ input: null, expectedOutput: '95\n21\n2146\n1.5675675675675675' }]
              },
              {
                description: 'Convert 7384 seconds to hours, minutes, and remaining seconds. Print each on separate lines',
                testCases: [{ input: null, expectedOutput: '2\n3\n4' }]
              }
            ]
          },
          {
            id: 'strings-operations',
            title: 'Strings and string operations',
            notes: `## Creating Strings
Text enclosed in quotes (single or double).

\`\`\`javascript
const single = 'Hello';
const double = "World";
const mixed = "It's working";  // Use double when text has apostrophe
\`\`\`

## String Length
\`\`\`javascript
const word = "JavaScript";
console.log(word.length);  // 10
\`\`\`

## Accessing Characters (0-indexed)
\`\`\`javascript
const str = "Hello";
console.log(str[0]);    // "H" (first)
console.log(str[1]);    // "e" (second)
console.log(str[4]);    // "o" (fifth)
console.log(str[str.length - 1]);  // "o" (last)
\`\`\`

## String Concatenation
\`\`\`javascript
const first = "John";
const last = "Smith";
const full = first + " " + last;  // "John Smith"
\`\`\`

## Case Conversion
\`\`\`javascript
const text = "Hello World";
console.log(text.toUpperCase());  // "HELLO WORLD"
console.log(text.toLowerCase());  // "hello world"
\`\`\`

## Practical Examples
\`\`\`javascript
// Get initials
const firstName = "Alice";
const lastName = "Brown";
const initials = firstName[0] + lastName[0];  // "AB"

// Access specific positions
const word = "Programming";
const first3 = word[0] + word[1] + word[2];  // "Pro"

// Middle character (for odd length)
const middle = word[Math.floor(word.length / 2)];
\`\`\`

## Key Points
- Strings are immutable (cannot change individual characters)
- Index starts at 0
- Use \`.length\` for character count
- Use \`+\` to join strings`,
            outcomes: [
              'creating_strings',          // Text in single or double quotes
              'string_length',             // .length property gives number of characters
              'string_indexing',           // Access characters with str[0], str[1], etc. (starts at 0)
              'last_character',            // str[str.length - 1] gets the last character
              'string_concatenation',      // + joins strings together
              'toUpperCase_toLowerCase',   // Convert case with .toUpperCase() and .toLowerCase()
              'combining_operations'       // Chain multiple string operations
            ],
            tasks: [
              {
                description: 'The word is "JavaScript". Print its length, first character, and last character on separate lines',
                testCases: [{ input: null, expectedOutput: '10\nJ\nt' }]
              },
              {
                description: 'First name is "John", last name is "Smith". Print the full name with a space between them',
                testCases: [{ input: null, expectedOutput: 'John Smith' }]
              },
              {
                description: 'The word is "Programming". Print the first 3 characters on one line, last 3 characters on the next line',
                testCases: [{ input: null, expectedOutput: 'Pro\ning' }]
              },
              {
                description: 'The text is "hello world". Print it in uppercase on the first line, lowercase on the second line',
                testCases: [{ input: null, expectedOutput: 'HELLO WORLD\nhello world' }]
              },
              {
                description: 'First name is "Alice", last name is "Brown". Print their initials combined and in uppercase (first character of each name)',
                testCases: [{ input: null, expectedOutput: 'AB' }]
              },
              {
                description: 'The word is "ABCDE". Print each character on a separate line',
                testCases: [{ input: null, expectedOutput: 'A\nB\nC\nD\nE' }]
              },
              {
                description: 'The word is "racecar". Print the first, middle, and last characters separated by dashes on one line',
                testCases: [{ input: null, expectedOutput: 'r-e-r' }]
              },
              {
                description: 'Username is "johnDoe42". Print: its length, its first character in uppercase, and its last character (each on separate lines)',
                testCases: [{ input: null, expectedOutput: '9\nJ\n2' }]
              }
            ]
          },
          {
            id: 'undefined-null',
            title: 'Understanding undefined and null',
            notes: `## undefined
A variable declared but not assigned a value.

\`\`\`javascript
let x;
console.log(x);         // undefined
console.log(typeof x);  // "undefined"
\`\`\`

## null
Intentionally assigned to represent "no value."

\`\`\`javascript
let user = null;        // Deliberately empty
console.log(user);      // null
console.log(typeof user);  // "object" (JS quirk)
\`\`\`

## Key Difference
\`\`\`javascript
// undefined = not assigned yet
let notAssigned;

// null = deliberately empty
let cleared = null;
\`\`\`

## Common Use Cases
\`\`\`javascript
// Reset a variable
let data = 100;
console.log(data);        // 100
console.log(typeof data); // "number"

data = null;              // Clear it intentionally
console.log(data);        // null
console.log(typeof data); // "object"
\`\`\`

## Checking for undefined/null
\`\`\`javascript
let value;
if (value === undefined) {
  console.log("Not assigned");
}

let empty = null;
if (empty === null) {
  console.log("Intentionally empty");
}
\`\`\`

## Key Points
- \`undefined\`: Variable exists but has no value
- \`null\`: Explicitly assigned to mean "nothing"
- \`typeof undefined\` → "undefined"
- \`typeof null\` → "object" (historical bug in JS)`,
            outcomes: [
              'what_is_undefined',         // A declared variable with no value is undefined
              'what_is_null',              // null is intentionally assigned to mean "no value"
              'undefined_vs_null',         // undefined = not assigned, null = deliberately empty
              'typeof_undefined_null'      // typeof undefined is "undefined", typeof null is "object" (JS quirk)
            ],
            tasks: [
              {
                description: 'Declare a variable without assigning any value. Print the variable on the first line, its type (using typeof) on the second line',
                testCases: [{ input: null, expectedOutput: 'undefined\nundefined' }]
              },
              {
                description: 'Create a variable and assign null to it. Print the variable on the first line, its type (using typeof) on the second line',
                testCases: [{ input: null, expectedOutput: 'null\nobject' }]
              },
              {
                description: 'Create a variable with value 100. Print the value and its type. Then reassign it to null and print the value and its type again (4 lines total)',
                testCases: [{ input: null, expectedOutput: '100\nnumber\nnull\nobject' }]
              }
            ]
          }
        ]
      },
      {
        id: 'date-time',
        title: 'Date and Time',
        subtopics: [
          {
            id: 'date-time',
            title: 'Working with dates',
            notes: `## Creating Dates
\`\`\`javascript
// Current date/time
const now = new Date();

// From string
const date1 = new Date("2024-01-15");

// From parts (month is 0-indexed!)
const date2 = new Date(2024, 0, 15);  // Jan 15, 2024
const date3 = new Date(2024, 11, 25); // Dec 25, 2024
\`\`\`

## Getting Date Parts
\`\`\`javascript
const date = new Date("2024-03-15");

date.getFullYear();  // 2024
date.getMonth();     // 2 (March, 0-indexed)
date.getDate();      // 15
date.getDay();       // 5 (Friday, 0=Sunday)
date.getHours();     // hours
date.getMinutes();   // minutes
date.getSeconds();   // seconds
\`\`\`

## Month is 0-Indexed!
\`\`\`javascript
// January = 0, December = 11
const months = ['Jan','Feb','Mar','Apr','May','Jun',
                'Jul','Aug','Sep','Oct','Nov','Dec'];
\`\`\`

## Day of Week
\`\`\`javascript
const days = ['Sunday','Monday','Tuesday','Wednesday',
              'Thursday','Friday','Saturday'];
const dayName = days[date.getDay()];
\`\`\`

## Date Calculations
\`\`\`javascript
// Days between dates
const date1 = new Date("2024-01-01");
const date2 = new Date("2024-01-10");
const diffMs = date2 - date1;
const diffDays = diffMs / (1000 * 60 * 60 * 24);  // 9

// Add days
const future = new Date(date1);
future.setDate(future.getDate() + 10);
\`\`\`

## Formatting
\`\`\`javascript
const date = new Date("2024-03-15");
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0');
const day = String(date.getDate()).padStart(2, '0');
const formatted = \`\${year}-\${month}-\${day}\`;  // "2024-03-15"
\`\`\`

## Leap Year Check
\`\`\`javascript
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}
\`\`\``,
            outcomes: [
              'what_is_date_object',          // Date object represents a single moment in time
              'creating_date_now',            // new Date() creates current date/time
              'creating_date_string',         // new Date("2024-01-15") from date string
              'creating_date_parts',          // new Date(year, month, day, hour, min, sec) - month is 0-indexed
              'get_methods',                  // getFullYear(), getMonth(), getDate(), getDay(), getHours(), getMinutes(), getSeconds()
              'set_methods',                  // setFullYear(), setMonth(), setDate(), setHours(), etc. to modify date
              'month_zero_indexed',           // January is 0, December is 11
              'getDay_returns_weekday',       // getDay() returns 0-6 (Sunday to Saturday)
              'getTime_timestamp',            // getTime() returns milliseconds since Jan 1, 1970
              'date_comparison',              // Compare dates using getTime() or comparison operators
              'date_arithmetic',              // Add/subtract by manipulating milliseconds or using set methods
              'toISOString_toLocaleDateString' // Formatting methods for output
            ],
            tasks: [
              {
                description: 'Create a function that takes year, month (1-12), day and returns formatted as "YYYY-MM-DD"',
                testCases: [
                  { input: [2024, 1, 15], expectedOutput: '2024-01-15' },
                  { input: [2023, 12, 25], expectedOutput: '2023-12-25' },
                  { input: [2000, 6, 1], expectedOutput: '2000-06-01' },
                  { input: [1999, 10, 31], expectedOutput: '1999-10-31' },
                  { input: [2024, 2, 29], expectedOutput: '2024-02-29' }
                ]
              },
              {
                description: 'Create a function that takes a date string and returns the day of the week (Sunday, Monday, etc.)',
                testCases: [
                  { input: ['2024-01-01'], expectedOutput: 'Monday' },
                  { input: ['2024-01-07'], expectedOutput: 'Sunday' },
                  { input: ['2024-12-25'], expectedOutput: 'Wednesday' },
                  { input: ['2000-01-01'], expectedOutput: 'Saturday' },
                  { input: ['2024-07-04'], expectedOutput: 'Thursday' }
                ]
              },
              {
                description: 'Create a function that calculates the number of days between two date strings',
                testCases: [
                  { input: ['2024-01-01', '2024-01-10'], expectedOutput: '9' },
                  { input: ['2024-01-01', '2024-01-01'], expectedOutput: '0' },
                  { input: ['2024-01-01', '2024-02-01'], expectedOutput: '31' },
                  { input: ['2024-01-10', '2024-01-01'], expectedOutput: '9' },
                  { input: ['2023-12-25', '2024-01-01'], expectedOutput: '7' }
                ]
              },
              {
                description: 'Create a function that adds a given number of days to a date string and returns the new date as "YYYY-MM-DD"',
                testCases: [
                  { input: ['2024-01-01', 10], expectedOutput: '2024-01-11' },
                  { input: ['2024-01-31', 1], expectedOutput: '2024-02-01' },
                  { input: ['2024-12-31', 1], expectedOutput: '2025-01-01' },
                  { input: ['2024-02-28', 1], expectedOutput: '2024-02-29' },
                  { input: ['2024-01-15', 0], expectedOutput: '2024-01-15' }
                ]
              },
              {
                description: 'Create a function that checks if a given year is a leap year',
                testCases: [
                  { input: [2024], expectedOutput: 'true' },
                  { input: [2023], expectedOutput: 'false' },
                  { input: [2000], expectedOutput: 'true' },
                  { input: [1900], expectedOutput: 'false' },
                  { input: [2020], expectedOutput: 'true' }
                ]
              },
              {
                description: 'Create a function that returns the number of days in a given month (1-12) and year',
                testCases: [
                  { input: [2024, 2], expectedOutput: '29' },
                  { input: [2023, 2], expectedOutput: '28' },
                  { input: [2024, 1], expectedOutput: '31' },
                  { input: [2024, 4], expectedOutput: '30' },
                  { input: [2024, 12], expectedOutput: '31' }
                ]
              },
              {
                description: 'Create a function that takes two date strings and returns which one is earlier (return the earlier date string)',
                testCases: [
                  { input: ['2024-01-15', '2024-01-10'], expectedOutput: '2024-01-10' },
                  { input: ['2023-06-01', '2024-01-01'], expectedOutput: '2023-06-01' },
                  { input: ['2024-12-31', '2024-01-01'], expectedOutput: '2024-01-01' },
                  { input: ['2020-01-01', '2020-01-01'], expectedOutput: '2020-01-01' },
                  { input: ['1999-12-31', '2000-01-01'], expectedOutput: '1999-12-31' }
                ]
              },
              {
                description: 'Create a function that extracts year, month, and day from a date string and returns as "Day: X, Month: Y, Year: Z"',
                testCases: [
                  { input: ['2024-03-15'], expectedOutput: 'Day: 15, Month: 3, Year: 2024' },
                  { input: ['2000-01-01'], expectedOutput: 'Day: 1, Month: 1, Year: 2000' },
                  { input: ['1999-12-31'], expectedOutput: 'Day: 31, Month: 12, Year: 1999' },
                  { input: ['2024-07-04'], expectedOutput: 'Day: 4, Month: 7, Year: 2024' },
                  { input: ['2024-11-28'], expectedOutput: 'Day: 28, Month: 11, Year: 2024' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'type-coercion',
        title: 'Type Coercion',
        subtopics: [
          {
            id: 'type-coercion',
            title: 'Type conversion in JavaScript',
            notes: `## What is Type Coercion?
Automatic or manual conversion between types (string, number, boolean).

## Explicit Conversion (You Control It)
\`\`\`javascript
// To String
String(123);        // "123"
String(true);       // "true"
(123).toString();   // "123"

// To Number
Number("123");      // 123
Number("abc");      // NaN
parseInt("42px");   // 42
parseFloat("3.14"); // 3.14

// To Boolean
Boolean(1);         // true
Boolean(0);         // false
Boolean("");        // false
Boolean("hello");   // true
\`\`\`

## Truthy and Falsy Values
\`\`\`javascript
// Falsy (convert to false)
false, 0, "", null, undefined, NaN

// Truthy (everything else)
true, 1, "hello", [], {}, -1, "0"
\`\`\`

## Implicit Coercion (Automatic)
\`\`\`javascript
// + with string concatenates
"5" + 3;      // "53" (string)
5 + "3";      // "53" (string)

// Other operators convert to number
"5" - 3;      // 2 (number)
"5" * 2;      // 10 (number)
"10" / 2;     // 5 (number)
\`\`\`

## Equality Comparison
\`\`\`javascript
// == allows coercion (avoid!)
5 == "5";     // true
0 == false;   // true
null == undefined;  // true

// === strict equality (use this!)
5 === "5";    // false
0 === false;  // false
\`\`\`

## NaN (Not a Number)
\`\`\`javascript
Number("abc");     // NaN
NaN === NaN;       // false (!)
isNaN(NaN);        // true
Number.isNaN(NaN); // true (safer)
\`\`\`

## Best Practices
\`\`\`javascript
// Always use explicit conversion
const num = Number(userInput);
const str = String(value);

// Always use strict equality
if (value === 5) { }

// Check for NaN properly
if (Number.isNaN(result)) { }
\`\`\``,
            outcomes: [
              'what_is_coercion',            // Automatic type conversion when operators/functions expect different types
              'implicit_vs_explicit',        // Implicit happens automatically; explicit is done intentionally by developer
              'string_coercion',             // String() or + "" converts to string; toString() method
              'number_coercion',             // Number(), parseInt(), parseFloat(), or unary + converts to number
              'boolean_coercion',            // Boolean() or !! converts to boolean
              'truthy_falsy',                // Falsy: false, 0, "", null, undefined, NaN; everything else is truthy
              'equality_coercion',           // == allows coercion, === does not (strict equality)
              'plus_operator_coercion',      // + with string converts other operand to string; with numbers adds
              'other_operators_coercion',    // -, *, /, % convert operands to numbers
              'comparison_coercion',         // <, >, <=, >= convert to numbers (except string-string comparison)
              'NaN_behavior',                // NaN from failed number conversion; NaN !== NaN
              'avoid_implicit_coercion'      // Prefer explicit conversion for clarity and fewer bugs
            ],
            tasks: [
              {
                description: 'Create a function that converts any value to a string using explicit conversion',
                testCases: [
                  { input: [123], expectedOutput: '123' },
                  { input: [true], expectedOutput: 'true' },
                  { input: [null], expectedOutput: 'null' },
                  { input: [undefined], expectedOutput: 'undefined' },
                  { input: [[1, 2, 3]], expectedOutput: '1,2,3' }
                ]
              },
              {
                description: 'Create a function that converts a string to a number, returning 0 if conversion fails',
                testCases: [
                  { input: ['123'], expectedOutput: '123' },
                  { input: ['45.67'], expectedOutput: '45.67' },
                  { input: ['abc'], expectedOutput: '0' },
                  { input: [''], expectedOutput: '0' },
                  { input: ['  42  '], expectedOutput: '42' }
                ]
              },
              {
                description: 'Create a function that returns whether a value is truthy or falsy (return "truthy" or "falsy")',
                testCases: [
                  { input: [0], expectedOutput: 'falsy' },
                  { input: [''], expectedOutput: 'falsy' },
                  { input: [null], expectedOutput: 'falsy' },
                  { input: ['hello'], expectedOutput: 'truthy' },
                  { input: [1], expectedOutput: 'truthy' }
                ]
              },
              {
                description: 'Create a function that compares two values using strict equality (===) and returns true/false',
                testCases: [
                  { input: [5, '5'], expectedOutput: 'false' },
                  { input: [5, 5], expectedOutput: 'true' },
                  { input: [null, undefined], expectedOutput: 'false' },
                  { input: [true, 1], expectedOutput: 'false' },
                  { input: ['hello', 'hello'], expectedOutput: 'true' }
                ]
              },
              {
                description: 'Create a function that demonstrates + operator behavior: if either is string, concatenate; otherwise add',
                testCases: [
                  { input: [5, '3'], expectedOutput: '53' },
                  { input: [5, 3], expectedOutput: '8' },
                  { input: ['hello', 'world'], expectedOutput: 'helloworld' },
                  { input: ['', 5], expectedOutput: '5' },
                  { input: [true, 1], expectedOutput: '2' }
                ]
              },
              {
                description: 'Create a function that safely parses an integer from a string, returning null if invalid',
                testCases: [
                  { input: ['42'], expectedOutput: '42' },
                  { input: ['42px'], expectedOutput: '42' },
                  { input: ['abc'], expectedOutput: 'null' },
                  { input: ['3.14'], expectedOutput: '3' },
                  { input: [''], expectedOutput: 'null' }
                ]
              },
              {
                description: 'Create a function that counts how many truthy values are in an array',
                testCases: [
                  { input: [[1, 0, 'hello', '', null, true]], expectedOutput: '3' },
                  { input: [[false, 0, '', null, undefined]], expectedOutput: '0' },
                  { input: [[1, 2, 3]], expectedOutput: '3' },
                  { input: [[]], expectedOutput: '0' },
                  { input: [['', 0, false, 'a']], expectedOutput: '1' }
                ]
              },
              {
                description: 'Create a function that converts a value to boolean and returns "yes" if true, "no" if false',
                testCases: [
                  { input: [1], expectedOutput: 'yes' },
                  { input: [0], expectedOutput: 'no' },
                  { input: ['text'], expectedOutput: 'yes' },
                  { input: [''], expectedOutput: 'no' },
                  { input: [null], expectedOutput: 'no' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'math-object',
        title: 'Math Object',
        subtopics: [
          {
            id: 'math-object',
            title: 'Built-in math utilities',
            notes: `## Math Object
Built-in object with mathematical functions and constants.

## Rounding
\`\`\`javascript
Math.round(4.5);   // 5 (nearest integer)
Math.round(4.4);   // 4

Math.floor(4.9);   // 4 (round down)
Math.ceil(4.1);    // 5 (round up)
Math.trunc(4.9);   // 4 (remove decimal, no rounding)
Math.trunc(-4.9);  // -4
\`\`\`

## Absolute Value
\`\`\`javascript
Math.abs(-15);     // 15
Math.abs(15);      // 15
\`\`\`

## Power and Square Root
\`\`\`javascript
Math.pow(2, 8);    // 256 (2^8)
Math.sqrt(144);    // 12
Math.sqrt(2);      // 1.4142...
\`\`\`

## Min and Max
\`\`\`javascript
Math.min(5, 3, 9, 1);  // 1
Math.max(5, 3, 9, 1);  // 9

// With array (use spread)
const nums = [5, 3, 9, 1];
Math.min(...nums);     // 1
Math.max(...nums);     // 9
\`\`\`

## Random Numbers
\`\`\`javascript
Math.random();         // 0 to 0.999...

// Random integer 0 to 9
Math.floor(Math.random() * 10);

// Random integer 1 to 10
Math.floor(Math.random() * 10) + 1;

// Random integer min to max
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
\`\`\`

## Constants
\`\`\`javascript
Math.PI;     // 3.14159...
Math.E;      // 2.71828... (Euler's number)
\`\`\`

## Practical Examples
\`\`\`javascript
// Circle area
const radius = 7;
const area = Math.PI * Math.pow(radius, 2);  // 153.938...

// Round to 2 decimal places
const rounded = Math.round(area * 100) / 100;  // 153.94
\`\`\``,
            outcomes: [
              'what_is_math_object',        // Math is a built-in object with mathematical functions and constants
              'math_round',                 // Math.round() rounds to nearest integer
              'math_floor_ceil',            // Math.floor() rounds down, Math.ceil() rounds up
              'math_trunc',                 // Math.trunc() removes decimal part (no rounding)
              'math_abs',                   // Math.abs() returns absolute value (positive)
              'math_pow_sqrt',              // Math.pow(base, exp) for power, Math.sqrt() for square root
              'math_min_max',               // Math.min(...values) and Math.max(...values) find extremes
              'math_random',                // Math.random() returns decimal between 0 (inclusive) and 1 (exclusive)
              'random_range',               // Math.floor(Math.random() * range) + min for random integers
              'math_constants'              // Math.PI, Math.E for mathematical constants
            ],
            tasks: [
              {
                description: 'The number is 7.6. Print the result of rounding it normally, rounding down, and rounding up (each on a separate line)',
                testCases: [{ input: null, expectedOutput: '8\n7\n8' }]
              },
              {
                description: 'The number is -15. Print its absolute value',
                testCases: [{ input: null, expectedOutput: '15' }]
              },
              {
                description: 'Calculate and print 2 raised to the power of 8',
                testCases: [{ input: null, expectedOutput: '256' }]
              },
              {
                description: 'The number is 144. Print its square root',
                testCases: [{ input: null, expectedOutput: '12' }]
              },
              {
                description: 'Given the numbers 45, 12, 78, 23, 56, print the minimum on the first line and maximum on the second line',
                testCases: [{ input: null, expectedOutput: '12\n78' }]
              },
              {
                description: 'The decimal number is 9.87. Print the result of truncating it (removing decimal without rounding)',
                testCases: [{ input: null, expectedOutput: '9' }]
              },
              {
                description: 'Calculate the area of a circle with radius 7. Use Math.PI. Print the result rounded to 2 decimal places (multiply by 100, round, divide by 100)',
                testCases: [{ input: null, expectedOutput: '153.94' }]
              },
              {
                description: 'Print the value of Math.PI rounded to 4 decimal places',
                testCases: [{ input: null, expectedOutput: '3.1416' }]
              }
            ]
          }
        ]
      },
      {
        id: 'operators',
        title: 'Operators',
        subtopics: [
          {
            id: 'operators',
            title: 'Operators',
            notes: `## Increment and Decrement
\`\`\`javascript
let count = 5;
count++;        // 6 (add 1)
count--;        // 5 (subtract 1)
\`\`\`

## Compound Assignment
\`\`\`javascript
let x = 10;
x += 5;         // x = x + 5 → 15
x -= 3;         // x = x - 3 → 12
x *= 2;         // x = x * 2 → 24
x /= 4;         // x = x / 4 → 6
x %= 4;         // x = x % 4 → 2
\`\`\`

## Comparison Operators
\`\`\`javascript
5 > 3;          // true (greater than)
5 < 3;          // false (less than)
5 >= 5;         // true (greater or equal)
5 <= 4;         // false (less or equal)
5 === 5;        // true (strict equal)
5 !== 3;        // true (strict not equal)
\`\`\`

## Logical Operators
\`\`\`javascript
// AND (&&) - both must be true
true && true;   // true
true && false;  // false

// OR (||) - at least one true
true || false;  // true
false || false; // false

// NOT (!) - flip the value
!true;          // false
!false;         // true
\`\`\`

## Combining Conditions
\`\`\`javascript
const age = 25;
const hasLicense = true;

// Check multiple conditions
const canDrive = age >= 18 && hasLicense;  // true

const isWeekend = false;
const isHoliday = true;
const dayOff = isWeekend || isHoliday;     // true
\`\`\`

## Practical Example
\`\`\`javascript
// Loan eligibility
const age = 28;
const income = 55000;
const creditScore = 720;

const ageOk = age >= 21 && age <= 60;      // true
const incomeOk = income >= 30000;           // true
const creditOk = creditScore >= 700;        // true
const eligible = ageOk && incomeOk && creditOk;  // true
\`\`\``,
            outcomes: [
              'increment_decrement',       // ++ and -- add/subtract 1
              'compound_assignment',       // +=, -=, *=, /=, %= modify and reassign
              'boolean_type',              // true and false are the only boolean values
              'negation',                  // ! flips boolean values
              'relational_operators',      // >, <, >=, <= compare values
              'equality_operators',        // === and !== for strict comparison
              'comparisons_return_boolean', // All comparisons produce true or false
              'and_operator',              // && requires BOTH to be true
              'or_operator',               // || requires at least ONE to be true
              'combining_conditions'       // Build complex conditions
            ],
            tasks: [
              {
                description: 'A game score starts at 0. Player earns 100, then earns 50 more, then loses 30, then doubles their score. Print the final score',
                testCases: [{ input: null, expectedOutput: '240' }]
              },
              {
                description: 'Check loan eligibility. Age is 28, income is 55000, credit score is 720. Requirements: age between 21-60, income >= 30000, credit >= 700. Print whether each requirement passes (3 lines), then whether ALL pass',
                testCases: [{ input: null, expectedOutput: 'true\ntrue\ntrue\ntrue' }]
              },
              {
                description: 'Movie ticket: customer age is 15. Child discount is age < 12, senior discount is age >= 65, regular price is neither. Print whether each applies (3 lines: child, senior, regular)',
                testCases: [{ input: null, expectedOutput: 'false\nfalse\ntrue' }]
              },
              {
                description: 'Analyze the number 156. Print whether it is positive, whether it is even, whether it is a three-digit number (100-999), and whether ALL three are true (4 lines)',
                testCases: [{ input: null, expectedOutput: 'true\ntrue\ntrue\ntrue' }]
              }
            ]
          }
        ]
      },
      {
        id: 'conditionals',
        title: 'Conditional Logic',
        subtopics: [
          {
            id: 'if-statements',
            title: 'if statements',
            notes: `## Basic if Statement
Executes code only when condition is true.

\`\`\`javascript
if (condition) {
  // Code runs only if condition is true
}
\`\`\`

## Examples
\`\`\`javascript
const age = 18;

if (age >= 18) {
  console.log("You are an adult");
}

const score = 85;
if (score >= 60) {
  console.log("You passed!");
}
\`\`\`

## Multiple Conditions
\`\`\`javascript
const age = 25;
const hasID = true;

if (age >= 18 && hasID) {
  console.log("Entry allowed");
}
\`\`\`

## Key Points
- Condition must evaluate to true/false
- Code block uses curly braces \`{ }\`
- If condition is false, code is skipped`,
            outcomes: [
              'if_syntax',              // if (condition) { code } structure
              'code_block',             // Curly braces {} group statements together
              'condition_evaluation',   // Condition evaluates to true or false
              'truthy_execution'        // Code inside if runs only when condition is true
            ],
            tasks: [
              {
                description: 'The number is 42. If it equals 42, print "The answer"',
                testCases: [{ input: null, expectedOutput: 'The answer' }]
              },
              {
                description: 'The number is 15. If it is divisible by 5 (remainder is 0), print "Multiple of 5"',
                testCases: [{ input: null, expectedOutput: 'Multiple of 5' }]
              },
              {
                description: 'Age is 25 and hasID is true. If age >= 18 AND hasID is true, print "Entry allowed"',
                testCases: [{ input: null, expectedOutput: 'Entry allowed' }]
              }
            ]
          },
          {
            id: 'if-else',
            title: 'if-else statements',
            notes: `## if-else Statement
Choose between two paths - one or the other.

\`\`\`javascript
if (condition) {
  // Runs when true
} else {
  // Runs when false
}
\`\`\`

## Examples
\`\`\`javascript
const number = 17;

if (number % 2 === 0) {
  console.log("Even");
} else {
  console.log("Odd");
}
// Output: "Odd"

const score = 58;
if (score >= 60) {
  console.log("Pass");
} else {
  console.log("Fail");
}
// Output: "Fail"
\`\`\`

## Practical Example
\`\`\`javascript
const balance = 500;
const withdrawal = 300;

if (balance >= withdrawal) {
  const remaining = balance - withdrawal;
  console.log(remaining);  // 200
} else {
  console.log("Insufficient funds");
}
\`\`\`

## Key Points
- Exactly ONE branch executes
- if and else are mutually exclusive`,
            outcomes: [
              'else_block',             // else { code } runs when if condition is false
              'two_way_decision',       // Exactly one branch executes: either if or else
              'mutually_exclusive'      // if and else blocks never both run
            ],
            tasks: [
              {
                description: 'The number is 17. Print "Even" if divisible by 2, otherwise print "Odd"',
                testCases: [{ input: null, expectedOutput: 'Odd' }]
              },
              {
                description: 'Score is 58. Print "Pass" if 60 or above, otherwise print "Fail"',
                testCases: [{ input: null, expectedOutput: 'Fail' }]
              },
              {
                description: 'Balance is 500, withdrawal is 300. If balance covers the withdrawal, print remaining balance. Otherwise print "Insufficient funds"',
                testCases: [{ input: null, expectedOutput: '200' }]
              }
            ]
          },
          {
            id: 'else-if-chains',
            title: 'else-if chains',
            notes: `## else-if Chains
Check multiple conditions in sequence.

\`\`\`javascript
if (condition1) {
  // First check
} else if (condition2) {
  // Second check
} else if (condition3) {
  // Third check
} else {
  // Default (none matched)
}
\`\`\`

## Grade Example
\`\`\`javascript
const score = 73;

if (score >= 90) {
  console.log("A");
} else if (score >= 80) {
  console.log("B");
} else if (score >= 70) {
  console.log("C");
} else if (score >= 60) {
  console.log("D");
} else {
  console.log("F");
}
// Output: "C"
\`\`\`

## Age Category Example
\`\`\`javascript
const age = 45;

if (age < 13) {
  console.log("Child");
} else if (age < 20) {
  console.log("Teen");
} else if (age < 60) {
  console.log("Adult");
} else {
  console.log("Senior");
}
// Output: "Adult"
\`\`\`

## Key Points
- Order matters! First true condition wins
- Only ONE branch executes
- Final \`else\` is optional (catches everything else)`,
            outcomes: [
              'else_if_syntax',         // else if (condition) adds more conditions to check
              'multiple_conditions',    // Check conditions in sequence, first true wins
              'final_else',             // Optional else at end catches all remaining cases
              'order_matters'           // Conditions checked top to bottom, order affects result
            ],
            tasks: [
              {
                description: 'Score is 73. Print the grade: A (90+), B (80-89), C (70-79), D (60-69), F (below 60)',
                testCases: [{ input: null, expectedOutput: 'C' }]
              },
              {
                description: 'Age is 45. Print the category: Child (0-12), Teen (13-19), Adult (20-59), Senior (60+)',
                testCases: [{ input: null, expectedOutput: 'Adult' }]
              },
              {
                description: 'Temperature is 28°C. Print: Freezing (below 0), Cold (0-14), Warm (15-29), Hot (30+)',
                testCases: [{ input: null, expectedOutput: 'Warm' }]
              },
              {
                description: 'Hour is 14 (24-hour format). Print greeting: Good morning (5-11), Good afternoon (12-17), Good evening (18-21), Good night (others)',
                testCases: [{ input: null, expectedOutput: 'Good afternoon' }]
              }
            ]
          },
          {
            id: 'nested-conditions',
            title: 'Nested conditions',
            notes: `## Nested if Statements
Place if statements inside other if/else blocks.

\`\`\`javascript
if (outerCondition) {
  if (innerCondition) {
    // Both conditions true
  } else {
    // Outer true, inner false
  }
} else {
  // Outer false
}
\`\`\`

## Login Example
\`\`\`javascript
const userExists = true;
const passwordCorrect = true;

if (userExists) {
  if (passwordCorrect) {
    console.log("Login successful");
  } else {
    console.log("Wrong password");
  }
} else {
  console.log("User not found");
}
\`\`\`

## Driving Check
\`\`\`javascript
const age = 25;
const hasLicense = true;

if (age >= 18) {
  if (hasLicense) {
    console.log("Can drive");
  } else {
    console.log("Need license");
  }
} else {
  console.log("Too young");
}
\`\`\`

## Number Classification
\`\`\`javascript
const number = -15;

if (number >= 0) {
  if (number % 2 === 0) {
    console.log("Positive Even");
  } else {
    console.log("Positive Odd");
  }
} else {
  if (number % 2 === 0) {
    console.log("Negative Even");
  } else {
    console.log("Negative Odd");
  }
}
// Output: "Negative Odd"
\`\`\`

## Key Points
- Outer condition checked first
- Inner only checked if outer is true
- Keep nesting shallow for readability`,
            outcomes: [
              'nested_if',              // Place if statements inside other if/else blocks
              'inner_outer_flow',       // Outer condition must be true for inner to be checked
              'complex_logic'           // Break complex decisions into simpler nested steps
            ],
            tasks: [
              {
                description: 'Login check: userExists is true, passwordCorrect is true. First check if user exists, then check password. Print "Login successful", "Wrong password", or "User not found"',
                testCases: [{ input: null, expectedOutput: 'Login successful' }]
              },
              {
                description: 'Driving check: age is 25, hasLicense is true. First check if age >= 18, then check license. Print "Can drive", "Need license", or "Too young"',
                testCases: [{ input: null, expectedOutput: 'Can drive' }]
              },
              {
                description: 'Number is -15. First check if positive or negative, then check even or odd. Print the combined result (e.g., "Positive Even", "Negative Odd")',
                testCases: [{ input: null, expectedOutput: 'Negative Odd' }]
              }
            ]
          }
        ]
      },
      {
        id: 'loops',
        title: 'Loops',
        subtopics: [
          {
            id: 'while-loops',
            title: 'while loops',
            notes: `## while Loop
Repeats while condition is true.

\`\`\`javascript
while (condition) {
  // Code repeats while condition is true
  // Must update something to eventually exit!
}
\`\`\`

## Counter Pattern
\`\`\`javascript
let i = 1;
while (i <= 5) {
  console.log(i);  // 1, 2, 3, 4, 5
  i++;
}
\`\`\`

## Sum Example
\`\`\`javascript
let sum = 0;
let i = 1;
while (i <= 10) {
  sum += i;  // Add current number to sum
  i++;
}
console.log(sum);  // 55
\`\`\`

## Doubling Until Threshold
\`\`\`javascript
let value = 5;
while (value <= 100) {
  console.log(value);  // 5, 10, 20, 40, 80, 160
  value *= 2;
}
\`\`\`

## Multiplication Table
\`\`\`javascript
const num = 7;
let i = 1;
while (i <= 10) {
  console.log(num * i);  // 7, 14, 21... 70
  i++;
}
\`\`\`

## Key Points
- Condition checked BEFORE each iteration
- Loop body must change something to avoid infinite loop
- Use when number of iterations is unknown`,
            outcomes: [
              'while_syntax',           // while (condition) { code } repeats while true
              'loop_condition',         // Condition checked before each iteration
              'counter_pattern',        // Common: initialize, check, update pattern
              'loop_termination',       // Something must change to eventually exit
              'infinite_loop_risk'      // Loop runs forever if condition never becomes false
            ],
            tasks: [
              {
                description: 'Print numbers from 1 to 10, each on a new line',
                testCases: [{ input: null, expectedOutput: '1\n2\n3\n4\n5\n6\n7\n8\n9\n10' }]
              },
              {
                description: 'Start with 5. Keep doubling and printing until the value exceeds 100',
                testCases: [{ input: null, expectedOutput: '5\n10\n20\n40\n80\n160' }]
              },
              {
                description: 'Calculate and print the sum of all numbers from 1 to 50',
                testCases: [{ input: null, expectedOutput: '1275' }]
              },
              {
                description: 'Print the multiplication results of 7 (7×1 through 7×10), each result on a new line',
                testCases: [{ input: null, expectedOutput: '7\n14\n21\n28\n35\n42\n49\n56\n63\n70' }]
              }
            ]
          },
          {
            id: 'for-loops',
            title: 'for loops',
            notes: `## for Loop
Compact loop with initialization, condition, and update.

\`\`\`javascript
for (init; condition; update) {
  // Code runs for each iteration
}
\`\`\`

## Basic Example
\`\`\`javascript
for (let i = 1; i <= 5; i++) {
  console.log(i);  // 1, 2, 3, 4, 5
}
\`\`\`

## Even Numbers
\`\`\`javascript
for (let i = 2; i <= 20; i += 2) {
  console.log(i);  // 2, 4, 6, 8... 20
}
\`\`\`

## Countdown
\`\`\`javascript
for (let i = 10; i >= 1; i--) {
  console.log(i);  // 10, 9, 8... 1
}
\`\`\`

## Factorial
\`\`\`javascript
let factorial = 1;
for (let i = 1; i <= 6; i++) {
  factorial *= i;
}
console.log(factorial);  // 720 (6!)
\`\`\`

## Sum of Odd Numbers
\`\`\`javascript
let sum = 0;
for (let i = 1; i <= 100; i += 2) {
  sum += i;
}
console.log(sum);  // 2500
\`\`\`

## Key Points
- \`init\`: runs once before loop starts
- \`condition\`: checked before each iteration
- \`update\`: runs after each iteration
- Preferred when iterations are known`,
            outcomes: [
              'for_syntax',             // for (init; condition; update) { code }
              'initialization',         // First part runs once before loop starts
              'condition_check',        // Second part checked before each iteration
              'update_expression',      // Third part runs after each iteration
              'for_vs_while'            // for preferred when iterations are known
            ],
            tasks: [
              {
                description: 'Print all even numbers from 2 to 20, each on a new line',
                testCases: [{ input: null, expectedOutput: '2\n4\n6\n8\n10\n12\n14\n16\n18\n20' }]
              },
              {
                description: 'Calculate and print 6 factorial (6! = 6 × 5 × 4 × 3 × 2 × 1)',
                testCases: [{ input: null, expectedOutput: '720' }]
              },
              {
                description: 'Print a countdown from 20 to 1, each number on a new line',
                testCases: [{ input: null, expectedOutput: '20\n19\n18\n17\n16\n15\n14\n13\n12\n11\n10\n9\n8\n7\n6\n5\n4\n3\n2\n1' }]
              },
              {
                description: 'Calculate and print the sum of all odd numbers from 1 to 100',
                testCases: [{ input: null, expectedOutput: '2500' }]
              }
            ]
          },
          {
            id: 'loop-control',
            title: 'Loop control (break, continue)',
            notes: `## break Statement
Immediately exits the entire loop.

\`\`\`javascript
for (let i = 1; i <= 100; i++) {
  if (i === 5) {
    break;  // Exit loop at 5
  }
  console.log(i);  // 1, 2, 3, 4
}
\`\`\`

## continue Statement
Skips to next iteration.

\`\`\`javascript
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    continue;  // Skip 3
  }
  console.log(i);  // 1, 2, 4, 5
}
\`\`\`

## Find First Match (break)
\`\`\`javascript
// Find first number divisible by 7 between 50-100
for (let i = 50; i <= 100; i++) {
  if (i % 7 === 0) {
    console.log(i);  // 56
    break;
  }
}
\`\`\`

## Skip Multiples (continue)
\`\`\`javascript
// Print 1-30, skip multiples of 4
for (let i = 1; i <= 30; i++) {
  if (i % 4 === 0) {
    continue;
  }
  console.log(i);
}
\`\`\`

## Sum Until Threshold
\`\`\`javascript
let sum = 0;
let count = 0;

for (let i = 1; i <= 100; i++) {
  sum += i;
  count++;
  if (sum > 200) {
    break;
  }
}
console.log(sum);    // 210
console.log(count);  // 20
\`\`\`

## Key Points
- \`break\`: exit loop completely
- \`continue\`: skip to next iteration
- Use \`break\` when you've found what you need
- Use \`continue\` to skip specific values`,
            outcomes: [
              'break_statement',        // break immediately exits the entire loop
              'continue_statement',     // continue skips to next iteration
              'early_termination',      // Use break when target found
              'skip_iterations'         // Use continue to skip specific values
            ],
            tasks: [
              {
                description: 'Find the first number between 50 and 100 that is divisible by 7. Print it and stop searching',
                testCases: [{ input: null, expectedOutput: '56' }]
              },
              {
                description: 'Print numbers from 1 to 30, but skip all multiples of 4',
                testCases: [{ input: null, expectedOutput: '1\n2\n3\n5\n6\n7\n9\n10\n11\n13\n14\n15\n17\n18\n19\n21\n22\n23\n25\n26\n27\n29\n30' }]
              },
              {
                description: 'Add numbers starting from 1 until the sum exceeds 200. Print the final sum, then print how many numbers were added',
                testCases: [{ input: null, expectedOutput: '210\n20' }]
              }
            ]
          },
          {
            id: 'nested-loops',
            title: 'Nested loops',
            notes: `## Nested Loops
A loop inside another loop.

\`\`\`javascript
for (let outer = 1; outer <= 3; outer++) {
  for (let inner = 1; inner <= 2; inner++) {
    console.log(outer, inner);
  }
}
// Output: (1,1) (1,2) (2,1) (2,2) (3,1) (3,2)
\`\`\`

## Triangle Pattern
\`\`\`javascript
for (let row = 1; row <= 5; row++) {
  let stars = "";
  for (let col = 1; col <= row; col++) {
    stars += "*";
  }
  console.log(stars);
}
// *
// **
// ***
// ****
// *****
\`\`\`

## Multiplication Grid
\`\`\`javascript
for (let row = 1; row <= 4; row++) {
  let line = "";
  for (let col = 1; col <= 6; col++) {
    line += (row * col) + " ";
  }
  console.log(line);
}
// 1 2 3 4 5 6
// 2 4 6 8 10 12
// 3 6 9 12 15 18
// 4 8 12 16 20 24
\`\`\`

## Coordinate Pairs
\`\`\`javascript
for (let row = 1; row <= 3; row++) {
  for (let col = 1; col <= 4; col++) {
    console.log(\`\${row},\${col}\`);
  }
}
// 1,1  1,2  1,3  1,4
// 2,1  2,2  2,3  2,4
// 3,1  3,2  3,3  3,4
\`\`\`

## Key Points
- Inner loop completes fully for each outer iteration
- Total iterations = outer × inner
- Useful for grids, patterns, 2D data`,
            outcomes: [
              'nested_loop_syntax',     // Place one loop inside another
              'inner_outer_execution',  // Inner loop completes fully for each outer iteration
              'total_iterations',       // Total = outer × inner iterations
              'pattern_printing'        // Nested loops useful for 2D patterns/grids
            ],
            tasks: [
              {
                description: 'Print a right triangle of asterisks with 5 rows. Row 1 has 1 star, row 2 has 2 stars, and so on',
                testCases: [{ input: null, expectedOutput: '*\n**\n***\n****\n*****' }]
              },
              {
                description: 'Print a grid with 4 rows and 6 columns. Each cell shows row × column, columns separated by spaces',
                testCases: [{ input: null, expectedOutput: '1 2 3 4 5 6\n2 4 6 8 10 12\n3 6 9 12 15 18\n4 8 12 16 20 24' }]
              },
              {
                description: 'Print all coordinate pairs where row goes 1 to 3 and column goes 1 to 4. Format: "row,column" each on a new line',
                testCases: [{ input: null, expectedOutput: '1,1\n1,2\n1,3\n1,4\n2,1\n2,2\n2,3\n2,4\n3,1\n3,2\n3,3\n3,4' }]
              }
            ]
          }
        ]
      },
      {
        id: 'arrays',
        title: 'Arrays',
        subtopics: [
          {
            id: 'arrays',
            title: 'Arrays',
            notes: `## Creating Arrays
Store multiple values in a single variable.

\`\`\`javascript
const numbers = [10, 25, 8, 17, 42];
const names = ["Alice", "Bob", "Charlie"];
const mixed = [1, "hello", true];
const empty = [];
\`\`\`

## Accessing Elements (0-indexed)
\`\`\`javascript
const arr = [10, 20, 30, 40];
arr[0];              // 10 (first)
arr[2];              // 30 (third)
arr[arr.length - 1]; // 40 (last)
\`\`\`

## Array Length
\`\`\`javascript
const arr = [1, 2, 3, 4, 5];
arr.length;  // 5
\`\`\`

## Modifying Elements
\`\`\`javascript
const arr = [1, 2, 3];
arr[1] = 99;  // [1, 99, 3]
\`\`\`

## Iterating with Loops
\`\`\`javascript
const nums = [4, 9, 2, 7];
let sum = 0;
for (let i = 0; i < nums.length; i++) {
  sum += nums[i];
}
console.log(sum);  // 22
\`\`\`

## Find Maximum
\`\`\`javascript
const nums = [23, 67, 12, 89, 45];
let max = nums[0];
for (let i = 1; i < nums.length; i++) {
  if (nums[i] > max) {
    max = nums[i];
  }
}
console.log(max);  // 89
\`\`\`

## Count Matches
\`\`\`javascript
const nums = [3, 8, 12, 5, 17, 9];
let count = 0;
for (let i = 0; i < nums.length; i++) {
  if (nums[i] > 10) {
    count++;
  }
}
console.log(count);  // 2
\`\`\`

## Find First Match
\`\`\`javascript
const nums = [5, 12, 8, 19, 3];
let found = -1;
for (let i = 0; i < nums.length; i++) {
  if (nums[i] > 10) {
    found = nums[i];
    break;
  }
}
console.log(found);  // 12
\`\`\`

## Key Points
- Index starts at 0
- \`.length\` gives count of elements
- Use loops to process all elements`,
            outcomes: [
              'creating_arrays',          // Arrays store multiple values in order using []
              'array_indexing',           // Access elements using index starting from 0
              'array_length',             // .length gives the number of elements
              'last_element_access',      // Access last element with arr[arr.length - 1]
              'modifying_elements',       // Change values using arr[index] = newValue
              'iterating_with_loops',     // Use for/while loops to process each element
              'accumulator_pattern',      // Build up a result while looping (sum, count, etc.)
              'search_pattern'            // Find elements that match a condition
            ],
            tasks: [
              {
                description: 'Numbers are [10, 25, 8, 17, 42, 3]. Print the first element, last element, and total count on separate lines',
                testCases: [{ input: null, expectedOutput: '10\n3\n6' }]
              },
              {
                description: 'Numbers are [4, 9, 2, 7, 5, 1, 8, 3]. Calculate and print the sum of all elements',
                testCases: [{ input: null, expectedOutput: '39' }]
              },
              {
                description: 'Numbers are [23, 67, 12, 89, 45, 34, 91, 56]. Find and print the largest number',
                testCases: [{ input: null, expectedOutput: '91' }]
              },
              {
                description: 'Numbers are [3, 8, 12, 5, 17, 9, 14, 6, 11]. Count and print how many numbers are greater than 10',
                testCases: [{ input: null, expectedOutput: '4' }]
              },
              {
                description: 'Numbers are [7, 3, 9, 1, 5, 8, 2, 6, 4]. Find the smallest number and its position (index). Print the number first, then its index',
                testCases: [{ input: null, expectedOutput: '1\n3' }]
              },
              {
                description: 'Numbers are [15, 22, 8, 36, 14, 42, 19]. Calculate and print the average (sum divided by count)',
                testCases: [{ input: null, expectedOutput: '22.285714285714285' }]
              },
              {
                description: 'Numbers are [5, 12, 8, 19, 3, 15, 7, 22, 11]. Find the first number greater than 10 and print it. If none found, print -1',
                testCases: [{ input: null, expectedOutput: '12' }]
              },
              {
                description: 'Numbers are [4, 7, 2, 9, 1, 8, 5]. Print all elements in reverse order (last to first), each on a new line',
                testCases: [{ input: null, expectedOutput: '5\n8\n1\n9\n2\n7\n4' }]
              },
              {
                description: 'Numbers are [3, 7, 2, 8, 5, 9, 1, 6, 4]. Find both the largest and smallest numbers. Print the largest first, then the smallest, then their difference',
                testCases: [{ input: null, expectedOutput: '9\n1\n8' }]
              },
              {
                description: 'Numbers are [12, 5, 8, 19, 3, 15, 7, 22, 11, 6]. Count how many are even and how many are odd. Print even count first, then odd count',
                testCases: [{ input: null, expectedOutput: '5\n5' }]
              }
            ]
          }
        ]
      },
      {
        id: 'functions',
        title: 'Functions (The Turning Point)',
        subtopics: [
          {
            id: 'functions',
            title: 'Functions',
            notes: `## Function Declaration
Reusable blocks of code.

\`\`\`javascript
function greet() {
  console.log("Hello!");
}
greet();  // Call the function
\`\`\`

## Parameters and Arguments
\`\`\`javascript
function add(a, b) {      // a, b are parameters
  return a + b;
}
const result = add(5, 3); // 5, 3 are arguments
console.log(result);      // 8
\`\`\`

## Return Values
\`\`\`javascript
function square(n) {
  return n * n;  // Sends value back
}
const result = square(4);  // 16
\`\`\`

## return vs console.log
\`\`\`javascript
// return: gives value back to caller
function getSum(a, b) {
  return a + b;  // Can use this value
}
const total = getSum(5, 3);  // total = 8

// console.log: just displays, returns nothing
function showSum(a, b) {
  console.log(a + b);  // Displays 8
}
const result = showSum(5, 3);  // result = undefined
\`\`\`

## Multiple Parameters
\`\`\`javascript
function findMax(a, b, c) {
  if (a >= b && a >= c) return a;
  if (b >= a && b >= c) return b;
  return c;
}
findMax(5, 9, 3);  // 9
\`\`\`

## Practical Examples
\`\`\`javascript
function isEven(n) {
  return n % 2 === 0;
}

function celsiusToFahrenheit(c) {
  return c * 9/5 + 32;
}

function isDivisible(a, b) {
  return a % b === 0;
}

function sumArray(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}
\`\`\`

## Function Naming
\`\`\`javascript
// ✅ Good: verb + noun, camelCase
function calculateTotal(items) { }
function getUserName() { }
function isValidEmail(email) { }

// ❌ Bad
function x() { }
function process() { }
\`\`\`

## Key Points
- Use \`return\` to send values back
- Functions do ONE specific thing
- Use descriptive verb-based names`,
            outcomes: [
              'function_declaration',     // function name() { } syntax to create reusable code blocks
              'function_calling',         // name() executes the function code
              'parameters',               // Variables in function definition that receive values
              'arguments',                // Actual values passed when calling the function
              'return_statement',         // return sends a value back to the caller
              'return_vs_print',          // return gives value back, console.log just displays
              'multiple_parameters',      // Functions can accept multiple inputs
              'function_naming',          // Use verbs, camelCase, descriptive names (e.g., calculateSum)
              'reusability',              // Same function works with different inputs
              'single_responsibility'     // Each function should do one specific thing
            ],
            tasks: [
              {
                description: 'Create a function that takes two numbers and returns their sum',
                testCases: [
                  { input: [5, 3], expectedOutput: '8' },
                  { input: [10, 20], expectedOutput: '30' },
                  { input: [-5, 15], expectedOutput: '10' },
                  { input: [0, 0], expectedOutput: '0' },
                  { input: [-5, -3], expectedOutput: '-8' },
                  { input: [5, 0], expectedOutput: '5' }
                ]
              },
              {
                description: 'Create a function that takes a number and returns true if it is even, false otherwise',
                testCases: [
                  { input: [4], expectedOutput: 'true' },
                  { input: [7], expectedOutput: 'false' },
                  { input: [0], expectedOutput: 'true' },
                  { input: [-6], expectedOutput: 'true' },
                  { input: [-7], expectedOutput: 'false' },
                  { input: [1], expectedOutput: 'false' }
                ]
              },
              {
                description: 'Create a function that takes a number and returns its absolute value (positive version)',
                testCases: [
                  { input: [5], expectedOutput: '5' },
                  { input: [-8], expectedOutput: '8' },
                  { input: [0], expectedOutput: '0' },
                  { input: [-100], expectedOutput: '100' },
                  { input: [-1], expectedOutput: '1' }
                ]
              },
              {
                description: 'Create a function that takes three numbers and returns the largest one',
                testCases: [
                  { input: [5, 9, 3], expectedOutput: '9' },
                  { input: [9, 5, 3], expectedOutput: '9' },
                  { input: [3, 5, 9], expectedOutput: '9' },
                  { input: [10, 10, 5], expectedOutput: '10' },
                  { input: [-1, -5, -2], expectedOutput: '-1' },
                  { input: [7, 7, 7], expectedOutput: '7' },
                  { input: [0, -5, 5], expectedOutput: '5' }
                ]
              },
              {
                description: 'Create a function that takes a string and returns its length',
                testCases: [
                  { input: ['hello'], expectedOutput: '5' },
                  { input: ['JavaScript'], expectedOutput: '10' },
                  { input: [''], expectedOutput: '0' },
                  { input: ['a'], expectedOutput: '1' },
                  { input: ['hello world'], expectedOutput: '11' }
                ]
              },
              {
                description: 'Create a function that takes a number (1-7) and returns the day name (1=Monday, 7=Sunday). Return "Invalid" for other numbers',
                testCases: [
                  { input: [1], expectedOutput: 'Monday' },
                  { input: [2], expectedOutput: 'Tuesday' },
                  { input: [3], expectedOutput: 'Wednesday' },
                  { input: [5], expectedOutput: 'Friday' },
                  { input: [7], expectedOutput: 'Sunday' },
                  { input: [0], expectedOutput: 'Invalid' },
                  { input: [8], expectedOutput: 'Invalid' },
                  { input: [-1], expectedOutput: 'Invalid' }
                ]
              },
              {
                description: 'Create a function that takes a temperature in Celsius and returns it converted to Fahrenheit (formula: C × 9/5 + 32)',
                testCases: [
                  { input: [0], expectedOutput: '32' },
                  { input: [100], expectedOutput: '212' },
                  { input: [25], expectedOutput: '77' },
                  { input: [-40], expectedOutput: '-40' },
                  { input: [-10], expectedOutput: '14' },
                  { input: [50], expectedOutput: '122' }
                ]
              },
              {
                description: 'Create a function that takes two numbers and returns true if the first is divisible by the second, false otherwise',
                testCases: [
                  { input: [10, 5], expectedOutput: 'true' },
                  { input: [10, 3], expectedOutput: 'false' },
                  { input: [15, 5], expectedOutput: 'true' },
                  { input: [7, 2], expectedOutput: 'false' },
                  { input: [5, 5], expectedOutput: 'true' },
                  { input: [7, 1], expectedOutput: 'true' },
                  { input: [0, 5], expectedOutput: 'true' }
                ]
              },
              {
                description: 'Create a function that takes a number and returns "positive", "negative", or "zero"',
                testCases: [
                  { input: [5], expectedOutput: 'positive' },
                  { input: [-3], expectedOutput: 'negative' },
                  { input: [0], expectedOutput: 'zero' },
                  { input: [100], expectedOutput: 'positive' },
                  { input: [-100], expectedOutput: 'negative' },
                  { input: [1], expectedOutput: 'positive' },
                  { input: [-1], expectedOutput: 'negative' }
                ]
              },
              {
                description: 'Create a function that takes an array of numbers and returns their sum',
                testCases: [
                  { input: [[1, 2, 3, 4, 5]], expectedOutput: '15' },
                  { input: [[10, 20, 30]], expectedOutput: '60' },
                  { input: [[-5, 5, -10, 10]], expectedOutput: '0' },
                  { input: [[100]], expectedOutput: '100' },
                  { input: [[-1, -2, -3]], expectedOutput: '-6' },
                  { input: [[0, 5, 0, 3]], expectedOutput: '8' },
                  { input: [[]], expectedOutput: '0' }
                ]
              },
              {
                description: 'Create a function that takes an array of numbers and returns the largest number',
                testCases: [
                  { input: [[3, 7, 2, 9, 5]], expectedOutput: '9' },
                  { input: [[-1, -5, -2]], expectedOutput: '-1' },
                  { input: [[42]], expectedOutput: '42' },
                  { input: [[5, 5, 5, 5]], expectedOutput: '5' },
                  { input: [[9, 3, 5, 2]], expectedOutput: '9' },
                  { input: [[3, 5, 2, 9]], expectedOutput: '9' },
                  { input: [[0, -5, -3]], expectedOutput: '0' }
                ]
              },
              {
                description: 'Create a function that takes an array of numbers and a target number. Return true if the target exists in the array, false otherwise',
                testCases: [
                  { input: [[1, 2, 3, 4, 5], 3], expectedOutput: 'true' },
                  { input: [[1, 2, 3, 4, 5], 6], expectedOutput: 'false' },
                  { input: [[10, 20, 30], 20], expectedOutput: 'true' },
                  { input: [[], 5], expectedOutput: 'false' },
                  { input: [[1, 2, 3], 1], expectedOutput: 'true' },
                  { input: [[1, 2, 3], 3], expectedOutput: 'true' },
                  { input: [[0, 1, 2], 0], expectedOutput: 'true' },
                  { input: [[-1, 0, 1], -1], expectedOutput: 'true' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'recursion',
        title: 'Recursion',
        subtopics: [
          {
            id: 'recursion',
            title: 'Functions calling themselves',
            notes: `## What is Recursion?
A function that calls itself to solve smaller subproblems.

\`\`\`javascript
function recurse(n) {
  if (n <= 0) return;  // Base case: STOP
  console.log(n);
  recurse(n - 1);      // Recursive call
}
\`\`\`

## Two Essential Parts
1. **Base Case**: When to stop (prevents infinite loop)
2. **Recursive Case**: Call itself with smaller input

## Sum 1 to N
\`\`\`javascript
function sumTo(n) {
  if (n <= 0) return 0;        // Base case
  return n + sumTo(n - 1);     // n + sum of rest
}
sumTo(5);  // 5 + 4 + 3 + 2 + 1 + 0 = 15
\`\`\`

## Factorial
\`\`\`javascript
function factorial(n) {
  if (n <= 1) return 1;        // Base case
  return n * factorial(n - 1); // n * factorial of (n-1)
}
factorial(5);  // 5 * 4 * 3 * 2 * 1 = 120
\`\`\`

## Fibonacci
\`\`\`javascript
function fib(n) {
  if (n <= 0) return 0;
  if (n === 1) return 1;
  return fib(n - 1) + fib(n - 2);
}
fib(6);  // 8 (0,1,1,2,3,5,8)
\`\`\`

## Array Sum
\`\`\`javascript
function sumArray(arr) {
  if (arr.length === 0) return 0;
  return arr[0] + sumArray(arr.slice(1));
}
sumArray([1, 2, 3, 4]);  // 10
\`\`\`

## Reverse String
\`\`\`javascript
function reverse(str) {
  if (str.length <= 1) return str;
  return reverse(str.slice(1)) + str[0];
}
reverse("hello");  // "olleh"
\`\`\`

## Palindrome Check
\`\`\`javascript
function isPalindrome(str) {
  if (str.length <= 1) return true;
  if (str[0] !== str[str.length - 1]) return false;
  return isPalindrome(str.slice(1, -1));
}
isPalindrome("racecar");  // true
\`\`\`

## Key Points
- Always have a base case!
- Each call should move toward base case
- Think: "How is this a smaller version of the same problem?"`,
            outcomes: [
              'what_is_recursion',            // A function that calls itself to solve smaller subproblems
              'base_case',                    // The stopping condition that prevents infinite recursion
              'recursive_case',               // The part where function calls itself with modified input
              'call_stack',                   // Each recursive call adds a frame to the stack, unwinding on return
              'return_value_propagation',     // Return values flow back through the chain of calls
              'breaking_down_problems',       // Divide problem into smaller identical subproblems
              'recursion_vs_iteration',       // Some problems are cleaner with recursion, others with loops
              'stack_overflow',               // Too many recursive calls without base case causes crash
              'tail_recursion'                // When recursive call is the last operation (optimization potential)
            ],
            tasks: [
              {
                description: 'Create a function that returns the sum of numbers from 1 to n using recursion',
                testCases: [
                  { input: [5], expectedOutput: '15' },
                  { input: [1], expectedOutput: '1' },
                  { input: [0], expectedOutput: '0' },
                  { input: [10], expectedOutput: '55' },
                  { input: [100], expectedOutput: '5050' }
                ]
              },
              {
                description: 'Create a function that returns the factorial of n using recursion (0! = 1)',
                testCases: [
                  { input: [5], expectedOutput: '120' },
                  { input: [0], expectedOutput: '1' },
                  { input: [1], expectedOutput: '1' },
                  { input: [7], expectedOutput: '5040' },
                  { input: [3], expectedOutput: '6' }
                ]
              },
              {
                description: 'Create a function that returns the nth Fibonacci number using recursion (F(0)=0, F(1)=1)',
                testCases: [
                  { input: [6], expectedOutput: '8' },
                  { input: [0], expectedOutput: '0' },
                  { input: [1], expectedOutput: '1' },
                  { input: [10], expectedOutput: '55' },
                  { input: [2], expectedOutput: '1' }
                ]
              },
              {
                description: 'Create a function that returns the sum of all elements in an array using recursion',
                testCases: [
                  { input: [[1, 2, 3, 4]], expectedOutput: '10' },
                  { input: [[]], expectedOutput: '0' },
                  { input: [[5]], expectedOutput: '5' },
                  { input: [[-1, 0, 1]], expectedOutput: '0' },
                  { input: [[10, 20, 30]], expectedOutput: '60' }
                ]
              },
              {
                description: 'Create a function that counts how many times a value appears in an array using recursion',
                testCases: [
                  { input: [[1, 2, 1, 3, 1], 1], expectedOutput: '3' },
                  { input: [[1, 2, 3], 5], expectedOutput: '0' },
                  { input: [[], 1], expectedOutput: '0' },
                  { input: [[7, 7, 7], 7], expectedOutput: '3' },
                  { input: [[1], 1], expectedOutput: '1' }
                ]
              },
              {
                description: 'Create a function that reverses a string using recursion',
                testCases: [
                  { input: ['hello'], expectedOutput: 'olleh' },
                  { input: [''], expectedOutput: '' },
                  { input: ['a'], expectedOutput: 'a' },
                  { input: ['ab'], expectedOutput: 'ba' },
                  { input: ['12345'], expectedOutput: '54321' }
                ]
              },
              {
                description: 'Create a function that checks if a string is a palindrome using recursion',
                testCases: [
                  { input: ['racecar'], expectedOutput: 'true' },
                  { input: ['hello'], expectedOutput: 'false' },
                  { input: [''], expectedOutput: 'true' },
                  { input: ['a'], expectedOutput: 'true' },
                  { input: ['abba'], expectedOutput: 'true' }
                ]
              },
              {
                description: 'Create a function that returns the maximum value in an array using recursion',
                testCases: [
                  { input: [[3, 1, 4, 1, 5]], expectedOutput: '5' },
                  { input: [[1]], expectedOutput: '1' },
                  { input: [[-5, -2, -8]], expectedOutput: '-2' },
                  { input: [[10, 10, 10]], expectedOutput: '10' },
                  { input: [[1, 100, 50]], expectedOutput: '100' }
                ]
              },
              {
                description: 'Create a function that raises a number to a power using recursion (handle power of 0)',
                testCases: [
                  { input: [2, 3], expectedOutput: '8' },
                  { input: [5, 0], expectedOutput: '1' },
                  { input: [3, 4], expectedOutput: '81' },
                  { input: [10, 2], expectedOutput: '100' },
                  { input: [2, 10], expectedOutput: '1024' }
                ]
              },
              {
                description: 'Create a function that flattens a nested array one level deep using recursion',
                testCases: [
                  { input: [[[1, 2], [3, 4]]], expectedOutput: '1,2,3,4' },
                  { input: [[1, [2, 3], 4]], expectedOutput: '1,2,3,4' },
                  { input: [[]], expectedOutput: '' },
                  { input: [[[1]]], expectedOutput: '1' },
                  { input: [[1, 2, 3]], expectedOutput: '1,2,3' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'array-methods',
        title: 'Array Methods (Functional Approach)',
        subtopics: [
          {
            id: 'foreach',
            title: 'forEach for iteration',
            notes: `## forEach Method
Execute a function for each element.

\`\`\`javascript
array.forEach((element, index, array) => {
  // Do something with each element
});
\`\`\`

## Basic Usage
\`\`\`javascript
const nums = [1, 2, 3];
nums.forEach(num => console.log(num));
// 1
// 2
// 3
\`\`\`

## With Index
\`\`\`javascript
const fruits = ['apple', 'banana', 'cherry'];
fruits.forEach((fruit, i) => {
  console.log(\`\${i}: \${fruit}\`);
});
// 0: apple
// 1: banana
// 2: cherry
\`\`\`

## Accumulating with External Variable
\`\`\`javascript
const nums = [1, 2, 3, 4, 5];
let sum = 0;
nums.forEach(num => {
  sum += num;
});
console.log(sum);  // 15
\`\`\`

## Counting Matches
\`\`\`javascript
const nums = [5, 15, 8, 20, 3, 12];
let count = 0;
nums.forEach(num => {
  if (num > 10) count++;
});
console.log(count);  // 3
\`\`\`

## Key Points
- forEach returns \`undefined\` (not a new array)
- Used for side effects (logging, updating external vars)
- Cannot break out early (use regular for loop if needed)`,
            outcomes: [
              'foreach_syntax',           // arr.forEach(callback) calls function for each element
              'callback_parameters',      // callback receives (element, index, array)
              'no_return_value',          // forEach returns undefined, not a new array
              'side_effects'              // Used for operations like logging, not transformation
            ],
            tasks: [
              {
                description: 'Create a function that takes an array and prints each element on a new line using forEach',
                testCases: [
                  { input: [[1, 2, 3]], expectedOutput: '1\n2\n3' },
                  { input: [['a', 'b', 'c']], expectedOutput: 'a\nb\nc' },
                  { input: [[10]], expectedOutput: '10' },
                  { input: [[]], expectedOutput: '' }
                ]
              },
              {
                description: 'Create a function that takes an array and prints each element with its index in format "index: element" using forEach',
                testCases: [
                  { input: [['a', 'b', 'c']], expectedOutput: '0: a\n1: b\n2: c' },
                  { input: [[10, 20]], expectedOutput: '0: 10\n1: 20' },
                  { input: [['only']], expectedOutput: '0: only' }
                ]
              },
              {
                description: 'Create a function that takes an array of numbers and returns the sum using forEach (use an external variable to accumulate)',
                testCases: [
                  { input: [[1, 2, 3, 4, 5]], expectedOutput: '15' },
                  { input: [[10, -5, 3]], expectedOutput: '8' },
                  { input: [[100]], expectedOutput: '100' },
                  { input: [[]], expectedOutput: '0' }
                ]
              },
              {
                description: 'Create a function that takes an array of numbers and returns a count of how many are greater than 10 using forEach',
                testCases: [
                  { input: [[5, 15, 8, 20, 3, 12]], expectedOutput: '3' },
                  { input: [[1, 2, 3]], expectedOutput: '0' },
                  { input: [[100, 200, 300]], expectedOutput: '3' },
                  { input: [[]], expectedOutput: '0' }
                ]
              }
            ]
          },
          {
            id: 'map',
            title: 'map for transformation',
            notes: `## map Method
Transform each element into something new.

\`\`\`javascript
const newArray = array.map(element => {
  return transformedValue;
});
\`\`\`

## Double Numbers
\`\`\`javascript
const nums = [1, 2, 3, 4];
const doubled = nums.map(n => n * 2);
console.log(doubled);  // [2, 4, 6, 8]
\`\`\`

## Square Numbers
\`\`\`javascript
const nums = [1, 2, 3, 4];
const squared = nums.map(n => n * n);
console.log(squared);  // [1, 4, 9, 16]
\`\`\`

## Uppercase Strings
\`\`\`javascript
const words = ['hello', 'world'];
const upper = words.map(w => w.toUpperCase());
console.log(upper);  // ['HELLO', 'WORLD']
\`\`\`

## Get String Lengths
\`\`\`javascript
const words = ['hi', 'hello', 'hey'];
const lengths = words.map(w => w.length);
console.log(lengths);  // [2, 5, 3]
\`\`\`

## Even/Odd Labels
\`\`\`javascript
const nums = [1, 2, 3, 4];
const labels = nums.map(n => n % 2 === 0 ? 'even' : 'odd');
console.log(labels);  // ['odd', 'even', 'odd', 'even']
\`\`\`

## Key Points
- Returns a NEW array (same length)
- Original array unchanged
- Each element is transformed by callback`,
            outcomes: [
              'map_syntax',               // arr.map(callback) returns a NEW array
              'transformation',           // Each element is transformed by the callback
              'same_length',              // Result array always has same length as original
              'original_unchanged'        // Original array is not modified
            ],
            tasks: [
              {
                description: 'Create a function that takes an array of numbers and returns a new array with each number doubled',
                testCases: [
                  { input: [[1, 2, 3, 4]], expectedOutput: '2,4,6,8' },
                  { input: [[5, 10, 15]], expectedOutput: '10,20,30' },
                  { input: [[-2, 0, 2]], expectedOutput: '-4,0,4' },
                  { input: [[]], expectedOutput: '' }
                ]
              },
              {
                description: 'Create a function that takes an array of numbers and returns a new array with each number squared',
                testCases: [
                  { input: [[1, 2, 3, 4]], expectedOutput: '1,4,9,16' },
                  { input: [[5, 10]], expectedOutput: '25,100' },
                  { input: [[-3, 0, 3]], expectedOutput: '9,0,9' },
                  { input: [[]], expectedOutput: '' }
                ]
              },
              {
                description: 'Create a function that takes an array of strings and returns a new array with all strings in uppercase',
                testCases: [
                  { input: [['hello', 'world']], expectedOutput: 'HELLO,WORLD' },
                  { input: [['JavaScript', 'is', 'fun']], expectedOutput: 'JAVASCRIPT,IS,FUN' },
                  { input: [['ABC']], expectedOutput: 'ABC' },
                  { input: [[]], expectedOutput: '' }
                ]
              },
              {
                description: 'Create a function that takes an array of strings and returns a new array containing the length of each string',
                testCases: [
                  { input: [['hello', 'world', 'hi']], expectedOutput: '5,5,2' },
                  { input: [['a', 'ab', 'abc']], expectedOutput: '1,2,3' },
                  { input: [['', 'test']], expectedOutput: '0,4' },
                  { input: [[]], expectedOutput: '' }
                ]
              },
              {
                description: 'Create a function that takes an array of numbers and returns a new array where each number is converted to "even" or "odd"',
                testCases: [
                  { input: [[1, 2, 3, 4]], expectedOutput: 'odd,even,odd,even' },
                  { input: [[10, 15, 20]], expectedOutput: 'even,odd,even' },
                  { input: [[0]], expectedOutput: 'even' },
                  { input: [[]], expectedOutput: '' }
                ]
              }
            ]
          },
          {
            id: 'filter',
            title: 'filter for selection',
            notes: `## filter Method
Keep only elements that pass a test.

\`\`\`javascript
const filtered = array.filter(element => {
  return true;  // keep element
  return false; // exclude element
});
\`\`\`

## Filter Even Numbers
\`\`\`javascript
const nums = [1, 2, 3, 4, 5, 6];
const evens = nums.filter(n => n % 2 === 0);
console.log(evens);  // [2, 4, 6]
\`\`\`

## Filter by Threshold
\`\`\`javascript
const nums = [1, 5, 10, 15, 20];
const big = nums.filter(n => n > 10);
console.log(big);  // [15, 20]
\`\`\`

## Filter Long Strings
\`\`\`javascript
const words = ['hi', 'hello', 'hey', 'world'];
const long = words.filter(w => w.length > 3);
console.log(long);  // ['hello', 'world']
\`\`\`

## Filter Positive Numbers
\`\`\`javascript
const nums = [-3, -1, 0, 1, 3];
const positive = nums.filter(n => n > 0);
console.log(positive);  // [1, 3]
\`\`\`

## Multiple Conditions
\`\`\`javascript
const nums = [1, 6, 8, 12, 15, 18];
const divisibleBy2And3 = nums.filter(n => n % 2 === 0 && n % 3 === 0);
console.log(divisibleBy2And3);  // [6, 12, 18]
\`\`\`

## Key Points
- Returns NEW array (may be shorter)
- Callback must return true/false
- Original array unchanged`,
            outcomes: [
              'filter_syntax',            // arr.filter(callback) returns a NEW array
              'boolean_callback',         // Callback must return true (keep) or false (exclude)
              'subset',                   // Result contains only elements where callback returned true
              'original_unchanged'        // Original array is not modified
            ],
            tasks: [
              {
                description: 'Create a function that takes an array of numbers and returns only the even numbers',
                testCases: [
                  { input: [[1, 2, 3, 4, 5, 6]], expectedOutput: '2,4,6' },
                  { input: [[10, 15, 20, 25]], expectedOutput: '10,20' },
                  { input: [[1, 3, 5]], expectedOutput: '' },
                  { input: [[]], expectedOutput: '' }
                ]
              },
              {
                description: 'Create a function that takes an array of numbers and a threshold, returns numbers greater than the threshold',
                testCases: [
                  { input: [[1, 5, 10, 15, 20], 10], expectedOutput: '15,20' },
                  { input: [[3, 7, 2, 9], 5], expectedOutput: '7,9' },
                  { input: [[1, 2, 3], 10], expectedOutput: '' },
                  { input: [[], 5], expectedOutput: '' }
                ]
              },
              {
                description: 'Create a function that takes an array of strings and returns only strings longer than 3 characters',
                testCases: [
                  { input: [['hi', 'hello', 'hey', 'world']], expectedOutput: 'hello,world' },
                  { input: [['a', 'ab', 'abc', 'abcd']], expectedOutput: 'abcd' },
                  { input: [['no', 'ok']], expectedOutput: '' },
                  { input: [[]], expectedOutput: '' }
                ]
              },
              {
                description: 'Create a function that takes an array of numbers and returns only positive numbers',
                testCases: [
                  { input: [[-3, -1, 0, 1, 3]], expectedOutput: '1,3' },
                  { input: [[5, -2, 8, -4]], expectedOutput: '5,8' },
                  { input: [[-1, -2, -3]], expectedOutput: '' },
                  { input: [[0]], expectedOutput: '' }
                ]
              },
              {
                description: 'Create a function that takes an array of numbers and returns numbers that are divisible by both 2 and 3',
                testCases: [
                  { input: [[1, 6, 8, 12, 15, 18]], expectedOutput: '6,12,18' },
                  { input: [[2, 3, 4, 5]], expectedOutput: '' },
                  { input: [[6, 12, 18, 24]], expectedOutput: '6,12,18,24' },
                  { input: [[]], expectedOutput: '' }
                ]
              }
            ]
          },
          {
            id: 'find-findindex',
            title: 'find and findIndex',
            notes: `## find Method
Returns FIRST element that matches.

\`\`\`javascript
const found = array.find(element => condition);
// Returns element or undefined
\`\`\`

## findIndex Method
Returns INDEX of first match.

\`\`\`javascript
const index = array.findIndex(element => condition);
// Returns index or -1
\`\`\`

## Find First Even
\`\`\`javascript
const nums = [1, 3, 4, 6, 8];
const firstEven = nums.find(n => n % 2 === 0);
console.log(firstEven);  // 4 (not [4, 6, 8])
\`\`\`

## Find Index of Negative
\`\`\`javascript
const nums = [5, 3, -2, 8, -4];
const idx = nums.findIndex(n => n < 0);
console.log(idx);  // 2
\`\`\`

## Find Greater Than
\`\`\`javascript
const nums = [1, 5, 10, 15];
const found = nums.find(n => n > 8);
console.log(found);  // 10
\`\`\`

## Not Found
\`\`\`javascript
const nums = [1, 2, 3];
const result = nums.find(n => n > 10);
console.log(result);  // undefined

const idx = nums.findIndex(n => n > 10);
console.log(idx);  // -1
\`\`\`

## Find String Starting With
\`\`\`javascript
const words = ['banana', 'Apple', 'cherry'];
const idx = words.findIndex(w => w.toLowerCase().startsWith('a'));
console.log(idx);  // 1
\`\`\`

## Key Points
- \`find\`: returns element or undefined
- \`findIndex\`: returns index or -1
- Both stop at FIRST match`,
            outcomes: [
              'find_syntax',              // arr.find(callback) returns first matching element
              'findIndex_syntax',         // arr.findIndex(callback) returns index of first match
              'returns_undefined',        // find returns undefined if not found
              'returns_negative_one',     // findIndex returns -1 if not found
              'stops_early'               // Both stop searching as soon as match is found
            ],
            tasks: [
              {
                description: 'Create a function that takes an array of numbers and returns the first even number, or undefined if none exists',
                testCases: [
                  { input: [[1, 3, 4, 6, 8]], expectedOutput: '4' },
                  { input: [[2, 4, 6]], expectedOutput: '2' },
                  { input: [[1, 3, 5, 7]], expectedOutput: 'undefined' },
                  { input: [[]], expectedOutput: 'undefined' }
                ]
              },
              {
                description: 'Create a function that takes an array of numbers and returns the index of the first negative number, or -1 if none exists',
                testCases: [
                  { input: [[5, 3, -2, 8, -4]], expectedOutput: '2' },
                  { input: [[-1, 2, 3]], expectedOutput: '0' },
                  { input: [[1, 2, 3]], expectedOutput: '-1' },
                  { input: [[]], expectedOutput: '-1' }
                ]
              },
              {
                description: 'Create a function that takes an array of numbers and a target, returns the first number greater than target or undefined',
                testCases: [
                  { input: [[1, 5, 10, 15], 8], expectedOutput: '10' },
                  { input: [[2, 4, 6], 10], expectedOutput: 'undefined' },
                  { input: [[100, 200], 50], expectedOutput: '100' },
                  { input: [[], 5], expectedOutput: 'undefined' }
                ]
              },
              {
                description: 'Create a function that takes an array of strings and returns the index of the first string starting with "a" (case-insensitive), or -1',
                testCases: [
                  { input: [['banana', 'Apple', 'cherry']], expectedOutput: '1' },
                  { input: [['apple', 'apricot']], expectedOutput: '0' },
                  { input: [['banana', 'cherry']], expectedOutput: '-1' },
                  { input: [[]], expectedOutput: '-1' }
                ]
              }
            ]
          },
          {
            id: 'some-every',
            title: 'some and every',
            notes: `## some Method
Returns true if ANY element passes.

\`\`\`javascript
const hasMatch = array.some(element => condition);
\`\`\`

## every Method
Returns true if ALL elements pass.

\`\`\`javascript
const allPass = array.every(element => condition);
\`\`\`

## some: Any Negative?
\`\`\`javascript
[1, 2, -3, 4].some(n => n < 0);  // true
[1, 2, 3, 4].some(n => n < 0);   // false
\`\`\`

## every: All Positive?
\`\`\`javascript
[1, 2, 3, 4].every(n => n > 0);    // true
[1, 2, -3, 4].every(n => n > 0);   // false
\`\`\`

## some: Any Divisible by 5?
\`\`\`javascript
[3, 7, 10, 12].some(n => n % 5 === 0);  // true
[1, 2, 3, 4].some(n => n % 5 === 0);    // false
\`\`\`

## every: All Strings > 2 chars?
\`\`\`javascript
['hello', 'world', 'hey'].every(s => s.length > 2);  // true
['hi', 'hello'].every(s => s.length > 2);            // false
\`\`\`

## Empty Array Behavior
\`\`\`javascript
[].some(n => n > 0);   // false (no elements to test)
[].every(n => n > 0);  // true (vacuously true)
\`\`\`

## Key Points
- \`some\`: "Is there at least one?"
- \`every\`: "Do all of them?"
- Both stop early when result is determined`,
            outcomes: [
              'some_syntax',              // arr.some(callback) returns true if ANY element passes
              'every_syntax',             // arr.every(callback) returns true if ALL elements pass
              'short_circuit',            // Both stop early when result is determined
              'empty_array_behavior'      // some([]) = false, every([]) = true
            ],
            tasks: [
              {
                description: 'Create a function that takes an array of numbers and returns true if any number is negative',
                testCases: [
                  { input: [[1, 2, -3, 4]], expectedOutput: 'true' },
                  { input: [[1, 2, 3, 4]], expectedOutput: 'false' },
                  { input: [[-1]], expectedOutput: 'true' },
                  { input: [[]], expectedOutput: 'false' }
                ]
              },
              {
                description: 'Create a function that takes an array of numbers and returns true if all numbers are positive',
                testCases: [
                  { input: [[1, 2, 3, 4]], expectedOutput: 'true' },
                  { input: [[1, 2, -3, 4]], expectedOutput: 'false' },
                  { input: [[0, 1, 2]], expectedOutput: 'false' },
                  { input: [[]], expectedOutput: 'true' }
                ]
              },
              {
                description: 'Create a function that takes an array of numbers and returns true if any number is divisible by 5',
                testCases: [
                  { input: [[3, 7, 10, 12]], expectedOutput: 'true' },
                  { input: [[1, 2, 3, 4]], expectedOutput: 'false' },
                  { input: [[5]], expectedOutput: 'true' },
                  { input: [[]], expectedOutput: 'false' }
                ]
              },
              {
                description: 'Create a function that takes an array of strings and returns true if all strings have length greater than 2',
                testCases: [
                  { input: [['hello', 'world', 'hey']], expectedOutput: 'true' },
                  { input: [['hi', 'hello']], expectedOutput: 'false' },
                  { input: [['abc']], expectedOutput: 'true' },
                  { input: [[]], expectedOutput: 'true' }
                ]
              },
              {
                description: 'Create a function that takes an array of numbers and returns true if all numbers are even',
                testCases: [
                  { input: [[2, 4, 6, 8]], expectedOutput: 'true' },
                  { input: [[2, 4, 5, 8]], expectedOutput: 'false' },
                  { input: [[0]], expectedOutput: 'true' },
                  { input: [[]], expectedOutput: 'true' }
                ]
              }
            ]
          },
          {
            id: 'reduce',
            title: 'reduce for accumulation',
            notes: `## reduce Method
Accumulate array into a single value.

\`\`\`javascript
const result = array.reduce((accumulator, current) => {
  return newAccumulator;
}, initialValue);
\`\`\`

## Sum Numbers
\`\`\`javascript
const nums = [1, 2, 3, 4, 5];
const sum = nums.reduce((acc, n) => acc + n, 0);
console.log(sum);  // 15
\`\`\`

## Product
\`\`\`javascript
const nums = [1, 2, 3, 4];
const product = nums.reduce((acc, n) => acc * n, 1);
console.log(product);  // 24
\`\`\`

## Find Maximum
\`\`\`javascript
const nums = [3, 7, 2, 9, 5];
const max = nums.reduce((acc, n) => n > acc ? n : acc, nums[0]);
console.log(max);  // 9
\`\`\`

## Count Even Numbers
\`\`\`javascript
const nums = [1, 2, 3, 4, 5, 6];
const count = nums.reduce((acc, n) => {
  return n % 2 === 0 ? acc + 1 : acc;
}, 0);
console.log(count);  // 3
\`\`\`

## Join Strings
\`\`\`javascript
const words = ['a', 'b', 'c'];
const joined = words.reduce((acc, w) => {
  return acc === '' ? w : acc + ' - ' + w;
}, '');
console.log(joined);  // "a - b - c"
\`\`\`

## Build Object
\`\`\`javascript
const nums = [1, 2, 3, 4];
const result = nums.reduce((acc, n) => {
  acc.sum += n;
  acc.count++;
  return acc;
}, { sum: 0, count: 0 });
// { sum: 10, count: 4 }
\`\`\`

## Key Points
- Extremely versatile (sum, product, max, count, transform)
- Initial value is important!
- Accumulator carries result through iterations`,
            outcomes: [
              'reduce_syntax',            // arr.reduce(callback, initialValue)
              'accumulator',              // First param of callback is running total
              'current_value',            // Second param is current element
              'initial_value',            // Starting value for accumulator (important!)
              'versatility'               // Can implement sum, product, max, count, flatten, etc.
            ],
            tasks: [
              {
                description: 'Create a function that takes an array of numbers and returns their sum using reduce',
                testCases: [
                  { input: [[1, 2, 3, 4, 5]], expectedOutput: '15' },
                  { input: [[10, 20, 30]], expectedOutput: '60' },
                  { input: [[-5, 5]], expectedOutput: '0' },
                  { input: [[]], expectedOutput: '0' }
                ]
              },
              {
                description: 'Create a function that takes an array of numbers and returns their product using reduce',
                testCases: [
                  { input: [[1, 2, 3, 4]], expectedOutput: '24' },
                  { input: [[5, 5, 5]], expectedOutput: '125' },
                  { input: [[10]], expectedOutput: '10' },
                  { input: [[]], expectedOutput: '1' }
                ]
              },
              {
                description: 'Create a function that takes an array of numbers and returns the maximum using reduce',
                testCases: [
                  { input: [[3, 7, 2, 9, 5]], expectedOutput: '9' },
                  { input: [[-1, -5, -2]], expectedOutput: '-1' },
                  { input: [[42]], expectedOutput: '42' },
                  { input: [[5, 5, 5]], expectedOutput: '5' }
                ]
              },
              {
                description: 'Create a function that takes an array of numbers and returns count of even numbers using reduce',
                testCases: [
                  { input: [[1, 2, 3, 4, 5, 6]], expectedOutput: '3' },
                  { input: [[1, 3, 5]], expectedOutput: '0' },
                  { input: [[2, 4, 6]], expectedOutput: '3' },
                  { input: [[]], expectedOutput: '0' }
                ]
              },
              {
                description: 'Create a function that takes an array of strings and returns them joined with " - " separator using reduce',
                testCases: [
                  { input: [['a', 'b', 'c']], expectedOutput: 'a - b - c' },
                  { input: [['hello', 'world']], expectedOutput: 'hello - world' },
                  { input: [['single']], expectedOutput: 'single' },
                  { input: [[]], expectedOutput: '' }
                ]
              },
              {
                description: 'Create a function that takes an array of numbers and returns an object with "sum" and "count" properties using reduce',
                testCases: [
                  { input: [[1, 2, 3, 4]], expectedOutput: '{"sum":10,"count":4}' },
                  { input: [[10, 20]], expectedOutput: '{"sum":30,"count":2}' },
                  { input: [[5]], expectedOutput: '{"sum":5,"count":1}' },
                  { input: [[]], expectedOutput: '{"sum":0,"count":0}' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'string-methods',
        title: 'String Methods',
        subtopics: [
          {
            id: 'string-manipulations',
            title: 'Common string manipulations',
            notes: `## trim - Remove Whitespace
\`\`\`javascript
"  hello  ".trim();      // "hello"
"  spaces  ".trim();     // "spaces"
\`\`\`

## replace / replaceAll
\`\`\`javascript
// Replace first occurrence
"hello world".replace("o", "0");     // "hell0 world"

// Replace all occurrences
"hello world".replaceAll("o", "0");  // "hell0 w0rld"
"one two three".replaceAll(" ", "-"); // "one-two-three"
\`\`\`

## repeat
\`\`\`javascript
"ab".repeat(3);   // "ababab"
"*".repeat(5);    // "*****"
"x".repeat(0);    // ""
\`\`\`

## padStart / padEnd
\`\`\`javascript
// Pad beginning
"42".padStart(5, "0");   // "00042"
"7".padStart(3, "0");    // "007"

// Pad end
"hi".padEnd(5, ".");     // "hi..."
\`\`\`

## Title Case (Capitalize Words)
\`\`\`javascript
function titleCase(str) {
  return str.split(' ')
    .map(word => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
titleCase("hello world");     // "Hello World"
titleCase("ALREADY CAPS");    // "Already Caps"
\`\`\`

## Key Points
- \`trim()\`: removes leading/trailing whitespace
- \`replace()\`: first occurrence only
- \`replaceAll()\`: all occurrences
- \`padStart/padEnd\`: pad to specified length`,
            outcomes: [
              'trim_method',              // .trim() removes whitespace from both ends
              'replace_method',           // .replace(search, replacement) replaces first occurrence
              'replaceAll_method',        // .replaceAll(search, replacement) replaces all occurrences
              'repeat_method',            // .repeat(n) repeats string n times
              'padStart_padEnd'           // Pad string to certain length with specified character
            ],
            tasks: [
              {
                description: 'Create a function that takes a string and returns it with leading and trailing whitespace removed',
                testCases: [
                  { input: ['  hello  '], expectedOutput: 'hello' },
                  { input: ['   spaces   '], expectedOutput: 'spaces' },
                  { input: ['no-spaces'], expectedOutput: 'no-spaces' },
                  { input: ['  '], expectedOutput: '' },
                  { input: [''], expectedOutput: '' }
                ]
              },
              {
                description: 'Create a function that takes a string and replaces all spaces with dashes',
                testCases: [
                  { input: ['hello world'], expectedOutput: 'hello-world' },
                  { input: ['one two three'], expectedOutput: 'one-two-three' },
                  { input: ['no spaces'], expectedOutput: 'no-spaces' },
                  { input: ['nospace'], expectedOutput: 'nospace' },
                  { input: [''], expectedOutput: '' }
                ]
              },
              {
                description: 'Create a function that takes a string and a number n, returns the string repeated n times',
                testCases: [
                  { input: ['ab', 3], expectedOutput: 'ababab' },
                  { input: ['*', 5], expectedOutput: '*****' },
                  { input: ['hello', 1], expectedOutput: 'hello' },
                  { input: ['x', 0], expectedOutput: '' }
                ]
              },
              {
                description: 'Create a function that takes a number and pads it with leading zeros to make it 5 digits',
                testCases: [
                  { input: [42], expectedOutput: '00042' },
                  { input: [123], expectedOutput: '00123' },
                  { input: [12345], expectedOutput: '12345' },
                  { input: [0], expectedOutput: '00000' },
                  { input: [999999], expectedOutput: '999999' }
                ]
              },
              {
                description: 'Create a function that takes a string and returns it with first letter of each word capitalized',
                testCases: [
                  { input: ['hello world'], expectedOutput: 'Hello World' },
                  { input: ['javascript is fun'], expectedOutput: 'Javascript Is Fun' },
                  { input: ['ALREADY CAPS'], expectedOutput: 'Already Caps' },
                  { input: ['a'], expectedOutput: 'A' },
                  { input: [''], expectedOutput: '' }
                ]
              }
            ]
          },
          {
            id: 'split-join',
            title: 'split and join',
            notes: `## split - String to Array
\`\`\`javascript
"hello world".split(" ");    // ["hello", "world"]
"a,b,c".split(",");          // ["a", "b", "c"]
"hello".split("");           // ["h", "e", "l", "l", "o"]
\`\`\`

## join - Array to String
\`\`\`javascript
["hello", "world"].join(" ");  // "hello world"
["a", "b", "c"].join(",");     // "a,b,c"
["a", "b", "c"].join("");      // "abc"
["a", "b", "c"].join(" | ");   // "a | b | c"
\`\`\`

## Reverse a String
\`\`\`javascript
function reverseString(str) {
  return str.split("").reverse().join("");
}
reverseString("hello");  // "olleh"
\`\`\`

## Count Words
\`\`\`javascript
function wordCount(str) {
  if (str === "") return 0;
  return str.split(" ").length;
}
wordCount("hello world");  // 2
\`\`\`

## Convert CSV to Pipe-Separated
\`\`\`javascript
function csvToPipe(csv) {
  return csv.split(",").join(" | ");
}
csvToPipe("a,b,c");  // "a | b | c"
\`\`\`

## Key Points
- \`split(separator)\`: breaks string at separator
- \`join(separator)\`: combines array with separator
- Empty separator splits into characters`,
            outcomes: [
              'split_syntax',             // str.split(separator) converts string to array
              'join_syntax',              // arr.join(separator) converts array to string
              'empty_separator',          // split('') creates array of individual characters
              'round_trip',               // split and join together can transform strings
              'no_separator_join'         // join() with no argument uses comma
            ],
            tasks: [
              {
                description: 'Create a function that takes a sentence and returns an array of words',
                testCases: [
                  { input: ['hello world'], expectedOutput: 'hello,world' },
                  { input: ['one two three four'], expectedOutput: 'one,two,three,four' },
                  { input: ['single'], expectedOutput: 'single' },
                  { input: [''], expectedOutput: '' }
                ]
              },
              {
                description: 'Create a function that takes an array of words and returns them as a sentence (space-separated)',
                testCases: [
                  { input: [['hello', 'world']], expectedOutput: 'hello world' },
                  { input: [['JavaScript', 'is', 'awesome']], expectedOutput: 'JavaScript is awesome' },
                  { input: [['single']], expectedOutput: 'single' },
                  { input: [[]], expectedOutput: '' }
                ]
              },
              {
                description: 'Create a function that takes a string and returns it reversed',
                testCases: [
                  { input: ['hello'], expectedOutput: 'olleh' },
                  { input: ['JavaScript'], expectedOutput: 'tpircSavaJ' },
                  { input: ['a'], expectedOutput: 'a' },
                  { input: ['ab'], expectedOutput: 'ba' },
                  { input: [''], expectedOutput: '' }
                ]
              },
              {
                description: 'Create a function that takes a sentence and returns the number of words',
                testCases: [
                  { input: ['hello world'], expectedOutput: '2' },
                  { input: ['one two three four five'], expectedOutput: '5' },
                  { input: ['single'], expectedOutput: '1' },
                  { input: [''], expectedOutput: '0' }
                ]
              },
              {
                description: 'Create a function that takes a CSV string (comma-separated) and returns the values joined by " | "',
                testCases: [
                  { input: ['a,b,c'], expectedOutput: 'a | b | c' },
                  { input: ['one,two'], expectedOutput: 'one | two' },
                  { input: ['single'], expectedOutput: 'single' },
                  { input: [''], expectedOutput: '' }
                ]
              }
            ]
          },
          {
            id: 'substring-slice',
            title: 'substring and slice',
            notes: `## slice Method
Extract portion of string.

\`\`\`javascript
str.slice(start, end);  // end is exclusive
\`\`\`

## Basic Usage
\`\`\`javascript
"hello".slice(0, 3);    // "hel" (chars 0, 1, 2)
"hello".slice(2);       // "llo" (from index 2 to end)
\`\`\`

## Negative Indices
\`\`\`javascript
"hello".slice(-3);      // "llo" (last 3 chars)
"hello".slice(-3, -1);  // "ll" (from -3 to -1, exclusive)
\`\`\`

## First N Characters
\`\`\`javascript
"JavaScript".slice(0, 3);  // "Jav"
\`\`\`

## Last N Characters
\`\`\`javascript
"JavaScript".slice(-3);    // "ipt"
\`\`\`

## Remove First and Last
\`\`\`javascript
"hello".slice(1, -1);      // "ell"
\`\`\`

## Middle Characters
\`\`\`javascript
function getMiddle(str) {
  const mid = Math.floor(str.length / 2);
  if (str.length % 2 === 0) {
    return str.slice(mid - 1, mid + 1);  // Two chars
  }
  return str.slice(mid, mid + 1);        // One char
}
getMiddle("hello");  // "l"
getMiddle("test");   // "es"
\`\`\`

## Key Points
- End index is not included
- Negative indices count from end
- Original string unchanged`,
            outcomes: [
              'slice_syntax',             // str.slice(start, end) extracts portion of string
              'substring_syntax',         // str.substring(start, end) similar to slice
              'negative_indices',         // slice supports negative indices (from end)
              'end_exclusive',            // End index is not included in result
              'omit_end'                  // Omitting end extracts to end of string
            ],
            tasks: [
              {
                description: 'Create a function that takes a string and returns the first 3 characters',
                testCases: [
                  { input: ['hello'], expectedOutput: 'hel' },
                  { input: ['JavaScript'], expectedOutput: 'Jav' },
                  { input: ['ab'], expectedOutput: 'ab' },
                  { input: ['a'], expectedOutput: 'a' },
                  { input: [''], expectedOutput: '' }
                ]
              },
              {
                description: 'Create a function that takes a string and returns the last 3 characters',
                testCases: [
                  { input: ['hello'], expectedOutput: 'llo' },
                  { input: ['JavaScript'], expectedOutput: 'ipt' },
                  { input: ['ab'], expectedOutput: 'ab' },
                  { input: ['a'], expectedOutput: 'a' },
                  { input: [''], expectedOutput: '' }
                ]
              },
              {
                description: 'Create a function that takes a string and returns it without the first and last characters',
                testCases: [
                  { input: ['hello'], expectedOutput: 'ell' },
                  { input: ['JavaScript'], expectedOutput: 'avaScrip' },
                  { input: ['ab'], expectedOutput: '' },
                  { input: ['abc'], expectedOutput: 'b' },
                  { input: ['a'], expectedOutput: '' }
                ]
              },
              {
                description: 'Create a function that takes a string and start/end indices, returns the substring between them',
                testCases: [
                  { input: ['hello world', 0, 5], expectedOutput: 'hello' },
                  { input: ['hello world', 6, 11], expectedOutput: 'world' },
                  { input: ['JavaScript', 4, 10], expectedOutput: 'Script' },
                  { input: ['test', 1, 3], expectedOutput: 'es' }
                ]
              },
              {
                description: 'Create a function that takes a string and returns the middle character(s) - one char if odd length, two if even',
                testCases: [
                  { input: ['hello'], expectedOutput: 'l' },
                  { input: ['test'], expectedOutput: 'es' },
                  { input: ['a'], expectedOutput: 'a' },
                  { input: ['ab'], expectedOutput: 'ab' },
                  { input: ['abc'], expectedOutput: 'b' }
                ]
              }
            ]
          },
          {
            id: 'string-searching',
            title: 'String searching and matching',
            notes: `## includes - Contains?
\`\`\`javascript
"hello world".includes("world");  // true
"hello world".includes("xyz");    // false
\`\`\`

## indexOf - Find Position
\`\`\`javascript
"hello world".indexOf("o");       // 4 (first occurrence)
"hello world".indexOf("xyz");     // -1 (not found)
\`\`\`

## lastIndexOf - Find Last
\`\`\`javascript
"hello world".lastIndexOf("o");   // 7 (last occurrence)
"banana".lastIndexOf("a");        // 5
\`\`\`

## startsWith / endsWith
\`\`\`javascript
"hello".startsWith("he");         // true
"hello".startsWith("lo");         // false

"hello.js".endsWith(".js");       // true
"hello.txt".endsWith(".js");      // false
\`\`\`

## Count Character Occurrences
\`\`\`javascript
function countChar(str, char) {
  let count = 0;
  for (let c of str) {
    if (c === char) count++;
  }
  return count;
}
countChar("mississippi", "s");  // 4

// Or with split:
function countChar(str, char) {
  return str.split(char).length - 1;
}
\`\`\`

## Key Points
- \`includes()\`: returns boolean
- \`indexOf()\`: returns position or -1
- \`startsWith/endsWith\`: check boundaries`,
            outcomes: [
              'indexOf_method',           // str.indexOf(search) returns position or -1
              'lastIndexOf_method',       // str.lastIndexOf(search) finds last occurrence
              'includes_method',          // str.includes(search) returns boolean
              'startsWith_method',        // str.startsWith(prefix) checks beginning
              'endsWith_method'           // str.endsWith(suffix) checks ending
            ],
            tasks: [
              {
                description: 'Create a function that takes a string and a search term, returns true if the string contains the term',
                testCases: [
                  { input: ['hello world', 'world'], expectedOutput: 'true' },
                  { input: ['hello world', 'planet'], expectedOutput: 'false' },
                  { input: ['JavaScript', 'Script'], expectedOutput: 'true' },
                  { input: ['', 'test'], expectedOutput: 'false' },
                  { input: ['test', ''], expectedOutput: 'true' }
                ]
              },
              {
                description: 'Create a function that takes a string and a search term, returns the index of first occurrence or -1',
                testCases: [
                  { input: ['hello world', 'o'], expectedOutput: '4' },
                  { input: ['hello world', 'world'], expectedOutput: '6' },
                  { input: ['hello world', 'x'], expectedOutput: '-1' },
                  { input: ['banana', 'a'], expectedOutput: '1' },
                  { input: ['', 'test'], expectedOutput: '-1' }
                ]
              },
              {
                description: 'Create a function that takes a filename and returns true if it ends with ".js"',
                testCases: [
                  { input: ['app.js'], expectedOutput: 'true' },
                  { input: ['index.html'], expectedOutput: 'false' },
                  { input: ['script.min.js'], expectedOutput: 'true' },
                  { input: ['js'], expectedOutput: 'false' },
                  { input: [''], expectedOutput: 'false' }
                ]
              },
              {
                description: 'Create a function that takes a URL and returns true if it starts with "https://"',
                testCases: [
                  { input: ['https://example.com'], expectedOutput: 'true' },
                  { input: ['http://example.com'], expectedOutput: 'false' },
                  { input: ['https://'], expectedOutput: 'true' },
                  { input: ['ftp://files.com'], expectedOutput: 'false' },
                  { input: [''], expectedOutput: 'false' }
                ]
              },
              {
                description: 'Create a function that takes a string and a character, returns how many times the character appears',
                testCases: [
                  { input: ['hello', 'l'], expectedOutput: '2' },
                  { input: ['mississippi', 's'], expectedOutput: '4' },
                  { input: ['test', 'x'], expectedOutput: '0' },
                  { input: ['aaa', 'a'], expectedOutput: '3' },
                  { input: ['', 'a'], expectedOutput: '0' }
                ]
              },
              {
                description: 'Create a function that takes a string and a search term, returns the index of the last occurrence or -1',
                testCases: [
                  { input: ['hello world', 'o'], expectedOutput: '7' },
                  { input: ['banana', 'a'], expectedOutput: '5' },
                  { input: ['hello', 'l'], expectedOutput: '3' },
                  { input: ['test', 'x'], expectedOutput: '-1' },
                  { input: ['', 'a'], expectedOutput: '-1' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'regex',
        title: 'Regular Expressions',
        subtopics: [
          {
            id: 'regex',
            title: 'Pattern matching',
            notes: `## Creating Regular Expressions
\`\`\`javascript
const regex = /pattern/flags;
const regex = new RegExp("pattern", "flags");
\`\`\`

## Common Flags
\`\`\`javascript
/hello/i   // i = case insensitive
/hello/g   // g = global (find all)
/hello/gi  // both
\`\`\`

## test() - Check for Match
\`\`\`javascript
/hello/.test("hello world");  // true
/xyz/.test("hello world");    // false
\`\`\`

## Special Characters
\`\`\`javascript
\\d    // Any digit [0-9]
\\w    // Word character [a-zA-Z0-9_]
\\s    // Whitespace
.     // Any character (except newline)
\`\`\`

## Character Classes
\`\`\`javascript
[abc]   // a, b, or c
[a-z]   // any lowercase letter
[A-Z]   // any uppercase letter
[0-9]   // any digit
[^abc]  // NOT a, b, or c
\`\`\`

## Quantifiers
\`\`\`javascript
*      // 0 or more
+      // 1 or more
?      // 0 or 1
{3}    // exactly 3
{2,5}  // 2 to 5
\`\`\`

## Anchors
\`\`\`javascript
^      // Start of string
$      // End of string
\`\`\`

## Examples
\`\`\`javascript
// Only digits
/^\\d+$/.test("12345");      // true
/^\\d+$/.test("123abc");     // false

// Replace whitespace with dash
"hello world".replace(/\\s+/g, "-");  // "hello-world"

// Extract numbers
"abc123def456".match(/\\d+/g);  // ["123", "456"]

// Starts with capital
/^[A-Z]/.test("Hello");   // true
/^[A-Z]/.test("hello");   // false

// Simple email check
/\\w+@\\w+\\.\\w+/.test("a@b.c");  // true

// Replace vowels
"hello".replace(/[aeiou]/gi, "*");  // "h*ll*"
\`\`\``,
            outcomes: [
              'what_is_regex',                // A pattern used to match character combinations in strings
              'regex_literal',                // /pattern/ or /pattern/flags syntax
              'regex_constructor',            // new RegExp('pattern', 'flags') for dynamic patterns
              'test_method',                  // regex.test(string) returns true/false if pattern matches
              'match_method',                 // string.match(regex) returns array of matches or null
              'replace_with_regex',           // string.replace(regex, replacement) replaces matches
              'character_classes',            // [abc] matches any of a, b, c; [a-z] ranges; [^abc] negation
              'special_characters',           // \\d (digit), \\w (word), \\s (whitespace), . (any char)
              'quantifiers',                  // * (0+), + (1+), ? (0-1), {n}, {n,}, {n,m}
              'anchors',                      // ^ (start), $ (end), \\b (word boundary)
              'global_flag',                  // g flag finds all matches, not just first
              'case_insensitive_flag',        // i flag ignores case
              'capture_groups',               // (pattern) captures for extraction or backreference
              'exec_method'                   // regex.exec(string) returns match array with groups
            ],
            tasks: [
              {
                description: 'Create a function that checks if a string contains only digits using regex',
                testCases: [
                  { input: ['12345'], expectedOutput: 'true' },
                  { input: ['123abc'], expectedOutput: 'false' },
                  { input: [''], expectedOutput: 'false' },
                  { input: ['0'], expectedOutput: 'true' },
                  { input: ['12 34'], expectedOutput: 'false' }
                ]
              },
              {
                description: 'Create a function that counts how many times a pattern appears in a string (case insensitive)',
                testCases: [
                  { input: ['Hello hello HELLO', 'hello'], expectedOutput: '3' },
                  { input: ['abcabc', 'abc'], expectedOutput: '2' },
                  { input: ['test', 'xyz'], expectedOutput: '0' },
                  { input: ['', 'a'], expectedOutput: '0' },
                  { input: ['AaAaA', 'a'], expectedOutput: '5' }
                ]
              },
              {
                description: 'Create a function that replaces all whitespace characters with a single dash',
                testCases: [
                  { input: ['hello world'], expectedOutput: 'hello-world' },
                  { input: ['a  b  c'], expectedOutput: 'a-b-c' },
                  { input: ['no spaces'], expectedOutput: 'no-spaces' },
                  { input: ['   '], expectedOutput: '-' },
                  { input: ['hello'], expectedOutput: 'hello' }
                ]
              },
              {
                description: 'Create a function that extracts all numbers from a string and returns them as an array',
                testCases: [
                  { input: ['abc123def456'], expectedOutput: '123,456' },
                  { input: ['no numbers'], expectedOutput: '' },
                  { input: ['12 34 56'], expectedOutput: '12,34,56' },
                  { input: ['a1b2c3'], expectedOutput: '1,2,3' },
                  { input: ['100'], expectedOutput: '100' }
                ]
              },
              {
                description: 'Create a function that validates if a string is a valid email format (simple: word@word.word)',
                testCases: [
                  { input: ['test@example.com'], expectedOutput: 'true' },
                  { input: ['invalid'], expectedOutput: 'false' },
                  { input: ['no@dot'], expectedOutput: 'false' },
                  { input: ['a@b.c'], expectedOutput: 'true' },
                  { input: ['@test.com'], expectedOutput: 'false' }
                ]
              },
              {
                description: 'Create a function that checks if a string starts with a capital letter',
                testCases: [
                  { input: ['Hello'], expectedOutput: 'true' },
                  { input: ['hello'], expectedOutput: 'false' },
                  { input: ['123abc'], expectedOutput: 'false' },
                  { input: ['A'], expectedOutput: 'true' },
                  { input: [''], expectedOutput: 'false' }
                ]
              },
              {
                description: 'Create a function that replaces all vowels with asterisks',
                testCases: [
                  { input: ['hello'], expectedOutput: 'h*ll*' },
                  { input: ['AEIOU'], expectedOutput: '*****' },
                  { input: ['xyz'], expectedOutput: 'xyz' },
                  { input: [''], expectedOutput: '' },
                  { input: ['aEiOu'], expectedOutput: '*****' }
                ]
              },
              {
                description: 'Create a function that extracts words that start with a capital letter from a string',
                testCases: [
                  { input: ['Hello World from JavaScript'], expectedOutput: 'Hello,World,JavaScript' },
                  { input: ['no capitals here'], expectedOutput: '' },
                  { input: ['One Two Three'], expectedOutput: 'One,Two,Three' },
                  { input: ['ABC'], expectedOutput: 'ABC' },
                  { input: ['aA bB cC'], expectedOutput: '' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'objects',
        title: 'Objects',
        subtopics: [
          {
            id: 'objects',
            title: 'Objects',
            notes: `## Creating Objects
\`\`\`javascript
const person = {
  name: "Alice",
  age: 25,
  isStudent: true
};
\`\`\`

## Accessing Properties
\`\`\`javascript
// Dot notation
person.name;        // "Alice"

// Bracket notation (for dynamic keys)
person["name"];     // "Alice"
const key = "age";
person[key];        // 25
\`\`\`

## Modifying Objects
\`\`\`javascript
person.age = 26;           // Update
person.email = "a@b.com";  // Add new property
delete person.isStudent;   // Remove property
\`\`\`

## Nested Objects
\`\`\`javascript
const user = {
  name: "Alice",
  address: {
    city: "NYC",
    zip: "10001"
  }
};
user.address.city;  // "NYC"
\`\`\`

## Object Methods
\`\`\`javascript
Object.keys(person);    // ["name", "age"]
Object.values(person);  // ["Alice", 25]
Object.entries(person); // [["name","Alice"],["age",25]]
\`\`\`

## Check Property Exists
\`\`\`javascript
"name" in person;              // true
person.hasOwnProperty("age");  // true
\`\`\`

## Iterate Properties
\`\`\`javascript
for (let key in person) {
  console.log(key, person[key]);
}

// Or with Object methods
Object.keys(person).forEach(key => {
  console.log(key, person[key]);
});
\`\`\`

## Access Nested Path
\`\`\`javascript
function getPath(obj, path) {
  return path.split('.').reduce((o, k) => o?.[k], obj);
}
getPath(user, "address.city");  // "NYC"
\`\`\``,
            outcomes: [
              'object_literal_syntax',    // Create objects using { key: value, ... } syntax
              'property_access_dot',      // Access properties with obj.property
              'property_access_bracket',  // Access properties with obj["property"]
              'dynamic_keys',             // Bracket notation allows variable/dynamic keys
              'adding_properties',        // Add new properties: obj.newKey = value
              'modifying_properties',     // Change existing: obj.key = newValue
              'deleting_properties',      // Remove with delete obj.key
              'nested_objects',           // Objects can contain other objects
              'object_methods',           // Functions as property values
              'this_keyword',             // 'this' refers to the object in methods
              'object_keys_values',       // Object.keys(), Object.values(), Object.entries()
              'for_in_loop',              // for (let key in obj) iterates properties
              'checking_properties'       // 'key' in obj, obj.hasOwnProperty('key')
            ],
            tasks: [
              {
                description: 'Create a function that takes a person object with name and age properties, returns a greeting like "Hello, I am {name} and I am {age} years old"',
                testCases: [
                  { input: [{ name: 'Alice', age: 25 }], expectedOutput: 'Hello, I am Alice and I am 25 years old' },
                  { input: [{ name: 'Bob', age: 30 }], expectedOutput: 'Hello, I am Bob and I am 30 years old' },
                  { input: [{ name: 'Charlie', age: 0 }], expectedOutput: 'Hello, I am Charlie and I am 0 years old' }
                ]
              },
              {
                description: 'Create a function that takes an object and a key name (string), returns the value at that key using bracket notation',
                testCases: [
                  { input: [{ name: 'Alice', age: 25 }, 'name'], expectedOutput: 'Alice' },
                  { input: [{ x: 10, y: 20 }, 'y'], expectedOutput: '20' },
                  { input: [{ a: 1 }, 'b'], expectedOutput: 'undefined' },
                  { input: [{}, 'any'], expectedOutput: 'undefined' }
                ]
              },
              {
                description: 'Create a function that takes an object and returns the number of properties it has',
                testCases: [
                  { input: [{ a: 1, b: 2, c: 3 }], expectedOutput: '3' },
                  { input: [{ name: 'test' }], expectedOutput: '1' },
                  { input: [{}], expectedOutput: '0' },
                  { input: [{ x: 1, y: 2, z: 3, w: 4 }], expectedOutput: '4' }
                ]
              },
              {
                description: 'Create a function that takes an object and returns an array of its keys (as comma-separated string)',
                testCases: [
                  { input: [{ a: 1, b: 2, c: 3 }], expectedOutput: 'a,b,c' },
                  { input: [{ name: 'Alice', age: 25 }], expectedOutput: 'name,age' },
                  { input: [{ single: 1 }], expectedOutput: 'single' },
                  { input: [{}], expectedOutput: '' }
                ]
              },
              {
                description: 'Create a function that takes an object and returns an array of its values (as comma-separated string)',
                testCases: [
                  { input: [{ a: 1, b: 2, c: 3 }], expectedOutput: '1,2,3' },
                  { input: [{ name: 'Alice', age: 25 }], expectedOutput: 'Alice,25' },
                  { input: [{ single: 100 }], expectedOutput: '100' },
                  { input: [{}], expectedOutput: '' }
                ]
              },
              {
                description: 'Create a function that takes an object and a key, returns true if the key exists in the object, false otherwise',
                testCases: [
                  { input: [{ name: 'Alice', age: 25 }, 'name'], expectedOutput: 'true' },
                  { input: [{ name: 'Alice', age: 25 }, 'email'], expectedOutput: 'false' },
                  { input: [{}, 'any'], expectedOutput: 'false' },
                  { input: [{ a: undefined }, 'a'], expectedOutput: 'true' }
                ]
              },
              {
                description: 'Create a function that takes an object with numeric values and returns the sum of all values',
                testCases: [
                  { input: [{ a: 10, b: 20, c: 30 }], expectedOutput: '60' },
                  { input: [{ x: 5 }], expectedOutput: '5' },
                  { input: [{ p: -10, q: 10 }], expectedOutput: '0' },
                  { input: [{}], expectedOutput: '0' }
                ]
              },
              {
                description: 'Create a function that takes a nested object like { person: { name: "Alice", address: { city: "NYC" } } } and a path like "person.address.city", returns the value at that path',
                testCases: [
                  { input: [{ person: { name: 'Alice' } }, 'person.name'], expectedOutput: 'Alice' },
                  { input: [{ a: { b: { c: 42 } } }, 'a.b.c'], expectedOutput: '42' },
                  { input: [{ x: 10 }, 'x'], expectedOutput: '10' },
                  { input: [{ a: { b: 1 } }, 'a.c'], expectedOutput: 'undefined' }
                ]
              },
              {
                description: 'Create a function that takes an object with numeric values and returns a new object with all values doubled',
                testCases: [
                  { input: [{ a: 1, b: 2, c: 3 }], expectedOutput: '{"a":2,"b":4,"c":6}' },
                  { input: [{ x: 10, y: 5 }], expectedOutput: '{"x":20,"y":10}' },
                  { input: [{ single: 50 }], expectedOutput: '{"single":100}' },
                  { input: [{}], expectedOutput: '{}' }
                ]
              },
              {
                description: 'Create a function that takes an object and a minimum value, returns a new object containing only properties where value >= minimum',
                testCases: [
                  { input: [{ a: 10, b: 5, c: 15, d: 3 }, 10], expectedOutput: '{"a":10,"c":15}' },
                  { input: [{ x: 100, y: 50 }, 60], expectedOutput: '{"x":100}' },
                  { input: [{ a: 1, b: 2 }, 10], expectedOutput: '{}' },
                  { input: [{}, 5], expectedOutput: '{}' }
                ]
              },
              {
                description: 'Create a function that takes two objects and returns a merged object (second object properties override first)',
                testCases: [
                  { input: [{ a: 1, b: 2 }, { b: 3, c: 4 }], expectedOutput: '{"a":1,"b":3,"c":4}' },
                  { input: [{ x: 10 }, { y: 20 }], expectedOutput: '{"x":10,"y":20}' },
                  { input: [{}, { a: 1 }], expectedOutput: '{"a":1}' },
                  { input: [{ a: 1 }, {}], expectedOutput: '{"a":1}' }
                ]
              },
              {
                description: 'Create a function that takes an array of objects with "name" and "score" properties, returns the name of the person with the highest score',
                testCases: [
                  { input: [[{ name: 'Alice', score: 85 }, { name: 'Bob', score: 92 }, { name: 'Charlie', score: 78 }]], expectedOutput: 'Bob' },
                  { input: [[{ name: 'Single', score: 100 }]], expectedOutput: 'Single' },
                  { input: [[{ name: 'A', score: 50 }, { name: 'B', score: 50 }]], expectedOutput: 'A' },
                  { input: [[{ name: 'Low', score: 10 }, { name: 'High', score: 99 }]], expectedOutput: 'High' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'json',
        title: 'JSON',
        subtopics: [
          {
            id: 'json',
            title: 'Data serialization',
            notes: `## What is JSON?
JavaScript Object Notation - text format for data exchange.

## JSON.stringify - Object to String
\`\`\`javascript
const obj = { name: "Alice", age: 25 };
const json = JSON.stringify(obj);
// '{"name":"Alice","age":25}'
\`\`\`

## JSON.parse - String to Object
\`\`\`javascript
const json = '{"name":"Bob","age":30}';
const obj = JSON.parse(json);
obj.name;  // "Bob"
\`\`\`

## Pretty Printing
\`\`\`javascript
JSON.stringify(obj, null, 2);
// {
//   "name": "Alice",
//   "age": 25
// }
\`\`\`

## Deep Clone
\`\`\`javascript
const original = { a: 1, b: { c: 2 } };
const clone = JSON.parse(JSON.stringify(original));
// clone is a completely separate copy
\`\`\`

## Check Valid JSON
\`\`\`javascript
function isValidJSON(str) {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
}
isValidJSON('{"valid":true}');  // true
isValidJSON('not json');         // false
\`\`\`

## JSON Limitations
\`\`\`javascript
// Cannot store:
// - Functions
// - undefined
// - Symbols
// - Circular references
\`\`\`

## Key Points
- JSON keys must be double-quoted strings
- Values: string, number, boolean, null, array, object
- \`stringify\` for saving/sending
- \`parse\` for loading/receiving`,
            outcomes: [
              'what_is_json',                 // JavaScript Object Notation - text format for storing/exchanging data
              'json_syntax',                  // Keys must be double-quoted strings, values can be string/number/boolean/null/array/object
              'json_stringify',               // JSON.stringify(obj) converts JS object to JSON string
              'json_parse',                   // JSON.parse(jsonString) converts JSON string to JS object
              'stringify_spacing',            // JSON.stringify(obj, null, 2) for pretty printing with indentation
              'stringify_replacer',           // JSON.stringify(obj, replacer) to filter/transform values
              'parse_reviver',                // JSON.parse(str, reviver) to transform values during parsing
              'json_limitations',             // Cannot store functions, undefined, symbols, circular references
              'deep_clone_with_json',         // JSON.parse(JSON.stringify(obj)) creates a deep copy (with limitations)
              'json_vs_object_literal'        // JSON is a string format; object literal is JS code
            ],
            tasks: [
              {
                description: 'Create a function that converts an object to a JSON string',
                testCases: [
                  { input: [{ name: 'Alice', age: 25 }], expectedOutput: '{"name":"Alice","age":25}' },
                  { input: [{ x: 1, y: 2 }], expectedOutput: '{"x":1,"y":2}' },
                  { input: [{}], expectedOutput: '{}' },
                  { input: [{ active: true }], expectedOutput: '{"active":true}' },
                  { input: [{ items: [1, 2, 3] }], expectedOutput: '{"items":[1,2,3]}' }
                ]
              },
              {
                description: 'Create a function that parses a JSON string and returns the value of a specific key',
                testCases: [
                  { input: ['{"name":"Bob","age":30}', 'name'], expectedOutput: 'Bob' },
                  { input: ['{"x":100,"y":200}', 'y'], expectedOutput: '200' },
                  { input: ['{"active":true}', 'active'], expectedOutput: 'true' },
                  { input: ['{"data":null}', 'data'], expectedOutput: 'null' },
                  { input: ['{"missing":"value"}', 'other'], expectedOutput: 'undefined' }
                ]
              },
              {
                description: 'Create a function that pretty prints an object as JSON with 2-space indentation (return the string)',
                testCases: [
                  { input: [{ a: 1 }], expectedOutput: '{\n  "a": 1\n}' },
                  { input: [{ x: 1, y: 2 }], expectedOutput: '{\n  "x": 1,\n  "y": 2\n}' },
                  { input: [{}], expectedOutput: '{}' },
                  { input: [{ name: "test" }], expectedOutput: '{\n  "name": "test"\n}' },
                  { input: [{ arr: [1] }], expectedOutput: '{\n  "arr": [\n    1\n  ]\n}' }
                ]
              },
              {
                description: 'Create a function that deep clones an object using JSON methods',
                testCases: [
                  { input: [{ a: 1, b: { c: 2 } }], expectedOutput: 'true' },
                  { input: [{ arr: [1, 2, 3] }], expectedOutput: 'true' },
                  { input: [{ x: { y: { z: 1 } } }], expectedOutput: 'true' },
                  { input: [{}], expectedOutput: 'true' },
                  { input: [{ data: [1, { nested: true }] }], expectedOutput: 'true' }
                ]
              },
              {
                description: 'Create a function that converts a JSON string to an object and returns the count of keys',
                testCases: [
                  { input: ['{"a":1,"b":2,"c":3}'], expectedOutput: '3' },
                  { input: ['{}'], expectedOutput: '0' },
                  { input: ['{"single":1}'], expectedOutput: '1' },
                  { input: ['{"x":1,"y":2}'], expectedOutput: '2' },
                  { input: ['{"a":1,"b":2,"c":3,"d":4,"e":5}'], expectedOutput: '5' }
                ]
              },
              {
                description: 'Create a function that checks if a string is valid JSON (returns true/false)',
                testCases: [
                  { input: ['{"valid":true}'], expectedOutput: 'true' },
                  { input: ['not json'], expectedOutput: 'false' },
                  { input: ['{"incomplete":'], expectedOutput: 'false' },
                  { input: ['[]'], expectedOutput: 'true' },
                  { input: ['null'], expectedOutput: 'true' }
                ]
              },
              {
                description: 'Create a function that merges two JSON strings into one object and returns as JSON string',
                testCases: [
                  { input: ['{"a":1}', '{"b":2}'], expectedOutput: '{"a":1,"b":2}' },
                  { input: ['{}', '{"x":1}'], expectedOutput: '{"x":1}' },
                  { input: ['{"a":1}', '{"a":2}'], expectedOutput: '{"a":2}' },
                  { input: ['{}', '{}'], expectedOutput: '{}' },
                  { input: ['{"x":1,"y":2}', '{"z":3}'], expectedOutput: '{"x":1,"y":2,"z":3}' }
                ]
              },
              {
                description: 'Create a function that extracts all string values from a JSON object into an array',
                testCases: [
                  { input: ['{"name":"Alice","city":"NYC","age":25}'], expectedOutput: 'Alice,NYC' },
                  { input: ['{"a":"x","b":"y","c":"z"}'], expectedOutput: 'x,y,z' },
                  { input: ['{"num":123}'], expectedOutput: '' },
                  { input: ['{}'], expectedOutput: '' },
                  { input: ['{"mixed":"text","number":42,"bool":true}'], expectedOutput: 'text' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'map-set',
        title: 'Map and Set',
        subtopics: [
          {
            id: 'map-set',
            title: 'Specialized collections',
            notes: `## Map - Key-Value Pairs (Any Key Type)
\`\`\`javascript
const map = new Map();
map.set('name', 'Alice');
map.set(1, 'one');
map.get('name');     // 'Alice'
map.has('name');     // true
map.delete('name');  // removes
map.size;            // count
map.clear();         // removes all
\`\`\`

## Map from Array
\`\`\`javascript
const map = new Map([
  ['a', 1],
  ['b', 2]
]);
\`\`\`

## Map Iteration
\`\`\`javascript
for (let [key, value] of map) {
  console.log(key, value);
}
\`\`\`

## Set - Unique Values Only
\`\`\`javascript
const set = new Set();
set.add(1);
set.add(2);
set.add(1);   // Ignored (duplicate)
set.has(1);   // true
set.size;     // 2
set.delete(1);
\`\`\`

## Remove Duplicates
\`\`\`javascript
const arr = [1, 2, 2, 3, 3, 3];
const unique = [...new Set(arr)];  // [1, 2, 3]
\`\`\`

## Count Occurrences with Map
\`\`\`javascript
function countItems(arr) {
  const counts = new Map();
  for (let item of arr) {
    counts.set(item, (counts.get(item) || 0) + 1);
  }
  return counts;
}
\`\`\`

## Check Common Elements
\`\`\`javascript
function hasCommon(arr1, arr2) {
  const set = new Set(arr1);
  return arr2.some(item => set.has(item));
}
\`\`\`

## Set Operations
\`\`\`javascript
// Intersection
const intersection = [...set1].filter(x => set2.has(x));

// Union
const union = new Set([...set1, ...set2]);
\`\`\`

## Map vs Object
- Map: any key type, ordered, .size property
- Object: string/symbol keys only

## Set vs Array
- Set: unique values, O(1) lookup
- Array: allows duplicates, indexed`,
            outcomes: [
              'what_is_map',                  // Map stores key-value pairs where keys can be any type (not just strings)
              'map_creation',                 // new Map() or new Map([[key, value], ...])
              'map_set_get',                  // map.set(key, value) adds, map.get(key) retrieves
              'map_has_delete',               // map.has(key) checks existence, map.delete(key) removes
              'map_size_clear',               // map.size for count, map.clear() removes all
              'map_iteration',                // for...of iterates [key, value] pairs; map.keys(), map.values(), map.entries()
              'what_is_set',                  // Set stores unique values only, duplicates are ignored
              'set_creation',                 // new Set() or new Set([values])
              'set_add_has_delete',           // set.add(value), set.has(value), set.delete(value)
              'set_size_clear',               // set.size for count, set.clear() removes all
              'set_iteration',                // for...of iterates values; set.values()
              'array_to_set_unique',          // [...new Set(array)] removes duplicates from array
              'map_vs_object',                // Map: any key type, ordered, size property; Object: string keys, methods
              'set_vs_array'                  // Set: unique values, O(1) lookup; Array: duplicates allowed, indexed
            ],
            tasks: [
              {
                description: 'Create a function that counts how many times each element appears in an array using a Map',
                testCases: [
                  { input: [['a', 'b', 'a', 'c', 'b', 'a']], expectedOutput: 'a:3,b:2,c:1' },
                  { input: [['x']], expectedOutput: 'x:1' },
                  { input: [[1, 1, 1]], expectedOutput: '1:3' },
                  { input: [['a', 'b', 'c']], expectedOutput: 'a:1,b:1,c:1' },
                  { input: [[]], expectedOutput: '' }
                ]
              },
              {
                description: 'Create a function that removes all duplicate values from an array using a Set',
                testCases: [
                  { input: [[1, 2, 2, 3, 3, 3]], expectedOutput: '1,2,3' },
                  { input: [[1, 1, 1]], expectedOutput: '1' },
                  { input: [[1, 2, 3]], expectedOutput: '1,2,3' },
                  { input: [[]], expectedOutput: '' },
                  { input: [['a', 'b', 'a']], expectedOutput: 'a,b' }
                ]
              },
              {
                description: 'Create a function that checks if two arrays have any common elements using a Set',
                testCases: [
                  { input: [[1, 2, 3], [3, 4, 5]], expectedOutput: 'true' },
                  { input: [[1, 2], [3, 4]], expectedOutput: 'false' },
                  { input: [[], [1, 2]], expectedOutput: 'false' },
                  { input: [[1], [1]], expectedOutput: 'true' },
                  { input: [['a', 'b'], ['b', 'c']], expectedOutput: 'true' }
                ]
              },
              {
                description: 'Create a function that finds the intersection of two arrays (elements in both) using Sets',
                testCases: [
                  { input: [[1, 2, 3, 4], [3, 4, 5, 6]], expectedOutput: '3,4' },
                  { input: [[1, 2], [3, 4]], expectedOutput: '' },
                  { input: [[1, 1, 2], [2, 2, 3]], expectedOutput: '2' },
                  { input: [[], [1, 2]], expectedOutput: '' },
                  { input: [[5], [5]], expectedOutput: '5' }
                ]
              },
              {
                description: 'Create a function that finds the union of two arrays (all unique elements from both) using Sets',
                testCases: [
                  { input: [[1, 2, 3], [3, 4, 5]], expectedOutput: '1,2,3,4,5' },
                  { input: [[1, 1], [2, 2]], expectedOutput: '1,2' },
                  { input: [[], [1, 2]], expectedOutput: '1,2' },
                  { input: [[1, 2], []], expectedOutput: '1,2' },
                  { input: [['a'], ['b']], expectedOutput: 'a,b' }
                ]
              },
              {
                description: 'Create a function that groups an array of objects by a property value using a Map',
                testCases: [
                  { input: [[{ type: 'a', val: 1 }, { type: 'b', val: 2 }, { type: 'a', val: 3 }], 'type'], expectedOutput: 'a:2,b:1' },
                  { input: [[{ cat: 'x', n: 1 }], 'cat'], expectedOutput: 'x:1' },
                  { input: [[], 'type'], expectedOutput: '' },
                  { input: [[{ g: 1 }, { g: 1 }, { g: 2 }], 'g'], expectedOutput: '1:2,2:1' },
                  { input: [[{ k: 'a' }, { k: 'a' }, { k: 'a' }], 'k'], expectedOutput: 'a:3' }
                ]
              },
              {
                description: 'Create a function that returns the first duplicate value in an array using a Set, or null if none',
                testCases: [
                  { input: [[1, 2, 3, 2, 4]], expectedOutput: '2' },
                  { input: [[1, 2, 3]], expectedOutput: 'null' },
                  { input: [[5, 5]], expectedOutput: '5' },
                  { input: [[]], expectedOutput: 'null' },
                  { input: [['a', 'b', 'c', 'a']], expectedOutput: 'a' }
                ]
              },
              {
                description: 'Create a function that converts a Map to an array of [key, value] pairs sorted by key',
                testCases: [
                  { input: [[['c', 3], ['a', 1], ['b', 2]]], expectedOutput: 'a:1,b:2,c:3' },
                  { input: [[['z', 1]]], expectedOutput: 'z:1' },
                  { input: [[]], expectedOutput: '' },
                  { input: [[['b', 2], ['a', 1]]], expectedOutput: 'a:1,b:2' },
                  { input: [[['x', 10], ['y', 20], ['w', 5]]], expectedOutput: 'w:5,x:10,y:20' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'destructuring',
        title: 'Destructuring',
        subtopics: [
          {
            id: 'destructuring',
            title: 'Destructuring',
            notes: `## Array Destructuring
Extract values from arrays into variables.

\`\`\`javascript
const [first, second] = [1, 2, 3];
// first = 1, second = 2

const [a, , c] = [1, 2, 3];  // Skip elements
// a = 1, c = 3

const [x, ...rest] = [1, 2, 3, 4];
// x = 1, rest = [2, 3, 4]
\`\`\`

## Default Values
\`\`\`javascript
const [a = 10, b = 20] = [5];
// a = 5, b = 20 (default used)
\`\`\`

## Object Destructuring
\`\`\`javascript
const { name, age } = { name: "Alice", age: 25 };
// name = "Alice", age = 25
\`\`\`

## Renaming Variables
\`\`\`javascript
const { name: userName } = { name: "Alice" };
// userName = "Alice"
\`\`\`

## Default Values in Objects
\`\`\`javascript
const { name, country = "Unknown" } = { name: "Bob" };
// country = "Unknown"
\`\`\`

## Nested Destructuring
\`\`\`javascript
const { user: { name, address: { city } } } = {
  user: { name: "Alice", address: { city: "NYC" } }
};
// name = "Alice", city = "NYC"
\`\`\`

## Function Parameters
\`\`\`javascript
function greet({ name, age }) {
  return \`\${name} is \${age}\`;
}
greet({ name: "Alice", age: 25 });
\`\`\`

## Swap Variables
\`\`\`javascript
let a = 1, b = 2;
[a, b] = [b, a];
// a = 2, b = 1
\`\`\``,
            outcomes: [
              'array_destructuring_syntax',  // const [a, b] = arr; extracts elements into variables
              'skip_elements',               // const [first, , third] = arr; skips elements
              'rest_in_arrays',              // const [first, ...rest] = arr; collects remaining
              'default_values_array',        // const [a = 10] = arr; provides default if undefined
              'object_destructuring_syntax', // const { name, age } = obj; extracts properties
              'rename_variables',            // const { name: userName } = obj; renames while extracting
              'default_values_object',       // const { name = 'Unknown' } = obj; provides defaults
              'nested_destructuring',        // Destructure nested arrays/objects
              'function_parameters',         // Destructure directly in function parameters
              'swap_variables'               // [a, b] = [b, a]; swap without temp variable
            ],
            tasks: [
              {
                description: 'Create a function that takes an array and returns the first two elements as a string "first, second" using array destructuring',
                testCases: [
                  { input: [[1, 2, 3, 4]], expectedOutput: '1, 2' },
                  { input: [['a', 'b', 'c']], expectedOutput: 'a, b' },
                  { input: [[10, 20]], expectedOutput: '10, 20' },
                  { input: [['only', 'two']], expectedOutput: 'only, two' }
                ]
              },
              {
                description: 'Create a function that takes an array and returns the first and third elements as "first, third" (skip the second) using destructuring',
                testCases: [
                  { input: [[1, 2, 3, 4]], expectedOutput: '1, 3' },
                  { input: [['a', 'b', 'c', 'd']], expectedOutput: 'a, c' },
                  { input: [[10, 20, 30]], expectedOutput: '10, 30' },
                  { input: [['x', 'skip', 'z']], expectedOutput: 'x, z' }
                ]
              },
              {
                description: 'Create a function that takes an array and returns the first element and the count of remaining elements as "first: X, remaining: Y"',
                testCases: [
                  { input: [[1, 2, 3, 4, 5]], expectedOutput: 'first: 1, remaining: 4' },
                  { input: [['a', 'b', 'c']], expectedOutput: 'first: a, remaining: 2' },
                  { input: [[10]], expectedOutput: 'first: 10, remaining: 0' },
                  { input: [[1, 2]], expectedOutput: 'first: 1, remaining: 1' }
                ]
              },
              {
                description: 'Create a function that takes a person object with name and age, returns "Name: {name}, Age: {age}" using object destructuring',
                testCases: [
                  { input: [{ name: 'Alice', age: 25 }], expectedOutput: 'Name: Alice, Age: 25' },
                  { input: [{ name: 'Bob', age: 30 }], expectedOutput: 'Name: Bob, Age: 30' },
                  { input: [{ name: 'Charlie', age: 0 }], expectedOutput: 'Name: Charlie, Age: 0' }
                ]
              },
              {
                description: 'Create a function that takes an object with property "name" and returns it renamed as "userName" in the format "User: {userName}"',
                testCases: [
                  { input: [{ name: 'Alice' }], expectedOutput: 'User: Alice' },
                  { input: [{ name: 'Bob' }], expectedOutput: 'User: Bob' },
                  { input: [{ name: 'Admin' }], expectedOutput: 'User: Admin' }
                ]
              },
              {
                description: 'Create a function that takes an object and returns "Name: {name}, Country: {country}" where country defaults to "Unknown" if not provided',
                testCases: [
                  { input: [{ name: 'Alice', country: 'USA' }], expectedOutput: 'Name: Alice, Country: USA' },
                  { input: [{ name: 'Bob' }], expectedOutput: 'Name: Bob, Country: Unknown' },
                  { input: [{ name: 'Charlie', country: 'UK' }], expectedOutput: 'Name: Charlie, Country: UK' },
                  { input: [{ name: 'David', country: undefined }], expectedOutput: 'Name: David, Country: Unknown' }
                ]
              },
              {
                description: 'Create a function that takes a nested object { user: { name, address: { city } } } and returns "Name: {name}, City: {city}" using nested destructuring',
                testCases: [
                  { input: [{ user: { name: 'Alice', address: { city: 'NYC' } } }], expectedOutput: 'Name: Alice, City: NYC' },
                  { input: [{ user: { name: 'Bob', address: { city: 'LA' } } }], expectedOutput: 'Name: Bob, City: LA' },
                  { input: [{ user: { name: 'Charlie', address: { city: 'Chicago' } } }], expectedOutput: 'Name: Charlie, City: Chicago' }
                ]
              },
              {
                description: 'Create a function that takes an object { x, y } as parameter (destructure in params) and returns the sum x + y',
                testCases: [
                  { input: [{ x: 5, y: 3 }], expectedOutput: '8' },
                  { input: [{ x: 10, y: 20 }], expectedOutput: '30' },
                  { input: [{ x: -5, y: 5 }], expectedOutput: '0' },
                  { input: [{ x: 0, y: 0 }], expectedOutput: '0' }
                ]
              },
              {
                description: 'Create a function that takes an array [a, b] and returns them swapped as a string "b, a" using destructuring swap',
                testCases: [
                  { input: [[1, 2]], expectedOutput: '2, 1' },
                  { input: [['a', 'b']], expectedOutput: 'b, a' },
                  { input: [[10, 20]], expectedOutput: '20, 10' },
                  { input: [['first', 'second']], expectedOutput: 'second, first' }
                ]
              },
              {
                description: 'Create a function that takes an array of coordinate objects [{x, y}, {x, y}] and returns the sum of all x values and sum of all y values as "sumX: X, sumY: Y"',
                testCases: [
                  { input: [[{ x: 1, y: 2 }, { x: 3, y: 4 }]], expectedOutput: 'sumX: 4, sumY: 6' },
                  { input: [[{ x: 10, y: 20 }, { x: 30, y: 40 }]], expectedOutput: 'sumX: 40, sumY: 60' },
                  { input: [[{ x: 0, y: 0 }, { x: 5, y: 5 }]], expectedOutput: 'sumX: 5, sumY: 5' },
                  { input: [[{ x: -1, y: 1 }, { x: 1, y: -1 }]], expectedOutput: 'sumX: 0, sumY: 0' }
                ]
              },
              {
                description: 'Create a function that takes an array with first element as name (string) and rest as scores (numbers), returns "Name: {name}, Average: {avg}"',
                testCases: [
                  { input: [['Alice', 80, 90, 100]], expectedOutput: 'Name: Alice, Average: 90' },
                  { input: [['Bob', 70, 80]], expectedOutput: 'Name: Bob, Average: 75' },
                  { input: [['Charlie', 100]], expectedOutput: 'Name: Charlie, Average: 100' },
                  { input: [['David', 60, 70, 80, 90]], expectedOutput: 'Name: David, Average: 75' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'arrow-functions',
        title: 'Arrow Functions',
        subtopics: [
          {
            id: 'arrow-functions',
            title: 'Arrow Functions',
            notes: `## Arrow Function Syntax
Compact function syntax.

\`\`\`javascript
// Full syntax
const add = (a, b) => {
  return a + b;
};

// Concise (implicit return)
const add = (a, b) => a + b;

// Single parameter (no parens needed)
const double = x => x * 2;

// No parameters
const greet = () => "Hello!";
\`\`\`

## Implicit Return
\`\`\`javascript
// Single expression returns automatically
const square = n => n * n;

// Need explicit return with braces
const square = n => {
  return n * n;
};
\`\`\`

## Returning Objects
\`\`\`javascript
// Wrap object in parentheses
const makeObj = n => ({ value: n, squared: n * n });
\`\`\`

## With Array Methods
\`\`\`javascript
const nums = [1, 2, 3, 4];

nums.map(n => n * 2);           // [2, 4, 6, 8]
nums.filter(n => n > 2);        // [3, 4]
nums.reduce((a, n) => a + n, 0); // 10
\`\`\`

## Chaining
\`\`\`javascript
const result = [1, 2, 3, 4, 5]
  .filter(n => n > 2)
  .map(n => n * 2)
  .reduce((a, n) => a + n, 0);  // 24
\`\`\`

## Key Points
- Concise syntax for simple functions
- Implicit return for single expressions
- No own \`this\` (inherits from parent)
- Perfect for callbacks`,
            outcomes: [
              'arrow_syntax_full',         // (params) => { statements; return value; }
              'arrow_syntax_concise',      // (params) => expression (implicit return)
              'single_param_no_parens',    // x => x * 2 (parentheses optional for single param)
              'no_params_empty_parens',    // () => 'hello' (empty parens required)
              'implicit_return',           // Single expression returns automatically without 'return'
              'explicit_return',           // Need 'return' keyword when using braces {}
              'returning_objects',         // () => ({ key: value }) wrap objects in parens
              'arrow_with_array_methods',  // Perfect for map, filter, reduce callbacks
              'lexical_this',              // Arrows don't have own 'this', inherit from parent
              'when_not_to_use'            // Not for object methods that need 'this'
            ],
            tasks: [
              {
                description: 'Create an arrow function that takes a number and returns it doubled',
                testCases: [
                  { input: [5], expectedOutput: '10' },
                  { input: [0], expectedOutput: '0' },
                  { input: [-3], expectedOutput: '-6' },
                  { input: [100], expectedOutput: '200' }
                ]
              },
              {
                description: 'Create an arrow function that takes two numbers and returns their sum',
                testCases: [
                  { input: [3, 5], expectedOutput: '8' },
                  { input: [10, 20], expectedOutput: '30' },
                  { input: [-5, 5], expectedOutput: '0' },
                  { input: [0, 0], expectedOutput: '0' }
                ]
              },
              {
                description: 'Create an arrow function with no parameters that returns the string "Hello, World!"',
                testCases: [
                  { input: [], expectedOutput: 'Hello, World!' }
                ]
              },
              {
                description: 'Create an arrow function that takes a number and returns an object with properties "original" and "squared"',
                testCases: [
                  { input: [5], expectedOutput: '{"original":5,"squared":25}' },
                  { input: [3], expectedOutput: '{"original":3,"squared":9}' },
                  { input: [0], expectedOutput: '{"original":0,"squared":0}' },
                  { input: [-4], expectedOutput: '{"original":-4,"squared":16}' }
                ]
              },
              {
                description: 'Create an arrow function that takes a string and returns it in uppercase',
                testCases: [
                  { input: ['hello'], expectedOutput: 'HELLO' },
                  { input: ['JavaScript'], expectedOutput: 'JAVASCRIPT' },
                  { input: ['a'], expectedOutput: 'A' },
                  { input: [''], expectedOutput: '' }
                ]
              },
              {
                description: 'Create an arrow function that takes an array of numbers and returns a new array with each number tripled (use map)',
                testCases: [
                  { input: [[1, 2, 3]], expectedOutput: '3,6,9' },
                  { input: [[5, 10]], expectedOutput: '15,30' },
                  { input: [[0, -1, 1]], expectedOutput: '0,-3,3' },
                  { input: [[]], expectedOutput: '' }
                ]
              },
              {
                description: 'Create an arrow function that takes an array of numbers and returns only numbers greater than 5 (use filter)',
                testCases: [
                  { input: [[1, 6, 3, 8, 2, 10]], expectedOutput: '6,8,10' },
                  { input: [[1, 2, 3]], expectedOutput: '' },
                  { input: [[10, 20, 30]], expectedOutput: '10,20,30' },
                  { input: [[]], expectedOutput: '' }
                ]
              },
              {
                description: 'Create an arrow function that takes an array of numbers and returns their product (use reduce)',
                testCases: [
                  { input: [[1, 2, 3, 4]], expectedOutput: '24' },
                  { input: [[5, 5]], expectedOutput: '25' },
                  { input: [[10]], expectedOutput: '10' },
                  { input: [[]], expectedOutput: '1' }
                ]
              },
              {
                description: 'Create an arrow function that takes an array of numbers, filters out negatives, and returns the sum of remaining (chain filter + reduce)',
                testCases: [
                  { input: [[-1, 2, -3, 4, 5]], expectedOutput: '11' },
                  { input: [[1, 2, 3]], expectedOutput: '6' },
                  { input: [[-1, -2, -3]], expectedOutput: '0' },
                  { input: [[]], expectedOutput: '0' }
                ]
              },
              {
                description: 'Create an arrow function that takes an array of strings and returns the total length of all strings combined',
                testCases: [
                  { input: [['hello', 'world']], expectedOutput: '10' },
                  { input: [['a', 'ab', 'abc']], expectedOutput: '6' },
                  { input: [['test']], expectedOutput: '4' },
                  { input: [[]], expectedOutput: '0' },
                  { input: [['', 'hi', '']], expectedOutput: '2' }
                ]
              },
              {
                description: 'Create an arrow function that takes an array of numbers and returns a new array containing only unique values (hint: use filter with indexOf)',
                testCases: [
                  { input: [[1, 2, 2, 3, 3, 3]], expectedOutput: '1,2,3' },
                  { input: [[5, 5, 5]], expectedOutput: '5' },
                  { input: [[1, 2, 3]], expectedOutput: '1,2,3' },
                  { input: [[]], expectedOutput: '' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'closures',
        title: 'Closures',
        subtopics: [
          {
            id: 'closures',
            title: 'Functions remembering their scope',
            notes: `## What is a Closure?
A function that remembers variables from its outer scope.

\`\`\`javascript
function outer() {
  let count = 0;  // Private variable
  return function inner() {
    count++;
    return count;
  };
}
const counter = outer();
counter();  // 1
counter();  // 2
counter();  // 3
\`\`\`

## Function Factory
\`\`\`javascript
function createAdder(x) {
  return function(y) {
    return x + y;
  };
}
const add5 = createAdder(5);
add5(3);   // 8
add5(10);  // 15
\`\`\`

## Multiplier Factory
\`\`\`javascript
function createMultiplier(mult) {
  return n => n * mult;
}
const double = createMultiplier(2);
const triple = createMultiplier(3);
double(5);  // 10
triple(5);  // 15
\`\`\`

## Counter with Methods
\`\`\`javascript
function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count,
    getValue: () => count
  };
}
const c = createCounter();
c.increment();  // 1
c.increment();  // 2
c.getValue();   // 2
\`\`\`

## Range Checker
\`\`\`javascript
function createRangeChecker(min, max) {
  return n => n >= min && n <= max;
}
const isTeenager = createRangeChecker(13, 19);
isTeenager(15);  // true
isTeenager(25);  // false
\`\`\`

## Once Function
\`\`\`javascript
function once(fn) {
  let called = false;
  let result;
  return function(...args) {
    if (!called) {
      result = fn(...args);
      called = true;
    }
    return result;
  };
}
\`\`\`

## Key Points
- Inner function "closes over" outer variables
- Data privacy (encapsulation)
- State persistence between calls
- Foundation for many patterns`,
            outcomes: [
              'what_is_closure',              // A function that remembers variables from its outer scope even after outer function returns
              'lexical_scope',                // Functions access variables from where they were defined, not where they are called
              'closure_creation',             // A closure is created when an inner function references outer variables
              'data_privacy',                 // Closures can hide variables from outside access (encapsulation)
              'function_factories',           // Functions that return customized functions using closures
              'maintaining_state',            // Closures can maintain state between function calls
              'counter_pattern',              // Classic example: a function that increments and returns a private count
              'closure_in_loops',             // Each iteration needs its own closure to capture current value
              'practical_uses'                // Event handlers, callbacks, module pattern, partial application
            ],
            tasks: [
              {
                description: 'Create a function that returns another function. The inner function should add a fixed number (from outer scope) to its argument',
                testCases: [
                  { input: [5, 3], expectedOutput: '8' },
                  { input: [10, 7], expectedOutput: '17' },
                  { input: [0, 5], expectedOutput: '5' },
                  { input: [-5, 10], expectedOutput: '5' },
                  { input: [100, 1], expectedOutput: '101' }
                ]
              },
              {
                description: 'Create a counter function that returns an object with increment, decrement, and getValue methods sharing a private count variable',
                testCases: [
                  { input: ['increment', 'increment', 'getValue'], expectedOutput: '2' },
                  { input: ['increment', 'decrement', 'getValue'], expectedOutput: '0' },
                  { input: ['decrement', 'decrement', 'getValue'], expectedOutput: '-2' },
                  { input: ['getValue'], expectedOutput: '0' },
                  { input: ['increment', 'increment', 'increment', 'getValue'], expectedOutput: '3' }
                ]
              },
              {
                description: 'Create a function that takes a multiplier and returns a function that multiplies any number by that multiplier',
                testCases: [
                  { input: [2, 5], expectedOutput: '10' },
                  { input: [3, 4], expectedOutput: '12' },
                  { input: [0, 100], expectedOutput: '0' },
                  { input: [10, 10], expectedOutput: '100' },
                  { input: [-2, 5], expectedOutput: '-10' }
                ]
              },
              {
                description: 'Create a function that creates a greeting function with a fixed greeting prefix (e.g., "Hello" or "Hi")',
                testCases: [
                  { input: ['Hello', 'World'], expectedOutput: 'Hello, World!' },
                  { input: ['Hi', 'Alice'], expectedOutput: 'Hi, Alice!' },
                  { input: ['Welcome', 'User'], expectedOutput: 'Welcome, User!' },
                  { input: ['Hey', 'Bob'], expectedOutput: 'Hey, Bob!' },
                  { input: ['Greetings', 'Friend'], expectedOutput: 'Greetings, Friend!' }
                ]
              },
              {
                description: 'Create a function that returns a function to check if a number is within a fixed range (min and max from outer scope)',
                testCases: [
                  { input: [1, 10, 5], expectedOutput: 'true' },
                  { input: [1, 10, 15], expectedOutput: 'false' },
                  { input: [0, 100, 0], expectedOutput: 'true' },
                  { input: [0, 100, 100], expectedOutput: 'true' },
                  { input: [-10, 10, 0], expectedOutput: 'true' }
                ]
              },
              {
                description: 'Create a function that maintains a running total. Each call adds to the total and returns the new sum',
                testCases: [
                  { input: [[5, 3, 2]], expectedOutput: '10' },
                  { input: [[10]], expectedOutput: '10' },
                  { input: [[1, 1, 1, 1]], expectedOutput: '4' },
                  { input: [[-5, 10]], expectedOutput: '5' },
                  { input: [[0, 0, 0]], expectedOutput: '0' }
                ]
              },
              {
                description: 'Create a function that generates unique IDs. Each call returns the next number in sequence starting from 1',
                testCases: [
                  { input: [3], expectedOutput: '1,2,3' },
                  { input: [1], expectedOutput: '1' },
                  { input: [5], expectedOutput: '1,2,3,4,5' },
                  { input: [2], expectedOutput: '1,2' },
                  { input: [4], expectedOutput: '1,2,3,4' }
                ]
              },
              {
                description: 'Create a once function that ensures a given function can only be executed once, returning the cached result on subsequent calls',
                testCases: [
                  { input: [5, 3], expectedOutput: '8,8,8' },
                  { input: [10, 20], expectedOutput: '30,30,30' },
                  { input: [0, 0], expectedOutput: '0,0,0' },
                  { input: [-5, 5], expectedOutput: '0,0,0' },
                  { input: [100, 1], expectedOutput: '101,101,101' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'array-advanced',
        title: 'Array Advanced Patterns',
        subtopics: [
          {
            id: 'array-advanced-patterns',
            title: 'Method chaining and nested arrays',
            notes: `## Method Chaining
Chain multiple array methods together.

\`\`\`javascript
const result = [1, 2, 3, 4, 5, 6]
  .filter(n => n % 2 === 0)  // [2, 4, 6]
  .map(n => n * 2)           // [4, 8, 12]
  .reduce((a, n) => a + n, 0); // 24
\`\`\`

## 2D Arrays (Matrices)
\`\`\`javascript
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
matrix[1][2];  // 6 (row 1, col 2)
\`\`\`

## Sum All Elements in 2D Array
\`\`\`javascript
function sum2D(matrix) {
  return matrix.flat().reduce((a, n) => a + n, 0);
}
\`\`\`

## flat() - Flatten Arrays
\`\`\`javascript
[[1, 2], [3, 4]].flat();     // [1, 2, 3, 4]
[1, [2, [3]]].flat();        // [1, 2, [3]] (one level)
[1, [2, [3]]].flat(2);       // [1, 2, 3] (two levels)
[1, [2, [3]]].flat(Infinity); // [1, 2, 3] (all levels)
\`\`\`

## flatMap() - Map + Flatten
\`\`\`javascript
const arr = [[1, 2], [3]];
arr.flatMap(x => x.map(n => n * 2));  // [2, 4, 6]
\`\`\`

## Row with Max Sum
\`\`\`javascript
function maxRowIndex(matrix) {
  let maxSum = -Infinity;
  let maxIdx = 0;
  matrix.forEach((row, i) => {
    const sum = row.reduce((a, n) => a + n, 0);
    if (sum > maxSum) {
      maxSum = sum;
      maxIdx = i;
    }
  });
  return maxIdx;
}
\`\`\`

## Transpose Matrix
\`\`\`javascript
function transpose(matrix) {
  return matrix[0].map((_, i) => 
    matrix.map(row => row[i])
  );
}
\`\`\`

## Key Points
- Chain methods for complex transformations
- Use \`flat()\` to flatten nested arrays
- Use \`flatMap()\` for map + flatten in one step`,
            outcomes: [
              'Chain multiple array methods together for data transformation',
              'Read and understand chained method calls from left to right',
              'Format chained operations for readability (one method per line)',
              'Create 2D arrays (arrays containing arrays)',
              'Access elements in nested arrays using multiple indices',
              'Iterate over nested arrays using forEach or map',
              'Use .flat() to flatten nested arrays to a single level',
              'Use .flat(depth) to control flattening depth',
              'Use .flatMap() to map and flatten in one step',
              'Combine filter, map, and reduce to solve complex problems',
              'Choose the right combination of methods for a given problem'
            ],
            tasks: [
              {
                description: 'Create a function that takes an array of numbers and returns the sum of all even numbers doubled',
                testCases: [
                  { input: [[1, 2, 3, 4]], expectedOutput: '12' },
                  { input: [[1, 3, 5]], expectedOutput: '0' },
                  { input: [[]], expectedOutput: '0' },
                  { input: [[2]], expectedOutput: '4' },
                  { input: [[-2, -4, 0]], expectedOutput: '-12' }
                ]
              },
              {
                description: 'Create a function that takes an array of numbers and returns the product of all positive numbers incremented by 1',
                testCases: [
                  { input: [[1, 2, 3]], expectedOutput: '24' },
                  { input: [[-1, -2, -3]], expectedOutput: '1' },
                  { input: [[]], expectedOutput: '1' },
                  { input: [[5]], expectedOutput: '6' },
                  { input: [[0, 1, 2]], expectedOutput: '6' }
                ]
              },
              {
                description: 'Create a function that takes an array of strings and returns a single string of all words longer than 3 characters, uppercased and joined by hyphens',
                testCases: [
                  { input: [['the', 'quick', 'fox']], expectedOutput: 'QUICK' },
                  { input: [['hi', 'to', 'go']], expectedOutput: '' },
                  { input: [[]], expectedOutput: '' },
                  { input: [['hello', 'world']], expectedOutput: 'HELLO-WORLD' },
                  { input: [['Test']], expectedOutput: 'TEST' }
                ]
              },
              {
                description: 'Create a function that takes a 2D array (matrix) and row and column indices, and returns the element at that position',
                testCases: [
                  { input: [[[1, 2, 3], [4, 5, 6]], 1, 2], expectedOutput: '6' },
                  { input: [[[1, 2], [3, 4]], 0, 0], expectedOutput: '1' },
                  { input: [[['a', 'b'], ['c', 'd']], 1, 1], expectedOutput: 'd' },
                  { input: [[[42]], 0, 0], expectedOutput: '42' },
                  { input: [[[1, 2, 3, 4, 5]], 0, 4], expectedOutput: '5' }
                ]
              },
              {
                description: 'Create a function that takes a 2D array of numbers and returns the sum of all elements',
                testCases: [
                  { input: [[[1, 2], [3, 4]]], expectedOutput: '10' },
                  { input: [[[5]]], expectedOutput: '5' },
                  { input: [[[]]], expectedOutput: '0' },
                  { input: [[[1, -1], [2, -2]]], expectedOutput: '0' },
                  { input: [[[-5, -3], [-2]]], expectedOutput: '-10' }
                ]
              },
              {
                description: 'Create a function that takes a nested array and returns a flattened array (one level deep)',
                testCases: [
                  { input: [[[1, 2], [3, 4]]], expectedOutput: '1,2,3,4' },
                  { input: [[[1]]], expectedOutput: '1' },
                  { input: [[[], [1], []]], expectedOutput: '1' },
                  { input: [[[1, [2, 3]], [4]]], expectedOutput: '1,2,3,4' },
                  { input: [[['a'], ['b']]], expectedOutput: 'a,b' }
                ]
              },
              {
                description: 'Create a function that takes an array of arrays of numbers and returns a flat array with each number squared',
                testCases: [
                  { input: [[[1, 2], [3]]], expectedOutput: '1,4,9' },
                  { input: [[[]]], expectedOutput: '' },
                  { input: [[[-2], [3]]], expectedOutput: '4,9' },
                  { input: [[[0, 1]]], expectedOutput: '0,1' },
                  { input: [[[5]]], expectedOutput: '25' }
                ]
              },
              {
                description: 'Create a function that takes a 2D array of numbers and returns the index of the row with the maximum sum',
                testCases: [
                  { input: [[[1, 2], [5, 6], [3, 4]]], expectedOutput: '1' },
                  { input: [[[10, 20], [5, 5]]], expectedOutput: '0' },
                  { input: [[[1], [2], [3]]], expectedOutput: '2' },
                  { input: [[[-1, -2], [-3, -4]]], expectedOutput: '0' },
                  { input: [[[100]]], expectedOutput: '0' }
                ]
              },
              {
                description: 'Create a function that takes an array of objects with name and score properties, and returns the average score of entries with scores above 50',
                testCases: [
                  { input: [[{ name: 'A', score: 60 }, { name: 'B', score: 80 }]], expectedOutput: '70' },
                  { input: [[{ name: 'A', score: 30 }, { name: 'B', score: 40 }]], expectedOutput: '0' },
                  { input: [[]], expectedOutput: '0' },
                  { input: [[{ name: 'Solo', score: 100 }]], expectedOutput: '100' },
                  { input: [[{ name: 'A', score: 51 }, { name: 'B', score: 49 }]], expectedOutput: '51' }
                ]
              },
              {
                description: 'Create a function that takes a 2D array (square matrix) and returns its transpose (rows become columns)',
                testCases: [
                  { input: [[[1, 2], [3, 4]]], expectedOutput: '1,3|2,4' },
                  { input: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]], expectedOutput: '1,4,7|2,5,8|3,6,9' },
                  { input: [[[1]]], expectedOutput: '1' },
                  { input: [[[0, 1], [1, 0]]], expectedOutput: '0,1|1,0' },
                  { input: [[['a', 'b'], ['c', 'd']]], expectedOutput: 'a,c|b,d' }
                ]
              },
              {
                description: 'Create a function that takes an array of words and returns the total character count of words that start with a vowel',
                testCases: [
                  { input: [['apple', 'banana', 'orange']], expectedOutput: '11' },
                  { input: [['cat', 'dog', 'fish']], expectedOutput: '0' },
                  { input: [[]], expectedOutput: '0' },
                  { input: [['a', 'e', 'i']], expectedOutput: '3' },
                  { input: [['Apple', 'UMBRELLA']], expectedOutput: '13' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'spread-rest',
        title: 'Spread and Rest Operators',
        subtopics: [
          {
            id: 'spread-rest',
            title: 'Spread and rest operators',
            notes: `## Spread Operator (...)
Unpacks elements from arrays/objects.

## Spread with Arrays
\`\`\`javascript
// Copy array
const copy = [...original];

// Merge arrays
const merged = [...arr1, ...arr2];

// Add elements
const withNew = [...arr, newItem];
const withFirst = [newItem, ...arr];
\`\`\`

## Spread with Functions
\`\`\`javascript
const nums = [5, 3, 9, 1];
Math.max(...nums);  // 9
Math.min(...nums);  // 1
\`\`\`

## Spread with Objects
\`\`\`javascript
// Copy object
const copy = { ...obj };

// Merge objects
const merged = { ...obj1, ...obj2 };

// Override property
const updated = { ...obj, name: "New" };
\`\`\`

## Rest Parameters
Collects remaining arguments into array.

\`\`\`javascript
function sum(...numbers) {
  return numbers.reduce((a, n) => a + n, 0);
}
sum(1, 2, 3);     // 6
sum(1, 2, 3, 4);  // 10
\`\`\`

## Rest with Other Params
\`\`\`javascript
function greet(greeting, ...names) {
  return names.map(n => \`\${greeting}, \${n}!\`);
}
greet("Hello", "Alice", "Bob");
// ["Hello, Alice!", "Hello, Bob!"]
\`\`\`

## Rest in Destructuring
\`\`\`javascript
const [first, ...rest] = [1, 2, 3, 4];
// first = 1, rest = [2, 3, 4]

const { name, ...others } = { name: "A", age: 25, city: "NY" };
// name = "A", others = { age: 25, city: "NY" }
\`\`\`

## Key Difference
- **Spread**: Unpacks (in arrays, objects, calls)
- **Rest**: Collects (in function parameters, destructuring)`,
            outcomes: [
              'spread_syntax',                // The ... operator "spreads" or "unpacks" elements
              'spread_copy_array',            // [...arr] creates a shallow copy of an array
              'spread_merge_arrays',          // [...arr1, ...arr2] combines arrays into one
              'spread_add_elements',          // [newItem, ...arr] or [...arr, newItem] adds elements
              'spread_function_args',         // Math.max(...numbers) passes array elements as arguments
              'spread_copy_object',           // {...obj} creates a shallow copy of an object
              'spread_merge_objects',         // {...obj1, ...obj2} combines objects (later overrides earlier)
              'spread_override_props',        // {...obj, key: newValue} copies and overrides specific properties
              'rest_syntax',                  // ...paramName in function parameters collects remaining arguments
              'rest_creates_array',           // Rest parameter collects values into a real array
              'rest_must_be_last',            // Rest parameter must be the last parameter in function definition
              'spread_vs_rest'                // Spread unpacks (in arrays/objects/calls), Rest collects (in parameters)
            ],
            tasks: [
              {
                description: 'Create a function that takes an array and returns a new array with all elements plus a new element added at the end (without modifying the original)',
                testCases: [
                  { input: [[1, 2, 3], 4], expectedOutput: '1,2,3,4' },
                  { input: [[], 'first'], expectedOutput: 'first' },
                  { input: [[5], 10], expectedOutput: '5,10' },
                  { input: [['a', 'b'], null], expectedOutput: 'a,b,' },
                  { input: [[true, false], 0], expectedOutput: 'true,false,0' }
                ]
              },
              {
                description: 'Create a function that takes two arrays and returns a new array with all elements from both arrays combined',
                testCases: [
                  { input: [[1, 2], [3, 4]], expectedOutput: '1,2,3,4' },
                  { input: [[], [1, 2]], expectedOutput: '1,2' },
                  { input: [[1, 2], []], expectedOutput: '1,2' },
                  { input: [[], []], expectedOutput: '' },
                  { input: [[-1, 0], [1]], expectedOutput: '-1,0,1' }
                ]
              },
              {
                description: 'Create a function that takes an array of numbers and returns the maximum value using Math.max with spread',
                testCases: [
                  { input: [[1, 5, 3, 9, 2]], expectedOutput: '9' },
                  { input: [[-5, -2, -10]], expectedOutput: '-2' },
                  { input: [[42]], expectedOutput: '42' },
                  { input: [[0, -1, 1]], expectedOutput: '1' },
                  { input: [[7, 7, 7]], expectedOutput: '7' }
                ]
              },
              {
                description: 'Create a function that takes an object and a key-value pair, and returns a new object with the property added or updated (without modifying the original)',
                testCases: [
                  { input: [{ name: 'John' }, 'age', 25], expectedOutput: '{"name":"John","age":25}' },
                  { input: [{ x: 10 }, 'x', 20], expectedOutput: '{"x":20}' },
                  { input: [{}, 'key', 'value'], expectedOutput: '{"key":"value"}' },
                  { input: [{ a: 1 }, 'b', null], expectedOutput: '{"a":1,"b":null}' },
                  { input: [{ a: 1 }, 'b', 0], expectedOutput: '{"a":1,"b":0}' }
                ]
              },
              {
                description: 'Create a function that takes two objects and returns a new object with all properties from both (second object properties override first if keys match)',
                testCases: [
                  { input: [{ a: 1 }, { b: 2 }], expectedOutput: '{"a":1,"b":2}' },
                  { input: [{ a: 1, b: 2 }, { b: 99 }], expectedOutput: '{"a":1,"b":99}' },
                  { input: [{}, { a: 1 }], expectedOutput: '{"a":1}' },
                  { input: [{ a: 1 }, {}], expectedOutput: '{"a":1}' },
                  { input: [{}, {}], expectedOutput: '{}' }
                ]
              },
              {
                description: 'Create a function using rest parameters that takes any number of arguments and returns their sum',
                testCases: [
                  { input: [1, 2, 3], expectedOutput: '6' },
                  { input: [], expectedOutput: '0' },
                  { input: [42], expectedOutput: '42' },
                  { input: [-5, 5], expectedOutput: '0' },
                  { input: [0, 0, 0], expectedOutput: '0' }
                ]
              },
              {
                description: 'Create a function using rest parameters that takes any number of arguments and returns the count of arguments passed',
                testCases: [
                  { input: [1, 2, 3], expectedOutput: '3' },
                  { input: [], expectedOutput: '0' },
                  { input: ['single'], expectedOutput: '1' },
                  { input: [null, undefined, 0, '', false], expectedOutput: '5' },
                  { input: ['a', 'b'], expectedOutput: '2' }
                ]
              },
              {
                description: 'Create a function that takes a multiplier as first argument and rest parameters for numbers, and returns an array with each number multiplied by the multiplier',
                testCases: [
                  { input: [2, 1, 2, 3], expectedOutput: '2,4,6' },
                  { input: [5], expectedOutput: '' },
                  { input: [0, 5, 10], expectedOutput: '0,0' },
                  { input: [-1, 3, 4], expectedOutput: '-3,-4' },
                  { input: [10, 0], expectedOutput: '0' }
                ]
              },
              {
                description: 'Create a function that takes a required first name, required last name, and any number of middle names using rest, and returns the full name joined by spaces',
                testCases: [
                  { input: ['John', 'Doe'], expectedOutput: 'John Doe' },
                  { input: ['Mary', 'Jane', 'Smith'], expectedOutput: 'Mary Jane Smith' },
                  { input: ['A', 'B', 'C', 'D'], expectedOutput: 'A B C D' },
                  { input: ['First', 'Last'], expectedOutput: 'First Last' },
                  { input: ['X', 'M1', 'M2', 'M3', 'Y'], expectedOutput: 'X M1 M2 M3 Y' }
                ]
              },
              {
                description: 'Create a function that clones an array, reverses the clone, and returns both original order and reversed order as a string separated by " | "',
                testCases: [
                  { input: [[1, 2, 3]], expectedOutput: '1,2,3 | 3,2,1' },
                  { input: [[5]], expectedOutput: '5 | 5' },
                  { input: [['a', 'b']], expectedOutput: 'a,b | b,a' },
                  { input: [[1, 2, 1]], expectedOutput: '1,2,1 | 1,2,1' },
                  { input: [[-1, 0, 1]], expectedOutput: '-1,0,1 | 1,0,-1' }
                ]
              },
              {
                description: 'Create a function that takes an array of numbers and returns an object with min, max, and sum properties using spread with Math.min and Math.max',
                testCases: [
                  { input: [[1, 5, 3, 9, 2]], expectedOutput: '{"min":1,"max":9,"sum":20}' },
                  { input: [[7]], expectedOutput: '{"min":7,"max":7,"sum":7}' },
                  { input: [[-5, 0, 5]], expectedOutput: '{"min":-5,"max":5,"sum":0}' },
                  { input: [[-10, -5, -1]], expectedOutput: '{"min":-10,"max":-1,"sum":-16}' },
                  { input: [[0, 0, 0]], expectedOutput: '{"min":0,"max":0,"sum":0}' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'error-handling',
        title: 'Error Handling',
        subtopics: [
          {
            id: 'error-handling',
            title: 'Error handling with try-catch',
            notes: `## try-catch Syntax
\`\`\`javascript
try {
  // Code that might throw
} catch (error) {
  // Handle the error
} finally {
  // Always runs (optional)
}
\`\`\`

## Basic Usage
\`\`\`javascript
try {
  const data = JSON.parse(invalidJson);
} catch (error) {
  console.log("Parse failed:", error.message);
}
\`\`\`

## throw - Create Errors
\`\`\`javascript
function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}

try {
  divide(10, 0);
} catch (e) {
  console.log(e.message);  // "Cannot divide by zero"
}
\`\`\`

## Error Properties
\`\`\`javascript
catch (error) {
  error.name;     // "Error", "TypeError", etc.
  error.message;  // Description
  error.stack;    // Stack trace
}
\`\`\`

## Custom Validation
\`\`\`javascript
function validateAge(age) {
  if (age < 0) throw new Error("Age cannot be negative");
  if (age > 150) throw new Error("Age cannot exceed 150");
  return age;
}
\`\`\`

## Safe JSON Parse
\`\`\`javascript
function safeParseJSON(str) {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
}
\`\`\`

## Safe Property Access
\`\`\`javascript
function getPath(obj, path) {
  try {
    return path.split('.').reduce((o, k) => o[k], obj);
  } catch {
    return "Property not found";
  }
}
\`\`\`

## Key Points
- Use try-catch for risky operations
- throw creates new errors
- finally always executes
- Error has name, message, stack`,
            outcomes: [
              'error_types',                  // Common errors: TypeError, ReferenceError, RangeError, SyntaxError
              'error_properties',             // Error objects have name, message, and stack properties
              'try_catch_syntax',             // try { risky code } catch (error) { handle error }
              'finally_block',                // finally { } runs regardless of success or failure
              'throw_statement',              // throw new Error('message') creates and throws an error
              'custom_error_messages',        // Create descriptive error messages for debugging
              'catching_specific_errors',     // Check error type with instanceof or error.name
              'when_to_use_try_catch',        // JSON parsing, external data, user input validation
              'error_propagation'             // Uncaught errors propagate up the call stack
            ],
            tasks: [
              {
                description: 'Create a function that takes a JSON string and returns the parsed object, or null if parsing fails',
                testCases: [
                  { input: ['{"name":"John","age":30}'], expectedOutput: '{"name":"John","age":30}' },
                  { input: ['invalid json'], expectedOutput: 'null' },
                  { input: ['{"valid":true}'], expectedOutput: '{"valid":true}' },
                  { input: [''], expectedOutput: 'null' },
                  { input: ['null'], expectedOutput: 'null' }
                ]
              },
              {
                description: 'Create a function that divides two numbers but throws an error with message "Cannot divide by zero" if the divisor is zero',
                testCases: [
                  { input: [10, 2], expectedOutput: '5' },
                  { input: [10, 0], expectedOutput: 'Error: Cannot divide by zero' },
                  { input: [0, 5], expectedOutput: '0' },
                  { input: [-10, 2], expectedOutput: '-5' },
                  { input: [7, 2], expectedOutput: '3.5' }
                ]
              },
              {
                description: 'Create a function that validates age: throws "Age cannot be negative" if negative, "Age cannot exceed 150" if over 150, otherwise returns the age',
                testCases: [
                  { input: [25], expectedOutput: '25' },
                  { input: [-5], expectedOutput: 'Error: Age cannot be negative' },
                  { input: [200], expectedOutput: 'Error: Age cannot exceed 150' },
                  { input: [0], expectedOutput: '0' },
                  { input: [150], expectedOutput: '150' }
                ]
              },
              {
                description: 'Create a function that takes an object and a dot-notation path string, returns the value or "Property not found" if path is invalid',
                testCases: [
                  { input: [{ user: { name: 'Alice' } }, 'user.name'], expectedOutput: 'Alice' },
                  { input: [{ a: { b: { c: 42 } } }, 'a.b.c'], expectedOutput: '42' },
                  { input: [{ x: 10 }, 'y'], expectedOutput: 'Property not found' },
                  { input: [{}, 'any.path'], expectedOutput: 'Property not found' },
                  { input: [{ val: 0 }, 'val'], expectedOutput: '0' }
                ]
              },
              {
                description: 'Create a function that converts a string to an integer, throws "Invalid number" if the string is not a valid integer',
                testCases: [
                  { input: ['42'], expectedOutput: '42' },
                  { input: ['abc'], expectedOutput: 'Error: Invalid number' },
                  { input: ['-10'], expectedOutput: '-10' },
                  { input: ['3.14'], expectedOutput: '3' },
                  { input: [''], expectedOutput: 'Error: Invalid number' }
                ]
              },
              {
                description: 'Create a function that takes an array and index, returns the element or throws "Index out of bounds" if index is invalid',
                testCases: [
                  { input: [[1, 2, 3], 1], expectedOutput: '2' },
                  { input: [[1, 2, 3], 5], expectedOutput: 'Error: Index out of bounds' },
                  { input: [[1, 2, 3], -1], expectedOutput: 'Error: Index out of bounds' },
                  { input: [['a', 'b'], 0], expectedOutput: 'a' },
                  { input: [[], 0], expectedOutput: 'Error: Index out of bounds' }
                ]
              },
              {
                description: 'Create a function that takes a value and returns its type, but if the value is null returns "null" (not "object")',
                testCases: [
                  { input: [42], expectedOutput: 'number' },
                  { input: ['hello'], expectedOutput: 'string' },
                  { input: [null], expectedOutput: 'null' },
                  { input: [undefined], expectedOutput: 'undefined' },
                  { input: [[1, 2]], expectedOutput: 'object' }
                ]
              },
              {
                description: 'Create a function that calculates square root, throws "Cannot calculate square root of negative number" for negative inputs',
                testCases: [
                  { input: [16], expectedOutput: '4' },
                  { input: [0], expectedOutput: '0' },
                  { input: [-4], expectedOutput: 'Error: Cannot calculate square root of negative number' },
                  { input: [2], expectedOutput: '1.4142135623730951' },
                  { input: [1], expectedOutput: '1' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'async-basics',
        title: 'Asynchronous JavaScript Basics',
        subtopics: [
          {
            id: 'async-basics',
            title: 'Callbacks, timers, and async concepts',
            notes: `## Synchronous vs Asynchronous
\`\`\`javascript
// Sync: line by line, blocking
console.log("A");
console.log("B");
// Output: A, B

// Async: non-blocking
console.log("A");
setTimeout(() => console.log("B"), 0);
console.log("C");
// Output: A, C, B
\`\`\`

## Callback Functions
Functions passed as arguments, called later.

\`\`\`javascript
function processData(data, callback) {
  const result = data * 2;
  callback(result);
}

processData(5, result => {
  console.log(result);  // 10
});
\`\`\`

## setTimeout
\`\`\`javascript
setTimeout(() => {
  console.log("After 2 seconds");
}, 2000);
\`\`\`

## setInterval
\`\`\`javascript
const id = setInterval(() => {
  console.log("Every second");
}, 1000);

// Stop it
clearInterval(id);
\`\`\`

## Callback Pattern
\`\`\`javascript
function calculate(a, b, callback) {
  callback({
    sum: a + b,
    difference: a - b,
    product: a * b
  });
}

calculate(10, 3, result => {
  console.log(result);
  // { sum: 13, difference: 7, product: 30 }
});
\`\`\`

## Error-First Callbacks
\`\`\`javascript
function fetchData(onSuccess, onError) {
  if (dataAvailable) {
    onSuccess(data);
  } else {
    onError("Data not found");
  }
}
\`\`\`

## Event Loop Order
\`\`\`javascript
console.log("A");
setTimeout(() => console.log("B"), 0);
console.log("C");
// A, C, B (sync first, then async)
\`\`\`

## Key Points
- JavaScript is single-threaded
- Callbacks allow async operations
- Event loop handles execution order
- Sync code always runs before async`,
            outcomes: [
              'sync_vs_async',                // Synchronous: line by line, blocking. Asynchronous: non-blocking, scheduled for later
              'single_threaded',              // JavaScript runs on single thread but uses event loop for async
              'event_loop_basics',            // Call stack executes code, callback queue holds async callbacks, event loop moves callbacks to stack when empty
              'callback_functions',           // Functions passed as arguments to be called later
              'setTimeout_syntax',            // setTimeout(callback, delay) schedules callback after delay ms
              'setInterval_syntax',           // setInterval(callback, interval) repeats callback every interval ms
              'clear_timers',                 // clearTimeout(id) and clearInterval(id) cancel scheduled timers
              'execution_order',              // Sync code runs first, then async callbacks (even with 0ms delay)
              'callback_pattern',             // Pattern: function takes data and callback, processes data, calls callback with result
              'callback_hell',                // Problem: deeply nested callbacks become hard to read and maintain
              'why_promises_needed'           // Callbacks lead to callback hell, motivating Promises (next topic)
            ],
            tasks: [
              {
                description: 'Create a function that takes a number and a callback, then calls the callback with the number doubled',
                testCases: [
                  { input: [5], expectedOutput: '10' },
                  { input: [0], expectedOutput: '0' },
                  { input: [-3], expectedOutput: '-6' },
                  { input: [100], expectedOutput: '200' },
                  { input: [0.5], expectedOutput: '1' }
                ]
              },
              {
                description: 'Create a function that takes two numbers and a callback, calls the callback with an object containing sum, difference, and product',
                testCases: [
                  { input: [10, 3], expectedOutput: '{"sum":13,"difference":7,"product":30}' },
                  { input: [5, 5], expectedOutput: '{"sum":10,"difference":0,"product":25}' },
                  { input: [0, 7], expectedOutput: '{"sum":7,"difference":-7,"product":0}' },
                  { input: [-2, 3], expectedOutput: '{"sum":1,"difference":-5,"product":-6}' },
                  { input: [1, 1], expectedOutput: '{"sum":2,"difference":0,"product":1}' }
                ]
              },
              {
                description: 'Create a function that takes an array and a callback, calls the callback with the array filtered to only even numbers',
                testCases: [
                  { input: [[1, 2, 3, 4, 5, 6]], expectedOutput: '2,4,6' },
                  { input: [[1, 3, 5]], expectedOutput: '' },
                  { input: [[2, 4, 6]], expectedOutput: '2,4,6' },
                  { input: [[]], expectedOutput: '' },
                  { input: [[-2, -1, 0, 1, 2]], expectedOutput: '-2,0,2' }
                ]
              },
              {
                description: 'Create a function that takes a string and two callbacks (onSuccess, onError). If string is not empty, call onSuccess with uppercase string. If empty, call onError with "Empty string"',
                testCases: [
                  { input: ['hello'], expectedOutput: 'success: HELLO' },
                  { input: [''], expectedOutput: 'error: Empty string' },
                  { input: ['JavaScript'], expectedOutput: 'success: JAVASCRIPT' },
                  { input: ['a'], expectedOutput: 'success: A' },
                  { input: ['  '], expectedOutput: 'success:   ' }
                ]
              },
              {
                description: 'Create a function that takes an array of numbers and a callback. Call the callback with an object containing min, max, and average',
                testCases: [
                  { input: [[1, 2, 3, 4, 5]], expectedOutput: '{"min":1,"max":5,"avg":3}' },
                  { input: [[10]], expectedOutput: '{"min":10,"max":10,"avg":10}' },
                  { input: [[-5, 0, 5]], expectedOutput: '{"min":-5,"max":5,"avg":0}' },
                  { input: [[2, 2, 2]], expectedOutput: '{"min":2,"max":2,"avg":2}' },
                  { input: [[1, 100]], expectedOutput: '{"min":1,"max":100,"avg":50.5}' }
                ]
              },
              {
                description: 'Create a function that simulates async flow: takes a value, a transform function, and a callback. Apply transform to value, then pass result to callback',
                testCases: [
                  { input: [5, 'double'], expectedOutput: '10' },
                  { input: [5, 'square'], expectedOutput: '25' },
                  { input: [5, 'negate'], expectedOutput: '-5' },
                  { input: [0, 'double'], expectedOutput: '0' },
                  { input: [-3, 'square'], expectedOutput: '9' }
                ]
              },
              {
                description: 'Create a function that takes an array of strings and a callback. Sort alphabetically, then call callback with the sorted array joined by comma',
                testCases: [
                  { input: [['banana', 'apple', 'cherry']], expectedOutput: 'apple,banana,cherry' },
                  { input: [['z', 'a', 'm']], expectedOutput: 'a,m,z' },
                  { input: [['only']], expectedOutput: 'only' },
                  { input: [[]], expectedOutput: '' },
                  { input: [['B', 'a', 'C']], expectedOutput: 'B,C,a' }
                ]
              },
              {
                description: 'Given: console.log("A"); setTimeout(() => console.log("B"), 0); console.log("C"); - What is the output order? Return as string "X,Y,Z"',
                testCases: [
                  { input: [], expectedOutput: 'A,C,B' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'promises',
        title: 'Promises',
        subtopics: [
          {
            id: 'promises',
            title: 'Creating and consuming promises',
            notes: `## What is a Promise?
Object representing eventual completion or failure.

## Promise States
- **Pending**: Initial state
- **Fulfilled**: Operation succeeded
- **Rejected**: Operation failed

## Creating Promises
\`\`\`javascript
const promise = new Promise((resolve, reject) => {
  if (success) {
    resolve(value);  // Fulfill
  } else {
    reject(error);   // Reject
  }
});
\`\`\`

## Consuming Promises
\`\`\`javascript
promise
  .then(value => console.log(value))
  .catch(error => console.log(error))
  .finally(() => console.log("Done"));
\`\`\`

## Example
\`\`\`javascript
function checkNumber(n) {
  return new Promise((resolve, reject) => {
    if (n > 0) {
      resolve(n * 2);
    } else {
      reject("Number must be positive");
    }
  });
}

checkNumber(5)
  .then(result => console.log(result))  // 10
  .catch(err => console.log(err));
\`\`\`

## Chaining
\`\`\`javascript
Promise.resolve(5)
  .then(n => n * 2)   // 10
  .then(n => n + 10)  // 20
  .then(n => console.log(n));
\`\`\`

## Promise.resolve / reject
\`\`\`javascript
Promise.resolve(42);     // Already fulfilled
Promise.reject("Error"); // Already rejected
\`\`\`

## Promise.all
\`\`\`javascript
Promise.all([p1, p2, p3])
  .then(results => console.log(results))
  .catch(err => console.log(err));  // First rejection
\`\`\`

## Promise.race
\`\`\`javascript
Promise.race([p1, p2, p3])
  .then(first => console.log(first));  // First to settle
\`\`\`

## Key Points
- Promises replace callback hell
- Chain with .then()
- Handle errors with .catch()
- Use Promise.all for parallel operations`,
            outcomes: [
              'promise_states',               // A promise is pending, then becomes fulfilled (resolved) or rejected
              'creating_promises',            // new Promise((resolve, reject) => { ... })
              'resolve_fulfill',              // Call resolve(value) to fulfill the promise with a value
              'reject_reason',                // Call reject(reason) to reject the promise with an error
              'then_handler',                 // .then(callback) runs when promise fulfills, receives the resolved value
              'catch_handler',                // .catch(callback) runs when promise rejects, receives the error
              'finally_handler',              // .finally(callback) runs regardless of outcome, for cleanup
              'chaining_then',                // Each .then() returns a new promise, enabling chaining
              'returning_from_then',          // Value returned from .then() becomes the resolved value for next .then()
              'promise_resolve_shortcut',     // Promise.resolve(value) creates an already-fulfilled promise
              'promise_reject_shortcut',      // Promise.reject(reason) creates an already-rejected promise
              'promise_all',                  // Promise.all([...]) waits for all to fulfill, rejects if any rejects
              'promise_race',                 // Promise.race([...]) resolves/rejects with the first settled promise
              'promise_allSettled'            // Promise.allSettled([...]) waits for all, returns array of outcomes
            ],
            tasks: [
              {
                description: 'Create a function that returns a promise which resolves with the number doubled after a simulated delay',
                testCases: [
                  { input: [5], expectedOutput: '10' },
                  { input: [0], expectedOutput: '0' },
                  { input: [-3], expectedOutput: '-6' },
                  { input: [100], expectedOutput: '200' },
                  { input: [0.5], expectedOutput: '1' }
                ]
              },
              {
                description: 'Create a function that returns a promise which resolves if number is positive, rejects with "Number must be positive" if zero or negative',
                testCases: [
                  { input: [5], expectedOutput: 'resolved: 5' },
                  { input: [0], expectedOutput: 'rejected: Number must be positive' },
                  { input: [-10], expectedOutput: 'rejected: Number must be positive' },
                  { input: [1], expectedOutput: 'resolved: 1' },
                  { input: [100], expectedOutput: 'resolved: 100' }
                ]
              },
              {
                description: 'Create a function that takes a string and returns a promise. Resolve with uppercase if length > 3, reject with "Too short" otherwise',
                testCases: [
                  { input: ['hello'], expectedOutput: 'resolved: HELLO' },
                  { input: ['hi'], expectedOutput: 'rejected: Too short' },
                  { input: ['abc'], expectedOutput: 'rejected: Too short' },
                  { input: ['test'], expectedOutput: 'resolved: TEST' },
                  { input: [''], expectedOutput: 'rejected: Too short' }
                ]
              },
              {
                description: 'Create a function that chains promises: takes a number, doubles it, then adds 10, returns the final result',
                testCases: [
                  { input: [5], expectedOutput: '20' },
                  { input: [0], expectedOutput: '10' },
                  { input: [-5], expectedOutput: '0' },
                  { input: [10], expectedOutput: '30' },
                  { input: [1], expectedOutput: '12' }
                ]
              },
              {
                description: 'Create a function using Promise.resolve or Promise.reject: return resolved promise with "even" if number is even, rejected with "odd" if odd',
                testCases: [
                  { input: [4], expectedOutput: 'resolved: even' },
                  { input: [3], expectedOutput: 'rejected: odd' },
                  { input: [0], expectedOutput: 'resolved: even' },
                  { input: [-2], expectedOutput: 'resolved: even' },
                  { input: [1], expectedOutput: 'rejected: odd' }
                ]
              },
              {
                description: 'Create a function that takes an array of numbers, returns a promise that resolves with their sum (using Promise.resolve)',
                testCases: [
                  { input: [[1, 2, 3]], expectedOutput: '6' },
                  { input: [[]], expectedOutput: '0' },
                  { input: [[10]], expectedOutput: '10' },
                  { input: [[-1, 1]], expectedOutput: '0' },
                  { input: [[5, 5, 5, 5]], expectedOutput: '20' }
                ]
              },
              {
                description: 'Create a function that simulates Promise.all behavior: takes array of values, returns promise resolving with array of doubled values',
                testCases: [
                  { input: [[1, 2, 3]], expectedOutput: '2,4,6' },
                  { input: [[5]], expectedOutput: '10' },
                  { input: [[0, 10]], expectedOutput: '0,20' },
                  { input: [[-1, 0, 1]], expectedOutput: '-2,0,2' },
                  { input: [[]], expectedOutput: '' }
                ]
              },
              {
                description: 'Create a function that returns a promise chain: validate number is positive, then double it, then convert to string with "Result: " prefix',
                testCases: [
                  { input: [5], expectedOutput: 'Result: 10' },
                  { input: [1], expectedOutput: 'Result: 2' },
                  { input: [0], expectedOutput: 'rejected: Not positive' },
                  { input: [-5], expectedOutput: 'rejected: Not positive' },
                  { input: [50], expectedOutput: 'Result: 100' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'async-await',
        title: 'Async/Await',
        subtopics: [
          {
            id: 'async-await',
            title: 'Writing cleaner asynchronous code',
            notes: `## async Function
Declares a function that returns a promise.

\`\`\`javascript
async function getData() {
  return "Hello";  // Automatically wrapped in Promise
}
getData().then(console.log);  // "Hello"
\`\`\`

## await Keyword
Pauses until promise resolves.

\`\`\`javascript
async function example() {
  const result = await somePromise;
  console.log(result);
}
\`\`\`

## Basic Example
\`\`\`javascript
async function doubleAsync(n) {
  return n * 2;
}

async function main() {
  const result = await doubleAsync(5);
  console.log(result);  // 10
}
\`\`\`

## Error Handling
\`\`\`javascript
async function fetchData() {
  try {
    const result = await riskyOperation();
    return result;
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
}
\`\`\`

## Sequential Operations
\`\`\`javascript
async function sequential(n) {
  const doubled = await doubleAsync(n);   // Wait
  const plusTen = await addTenAsync(doubled);  // Then wait
  return plusTen;
}
\`\`\`

## Parallel Operations
\`\`\`javascript
async function parallel(nums) {
  const promises = nums.map(n => doubleAsync(n));
  return await Promise.all(promises);
}
\`\`\`

## Async Arrow Function
\`\`\`javascript
const multiply = async (a, b) => a * b;
\`\`\`

## Throwing Errors
\`\`\`javascript
async function validate(n) {
  if (n <= 0) {
    throw new Error("Must be positive");
  }
  return n * 2;
}
\`\`\`

## Key Points
- \`async\` makes function return promise
- \`await\` pauses until promise settles
- Use try-catch for error handling
- Cleaner than .then() chains`,
            outcomes: [
              'async_keyword',                // async before function makes it return a promise
              'await_keyword',                // await pauses until promise settles, unwraps the value
              'await_only_in_async',          // await can only be used inside async functions
              'async_return_value',           // Returning a value from async function resolves the promise with that value
              'async_throw_rejects',          // Throwing in async function rejects the returned promise
              'try_catch_with_await',         // Use try-catch to handle rejected promises with await
              'sequential_await',             // Multiple awaits in sequence run one after another
              'parallel_await',               // Use Promise.all with await for parallel execution
              'async_arrow_functions',        // Arrow functions can be async: async () => { ... }
              'error_propagation'             // Uncaught errors in async functions propagate as rejections
            ],
            tasks: [
              {
                description: 'Create an async function that takes a number and returns it doubled (the function should return, not log)',
                testCases: [
                  { input: [5], expectedOutput: '10' },
                  { input: [0], expectedOutput: '0' },
                  { input: [-3], expectedOutput: '-6' },
                  { input: [100], expectedOutput: '200' },
                  { input: [0.5], expectedOutput: '1' }
                ]
              },
              {
                description: 'Create an async function that awaits a promise and returns the uppercase version of the resolved string',
                testCases: [
                  { input: ['hello'], expectedOutput: 'HELLO' },
                  { input: ['world'], expectedOutput: 'WORLD' },
                  { input: ['JavaScript'], expectedOutput: 'JAVASCRIPT' },
                  { input: [''], expectedOutput: '' },
                  { input: ['ABC'], expectedOutput: 'ABC' }
                ]
              },
              {
                description: 'Create an async function that takes a number. If positive, return doubled value. If zero or negative, throw "Must be positive"',
                testCases: [
                  { input: [5], expectedOutput: 'success: 10' },
                  { input: [0], expectedOutput: 'error: Must be positive' },
                  { input: [-5], expectedOutput: 'error: Must be positive' },
                  { input: [1], expectedOutput: 'success: 2' },
                  { input: [50], expectedOutput: 'success: 100' }
                ]
              },
              {
                description: 'Create an async function that uses try-catch: await a promise that may reject, return "success" or "failed" based on outcome',
                testCases: [
                  { input: [true], expectedOutput: 'success' },
                  { input: [false], expectedOutput: 'failed' },
                  { input: [true], expectedOutput: 'success' },
                  { input: [false], expectedOutput: 'failed' }
                ]
              },
              {
                description: 'Create an async function that takes an array of numbers and returns their sum by awaiting a summing promise',
                testCases: [
                  { input: [[1, 2, 3]], expectedOutput: '6' },
                  { input: [[]], expectedOutput: '0' },
                  { input: [[10]], expectedOutput: '10' },
                  { input: [[-1, 1]], expectedOutput: '0' },
                  { input: [[5, 5, 5, 5]], expectedOutput: '20' }
                ]
              },
              {
                description: 'Create an async function that sequentially awaits two promises: first doubles a number, then adds 10 to the result',
                testCases: [
                  { input: [5], expectedOutput: '20' },
                  { input: [0], expectedOutput: '10' },
                  { input: [-5], expectedOutput: '0' },
                  { input: [10], expectedOutput: '30' },
                  { input: [1], expectedOutput: '12' }
                ]
              },
              {
                description: 'Create an async function that uses Promise.all with await to double all numbers in an array in parallel',
                testCases: [
                  { input: [[1, 2, 3]], expectedOutput: '2,4,6' },
                  { input: [[5]], expectedOutput: '10' },
                  { input: [[0, 10]], expectedOutput: '0,20' },
                  { input: [[-1, 0, 1]], expectedOutput: '-2,0,2' },
                  { input: [[]], expectedOutput: '' }
                ]
              },
              {
                description: 'Create an async arrow function that takes two numbers and returns their product',
                testCases: [
                  { input: [3, 4], expectedOutput: '12' },
                  { input: [0, 5], expectedOutput: '0' },
                  { input: [-2, 3], expectedOutput: '-6' },
                  { input: [7, 7], expectedOutput: '49' },
                  { input: [1, 1], expectedOutput: '1' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'classes',
        title: 'Classes and OOP',
        subtopics: [
          {
            id: 'classes',
            title: 'Object-oriented programming',
            notes: `## Class Declaration
\`\`\`javascript
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  
  getArea() {
    return this.width * this.height;
  }
}

const rect = new Rectangle(5, 3);
rect.getArea();  // 15
\`\`\`

## Static Methods/Properties
Belong to class, not instances.

\`\`\`javascript
class Counter {
  static count = 0;
  
  constructor() {
    Counter.count++;
  }
  
  static getCount() {
    return Counter.count;
  }
}
new Counter();
new Counter();
Counter.getCount();  // 2
\`\`\`

## Getters and Setters
\`\`\`javascript
class Temperature {
  constructor(celsius) {
    this.celsius = celsius;
  }
  
  get fahrenheit() {
    return this.celsius * 9/5 + 32;
  }
}
const t = new Temperature(100);
t.fahrenheit;  // 212
\`\`\`

## Inheritance
\`\`\`javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return "...";
  }
}

class Dog extends Animal {
  speak() {
    return "Woof!";
  }
}

const dog = new Dog("Buddy");
dog.speak();  // "Woof!"
\`\`\`

## super Keyword
\`\`\`javascript
class Child extends Parent {
  constructor(name, age) {
    super(name);  // Call parent constructor
    this.age = age;
  }
}
\`\`\`

## instanceof
\`\`\`javascript
const dog = new Dog("Rex");
dog instanceof Dog;     // true
dog instanceof Animal;  // true
\`\`\`

## Key Points
- constructor initializes properties
- \`this\` refers to instance
- \`static\` for class-level members
- \`extends\` for inheritance
- \`super\` calls parent`,
            outcomes: [
              'what_is_class',                // A blueprint for creating objects with shared structure and behavior
              'class_syntax',                 // class ClassName { } declares a class
              'constructor_method',           // constructor() runs when new instance is created, initializes properties
              'this_in_class',                // this refers to the current instance inside class methods
              'instance_properties',          // Properties set via this.propName in constructor
              'instance_methods',             // Methods defined in class body, shared by all instances
              'creating_instances',           // new ClassName() creates an instance
              'static_methods',               // static methodName() belongs to class itself, not instances
              'static_properties',            // static propName belongs to class, shared across all instances
              'getters_setters',              // get propName() and set propName(value) for computed properties
              'inheritance_extends',          // class Child extends Parent inherits properties and methods
              'super_keyword',                // super() calls parent constructor, super.method() calls parent method
              'method_overriding',            // Child can redefine parent methods with same name
              'instanceof_operator'           // obj instanceof ClassName checks if obj is instance of class
            ],
            tasks: [
              {
                description: 'Create a Rectangle class with width and height properties, and a method that returns the area',
                testCases: [
                  { input: [5, 3], expectedOutput: '15' },
                  { input: [10, 10], expectedOutput: '100' },
                  { input: [1, 1], expectedOutput: '1' },
                  { input: [7, 4], expectedOutput: '28' },
                  { input: [0, 5], expectedOutput: '0' }
                ]
              },
              {
                description: 'Create a Counter class with increment, decrement, and getValue methods. Start at 0',
                testCases: [
                  { input: [['increment', 'increment', 'getValue']], expectedOutput: '2' },
                  { input: [['decrement', 'getValue']], expectedOutput: '-1' },
                  { input: [['getValue']], expectedOutput: '0' },
                  { input: [['increment', 'decrement', 'increment', 'getValue']], expectedOutput: '1' },
                  { input: [['decrement', 'decrement', 'decrement', 'getValue']], expectedOutput: '-3' }
                ]
              },
              {
                description: 'Create a BankAccount class with deposit, withdraw, and getBalance methods. Withdraw should not allow negative balance',
                testCases: [
                  { input: [[['deposit', 100], ['withdraw', 30], ['getBalance']]], expectedOutput: '70' },
                  { input: [[['deposit', 50], ['withdraw', 100], ['getBalance']]], expectedOutput: '50' },
                  { input: [[['getBalance']]], expectedOutput: '0' },
                  { input: [[['deposit', 200], ['deposit', 100], ['getBalance']]], expectedOutput: '300' },
                  { input: [[['withdraw', 50], ['getBalance']]], expectedOutput: '0' }
                ]
              },
              {
                description: 'Create a Person class with name property and a static method that returns how many Person instances have been created',
                testCases: [
                  { input: [['Alice']], expectedOutput: '1' },
                  { input: [['Alice', 'Bob']], expectedOutput: '2' },
                  { input: [['A', 'B', 'C']], expectedOutput: '3' },
                  { input: [[]], expectedOutput: '0' },
                  { input: [['Single']], expectedOutput: '1' }
                ]
              },
              {
                description: 'Create a Temperature class with celsius property and a getter for fahrenheit (celsius * 9/5 + 32)',
                testCases: [
                  { input: [0], expectedOutput: '32' },
                  { input: [100], expectedOutput: '212' },
                  { input: [-40], expectedOutput: '-40' },
                  { input: [25], expectedOutput: '77' },
                  { input: [37], expectedOutput: '98.6' }
                ]
              },
              {
                description: 'Create an Animal class with name and a speak method. Create a Dog class that extends Animal and overrides speak to return "Woof!"',
                testCases: [
                  { input: ['Buddy', 'dog'], expectedOutput: 'Woof!' },
                  { input: ['Rex', 'dog'], expectedOutput: 'Woof!' },
                  { input: ['Generic', 'animal'], expectedOutput: '...' },
                  { input: ['Max', 'dog'], expectedOutput: 'Woof!' },
                  { input: ['Pet', 'animal'], expectedOutput: '...' }
                ]
              },
              {
                description: 'Create a Shape class with a getArea method returning 0. Create Circle and Square classes that extend Shape with proper area calculations',
                testCases: [
                  { input: ['circle', 5], expectedOutput: '78.54' },
                  { input: ['square', 4], expectedOutput: '16' },
                  { input: ['circle', 1], expectedOutput: '3.14' },
                  { input: ['square', 10], expectedOutput: '100' },
                  { input: ['circle', 0], expectedOutput: '0' }
                ]
              },
              {
                description: 'Create a TodoList class with add, remove, and getAll methods. Items should be stored in an array',
                testCases: [
                  { input: [[['add', 'Task 1'], ['add', 'Task 2'], ['getAll']]], expectedOutput: 'Task 1,Task 2' },
                  { input: [[['add', 'A'], ['remove', 'A'], ['getAll']]], expectedOutput: '' },
                  { input: [[['getAll']]], expectedOutput: '' },
                  { input: [[['add', 'X'], ['add', 'Y'], ['remove', 'X'], ['getAll']]], expectedOutput: 'Y' },
                  { input: [[['add', 'One'], ['getAll']]], expectedOutput: 'One' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'modules',
        title: 'Modules',
        subtopics: [
          {
            id: 'modules',
            title: 'Organizing code with modules',
            notes: `## Why Modules?
- Organize code into separate files
- Avoid global namespace pollution
- Reusability and maintainability

## Module Pattern (IIFE)
\`\`\`javascript
const counter = (function() {
  let count = 0;  // Private
  
  return {
    increment: () => ++count,
    decrement: () => --count,
    getValue: () => count
  };
})();

counter.increment();  // 1
counter.getValue();   // 1
// count is not accessible directly
\`\`\`

## Revealing Module Pattern
\`\`\`javascript
const calculator = (function() {
  let result = 0;
  
  function add(n) { result += n; }
  function subtract(n) { result -= n; }
  function getResult() { return result; }
  
  return { add, subtract, getResult };
})();
\`\`\`

## ES6 Named Exports
\`\`\`javascript
// math.js
export const PI = 3.14159;
export function add(a, b) { return a + b; }

// main.js
import { PI, add } from './math.js';
\`\`\`

## Default Export
\`\`\`javascript
// user.js
export default class User { }

// main.js
import User from './user.js';
\`\`\`

## Import Aliases
\`\`\`javascript
import { add as sum } from './math.js';
\`\`\`

## Import All
\`\`\`javascript
import * as math from './math.js';
math.add(1, 2);
math.PI;
\`\`\`

## Module Scope
Variables inside modules are private by default.
Only exported items are accessible outside.

## Key Points
- IIFE pattern for private state
- Export public API only
- Import what you need
- Modules have their own scope`,
            outcomes: [
              'what_are_modules',              // Self-contained code units with their own scope
              'why_use_modules',               // Code organization, reusability, avoiding global pollution
              'named_exports',                 // export const name = value; or export { name1, name2 }
              'default_export',                // export default value; one per module
              'named_imports',                 // import { name1, name2 } from './module'
              'default_import',                // import name from './module'
              'renaming_imports',              // import { name as alias } from './module'
              'import_all',                    // import * as moduleName from './module'
              're_exporting',                  // export { name } from './module' to aggregate
              'module_pattern_iife',           // IIFE pattern: (function() { return { public } })()
              'revealing_module_pattern',      // Return object exposing only public methods
              'module_scope',                  // Variables inside modules are private by default
              'dynamic_imports'                // import('./module').then() for lazy loading
            ],
            tasks: [
              {
                description: 'Create a module pattern (using IIFE) that has a private counter and exposes increment, decrement, and getValue methods',
                testCases: [
                  { input: [['increment', 'increment', 'getValue']], expectedOutput: '2' },
                  { input: [['decrement', 'getValue']], expectedOutput: '-1' },
                  { input: [['getValue']], expectedOutput: '0' },
                  { input: [['increment', 'decrement', 'increment', 'getValue']], expectedOutput: '1' },
                  { input: [['increment', 'increment', 'increment', 'decrement', 'getValue']], expectedOutput: '2' }
                ]
              },
              {
                description: 'Create a calculator module with add, subtract, multiply, divide methods that operate on a result value (starts at 0)',
                testCases: [
                  { input: [[['add', 10], ['subtract', 3], ['getResult']]], expectedOutput: '7' },
                  { input: [[['add', 5], ['multiply', 2], ['getResult']]], expectedOutput: '10' },
                  { input: [[['add', 20], ['divide', 4], ['getResult']]], expectedOutput: '5' },
                  { input: [[['getResult']]], expectedOutput: '0' },
                  { input: [[['subtract', 5], ['getResult']]], expectedOutput: '-5' }
                ]
              },
              {
                description: 'Create a user module with private data and public methods: setName, getName, setAge, getAge',
                testCases: [
                  { input: [[['setName', 'Alice'], ['getName']]], expectedOutput: 'Alice' },
                  { input: [[['setAge', 25], ['getAge']]], expectedOutput: '25' },
                  { input: [[['setName', 'Bob'], ['setAge', 30], ['getName']]], expectedOutput: 'Bob' },
                  { input: [[['getName']]], expectedOutput: '' },
                  { input: [[['setName', 'Test'], ['setName', 'Final'], ['getName']]], expectedOutput: 'Final' }
                ]
              },
              {
                description: 'Create a logger module with log, warn, error methods that store messages, and a getAll method returning all messages as array',
                testCases: [
                  { input: [[['log', 'info'], ['warn', 'warning'], ['getAll']]], expectedOutput: '[LOG] info,[WARN] warning' },
                  { input: [[['error', 'oops'], ['getAll']]], expectedOutput: '[ERROR] oops' },
                  { input: [[['getAll']]], expectedOutput: '' },
                  { input: [[['log', 'a'], ['log', 'b'], ['getAll']]], expectedOutput: '[LOG] a,[LOG] b' },
                  { input: [[['warn', 'x'], ['error', 'y'], ['log', 'z'], ['getAll']]], expectedOutput: '[WARN] x,[ERROR] y,[LOG] z' }
                ]
              },
              {
                description: 'Create a storage module with set(key, value), get(key), remove(key), and clear() methods',
                testCases: [
                  { input: [[['set', 'a', 1], ['get', 'a']]], expectedOutput: '1' },
                  { input: [[['set', 'x', 10], ['set', 'y', 20], ['get', 'y']]], expectedOutput: '20' },
                  { input: [[['set', 'k', 5], ['remove', 'k'], ['get', 'k']]], expectedOutput: 'undefined' },
                  { input: [[['set', 'a', 1], ['clear'], ['get', 'a']]], expectedOutput: 'undefined' },
                  { input: [[['get', 'missing']]], expectedOutput: 'undefined' }
                ]
              },
              {
                description: 'Create an ID generator module with getNextId() method that returns incrementing IDs starting from 1, and reset() to start over',
                testCases: [
                  { input: [['getNextId', 'getNextId', 'getNextId']], expectedOutput: '1,2,3' },
                  { input: [['getNextId']], expectedOutput: '1' },
                  { input: [['getNextId', 'getNextId', 'reset', 'getNextId']], expectedOutput: '1,2,1' },
                  { input: [['reset', 'getNextId']], expectedOutput: '1' },
                  { input: [['getNextId', 'getNextId', 'getNextId', 'getNextId', 'getNextId']], expectedOutput: '1,2,3,4,5' }
                ]
              },
              {
                description: 'Create a validator module with isEmail(str), isNumber(str), isEmpty(str) methods returning boolean',
                testCases: [
                  { input: ['isEmail', 'test@example.com'], expectedOutput: 'true' },
                  { input: ['isEmail', 'invalid'], expectedOutput: 'false' },
                  { input: ['isNumber', '123'], expectedOutput: 'true' },
                  { input: ['isNumber', 'abc'], expectedOutput: 'false' },
                  { input: ['isEmpty', ''], expectedOutput: 'true' }
                ]
              },
              {
                description: 'Create a queue module with enqueue(item), dequeue(), peek(), and size() methods',
                testCases: [
                  { input: [[['enqueue', 'a'], ['enqueue', 'b'], ['dequeue']]], expectedOutput: 'a' },
                  { input: [[['enqueue', 1], ['enqueue', 2], ['peek']]], expectedOutput: '1' },
                  { input: [[['enqueue', 'x'], ['size']]], expectedOutput: '1' },
                  { input: [[['dequeue']]], expectedOutput: 'undefined' },
                  { input: [[['enqueue', 'a'], ['enqueue', 'b'], ['dequeue'], ['dequeue'], ['size']]], expectedOutput: '0' }
                ]
              }
            ]
          }
        ]
      },
    ]
  }
]

// ============ HELPER FUNCTIONS ============

/**
 * Get full curriculum for a course
 */
export function getCurriculum(courseId = 'javascript') {
  const course = courses.find(c => c.id === courseId)
  return course?.topics || []
}

/**
 * Get a specific subtopic
 */
export function getSubtopic(topicId, subtopicId, courseId = 'javascript') {
  const topics = getCurriculum(courseId)
  const topic = topics.find(t => t.id === topicId)
  if (!topic) return null
  return topic.subtopics.find(s => s.id === subtopicId) || null
}

/**
 * Get learning outcomes for a specific subtopic
 */
export function getOutcomes(topicId, subtopicId, courseId = 'javascript') {
  const subtopic = getSubtopic(topicId, subtopicId, courseId)
  return subtopic?.outcomes || []
}

/**
 * Get formatted outcomes for prompt injection
 */
export function getFormattedOutcomes(topicId, subtopicId, courseId = 'javascript') {
  const outcomes = getOutcomes(topicId, subtopicId, courseId)
  if (!outcomes.length) return ''

  return outcomes
    .map((o, i) => `${i + 1}. ${o.replace(/_/g, ' ')}`)
    .join('\n')
}

/**
 * Get tasks (assignments) for a specific subtopic
 */
export function getTasks(topicId, subtopicId, courseId = 'javascript') {
  const subtopic = getSubtopic(topicId, subtopicId, courseId)
  return subtopic?.tasks || []
}

/**
 * Check if all outcomes are covered
 */
export function areAllOutcomesCovered(coveredOutcomes, topicId, subtopicId, courseId = 'javascript') {
  const allOutcomes = getOutcomes(topicId, subtopicId, courseId)
  if (!allOutcomes.length) return true // No outcomes defined
  return allOutcomes.every(outcome => coveredOutcomes.includes(outcome))
}

// Legacy export for backward compatibility
export const curriculum = getCurriculum('javascript')

export default courses
