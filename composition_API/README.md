# toEat

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Some TypeScript best practices

With its advanced type system, TypeScript allows developers to write code that is more robust, maintainable, and scalable.

1. Strict Type Checking
   Strict type checking is all about making sure that the types of your variables match the types you expect them to be.
   Enabling strict type checking is as simple as adding “strict”: true to your tsconfig.json file (has to be true by default).

```
let userName: string = "John";
userName = 123; // TypeScript will raise an error because "123" is not a string
```

2. Type Inference
   Type inference is the ability of the TypeScript compiler to automatically determine the type of a variable based on the value that is assigned to it.

```
let name = "John";
```

3. Linters
   There are several linters available for TypeScript, such as TSLint and ESLint, that can help you to enforce a consistent code style and catch potential errors.

4. Interfaces
   An interface in TypeScript defines a contract for the shape of an object. It specifies the properties and methods that an object of that type should have, and it can be used as a type for a variable.

```
interface User {
 name: string;
 age: number;
}
let user: User = {name: "John", age: 25};
```

5. Type Aliases
   TypeScript allows you to create custom types using a feature called type aliases.

```
type Point = { x: number, y: number };
let point: Point = { x: 0, y: 0 };
```

The main difference between features type alias and interfaceis that type alias creates a new name for the type, whereas interface creates a new name for the shape of the object.
Type aliases can also be used to create complex types, such as a union type or an intersection type.

```
type User = { name: string, age: number };
type Admin = { name: string, age: number, privileges: string[] };
type SuperUser = User & Admin;
```

6. Tuples
   Tuples are a way to represent a fixed-size array of elements with different types. They allow you to express a collection of values with a specific order and types.

```
let user: [string, number, boolean] = ["Bob", 25, true];
```

In addition, you can use destructuring assignment to extract the elements of a tuple and assign them to variables:

```
let point: [number, number] = [1, 2];
let [x, y] = point;
console.log(x, y);
```

7. Using `any` Type
   Sometimes, we may not have all the information about a variable’s type, but still need to use it in our code. In such cases, we can utilize the `any` type.

```
function logData(data: any) {
    console.log(data);
}
```

When using any limit its usage to specific cases where the type is truly unknown, such as when working with third-party libraries or dynamically generated data.
Avoid using any in function return types and function arguments, as it can weaken the type safety of your code. Instead, you can use a type that is more specific or use a type that is more general like `unknown` or `object` that still provide some level of type safety.

8. Using the `unknown` Type
   The `unknown` type is a more restrictive type than `any` and it can help you to prevent unintended type errors.

Unlike any, when you use the unknown type, TypeScript will not allow you to perform any operation on a value unless you first check its type. This can help you to catch type errors at compile-time, instead of at runtime.

```
function printValue(value: unknown) {
 if (typeof value === "string") {
   console.log(value);
 } else {
   console.log("Not a string");
 }
}
```

9. Using `never` Type
   In TypeScript, `never` is a special type that represents values that will never occur. It’s used to indicate that a function will not return normally, but will instead throw an error.

```
function divide(numerator: number, denominator: number): number | never {
 if (denominator === 0) {
   throw new Error("Cannot divide by zero");
 }
 return numerator / denominator;
}
```

10. Using the `keyof` operator
    The keyof operator is a powerful feature of TypeScript that allows you to create a type that represents the keys of an object.

```
interface User {
 name: string;
 age: number;
}

type UserKeys = keyof User; // "name" | "age"
```

You can also use the keyof operator to create more type-safe functions that take an object and a key as arguments:

```
function getValue<T, K extends keyof T>(obj: T, key: K) {
 return obj[key];
}
let user: User = { name: "John", age: 30 };
console.log(getValue(user, "name")); // "John"
console.log(getValue(user, "gender")); // Error: Argument of type '"gender"' is not assignable to parameter of type '"name" | "age"'.
```

11. Using Enums
    Enumerations, are a way to define a set of named constants in TypeScript.

```
enum OrderStatus {
 Pending,
 Processing,
 Shipped,
 Delivered,
 Cancelled
}

let orderStatus: OrderStatus = OrderStatus.Pending;
```

Enums can also have a custom set of numeric values or strings:

```
enum OrderStatus {
 Pending = 1,
 Processing = 2,
 Shipped = 3,
 Delivered = 4,
 Cancelled = 5
}

let orderStatus: OrderStatus = OrderStatus.Pending;
```

12. Using Namespaces
    Namespaces are a way to organize your code and prevent naming collisions. They allow you to create a container for your code, where you can define variables, classes, functions, and interfaces.

```
namespace OrderModule {
 export class Order { /* … */ }
 export function cancelOrder(order: Order) { /* … */ }
 export function processOrder(order: Order) { /* … */ }
}
let order = new OrderModule.Order();
OrderModule.cancelOrder(order);
```

13. Using Utility Types
    Utility types are a built-in feature of TypeScript that provide a set of predefined types.
    you can use the `Pick` utility type to extract a subset of properties from an object type:

```
type User = { name: string, age: number, email: string };
type UserInfo = Pick<User, "name" | "email">;
```

You can use the `Exclude` utility type to remove properties from an object type:

```
type User = { name: string, age: number, email: string };
type UserWithoutAge = Exclude<User, "age">;
```

You can use the `Partial` utility type to make all properties of a type optional:

```
type User = { name: string, age: number, email: string };
type PartialUser = Partial<User>;
```

14. `Readonly` and `ReadonlyArray`
    When working with data in TypeScript, you might want to make sure that certain values can’t be changed. And that’s where `Readonly` and `ReadonlyArray` come in.
    The `Readonly` keyword is used to make properties of an object read-only, meaning they can’t be modified after they are created.

```
interface Point {
 x: number;
 y: number;
}
let point: Readonly<Point> = {x: 0, y: 0};
point.x = 1; // TypeScript will raise an error because "point.x" is read-only
```

The `ReadonlyArray` makes an array read-only, and it can’t be modified after it’s created.

```
let numbers: ReadonlyArray<number> = [1, 2, 3];
numbers.push(4); // TypeScript will raise an error because "numbers" is read-only
```

15. Type Guards
    Type guards are a powerful tool that can help you to narrow down the type of a variable based on certain conditions.

```
function isNumber(x: any): x is number {
 return typeof x === "number";
}
let value = 3;
if (isNumber(value)) {
 value.toFixed(2); // TypeScript knows that "value" is a number because of the type guard
}
```

16. Using Generics
    Generics are a powerful feature of TypeScript that allows you to write code (a single `function`, `class` or `interface`) that can work with multiple types, making it more reusable.

You can use generics to create a `class` that can work with any type of data:

```
class GenericNumber<T> {
 zeroValue: T;
 add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```

You can use a generic function to create an array of any type:

```
function createArray<T>(length: number, value: T): Array<T> {
 let result = [];

 for (let i = 0; i < length; i++) {
   result[i] = value;
 }

 return result;
}

let names = createArray<string>(3, "Bob");
let numbers = createArray<number>(3, 0);
```

17. Using the `infer` keyword
    The `infer` keyword is a powerful feature of TypeScript that allows you to extract the type of a variable in a type.

```
type ArrayType<T> = T extends (infer U)[] ? U : never;
type MyArray = ArrayType<string[]>; // MyArray is of type string

type ObjectType<T> = T extends { [key: string]: infer U } ? U : never;
type MyObject = ObjectType<{ name: string, age: number }>; // MyObject is of type {name:string, age: number}
```

18. Using Conditional Types
    Conditional types let you to express more complex type relationships. They allow you to create new types based on the conditions of other types.

```
// extract the return type of a function:
type ReturnType<T> = T extends (…args: any[]) => infer R ? R : any;
type R1 = ReturnType<() => string>; // string
type R2 = ReturnType<() => void>; // void

// extract the properties of an object type that meet a certain condition:
type PickProperties<T, U> = { [K in keyof T]: T[K] extends U ? K : never }[keyof T];
type P1 = PickProperties<{ a: number, b: string, c: boolean }, string | number>; // "a" | "b"
```

19. Using Mapped Types
    Mapped types are a way to create new types based on existing types.
    Mapped types can be used in different ways: to create new types, to add or remove properties from an existing type, or to change the type of the properties of an existing type.

```
type Optional<T> = { [P in keyof T]?: T[P] };
let obj: { a: number, b: string } = { a: 1, b: "hello" };
let optionalObj: Optional<typeof obj> = { a: 1 };
```

20. Using Decorators
    Decorators are a way to add additional functionality to a class, method or property using a simple syntax.
    You can use decorators to add metadata to a class, method or property, which can be used at runtime.

```
function setApiPath(path: string) {
 return function (target: any) {
 target.prototype.apiPath = path;
 }
}

@setApiPath("/users")
class UserService {
 // …
}
console.log(new UserService().apiPath); // "/users"
```
